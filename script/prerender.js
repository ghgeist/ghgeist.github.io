/**
 * Post-build prerender: snapshot each sitemap route with Playwright and write
 * directory-form HTML under dist/. Not a postbuild hook — run via
 * `npm run prerender` or `npm run build:static`.
 *
 * Fail-loud: buffers all route HTML and writes only after every route passes.
 * Exits non-zero on assertion failure; always closes browser + preview server.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { preview } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITEMAP_PATH = join(DIST, "sitemap.xml");
const INDEX_PATH = join(DIST, "index.html");

const MIN_BODY_TEXT = 800;
const MIN_INTERNAL_LINKS = 4;
const MIN_DESCRIPTION_LEN = 50;
const MAX_DESCRIPTION_LEN = 200;
const WAIT_TIMEOUT_MS = 30_000;
const VIEWPORT = { width: 1280, height: 900 };

/**
 * @param {string} sitemapXml
 * @returns {{ siteOrigin: string, paths: string[] }}
 */
function pathsFromSitemap(sitemapXml) {
  const locs = [...sitemapXml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(
    (m) => m[1].trim()
  );

  if (locs.length === 0) {
    throw new Error(`No <loc> entries found in ${SITEMAP_PATH}`);
  }

  /** @type {string | undefined} */
  let siteOrigin;

  const paths = locs.map((loc) => {
    let url;
    try {
      url = new URL(loc);
    } catch {
      throw new Error(`Invalid <loc> URL in sitemap: ${loc}`);
    }

    if (!siteOrigin) {
      siteOrigin = url.origin;
    } else if (url.origin !== siteOrigin) {
      throw new Error(
        `Sitemap loc origins must match; expected ${siteOrigin}, got ${url.origin}`
      );
    }

    const path = url.pathname || "/";
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  });

  return { siteOrigin: /** @type {string} */ (siteOrigin), paths };
}

/** Absolute canonical URL matching DocumentMeta / absoluteUrl(). */
function expectedCanonical(siteOrigin, pathname) {
  return pathname === "/" ? `${siteOrigin}/` : `${siteOrigin}${pathname}`;
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

/**
 * @param {import('playwright').Page} page
 * @param {string} pathname
 * @param {string} step
 * @param {() => Promise<unknown>} fn
 */
async function waitStep(page, pathname, step, fn) {
  try {
    await fn();
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`${pathname}: timed out waiting for ${step} — ${detail}`);
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {string} pathname
 */
async function waitForRouteReady(page, pathname) {
  await waitStep(page, pathname, "#root to mount", () =>
    page.waitForFunction(
      () => {
        const root = document.querySelector("#root");
        return Boolean(root && root.childElementCount > 0);
      },
      { timeout: WAIT_TIMEOUT_MS }
    )
  );

  await waitStep(page, pathname, "exactly one non-empty <h1>", () =>
    page.waitForFunction(
      () => {
        const headings = [...document.querySelectorAll("h1")].filter(
          (h) => h.textContent && h.textContent.trim().length > 0
        );
        return headings.length === 1;
      },
      { timeout: WAIT_TIMEOUT_MS }
    )
  );

  // Canonical with data-managed-meta proves DocumentMeta ran (home title
  // matches the index.html default, so title alone is not a signal).
  await waitStep(page, pathname, "DocumentMeta canonical", () =>
    page.waitForFunction(
      () =>
        Boolean(
          document.querySelector('link[rel="canonical"][data-managed-meta]')
        ),
      { timeout: WAIT_TIMEOUT_MS }
    )
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
 * @param {string} siteOrigin
 * @param {string} pathname
 * @param {{ pageErrors: Error[], consoleErrors: string[] }} collected
 */
async function assertRoute(page, siteOrigin, pathname, collected) {
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

  const expected = expectedCanonical(siteOrigin, pathname);
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

    const { siteOrigin, paths } = pathsFromSitemap(
      readFileSync(SITEMAP_PATH, "utf8")
    );
    console.log(
      `Prerendering ${paths.length} routes from sitemap.xml (${siteOrigin})…`
    );

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

    try {
      browser = await chromium.launch();
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new Error(
        `Failed to launch Chromium. Install it with: npx playwright install chromium\n${detail}`
      );
    }

    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: VIEWPORT,
    });
    context.setDefaultTimeout(WAIT_TIMEOUT_MS);

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
        if (msg.type() === "error") {
          collected.consoleErrors.push(msg.text());
        }
      });

      const url = new URL(pathname === "/" ? "/" : pathname, baseUrl).href;
      console.log(`  → ${pathname}`);
      await page.goto(url, { waitUntil: "load" });
      await waitForRouteReady(page, pathname);
      const result = await assertRoute(page, siteOrigin, pathname, collected);
      results.set(pathname, result);
      console.log(`     h1="${result.h1}" title="${result.title}"`);
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
      console.log(`  wrote ${relative(ROOT, outPath).replaceAll("\\", "/")}`);
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
