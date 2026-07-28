import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { DocumentMeta } from "@/app/components/DocumentMeta";
import { SITE_URL } from "@/app/content/siteRoutes";
import {
  DEFAULT_OG_IMAGE,
  getRouteMeta,
  TITLE_SUFFIX,
} from "@/app/content/routeMetadata";
import {
  bantrProject,
  stormSignalProject,
} from "@/app/projects/content/selectedWorkProjects";

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

  it("falls back for unknown paths without inventing a known title", () => {
    const meta = getRouteMeta("/does-not-exist");
    expect(meta.title).toBe("Grant Geist | Data Product Strategist");
    expect(meta.path).toBe("/does-not-exist");
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
    ).toBe(SITE_URL);
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
    ).toBe(`${SITE_URL}${bantrProject.route}`);

    fireEvent.click(getByRole("button", { name: "To Storm" }));

    await waitFor(() => {
      expect(document.title).toBe(`${stormSignalProject.title}${TITLE_SUFFIX}`);
    });

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe(`${SITE_URL}${stormSignalProject.route}`);
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
    ).toBe(`${SITE_URL}${bantrProject.route}`);
  });
});
