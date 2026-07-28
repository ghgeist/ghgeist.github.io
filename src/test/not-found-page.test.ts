import { describe, expect, it } from "vitest";
import { siteRoutes } from "@/app/content/siteRoutes";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only.
import notFoundHtml from "../../public/404.html?raw";

describe("static 404 page", () => {
  it("is a real noindex page, not an SPA redirect", () => {
    expect(notFoundHtml).toContain('name="robots"');
    expect(notFoundHtml).toContain('content="noindex"');
    expect(notFoundHtml).toContain("<h1>Page not found</h1>");
    expect(notFoundHtml).not.toContain("sessionStorage");
    expect(notFoundHtml).not.toContain("Redirecting");
  });

  it("loads Montserrat instead of only naming it", () => {
    expect(notFoundHtml).toMatch(/fonts\.googleapis\.com.*Montserrat/);
    expect(notFoundHtml).toContain('font-family: Montserrat');
  });

  it("links every siteRoutes path", () => {
    for (const route of siteRoutes) {
      expect(notFoundHtml).toContain(`href="${route.path}"`);
      expect(notFoundHtml).toContain(`>${route.title}<`);
    }
  });
});
