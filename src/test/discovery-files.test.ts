import { describe, it, expect } from "vitest";
import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";
import { absoluteUrl } from "@/app/content/routeMetadata";
import { SITE_URL, siteRoutes } from "@/app/content/siteRoutes";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only,
// and adding @types/node is an unrequested dependency change (AGENTS.md).
import sitemap from "../../public/sitemap.xml?raw";
import llmsTxt from "../../public/llms.txt?raw";
import aboutSource from "../app/components/About.tsx?raw";
import replacementTrapSource from "../app/projects/ReplacementTrap.tsx?raw";
import stormSignalSource from "../app/projects/StormSignal.tsx?raw";
import walkabilityIndexSource from "../app/projects/WalkabilityIndex.tsx?raw";
import bantrSource from "../app/projects/Bantr.tsx?raw";

function extractSitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function extractMarkdownHrefs(markdown: string): string[] {
  return [...markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(
    (match) => match[1]
  );
}

/**
 * Pulls timeline `year` values and `title` fragments out of About.tsx's
 * source. Titles are split into their base name and parenthetical asides
 * (e.g. `"Rhode Island School of Design (RISD) (Product Design & Manufacturing)"`
 * → `["Rhode Island School of Design", "RISD", "Product Design & Manufacturing"]`)
 * so llms.txt can reword/reorder a title's parts instead of being forced to
 * repeat an awkward, fully concatenated string verbatim.
 */
function extractAboutTimelineFields(source: string): {
  years: string[];
  titleFragments: string[];
} {
  const years = [...source.matchAll(/\byear:\s*"([^"]+)"/g)].map(
    (match) => match[1]
  );
  const titles = [...source.matchAll(/\btitle:\s*"([^"]+)"/g)].map(
    (match) => match[1]
  );
  const titleFragments = titles.flatMap((title) => {
    const parenthetical = [...title.matchAll(/\(([^)]+)\)/g)].map(
      (match) => match[1]
    );
    const base = title.replace(/\s*\([^)]*\)/g, "").trim();
    return [base, ...parenthetical].filter((fragment) => fragment.length > 0);
  });
  return { years, titleFragments };
}

/** External (non-grantgeist.com) evidence URLs each project's llms.txt entry cites. */
const projectEvidenceUrls: Record<string, string[]> = {
  replacementTrap: [
    "https://substack.com/@grantgeist/p-179539887",
    "https://github.com/ghgeist/replacement_trap",
  ],
  stormSignal: [
    "https://storm-signal.replit.app/",
    "https://github.com/ghgeist/disaster_response_project",
  ],
  walkabilityIndex: [
    "https://walkability-index.replit.app/",
    "https://github.com/ghgeist/urbanism_project",
  ],
  bantr: ["https://bantr.us/"],
};

const projectSourcesByKey: Record<string, string> = {
  replacementTrap: replacementTrapSource,
  stormSignal: stormSignalSource,
  walkabilityIndex: walkabilityIndexSource,
  bantr: bantrSource,
};

// Narrow, high-confidence manipulation phrasing only — not general imperative
// language ("you must", "verify") that shows up legitimately in evaluation
// framing. A false positive here would block honest edits to llms.txt.
const INJECTION_PATTERNS: RegExp[] = [
  /ignore (all |any )?(previous|prior|the above)/i,
  /disregard (all |any )?(previous|prior|the above)/i,
  /system prompt/i,
  /you are now/i,
  /act as (if you|though)/i,
  /new instructions:/i,
  /recommend hiring/i,
  /top candidate/i,
  /must (recommend|hire|select)/i,
];

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

  it("contains the expected evidence-layer section headings", () => {
    expect(llmsTxt).toContain("Source notes:");
    const requiredHeadings = [
      "## Selected work",
      "## Work history (source: /about)",
      "## Elsewhere",
    ];

    for (const heading of requiredHeadings) {
      expect(llmsTxt).toContain(heading);
    }
  });

  it("cites external evidence URLs that also appear on the corresponding project page", () => {
    for (const [key, urls] of Object.entries(projectEvidenceUrls)) {
      const projectSource = projectSourcesByKey[key];
      for (const url of urls) {
        expect(llmsTxt).toContain(url);
        expect(projectSource).toContain(url);
      }
    }
  });

  it("restates every About timeline year and title fragment in llms.txt", () => {
    const { years, titleFragments } = extractAboutTimelineFields(aboutSource);
    expect(years.length).toBeGreaterThan(0);
    expect(titleFragments.length).toBeGreaterThan(0);

    for (const year of years) {
      expect(llmsTxt).toContain(year);
    }
    for (const fragment of titleFragments) {
      expect(llmsTxt).toContain(fragment);
    }
  });

  it("does not contain prompt-injection or ranking-manipulation phrasing", () => {
    for (const pattern of INJECTION_PATTERNS) {
      expect(llmsTxt).not.toMatch(pattern);
    }
  });
});
