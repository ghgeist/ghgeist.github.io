import React from "react";
import {
  ExternalLink,
  CheckCircle2,
  Zap,
  Database,
  Shield,
  Globe,
  Brain,
  Users,
} from "lucide-react";
import { GithubIcon } from "@/app/components/icons/GithubIcon";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { CaseStudyCtaButton } from "@/app/projects/components/CaseStudyCtaButton";
import { CaseStudyHero } from "@/app/projects/components/CaseStudyHero";
import {
  CaseStudyFlowDiagram,
  type CaseStudyFlowLane,
} from "@/app/projects/components/CaseStudyFlowDiagram";
import { ProjectPageShell } from "@/app/projects/components/ProjectPageShell";
import { CaseStudySectionHeading } from "@/app/projects/components/CaseStudySectionHeading";
import { CaseStudyStatCard } from "@/app/projects/components/CaseStudyStatCard";
import {
  architectureTransitions,
  modelComparisons,
  type ModelComparison,
  stormStats,
} from "@/app/projects/content/stormSignalContent";

const ctas = [
  {
    label: "Live Demo",
    href: "https://storm-signal.replit.app/",
    icon: <ExternalLink className="h-4 w-4" />,
    iconPosition: "right" as const,
    variant: "primary" as const,
    showArrow: false,
  },
  {
    label: "View on Github",
    href: "https://github.com/ghgeist/disaster_response_project",
    icon: <GithubIcon className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

const architectureLanes: CaseStudyFlowLane[] = [
  {
    title: "External Data Sources",
    icon: <Globe className="h-4 w-4" />,
    iconColorClassName: "text-blue-300",
    nodes: ["High-Volume Social Data Streams"],
  },
  {
    title: "Machine Learning",
    icon: <Brain className="h-4 w-4" />,
    iconColorClassName: "text-sky-300",
    nodes: [
      "Threshold Tuning (Recall-Optimized)",
      "Sparse Text Classifier (TF-IDF + Logistic Regression)",
      "Hierarchy Rules (Taxonomic Consistency)",
    ],
    tightSpacing: true,
  },
  {
    title: "Monitoring Dashboard",
    icon: <Zap className="h-4 w-4" />,
    iconColorClassName: "text-cyan-300",
    nodes: [
      "Signal Aggregation",
      "Live Feed Priority Tagged Signals",
      "Confidence Visualization",
      "Model Dashboard",
    ],
    tightSpacing: true,
  },
  {
    title: "Action Layer",
    icon: <Users className="h-4 w-4" />,
    iconColorClassName: "text-indigo-300",
    nodes: ["Human Triage & Dispatch"],
  },
];

type DesignDoctrineCard = {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
};

const designDoctrineCards: DesignDoctrineCard[] = [
  {
    title: "Controlled Routing",
    description: (
      <>
        Prioritizing deterministic categorization over generative flexibility.
        Responders need to know exactly <em>where</em> a message goes.
      </>
    ),
    icon: <Database className="h-5 w-5" />,
    iconBgColor: "bg-blue-500/10",
    iconColor: "text-blue-300",
  },
  {
    title: "Auditability",
    description:
      "System decisions must be traceable. Explicit thresholds and hierarchy controls ensure behavior is predictable.",
    icon: <Shield className="h-5 w-5" />,
    iconBgColor: "bg-sky-500/10",
    iconColor: "text-sky-300",
  },
  {
    title: "Human-in-the-loop",
    description:
      "Signals inform judgment; they do not replace it. The system exposes confidence levels to help operators make fast, informed decisions.",
    icon: <CheckCircle2 className="h-5 w-5" />,
    iconBgColor: "bg-indigo-500/10",
    iconColor: "text-indigo-300",
  },
];

const MODEL_COLOR_CONFIG: Record<
  ModelComparison["color"],
  { bg: string; text: string }
> = {
  red: { bg: "bg-rose-400/70", text: "text-rose-300/95" },
  yellow: { bg: "bg-amber-400/70", text: "text-amber-300/90" },
  blue: { bg: "bg-sky-400/70", text: "text-sky-300/90" },
  green: { bg: "bg-emerald-400/70", text: "text-emerald-300/90" },
};

function ModelComparisonChart({ models }: { models: ModelComparison[] }) {
  const maxModelSize = 1000;

  const modelData = React.useMemo(() => {
    return models.map((model) => {
      const widthPercent = (model.sizeMB / maxModelSize) * 100;
      const colors = MODEL_COLOR_CONFIG[model.color];
      return {
        ...model,
        widthPercent,
        colors,
      };
    });
  }, [models]);

  return (
    <div className="rounded-lg border border-white/5 bg-[#0B0E14] p-6 md:p-8">
      <div className="space-y-4">
        {modelData.map((model, idx) => (
          <div key={idx}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-400">{model.label}</span>
              <span className={`${model.colors.text} font-mono`}>
                {model.sizeMB.toFixed(1)} MB
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full ${model.colors.bg} transition-all`}
                style={{
                  width: `${model.widthPercent}%`,
                  minWidth: model.widthPercent < 1 ? "2px" : "0",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="flex items-center gap-2 text-sm text-emerald-300/90">
          <Zap className="h-4 w-4" />
          <span>Cold-load time under 0.1s</span>
        </div>
      </div>
    </div>
  );
}

export function StormSignal() {
  return (
    <ProjectPageShell
      theme="storm"
      className="font-sans selection:bg-[var(--project-accent-soft)]"
    >
      <CaseStudyHero
        title="Storm Signal"
        framing={
          <p>
            A disaster-response monitoring dashboard that routes high-volume
            messages into actionable categories using a compact, auditable machine learning
            pipeline built for fast local deployment.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-3xl text-xl md:text-xl text-[var(--project-muted-text)]"
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top right, var(--project-accent-soft), transparent 45%)",
            }}
          />
        }
        media={
          <div className="relative aspect-video w-full bg-[#151921]">
            <ImageWithFallback
              src="/assets/storm-signal.png"
              alt="Storm Signal Dashboard"
              className="h-full w-full object-cover opacity-90"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-60" />
          </div>
        }
      />

      <section className="border-b border-white/5 bg-[var(--project-page-bg)]">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stormStats.map((stat) => (
              <CaseStudyStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                subtext={stat.subtext}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="The Context"
            subtitle="Storm Signal routes high-volume disaster messages into triage categories faster than manual review."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.6fr_1fr] md:items-start">
            <div className="rounded-sm border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                System context
              </p>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]" aria-hidden />
                  <span className="text-sm leading-relaxed text-[var(--project-body-text)] md:text-base">
                  The core risk is signal overload. When routing slows or becomes inconsistent, medical, shelter, and rescue requests are buried or misprioritized.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--project-accent-text)]" aria-hidden />
                  <span className="text-sm leading-relaxed text-[var(--project-body-text)] md:text-base">
                    Storm Signal is designed for local deployment with low compute overhead,
                    explicit thresholds, and auditable hierarchy rules.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-[color:var(--project-accent-border)] bg-[var(--project-accent-soft)]/25 p-4 md:p-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-accent-text)]">
                Operational stakes
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--project-body-text)] md:text-base">
                If routing fails at surge volume, one life-critical message can drop below lower-priority
                noise.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--project-muted-text)]">
                The design priority is dependable triage under load.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading title="Design Decisions" />
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-400 md:mb-12">
            In disaster response, bandwidth is limited,
            conditions change fast, and operators need consistent routing. This architecture favors compact, inspectable machine learning over
            larger hosted models so behavior stays predictable when
            the environment isn&apos;t.
          </p>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {designDoctrineCards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/5 bg-[#151921] p-4 md:p-6"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-sm ${card.iconBgColor} ${card.iconColor}`}
                >
                  {card.icon}
                </div>
                <h3 className="mb-2 font-bold text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--project-page-bg)] py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="System Architecture"
            subtitle="A monitoring dashboard with a constrained machine learning core. Messages are ingested, classified, triaged, and routed to human responders."
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
                lanes={architectureLanes}
                transitions={architectureTransitions}
                accentTextClassName="text-[var(--project-accent-text)]"
                accentBorderClassName="border-[color:var(--project-accent-border)]"
                fallbackFinalOutputLabel="Responder Dispatch"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[var(--project-page-bg)] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--project-accent-text)]">
                Deployment Constraints
              </h3>
              <h2 className="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl">
                From 900 MB to 4.5 MB
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-400 md:space-y-6">
                <p>
                  The initial Random Forest model generated a 900 MB model, making lightweight deployment impossible.
                </p>
                <p>
                  This was replaced with Logistic Regression. Vocabulary filtering and a 15K feature cap shrank the model from 67.7 MB to 4.5 MB while keeping the classifier practical for deployment.
                </p>
              </div>
            </div>

            <ModelComparisonChart models={modelComparisons} />
          </div>
        </div>
      </section>
    </ProjectPageShell>
  );
}
