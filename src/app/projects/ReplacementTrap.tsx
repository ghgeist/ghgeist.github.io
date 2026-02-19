import { motion as Motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudySectionCard } from "@/app/projects/components/CaseStudySectionCard";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";

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
    <ProjectPageShell theme="replacement">
      <CaseStudyHero
        title="The Replacement Trap"
        framing={
          <p>
            A lifecycle cash-flow model testing when home systems die before they
            repay their cost.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-4xl"
        ctas={ctas.map((cta) => (
          <CaseStudyCtaButton
            key={cta.label}
            label={cta.label}
            href={cta.href}
            icon={cta.icon}
            variant={cta.variant}
          />
        ))}
        background={
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--project-accent-soft),_transparent_45%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--project-page-bg)]/30 to-[var(--project-page-bg)]" />
          </>
        }
        media={
          <div className="relative h-56 w-full md:h-80">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1600"
              alt="Replacement cycle analysis"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--project-page-bg)] via-[var(--project-page-bg)]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-2 border-t border-[color:var(--surface-border-default)] bg-[var(--project-page-bg)]/80 p-4 md:grid-cols-3">
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--project-accent-text)]/80">
                  Threshold Rule
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  R/P Ratio = lifespan / payback
                </p>
              </div>
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--project-accent-text)]/80">
                  Break-even condition
                </p>
                <p className="mt-1 text-sm font-semibold text-white">R/P greater than 1</p>
              </div>
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--project-accent-text)]/80">
                  Structural loss condition
                </p>
                <p className="mt-1 text-sm font-semibold text-white">R/P less than 1</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {headlineStats.map((stat) => (
                <CaseStudySectionCard
                  key={stat.label}
                  kicker={stat.label}
                  title={stat.value}
                  tone="meta"
                  titleClassName="text-2xl"
                  bodyClassName="space-y-0"
                >
                  <p className="text-sm text-[var(--project-muted-text)]">{stat.detail}</p>
                </CaseStudySectionCard>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <CaseStudySectionCard kicker="01" title="Why This Matters" className="h-full">
                  <p className="leading-relaxed">
                    Most major home systems are framed as "investments."
                  </p>
                  <p className="leading-relaxed">
                    This project tests that claim structurally using a simple
                    decision rule: how long the system lasts relative to how long
                    it takes to pay for itself.
                  </p>
                  <div className="rounded-md border border-[color:var(--surface-border-default)] bg-[var(--surface-meta-bg)] p-3 font-mono text-sm text-[var(--project-accent-text)]">
                    R/P Ratio (Replacement / Payback): lifespan / payback period
                  </div>
                  <div>
                    <p className="mb-2 leading-relaxed">In plain terms:</p>
                    <ul className="space-y-2">
                      <li className="flex gap-3">
                        <span className="text-[var(--project-accent-text)]">-</span>
                        <span>
                          If the ratio is <strong className="text-white">greater than 1</strong>,
                          the system survives long enough to earn back its
                          installed cost.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[var(--project-accent-text)]">-</span>
                        <span>
                          If the ratio is <strong className="text-white">less than 1</strong>,
                          it reaches end-of-life before fully repaying its
                          capital.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="leading-relaxed">
                    When lifespan is less than payback, each replacement cycle
                    resets capital before recovery, creating structural loss
                    instead of compounding return. This was illustrated by
                    lifespan falling short of payback in 9 of 11 modeled
                    scenarios.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <CaseStudySectionCard kicker="02" title="What I Built" className="h-full">
                  <p className="leading-relaxed">
                    A lifecycle cash-flow model covering 11 common residential
                    systems (appliances, HVAC, lighting, insulation).
                  </p>
                  <div>
                    <p className="mb-3 leading-relaxed">The model includes:</p>
                    <ul className="space-y-2">
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>An R/P threshold rule (lifespan / payback)</span></li>
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>A 30-year cash-flow simulation that accounts for efficiency decline over time</span></li>
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>HELOC financing scenarios to model replacements paid for with debt</span></li>
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Monte Carlo stress tests under changing energy prices and interest rates</span></li>
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>A modular Python codebase with validation tests and reproducible outputs</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 leading-relaxed">Model boundaries:</p>
                    <ul className="space-y-2">
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Direct, measurable cash costs and savings only</span></li>
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Installation labor included in capital cost</span></li>
                      <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Explicit lifespan assumptions with bounded volatility</span></li>
                    </ul>
                  </div>
                  <p className="leading-relaxed">
                    Comfort, carbon, and resilience premiums are excluded to keep
                    the model focused on cash economics.
                  </p>
                  <div className="rounded-md border border-[color:var(--surface-border-default)] bg-[var(--surface-meta-bg)] p-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--project-accent-text)]/80">
                      Example
                    </p>
                    <p className="mt-2 leading-relaxed">
                      A standard 3-ton AC costing about $9,500 and saving about
                      $200 per year reaches end-of-life around year 13, leaving
                      a multi-thousand-dollar shortfall before payback.
                    </p>
                  </div>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <CaseStudySectionCard kicker="03" title="Explore the Work" className="h-full" tone="highlight">
                  <p className="leading-relaxed">
                    The essay explains the intuition behind the Replacement /
                    Payback threshold and the broader housing implications.
                  </p>
                  <p className="leading-relaxed">The repository exposes the model itself:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Full structure and assumptions</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Test coverage and validation logic</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>HELOC financing scenarios</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Monte Carlo stress tests</span></li>
                  </ul>

                  <div className="flex flex-col gap-3 pt-1">
                    {ctas.map((cta) => (
                      <CaseStudyCtaButton
                        key={`bottom-${cta.label}`}
                        label={cta.label}
                        href={cta.href}
                        icon={cta.icon}
                        variant={cta.variant}
                      />
                    ))}
                  </div>

                  <p className="leading-relaxed">
                    If you read one section, start with the R/P classification
                    results and the cash-flow outputs.
                  </p>
                  <p className="leading-relaxed">
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
    </ProjectPageShell>
  );
}
