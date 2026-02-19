/**
 * Project Page Integration Tests
 *
 * Test Philosophy: Catch "long tail" issues that automated tools flag
 * - ✅ Test: Accessibility (semantic HTML structure, heading hierarchy)
 * - ✅ Test: Link validation (external links have proper attributes, security)
 * - ✅ Test: Navigation/routing (back links work correctly)
 * - ✅ Test: CTA buttons (proper href, target, rel attributes)
 * - ✅ Test: Image loading (alt text present for accessibility)
 * - ✅ Test: Component composition (pages render without errors, consistent structure)
 *
 * These tests catch issues that TypeScript, ESLint, and automated tools flag
 * but aren't caught by basic rendering tests. Focus on functionality over appearance.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Bantr } from "@/app/projects/Bantr";
import { ReplacementTrap } from "@/app/projects/ReplacementTrap";
import { WalkabilityIndexDetail } from "@/app/projects/WalkabilityIndex";
import { StormSignal } from "@/app/projects/StormSignal";

describe("Project Pages - Accessibility", () => {
  it("Bantr page has semantic HTML structure", () => {
    render(
      <MemoryRouter>
        <Bantr />
      </MemoryRouter>
    );

    // Check for main landmark
    const main = document.querySelector("main");
    expect(main).toBeTruthy();

    // Check for headings hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("Bantr");
  });

  it("ReplacementTrap page has semantic HTML structure", () => {
    render(
      <MemoryRouter>
        <ReplacementTrap />
      </MemoryRouter>
    );

    const main = document.querySelector("main");
    expect(main).toBeTruthy();

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("Replacement Trap");
  });

  it("WalkabilityIndex page has semantic HTML structure", () => {
    render(
      <MemoryRouter>
        <WalkabilityIndexDetail />
      </MemoryRouter>
    );

    const main = document.querySelector("main");
    expect(main).toBeTruthy();

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("Walkability Index");
  });

  it("StormSignal page has semantic HTML structure", () => {
    render(
      <MemoryRouter>
        <StormSignal />
      </MemoryRouter>
    );

    const main = document.querySelector("main");
    expect(main).toBeTruthy();

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("Storm Signal");
  });
});

describe("Project Pages - Link Validation", () => {
  const pages = [
    { Component: Bantr, name: "Bantr" },
    { Component: ReplacementTrap, name: "ReplacementTrap" },
    { Component: WalkabilityIndexDetail, name: "WalkabilityIndex" },
    { Component: StormSignal, name: "StormSignal" },
  ];

  pages.forEach(({ Component, name }) => {
    it(`${name} external links have proper attributes`, () => {
      render(
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      );

      const externalLinks = screen.getAllByRole("link").filter(
        (link) => link.getAttribute("href")?.startsWith("http")
      );

      // If there are external links, validate them
      if (externalLinks.length > 0) {
        externalLinks.forEach((link) => {
          const href = link.getAttribute("href");
          const target = link.getAttribute("target");
          const rel = link.getAttribute("rel");

          expect(href).toBeTruthy();
          if (target === "_blank") {
            expect(rel).toContain("noreferrer");
          }
        });
      }
    });
  });
});

describe("Project Pages - Navigation", () => {
  it("Bantr back link navigates correctly", () => {
    render(
      <MemoryRouter>
        <Bantr />
      </MemoryRouter>
    );

    const backLinks = screen.getAllByText("Back to Case Studies");
    expect(backLinks.length).toBeGreaterThan(0);
    const heroBackLink = backLinks[0];
    expect(heroBackLink).toBeTruthy();
    expect(heroBackLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("ReplacementTrap back link navigates correctly", () => {
    render(
      <MemoryRouter>
        <ReplacementTrap />
      </MemoryRouter>
    );

    // ReplacementTrap has multiple back links - check the first one (in hero)
    const backLinks = screen.getAllByText("Back to Case Studies");
    expect(backLinks.length).toBeGreaterThan(0);
    const heroBackLink = backLinks[0];
    expect(heroBackLink).toBeTruthy();
    expect(heroBackLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("WalkabilityIndex back link navigates correctly", () => {
    render(
      <MemoryRouter>
        <WalkabilityIndexDetail />
      </MemoryRouter>
    );

    const backLinks = screen.getAllByText("Back to Case Studies");
    expect(backLinks.length).toBeGreaterThan(0);
    const heroBackLink = backLinks[0];
    expect(heroBackLink).toBeTruthy();
    expect(heroBackLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("StormSignal back link navigates correctly", () => {
    render(
      <MemoryRouter>
        <StormSignal />
      </MemoryRouter>
    );

    const backLinks = screen.getAllByText("Back to Case Studies");
    expect(backLinks.length).toBeGreaterThan(0);
    const heroBackLink = backLinks[0];
    expect(heroBackLink).toBeTruthy();
    expect(heroBackLink.closest("a")).toHaveAttribute("href", "/");
  });
});

describe("Project Pages - CTA Buttons", () => {
  it("Bantr CTA buttons have required attributes", () => {
    render(
      <MemoryRouter>
        <Bantr />
      </MemoryRouter>
    );

    const ctaButtons = screen.getAllByRole("link").filter((link) =>
      ["Live Demo", "View on Github"].some((text) =>
        link.textContent?.includes(text)
      )
    );

    ctaButtons.forEach((button) => {
      expect(button).toHaveAttribute("href");
      const href = button.getAttribute("href");
      expect(href).toBeTruthy();
      if (href?.startsWith("http")) {
        const target = button.getAttribute("target");
        if (target === "_blank") {
          expect(button.getAttribute("rel")).toContain("noreferrer");
        }
      }
    });
  });

  it("ReplacementTrap CTA buttons have required attributes", () => {
    render(
      <MemoryRouter>
        <ReplacementTrap />
      </MemoryRouter>
    );

    const ctaButtons = screen.getAllByRole("link").filter((link) =>
      ["Read the Essay", "View on Github"].some((text) =>
        link.textContent?.includes(text)
      )
    );

    ctaButtons.forEach((button) => {
      expect(button).toHaveAttribute("href");
      const href = button.getAttribute("href");
      expect(href).toBeTruthy();
      if (href?.startsWith("http")) {
        const target = button.getAttribute("target");
        if (target === "_blank") {
          expect(button.getAttribute("rel")).toContain("noreferrer");
        }
      }
    });
  });

  it("WalkabilityIndex CTA buttons have required attributes", () => {
    render(
      <MemoryRouter>
        <WalkabilityIndexDetail />
      </MemoryRouter>
    );

    const ctaButtons = screen.getAllByRole("link").filter((link) =>
      ["Live Demo", "View on Github"].some((text) =>
        link.textContent?.includes(text)
      )
    );

    ctaButtons.forEach((button) => {
      expect(button).toHaveAttribute("href");
      const href = button.getAttribute("href");
      expect(href).toBeTruthy();
      if (href?.startsWith("http")) {
        const target = button.getAttribute("target");
        if (target === "_blank") {
          expect(button.getAttribute("rel")).toContain("noreferrer");
        }
      }
    });
  });

  it("StormSignal CTA buttons have required attributes", () => {
    render(
      <MemoryRouter>
        <StormSignal />
      </MemoryRouter>
    );

    const ctaButtons = screen.getAllByRole("link").filter((link) =>
      ["Live Demo", "View on Github"].some((text) =>
        link.textContent?.includes(text)
      )
    );

    ctaButtons.forEach((button) => {
      expect(button).toHaveAttribute("href");
      const href = button.getAttribute("href");
      expect(href).toBeTruthy();
      if (href?.startsWith("http")) {
        const target = button.getAttribute("target");
        if (target === "_blank") {
          expect(button.getAttribute("rel")).toContain("noreferrer");
        }
      }
    });
  });
});

describe("Project Pages - Image Loading", () => {
  const pages = [
    { Component: Bantr, name: "Bantr" },
    { Component: ReplacementTrap, name: "ReplacementTrap" },
    { Component: WalkabilityIndexDetail, name: "WalkabilityIndex" },
    { Component: StormSignal, name: "StormSignal" },
  ];

  pages.forEach(({ Component, name }) => {
    it(`${name} images have alt text`, () => {
      render(
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      );

      const images = document.querySelectorAll("img");
      if (images.length > 0) {
        images.forEach((img) => {
          const alt = img.getAttribute("alt");
          // Alt text should exist (even if empty for decorative images)
          expect(alt).not.toBeNull();
        });
      }
    });
  });
});

describe("Project Pages - Component Composition", () => {
  it("All project pages render without errors", () => {
    const pages = [
      { Component: Bantr, name: "Bantr" },
      { Component: ReplacementTrap, name: "ReplacementTrap" },
      { Component: WalkabilityIndexDetail, name: "WalkabilityIndex" },
      { Component: StormSignal, name: "StormSignal" },
    ];

    pages.forEach(({ Component, name }) => {
      expect(() => {
        render(
          <MemoryRouter>
            <Component />
          </MemoryRouter>
        );
      }).not.toThrow();
    });
  });

  it("All project pages have consistent structure", () => {
    const pages = [
      { Component: Bantr, name: "Bantr" },
      { Component: ReplacementTrap, name: "ReplacementTrap" },
      { Component: WalkabilityIndexDetail, name: "WalkabilityIndex" },
      { Component: StormSignal, name: "StormSignal" },
    ];

    pages.forEach(({ Component }) => {
      const { container } = render(
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      );

      // All pages should have a main element or section
      const main = container.querySelector("main");
      const section = container.querySelector("section");
      expect(main || section).toBeTruthy();

      // All pages should have at least one heading
      const heading = container.querySelector("h1");
      expect(heading).toBeTruthy();
    });
  });
});
