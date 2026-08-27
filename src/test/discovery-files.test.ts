import { describe, it, expect } from "vitest";
import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";
import { resumePlainTextExportHref } from "@/app/content/resumeLinks";
import { absoluteUrl } from "@/app/content/routeMetadata";
import { SITE_URL, siteRoutes } from "@/app/content/siteRoutes";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only,
// and adding @types/node is an unrequested dependency change (AGENTS.md).
import sitemap from "../../public/sitemap.xml?raw";
import llmsTxt from "../../public/llms.txt?raw";
import robotsTxt from "../../public/robots.txt?raw";
import indexHtml from "../../index.html?raw";
import {
  CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC,
  CLOUDFLARE_WEB_ANALYTICS_TOKEN,
  cloudflareWebAnalyticsSnippet,
} from "../../script/cloudflare-web-analytics.js";
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

type AboutTimelineEntry = {
  year: string;
  titleFragments: string[];
};

/**
 * Splits a timeline title into its base name and parenthetical asides
 * (e.g. `"Rhode Island School of Design (RISD) (Product Design & Manufacturing)"`
 * → `["Rhode Island School of Design", "RISD", "Product Design & Manufacturing"]`)
 * so llms.txt can reword/reorder a title's parts instead of being forced to
 * repeat an awkward, fully concatenated string verbatim.
 */
function splitTitleFragments(title: string): string[] {
  const parenthetical = [...title.matchAll(/\(([^)]+)\)/g)].map(
    (match) => match[1]
  );
  const base = title.replace(/\s*\([^)]*\)/g, "").trim();
  return [base, ...parenthetical].filter((fragment) => fragment.length > 0);
}

/**
 * Pulls paired timeline `year` + title fragments out of About.tsx so each
 * entry is checked as a unit. Independent year/fragment substring checks are
 * too weak: "2013" appears inside "2013–2015", and shared fragments like
 * "New York" / "Bloomberg" can survive after a sibling line is deleted.
 */
function extractAboutTimelineEntries(source: string): AboutTimelineEntry[] {
  const years = [...source.matchAll(/\byear:\s*"([^"]+)"/g)].map(
    (match) => match[1]
  );
  const titles = [...source.matchAll(/\btitle:\s*"([^"]+)"/g)].map(
    (match) => match[1]
  );
  if (years.length !== titles.length) {
    throw new Error(
      `About timeline year/title count mismatch: ${years.length} years, ${titles.length} titles`
    );
  }
  return years.map((year, index) => ({
    year,
    titleFragments: splitTitleFragments(titles[index]),
  }));
}

/** Bullet lines under the Work history section of llms.txt. */
function extractWorkHistoryLines(markdown: string): string[] {
  const sectionMatch = markdown.match(
    /## Work history \(source: \/about\)\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\n*$)/
  );
  if (!sectionMatch) {
    return [];
  }
  return sectionMatch[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "));
}

/** Bullet lines under the Elsewhere section of llms.txt. */
function extractElsewhereLines(markdown: string): string[] {
  const sectionMatch = markdown.match(
    /## Elsewhere\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\n*$)/
  );
  if (!sectionMatch) {
    return [];
  }
  return sectionMatch[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "));
}

const projectSourcesByKey: Record<string, string> = {
  replacementTrap: replacementTrapSource,
  stormSignal: stormSignalSource,
  walkabilityIndex: walkabilityIndexSource,
  bantr: bantrSource,
};

/**
 * Pulls external `href` values from a project page's `const ctas = [...]`
 * block. Evidence in llms.txt must cover every CTA so a new demo/repo link
 * cannot land on a project page while being omitted from the evidence layer.
 */
function extractCtaHrefs(source: string): string[] {
  const ctasMatch = source.match(/const ctas = \[([\s\S]*?)\];/);
  if (!ctasMatch) {
    return [];
  }
  return [...ctasMatch[1].matchAll(/href:\s*"(https?:\/\/[^"]+)"/g)].map(
    (match) => match[1]
  );
}

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
      "## Current selected work",
      "## Work history (source: /about)",
      "## Elsewhere",
    ];

    for (const heading of requiredHeadings) {
      expect(llmsTxt).toContain(heading);
    }
  });

  it("lists the Google Docs plain-text resume export under Elsewhere", () => {
    const elsewhereLines = extractElsewhereLines(llmsTxt);
    expect(elsewhereLines.some((line) => line.includes(resumePlainTextExportHref))).toBe(
      true
    );
  });

  it(
    "serves plain text from the Google Docs resume export URL",
    async () => {
      const response = await fetch(resumePlainTextExportHref, {
        redirect: "follow",
        headers: { Accept: "text/plain,*/*" },
        signal: AbortSignal.timeout(15_000),
      });

      expect(response.ok).toBe(true);

      const body = await response.text();
      const trimmed = body.trimStart();

      // Auth walls and Docs UI are HTML; a working export is plain text.
      expect(trimmed.startsWith("<!DOCTYPE")).toBe(false);
      expect(trimmed.startsWith("<html")).toBe(false);
      expect(body).toMatch(/Grant\s+Geist/i);
      expect(body.length).toBeGreaterThan(200);
    },
    20_000
  );

  it("frames current selected work as primary evidence and work history as context", () => {
    expect(llmsTxt).toMatch(/Evidence weight:/i);
    expect(llmsTxt).toMatch(/primary project evidence/i);
    expect(llmsTxt).toMatch(/current portfolio/i);
    expect(llmsTxt).toMatch(/not part of the current selected portfolio/i);
    expect(llmsTxt).toMatch(/historical education/i);
    expect(llmsTxt).toMatch(
      /should not be treated as current portfolio case studies/i
    );
  });

  it("advertises llms.txt from robots.txt without abusing Sitemap", () => {
    expect(robotsTxt).toContain("https://grantgeist.com/llms.txt");
    expect(robotsTxt).toContain("Sitemap: https://grantgeist.com/sitemap.xml");
    expect(robotsTxt).not.toMatch(/Sitemap:\s*https:\/\/grantgeist\.com\/llms\.txt/);
  });

  it("declares an absolute llms-txt head link in index.html", () => {
    expect(indexHtml).toContain('rel="llms-txt"');
    expect(indexHtml).toContain('href="https://grantgeist.com/llms.txt"');
  });

  it("keeps Cloudflare Web Analytics out of source index.html (production build injects it)", () => {
    expect(indexHtml).not.toContain(CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC);
    expect(indexHtml).not.toContain("data-cf-beacon");
  });

  it("defines a valid Cloudflare Web Analytics production snippet", () => {
    expect(typeof CLOUDFLARE_WEB_ANALYTICS_TOKEN).toBe("string");
    expect(CLOUDFLARE_WEB_ANALYTICS_TOKEN.length).toBeGreaterThan(0);

    const snippet = cloudflareWebAnalyticsSnippet();
    const beaconScripts = [
      ...snippet.matchAll(
        new RegExp(
          `<script[^>]*src=["']${CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC.replace(
            /\./g,
            "\\."
          )}["'][^>]*>`,
          "gi"
        )
      ),
    ];
    expect(beaconScripts).toHaveLength(1);

    const beaconAttr =
      snippet.match(/data-cf-beacon='(\{[^']+\})'/) ??
      snippet.match(/data-cf-beacon="(\{[^"]+\})"/);
    expect(beaconAttr).not.toBeNull();

    const beaconConfig = JSON.parse(beaconAttr![1]);
    expect(typeof beaconConfig.token).toBe("string");
    expect(beaconConfig.token.length).toBeGreaterThan(0);
    expect(beaconConfig.token).toBe(CLOUDFLARE_WEB_ANALYTICS_TOKEN);
  });

  it("includes every project page CTA href in llms.txt", () => {
    for (const [, projectSource] of Object.entries(projectSourcesByKey)) {
      const hrefs = extractCtaHrefs(projectSource);
      expect(hrefs.length).toBeGreaterThan(0);

      for (const href of hrefs) {
        expect(llmsTxt).toContain(href);
      }
    }
  });

  it("restates every About timeline entry as a work-history line", () => {
    const entries = extractAboutTimelineEntries(aboutSource);
    const lines = extractWorkHistoryLines(llmsTxt);
    expect(entries.length).toBeGreaterThan(0);
    expect(lines.length).toBe(entries.length);

    for (const entry of entries) {
      // Exact year prefix (`- 2013 —`) so "2013" cannot match "2013–2015".
      const line = lines.find((candidate) =>
        candidate.startsWith(`- ${entry.year} —`)
      );
      expect(line).toBeDefined();
      for (const fragment of entry.titleFragments) {
        expect(line).toContain(fragment);
      }
    }
  });

  it("does not contain prompt-injection or ranking-manipulation phrasing", () => {
    for (const pattern of INJECTION_PATTERNS) {
      expect(llmsTxt).not.toMatch(pattern);
    }
  });
});
