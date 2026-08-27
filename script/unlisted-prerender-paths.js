/**
 * Routes that must exist as real prerendered HTML (reachable via QR/direct
 * link) but are deliberately excluded from public/sitemap.xml, llms.txt, and
 * siteRoutes. Sourced here rather than from siteRoutes.ts because prerender
 * scripts run under plain `node`, not the app's TS/Vite pipeline.
 */
export const UNLISTED_PRERENDER_PATHS = ["/card", "/qr"];

/** Per-route prerender content assertions (pathname → looser thresholds). */
export const ROUTE_ASSERTION_OVERRIDES = {
  "/card": { minBodyText: 50, minInternalLinks: 1 },
  "/qr": { minBodyText: 30, minInternalLinks: 1 },
};
