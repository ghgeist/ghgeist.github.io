import React from "react";
import { motion as Motion } from "motion/react";

const timelineEvents = [
  {
    year: "2013",
    pillar: "Studying Incentives & Scale",
    title: "Macon, GA (Mercer University)",
    description:
      "While majoring in chemistry with a minor in biology, I gravitated toward courses in poverty economics and institutional incentives in a liberal arts setting adjacent to one of the poorest mid-sized cities in the U.S., focusing on how pricing, education, and policy structures shape long-term outcomes and whether interventions actually scale.",
    image:
      "https://images.unsplash.com/photo-1726413280663-1b048191e88e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Macon, GA",
  },
  {
    year: "2013–2015",
    pillar: "Building Infrastructure Under Constraint",
    title: "Mozambique (U.S. Peace Corps)",
    description:
      "Secured grant funding and implemented drip irrigation at an agricultural technical school previously dependent on rain-fed crops, restoring reliable yields and making on-campus food production viable under local constraints.",
    image:
      "https://images.unsplash.com/photo-1738507967372-67c692309a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Mozambique landscape",
  },
  {
    year: "2015–2016",
    pillar: "Operating in Regulated Market Systems",
    title: "Dubai (Bloomberg)",
    description:
      "Built Excel- and Bloomberg API–based monitoring systems supporting FX and bond market expansion across Africa and the Middle East. Developed tools used by regional teams to track sovereign bond activity, including long-term monitoring of the Ghanaian bond market, within politically complex, regulated financial systems.",
    image:
      "https://images.unsplash.com/photo-1726533765275-a69cfd7f9897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Dubai skyline",
  },
  {
    year: "2016–2021",
    pillar: "Scaling Data Infrastructure",
    title: "New York (Bloomberg)",
    description:
      "Built analytics infrastructure for a 121-person department. Led anomaly detection correcting 2.1M inconsistencies across 18TB of data, reducing reporting risk and structural fragility.",
    image:
      "https://images.unsplash.com/photo-1651608034107-12b95f5b2088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "New York City",
  },
  {
    year: "2021–2023",
    pillar: "Re-Architecting Production Systems",
    title: "New York (VTS)",
    description:
      "Migrated core business logic from Looker PDTs into dbt, consolidating 23 production metrics for a 146-person organization during a $125M Series E. Reduced breakage risk and clarified system ownership under scaling pressure.",
    image:
      "https://images.unsplash.com/photo-1599580546666-c26f15e00933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "Commercial buildings",
  },
  {
    year: "2022–2024",
    pillar: "Learning to Build Physical Systems",
    title: "Rhode Island School of Design (RISD) (Product Design & Manufacturing)",
    description:
      "Completed a two-year Product Design & Manufacturing certificate while working full-time. Developed prototyping discipline across CAD, iterative physical prototyping, and constraint-driven product development, shifting from analyzing systems to making and shipping tangible artifacts under constraint. For my capstone, I studied embodied AI systems, exploring how physical interfaces can give users more tangible control over computational systems.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "RISD",
  },
  {
    year: "2024–Present",
    pillar: "Designing and Building Applied Systems",
    title: "Remote",
    description:
      "In 2024, I retooled around AI-augmented engineering. I completed the Udacity Data Science Nanodegree and have since invested 3,000+ hours building production systems across ML, economic modeling, and geospatial domains, using LLM-assisted code generation, refactoring, and testing to accelerate development without lowering engineering standards.",
    image:
      "https://images.unsplash.com/photo-1765046255517-412341954c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    alt: "AI Abstract",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="border-t border-white/5 bg-[#0B0E14] py-20 md:py-24"
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
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
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
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-[#0066cc] opacity-80">
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


