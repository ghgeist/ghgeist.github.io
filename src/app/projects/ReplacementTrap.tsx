import React from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Calculator,
  Home,
  TrendingDown,
  LineChart,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import {
  CaseStudyFlowDiagram,
  type CaseStudyFlowLane,
} from "@/app/projects/components/CaseStudyFlowDiagram";
import { CaseStudySectionHeading } from "@/app/projects/components/CaseStudySectionHeading";
import { CaseStudyStatCard } from "@/app/projects/components/CaseStudyStatCard";

const ctas = [
  {
    label: "Read the Essay",
    href: "https://substack.com/@grantgeist/p-179539887",
    icon: <ExternalLink className="h-4 w-4" />,
    variant: "primary" as const,
  },
  {
    label: "View on Github",
    href: "https://github.com/ghgeist/replacement_trap",
    icon: <Github className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

const headlineStats = [
  {
    label: "Systems Modeled",
    value: "11",
    detail: "Appliances, HVAC, lighting, and insulation",
  },
  {
    label: "Simulation Horizon",
    value: "30 years",
    detail: "Lifecycle cash flow with efficiency decline",
  },
  {
    label: "Below Repayment Threshold",
    value: "9 / 11",
    detail: "Lifespan falls short of payback in most scenarios",
  },
];

type FrameworkCard = {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
};

const frameworkCards: FrameworkCard[] = [
  {
    title: "Threshold Discipline",
    description:
      "Every system is evaluated with a deterministic rule: Replacement/Payback (R/P) ratio = lifespan / payback period.",
    icon: <Calculator className="h-5 w-5" />,
    iconBgColor: "bg-amber-500/10",
    iconColor: "text-amber-300",
  },
  {
    title: "Household Reality",
    description:
      "Lifecycle economics are modeled under conditions people actually face: aging equipment, uneven savings, and replacement timing shocks.",
    icon: <Home className="h-5 w-5" />,
    iconBgColor: "bg-sky-500/10",
    iconColor: "text-sky-300",
  },
  {
    title: "Loss Detection",
    description:
      "The model surfaces structural shortfall risk when systems expire before recovering installed cost.",
    icon: <TrendingDown className="h-5 w-5" />,
    iconBgColor: "bg-rose-500/10",
    iconColor: "text-rose-300",
  },
];

const simulationLanes: CaseStudyFlowLane[] = [
  {
    title: "Inputs",
    icon: <Home className="h-4 w-4" />,
    iconColorClassName: "text-sky-300",
    nodes: [
      "Installed Cost + Labor",
      "Energy Savings Assumptions",
      "Expected Lifespan Bounds",
      "Debt / HELOC Terms",
    ],
    tightSpacing: true,
  },
  {
    title: "Core Engine",
    icon: <Calculator className="h-4 w-4" />,
    iconColorClassName: "text-amber-300",
    nodes: [
      "R/P Classification (lifespan / payback)",
      "30-Year Cash-Flow Simulation",
      "Efficiency Decline Over Time",
    ],
    tightSpacing: true,
  },
  {
    title: "Stress Testing",
    icon: <LineChart className="h-4 w-4" />,
    iconColorClassName: "text-orange-300",
    nodes: [
      "Monte Carlo Energy Price Paths",
      "Interest Rate Volatility",
      "Replacement Timing Shifts",
    ],
    tightSpacing: true,
  },
  {
    title: "Decision Outputs",
    icon: <CheckCircle2 className="h-4 w-4" />,
    iconColorClassName: "text-emerald-300",
    nodes: [
      "Break-even Classification",
      "Projected Cash Shortfall / Surplus",
      "Portfolio-Level Risk View",
    ],
    tightSpacing: true,
  },
];

const simulationTransitions = [
  "Parameterized System Profile",
  "Scenario Cash Flows",
  "Risk-Sorted Outcomes",
];

type RatioBenchmark = {
  label: string;
  ratio: number;
  note: string;
};

const ratioBenchmarks: RatioBenchmark[] = [
  {
    label: "Central AC (3-ton)",
    ratio: 0.68,
    note: "Replacement before payoff in base case.",
  },
  {
    label: "Electric Water Heater",
    ratio: 0.82,
    note: "Narrow economics under typical savings.",
  },
  {
    label: "Window Upgrade",
    ratio: 0.74,
    note: "Slow recovery relative to upfront cost.",
  },
  {
    label: "Roof Replacement",
    ratio: 0.91,
    note: "Near threshold but often below break-even.",
  },
  {
    label: "Attic Insulation",
    ratio: 1.09,
    note: "One of the few cases above repayment threshold.",
  },
];

function RatioBenchmarkChart({ benchmarks }: { benchmarks: RatioBenchmark[] }) {
  const maxRatio = React.useMemo(
    () => Math.max(1.25, ...benchmarks.map((benchmark) => benchmark.ratio)),
    [benchmarks],
  );

  return (
    <div className="rounded-lg border border-white/5 bg-[#0B0E14] p-6 md:p-8">
      <div className="space-y-5">
        {benchmarks.map((benchmark) => {
          const widthPercent = (benchmark.ratio / maxRatio) * 100;
          const isPassing = benchmark.ratio >= 1;
          return (
            <div key={benchmark.label}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-300">{benchmark.label}</p>
                  <p className="text-xs text-gray-500">{benchmark.note}</p>
                </div>
                <span
                  className={`font-mono text-sm ${isPassing ? "text-emerald-300" : "text-rose-300"}`}
                >
                  {benchmark.ratio.toFixed(2)}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full transition-all ${isPassing ? "bg-emerald-400/70" : "bg-rose-400/70"}`}
                  style={{ width: `${widthPercent}%`, minWidth: "2px" }}
                />
                <div
                  className="absolute top-0 h-full w-px bg-white/60"
                  style={{ left: `${(1 / maxRatio) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="flex items-center gap-2 text-sm text-amber-300">
          <LineChart className="h-4 w-4" />
          <span>Threshold marker at R/P = 1.00 (break-even boundary)</span>
        </div>
      </div>
    </div>
  );
}

export function ReplacementTrap() {
  const navigate = useNavigate();
  const shouldReduceMotion = Boolean(useReducedMotion());

  const handleBackToCaseStudies = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const element = document.querySelector("#page-top");
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <main className="project-theme project-theme--replacement min-h-screen bg-[var(--project-page-bg)] font-sans text-[var(--project-body-text)] selection:bg-amber-400/20">
      <CaseStudyHero
        title="The Replacement Trap"
        framing={
          <p>
            A lifecycle cash-flow model testing when residential systems fail
            before they repay installed cost.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-3xl text-xl text-gray-400"
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-800/20 via-[#0B0E14] to-[#0B0E14]" />
        }
        media={
          <div className="relative aspect-video w-full bg-[#151921]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1600"
              alt="Replacement cycle analysis"
              className="h-full w-full object-cover opacity-85"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/30 to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-2 border-t border-white/10 bg-[#0B0E14]/85 p-4 md:grid-cols-3">
              <div className="rounded-md border border-white/10 bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-300/95">
                  Threshold Rule
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  R/P Ratio = lifespan / payback
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-300/95">
                  Break-even condition
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  R/P greater than 1
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-300/95">
                  Structural loss condition
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  R/P less than 1
                </p>
              </div>
            </div>
          </div>
        }
      />

      <section className="border-b border-white/5 bg-[#0B0E14]">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {headlineStats.map((stat) => (
              <CaseStudyStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                subtext={stat.detail}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B0E14] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="The Context"
            subtitle="Residential upgrades are often sold as investments, but replacement cycles and financing frictions can prevent cost recovery."
            subtitleClassName="max-w-3xl"
          />
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="text-base md:text-lg">
              Most homeowner decisions are made under uncertainty: variable
              utility prices, uneven equipment performance, and debt-funded
              replacement decisions. Simple payback estimates ignore this
              lifecycle pressure.
            </p>
            <p className="mt-6 text-base md:text-lg">
              The Replacement Trap reframes the question with a structural
              threshold: does a system survive long enough to repay itself
              before it has to be replaced?
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#11141a] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading title="Analytical Doctrine" />
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-400 md:mb-12">
            The model favors inspectable economics over abstract optimism. Each
            outcome is tied to explicit assumptions, deterministic threshold
            logic, and stress-tested scenarios.
          </p>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {frameworkCards.map((card, idx) => {
              const cardClasses =
                "rounded-sm border border-white/5 bg-[#151921] p-4 md:p-6";

              const cardContent = (
                <>
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-sm ${card.iconBgColor} ${card.iconColor}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="mb-2 font-bold text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {card.description}
                  </p>
                </>
              );

              if (shouldReduceMotion) {
                return (
                  <div key={card.title} className={cardClasses}>
                    {cardContent}
                  </div>
                );
              }

              return (
                <Motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className={cardClasses}
                >
                  {cardContent}
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0B0E14] py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Model Architecture"
            subtitle="A constrained simulation pipeline: standardized inputs, deterministic thresholds, scenario stress testing, and risk-ranked outputs."
            subtitleClassName="max-w-3xl"
          />
          <div className="mt-8 md:mt-6">
            <div className="relative rounded-lg border border-white/10 bg-[#151921] p-3 md:p-3 lg:p-6">
              <div
                className="absolute inset-0 rounded-lg opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, currentColor 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <CaseStudyFlowDiagram
                lanes={simulationLanes}
                transitions={simulationTransitions}
                accentTextClassName="text-amber-300"
                accentBorderClassName="border-amber-300/40"
                fallbackFinalOutputLabel="Actionable Scenario Review"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#151921] py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="mb-2 font-mono text-sm uppercase tracking-widest text-amber-300">
                Key Structural Finding
              </h3>
              <h2 className="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl">
                Replacement Cycles Can Outrun Payback
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-400 md:space-y-6">
                <p>
                  In 9 of 11 modeled systems, base-case lifespan is shorter than
                  payback. That means capital is redeployed before prior spending
                  is recovered.
                </p>
                <p>
                  Financing pressure amplifies the effect. HELOC-funded
                  replacements can increase total shortfall even when annual
                  utility savings look attractive.
                </p>
                <p>
                  The implication is not that upgrades never make sense. It is
                  that break-even should be treated as a lifecycle probability
                  problem, not a headline-savings claim.
                </p>
              </div>
            </div>

            <RatioBenchmarkChart benchmarks={ratioBenchmarks} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0B0E14] py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <a
            href="/#page-top"
            onClick={handleBackToCaseStudies}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </a>
        </div>
      </section>
    </main>
  );
}
