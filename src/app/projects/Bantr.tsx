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
    <main className="min-h-screen bg-[#120A0B]">
      <CaseStudyHero
        title="Bantr"
        framing={
          <p>
            A conversational game platform built with AI-augmented engineering.
          </p>
        }
        titleClassName="text-4xl leading-tight md:text-6xl"
        framingClassName="max-w-4xl text-base leading-relaxed text-rose-50/85 md:text-lg"
        backLinkClassName="text-rose-100/60 hover:text-rose-100"
        ctasClassName="justify-start sm:justify-end"
        sectionClassName="border-b border-rose-200/10"
        mediaClassName="overflow-hidden rounded-sm border border-rose-100/20 bg-[#1A1012]"
        ctas={ctas.map((cta) => (
          <CaseStudyCtaButton
            key={cta.label}
            label={cta.label}
            href={cta.href}
            icon={cta.icon}
            variant={cta.variant}
            className="border-rose-300/40 bg-rose-300/20 text-rose-50 hover:border-rose-200/60 hover:bg-rose-300/30"
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,113,133,0.2),_transparent_45%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120A0B]/20 to-[#120A0B]" />
          </>
        }
        media={
          <div className="relative h-56 w-full md:h-80">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1600"
              alt="Bantr mobile gameplay"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120A0B] via-[#120A0B]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid gap-2 border-t border-rose-100/20 bg-[#120A0B]/80 p-4 md:grid-cols-3">
              <div className="rounded-sm border border-rose-100/20 bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-rose-200/70">
                  Product type
                </p>
                <p className="mt-1 text-sm font-semibold text-rose-100">Conversational game</p>
              </div>
              <div className="rounded-sm border border-rose-100/20 bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-rose-200/70">
                  Engineering mode
                </p>
                <p className="mt-1 text-sm font-semibold text-rose-100">AI-augmented build loop</p>
              </div>
              <div className="rounded-sm border border-rose-100/20 bg-black/20 p-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-rose-200/70">
                  Hard lesson
                </p>
                <p className="mt-1 text-sm font-semibold text-rose-100">Distribution is separate work</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="py-14">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {productSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-sm border border-rose-100/15 bg-[#1A1012] p-4"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-rose-200/60">
                    {signal.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-rose-100">{signal.value}</p>
                  <p className="mt-1 text-sm text-rose-50/70">{signal.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <CaseStudySectionCard
                  kicker="01"
                  title="The Origin"
                  className="h-full border-rose-100/15 bg-[#1A1012]"
                  kickerClassName="text-rose-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    My wife and I were traveling frequently and wanted something
                    lightweight that made conversations more interesting and
                    encouraged creativity.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    That simple need evolved into a mobile-first game platform
                    built around short conversational rounds.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.04 }}
              >
                <CaseStudySectionCard
                  kicker="02"
                  title="The Ambition"
                  className="h-full border-rose-100/15 bg-[#1A1012]"
                  kickerClassName="text-rose-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    The goal was to ship a real product: AI-generated gameplay,
                    persistent sessions, optional accounts, payments, and a live
                    deployment surface.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    If it worked, it would support real revenue.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="lg:col-span-2"
              >
                <CaseStudySectionCard
                  kicker="03"
                  title="The Build"
                  className="border-rose-100/15 bg-[#1A1012]"
                  kickerClassName="text-rose-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    Bantr is a deployed progressive web app built with React +
                    TypeScript, Express, and Postgres.
                  </p>
                  <p className="leading-relaxed text-gray-300">
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
                        className="border-rose-100/20 bg-[#120A0B]"
                        iconClassName="text-rose-300"
                      />
                    ))}
                  </div>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 }}
              >
                <CaseStudySectionCard
                  kicker="04"
                  title="AI-Augmented Engineering in Practice"
                  className="h-full border-rose-100/15 bg-[#1A1012]"
                  kickerClassName="text-rose-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    AI coding agents can dramatically accelerate implementation,
                    but they require a well-designed system in which to operate
                    effectively.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Once deployed, operational constraints surface quickly: API
                    latency, moderation edge cases, payment configuration, and
                    state management all demand careful design.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Even in a small product, taste and system design still matter.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.16 }}
              >
                <CaseStudySectionCard
                  kicker="05"
                  title="Distribution Lesson"
                  className="h-full border-rose-100/25 bg-[#221114]"
                  kickerClassName="text-rose-300"
                >
                  <p className="leading-relaxed text-gray-300">
                    Technically, the product worked. The system held up, payments
                    processed, and gameplay functioned as intended.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    What I underestimated was the difficulty of distribution. A
                    working product does not automatically find users, and product
                    quality alone is not enough to generate adoption.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Without a defined acquisition channel, even a well-built
                    system remains largely invisible. Distribution is a separate
                    discipline with its own constraints, incentives, and feedback
                    loops.
                  </p>
                </CaseStudySectionCard>
              </Motion.div>
            </div>

            <div className="mt-6 rounded-sm border border-rose-100/15 bg-[#1A1012] p-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-rose-300">
                    Explore Product
                  </p>
                  <p className="mt-2 max-w-2xl leading-relaxed text-gray-300">
                    Bantr was built as a real product surface, not just a demo.
                    The live deployment is where architecture and operational
                    assumptions get tested.
                  </p>
                </div>
                <CaseStudyCtaButton
                  label={ctas[0].label}
                  href={ctas[0].href}
                  icon={ctas[0].icon}
                  variant="primary"
                  className="w-full border-rose-300/40 bg-rose-300/20 text-rose-50 hover:border-rose-200/60 hover:bg-rose-300/30 sm:w-auto"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-rose-100/80">
                <Rocket className="h-4 w-4 text-rose-300" />
                <span>Shipping the product was step one; distribution strategy is step two.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
