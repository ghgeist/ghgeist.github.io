import { describe, it, expect } from "vitest";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only,
// and adding @types/node is an unrequested dependency change (AGENTS.md).
import noiseSvg from "../../public/assets/noise.svg?raw";
import heroSource from "../app/components/Hero.tsx?raw";

describe("local texture assets", () => {
  it("ships a real SVG noise texture for Hero overlays", () => {
    expect(noiseSvg).toMatch(/<svg\b/i);
    expect(noiseSvg).toMatch(/feTurbulence/i);
    expect(noiseSvg.length).toBeGreaterThan(80);
  });

  it("Hero references the local noise asset, not an external host", () => {
    // Avoid embedding a full Tailwind arbitrary class in this file — Tailwind
    // scans tests and would warn about unresolved template placeholders.
    expect(heroSource).toContain("/assets/noise.svg");
    expect(heroSource).toMatch(/url\(\s*['"]\/assets\/noise\.svg['"]\s*\)/);
    expect(heroSource).not.toMatch(/grainy-gradients/i);
    expect(heroSource).not.toMatch(/https?:\/\/[^"'`\s]*noise\.svg/i);
  });
});
