import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { toast } from "sonner";

import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Approach } from "@/app/components/Approach";
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
      <WorkWithMe />
    </>
  );
}

describe("Home route", () => {
  it("renders Hero, Approach, and WorkWithMe sections", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppShell>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /hi, i.?m grant/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Approach" })).toBeTruthy();
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

    expect(screen.getByRole("heading", { level: 1, name: "Walkability Index" })).toBeTruthy();
  });

  it("renders ReplacementTrap without crashing", () => {
    render(
      <MemoryRouter>
        <ReplacementTrap />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1, name: "The Replacement Trap" })).toBeTruthy();
  });

  it("renders StormSignal without crashing", () => {
    render(
      <MemoryRouter>
        <StormSignal />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1, name: "Storm Signal" })).toBeTruthy();
  });

  it("renders Bantr without crashing", () => {
    render(
      <MemoryRouter>
        <Bantr />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1, name: "Bantr" })).toBeTruthy();
  });
});

describe("WorkWithMe form", () => {
  function fillRequiredFields() {
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      screen.getByLabelText(/tell me about the problem or opportunity/i),
      {
        target: { value: "Need help structuring a data product strategy." },
      }
    );
  }

  it("submits and calls the handler", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 200,
      })
    );

    render(
      <MemoryRouter>
        <WorkWithMe />
        <Toaster />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/your email/i) as HTMLInputElement;
    const problemInput = screen.getByLabelText(
      /tell me about the problem or opportunity/i
    ) as HTMLTextAreaElement;

    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: /get in touch/i }));

    // Wait for async submission to complete and request to be sent.
    await waitFor(
      () => {
        expect(fetchSpy).toHaveBeenCalledTimes(1);
      },
      { timeout: 2000 }
    );

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://formspree.io/f/mreajoaw",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: expect.any(String),
      })
    );

    expect(
      screen.getByText(/thanks for reaching out\. i received your message/i)
    ).toBeTruthy();

    // Verify form fields are cleared after successful submission
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(problemInput.value).toBe("");

    fetchSpy.mockRestore();
  });

  it("blocks submission with invalid email input", async () => {
    vi.useFakeTimers();
    const successSpy = vi.spyOn(toast, "success").mockImplementation(() => {
      return "test-toast-id";
    });

    render(
      <MemoryRouter>
        <WorkWithMe />
        <Toaster />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(
      screen.getByLabelText(/tell me about the problem or opportunity/i),
      {
        target: { value: "Need help structuring a data product strategy." },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: /get in touch/i }));

    await vi.advanceTimersByTimeAsync(1100);
    expect(successSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
    successSpy.mockRestore();
  });
});
