import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BusinessCard } from "@/app/components/BusinessCard";
// Prefer Vite ?raw over node:fs — tsconfig has types: ["vite/client"] only.
import vCard from "../../public/grant_geist.vcf?raw";

describe("BusinessCard", () => {
  it("wires action hrefs without a download attribute on Save Contact", () => {
    render(<BusinessCard />);

    const saveContact = screen.getByRole("link", { name: "Save Contact" });
    expect(saveContact).toHaveAttribute("href", "/grant_geist.vcf");
    expect(saveContact).not.toHaveAttribute("download");

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/grantgeist/"
    );
    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
      "href",
      "https://grantgeist.com"
    );
    expect(screen.getByRole("link", { name: /Call/i })).toHaveAttribute(
      "href",
      "tel:+17865394140"
    );
    expect(screen.getByRole("link", { name: /Email/i })).toHaveAttribute(
      "href",
      "mailto:hello@grantgeist.com"
    );
    expect(screen.getByRole("img", { name: "Grant Geist" })).toHaveAttribute(
      "src",
      "/assets/headshot.jpg"
    );
  });

  it("orders actions and shows the public title, phone, and email", () => {
    render(<BusinessCard />);

    expect(
      screen.getByText("Tech Strategy and AI Adoption")
    ).toBeInTheDocument();
    expect(screen.getByText("+1 786-539-4140")).toBeInTheDocument();
    expect(screen.getByText("hello@grantgeist.com")).toBeInTheDocument();

    const labels = screen
      .getAllByRole("link")
      .map((link) => link.textContent?.replace(/\s+/g, " ").trim());
    expect(labels).toEqual([
      "Save Contact",
      "LinkedIn",
      "Website",
      "Call+1 786-539-4140",
      "Emailhello@grantgeist.com",
    ]);
  });
});

describe("grant_geist.vcf", () => {
  it("is a VERSION 3.0 vCard with CRLF line endings, phone, and work email", () => {
    expect(vCard).toContain("BEGIN:VCARD");
    expect(vCard).toContain("VERSION:3.0");
    expect(vCard).toContain("FN:Grant Geist");
    expect(vCard).toContain("N:Geist;Grant;;;");
    expect(vCard).toContain("ORG:G. H. Geist Studio LLC");
    expect(vCard).toContain("TITLE:Tech Strategy and AI Adoption");
    expect(vCard).toContain("TEL;TYPE=CELL,WORK:+17865394140");
    expect(vCard).toContain(
      "EMAIL;TYPE=INTERNET,WORK:hello@grantgeist.com"
    );
    expect(vCard).toContain("URL;TYPE=WORK:https://grantgeist.com");
    expect(vCard).not.toContain("https://grantgeist.com/#work-with-me");
    expect(vCard).toContain("PHOTO;ENCODING=b;TYPE=JPEG:");
    expect(vCard).toContain("/9j/");
    expect(vCard).toContain("END:VCARD");

    const withoutCrlf = vCard.replace(/\r\n/g, "");
    expect(withoutCrlf).not.toContain("\n");
    expect(withoutCrlf).not.toContain("\r");
    expect(vCard.endsWith("\r\n")).toBe(true);
  });
});
