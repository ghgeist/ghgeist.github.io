import { absoluteUrl } from "@/app/content/routeMetadata";
import { SITE_URL, siteRoutes } from "@/app/content/siteRoutes";

export type SiteIndexLink = {
  href: string;
  label: string;
  kind: "page" | "discovery";
};

/** Absolute first-hop links for fetch-only agents (pages + discovery files). */
export const siteIndexLinks: readonly SiteIndexLink[] = [
  ...siteRoutes
    .filter((route) => route.path !== "/")
    .map((route) => ({
      href: absoluteUrl(route.path),
      label: route.title,
      kind: "page" as const,
    })),
  {
    href: `${SITE_URL}/llms.txt`,
    label: "llms.txt",
    kind: "discovery",
  },
  {
    href: `${SITE_URL}/sitemap.xml`,
    label: "sitemap.xml",
    kind: "discovery",
  },
];

export const llmsTxtHref = `${SITE_URL}/llms.txt` as const;
