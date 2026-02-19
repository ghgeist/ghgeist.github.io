import type { ReactNode } from "react";
import { motion as Motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/app/components/ui/utils";

type CaseStudyHeroProps = {
  title: string;
  framing: ReactNode;
  media: ReactNode;
  ctas?: ReactNode;
  backTo?: string;
  backLabel?: string;
  background?: ReactNode;
  showDefaultGrid?: boolean;
  sectionClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  topRowClassName?: string;
  backLinkClassName?: string;
  ctasClassName?: string;
  titleClassName?: string;
  framingClassName?: string;
  mediaClassName?: string;
};

export function CaseStudyHero({
  title,
  framing,
  media,
  ctas,
  backTo = "/",
  backLabel = "Back to Case Studies",
  background,
  showDefaultGrid = true,
  sectionClassName,
  containerClassName,
  contentClassName,
  topRowClassName,
  backLinkClassName,
  ctasClassName,
  titleClassName,
  framingClassName,
  mediaClassName,
}: CaseStudyHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/5",
        sectionClassName
      )}
    >
      {showDefaultGrid ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #2b3444 1px, transparent 1px), linear-gradient(to bottom, #2b3444 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      ) : null}
      {background}

      <div
        className={cn(
          "relative mx-auto w-full max-w-6xl px-6 pb-10 pt-20 lg:px-8",
          containerClassName
        )}
      >
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("max-w-5xl", contentClassName)}
        >
          <div
            className={cn(
              "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
              topRowClassName
            )}
          >
            <Link
              to={backTo}
              className={cn(
                "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-white",
                backLinkClassName
              )}
            >
              <ArrowLeft className="h-3 w-3" />
              {backLabel}
            </Link>
            {ctas ? (
              <div
                className={cn(
                  "flex flex-wrap items-center gap-3",
                  ctasClassName
                )}
              >
                {ctas}
              </div>
            ) : null}
          </div>

          <h1
            className={cn(
              "text-4xl font-bold tracking-tight text-white md:text-5xl",
              titleClassName
            )}
          >
            {title}
          </h1>

          <div
            className={cn(
              "mt-4 max-w-3xl font-mono text-lg leading-relaxed text-gray-400",
              framingClassName
            )}
          >
            {framing}
          </div>

          <div
            className={cn(
              "mt-8 overflow-hidden border border-white/10 bg-black/30",
              mediaClassName
            )}
          >
            {media}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
