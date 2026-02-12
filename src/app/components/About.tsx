import React from "react";
import { clsx } from "clsx";
import { motion as Motion } from "motion/react";

const timelineEvents = [
  {
    year: "2013",
    pillar: "Problem Framing",
    title: "Seeds of Impact",
    description:
      "Inspired by Paul Polak's The Business Solution to Poverty, I began to see design as a powerful tool for solving systemic issues.",
    image:
      "https://images.unsplash.com/photo-1726413280663-1b048191e88e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Seedling",
  },
  {
    year: "2013-15",
    pillar: "Human-Centered Design",
    title: "Impact in Mozambique",
    description:
      "As a Peace Corps volunteer, I implemented drip irrigation systems, reinforcing the power of resource-constrained, systems thinking.",
    image:
      "https://images.unsplash.com/photo-1738507967372-67c692309a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Mozambique landscape",
  },
  {
    year: "2015-16",
    pillar: "Systems Navigation",
    title: "Markets in Dubai",
    description:
      "At Bloomberg, I expanded FX and bond markets across Africa, navigating corruption and systemic inefficiencies through transparency.",
    image:
      "https://images.unsplash.com/photo-1726533765275-a69cfd7f9897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Dubai skyline",
  },
  {
    year: "2016-21",
    pillar: "Workflow Optimization",
    title: "Bloomberg Infrastructure",
    description:
      "In NYC, I built analytics infrastructure, optimizing data pipelines and eliminating legacy bottlenecks for global teams.",
    image:
      "https://images.unsplash.com/photo-1651608034107-12b95f5b2088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "New York City",
  },
  {
    year: "2021-23",
    pillar: "Data Architecture",
    title: "Transparency at VTS",
    description:
      "Built frameworks to reduce complexity in data logic, leveraging DBT and Miro to drive organizational clarity.",
    image:
      "https://images.unsplash.com/photo-1599580546666-c26f15e00933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Commercial buildings",
  },
  {
    year: "2024-Present",
    pillar: "AI & Systems Design",
    title: "The Frontier",
    description:
      "Sabbatical exploring the intersection of AI-enabled engineering and graph-based tools to simplify complex systems.",
    image:
      "https://images.unsplash.com/photo-1765046255517-412341954c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "AI Abstract",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="pt-12 pb-24 bg-[#0B0E14] border-t border-white/5"
    >
      {/* 1. MATCH HERO CONTAINER: Standard container with padding */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* 2. INNER WRAPPER: Matches Hero's max-w-5xl limit */}
        <div className="max-w-5xl mx-auto md:mx-0">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              About
            </h2>
          </div>

          {/* Timeline */}
          {/* 3. CALIBRATE THE SPINE: Remove ml-4 to keep it aligned with the container edge */}
          <div className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-[10px] before:bottom-0 before:w-[2px] before:bg-white/10 before:content-['']">
            {timelineEvents.map((event, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-12"
              >
                {/* Timeline Indicator */}
                <div className="absolute -left-[39px] top-0.5 w-4 h-4 rounded-full bg-[#0B0E14] border-2 border-[#0066cc] z-10" />

                {/* Line Mask for Last Item (stops the spine at the dot) */}
                {index === timelineEvents.length - 1 && (
                  <div className="absolute left-[-33px] top-[10px] bottom-0 w-[4px] bg-[#0B0E14]" />
                )}

                {/* Year & Pillar Metadata */}
                <div className="md:w-32 shrink-0">
                  <span className="block text-xl font-bold text-white leading-none">
                    {event.year}
                  </span>
                  <span className="block text-[10px] font-mono text-[#0066cc] uppercase tracking-tighter mt-1 opacity-80">
                    {event.pillar}
                  </span>
                </div>

                {/* Content + Artifact */}
                <div className="flex-grow flex flex-col md:flex-row gap-6">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed max-w-xl">
                      {event.description}
                    </p>
                  </div>

                  {/* Small Square Artifact */}
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg border border-white/10 bg-gray-900/50 overflow-hidden group">
                    <img
                      src={event.image}
                      alt={event.alt}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}