import { SITE_URL, normalizePathname } from "@/app/content/siteRoutes";
import {
  selectedWorkProjects,
  type SelectedWorkProject,
} from "@/app/projects/content/selectedWorkProjects";

export const TITLE_SUFFIX = " | Grant Geist" as const;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og/og-default.jpg` as const;

const PERSON_NAME = "Grant Geist";
const PERSON_JOB_TITLE = "Data Product Strategist";

export const CONTACT_EMAIL = "hello@grantgeist.com" as const;
export const CONTACT_FORM_HREF = `${SITE_URL}/#work-with-me` as const;

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  ogImage: string;
  jsonLd: Record<string, unknown> | Record<string, unknown>[];
  /** When set, DocumentMeta writes a matching robots meta tag. */
  robots?: "noindex";
};

/**
 * Absolute URL for a site path.
 * Home is `${SITE_URL}/` (trailing slash) to match sitemap.xml and llms.txt.
 */
export function absoluteUrl(path: string): string {
  if (path === "/") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${path}`;
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  jobTitle: PERSON_JOB_TITLE,
  url: absoluteUrl("/"),
  sameAs: [
    "https://www.linkedin.com/in/grantgeist/",
    "https://github.com/ghgeist",
    "https://thedonkeyaxiom.substack.com/",
  ],
} as const;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: PERSON_NAME,
  url: absoluteUrl("/"),
  description:
    "Portfolio of Grant Geist — data product strategist, designer, and technologist.",
} as const;

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

const cardJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  jobTitle: "Tech Strategy and AI Adoption",
  worksFor: { "@type": "Organization", name: "G. H. Geist Studio LLC" },
  telephone: "+1 786-539-4140",
  url: "https://grantgeist.com",
  image: `${SITE_URL}/assets/headshot.jpg`,
  sameAs: ["https://www.linkedin.com/in/grantgeist/"],
} as const;

const cardMeta: RouteMeta = {
  path: "/card",
  title: `Digital Business Card${TITLE_SUFFIX}`,
  description:
    "Contact Grant Geist, Tech Strategy and AI Adoption at G. H. Geist Studio LLC, and save his digital business card.",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: cardJsonLd,
  // Reachable directly via QR/link only; not part of sitemap.xml or crawler discovery.
  robots: "noindex",
};

const qrMeta: RouteMeta = {
  path: "/qr",
  title: `QR Code${TITLE_SUFFIX}`,
  description:
    "Scan Grant Geist's QR code to open his digital business card and save his contact details.",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: [],
  robots: "noindex",
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
        url: absoluteUrl("/"),
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
          item: absoluteUrl("/"),
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
  [cardMeta.path, cardMeta],
  [qrMeta.path, qrMeta],
  ...selectedWorkProjects.map(
    (project) => [project.route, projectToRouteMeta(project)] as const
  ),
]);

const unknownPathFallback: RouteMeta = {
  path: "/",
  title: `Page not found${TITLE_SUFFIX}`,
  description:
    "This page does not exist. Browse Grant Geist’s portfolio home, about, and selected work.",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: [],
  robots: "noindex",
};

/** Resolve document metadata for a pathname; unknown paths get distinct noindex copy. */
export function getRouteMeta(pathname: string): RouteMeta {
  const normalized = normalizePathname(pathname);
  return routeMetaByPath.get(normalized) ?? {
    ...unknownPathFallback,
    path: pathname,
  };
}
