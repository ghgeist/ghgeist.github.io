import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, Gauge, Layers, ShieldCheck, Cpu, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type CtaLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
};

const ctas: CtaLink[] = [
  {
    label: "Live demo",
    href: "https://storm-signal.replit.app/",
    icon: <ExternalLink className="w-4 h-4" />,
    variant: "primary",
  },
  {
    label: "View on GitHub",
    href: "https://github.com/ghgeist/disaster_response_project",
    icon: <Github className="w-4 h-4" />,
    variant: "secondary",
  },
];

function CtaButton({ label, href, icon, variant }: CtaLink) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-mono border transition-colors";
  const styles =
    variant === "primary"
      ? "bg-blue-500/10 text-blue-200 border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/15"
      : "bg-transparent text-gray-200 border-white/10 hover:border-white/25 hover:bg-white/5";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles}`}
    >
      {icon}
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 opacity-70" />
    </a>
  );
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/5 bg-[#151921] p-6">
      <div className="mb-4">
        <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">
          {kicker}
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="border border-white/5 bg-black/20 p-4">
      <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">
        {label}
      </div>
      <div className="mt-2 text-white text-2xl font-bold tracking-tight">
        {value}
      </div>
      {note && <div className="mt-2 text-gray-400 text-sm">{note}</div>}
    </div>
  );
}

function Pill({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 border border-white/5 bg-black/20 p-4">
      <div className="text-blue-400 mt-0.5">{icon}</div>
      <div>
        <div className="text-white font-semibold text-sm">{title}</div>
        <div className="text-gray-400 text-sm leading-relaxed mt-1">
          {description}
        </div>
      </div>
    </div>
  );
}

export function StormSignal() {
  return (
    <main className="bg-[#0B0E14] min-h-screen">
      {/* Top Frame */}
      <section className="relative border-b border-white/5">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0E14]/20 to-[#0B0E14]" />

        <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8 pt-20 pb-10">
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto md:mx-0"
          >
            {/* Metadata + CTA */}
            <div className="flex items-center justify-between gap-6 mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Case Studies
              </Link>
              <div className="flex items-center gap-3">
                {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
                ))}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Storm Signal
            </h1>

            <p className="mt-4 text-gray-400 font-mono text-lg max-w-3xl leading-relaxed">
              A production-oriented ML pipeline that classifies emergency messages
              into disaster-response categories — optimized for speed, size, and
              safety-critical recall.
            </p>

            {/* Metrics row (fast scan) */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Metric
                label="Model size"
                value="4.53 MB"
                note="~93% reduction from 67.69 MB"
              />
              <Metric
                label="Load time"
                value="< 0.1s"
                note="Optimized initialization for deployment"
              />
              <Metric
                label="Performance"
                value="92.76% F1"
                note="With emphasis on critical recall"
              />
            </div>

            {/* Hero visual placeholder */}
            <div className="mt-8 border border-white/10 bg-black/30 overflow-hidden">
              <div className="h-56 md:h-72 w-full relative">
                <div className="absolute inset-0 opacity-80 grayscale">
                  <ImageWithFallback
                    // Replace with a real screenshot of the dashboard / classification UI
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
                    alt="Storm Signal system preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-white/90 font-mono text-xs">
                      PRODUCTION ML SYSTEM
                    </div>
                    <div className="text-white/60 font-mono text-xs">
                      (replace with real screenshot)
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl mx-auto md:mx-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* WHY */}
            <Section kicker="01" title="Why this matters">
              <p className="text-gray-400 leading-relaxed">
                In a disaster, the hardest part isn’t prediction — it’s routing.
                You need fast, consistent categorization so responders can
                prioritize medical help, shelter, water, and infrastructure needs
                without manual triage.
              </p>
              <div className="mt-4 text-gray-500 font-mono text-sm">
                The constraint: deployable ML under real latency + reliability demands.
              </div>
            </Section>

            {/* WHAT */}
            <Section kicker="02" title="What I built">
              <div className="space-y-3">
                <Pill
                  icon={<Cpu className="w-4 h-4" />}
                  title="Lightweight inference system"
                  description="TF-IDF + Logistic Regression optimized for tiny model size and fast startup."
                />
                <Pill
                  icon={<Gauge className="w-4 h-4" />}
                  title="Performance + evaluation discipline"
                  description="Comprehensive metrics across 36 categories, with emphasis on safety-critical recall."
                />
                <Pill
                  icon={<ShieldCheck className="w-4 h-4" />}
                  title="Hierarchy consistency layer"
                  description="Post-processing to enforce parent/child label consistency and reduce invalid outputs."
                />
                <Pill
                  icon={<Layers className="w-4 h-4" />}
                  title="Production-ready architecture"
                  description="Modular pipeline, testing, experiment tracking, and a deployed web UI."
                />
              </div>

              <div className="mt-6 border border-white/5 bg-black/20 p-4">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">
                  System Layers
                </div>
                <div className="text-gray-300 font-mono text-sm whitespace-pre leading-relaxed">
{`Message Input
  ↓
Text Pipeline (cleaning + TF-IDF)
  ↓
Classifier (multi-label LR)
  ↓
Hierarchy Consistency
  ↓
Web UI + Metrics`}
                </div>
              </div>
            </Section>

            {/* TRY IT */}
            <Section kicker="03" title="Try it">
              <p className="text-gray-400 leading-relaxed">
                Use the live demo to classify messages and explore performance.
                The repository documents the architecture, evaluation approach,
                and deployment constraints.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
                ))}
              </div>

              <div className="mt-6 text-gray-500 font-mono text-xs leading-relaxed">
                If you only have 30 seconds: click “Live demo,” classify a message,
                and look at how the system handles consistency + confidence.
              </div>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}