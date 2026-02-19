import type { ReactNode } from "react";
import { cn } from "@/app/components/ui/utils";

type CaseStudySectionCardProps = {
  kicker: string;
  title: string;
  children: ReactNode;
  className?: string;
  kickerClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
};

export function CaseStudySectionCard({
  kicker,
  title,
  children,
  className,
  kickerClassName,
  titleClassName,
  bodyClassName,
}: CaseStudySectionCardProps) {
  return (
    <article className={cn("border border-white/5 bg-[#151921] p-6", className)}>
      <header className="mb-4">
        <div
          className={cn(
            "font-mono text-xs uppercase tracking-widest text-blue-400",
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
      <div className={cn("space-y-4", bodyClassName)}>{children}</div>
    </article>
  );
}
