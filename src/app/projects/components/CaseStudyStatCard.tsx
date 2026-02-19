import { cn } from "@/app/components/ui/utils";

type CaseStudyStatCardProps = {
  label: string;
  value: string;
  subtext: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  subtextClassName?: string;
};

export function CaseStudyStatCard({
  label,
  value,
  subtext,
  className,
  labelClassName,
  valueClassName,
  subtextClassName,
}: CaseStudyStatCardProps) {
  return (
    <div className={cn("rounded-sm border border-white/5 bg-[#151921] p-4 md:p-5", className)}>
      <div className={cn("mb-1 font-mono text-xs uppercase tracking-wider text-gray-500", labelClassName)}>
        {label}
      </div>
      <div className={cn("mb-1 text-xl font-bold text-white md:text-2xl", valueClassName)}>
        {value}
      </div>
      <div className={cn("text-sm text-gray-400", subtextClassName)}>{subtext}</div>
    </div>
  );
}
