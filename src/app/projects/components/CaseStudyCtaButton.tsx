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
    "bg-blue-600 text-white border border-blue-500/30 hover:bg-blue-500 hover:border-blue-400/50",
  secondary:
    "bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20",
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
        "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-all",
        CTA_VARIANT_STYLES[variant],
        className
      )}
    >
      {icon}
      <span>{label}</span>
      {showArrow ? <ArrowRight className="h-4 w-4 opacity-70" /> : null}
    </a>
  );
}
