import type { ReactNode } from "react";
import { cn } from "@/app/components/ui/utils";

type CaseStudyPillProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function CaseStudyPill({
  icon,
  title,
  description,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: CaseStudyPillProps) {
  return (
    <div className={cn("flex gap-3 border border-white/10 bg-black/20 p-4", className)}>
      {icon ? <div className={cn("mt-0.5 text-blue-400", iconClassName)}>{icon}</div> : null}
      <div>
        <div className={cn("text-sm font-semibold text-white", titleClassName)}>{title}</div>
        <div
          className={cn(
            "mt-1 text-sm leading-relaxed text-gray-400",
            descriptionClassName
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
