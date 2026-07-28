import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";

export const SITE_URL = "https://grantgeist.com" as const;

export type SiteRoute = {
  path: string;
  title: string;
};

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
