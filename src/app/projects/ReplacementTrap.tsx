import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type CtaLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
};

const ctas: CtaLink[] = [
  {
    label: "Read the Essay",
    href: "https://substack.com/@grantgeist/p-179539887",
    icon: <ExternalLink className="w-4 h-4" />,
    variant: "primary",
  },
  {
    label: "View on GitHub",
    href: "https://github.com/ghgeist/replacement_trap",
    icon: <Github className="w-4 h-4" />,
    variant: "secondary",
  },
];

function CtaButton({ label, href, icon, variant }: CtaLink) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-mono border transition-colors";
  const styles =
    variant === "primary"
      ? "bg-blue-500/10 text-blue-200 border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/15"
      : "bg-transparent text-gray-200 border-white/10 hover:border-white/25 hover:bg-white/5";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles}`}
    >
      {icon}
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 opacity-70" />
    </a>
  );
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/5 bg-[#151921] p-6">
      <div className="mb-4">
        <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">
          {kicker}
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export function ReplacementTrap() {
  return (
    <main className="bg-[#0B0E14] min-h-screen">
      {/* Top Frame */}
      <section className="relative border-b border-white/5">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0E14]/20 to-[#0B0E14]" />

        <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8 pt-20 pb-10">
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto md:mx-0"
          >
            {/* Metadata + CTA */}
            <div className="flex items-center justify-between gap-6 mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Case Studies
              </Link>
              <div className="flex items-center gap-3">
                {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
                ))}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              The Replacement Trap
            </h1>

            {/* One-line framing */}
            <p className="mt-4 text-gray-400 font-mono text-lg max-w-3xl leading-relaxed">
              A lifecycle cash-flow model testing when home systems die before they repay their cost.
            </p>

            {/* Hero visual placeholder */}
            <div className="mt-8 border border-white/10 bg-black/30 overflow-hidden">
              <div className="h-56 md:h-72 w-full relative">
                <div className="absolute inset-0 opacity-80 grayscale">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1581091215367-59ab6b9a1b53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
                    alt="Replacement Trap model preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/30 to-transparent" />
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl mx-auto md:mx-0 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* WHY */}
            <Section kicker="01" title="Why this matters">
              <p className="text-gray-400 leading-relaxed">
                Most major home systems are framed as “investments.”              </p>
              <p className="mt-4 text-gray-400 leading-relaxed">
                This project tests that claim structurally using a simple decision rule: how long the system lasts relative to how long it takes to pay for itself.
              </p>
              <div className="mt-4 text-gray-300 font-mono text-sm">
                <strong className="text-white">R/P Ratio (Replacement / Payback):</strong> lifespan ÷ payback period
              </div>
              <p className="mt-4 text-gray-400 leading-relaxed">
                In plain terms:
              </p>
              <ul className="mt-2 space-y-2 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">•</span>
                  <span>If the ratio is <strong className="text-white">greater than 1</strong>, the system survives long enough to earn back its installed cost.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">•</span>
                  <span>If the ratio is <strong className="text-white">less than 1</strong>, it reaches end-of-life before fully repaying its capital.</span>
                </li>
              </ul>
              <p className="mt-4 text-gray-400 leading-relaxed">
                When lifespan &lt; payback, each replacement cycle resets capital before recovery, creating structural loss instead of compounding return. This was illustrated by lifespan falling short of payback in 9 of 11 modeled scenarios.
              </p>
            </Section>

            {/* WHAT I BUILT */}
            <Section kicker="02" title="What I built">
              <p className="text-gray-400 leading-relaxed mb-4">
                A lifecycle cash-flow model covering 11 common residential systems (appliances, HVAC, lighting, insulation).
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                The model includes:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    An R/P threshold rule (lifespan ÷ payback)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    A 30-year cash-flow simulation that accounts for efficiency decline over time
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    HELOC financing scenarios to model replacements paid for with debt
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    Monte Carlo stress tests under changing energy prices and interest rates
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    A modular Python codebase with validation tests and reproducible outputs
                  </span>
                </li>
              </ul>

              <div className="mt-6">
                <p className="text-gray-400 leading-relaxed mb-3">
                  Model boundaries:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">—</span>
                    <span>Direct, measurable cash costs and savings only</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">—</span>
                    <span>Installation labor included in capital cost</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">—</span>
                    <span>Explicit lifespan assumptions with bounded volatility</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Comfort, carbon, and resilience premiums are excluded to keep the model focused on cash economics.
                </p>
              </div>

              <div className="mt-6 border border-white/5 bg-black/20 p-4">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">
                  Example
                </div>
                <p className="text-gray-300 leading-relaxed">
                  A standard 3-ton AC costing ~$9,500 and saving ~$200 per year reaches end-of-life around year 13, leaving a multi-thousand-dollar shortfall before payback.
                </p>
              </div>
            </Section>

            {/* TRY IT */}
            <Section kicker="03" title="Explore the work">
              <p className="text-gray-400 leading-relaxed">
                The essay explains the intuition behind the Replacement / Payback threshold and the broader housing implications.
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed">
                The repository exposes the model itself:
              </p>
              <ul className="mt-3 space-y-2 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>Full structure and assumptions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>Test coverage and validation logic</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>HELOC financing scenarios</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>Monte Carlo stress tests</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
                ))}
              </div>

              <div className="mt-6 space-y-2 text-gray-400 leading-relaxed">
                <p>
                  If you read one section, start with the R/P classification results and the cash-flow outputs.
                </p>
                <p>
                  All assumptions, boundaries, and mechanics are inspectable. This model is designed to withstand scrutiny, not just summarize a thesis.
                </p>
              </div>
            </Section>

          </div>
        </div>
      </section>
    </main>
  );
}