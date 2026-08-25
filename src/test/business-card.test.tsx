import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BusinessCard } from "@/app/components/BusinessCard";
import { CONTACT_FORM_HREF } from "@/app/content/routeMetadata";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only.
import vCard from "../../public/grant_geist.vcf?raw";

describe("BusinessCard", () => {
  it("wires action hrefs without a download attribute on Save Contact", () => {
    render(<BusinessCard />);

    const saveContact = screen.getByRole("link", { name: "Save Contact" });
    expect(saveContact).toHaveAttribute("href", "/grant_geist.vcf");
    expect(saveContact).not.toHaveAttribute("download");

    expect(screen.getByRole("link", { name: /Get in touch/i })).toHaveAttribute(
      "href",
      CONTACT_FORM_HREF
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/grantgeist/"
    );
    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
      "href",
      "https://grantgeist.com"
    );
    expect(screen.getByRole("img", { name: "Grant Geist" })).toHaveAttribute(
      "src",
      "/assets/headshot.jpg"
    );
  });

  it("has no phone number or tel: link", () => {
    const { container } = render(<BusinessCard />);

    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent ?? "").not.toMatch(
      /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/
    );
  });
});

describe("grant_geist.vcf", () => {
  it("is a VERSION 3.0 vCard with CRLF line endings and no TEL", () => {
    expect(vCard).toContain("BEGIN:VCARD");
    expect(vCard).toContain("VERSION:3.0");
    expect(vCard).toContain("FN:Grant Geist");
    expect(vCard).toContain("N:Geist;Grant;;;");
    expect(vCard).toContain("ORG:G. H. Geist Studio LLC");
    expect(vCard).toContain("TITLE:Tech Strategy and AI Consulting");
    expect(vCard).not.toMatch(/^EMAIL[:;]/m);
    expect(vCard).toContain("URL;TYPE=WORK:https://grantgeist.com/#work-with-me");
    expect(vCard).toContain("PHOTO;ENCODING=b;TYPE=JPEG:");
    expect(vCard).toContain("/9j/");
    expect(vCard).toContain("END:VCARD");
    expect(vCard.split(/\r\n/).some((line) => /^TEL[:;]/i.test(line))).toBe(
      false
    );

    const withoutCrlf = vCard.replace(/\r\n/g, "");
    expect(withoutCrlf).not.toContain("\n");
    expect(withoutCrlf).not.toContain("\r");
    expect(vCard.endsWith("\r\n")).toBe(true);
  });
});
