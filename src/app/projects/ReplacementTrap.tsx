import { motion as Motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudySectionCard } from "@/app/projects/components/CaseStudySectionCard";

const ctas = [
  {
    label: "Read the Essay",
    href: "https://substack.com/@grantgeist/p-179539887",
    icon: <ExternalLink className="h-4 w-4" />,
    variant: "primary" as const,
  },
  {
    label: "View on GitHub",
    href: "https://github.com/ghgeist/replacement_trap",
    icon: <Github className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

const headlineStats = [
  {
    label: "Systems modeled",
    value: "11",
    detail: "Appliances, HVAC, lighting, and insulation",
  },
  {
    label: "Simulation horizon",
    value: "30 years",
    detail: "Lifecycle cash flow with efficiency decline",
  },
  {
    label: "Below repayment threshold",
    value: "9 / 11",
    detail: "Lifespan falls short of payback in most scenarios",
  },
];

export function ReplacementTrap() {
  return (
    <main className="min-h-screen bg-[#070B12]">
      <CaseStudyHero
        title="The Replacement Trap"
        framing={
          <p>
            A lifecycle cash-flow model testing when home systems die before they
            repay their cost.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-4xl text-base leading-relaxed text-amber-50/80 md:text-lg"
        backLinkClassName="text-amber-100/60 hover:text-amber-100"
        ctasClassName="justify-start sm:justify-end"
        sectionClassName="border-b border-amber-200/10"
        mediaClassName="overflow-hidden rounded-sm border border-amber-100/20 bg-[#0B101A]"
        ctas={ctas.map((cta) => (
          <CaseStudyCtaButton
            key={cta.label}
            label={cta.label}
            href={cta.href}
            icon={cta.icon}
            variant={cta.variant}
            className={
              cta.variant === "primary"
                ? "border-amber-300/40 bg-amber-300/15 text-amber-50 hover:border-amber-200/60 hover:bg-amber-300/20"
                : "border-amber-100/20 bg-transparent text-amber-50/90 hover:border-amber-100/40"
            }
          />
        ))}
        background={
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #5b4722 1px, transparent 1px), linear-gradient(to bottom, #5b4722 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_45%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B12]/30 to-[#070B12]" />
          </>
        }
        media={
          <div className="relative h-56 w-full md:h-80">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1600"
              alt="Replacement cycle analysis"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-2 border-t border-amber-200/20 bg-[#070B12]/80 p-4 md:grid-cols-3">
              <div className="rounded-sm border border-amber-100/20 bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-amber-200/70">
                  Threshold Rule
                </p>
                <p className="mt-1 text-sm font-semibold text-amber-100">
                  R/P Ratio = lifespan / payback
                </p>
              </div>
              <div className="rounded-sm border border-amber-100/20 bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-amber-200/70">
                  Break-even condition
                </p>
                <p className="mt-1 text-sm font-semibold text-amber-100">R/P greater than 1</p>
              </div>
              <div className="rounded-sm border border-amber-100/20 bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-amber-200/70">
                  Structural loss condition
                </p>
                <p className="mt-1 text-sm font-semibold text-amber-100">R/P less than 1</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {headlineStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-sm border border-amber-100/15 bg-[#101522] p-4"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-amber-200/60">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-amber-100">{stat.value}</p>
                  <p className="mt-1 text-sm text-amber-50/70">{stat.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <CaseStudySectionCard
                  kicker="01"
                  title="Why This Matters"
                  className="h-full border-amber-100/15 bg-[#101522]"
                  kickerClassName="text-amber-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    Most major home systems are framed as "investments."
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    This project tests that claim structurally using a simple
                    decision rule: how long the system lasts relative to how long
                    it takes to pay for itself.
                  </p>
                  <div className="rounded-sm border border-amber-100/20 bg-[#0B111E] p-3 font-mono text-sm text-amber-100">
                    R/P Ratio (Replacement / Payback): lifespan / payback period
                  </div>
                  <div>
                    <p className="mb-2 leading-relaxed text-gray-300">In plain terms:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-amber-300">-</span>
                        <span>
                          If the ratio is <strong className="text-white">greater than 1</strong>,
                          the system survives long enough to earn back its
                          installed cost.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-amber-300">-</span>
                        <span>
                          If the ratio is <strong className="text-white">less than 1</strong>,
                          it reaches end-of-life before fully repaying its
                          capital.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="leading-relaxed text-gray-300">
                    When lifespan is less than payback, each replacement cycle
                    resets capital before recovery, creating structural loss
                    instead of compounding return. This was illustrated by
                    lifespan falling short of payback in 9 of 11 modeled
                    scenarios.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                <CaseStudySectionCard
                  kicker="02"
                  title="What I Built"
                  className="h-full border-amber-100/15 bg-[#101522]"
                  kickerClassName="text-amber-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    A lifecycle cash-flow model covering 11 common residential
                    systems (appliances, HVAC, lighting, insulation).
                  </p>
                  <div>
                    <p className="mb-3 leading-relaxed text-gray-300">
                      The model includes:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>An R/P threshold rule (lifespan / payback)</span></li>
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>A 30-year cash-flow simulation that accounts for efficiency decline over time</span></li>
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>HELOC financing scenarios to model replacements paid for with debt</span></li>
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>Monte Carlo stress tests under changing energy prices and interest rates</span></li>
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>A modular Python codebase with validation tests and reproducible outputs</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 leading-relaxed text-gray-300">Model boundaries:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>Direct, measurable cash costs and savings only</span></li>
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>Installation labor included in capital cost</span></li>
                      <li className="flex gap-3"><span className="text-amber-300">-</span><span>Explicit lifespan assumptions with bounded volatility</span></li>
                    </ul>
                  </div>
                  <p className="leading-relaxed text-gray-300">
                    Comfort, carbon, and resilience premiums are excluded to keep
                    the model focused on cash economics.
                  </p>
                  <div className="rounded-sm border border-amber-100/20 bg-[#0B111E] p-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-amber-200/70">
                      Example
                    </p>
                    <p className="mt-2 leading-relaxed text-gray-300">
                      A standard 3-ton AC costing about $9,500 and saving about
                      $200 per year reaches end-of-life around year 13, leaving
                      a multi-thousand-dollar shortfall before payback.
                    </p>
                  </div>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                <CaseStudySectionCard
                  kicker="03"
                  title="Explore the Work"
                  className="h-full border-amber-100/15 bg-[#101522]"
                  kickerClassName="text-amber-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    The essay explains the intuition behind the Replacement /
                    Payback threshold and the broader housing implications.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    The repository exposes the model itself:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex gap-3"><span className="text-amber-300">-</span><span>Full structure and assumptions</span></li>
                    <li className="flex gap-3"><span className="text-amber-300">-</span><span>Test coverage and validation logic</span></li>
                    <li className="flex gap-3"><span className="text-amber-300">-</span><span>HELOC financing scenarios</span></li>
                    <li className="flex gap-3"><span className="text-amber-300">-</span><span>Monte Carlo stress tests</span></li>
                  </ul>

                  <div className="flex flex-col gap-3 pt-1">
                    {ctas.map((cta) => (
                      <CaseStudyCtaButton
                        key={`bottom-${cta.label}`}
                        label={cta.label}
                        href={cta.href}
                        icon={cta.icon}
                        variant={cta.variant}
                        className={
                          cta.variant === "primary"
                            ? "border-amber-300/40 bg-amber-300/15 text-amber-50 hover:border-amber-200/60 hover:bg-amber-300/20"
                            : "border-amber-100/20 bg-transparent text-amber-50/90 hover:border-amber-100/40"
                        }
                      />
                    ))}
                  </div>

                  <p className="leading-relaxed text-gray-300">
                    If you read one section, start with the R/P classification
                    results and the cash-flow outputs.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    All assumptions, boundaries, and mechanics are inspectable.
                    This model is designed to withstand scrutiny, not just
                    summarize a thesis.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
