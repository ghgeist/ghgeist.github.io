import { motion as Motion } from "motion/react";
import {
  ExternalLink,
  Sparkles,
  Layers,
  CreditCard,
  Shield,
  Rocket,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudyPill } from "@/app/projects/components/CaseStudyPill";
import { CaseStudySectionCard } from "@/app/projects/components/CaseStudySectionCard";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";

const ctas = [
  {
    label: "Live Demo",
    href: "https://bantr.us/",
    icon: <ExternalLink className="h-4 w-4" />,
    variant: "primary" as const,
  },
];

const buildPills = [
  {
    icon: <Layers className="h-4 w-4" />,
    title: "Core Stack",
    description:
      "React + TypeScript frontend, Express API layer, and Postgres persistence.",
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "AI Gameplay",
    description:
      "OpenAI-powered prompt generation integrated into short conversational rounds.",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Guest-first Identity",
    description:
      "Instant play for guests, optional account creation for persistence and history.",
  },
  {
    icon: <CreditCard className="h-4 w-4" />,
    title: "Revenue Surface",
    description:
      "Stripe payments integrated as part of a real production flow.",
  },
];

const productSignals = [
  {
    label: "Platform",
    value: "Deployed PWA",
    detail: "Mobile-first web product running in production",
  },
  {
    label: "Gameplay model",
    value: "Short rounds",
    detail: "Conversation prompts designed for lightweight repeat play",
  },
  {
    label: "Product lesson",
    value: "Distribution > code",
    detail: "Acquisition constraints matter as much as implementation quality",
  },
];

export function Bantr() {
  return (
    <ProjectPageShell theme="bantr">
      <CaseStudyHero
        title="Bantr"
        framing={
          <p>
            A conversational game platform built with AI-augmented engineering.
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
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(251,113,133,0.3) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--project-accent-soft),_transparent_45%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--project-page-bg)]/20 to-[var(--project-page-bg)]" />
          </>
        }
        media={
          <div className="relative aspect-video w-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1600"
              alt="Bantr mobile gameplay"
              className="h-full w-full object-cover opacity-70"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--project-page-bg)] via-[var(--project-page-bg)]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-2 border-t border-[color:var(--surface-border-default)] bg-[var(--project-page-bg)]/80 p-4 md:grid-cols-3">
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]/95">
                  Product type
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Conversational game</p>
              </div>
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]/95">
                  Engineering mode
                </p>
                <p className="mt-1 text-sm font-semibold text-white">AI-augmented build loop</p>
              </div>
              <div className="rounded-md border border-[color:var(--surface-border-default)] bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]/95">
                  Hard lesson
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Distribution is separate work</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {productSignals.map((signal) => (
                <CaseStudySectionCard
                  key={signal.label}
                  kicker={signal.label}
                  title={signal.value}
                  tone="meta"
                  titleClassName="text-2xl"
                  bodyClassName="space-y-0"
                >
                  <p className="text-sm text-[var(--project-muted-text)]">{signal.detail}</p>
                </CaseStudySectionCard>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <CaseStudySectionCard kicker="01" title="The Origin" className="h-full">
                  <p className="leading-relaxed">
                    My wife and I were traveling frequently and wanted something
                    lightweight that made conversations more interesting and
                    encouraged creativity.
                  </p>
                  <p className="leading-relaxed">
                    That simple need evolved into a mobile-first game platform
                    built around short conversational rounds.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <CaseStudySectionCard kicker="02" title="The Ambition" className="h-full">
                  <p className="leading-relaxed">
                    The goal was to ship a real product: AI-generated gameplay,
                    persistent sessions, optional accounts, payments, and a live
                    deployment surface.
                  </p>
                  <p className="leading-relaxed">
                    If it worked, it would support real revenue.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="lg:col-span-2"
              >
                <CaseStudySectionCard kicker="03" title="The Build">
                  <p className="leading-relaxed">
                    Bantr is a deployed progressive web app built with React +
                    TypeScript, Express, and Postgres.
                  </p>
                  <p className="leading-relaxed">
                    It integrates OpenAI for prompt generation and Stripe for
                    payments, using a guest-first account model that enables
                    instant play while supporting persistence.
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
                    {buildPills.map((pill) => (
                      <CaseStudyPill
                        key={pill.title}
                        icon={pill.icon}
                        title={pill.title}
                        description={pill.description}
                      />
                    ))}
                  </div>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <CaseStudySectionCard
                  kicker="04"
                  title="AI-Augmented Engineering in Practice"
                  className="h-full"
                >
                  <p className="leading-relaxed">
                    AI coding agents can dramatically accelerate implementation,
                    but they require a well-designed system in which to operate
                    effectively.
                  </p>
                  <p className="leading-relaxed">
                    Once deployed, operational constraints surface quickly: API
                    latency, moderation edge cases, payment configuration, and
                    state management all demand careful design.
                  </p>
                  <p className="leading-relaxed">
                    Even in a small product, taste and system design still matter.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.16 }}
              >
                <CaseStudySectionCard
                  kicker="05"
                  title="Distribution Lesson"
                  className="h-full"
                  tone="highlight"
                >
                  <p className="leading-relaxed">
                    Technically, the product worked. The system held up, payments
                    processed, and gameplay functioned as intended.
                  </p>
                  <p className="leading-relaxed">
                    What I underestimated was the difficulty of distribution. A
                    working product does not automatically find users, and product
                    quality alone is not enough to generate adoption.
                  </p>
                  <p className="leading-relaxed">
                    Without a defined acquisition channel, even a well-built
                    system remains largely invisible. Distribution is a separate
                    discipline with its own constraints, incentives, and feedback
                    loops.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>
            </div>

            <CaseStudySectionCard
              kicker="Explore Product"
              title="Live Product Surface"
              tone="highlight"
              className="mt-6"
            >
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="max-w-2xl leading-relaxed">
                  Bantr was built as a real product surface, not just a demo. The
                  live deployment is where architecture and operational
                  assumptions get tested.
                </p>
                <CaseStudyCtaButton
                  label={ctas[0].label}
                  href={ctas[0].href}
                  icon={ctas[0].icon}
                  variant="primary"
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-[var(--project-muted-text)]">
                <Rocket className="h-4 w-4 text-[var(--project-accent-text)]" />
                <span>Shipping the product was step one; distribution strategy is step two.</span>
              </div>
            </CaseStudySectionCard>
          </div>
        </div>
      </section>
    </ProjectPageShell>
  );
}

