import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { DocumentMeta } from "@/app/components/DocumentMeta";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  getRouteMeta,
  TITLE_SUFFIX,
} from "@/app/content/routeMetadata";
import { siteRoutes } from "@/app/content/siteRoutes";
import {
  bantrProject,
  stormSignalProject,
} from "@/app/projects/content/selectedWorkProjects";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only.
import sitemap from "../../public/sitemap.xml?raw";
import llmsTxt from "../../public/llms.txt?raw";

function ensureDescriptionMeta() {
  let description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  );
  if (!description) {
    description = document.createElement("meta");
    description.setAttribute("name", "description");
    description.setAttribute("content", "default");
    document.head.appendChild(description);
  }
  return description;
}

function clearHeadArtifacts() {
  document
    .querySelectorAll("[data-managed-meta]")
    .forEach((node) => node.remove());
  document.title = "";
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", "");
  }
}

function NavigateButton({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(to)}>
      {label}
    </button>
  );
}

function renderDocumentMeta(initialPath: string) {
  ensureDescriptionMeta();
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <DocumentMeta />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/card" element={<div>Card</div>} />
        <Route
          path={bantrProject.route}
          element={<NavigateButton to={stormSignalProject.route} label="To Storm" />}
        />
        <Route
          path={stormSignalProject.route}
          element={<NavigateButton to={bantrProject.route} label="To Bantr" />}
        />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  clearHeadArtifacts();
});

describe("getRouteMeta", () => {
  it("returns distinct titles and project meta descriptions", () => {
    const home = getRouteMeta("/");
    const about = getRouteMeta("/about");
    const bantr = getRouteMeta(bantrProject.route);
    const storm = getRouteMeta(stormSignalProject.route);

    expect(home.title).toBe("Grant Geist | Data Product Strategist");
    expect(about.title).toBe(`About${TITLE_SUFFIX}`);
    expect(bantr.title).toBe(`${bantrProject.title}${TITLE_SUFFIX}`);
    expect(storm.title).toBe(`${stormSignalProject.title}${TITLE_SUFFIX}`);

    const titles = [home, about, bantr, storm].map((meta) => meta.title);
    expect(new Set(titles).size).toBe(titles.length);

    expect(bantr.description).toBe(bantrProject.metaDescription);
    expect(storm.description).toBe(stormSignalProject.metaDescription);
    expect(home.ogImage).toBe(DEFAULT_OG_IMAGE);
    expect(bantr.ogImage).toBe(DEFAULT_OG_IMAGE);
    expect(storm.ogImage).toBe(DEFAULT_OG_IMAGE);
    expect(bantr.ogImage.endsWith(".jpg")).toBe(true);
  });

  it("returns dedicated card metadata without noindex or personJsonLd extras", () => {
    const card = getRouteMeta("/card");

    expect(card.title).toBe(`Digital Business Card${TITLE_SUFFIX}`);
    expect(card.description).toBe(
      "Contact Grant Geist, Tech Strategy and AI Adoption at G. H. Geist Studio LLC, and save his digital business card."
    );
    expect(card.ogType).toBe("website");
    expect(card.ogImage).toBe(DEFAULT_OG_IMAGE);
    expect(card.robots).toBeUndefined();
    expect(absoluteUrl("/card")).toBe("https://grantgeist.com/card");
  });

  it("treats GitHub Pages trailing-slash URLs as the slash-free route", () => {
    expect(getRouteMeta("/card/")).toEqual(getRouteMeta("/card"));
    expect(getRouteMeta("/about/")).toEqual(getRouteMeta("/about"));
    expect(getRouteMeta("/card/").robots).toBeUndefined();
    expect(getRouteMeta("/card/not-a-page").robots).toBe("noindex");
  });

  it("uses distinct noindex copy for unknown paths", () => {
    const meta = getRouteMeta("/does-not-exist");
    expect(meta.title).toBe(`Page not found${TITLE_SUFFIX}`);
    expect(meta.path).toBe("/does-not-exist");
    expect(meta.robots).toBe("noindex");
    expect(meta.description).toMatch(/does not exist/i);
    expect(meta.jsonLd).toEqual([]);
  });

  it("emits home absolute URLs that match sitemap.xml and llms.txt", () => {
    const homeUrl = absoluteUrl("/");
    expect(homeUrl).toBe("https://grantgeist.com/");
    expect(sitemap).toContain(`<loc>${homeUrl}</loc>`);
    expect(llmsTxt).toContain(`[Home](${homeUrl})`);

    for (const route of siteRoutes) {
      const url = absoluteUrl(route.path);
      expect(sitemap).toContain(`<loc>${url}</loc>`);
      expect(llmsTxt).toContain(`[${route.title}](${url})`);
    }
  });
});

describe("DocumentMeta", () => {
  it("writes title, description, canonical, OG, Twitter, and JSON-LD for home", async () => {
    renderDocumentMeta("/");
    const expected = getRouteMeta("/");

    await waitFor(() => {
      expect(document.title).toBe(expected.title);
    });

    expect(
      document.querySelector('meta[name="description"]')?.getAttribute("content")
    ).toBe(expected.description);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(absoluteUrl("/"));
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute("content")
    ).toBe(absoluteUrl("/"));
    expect(
      document.querySelector('meta[property="og:title"]')?.getAttribute("content")
    ).toBe(expected.title);
    expect(
      document.querySelector('meta[property="og:image"]')?.getAttribute("content")
    ).toBe(DEFAULT_OG_IMAGE);
    expect(
      document.querySelector('meta[name="twitter:card"]')?.getAttribute("content")
    ).toBe("summary_large_image");
    expect(
      document.querySelector('meta[name="twitter:image"]')?.getAttribute("content")
    ).toBe(DEFAULT_OG_IMAGE);

    const jsonLdScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-managed-meta]'
    );
    expect(jsonLdScripts.length).toBe(2);
    const types = [...jsonLdScripts].map(
      (script) => (JSON.parse(script.textContent ?? "{}") as { "@type": string })["@type"]
    );
    expect(types).toEqual(expect.arrayContaining(["Person", "WebSite"]));
  });

  it("keeps exactly one canonical across successive project navigations", async () => {
    const { getByRole } = renderDocumentMeta(bantrProject.route);

    await waitFor(() => {
      expect(document.title).toBe(`${bantrProject.title}${TITLE_SUFFIX}`);
    });

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(absoluteUrl(bantrProject.route));

    fireEvent.click(getByRole("button", { name: "To Storm" }));

    await waitFor(() => {
      expect(document.title).toBe(`${stormSignalProject.title}${TITLE_SUFFIX}`);
    });

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(absoluteUrl(stormSignalProject.route));
    expect(
      document.querySelectorAll("[data-managed-meta]")
    ).not.toHaveLength(0);
    expect(
      document.querySelectorAll('meta[property="og:title"]')
    ).toHaveLength(1);
    expect(
      document.querySelectorAll('script[type="application/ld+json"][data-managed-meta]')
    ).toHaveLength(2);

    fireEvent.click(getByRole("button", { name: "To Bantr" }));

    await waitFor(() => {
      expect(document.title).toBe(`${bantrProject.title}${TITLE_SUFFIX}`);
    });

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(absoluteUrl(bantrProject.route));
  });

  it("writes card title, description, canonical, and card-only JSON-LD", async () => {
    renderDocumentMeta("/card");
    const expected = getRouteMeta("/card");

    await waitFor(() => {
      expect(document.title).toBe(expected.title);
    });

    expect(document.title).toBe("Digital Business Card | Grant Geist");
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute("content")
    ).toBe(expected.description);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://grantgeist.com/card");
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute("content")
    ).toBe("https://grantgeist.com/card");
    expect(
      document.querySelector('meta[name="robots"][data-managed-meta]')
    ).toBeNull();

    const jsonLdScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-managed-meta]'
    );
    expect(jsonLdScripts).toHaveLength(1);
    const jsonLdText = jsonLdScripts[0]?.textContent ?? "";
    const jsonLd = JSON.parse(jsonLdText) as {
      "@type": string;
      name: string;
      jobTitle: string;
      worksFor: { "@type": string; name: string };
      telephone?: string;
      email?: string;
      url: string;
      image: string;
      sameAs: string[];
    };
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toBe("Grant Geist");
    expect(jsonLd.jobTitle).toBe("Tech Strategy and AI Adoption");
    expect(jsonLd.worksFor).toEqual({
      "@type": "Organization",
      name: "G. H. Geist Studio LLC",
    });
    expect(jsonLd.telephone).toBe("+1 786-539-4140");
    expect(jsonLd.email).toBeUndefined();
    expect(jsonLdText).not.toContain("hello@grantgeist.com");
    expect(jsonLd.url).toBe("https://grantgeist.com");
    expect(jsonLd.image).toBe("https://grantgeist.com/assets/headshot.jpg");
    expect(jsonLd.sameAs).toEqual(["https://www.linkedin.com/in/grantgeist/"]);
    expect(jsonLdText).not.toContain("https://github.com/ghgeist");
    expect(jsonLdText).not.toContain("https://thedonkeyaxiom.substack.com/");
  });

  it("writes card metadata for the GitHub Pages /card/ URL instead of noindex", async () => {
    renderDocumentMeta("/card/");
    const expected = getRouteMeta("/card");

    await waitFor(() => {
      expect(document.title).toBe(expected.title);
    });

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://grantgeist.com/card");
    expect(
      document.querySelector('meta[name="robots"][data-managed-meta]')
    ).toBeNull();
  });

  it("writes noindex for unknown paths and clears it on known navigation", async () => {
    ensureDescriptionMeta();
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/does-not-exist"]}>
        <DocumentMeta />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="*"
            element={<NavigateButton to="/" label="To Home" />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.title).toBe(`Page not found${TITLE_SUFFIX}`);
    });

    expect(
      document
        .querySelector('meta[name="robots"][data-managed-meta]')
        ?.getAttribute("content")
    ).toBe("noindex");

    fireEvent.click(getByRole("button", { name: "To Home" }));

    await waitFor(() => {
      expect(document.title).toBe(getRouteMeta("/").title);
    });

    expect(
      document.querySelector('meta[name="robots"][data-managed-meta]')
    ).toBeNull();
  });
});
