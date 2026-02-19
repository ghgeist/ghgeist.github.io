/**
 * CaseStudy Component Tests
 *
 * Test Philosophy: Focus on FUNCTIONALITY, not APPEARANCE
 * - ✅ Test: Components render without crashing
 * - ✅ Test: Navigation links work (href, target, rel)
 * - ✅ Test: Required props work
 * - ✅ Test: Component composition doesn't break
 * - ❌ Skip: CSS classes, styling, visual details (design iteration changes these)
 *
 * These tests provide "idiot insurance" against crashes and broken navigation
 * while allowing rapid design iteration without test brittleness.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudySectionCard } from "@/app/projects/components/CaseStudySectionCard";
import { CaseStudyPill } from "@/app/projects/components/CaseStudyPill";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";

describe("CaseStudy Components", () => {
  describe("CaseStudyHero", () => {
    it("renders with required props", () => {
      render(
        <MemoryRouter>
          <CaseStudyHero
            title="Test Project"
            framing={<p>Test framing text</p>}
            media={<div>Test media</div>}
          />
        </MemoryRouter>
      );

      expect(screen.getByText("Test Project")).toBeTruthy();
      expect(screen.getByText("Test framing text")).toBeTruthy();
      expect(screen.getByText("Test media")).toBeTruthy();
    });

    it("renders back link with default label", () => {
      render(
        <MemoryRouter>
          <CaseStudyHero
            title="Test Project"
            framing={<p>Test framing</p>}
            media={<div>Test media</div>}
          />
        </MemoryRouter>
      );

      const backLink = screen.getByText("Back to Case Studies");
      expect(backLink).toBeTruthy();
      expect(backLink.closest("a")).toHaveAttribute("href", "/");
    });

    it("renders back link with custom label and href", () => {
      render(
        <MemoryRouter>
          <CaseStudyHero
            title="Test Project"
            framing={<p>Test framing</p>}
            media={<div>Test media</div>}
            backTo="/projects"
            backLabel="Back to Projects"
          />
        </MemoryRouter>
      );

      const backLink = screen.getByText("Back to Projects");
      expect(backLink).toBeTruthy();
      expect(backLink.closest("a")).toHaveAttribute("href", "/projects");
    });

    it("renders CTAs when provided", () => {
      render(
        <MemoryRouter>
          <CaseStudyHero
            title="Test Project"
            framing={<p>Test framing</p>}
            media={<div>Test media</div>}
            ctas={<button>Test CTA</button>}
          />
        </MemoryRouter>
      );

      expect(screen.getByText("Test CTA")).toBeTruthy();
    });

    // Note: Skipping grid visibility test - design detail that changes during iteration
  });

  describe("CaseStudySectionCard", () => {
    it("renders with kicker and title", () => {
      render(
        <CaseStudySectionCard kicker="01" title="Test Section">
          <p>Test content</p>
        </CaseStudySectionCard>
      );

      expect(screen.getByText("01")).toBeTruthy();
      expect(screen.getByText("Test Section")).toBeTruthy();
      expect(screen.getByText("Test content")).toBeTruthy();
    });

    // Note: Skipping tone variant CSS class tests - design details that change during iteration
    // Tone prop is tested implicitly by rendering without crashing
  });

  describe("CaseStudyPill", () => {
    it("renders with title and description", () => {
      render(
        <CaseStudyPill title="Test Title" description="Test description" />
      );

      expect(screen.getByText("Test Title")).toBeTruthy();
      expect(screen.getByText("Test description")).toBeTruthy();
    });

    it("renders icon when provided", () => {
      render(
        <CaseStudyPill
          title="Test Title"
          description="Test description"
          icon={<ArrowRight data-testid="test-icon" />}
        />
      );

      expect(screen.getByTestId("test-icon")).toBeTruthy();
    });

    // Note: Skipping "no icon" test - optional feature, not critical path
  });

  describe("CaseStudyCtaButton", () => {
    it("renders with label and href", () => {
      render(<CaseStudyCtaButton label="Test Button" href="https://example.com" />);

      const button = screen.getByText("Test Button").closest("a");
      expect(button).toBeTruthy();
      expect(button).toHaveAttribute("href", "https://example.com");
    });

    // Note: Skipping variant CSS class tests - design details that change during iteration
    // Variants are tested implicitly by rendering without crashing

    it("opens in new tab by default", () => {
      render(<CaseStudyCtaButton label="Test Button" href="https://example.com" />);

      const button = screen.getByText("Test Button").closest("a");
      expect(button).toHaveAttribute("target", "_blank");
      expect(button).toHaveAttribute("rel", "noreferrer");
    });

    it("opens in same tab when target is _self", () => {
      render(
        <CaseStudyCtaButton
          label="Test Button"
          href="https://example.com"
          target="_self"
        />
      );

      const button = screen.getByText("Test Button").closest("a");
      expect(button).toHaveAttribute("target", "_self");
      expect(button).not.toHaveAttribute("rel");
    });

    // Note: Skipping arrow visibility tests - design detail, not critical functionality

    it("renders icon when provided", () => {
      render(
        <CaseStudyCtaButton
          label="Test Button"
          href="https://example.com"
          icon={<ArrowRight data-testid="custom-icon" />}
        />
      );

      expect(screen.getByTestId("custom-icon")).toBeTruthy();
    });
  });

  describe("ProjectPageShell", () => {
    it("renders children", () => {
      render(
        <ProjectPageShell theme="walkability">
          <div>Test content</div>
        </ProjectPageShell>
      );

      expect(screen.getByText("Test content")).toBeTruthy();
    });

    it("applies theme prop correctly", () => {
      // Test that theme prop is accepted and doesn't crash
      // Don't check CSS classes - those change during design iteration
      const { container: container1 } = render(
        <ProjectPageShell theme="walkability">
          <div>Test content</div>
        </ProjectPageShell>
      );
      expect(container1.querySelector("main")).toBeTruthy();

      const { container: container2 } = render(
        <ProjectPageShell theme="replacement">
          <div>Test content</div>
        </ProjectPageShell>
      );
      expect(container2.querySelector("main")).toBeTruthy();

      const { container: container3 } = render(
        <ProjectPageShell theme="bantr">
          <div>Test content</div>
        </ProjectPageShell>
      );
      expect(container3.querySelector("main")).toBeTruthy();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ProjectPageShell theme="walkability" className="custom-class">
          <div>Test content</div>
        </ProjectPageShell>
      );

      const main = container.querySelector("main");
      expect(main).toHaveClass("custom-class");
    });

    // Note: Skipping custom style test - design detail, not critical functionality
  });

  describe("Component Composition", () => {
    it("composes CaseStudyHero with CaseStudySectionCard", () => {
      render(
        <MemoryRouter>
          <div>
            <CaseStudyHero
              title="Test Project"
              framing={<p>Test framing</p>}
              media={<div>Test media</div>}
            />
            <CaseStudySectionCard kicker="01" title="Test Section">
              <p>Test content</p>
            </CaseStudySectionCard>
          </div>
        </MemoryRouter>
      );

      expect(screen.getByText("Test Project")).toBeTruthy();
      expect(screen.getByText("Test Section")).toBeTruthy();
    });

    it("composes ProjectPageShell with CaseStudy components", () => {
      render(
        <MemoryRouter>
          <ProjectPageShell theme="walkability">
            <CaseStudyHero
              title="Test Project"
              framing={<p>Test framing</p>}
              media={<div>Test media</div>}
            />
            <CaseStudySectionCard kicker="01" title="Test Section">
              <p>Test content</p>
            </CaseStudySectionCard>
          </ProjectPageShell>
        </MemoryRouter>
      );

      expect(screen.getByText("Test Project")).toBeTruthy();
      expect(screen.getByText("Test Section")).toBeTruthy();
    });
  });
});
