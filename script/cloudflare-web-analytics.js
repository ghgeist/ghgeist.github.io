/**
 * Cloudflare Web Analytics beacon — single source of truth for production
 * injection (Vite build) and post-build artifact checks. Not loaded in dev.
 */
export const CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC =
  "https://static.cloudflareinsights.com/beacon.min.js";

/** Public site token from Cloudflare Web Analytics (manual setup). */
export const CLOUDFLARE_WEB_ANALYTICS_TOKEN =
  "95b1c466716e4aa7aaa6fc756e4d9a56";

/** HTML snippet injected into dist/index.html during `vite build` only. */
export function cloudflareWebAnalyticsSnippet() {
  return [
    "<!-- Cloudflare Web Analytics -->",
    "<script",
    "  type=\"module\"",
    `  src="${CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC}"`,
    `  data-cf-beacon='{"token": "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}'`,
    "></script>",
    "<!-- End Cloudflare Web Analytics -->",
  ].join("\n");
}

/**
 * Fail-loud beacon checks for built / prerendered HTML.
 * @param {string} html
 * @param {string} context
 */
export function assertCloudflareWebAnalyticsInHtml(html, context) {
  const pattern = new RegExp(
    `<script[^>]*src=["']${CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC.replaceAll(
      ".",
      "\\."
    )}["'][^>]*>`,
    "gi"
  );
  const matches = [...html.matchAll(pattern)];

  if (matches.length !== 1) {
    throw new Error(
      `${context}: expected exactly one Cloudflare beacon script, got ${matches.length}`
    );
  }

  const decoded = matches[0][0]
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");

  const beaconAttr =
    decoded.match(/data-cf-beacon='(\{[^']+\})'/) ??
    decoded.match(/data-cf-beacon="(\{.*\})"/);

  if (!beaconAttr) {
    throw new Error(`${context}: beacon script missing parseable data-cf-beacon`);
  }

  const beaconConfig = JSON.parse(beaconAttr[1]);
  if (typeof beaconConfig.token !== "string" || beaconConfig.token.length === 0) {
    throw new Error(`${context}: beacon token missing or empty`);
  }

  if (beaconConfig.token !== CLOUDFLARE_WEB_ANALYTICS_TOKEN) {
    throw new Error(`${context}: beacon token does not match configured token`);
  }
}
