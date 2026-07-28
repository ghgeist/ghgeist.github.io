/**
 * Post-build prerender: snapshot each sitemap route with Playwright and write
 * directory-form HTML under dist/. Not a postbuild hook — run via
 * `npm run prerender` or `npm run build:static`.
 *
 * Fail-loud: buffers all route HTML and writes only after every route passes.
 * Exits non-zero on assertion failure; always closes browser + preview server.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { preview } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITEMAP_PATH = join(DIST, "sitemap.xml");
const INDEX_PATH = join(DIST, "index.html");

const SITE_ORIGIN = "https://grantgeist.com";
const DEFAULT_TITLE = "Grant Geist | Data Product Strategist";
const MIN_BODY_TEXT = 800;
const MIN_INTERNAL_LINKS = 4;
const MIN_DESCRIPTION_LEN = 50;
const MAX_DESCRIPTION_LEN = 200;
const VIEWPORT = { width: 1280, height: 900 };

/**
 * @param {string} sitemapXml
 * @returns {string[]} pathnames including "/"
 */
function pathsFromSitemap(sitemapXml) {
  const locs = [...sitemapXml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(
    (m) => m[1].trim()
  );

  if (locs.length === 0) {
    throw new Error(`No <loc> entries found in ${SITEMAP_PATH}`);
  }

  return locs.map((loc) => {
    let url;
    try {
      url = new URL(loc);
    } catch {
      throw new Error(`Invalid <loc> URL in sitemap: ${loc}`);
    }
    if (url.origin !== SITE_ORIGIN) {
      throw new Error(
        `Sitemap loc origin must be ${SITE_ORIGIN}, got ${url.origin}`
      );
    }
    const path = url.pathname || "/";
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  });
}

/** Absolute canonical URL matching DocumentMeta / absoluteUrl(). */
function expectedCanonical(pathname) {
  return pathname === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname}`;
}

/** dist output path for a route (directory-form except root → index.html). */
function outputPathFor(pathname) {
  if (pathname === "/") {
    return INDEX_PATH;
  }
  return join(DIST, pathname.replace(/^\//, ""), "index.html");
}

function assertPristineIndex() {
  if (!existsSync(INDEX_PATH)) {
    throw new Error(
      `Missing ${INDEX_PATH}. Run \`npm run build\` before prerender.`
    );
  }
  const html = readFileSync(INDEX_PATH, "utf8");
  if (html.includes("data-prerendered")) {
    throw new Error(
      "dist/index.html is already prerendered. Run `npm run build` first so prerender starts from a pristine SPA shell."
    );
  }
}

/** @param {import('playwright').Page} page */
async function waitForRouteReady(page) {
  await page.waitForFunction(() => {
    const root = document.querySelector("#root");
    return Boolean(root && root.childElementCount > 0);
  });

  await page.waitForFunction(() => {
    const headings = [...document.querySelectorAll("h1")].filter(
      (h) => h.textContent && h.textContent.trim().length > 0
    );
    return headings.length === 1;
  });

  // Home title matches index.html by design; canonical proves DocumentMeta ran.
  await page.waitForFunction(
    (defaultTitle) => {
      const hasCanonical = Boolean(
        document.querySelector('link[rel="canonical"][data-managed-meta]')
      );
      return document.title !== defaultTitle || hasCanonical;
    },
    DEFAULT_TITLE
  );

  await page.evaluate(async () => {
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const step = window.innerHeight || 900;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 50));
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {string} pathname
 * @param {{ pageErrors: Error[], consoleErrors: string[] }} collected
 */
async function assertRoute(page, pathname, collected) {
  if (collected.pageErrors.length > 0) {
    throw new Error(
      `${pathname}: pageerror — ${collected.pageErrors.map((e) => e.message).join("; ")}`
    );
  }
  if (collected.consoleErrors.length > 0) {
    throw new Error(
      `${pathname}: console.error — ${collected.consoleErrors.join("; ")}`
    );
  }

  const snapshot = await page.evaluate(() => {
    const h1s = [...document.querySelectorAll("h1")]
      .map((h) => (h.textContent || "").trim())
      .filter(Boolean);
    const description =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || "";
    const canonical =
      document
        .querySelector('link[rel="canonical"]')
        ?.getAttribute("href") || "";
    const moduleScripts = [
      ...document.querySelectorAll('script[type="module"]'),
    ].length;
    const internalLinks = [
      ...document.querySelectorAll('a[href^="/"]'),
    ].length;
    const bodyText = document.body?.innerText || "";

    return {
      h1Count: h1s.length,
      h1Text: h1s[0] || "",
      title: document.title,
      description,
      canonical,
      moduleScripts,
      internalLinks,
      bodyTextLength: bodyText.length,
      hasLoading: bodyText.includes("Loading..."),
      hasErrorFallback: bodyText.includes(
        "Something went wrong while loading this page."
      ),
    };
  });

  if (snapshot.h1Count !== 1) {
    throw new Error(
      `${pathname}: expected exactly one non-empty <h1>, got ${snapshot.h1Count}`
    );
  }
  if (snapshot.hasLoading) {
    throw new Error(`${pathname}: Suspense fallback "Loading..." still present`);
  }
  if (snapshot.hasErrorFallback) {
    throw new Error(
      `${pathname}: ErrorBoundary fallback text found in body`
    );
  }
  if (snapshot.bodyTextLength < MIN_BODY_TEXT) {
    throw new Error(
      `${pathname}: body.innerText length ${snapshot.bodyTextLength} < ${MIN_BODY_TEXT}`
    );
  }
  if (snapshot.internalLinks < MIN_INTERNAL_LINKS) {
    throw new Error(
      `${pathname}: expected >= ${MIN_INTERNAL_LINKS} internal links, got ${snapshot.internalLinks}`
    );
  }

  const expected = expectedCanonical(pathname);
  if (snapshot.canonical !== expected) {
    throw new Error(
      `${pathname}: canonical "${snapshot.canonical}" !== "${expected}"`
    );
  }

  const descLen = snapshot.description.length;
  if (descLen < MIN_DESCRIPTION_LEN || descLen > MAX_DESCRIPTION_LEN) {
    throw new Error(
      `${pathname}: description length ${descLen} not in ${MIN_DESCRIPTION_LEN}–${MAX_DESCRIPTION_LEN}`
    );
  }

  if (snapshot.moduleScripts < 1) {
    throw new Error(
      `${pathname}: missing script[type="module"] (SPA boot tag must survive)`
    );
  }

  await page.evaluate(() => {
    document.documentElement.setAttribute("data-prerendered", "");
  });

  return {
    title: snapshot.title,
    html: await page.content(),
    h1: snapshot.h1Text,
  };
}

async function main() {
  /** @type {import('vite').PreviewServer | undefined} */
  let server;
  /** @type {import('playwright').Browser | undefined} */
  let browser;
  let exitCode = 0;

  try {
    assertPristineIndex();

    if (!existsSync(SITEMAP_PATH)) {
      throw new Error(
        `Missing ${SITEMAP_PATH}. Run \`npm run build\` before prerender.`
      );
    }

    const paths = pathsFromSitemap(readFileSync(SITEMAP_PATH, "utf8"));
    console.log(`Prerendering ${paths.length} routes from sitemap.xml…`);

    server = await preview({
      configFile: false,
      root: ROOT,
      preview: {
        host: "127.0.0.1",
        port: 4173,
        strictPort: false,
      },
      build: {
        outDir: "dist",
      },
    });

    const baseUrl = server.resolvedUrls?.local?.[0];
    if (!baseUrl) {
      throw new Error("Vite preview did not expose a local URL");
    }

    browser = await chromium.launch();
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: VIEWPORT,
    });

    /** @type {Map<string, { title: string, html: string, h1: string }>} */
    const results = new Map();

    for (const pathname of paths) {
      const page = await context.newPage();
      /** @type {{ pageErrors: Error[], consoleErrors: string[] }} */
      const collected = { pageErrors: [], consoleErrors: [] };

      page.on("pageerror", (err) => {
        collected.pageErrors.push(err);
      });
      page.on("console", (msg) => {
        if (msg.type() !== "error") {
          return;
        }
        const text = msg.text();
        // Hero's grainy-gradients noise.svg (and similar) can 404 without
        // affecting content; same-origin resource failures still fail the run.
        const locUrl = msg.location().url || "";
        const isOffOriginResourceFail =
          text.includes("Failed to load resource") &&
          locUrl.length > 0 &&
          !locUrl.startsWith(baseUrl);
        if (isOffOriginResourceFail) {
          return;
        }
        collected.consoleErrors.push(text);
      });

      const url = new URL(pathname === "/" ? "/" : pathname, baseUrl).href;
      console.log(`  → ${pathname}`);
      await page.goto(url, { waitUntil: "load" });
      await waitForRouteReady(page);
      const result = await assertRoute(page, pathname, collected);
      results.set(pathname, result);
      await page.close();
    }

    const titles = [...results.values()].map((r) => r.title);
    const uniqueTitles = new Set(titles);
    if (uniqueTitles.size !== titles.length) {
      throw new Error(
        `Route titles must be distinct; got: ${titles.join(" | ")}`
      );
    }

    for (const [pathname, result] of results) {
      const outPath = outputPathFor(pathname);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, result.html, "utf8");
      const relative = outPath.slice(ROOT.length + 1).replaceAll("\\", "/");
      console.log(`  wrote ${relative}`);
    }

    console.log(`Prerender complete: ${results.size} routes.`);
  } catch (err) {
    exitCode = 1;
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Prerender failed: ${message}`);
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    if (server) {
      await server.close().catch(() => {});
    }
  }

  process.exit(exitCode);
}

main();
