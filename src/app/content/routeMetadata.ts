import { SITE_URL } from "@/app/content/siteRoutes";
import {
  selectedWorkProjects,
  type SelectedWorkProject,
} from "@/app/projects/content/selectedWorkProjects";

export const TITLE_SUFFIX = " | Grant Geist" as const;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og/og-default.jpg` as const;

const PERSON_NAME = "Grant Geist";
const PERSON_JOB_TITLE = "Data Product Strategist";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  ogImage: string;
  jsonLd: Record<string, unknown> | Record<string, unknown>[];
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  jobTitle: PERSON_JOB_TITLE,
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/grantgeist/"],
} as const;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: PERSON_NAME,
  url: SITE_URL,
  description:
    "Portfolio of Grant Geist — data product strategist, designer, and technologist.",
} as const;

/** Absolute URL for a site path (`/` → origin with no trailing slash). */
export function absoluteUrl(path: string): string {
  if (path === "/") {
    return SITE_URL;
  }
  return `${SITE_URL}${path}`;
}

const homeMeta: RouteMeta = {
  path: "/",
  title: `${PERSON_NAME} | ${PERSON_JOB_TITLE}`,
  description:
    "Grant Geist — data product strategist, designer, and technologist. Portfolio showcasing work in data visualization, product design, and urban analytics.",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: [personJsonLd, websiteJsonLd],
};

const aboutMeta: RouteMeta = {
  path: "/about",
  title: `About${TITLE_SUFFIX}`,
  description:
    "About Grant Geist — systems work across countries and disciplines, building for reliability under real-world friction and constraint.",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: personJsonLd,
};

function resolveMetaDescription(project: {
  subtext: string;
  metaDescription?: string;
}): string {
  return project.metaDescription ?? project.subtext;
}

function projectJsonLd(project: SelectedWorkProject): Record<string, unknown>[] {
  const url = absoluteUrl(project.route);
  const description = resolveMetaDescription(project);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description,
      url,
      image: DEFAULT_OG_IMAGE,
      author: {
        "@type": "Person",
        name: PERSON_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: project.title,
          item: url,
        },
      ],
    },
  ];
}

function projectToRouteMeta(project: SelectedWorkProject): RouteMeta {
  return {
    path: project.route,
    title: `${project.title}${TITLE_SUFFIX}`,
    description: resolveMetaDescription(project),
    ogType: "article",
    // JPG default until dedicated per-project OG assets exist (webp thumbs are unreliable for scrapers).
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: projectJsonLd(project),
  };
}

const routeMetaByPath = new Map<string, RouteMeta>([
  [homeMeta.path, homeMeta],
  [aboutMeta.path, aboutMeta],
  ...selectedWorkProjects.map(
    (project) => [project.route, projectToRouteMeta(project)] as const
  ),
]);

const unknownPathFallback: RouteMeta = {
  path: "/",
  title: homeMeta.title,
  description: homeMeta.description,
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: personJsonLd,
};

/** Resolve document metadata for a pathname, with home fallback for unknown paths. */
export function getRouteMeta(pathname: string): RouteMeta {
  return routeMetaByPath.get(pathname) ?? {
    ...unknownPathFallback,
    path: pathname,
  };
}
