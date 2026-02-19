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
        "relative overflow-hidden border-b border-[color:var(--surface-border-subtle)]",
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
          "relative mx-auto w-full max-w-6xl px-6 pb-12 pt-24 md:pt-28 lg:px-8",
          containerClassName
        )}
      >
        <Motion.div
          initial={{ opacity: 0.95, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn("max-w-6xl", contentClassName)}
        >
          <div className={cn("mb-8", topRowClassName)}>
            <Link
              to={backTo}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium text-[var(--project-meta-text)] transition-colors hover:text-white",
                backLinkClassName
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight text-white md:text-6xl",
                  titleClassName
                )}
              >
                {title}
              </h1>

              <div
                className={cn(
                  "mt-6 max-w-3xl text-base leading-relaxed text-[var(--project-body-text)] md:text-lg",
                  framingClassName
                )}
              >
                {framing}
              </div>

              {ctas ? (
                <div className={cn("mt-8 flex flex-wrap items-center gap-4", ctasClassName)}>
                  {ctas}
                </div>
              ) : null}
            </div>

            <div
              className={cn(
                "mt-2 overflow-hidden rounded-md border border-[color:var(--surface-border-default)] bg-[var(--surface-meta-bg)] lg:mt-0",
                mediaClassName
              )}
            >
              {media}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
