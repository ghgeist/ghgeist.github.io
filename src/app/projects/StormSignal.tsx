import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Database,
  Shield,
  Globe,
  Brain,
  Users,
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
    label: "Live Demo",
    href: "https://storm-signal.replit.app/",
    icon: <ExternalLink className="h-4 w-4" />,
    variant: "primary" as const,
  },
  {
    label: "View on Github",
    href: "https://github.com/ghgeist/disaster_response_project",
    icon: <Github className="h-4 w-4" />,
    variant: "secondary" as const,
  },
];

const architectureLanes: CaseStudyFlowLane[] = [
  {
    title: "External Data Sources",
    icon: <Globe className="h-4 w-4" />,
    iconColorClassName: "text-blue-400",
    nodes: ["High-Volume Social Data Streams"],
  },
  {
    title: "Machine Learning",
    icon: <Brain className="h-4 w-4" />,
    iconColorClassName: "text-pink-400",
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
    iconColorClassName: "text-orange-400",
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
    iconColorClassName: "text-red-400",
    nodes: ["Human Triage & Dispatch"],
  },
];

const architectureTransitions = [
  "Messages",
  "Classifications + Confidence",
  "Prioritized Signals",
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
    iconColor: "text-blue-400",
  },
  {
    title: "Auditability",
    description:
      "System decisions must be traceable. Explicit thresholds and hierarchy controls ensure behavior is predictable.",
    icon: <Shield className="h-5 w-5" />,
    iconBgColor: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    title: "Human-in-the-loop",
    description:
      "Signals inform judgment; they do not replace it. The system exposes confidence levels to help operators make fast, verified decisions.",
    icon: <CheckCircle2 className="h-5 w-5" />,
    iconBgColor: "bg-green-500/10",
    iconColor: "text-green-400",
  },
];

type ModelComparison = {
  label: string;
  sizeMB: number;
  color: "red" | "yellow" | "blue" | "green";
};

const modelComparisons: ModelComparison[] = [
  { label: "Random Forest", sizeMB: 900, color: "red" },
  { label: "LR (unlimited vocabulary)", sizeMB: 67.7, color: "yellow" },
  { label: "LR (with vocabulary filters)", sizeMB: 13.0, color: "blue" },
  { label: "LR (15K features)", sizeMB: 4.5, color: "green" },
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
          <span>Latency reduced to &lt;0.1s cold load</span>
        </div>
      </div>
    </div>
  );
}

export function StormSignal() {
  const navigate = useNavigate();

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
    <main className="project-theme min-h-screen bg-[#0B0E14] font-sans selection:bg-blue-500/30">
      <CaseStudyHero
        title="Storm Signal"
        framing={
          <p>
            A disaster-response monitoring dashboard that routes high-volume
            messages into actionable categories - using a compact, auditable ML
            pipeline built for speed and offline deployment.
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0E14] to-[#0B0E14]" />
        }
        media={
          <div className="relative aspect-video w-full bg-[#151921]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"
              alt="Storm Signal Dashboard"
              className="h-full w-full object-cover opacity-90"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-60" />
          </div>
        }
      />

      <section className="border-b border-white/5 bg-[#0B0E14]">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <CaseStudyStatCard
              label="Model Size"
              value="4.5 MB"
              subtext="Designed for local deployment"
            />
            <CaseStudyStatCard
              label="Inference Latency"
              value="< 100ms"
              subtext="Real-time classification under load"
            />
            <CaseStudyStatCard
              label="Weighted F1"
              value="92.8%"
              subtext="Across 36 categories (multi-label)"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0B0E14] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="The Context"
            subtitle="Disasters generate high-volume, unstructured communication streams. Posts and direct reports arrive faster than human operators can triage them."
          />
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="text-base md:text-lg">
              The risk is not isolated misclassification. It is signal overload.
              When routing systems are slow, inconsistent, or logically
              incoherent, critical requests for medical aid, shelter, or rescue
              are delayed, buried, or misprioritized.
            </p>
            <p className="mt-6 text-base md:text-lg">
              Storm Signal is a high-fidelity prototype of a monitoring dashboard
              built to manage that flow under real-world constraints: offline
              availability, low compute overhead, and auditability.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#11141a] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading title="Design Doctrine" />
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-400 md:mb-12">
            Disaster response punishes ambiguity: bandwidth is limited,
            conditions change fast, and operators need consistent routing under
            surge. This architecture favors compact, inspectable ML over
            API-dependent generative systems so behavior stays predictable when
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

      <section className="bg-[#0B0E14] py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <CaseStudySectionHeading
            title="System Architecture"
            subtitle="A monitoring dashboard with a constrained ML core. Messages are ingested, classified with confidence, surfaced for triage, and routed to human responders."
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
                accentTextClassName="text-blue-400"
                accentBorderClassName="border-blue-400/25"
                fallbackFinalOutputLabel="Responder Dispatch"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#151921] py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="mb-2 font-mono text-sm uppercase tracking-widest text-blue-400">
                Key Engineering Trade-off
              </h3>
              <h2 className="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl">
                Novelty vs. Utility
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-400 md:space-y-6">
                <p>
                  Early iterations used a Random Forest model. Artifact size
                  approached ~900 MB and proved unsuitable for lightweight or
                  edge deployment.
                </p>
                <p>
                  This was replaced with Logistic Regression to make edge
                  deployment viable. The artifact dropped from 67.7 MB to 13.0
                  MB with vocabulary filtering, and to 4.5 MB with a 15K feature
                  cap without sacrificing operational performance.
                </p>
                <p>
                  The final stack prioritizes determinism, inspectability, and
                  predictable inference behavior over model novelty.
                </p>
              </div>
            </div>

            <ModelComparisonChart models={modelComparisons} />
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
