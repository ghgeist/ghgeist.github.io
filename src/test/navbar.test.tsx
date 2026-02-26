import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "@/app/components/Navbar";

describe("Navbar", () => {
  it("renders primary navigation links with expected URLs", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Case Studies" })).toHaveAttribute("href", "/#page-top");
    expect(screen.getByRole("link", { name: "Approach" })).toHaveAttribute("href", "/#skills");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Work with me" })).toHaveAttribute("href", "/#work-with-me");
  });

  it("opens and closes the mobile menu with accessible state", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    expect(toggle).toHaveAttribute("aria-controls", "primary-navigation-menu");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeTruthy();
    expect(document.getElementById("primary-navigation-menu")).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("primary-navigation-menu")).toBeNull();
  });

  it("closes the mobile menu after selecting a navigation link", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    const mobileMenu = document.getElementById("primary-navigation-menu");
    expect(mobileMenu).toBeTruthy();

    fireEvent.click(within(mobileMenu as HTMLElement).getByRole("link", { name: "About" }));

    expect(document.getElementById("primary-navigation-menu")).toBeNull();
  });
});
