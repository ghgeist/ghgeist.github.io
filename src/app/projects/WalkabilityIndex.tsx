import { motion as Motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudySectionCard } from "@/app/projects/components/CaseStudySectionCard";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";

const ctas = [
  {
    label: "Live Demo",
    href: "https://walkability-index.replit.app/",
    icon: <ExternalLink className="h-4 w-4" />,
    variant: "primary" as const,
  },
  {
    label: "View on Github",
    href: "https://github.com/ghgeist/urbanism_project",
    icon: <Github className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

const neighborhoodQuestions = [
  "What is the average walkability within a half-mile of this address?",
  "How does walkability around one address compare to another at the same distance?",
  "Are there other areas in the city that offer better walkability?",
];

export function WalkabilityIndexDetail() {
  return (
    <ProjectPageShell theme="walkability">
      <CaseStudyHero
        title="Walkability Index"
        framing={
          <p>
            This project makes the EPA's National Walkability Index accessible
            and usable at the neighborhood level.
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
          <div className="relative aspect-video w-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1600"
              alt="Walkability map view"
              className="h-full w-full object-cover opacity-70"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--project-page-bg)] via-[var(--project-page-bg)]/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-2 border-t border-[color:var(--surface-border-default)] bg-[var(--project-page-bg)]/80 p-4 md:grid-cols-3">
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]/95">
                  Query input
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Address + distance</p>
              </div>
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]/95">
                  Core output
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Average walkability</p>
              </div>
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]/95">
                  Supporting output
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Components + distribution</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl">
            <CaseStudySectionCard kicker="Context" title="Decision Context" tone="meta">
              <p className="max-w-3xl leading-relaxed">
                The EPA National Walkability Index is widely cited in research and
                policy, but a single block-group score is hard to use for actual
                neighborhood decisions.
              </p>
              <ul className="space-y-2">
                {neighborhoodQuestions.map((question) => (
                  <li key={question} className="flex gap-3">
                    <span className="text-[var(--project-accent-text)]">-</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </CaseStudySectionCard>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <CaseStudySectionCard kicker="01" title="Design Objective" className="h-full">
                  <p className="leading-relaxed">
                    I wanted a better way to use the National Walkability Index
                    when making neighborhood-level decisions.
                  </p>
                  <p className="leading-relaxed">The result is a queryable spatial service that supports:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Average walkability within a chosen distance of any address</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Side-by-side comparison at a consistent scale</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Clear breakdown of how walkability is composed</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Exploration of nearby areas with different walkability profiles</span></li>
                  </ul>
                  <p className="leading-relaxed">
                    This moves the NWI from a static lookup to a tool you can
                    actually reason with.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <CaseStudySectionCard kicker="02" title="Spatial Query Model" className="h-full">
                  <p className="leading-relaxed">
                    Instead of treating walkability as a fixed score tied to a
                    single block group, the system measures walkability around
                    any location.
                  </p>
                  <p className="leading-relaxed">
                    Given a user-defined distance (for example 0.5 miles), the
                    engine calculates the average walkability for all block
                    groups that fall within that area and computes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Average walkability (simple mean across block groups within the chosen distance)</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Supporting distribution and component information</span></li>
                  </ul>
                  <p className="leading-relaxed">
                    This shifts the focus from a single block group to the area
                    around a location, which better reflects how people
                    experience a neighborhood.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <CaseStudySectionCard kicker="03" title="System Architecture" className="h-full">
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span><strong className="text-white">FastAPI</strong> backend exposing spatial query endpoints</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span><strong className="text-white">PostGIS</strong> for spatial indexing and calculating walkability within a chosen distance</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span><strong className="text-white">React</strong> frontend for exploration and comparison</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Pre-indexed census block group geometries and attributes</span></li>
                  </ul>
                  <div className="rounded-md border border-[color:var(--surface-border-default)] bg-[var(--surface-meta-bg)] p-4 font-mono text-xs leading-relaxed text-[var(--project-accent-text)]/90">
                    API-first design: frontend is a thin layer over a spatial
                    query engine.
                  </div>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <CaseStudySectionCard kicker="04" title="Engineering Decisions" className="h-full">
                  <p className="leading-relaxed">
                    The project was refactored from a Streamlit prototype into a
                    service-oriented architecture.
                  </p>
                  <p className="leading-relaxed">Key decisions:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Replace notebook-style execution with API-backed spatial queries</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Use PostGIS for efficient spatial intersections and aggregation</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Separate exploration and comparison views</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Keep the metric layer modular so features can evolve</span></li>
                  </ul>
                  <p className="leading-relaxed">
                    The refactor separates data storage, query logic, and
                    interface concerns so each layer can evolve independently.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.16 }}
              >
                <CaseStudySectionCard kicker="05" title="Tradeoffs" className="h-full">
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Calculating walkability within a chosen distance introduces edge effects at block group boundaries</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Results depend on chosen distance; scale materially changes interpretation</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>The current system relies solely on the EPA NWI and does not yet integrate zoning, transit, or cost overlays</span></li>
                  </ul>
                  <p className="leading-relaxed">These constraints are explicit rather than hidden.</p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                <CaseStudySectionCard kicker="06" title="Why Not Walk Score?" className="h-full">
                  <p className="leading-relaxed">Walk Score is a common alternative, but:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Its data is proprietary and requires paid API access</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Methodological transparency is limited</span></li>
                    <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Reproducibility and extensibility are constrained by licensing</span></li>
                  </ul>
                  <p className="leading-relaxed">
                    Building on the EPA's public dataset ensures transparency,
                    reproducibility, and full control over spatial aggregation
                    logic. The objective is not to replicate a consumer score,
                    but to build an open, inspectable spatial engine.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>
            </div>

            <Motion.div
              initial={{ opacity: 0.95, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.24 }}
              className="mt-6"
            >
              <CaseStudySectionCard kicker="07" title="What This Enables" tone="highlight">
                <ul className="space-y-2">
                  <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Neighborhood-scale comparison during housing search</span></li>
                  <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Sensitivity analysis at different distances</span></li>
                  <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Identification of spatial gradients rather than single-point scores</span></li>
                  <li className="flex gap-3"><span className="text-[var(--project-accent-text)]">-</span><span>Rapid comparison across cities</span></li>
                </ul>
                <p className="leading-relaxed">
                  The tool makes the NWI usable for real neighborhood decisions
                  instead of leaving it as a static reference value.
                </p>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
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
              </CaseStudySectionCard>
            </Motion.div>
          </div>
        </div>
      </section>
    </ProjectPageShell>
  );
}
