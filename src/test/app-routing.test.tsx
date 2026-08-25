import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/app/App";

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("App routing integration", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders the home route with core sections", async () => {
    renderAt("/");

    expect(await screen.findByRole("heading", { name: /hi, i.?m grant/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Approach" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Work With Me" })).toBeTruthy();
  });

  it("renders the about route", async () => {
    renderAt("/about");

    expect(await screen.findByRole("heading", { name: "About" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
  });

  const cardPaths = ["/card", "/card/"] as const;

  cardPaths.forEach((path) => {
    it(`renders the digital business card without site chrome at ${path}`, async () => {
      renderAt(path);

      expect(
        await screen.findByRole("heading", { level: 1, name: "Grant Geist" })
      ).toBeTruthy();
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("link", { name: "Save Contact" })).toBeTruthy();
      expect(screen.getByRole("link", { name: /Email/ })).toBeTruthy();
      expect(screen.getByRole("link", { name: "LinkedIn" })).toBeTruthy();
      expect(screen.getByRole("link", { name: "Website" })).toBeTruthy();
      expect(screen.queryByRole("navigation", { name: "Primary" })).toBeNull();
      expect(document.querySelector("footer")).toBeNull();
    });
  });

  const projectRoutes: Array<{ path: string; title: string }> = [
    { path: "/projects/walkability-index", title: "Walkability Index" },
    { path: "/projects/replacement-trap", title: "The Replacement Trap" },
    { path: "/projects/bantr", title: "Bantr" },
    { path: "/projects/signal-storm", title: "Storm Signal" },
  ];

  projectRoutes.forEach(({ path, title }) => {
    it(`renders ${path}`, async () => {
      renderAt(path);

      expect(await screen.findByRole("heading", { level: 1, name: title })).toBeTruthy();
    });
  });

  it("renders the not-found page for unknown paths", async () => {
    renderAt("/does-not-exist");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Page not found" })
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(
      screen
        .getAllByRole("link", { name: "Bantr" })
        .some((link) => link.getAttribute("href") === "/projects/bantr")
    ).toBe(true);
  });
});
