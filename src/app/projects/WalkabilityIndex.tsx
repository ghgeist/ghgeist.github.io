import { motion as Motion } from "motion/react";
import {
  ExternalLink,
  Github,
  MapPin,
  CircleDot,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudySectionHeading } from "@/app/projects/components/CaseStudySectionHeading";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";

const ctas = [
  {
    label: "Live Demo",
    href: "https://walkability-index.replit.app/",
    icon: <ExternalLink className="h-4 w-4" />,
    iconPosition: "right" as const,
    variant: "primary" as const,
    showArrow: false,
  },
  {
    label: "View on Github",
    href: "https://github.com/ghgeist/urbanism_project",
    icon: <Github className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

const howItWorksSteps = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Location",
    descriptor: "Enter an address.",
  },
  {
    icon: <CircleDot className="h-5 w-5" />,
    title: "Define the Boundary",
    descriptor: "Set your evaluation radius.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Results",
    descriptor: "See aggregated scores and variation.",
  },
];

const systemDesignImplementation = [
  { term: "PostGIS", desc: "Table: national_walkability_index" },
  { term: "ST_DWithin", desc: "Exact radius filtering" },
  { term: "Spatial Index", desc: "GIST index on geometry; bounding-box prefilter" },
  { term: "Preprocessing", desc: "Geometry simplification" },
];

const systemDesignOutcomes = [
  "Evaluate at neighborhood scale",
  "Fair comparisons",
  "Test radius sensitivity",
  "Apply logic across cities",
];

const currentLimitations = [
  {
    label: "Geocoder reliability depends on third-party services",
    detail:
      "Nominatim is primary with U.S. Census fallback, but reliability can still vary with service availability, query quality, and edge-case address formats.",
  },
  {
    label: "Radius edge cases still exist",
    detail:
      "Very small radii, sparse geographies, and coastal boundaries can return few or no block groups, which is correct behavior but can feel inconsistent to users.",
  },
  {
    label: "Coverage assumptions are block-group level",
    detail:
      "Scores represent census block-group aggregates, not parcel-level or street-segment truth, so local micro-conditions can be masked.",
  },
  {
    label: "Feature parity is incomplete across views",
    detail:
      "Explore has the richest map layer behavior (choropleth), while Compare still has UX gaps such as partial-result handling and batched backend flow.",
  },
];

const shippedRecently = [
  "Added a block-group choropleth map layer and legend so users can see NWI variation spatially, not just in summary cards.",
  "Improved geocoding robustness with U.S. Census fallback when Nominatim fails on full street addresses.",
  "Shipped a dashboard route with component-level analytics charts for D2A, D2B, D3B, and D4A.",
  "Expanded regression coverage across frontend and backend tests, and tightened API/frontend error-code sync.",
  "Upgraded docs and contributor workflow standards across testing docs, rules, and project guidance.",
];

const nextExperiments = [
  "Add a single compare batch endpoint so Compare can fetch A/B summaries in one request and reduce round-trips.",
  "Bring choropleth and map parity to Compare so both locations can be evaluated visually and numerically.",
  "Validate and harden geocoder edge cases (PO boxes, rural routes), and evaluate practical response caching.",
  "Explore integrating Walkable Accessibility Score (WAS) to complement NWI with destination density signals.",
  "Add contextual dashboard filtering by active location and radius for more decision-ready analytics.",
];

export function WalkabilityIndexDetail() {
  return (
    <ProjectPageShell theme="walkability">
      <CaseStudyHero
        title="Walkability Index"
        framing={
          <>
            <p className="leading-relaxed">
            Explore neighborhood walkability at a human scale. Built on the U.S. EPA’s National Walkability Index.
            </p>
          </>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-2xl space-y-0 leading-snug"
        containerClassName="!pb-8"
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
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(45,212,191,0.2) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--project-accent-soft),_transparent_40%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--project-page-bg)]/20 to-[var(--project-page-bg)]" />
          </>
        }
        media={
          <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-meta-bg)]">
            <ImageWithFallback
              src="/assets/walkability-index-map-shot.png"
              alt="Walkability map: block groups and radius overlay on lower Manhattan"
              className="h-full w-full object-cover object-center"
              lazy={false}
            />
          </div>
        }
      />

      {/* How It Works — header + 3 cards */}
      <section className="border-b border-white/5 bg-[var(--project-page-bg)] pt-4 pb-8 md:pt-5 md:pb-12">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="How It Works"
            className="mb-2 md:mb-3"
            titleClassName="text-xl font-semibold md:text-2xl"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step, idx) => (
              <Motion.div
                key={step.title}
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex flex-col rounded-lg border border-white/10 bg-white/[0.03] pt-4 px-6 pb-6"
              >
                <div className="mb-3 text-[var(--project-accent-text)]">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--project-body-text)]">
                  {step.descriptor}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Two Locations — narrative + comparison UI screenshot */}
      <section className="bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Compare Two Locations"
            subtitle="Evaluate two locations side by side using a shared radius. This keeps the search area consistent so differences reflect neighborhood conditions, not mismatched geography."
            subtitleClassName="max-w-3xl md:max-w-4xl"
          />
          <div className="mt-8 overflow-hidden rounded-md border border-white/5 bg-[var(--surface-meta-bg)]">
            <ImageWithFallback
              src="/assets/walkability-comparison-screenshot.png"
              alt="Walkability comparison view showing Location A, Location B, radius control, and metric table"
              className="w-full object-cover"
              lazy={false}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--project-muted-text)]">
            Outcome: decision-makers can compare candidate areas on the same 1-20 NWI basis
            before making site selection decisions.
          </p>
        </div>
      </section>

      {/* System Design — two columns: Architecture | What It Enables; mechanism → outcome */}
      <section className="border-t border-white/5 bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="System Design"
            subtitle="Radius-based averaging over census block groups. Tradeoff: larger radii improve stability, while smaller radii preserve neighborhood contrast."
          />
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--project-muted-text)]">
                Architecture
              </p>
              <ul className="space-y-3">
                {systemDesignImplementation.map((item, idx) => (
                  <Motion.li
                    key={item.term}
                    initial={{ opacity: 0.95, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--project-accent-text)]/70" aria-hidden />
                    <span className="text-sm leading-relaxed text-[var(--project-body-text)]">
                      <span className="font-mono text-[var(--project-accent-text)]/90">{item.term}</span>
                      {" — "}
                      <span className="text-[var(--project-muted-text)]">{item.desc}</span>
                    </span>
                  </Motion.li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--project-muted-text)]">
                What It Enables
              </p>
              <ul className="space-y-3">
                {systemDesignOutcomes.map((item, idx) => (
                  <Motion.li
                    key={item}
                    initial={{ opacity: 0.95, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]" aria-hidden />
                    <span className="text-sm leading-relaxed text-[var(--project-body-text)]">
                      {item}
                    </span>
                  </Motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Current Limitations"
            subtitle="Known constraints are tracked explicitly so iteration stays fast and assumptions stay visible."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentLimitations.map((item, idx) => (
              <Motion.article
                key={item.label}
                initial={{ opacity: 0.95, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="rounded-sm border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                  Constraint
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--project-muted-text)]">
                  {item.detail}
                </p>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="What Changed / What's Next"
            subtitle="The project is designed for iterative shipping: track what is live now and what gets tested next."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                Shipped recently
              </p>
              <ul className="mt-3 space-y-2.5">
                {shippedRecently.map((item, idx) => (
                  <Motion.li
                    key={item}
                    initial={{ opacity: 0.95, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]" aria-hidden />
                    <span className="text-sm leading-relaxed text-[var(--project-body-text)]">{item}</span>
                  </Motion.li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                Next experiments
              </p>
              <ul className="mt-3 space-y-2.5">
                {nextExperiments.map((item, idx) => (
                  <Motion.li
                    key={item}
                    initial={{ opacity: 0.95, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="flex items-start gap-2.5"
                  >
                    <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]" aria-hidden />
                    <span className="text-sm leading-relaxed text-[var(--project-body-text)]">{item}</span>
                  </Motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </ProjectPageShell>
  );
}
