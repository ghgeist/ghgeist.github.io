import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Zap, Database, Shield, Globe, Brain, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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
    <div className="bg-[#151921] border border-white/5 p-5 rounded-sm">
      <div className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{subtext}</div>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-gray-400 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function Node({ text }: { text: string }) {
  return (
    <div className="w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-3 text-center">
      <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

function Lane({ 
  title, 
  icon, 
  iconColor, 
  children,
  tightSpacing = false
}: { 
  title: string; 
  icon: React.ReactNode; 
  iconColor: string;
  children: React.ReactNode;
  tightSpacing?: boolean;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 flex flex-col h-full min-h-[300px]">
      <div className="flex items-center gap-2 mb-6">
        <div className={`${iconColor} flex-shrink-0`}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col justify-start">
        <div className={`w-full max-w-[260px] mx-auto ${tightSpacing ? 'space-y-2' : 'space-y-3'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function StormSignal() {
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
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
                Storm Signal
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
                An OSINT signal classification system designed for disaster-response environments where speed and reliability are non-negotiable.
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
            <StatCard label="Classification F1" value="92.8%" subtext="Across 36 disaster-response categories" />
          </div>
        </div>
      </section>

      {/* Context / Problem */}
      <section className="py-20 bg-[#0B0E14]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading 
            title="The Context" 
            subtitle="Disasters generate high-volume, unstructured communication streams. Posts and direct reports arrive faster than human operators can triage them."
          />
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="text-lg">
              The risk is not isolated misclassification. It is signal overload. When routing systems are slow, inconsistent, or logically incoherent, critical requests for medical aid, shelter, or rescue are delayed, buried, or misprioritized.
            </p>
            <p className="text-lg mt-6">
              Storm Signal is a high-fidelity prototype of an operational surface built to manage that flow under real-world constraints: offline availability, low compute overhead, and auditability.
            </p>
          </div>
        </div>
      </section>

      {/* Design Doctrine */}
      <section className="py-20 border-y border-white/5 bg-[#11141a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
           <SectionHeading title="Design Doctrine" />
           <p className="text-gray-400 text-base leading-relaxed max-w-3xl mb-12">
           In disaster routing, constraints dominate: surge cost, offline reliability, and predictable behavior. These environments reward deterministic systems that remain stable under load. For that reason, the architecture favors compact, inspectable ML over API-dependent generative models, prioritizing consistency and control when conditions are most volatile.
           </p>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#151921] p-6 rounded-sm border border-white/5">
                <div className="w-10 h-10 bg-blue-500/10 rounded-sm flex items-center justify-center mb-4 text-blue-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold mb-2">Controlled Routing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Prioritizing deterministic categorization over generative flexibility. Responders need to know exactly <em>where</em> a message goes.</p>
              </div>
              <div className="bg-[#151921] p-6 rounded-sm border border-white/5">
                <div className="w-10 h-10 bg-purple-500/10 rounded-sm flex items-center justify-center mb-4 text-purple-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold mb-2">Auditability</h3>
                <p className="text-gray-400 text-sm leading-relaxed">System decisions must be traceable. Explicit thresholds and hierarchy controls ensure behavior is predictable.</p>
              </div>
              <div className="bg-[#151921] p-6 rounded-sm border border-white/5">
                <div className="w-10 h-10 bg-green-500/10 rounded-sm flex items-center justify-center mb-4 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold mb-2">Human-in-the-loop</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Signals inform judgment; they do not replace it. The system exposes confidence levels to help operators make fast, verified decisions.</p>
              </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 bg-[#0B0E14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <SectionHeading 
             title="System Architecture" 
             subtitle="An operational surface with a constrained machine learning core. Messages are ingested from external sources, classified, surfaced, and routed to human responders." 
           />
           
           <div className="mt-12">
              {/* Diagram Surface */}
              <div className="relative bg-[#151921] border border-white/10 rounded-lg p-6 md:p-10 overflow-x-auto">
                 {/* Grid Background Pattern */}
                 <div className="absolute inset-0 opacity-5 rounded-lg" style={{
                   backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                   backgroundSize: '24px 24px'
                 }} />
                 
                 {/* Swimlane Grid */}
                 <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Lane 1: External Data Sources */}
                    <Lane 
                      title="External Data Sources" 
                      icon={<Globe className="w-4 h-4" />}
                      iconColor="text-blue-400"
                    >
                      <Node text="High-Volume Social Data Streams" />
                    </Lane>

                    {/* Lane 2: Machine Learning */}
                    <Lane 
                      title="Machine Learning" 
                      icon={<Brain className="w-4 h-4" />}
                      iconColor="text-pink-400"
                      tightSpacing={true}
                    >
                      <Node text="Threshold Tuning Recall-Optimized" />
                      <Node text="Classification Pipeline TF-IDF → Logistic Regression" />
                      <Node text="Hierarchy Rules Taxonomic Consistency" />
                    </Lane>

                    {/* Lane 3: Operational Surface */}
                    <Lane 
                      title="Operational Surface" 
                      icon={<Zap className="w-4 h-4" />}
                      iconColor="text-orange-400"
                      tightSpacing={true}
                    >
                      <Node text="Signal Aggregation" />
                      <Node text="Live Feed Priority Tagged Signals" />
                      <Node text="Confidence Visualization" />
                      <Node text="Model Dashboard" />
                    </Lane>

                    {/* Lane 4: Action Layer */}
                    <Lane 
                      title="Action Layer" 
                      icon={<Users className="w-4 h-4" />}
                      iconColor="text-red-400"
                    >
                      <Node text="Human Triage & Dispatch" />
                    </Lane>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Case Study: The Pivot */}
      <section className="py-20 bg-[#151921] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-2">Key Engineering Trade-off</h3>
                <h2 className="text-3xl font-bold text-white mb-6">Novelty vs. Utility</h2>
                <div className="space-y-6 text-gray-400 leading-relaxed">
                  <p>
                    Early iterations used a Random Forest model. Artifact size approached ~900 MB and proved unsuitable for lightweight or edge deployment.
                  </p>
                  <p>
                    Replacing it with Logistic Regression reduced the model to 67.69 MB, a 92% reduction from the algorithm change alone. Applying vocabulary filters brought it down to 13.03 MB, and limiting features to 15K produced the final 4.53 MB production model.
                  </p>
                  <p>
                    The final stack prioritizes determinism, inspectability, and predictable inference behavior over model novelty.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#0B0E14] p-8 rounded-lg border border-white/5">
                 <div className="space-y-4">
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Random Forest</span>
                          <span className="text-red-400 font-mono">900 MB</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500/50 w-full"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">LR (unlimited vocabulary)</span>
                          <span className="text-yellow-400 font-mono">67.7 MB</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500/50 w-[7.5%]"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">LR (with vocabulary filters)</span>
                          <span className="text-blue-400 font-mono">13.0 MB</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500/50 w-[1.5%] min-w-[2px]"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="text-white font-medium">LR (15K features)</span>
                          <span className="text-green-400 font-mono">4.5 MB</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[0.5%] min-w-[2px]"></div> 
                       </div>
                    </div>
                 </div>
                 <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                       <Zap className="w-4 h-4" />
                       <span>Latency reduced to &lt;0.1s cold load</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer / Validation */}
      <section className="py-24 bg-[#0B0E14]">
         <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Validation Under Constraint</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
               Evaluation focused on operational behavior, not just headline metrics. The system achieved zero hierarchy violations across 26k test messages after post-processing logic was applied.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               {ctas.map((cta) => (
                  <CtaButton key={cta.label} {...cta} />
               ))}
            </div>
            
            <p className="mt-12 text-sm text-gray-500 font-mono">
               View the full evaluation logic and reproducible notebooks in the repository.
            </p>
         </div>
      </section>
    </main>
  );
}
