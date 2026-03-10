import { motion as Motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { selectedWorkLabel } from "@/app/content/siteNavigation";
import { Link } from "react-router-dom";
import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";

export function Hero() {
  return (
    <header
      id="page-top"
      className="relative min-h-fit scroll-mt-28 flex items-start bg-[#0B0E14] md:scroll-mt-32"
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
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16 md:pt-28 md:pb-20 lg:px-8">
        <Motion.div
          initial={{ opacity: 0.95, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl mx-auto md:mx-0"
        >
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-[1.1] text-white tracking-tight">
              Hi, I&apos;m Grant.
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-300 max-w-xl">
              I create models, tools, and production-grade systems that help organizations navigate complex, regulated environments.
            </p>
          </div>

          {/* Evidence Framework Header */}
          <div className="mt-12 mb-4 flex w-full max-w-5xl items-center justify-between border-t border-white/5 pt-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#0066cc] rounded-full" />
              <span className="text-sm uppercase tracking-[0.12em] text-gray-300/80 font-mono">
                {selectedWorkLabel}
              </span>
            </div>
            <span className="text-sm uppercase tracking-[0.12em] text-gray-400/80 font-mono">
                Index 01 — {String(selectedWorkProjects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Evidence Framework Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            {/* Add a tiny metadata label just above the border for extra 'Instrument' flavor */}

            {selectedWorkProjects.map((item) => (
              <Link
                key={item.key}
                to={item.route}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-[#151921] transition-all duration-300 hover:border-white/20"
              >
                {/* Technical Mini (Image) */}
                <div className="h-24 w-full relative overflow-hidden bg-black/50">
                  <div className="absolute inset-0 opacity-75 group-hover:opacity-100 transition-[opacity,filter] duration-500 group-hover:brightness-110">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      lazy={true}
                    />
                  </div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs uppercase tracking-[0.12em] text-gray-300/80 font-mono">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300/80 leading-snug line-clamp-3">
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
