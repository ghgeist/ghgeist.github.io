/**
 * Post-prerender gate: every sitemap route must have directory-form HTML
 * under dist/ marked with data-prerendered. Fail-loud for CI / verify.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITEMAP_PATH = join(DIST, "sitemap.xml");

/**
 * @param {string} sitemapXml
 * @returns {string[]}
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
    const path = url.pathname || "/";
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  });
}

/** @param {string} pathname */
function outputPathFor(pathname) {
  if (pathname === "/") {
    return join(DIST, "index.html");
  }
  return join(DIST, pathname.replace(/^\//, ""), "index.html");
}

function main() {
  if (!existsSync(SITEMAP_PATH)) {
    throw new Error(
      `Missing ${SITEMAP_PATH}. Run \`npm run build\` (and prerender) first.`
    );
  }

  const paths = pathsFromSitemap(readFileSync(SITEMAP_PATH, "utf8"));
  /** @type {string[]} */
  const failures = [];

  for (const pathname of paths) {
    const outPath = outputPathFor(pathname);
    const rel = relative(ROOT, outPath).replaceAll("\\", "/");

    if (!existsSync(outPath)) {
      failures.push(`${pathname}: missing ${rel}`);
      continue;
    }

    const html = readFileSync(outPath, "utf8");
    if (!html.includes("data-prerendered")) {
      failures.push(`${pathname}: ${rel} lacks data-prerendered`);
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Prerender artifact check failed (${failures.length}/${paths.length}):\n` +
        failures.map((f) => `  - ${f}`).join("\n")
    );
  }

  console.log(
    `Prerender artifact check passed: ${paths.length} routes have data-prerendered HTML.`
  );
}

try {
  main();
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(message);
  process.exit(1);
}
