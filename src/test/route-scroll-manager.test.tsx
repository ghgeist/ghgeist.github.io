import { afterEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RouteScrollManager } from "@/app/components/RouteScrollManager";

const originalMatchMedia = window.matchMedia;
const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

afterEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: originalMatchMedia,
  });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    writable: true,
    value: originalScrollIntoView,
  });
  vi.restoreAllMocks();
});

describe("RouteScrollManager", () => {
  it("scrolls to top for non-home routes", async () => {
    mockMatchMedia(false);
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/about"]}>
        <RouteScrollManager />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
    });
  });

  it("scrolls to hash targets with smooth behavior by default", async () => {
    mockMatchMedia(false);
    const scrollIntoViewSpy = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      writable: true,
      value: scrollIntoViewSpy,
    });

    render(
      <MemoryRouter initialEntries={["/#skills"]}>
        <RouteScrollManager />
        <section id="skills">Approach</section>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ block: "start", behavior: "smooth" });
    });
  });

  it("uses auto scrolling for users who prefer reduced motion", async () => {
    mockMatchMedia(true);
    const scrollIntoViewSpy = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      writable: true,
      value: scrollIntoViewSpy,
    });

    render(
      <MemoryRouter initialEntries={["/#work-with-me"]}>
        <RouteScrollManager />
        <section id="work-with-me">Work With Me</section>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ block: "start", behavior: "auto" });
    });
  });
});
