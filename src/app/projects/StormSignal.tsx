import React from "react";
import { motion as Motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, ArrowLeft, CheckCircle2, Zap, Database, Shield, Globe, Brain, Users } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type CtaLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
};

const ctas: CtaLink[] = [
  {
    label: "Live Demo",
    href: "https://storm-signal.replit.app/",
    icon: <ExternalLink className="w-4 h-4" />,
    variant: "primary",
  },
  {
    label: "View Source",
    href: "https://github.com/ghgeist/disaster_response_project",
    icon: <Github className="w-4 h-4" />,
    variant: "secondary",
  },
];

type ArchitectureLane = {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  nodes: string[];
  tightSpacing?: boolean;
};

const architectureLanes: ArchitectureLane[] = [
  {
    title: "External Data Sources",
    icon: <Globe className="w-4 h-4" />,
    iconColor: "text-blue-400",
    nodes: ["High-Volume Social Data Streams"],
  },
  {
    title: "Machine Learning",
    icon: <Brain className="w-4 h-4" />,
    iconColor: "text-pink-400",
    nodes: [
      "Threshold Tuning (Recall-Optimized)",
      "Sparse Text Classifier (TF-IDF + Logistic Regression)",
      "Hierarchy Rules (Taxonomic Consistency)",
    ],
    tightSpacing: true,
  },
  {
    title: "Monitoring Dashboard",
    icon: <Zap className="w-4 h-4" />,
    iconColor: "text-orange-400",
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
    icon: <Users className="w-4 h-4" />,
    iconColor: "text-red-400",
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
    description: <>Prioritizing deterministic categorization over generative flexibility. Responders need to know exactly <em>where</em> a message goes.</>,
    icon: <Database className="w-5 h-5" />,
    iconBgColor: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    title: "Auditability",
    description: "System decisions must be traceable. Explicit thresholds and hierarchy controls ensure behavior is predictable.",
    icon: <Shield className="w-5 h-5" />,
    iconBgColor: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    title: "Human-in-the-loop",
    description: "Signals inform judgment; they do not replace it. The system exposes confidence levels to help operators make fast, verified decisions.",
    icon: <CheckCircle2 className="w-5 h-5" />,
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

function CtaButton({ label, href, icon, variant }: CtaLink) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-all rounded-sm";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
      : "bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles}`}
    >
      {icon}
      <span>{label}</span>
      {variant === "primary" && <ArrowRight className="w-4 h-4 opacity-70" />}
    </a>
  );
}

function StatCard({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <div className="bg-[#151921] border border-white/5 p-4 md:p-5 rounded-sm">
      <div className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xl md:text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{subtext}</div>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function Node({ text }: { text: string }) {
  return (
    <div className="w-full bg-white/[0.03] border border-white/10 rounded-md px-3 py-2 md:px-3 md:py-2 text-center">
      <p className="text-[13px] md:text-[13px] text-gray-300 leading-normal md:leading-snug">{text}</p>
    </div>
  );
}

function Lane({
  index,
  title,
  icon,
  iconColor,
  nodes,
  nextLabel,
  tightSpacing = false,
}: {
  index: number;
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  nodes: string[];
  nextLabel?: string;
  tightSpacing?: boolean;
}) {
  const laneNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3.5 md:p-3 flex flex-col h-full min-h-0 sm:min-h-[180px] md:min-h-[170px]">
      <div className="flex items-start justify-between gap-2 mb-3 md:mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`${iconColor} flex-shrink-0`}>
            {icon}
          </div>
          <h3 className="text-xs md:text-sm font-semibold text-white">{title}</h3>
        </div>
        <span className="text-[10px] font-mono text-blue-400 border border-blue-400/25 rounded px-1.5 py-0.5">
          {laneNumber}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-start">
        <div className={`w-full max-w-full md:max-w-[240px] mx-auto ${tightSpacing ? "space-y-1" : "space-y-2"}`}>
          {nodes.map((text, idx) => (
            <Node key={idx} text={text} />
          ))}
        </div>
      </div>

      <div className="hidden sm:block mt-2 md:mt-1.5 pt-2 md:pt-1.5 border-t border-white/10">
        {nextLabel ? (
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] text-center">
            <span className="font-mono uppercase tracking-wide text-blue-400">Output:</span>
            <span className="text-blue-400">{nextLabel}</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] text-center">
            <span className="font-mono uppercase tracking-wide text-blue-400">Output:</span>
            <span className="text-blue-400">Responder Dispatch</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileFlowConnector({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-[11px] text-center">
      <span className="font-mono uppercase tracking-wide text-blue-400">Output:</span>
      <span className="text-blue-400">{label}</span>
    </div>
  );
}

function AnimatedLane({ lane, idx }: { lane: ArchitectureLane; idx: number }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: idx * 0.08 }}
      className="h-full"
    >
      <Lane
        index={idx}
        title={lane.title}
        icon={lane.icon}
        iconColor={lane.iconColor}
        nodes={lane.nodes}
        nextLabel={architectureTransitions[idx]}
        tightSpacing={lane.tightSpacing}
      />
    </Motion.div>
  );
}

function ArchitectureDesktopTablet() {
  return (
    <div className="relative hidden sm:block">
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {architectureLanes.map((lane, idx) => (
          <AnimatedLane key={idx} lane={lane} idx={idx} />
        ))}
      </div>
    </div>
  );
}

function ArchitectureMobile() {
  return (
    <div className="relative sm:hidden">
      <div className="space-y-2">
        {architectureLanes.map((lane, idx) => (
          <React.Fragment key={idx}>
            <AnimatedLane lane={lane} idx={idx} />
            {idx < architectureTransitions.length && <MobileFlowConnector label={architectureTransitions[idx]} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ModelComparisonChart({ models }: { models: ModelComparison[] }) {
  const colorConfig: Record<ModelComparison["color"], { bg: string; text: string }> = {
    red: { bg: "bg-rose-400/70", text: "text-rose-300/95" },
    yellow: { bg: "bg-amber-400/70", text: "text-amber-300/90" },
    blue: { bg: "bg-sky-400/70", text: "text-sky-300/90" },
    green: { bg: "bg-emerald-400/70", text: "text-emerald-300/90" },
  };

  const maxModelSize = 1000;

  return (
    <div className="bg-[#0B0E14] p-6 md:p-8 rounded-lg border border-white/5">
      <div className="space-y-4">
        {models.map((model, idx) => {
          const widthPercent = (model.sizeMB / maxModelSize) * 100;
          const colors = colorConfig[model.color];

          return (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">
                  {model.label}
                </span>
                <span className={`${colors.text} font-mono`}>
                  {model.sizeMB.toFixed(1)} MB
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bg} transition-all`}
                  style={{ width: `${widthPercent}%`, minWidth: widthPercent < 1 ? '2px' : '0' }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-emerald-300/90 text-sm">
          <Zap className="w-4 h-4" />
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
    <main className="bg-[#0B0E14] min-h-screen font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <header className="relative pt-20 pb-12 md:pt-32 md:pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0E14] to-[#0B0E14]" />
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
                Storm Signal
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
                A disaster-response monitoring dashboard that routes high-volume messages into actionable categories — using a compact, auditable ML pipeline built for speed and offline deployment.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-white/10 bg-[#151921] shadow-2xl shadow-black/50 aspect-video group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600" 
                  alt="Storm Signal Dashboard"
                  className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-60" />
              </div>
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 rounded-full" />
            </div>
          </Motion.div>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="border-b border-white/5 bg-[#0B0E14]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Model Size" value="4.5 MB" subtext="Designed for local deployment" />
            <StatCard label="Inference Latency" value="< 100ms" subtext="Real-time classification under load" />
            <StatCard label="Weighted F1" value="92.8%" subtext="Across 36 categories (multi-label)" />
          </div>
        </div>
      </section>

      {/* Context / Problem */}
      <section className="py-12 md:py-20 bg-[#0B0E14]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading 
            title="The Context" 
            subtitle="Disasters generate high-volume, unstructured communication streams. Posts and direct reports arrive faster than human operators can triage them."
          />
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="text-base md:text-lg">
              The risk is not isolated misclassification. It is signal overload. When routing systems are slow, inconsistent, or logically incoherent, critical requests for medical aid, shelter, or rescue are delayed, buried, or misprioritized.
            </p>
            <p className="text-base md:text-lg mt-6">
              Storm Signal is a high-fidelity prototype of a monitoring dashboard built to manage that flow under real-world constraints: offline availability, low compute overhead, and auditability.
            </p>
          </div>
        </div>
      </section>

      {/* Design Doctrine */}
      <section className="py-12 md:py-20 border-y border-white/5 bg-[#11141a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
           <SectionHeading title="Design Doctrine" />
           <p className="text-gray-400 text-base leading-relaxed max-w-3xl mb-8 md:mb-12">
           Disaster response punishes ambiguity: bandwidth is limited, conditions change fast, and operators need consistent routing under surge. This architecture favors compact, inspectable ML over API-dependent generative systems so behavior stays predictable when the environment isn't.
           </p>
           <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {designDoctrineCards.map((card, idx) => (
                <div key={idx} className="bg-[#151921] p-4 md:p-6 rounded-sm border border-white/5">
                  <div className={`w-10 h-10 ${card.iconBgColor} rounded-sm flex items-center justify-center mb-4 ${card.iconColor}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-10 md:py-12 bg-[#0B0E14]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
           <SectionHeading 
             title="System Architecture" 
             subtitle="A monitoring dashboard with a constrained ML core. Messages are ingested, classified with confidence, surfaced for triage, and routed to human responders." 
           />
           
           <div className="mt-8 md:mt-6">
              {/* Diagram Surface */}
              <div className="relative bg-[#151921] border border-white/10 rounded-lg p-3 md:p-3 lg:p-6">
                 {/* Grid Background Pattern */}
                 <div className="absolute inset-0 opacity-5 rounded-lg" style={{
                   backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                   backgroundSize: '24px 24px'
                 }} />
                 
                 <ArchitectureDesktopTablet />
                 <ArchitectureMobile />
              </div>
           </div>
        </div>
      </section>

      {/* Case Study: The Pivot */}
      <section className="py-12 md:py-20 bg-[#151921] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-2">Key Engineering Trade-off</h3>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Novelty vs. Utility</h2>
                <div className="space-y-4 md:space-y-6 text-gray-400 leading-relaxed">
                  <p>
                    Early iterations used a Random Forest model. Artifact size approached ~900 MB and proved unsuitable for lightweight or edge deployment.
                  </p>
                  <p>
                    This was replaced with Logistic Regression to make edge deployment viable. The artifact dropped from 67.7 MB to 13.0 MB with vocabulary filtering, and to 4.5 MB with a 15K feature cap without sacrificing operational performance.
                  </p>
                  <p>
                    The final stack prioritizes determinism, inspectability, and predictable inference behavior over model novelty.
                  </p>
                </div>
              </div>
              
              <ModelComparisonChart models={modelComparisons} />
           </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-[#0B0E14] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <a
            href="/#page-top"
            onClick={handleBackToCaseStudies}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </a>
        </div>
      </section>
    </main>
  );
}

