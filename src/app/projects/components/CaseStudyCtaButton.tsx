import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

type CaseStudyCtaVariant = "primary" | "secondary";

export type CaseStudyCtaButtonProps = {
  label: string;
  href: string;
  icon?: ReactNode;
  variant?: CaseStudyCtaVariant;
  className?: string;
  target?: "_blank" | "_self";
  showArrow?: boolean;
};

const CTA_VARIANT_STYLES: Record<CaseStudyCtaVariant, string> = {
  primary:
    "border border-[color:var(--project-accent-border)] bg-[var(--project-accent-strong)] text-[var(--project-accent-on)] hover:border-[color:var(--project-accent)] hover:bg-[var(--project-accent)]",
  secondary:
    "border border-[color:var(--surface-border-default)] bg-[var(--surface-content-bg)] text-[var(--project-body-text)] hover:border-[color:var(--surface-border-emphasis)] hover:bg-[var(--surface-highlight-bg)]",
};

export function CaseStudyCtaButton({
  label,
  href,
  icon,
  variant = "secondary",
  className,
  target = "_blank",
  showArrow = true,
}: CaseStudyCtaButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2.5 rounded-md px-5 text-sm font-medium leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        CTA_VARIANT_STYLES[variant],
        className
      )}
    >
      {icon}
      <span>{label}</span>
      {showArrow ? <ArrowRight className="h-4 w-4 opacity-75" /> : null}
    </a>
  );
}
