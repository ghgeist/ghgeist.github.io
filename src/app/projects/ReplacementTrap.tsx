import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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
              A systems-level economic model showing why most home infrastructure
              replacements never repay their cost.
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
                Major home systems are marketed as “investments.” But under
                realistic financing, lifespan, and efficiency assumptions,
                most replacements create structural loss rather than compounding value.
              </p>
              <div className="mt-4 text-gray-500 font-mono text-sm">
                The result: recurring liquidity shocks that quietly erode household wealth.
              </div>
            </Section>

            {/* WHAT I BUILT */}
            <Section kicker="02" title="What I built">
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    A lifecycle cash-flow model across 11 residential systems.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    Replacement / Payback ratio framework (R/P) to classify structural loss.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    HELOC financing simulations to test liquidity amplification.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">—</span>
                  <span>
                    Monte Carlo sensitivity analysis under price volatility.
                  </span>
                </li>
              </ul>

              <div className="mt-6 border border-white/5 bg-black/20 p-4">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">
                  Model Structure
                </div>
                <div className="text-gray-300 font-mono text-sm whitespace-pre leading-relaxed">
{`System Input Assumptions
      ↓
Lifecycle Cash Flow Model
      ↓
Replacement / Payback Classification
      ↓
Sensitivity + Financing Stress Test`}
                </div>
              </div>
            </Section>

            {/* TRY IT */}
            <Section kicker="03" title="Explore the work">
              <p className="text-gray-400 leading-relaxed">
                Read the full essay for narrative framing and implications,
                or inspect the repository for model structure, tests, and simulations.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
                ))}
              </div>

              <div className="mt-6 text-gray-500 font-mono text-xs">
                If you only read one section: see the R/P ratio classification.
              </div>
            </Section>

          </div>
        </div>
      </section>
    </main>
  );
}