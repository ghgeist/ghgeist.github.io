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
 * `/card` is intentionally excluded from this registry (and therefore from
 * sitemap.xml, llms.txt, and SiteIndexNav): it stays reachable directly via
 * QR/link, but should not surface in crawler/agent discovery.
 */
export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
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
