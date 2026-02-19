import type { ReactNode } from "react";
import { cn } from "@/app/components/ui/utils";

type CaseStudySurfaceTone = "meta" | "content" | "highlight";

type CaseStudySectionCardProps = {
  kicker: string;
  title: string;
  children: ReactNode;
  className?: string;
  kickerClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  tone?: CaseStudySurfaceTone;
};

const SURFACE_STYLES: Record<CaseStudySurfaceTone, string> = {
  meta: "bg-[var(--surface-meta-bg)] border-[color:var(--surface-border-subtle)]",
  content:
    "bg-[var(--surface-content-bg)] border-[color:var(--surface-border-default)]",
  highlight:
    "bg-[var(--surface-highlight-bg)] border-[color:var(--surface-border-emphasis)]",
};

export function CaseStudySectionCard({
  kicker,
  title,
  children,
  className,
  kickerClassName,
  titleClassName,
  bodyClassName,
  tone = "content",
}: CaseStudySectionCardProps) {
  return (
    <article
      className={cn(
        "rounded-md border p-6 md:p-7",
        SURFACE_STYLES[tone],
        className
      )}
    >
      <header className="mb-4">
        <div
          className={cn(
            "font-mono text-[11px] uppercase tracking-widest text-[var(--project-accent-text)]",
            kickerClassName
          )}
        >
          {kicker}
        </div>
        <h2
          className={cn(
            "mt-2 text-xl font-bold tracking-tight text-white",
            titleClassName
          )}
        >
          {title}
        </h2>
      </header>
      <div className={cn("space-y-4 text-[var(--project-body-text)]", bodyClassName)}>
        {children}
      </div>
    </article>
  );
}
