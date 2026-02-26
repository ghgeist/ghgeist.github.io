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
});
