import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";

export const SITE_URL = "https://grantgeist.com" as const;

export type SiteRoute = {
  path: string;
  title: string;
};

/**
 * GitHub Pages 301s directory routes (`/card` → `/card/`). Site route keys and
 * DocumentMeta lookups are slash-free except for home (`/`).
 *
 * `/card` and `/qr` are intentionally excluded from this registry (and therefore
 * from sitemap.xml, llms.txt, and SiteIndexNav): reachable via direct link or
 * QR, but should not surface in crawler/agent discovery.
 */
export const UNLISTED_UTILITY_PATHS = ["/card", "/qr"] as const;

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function isUnlistedUtilityPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return (UNLISTED_UTILITY_PATHS as readonly string[]).includes(normalized);
}

const staticRoutes: readonly SiteRoute[] = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
];

const projectRoutes: readonly SiteRoute[] = selectedWorkProjects.map(
  (project) => ({
    path: project.route,
    title: project.title,
  })
);

/** Canonical list of indexable site routes (paths + titles only). */
export const siteRoutes: readonly SiteRoute[] = [
  ...staticRoutes,
  ...projectRoutes,
];
