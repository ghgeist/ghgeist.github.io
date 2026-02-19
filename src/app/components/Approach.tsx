import React from "react";
import { motion as Motion } from "motion/react";
import {
  Map,
  SquareFunction,
  Play,
} from "lucide-react";

const methodology = [
  {
    step: "STEP 01",
    title: "Map the System",
    description:
      "I make the system explicit: actors, incentives, data flows, constraints, ownership boundaries, and failure modes. Ambiguity becomes tractable structure.",
    icon: <Map className="w-5 h-5" />,
  },
  {
    step: "STEP 02",
    title: "Build the Model",
    description:
      "I translate structure into formal models: definitions, lifecycle math, invariants, and measurable assumptions. System behavior becomes testable and falsifiable.",
    icon: <SquareFunction className="w-5 h-5" />,
  },
  {
    step: "STEP 03",
    title: "Create the Prototype",
    description:
      "I use AI-augmented engineering to turn models into operational software. Edge cases surface, logic is validated under constraint, and a working artifact emerges.",
    icon: <Play className="w-5 h-5" />,
  },
];

export function Approach() {
  return (
    <section
      id="skills"
      className="border-t border-white/5 bg-[#0B0E14] py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-5xl mx-auto md:mx-0">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Approach
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
              I use a repeatable approach to turn ambiguous systems into structured models and working prototypes, reducing risk at each step before adding cost at the next
            </p>
          </div>

          {/* Methodology Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {methodology.map((item, index) => (
              <Motion.div
                key={item.step}
                initial={{ opacity: 0.95, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="relative p-6 bg-[#151921] h-full flex flex-col border border-white/5"
              >
                {/* Metadata */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-blue-400">
                    {item.step}
                  </span>
                  <div className="text-blue-400">{item.icon}</div>
                </div>
          
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
          
                {/* Body */}
                <p className="text-gray-400 text-base leading-relaxed">
                  {item.description}
                </p>
              </Motion.div>
            ))}
          </div>

          {/* Terminal Outcome */}
          <div className="mt-12 pt-6 border-t border-white/5">
            <div className="flex items-start gap-3 text-gray-400 font-mono text-base max-w-3xl">
              <p>
                Outcome: A system you can operate against: clear ownership, measurable behavior, explicit assumptions, and a working artifact that withstands real-world constraints
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



