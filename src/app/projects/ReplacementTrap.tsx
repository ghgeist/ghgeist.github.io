import React from "react";
import {
  ExternalLink,
  Github,
  ArrowLeft,
} from "lucide-react";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudySectionHeading } from "@/app/projects/components/CaseStudySectionHeading";
import { useBackToCaseStudies } from "@/app/projects/hooks/useBackToCaseStudies";

const ctas = [
  {
    label: "Read the essay on Substack",
    href: "https://substack.com/@grantgeist/p-179539887",
    icon: <ExternalLink className="h-4 w-4" />,
    iconPosition: "right" as const,
    variant: "primary" as const,
    showArrow: false,
  },
  {
    label: "View on Github",
    href: "https://github.com/ghgeist/replacement_trap",
    icon: <Github className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

type RatioBenchmark = {
  label: string;
  ratio: number;
  note: string;
};

const dishwashersBenchmarks: RatioBenchmark[] = [
  { label: "Standard", ratio: 0.191, note: "Baseline replacement option." },
  { label: "Premium", ratio: 0.2, note: "Mid-tier efficiency." },
  { label: "Energy Star", ratio: 0.275, note: "Highest efficiency tier." },
];

const waterHeatersBenchmarks: RatioBenchmark[] = [
  { label: "Standard", ratio: 0.206, note: "Structural loss under base case." },
  { label: "Premium", ratio: 0.529, note: "Mid-tier efficiency upgrade." },
  { label: "Energy Star (heatpump)", ratio: 2.51, note: "Exceeds repayment threshold." },
];

const airConditionersBenchmarks: RatioBenchmark[] = [
  { label: "Standard", ratio: 0.06, note: "Replacement far shorter than payback." },
  { label: "Premium", ratio: 0.217, note: "Mid-tier efficiency upgrade." },
  { label: "Energy Star", ratio: 0.51, note: "Higher efficiency, still below threshold." },
];

/** Chart colors: match StormSignal MODEL_COLOR_CONFIG for red/green so bar and label align across project pages. */
const CHART_LOSS = {
  bar: "bg-rose-400/70",
  label: "text-rose-300/95",
} as const;
const CHART_SURVIVAL = {
  bar: "bg-emerald-400/70",
  label: "text-emerald-300/90",
} as const;

function RatioBenchmarkChart({
  benchmarks,
  compact = false,
}: {
  benchmarks: RatioBenchmark[];
  compact?: boolean;
}) {
  const dataMax = React.useMemo(
    () => Math.max(...benchmarks.map((b) => b.ratio)),
    [benchmarks],
  );

  /** 0-based scale: bar length = ratio. Track from 0 to max(data max, 1.0) so 1.0 threshold is visible. */
  const xMax = React.useMemo(() => {
    const scaleBaseMax = Math.max(dataMax, 1.0);
    const padding = scaleBaseMax <= 1 ? 0.1 : scaleBaseMax * 0.05;
    return scaleBaseMax + padding;
  }, [dataMax]);

  const xToPercent = (x: number) => (x / xMax) * 100;

  const thresholdPercent = xMax >= 1 ? xToPercent(1) : null;

  /** Axis ticks: 0, 1.0 (if in range), and true data max. */
  const axisTicks = React.useMemo(() => {
    const ticks: { value: number; position: number }[] = [
      { value: 0, position: 0 },
    ];
    if (xMax >= 1) {
      ticks.push({ value: 1, position: (1 / xMax) * 100 });
    }
    if (dataMax > 0 && Math.abs(dataMax - 1) > 1e-6) {
      ticks.push({ value: dataMax, position: (dataMax / xMax) * 100 });
    }
    return ticks;
  }, [dataMax, xMax]);

  const content = (
    <>
      <div className={compact ? "space-y-3" : "space-y-5"}>
        {benchmarks.map((benchmark) => {
          const isBelowThreshold = benchmark.ratio < 1;
          const widthPercent = Math.max(
            (benchmark.ratio / xMax) * 100,
            benchmark.ratio > 0 ? 2 : 0,
          );

          return (
            <div key={benchmark.label}>
              <div className={`${compact ? "mb-1" : "mb-2"} flex items-start justify-between gap-2`}>
                <div>
                  <p className={compact ? "text-xs text-gray-300" : "text-sm text-gray-300"}>{benchmark.label}</p>
                  {!compact && <p className="text-xs text-gray-500">{benchmark.note}</p>}
                </div>
              </div>
              <div
                className="relative flex h-6 items-center"
                role="img"
                aria-label={`${benchmark.label}: R/P ${benchmark.ratio.toFixed(2)}, ${isBelowThreshold ? "below" : "at or above"} break-even`}
              >
                <div className="relative h-2 flex-1 overflow-visible rounded-sm bg-white/5">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-sm ${isBelowThreshold ? CHART_LOSS.bar : CHART_SURVIVAL.bar}`}
                    style={{
                      width: `${widthPercent}%`,
                    }}
                  />
                  {thresholdPercent != null && (
                    <div
                      className="absolute top-0 h-full w-0.5 -translate-x-1/2 bg-gray-400/80"
                      style={{ left: `${thresholdPercent}%` }}
                      aria-hidden
                    />
                  )}
                </div>
                <span
                  className={`ml-2 shrink-0 font-mono tabular-nums ${compact ? "text-xs" : "text-sm"} ${isBelowThreshold ? CHART_LOSS.label : CHART_SURVIVAL.label}`}
                  style={{ minWidth: compact ? "2rem" : "2.5rem", textAlign: "end" }}
                >
                  {benchmark.ratio.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {!compact && (
        <>
          <div className="mt-4 flex items-center">
            <div className="relative flex-1 h-4">
              {axisTicks.map((tick) => (
                <span
                  key={tick.value}
                  className="absolute -translate-x-1/2 font-mono text-[10px] text-gray-500 tabular-nums"
                  style={{ left: `${tick.position}%` }}
                >
                  {tick.value === 1 ? "1.00" : tick.value === 0 ? "0" : tick.value.toFixed(1)}
                </span>
              ))}
            </div>
            <div className="ml-2 shrink-0" style={{ minWidth: "2.5rem" }} />
          </div>
          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="font-mono text-xs text-gray-500">
              R/P = 1.00 (Break-even Threshold)
            </p>
          </div>
        </>
      )}
    </>
  );

  if (compact) return content;
  return (
    <div className="rounded-lg border border-white/5 bg-[#0B0E14] p-6 md:p-8">
      {content}
    </div>
  );
}

export function ReplacementTrap() {
  const handleBackToCaseStudies = useBackToCaseStudies();
  const [heroImageError, setHeroImageError] = React.useState(false);

  const heroImageSrc = "/assets/the-replacement-trap.png";

  return (
    <main className="project-theme project-theme--replacement min-h-screen bg-[var(--project-page-bg)] font-sans text-[var(--project-body-text)] selection:bg-amber-400/20">
      <CaseStudyHero
        containerClassName="pb-6 md:pb-8"
        title="The Replacement Trap"
        framing={
          <p>
            I modeled replacement cycles for 11 common home systems.
            Most never repay their cost before they fail.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-3xl text-xl md:text-xl text-gray-400"
        ctas={ctas.map((cta) => (
          <CaseStudyCtaButton
            key={cta.label}
            label={cta.label}
            href={cta.href}
            icon={cta.icon}
            iconPosition={cta.iconPosition}
            variant={cta.variant}
            showArrow={cta.showArrow ?? true}
          />
        ))}
        background={
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-800/20 via-[#0B0E14] to-[#0B0E14]" />
        }
        media={
          <div className="relative aspect-video w-full overflow-hidden bg-[#121722]">
            {!heroImageError ? (
              <img
                src={heroImageSrc}
                alt="Suburban home with roof, windows, and lawn—typical context for replacement-cycle economics"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setHeroImageError(true)}
              />
            ) : null}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(245,158,11,0.08),_transparent_50%),radial-gradient(circle_at_80%_30%,_rgba(251,146,60,0.06),_transparent_45%)]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>
        }
      />

      <section className="border-b border-white/5 bg-[var(--project-page-bg)] pt-6 pb-10 md:pt-8 md:pb-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
            <div>
              <CaseStudySectionHeading
                title="The Context"
                subtitle="Residential upgrades are often sold as energy efficiency investments, but appliance replacement decisions are more often made under uncertainty and financial pressure."
                subtitleClassName="max-w-3xl"
                className="mb-4 md:mb-5"
              />
              <div className="prose prose-invert mt-4 max-w-none text-gray-400">
                <ul className="mt-4 list-inside list-disc space-y-2 text-base md:text-lg">
                  <li>
                    Simple payback often assumes stable savings and ignores
                    replacement timing.
                  </li>
                  <li>
                    This model asks a survival question: does lifespan exceed
                    payback (R/P &gt; 1)?
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:mt-12 lg:w-72">
              <div className="rounded-[2px] border border-white/5 bg-[#1a1f28] p-4 md:p-5">
                <h3 className="mb-3 text-sm font-medium text-gray-500">
                  Model Summary
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                  <li>11 common systems</li>
                  <li>30-year lifecycle simulation</li>
                  <li>9 fall below the payback threshold</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#11141a] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Modeling Approach"
            subtitle="Each system is evaluated by one question: does it repay its cost before end-of-life?"
            subtitleClassName="max-w-3xl"
          />
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-sm border border-white/5 bg-[#151921] p-4 md:p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                Replacement / Payback (R/P) Ratio
              </h3>
              <p className="mb-4 font-mono text-sm text-gray-300">
                Lifespan ÷ Payback Period
              </p>
              <p className="mb-3 text-sm text-gray-400">
                This ratio creates a structural classification:
              </p>
              <ul className="mb-4 list-inside list-disc space-y-1.5 text-sm text-gray-300">
                <li>
                  <strong>R/P &gt; 1</strong>: The system survives long enough
                  to recover its installed cost.
                </li>
                <li>
                  <strong>R/P &lt; 1</strong>: The system reaches end-of-life
                  before full capital recovery.
                </li>
              </ul>
              <p className="text-sm leading-relaxed text-gray-400">
                When lifespan is shorter than payback, each replacement cycle
                resets invested capital before recovery. The result is not
                delayed return, but recurring structural loss.
              </p>
            </div>
            <div className="rounded-sm border border-white/5 bg-[#151921] p-4 md:p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                Real-World Constraints
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                The model reflects conditions households actually face:
              </p>
              <ul className="mb-4 list-inside list-disc space-y-1.5 text-sm text-gray-300">
                <li>Aging equipment and performance decline over time</li>
                <li>Uneven annual savings influenced by weather and usage</li>
                <li>Replacement timing shocks</li>
                <li>Debt-funded replacement scenarios (HELOC modeling)</li>
              </ul>
              <p className="text-sm leading-relaxed text-gray-400">
                All outcomes are tied to explicit assumptions, bounded lifespan ranges, and stress-tested scenarios. The model is designed for auditable household economics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#151921] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h3 className="mb-2 font-mono text-sm uppercase tracking-widest text-amber-300">
            Key Findings
          </h3>
          <h2 className="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl">
            Most Appliance Upgrades Don't Break Even
          </h2>
          <div className="space-y-4 leading-relaxed text-gray-400 md:space-y-6">
            <ul className="list-inside list-disc space-y-1.5">
              <li>
                Dishwashers, air conditioners, and most water heaters stay below break-even (R/P &lt; 1) across
                standard, premium, and Energy Star tiers.
              </li>
              <li>The hybrid heat pump water heater is the exception (R/P = 2.51).</li>
              <li>LED retrofit (R/P = 8.93) and attic insulation (R/P = 0.62) were modeled for comparison, but not charted.</li>
            </ul>
            <p>
              For financed replacements, R/P &lt; 1 can force repeated spending before earlier costs are recovered.
            </p>
            <div className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-sm leading-relaxed text-gray-300">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-amber-300">
                  Decision use
                </span>
                {" "}
                Buy the most durable system with the longest warranty you can afford. Fewer replacements beat higher efficiency. 
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-white/5 bg-[#0B0E14] p-4 md:p-5">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
                Dishwashers
              </h3>
              <RatioBenchmarkChart benchmarks={dishwashersBenchmarks} compact />
            </div>
            <div className="rounded-lg border border-white/5 bg-[#0B0E14] p-4 md:p-5">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
                Water Heaters
              </h3>
              <RatioBenchmarkChart benchmarks={waterHeatersBenchmarks} compact />
            </div>
            <div className="rounded-lg border border-white/5 bg-[#0B0E14] p-4 md:p-5">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
                Air Conditioners
              </h3>
              <RatioBenchmarkChart benchmarks={airConditionersBenchmarks} compact />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[var(--project-page-bg)] py-10">
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
