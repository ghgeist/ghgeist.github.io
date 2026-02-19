import { cn } from "@/app/components/ui/utils";

type CaseStudySectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function CaseStudySectionHeading({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: CaseStudySectionHeadingProps) {
  return (
    <div className={cn("mb-6 md:mb-8", className)}>
      <h2 className={cn("text-2xl font-bold tracking-tight text-white md:text-3xl", titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-3 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg", subtitleClassName)}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
