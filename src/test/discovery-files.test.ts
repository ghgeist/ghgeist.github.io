import { describe, it, expect } from "vitest";
import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";
import { SITE_URL, siteRoutes } from "@/app/content/siteRoutes";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only,
// and adding @types/node is an unrequested dependency change (AGENTS.md).
import sitemap from "../../public/sitemap.xml?raw";
import llmsTxt from "../../public/llms.txt?raw";

function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function extractSitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function extractMarkdownHrefs(markdown: string): string[] {
  return [...markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(
    (match) => match[1]
  );
}

describe("discovery files", () => {
  const registryUrls = siteRoutes.map((route) => absoluteUrl(route.path));

  it("lists every siteRoutes entry in sitemap.xml", () => {
    for (const url of registryUrls) {
      expect(sitemap).toContain(`<loc>${url}</loc>`);
    }
  });

  it("lists every siteRoutes entry in llms.txt", () => {
    for (const route of siteRoutes) {
      const url = absoluteUrl(route.path);
      expect(llmsTxt).toContain(`[${route.title}](${url})`);
    }
  });

  it("lists every selected-work subtext beside its llms.txt link", () => {
    for (const project of selectedWorkProjects) {
      const url = absoluteUrl(project.route);
      expect(llmsTxt).toContain(`[${project.title}](${url}): ${project.subtext}`);
    }
  });

  it("does not list routes in sitemap.xml that are absent from siteRoutes", () => {
    const locs = extractSitemapLocs(sitemap);
    expect(locs.length).toBeGreaterThan(0);

    for (const loc of locs) {
      expect(registryUrls).toContain(loc);
    }
  });

  it("does not list grantgeist.com routes in llms.txt that are absent from siteRoutes", () => {
    const hrefs = extractMarkdownHrefs(llmsTxt).filter((href) =>
      href.startsWith(SITE_URL)
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      expect(registryUrls).toContain(href);
    }
  });
});
