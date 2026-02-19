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
    "border border-blue-500/35 bg-blue-600 text-white hover:border-blue-400/50 hover:bg-blue-500",
  secondary:
    "border border-white/12 bg-white/5 text-gray-100 hover:border-white/24 hover:bg-white/10",
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
        "inline-flex items-center justify-center gap-2.5 rounded-md px-5 py-2.5 text-sm font-medium leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
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
