import React from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type CtaLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
};

const ctas: CtaLink[] = [
  {
    label: "Live demo",
    href: "https://walkability-index.replit.app/",
    icon: <ExternalLink className="w-4 h-4" />,
    variant: "primary",
  },
  {
    label: "View on GitHub",
    href: "https://github.com/ghgeist/urbanism_project",
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

export function WalkabilityIndexDetail() {
  return (
    <main className="bg-[#0B0E14] min-h-screen">
      {/* Top frame */}
      <section className="relative border-b border-white/5">
        {/* Subtle grid */}
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
            {/* Metadata */}
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

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Walkability Index
            </h1>

            {/* One-sentence framing */}
            <p className="mt-4 text-gray-400 font-mono text-lg max-w-3xl leading-relaxed">
              A national geospatial dataset turned into a
              queryable civic tool — search any U.S. location,
              explore a radius, and inspect the component scores
              behind the composite index.
            </p>

            {/* Hero artifact (screenshot placeholder) */}
            <div className="mt-8 border border-white/10 bg-black/30 overflow-hidden">
              <div className="h-56 md:h-72 w-full relative">
                <div className="absolute inset-0 opacity-80 grayscale">
                  <ImageWithFallback
                    // Swap this to a real screenshot when you have one
                    src="https://images.unsplash.com/photo-1542382257-80dedb725088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
                    alt="Walkability Index preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-white/90 font-mono text-xs">
                      LIVE PRODUCT PREVIEW
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
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Section kicker="01" title="Why this matters">
                <p className="text-gray-400 leading-relaxed">
                  Walkability shapes housing outcomes, public
                  health, and climate-relevant transportation
                  patterns — but the underlying data is often
                  locked in static files and difficult to
                  explore.
                </p>
                <div className="mt-4 text-gray-500 font-mono text-sm">
                  The goal: make national-scale walkability
                  explorable in seconds.
                </div>
              </Section>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Section kicker="02" title="What I built">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">
                      —
                    </span>
                    <span>
                      A geospatial service layer that turns
                      address input into repeatable spatial
                      queries.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">
                      —
                    </span>
                    <span>
                      PostGIS-backed storage for block-group
                      geometries (optimized for footprint and
                      query latency).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">
                      —
                    </span>
                    <span>
                      Radius exploration with buffered
                      geospatial lookups (the “nearby
                      neighborhoods” view).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">
                      —
                    </span>
                    <span>
                      An interactive map + table view that
                      exposes component scores behind the
                      composite index.
                    </span>
                  </li>
                </ul>

                <div className="mt-6 border border-white/5 bg-black/20 p-4">
                  <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">
                    Architecture
                  </div>
                  <div className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre">
                    {
                      "Streamlit UI\n  ↓\nService layer\n  ↓\nPostGIS (indexed national dataset)"
                    }
                  </div>
                </div>
              </Section>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Section kicker="03" title="Try it">
                <p className="text-gray-400 leading-relaxed">
                  Use the live demo to search a U.S. city, ZIP,
                  or address — then adjust the radius to explore
                  nearby block groups and compare component
                  scores.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {ctas.map((cta) => (
                    <CtaButton key={cta.label} {...cta} />
                  ))}
                </div>

                <div className="mt-6 text-gray-500 font-mono text-xs leading-relaxed">
                  If you only have 30 seconds: click “Live demo”
                  and try a city you know well.
                </div>
              </Section>
            </Motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}