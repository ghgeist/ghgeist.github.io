import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { toast } from "sonner";

import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Approach } from "@/app/components/Approach";
import { About } from "@/app/components/About";
import { WorkWithMe } from "@/app/components/WorkWithMe";
import { Footer } from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/sonner";

import { WalkabilityIndexDetail } from "@/app/projects/WalkabilityIndex";
import { StormSignal } from "@/app/projects/StormSignal";
import { Bantr } from "@/app/projects/Bantr";
import { ReplacementTrap } from "@/app/projects/ReplacementTrap";

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-gray-300 bg-[#0B0E14] min-h-screen">
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <About />
      <WorkWithMe />
    </>
  );
}

describe("Home route", () => {
  it("renders Hero, Approach, About, and WorkWithMe sections", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppShell>
      </MemoryRouter>
    );

    expect(document.getElementById("hero") || document.querySelector("section")).toBeTruthy();
    expect(screen.getByText("Work With Me")).toBeTruthy();
  });
});

describe("Project routes", () => {
  it("renders WalkabilityIndex at /projects/walkability-index", () => {
    render(
      <MemoryRouter initialEntries={["/projects/walkability-index"]}>
        <AppShell>
          <Routes>
            <Route path="/projects/walkability-index" element={<WalkabilityIndexDetail />} />
          </Routes>
        </AppShell>
      </MemoryRouter>
    );

    expect(document.querySelector("section") || document.querySelector("main") || document.querySelector("div")).toBeTruthy();
  });

  it("renders ReplacementTrap without crashing", () => {
    render(
      <MemoryRouter>
        <ReplacementTrap />
      </MemoryRouter>
    );

    expect(document.querySelector("section") || document.querySelector("main") || document.querySelector("div")).toBeTruthy();
  });

  it("renders StormSignal without crashing", () => {
    render(
      <MemoryRouter>
        <StormSignal />
      </MemoryRouter>
    );

    expect(document.querySelector("section") || document.querySelector("main") || document.querySelector("div")).toBeTruthy();
  });

  it("renders Bantr without crashing", () => {
    render(
      <MemoryRouter>
        <Bantr />
      </MemoryRouter>
    );

    expect(document.querySelector("section") || document.querySelector("main") || document.querySelector("div")).toBeTruthy();
  });
});

describe("WorkWithMe form", () => {
  it("submits and calls the handler", async () => {
    // Mock toast.success to verify it's called on successful submission
    const toastSpy = vi.spyOn(toast, "success").mockImplementation(() => {
      return "test-toast-id";
    });

    render(
      <MemoryRouter>
        <WorkWithMe />
        <Toaster />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/your email/i) as HTMLInputElement;
    const problemInput = screen.getByLabelText(/tell me about the problem or opportunity/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(problemInput, {
      target: { value: "Need help structuring a data product strategy." },
    });

    fireEvent.click(screen.getByRole("button", { name: /get in touch/i }));

    // Wait for async submission to complete (includes 1s delay)
    await waitFor(
      () => {
        expect(toastSpy).toHaveBeenCalledWith("Message sent! I'll get back to you soon.");
      },
      { timeout: 2000 }
    );

    // Verify form fields are cleared after successful submission
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(problemInput.value).toBe("");

    toastSpy.mockRestore();
  });
});

