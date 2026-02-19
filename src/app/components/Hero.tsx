import React from "react";
import { motion as Motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Link } from "react-router-dom";

const evidenceItems = [
  {
    title: "The Replacement Trap",
    subtext:
      "System dynamics model for housing lifecycle economics.",
    tag: "HOUSING / MODELING",
    image:
      "https://images.unsplash.com/photo-1736858405207-fa4dca877d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5ldHdvcmslMjBncmFwaCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MDcxNTgzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/projects/replacement-trap",
  },
  {
    title: "Storm Signal",
    subtext:
      "Critical response ML pipeline with 1000x model-size reduction.",
    tag: "ML / SYSTEMS",
    image:
      "https://images.unsplash.com/photo-1741795990529-7e5666272dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc3RyZWFtJTIwbWF0cml4JTIwYmx1ZSUyMGRhcmt8ZW58MXx8fHwxNzcwNzE1ODM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/projects/signal-storm",
  },
  {
    title: "Walkability Index",
    subtext:
      "Geospatial data product for urban systems analysis.",
    tag: "GEO / URBANISM",
    image:
      "https://images.unsplash.com/photo-1542382257-80dedb725088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwbmlnaHQlMjBhZXJpYWx8ZW58MXx8fHwxNzcwNzE1ODM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/projects/walkability-index",
  },
  {
    title: "Bantr",
    subtext:
      "Full-stack rapid prototype using AI-enabled engineering.",
    tag: "FULL-STACK / AI",
    image:
      "https://images.unsplash.com/photo-1724166573009-4634b974ebb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzY3JlZW4lMjByZWFjdCUyMHNvZnR3YXJlJTIwZGFya3xlbnwxfHx8fDE3NzA3MTU4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/projects/bantr",
  },
];

export function Hero() {
  return (
    <header
      id="page-top"
      className="relative min-h-fit flex items-start bg-[#0B0E14] pb-16 md:pb-20"
    >
      {/* Technical Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0B0E14]/20 to-[#0B0E14]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 md:pt-28 lg:px-8">
        <Motion.div
          initial={{ opacity: 0.95, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl mx-auto md:mx-0"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-[1.1] text-white tracking-tight">
              Data Product Strategist
            </h1>

            <div className="mb-10 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
              <span className="block md:inline">
                I design and build applied data systems for complex, regulated, real-world environments
              </span>
            </div>
          </div>

          {/* Evidence Framework Header */}
          <div className="w-full max-w-5xl mt-12 mb-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#0066cc] rounded-full" />
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">
                Selected Case Studies
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-gray-600 font-mono">
              Index 01 — 04
            </span>
          </div>

          {/* Evidence Framework Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            {/* Add a tiny metadata label just above the border for extra 'Instrument' flavor */}

            {evidenceItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-[#151921] transition-all duration-300 hover:border-white/20"
              >
                {/* Technical Mini (Image) */}
                <div className="h-24 w-full relative overflow-hidden bg-black/50">
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-gray-500 font-mono">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-snug line-clamp-3">
                    {item.subtext}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Motion.div>
      </div>
    </header>
  );
}
