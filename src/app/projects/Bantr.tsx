import type { ReactNode } from "react";
import { motion as Motion } from "motion/react";
import {
  ExternalLink,
  Globe,
  Layers,
  Sparkles,
  CreditCard,
  Shield,
  Rocket,
  MessageCircle,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  Gauge,
  Database,
  Brain,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import {
  CaseStudyFlowDiagram,
  type CaseStudyFlowLane,
} from "@/app/projects/components/CaseStudyFlowDiagram";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import { CaseStudySectionCard } from "@/app/projects/components/CaseStudySectionCard";
import { CaseStudySectionHeading } from "@/app/projects/components/CaseStudySectionHeading";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";

const ctas = [
  {
    label: "Live Demo",
    href: "https://bantr.us/",
    icon: <ExternalLink className="h-4 w-4" />,
    iconPosition: "right" as const,
    variant: "primary" as const,
    showArrow: false,
  },
];

type SnapshotItem = {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
};

const snapshotItems: SnapshotItem[] = [
  {
    label: "Platform",
    value: "Mobile-first SPA",
    detail: "React + Vite production deployment",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: "Stack",
    value: "React + Express + Postgres",
    detail: "TypeScript frontend with session-aware API/backend",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    label: "AI Integration",
    value: "Prompt generation",
    detail: "OpenAI-generated rounds constrained by format rules",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    label: "Payments",
    value: "Stripe subscriptions",
    detail: "Real payment path integrated into app flow",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    label: "Auth Model",
    value: "Guest-first identity",
    detail: "Optional accounts layered on top of instant play",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    label: "Deployment",
    value: "Live environment",
    detail: "Shipped loop with tracked completion metrics",
    icon: <Rocket className="h-4 w-4" />,
  },
];

const problemMoments = [
  {
    title: "Third date",
    detail: "People want depth but default to safe small talk.",
  },
  {
    title: "Hostel bar",
    detail: "Strangers need a fast path to meaningful interaction.",
  },
  {
    title: "First dinner with new friends",
    detail: "Conversation stalls without a shared creative prompt.",
  },
];

const productConstraints = [
  "Latency breaks rhythm",
  "Unstructured AI output creates awkwardness",
  "Over-structuring removes spontaneity",
  "Payment gating must stay invisible",
  "State bugs immediately reduce trust",
];

const systemConstraints = [
  {
    spec: "3-second response target",
    detail: "Question fetch with cached fallback",
  },
  {
    spec: "Moderation gate",
    detail: "OpenAI moderation before prompt display",
  },
  {
    spec: "Cookie session tracking",
    detail: "Progress and completion stability across refresh",
  },
];

const engineLanes: CaseStudyFlowLane[] = [
  {
    title: "Interaction Trigger",
    icon: <MessageCircle className="h-4 w-4" />,
    iconColorClassName: "text-rose-300",
    nodes: ["Low-friction social moment", "No onboarding barrier"],
  },
  {
    title: "Prompt Pipeline",
    icon: <Brain className="h-4 w-4" />,
    iconColorClassName: "text-pink-300",
    nodes: ["OpenAI prompt generation", "Format cleanup + fallback cache"],
    tightSpacing: true,
  },
  {
    title: "Safety Layer",
    icon: <Shield className="h-4 w-4" />,
    iconColorClassName: "text-amber-300",
    nodes: ["Moderation pass", "Prompt validation before render"],
  },
  {
    title: "Round Engine",
    icon: <Database className="h-4 w-4" />,
    iconColorClassName: "text-red-300",
    nodes: ["Fixed 10-question flow", "Turn-by-turn state continuity"],
  },
  {
    title: "Outcome Surface",
    icon: <Gauge className="h-4 w-4" />,
    iconColorClassName: "text-emerald-300",
    nodes: ["Personalized summary", "Completion tracking"],
  },
];

const engineTransitions = [
  "Prompt request",
  "Validated prompt",
  "Session state",
  "Summary + tracking",
];

const shippedOutcomes = [
  "Users complete full 10-question rounds in production",
  "Personalized summaries generated at session completion",
  "Session and completion metrics logged for product learning",
];

const futureDirections = [
  {
    title: "Multimodal rounds",
    detail:
      "Expand from text-only prompts into image-building and travel-planning conversational formats.",
  },
  {
    title: "Stronger AI pipeline",
    detail:
      "Improve generation and scoring so prompts feel less generic and more context-aware.",
  },
  {
    title: "Creator infrastructure",
    detail:
      "Open the round engine so others can launch new conversational games on top of the same system.",
  },
];

export function Bantr() {
  return (
    <ProjectPageShell theme="bantr">
      <CaseStudyHero
        title="Bantr"
        framing={
          <p>
            A mobile-first conversational game engine designed to help people skip small talk
            and reach better conversations in minutes.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-3xl"
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
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(251,113,133,0.24) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--project-accent-soft),_transparent_45%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--project-page-bg)]/25 to-[var(--project-page-bg)]" />
          </>
        }
        media={
          <div className="relative aspect-video w-full overflow-hidden">
            <ImageWithFallback
              src="/assets/bantr-landing-page.png"
              alt="Bantr mobile gameplay"
              className="h-full w-full object-cover"
              lazy={false}
            />
          </div>
        }
      />

      <section className="border-b border-white/5 bg-[var(--project-page-bg)] py-8 md:py-10">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Snapshot"
            subtitle="A live production build tested under conversational conditions where rhythm and coherence matter."
            className="mb-5 md:mb-6"
            subtitleClassName="max-w-4xl"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {snapshotItems.map((item, idx) => (
              <Motion.div
                key={item.label}
                initial={{ opacity: 0.95, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="rounded-sm border border-white/10 bg-white/[0.03] p-4 md:p-5"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                    {item.label}
                  </span>
                  <span className="text-[var(--project-accent-text)]">{item.icon}</span>
                </div>
                <p className="text-lg font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[var(--project-muted-text)]">{item.detail}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="The Problem"
            subtitle="Most conversations default to work, weather, politics, or logistics. Bantr was designed for moments where people want depth but do not know how to initiate it."
            subtitleClassName="max-w-4xl"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {problemMoments.map((moment, idx) => (
              <Motion.div
                key={moment.title}
                initial={{ opacity: 0.95, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-sm border border-white/10 bg-[#151921] p-4 md:p-5"
              >
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                  Scenario
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{moment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--project-muted-text)]">
                  {moment.detail}
                </p>
              </Motion.div>
            ))}
          </div>

          <div className="mt-6">
            <div className="rounded-sm border border-white/10 bg-[#151921] p-5 md:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                Why This Matters
              </p>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
                <p className="text-lg leading-relaxed text-[var(--project-body-text)] md:text-xl">
                As A.I. makes cognition cheaper, creativity becomes more valuable.
                Bantr was an experiment in building a product to help people practice creativity.
                </p>
                <div className="rounded-sm border border-[color:var(--project-accent-border)] bg-[var(--project-accent-soft)]/25 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                    Goal
                  </p>
                  <p className="mt-2 text-base font-medium leading-relaxed text-white">
                  Better conversations through structured creativity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Design Constraints"
            subtitle="Human interaction has low tolerance for friction. Bantr trades open-ended generation for a fixed 10-question structure so pacing and coherence stay stable."
            subtitleClassName="max-w-4xl"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <CaseStudySectionCard kicker="Product Level" title="Interaction Risks" className="h-full">
              <ul className="space-y-2">
                {productConstraints.map((constraint) => (
                  <li key={constraint} className="flex items-start gap-2.5">
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-[var(--project-body-text)]">
                      {constraint}
                    </span>
                  </li>
                ))}
              </ul>
            </CaseStudySectionCard>

            <CaseStudySectionCard
              kicker="System Level"
              title="Production Guardrails"
              className="h-full"
              tone="meta"
            >
              <ul className="space-y-3">
                {systemConstraints.map((constraint) => (
                  <li
                    key={constraint.spec}
                    className="rounded-sm border border-white/10 bg-white/[0.03] p-3"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                      {constraint.spec}
                    </p>
                    <p className="mt-1 text-sm text-[var(--project-muted-text)]">{constraint.detail}</p>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 rounded-sm border border-white/10 bg-white/[0.02] p-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]" />
                <p className="text-sm leading-relaxed text-[var(--project-muted-text)]">
                  AI tools accelerated implementation, but reliability depended on disciplined
                  rule design and safeguards.
                </p>
              </div>
            </CaseStudySectionCard>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="The System"
            subtitle="Bantr runs on a round engine that remembers progress: fixed 10-question sessions, turn-by-turn continuity, and prompt formatting + validation"
            subtitleClassName="max-w-4xl"
          />
          <div className="rounded-lg border border-white/10 bg-[#151921] p-3 md:p-4 lg:p-6">
            <div
              className="rounded-md p-2 md:p-3"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(253,164,175,0.14) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              <CaseStudyFlowDiagram
                lanes={engineLanes}
                transitions={engineTransitions}
                accentTextClassName="text-[var(--project-accent-text)]"
                accentBorderClassName="border-[color:var(--project-accent-border)]"
                fallbackFinalOutputLabel="Completed round + summary"
                gridClassName="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="Outcome and Future Direction"
            subtitle="The core loop ships in production with completion tracking, but adoption remains limited without a defined distribution channel."
            subtitleClassName="max-w-4xl"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CaseStudySectionCard kicker="What Shipped" title="Core loop in production" className="h-full">
              <ul className="space-y-2">
                {shippedOutcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-[var(--project-body-text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </CaseStudySectionCard>

            <CaseStudySectionCard
              kicker="Primary Lesson"
              title="Distribution is separate work"
              tone="highlight"
              className="h-full"
            >
              <p className="text-sm leading-relaxed text-[var(--project-body-text)]">
                The core loop shipped and worked, but adoption stayed limited without a defined
                distribution channel.
              </p>
              <p className="text-sm leading-relaxed text-[var(--project-muted-text)]">
                Distribution is a separate system with its own constraints. After product
                reliability, the next milestone is repeatable channel testing.
              </p>
            </CaseStudySectionCard>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {futureDirections.map((direction, idx) => (
              <Motion.article
                key={direction.title}
                initial={{ opacity: 0.95, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="rounded-sm border border-white/10 bg-[#151921] p-4"
              >
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                  Future
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">{direction.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--project-muted-text)]">
                  {direction.detail}
                </p>
              </Motion.article>
            ))}
          </div>

        </div>
      </section>
    </ProjectPageShell>
  );
}
