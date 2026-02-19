import { Fragment } from "react";
import type { ReactNode } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { cn } from "@/app/components/ui/utils";

export type CaseStudyFlowLane = {
  title: string;
  icon: ReactNode;
  iconColorClassName: string;
  nodes: string[];
  tightSpacing?: boolean;
};

type CaseStudyFlowDiagramProps = {
  lanes: CaseStudyFlowLane[];
  transitions: string[];
  accentTextClassName: string;
  accentBorderClassName: string;
  fallbackFinalOutputLabel: string;
  className?: string;
  gridClassName?: string;
  laneClassName?: string;
};

function FlowNode({ text }: { text: string }) {
  return (
    <div className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-center">
      <p className="text-[13px] leading-snug text-gray-300">{text}</p>
    </div>
  );
}

function FlowLane({
  lane,
  index,
  nextLabel,
  isFinalLane,
  accentTextClassName,
  accentBorderClassName,
  fallbackFinalOutputLabel,
  laneClassName,
}: {
  lane: CaseStudyFlowLane;
  index: number;
  nextLabel?: string;
  isFinalLane: boolean;
  accentTextClassName: string;
  accentBorderClassName: string;
  fallbackFinalOutputLabel: string;
  laneClassName?: string;
}) {
  const laneNumber = String(index + 1).padStart(2, "0");
  const outputLabel = nextLabel ?? (isFinalLane ? fallbackFinalOutputLabel : "");

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col rounded-lg border border-white/10 bg-white/[0.02] p-3.5 sm:min-h-[180px] md:min-h-[170px] md:p-3",
        laneClassName,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2 md:mb-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className={cn("flex-shrink-0", lane.iconColorClassName)}>{lane.icon}</div>
          <h3 className="text-xs font-semibold text-white md:text-sm">{lane.title}</h3>
        </div>
        <span
          className={cn(
            "rounded border px-1.5 py-0.5 font-mono text-[11px]",
            accentTextClassName,
            accentBorderClassName,
          )}
        >
          {laneNumber}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <div
          className={cn(
            "mx-auto w-full max-w-full md:max-w-[240px]",
            lane.tightSpacing ? "space-y-1" : "space-y-2",
          )}
        >
          {lane.nodes.map((node, nodeIndex) => (
            <FlowNode key={nodeIndex} text={node} />
          ))}
        </div>
      </div>

      <div className="mt-2 hidden border-t border-white/10 pt-2 sm:block md:mt-1.5 md:pt-1.5">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[11px]">
          <span className={cn("font-mono uppercase tracking-wide", accentTextClassName)}>Output:</span>
          <span className={accentTextClassName}>{outputLabel}</span>
        </div>
      </div>
    </div>
  );
}

function AnimatedFlowLane({
  lane,
  idx,
  nextLabel,
  accentTextClassName,
  accentBorderClassName,
  fallbackFinalOutputLabel,
  laneClassName,
  isFinalLane,
  shouldReduceMotion,
}: {
  lane: CaseStudyFlowLane;
  idx: number;
  nextLabel?: string;
  accentTextClassName: string;
  accentBorderClassName: string;
  fallbackFinalOutputLabel: string;
  laneClassName?: string;
  isFinalLane: boolean;
  shouldReduceMotion: boolean;
}) {
  const laneContent = (
    <FlowLane
      lane={lane}
      index={idx}
      nextLabel={nextLabel}
      isFinalLane={isFinalLane}
      accentTextClassName={accentTextClassName}
      accentBorderClassName={accentBorderClassName}
      fallbackFinalOutputLabel={fallbackFinalOutputLabel}
      laneClassName={laneClassName}
    />
  );

  if (shouldReduceMotion) {
    return <div className="h-full">{laneContent}</div>;
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: idx * 0.08 }}
      className="h-full"
    >
      {laneContent}
    </Motion.div>
  );
}

function MobileFlowConnector({
  label,
  accentTextClassName,
}: {
  label: string;
  accentTextClassName: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-center text-[11px]">
      <span className={cn("font-mono uppercase tracking-wide", accentTextClassName)}>Output:</span>
      <span className={accentTextClassName}>{label}</span>
    </div>
  );
}

export function CaseStudyFlowDiagram({
  lanes,
  transitions,
  accentTextClassName,
  accentBorderClassName,
  fallbackFinalOutputLabel,
  className,
  gridClassName,
  laneClassName,
}: CaseStudyFlowDiagramProps) {
  const reducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(reducedMotion);

  return (
    <div className={cn("relative", className)}>
      <div className="relative hidden sm:block">
        <div
          className={cn(
            "relative grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3 lg:grid-cols-4",
            gridClassName,
          )}
        >
          {lanes.map((lane, idx) => (
            <AnimatedFlowLane
              key={idx}
              lane={lane}
              idx={idx}
              nextLabel={transitions[idx]}
              accentTextClassName={accentTextClassName}
              accentBorderClassName={accentBorderClassName}
              fallbackFinalOutputLabel={fallbackFinalOutputLabel}
              laneClassName={laneClassName}
              isFinalLane={idx === lanes.length - 1}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>

      <div className="relative sm:hidden">
        <div className="space-y-2">
          {lanes.map((lane, idx) => (
            <Fragment key={idx}>
              <AnimatedFlowLane
                lane={lane}
                idx={idx}
                nextLabel={transitions[idx]}
                accentTextClassName={accentTextClassName}
                accentBorderClassName={accentBorderClassName}
                fallbackFinalOutputLabel={fallbackFinalOutputLabel}
                laneClassName={laneClassName}
                isFinalLane={idx === lanes.length - 1}
                shouldReduceMotion={shouldReduceMotion}
              />
              {idx < transitions.length ? (
                <MobileFlowConnector
                  label={transitions[idx]}
                  accentTextClassName={accentTextClassName}
                />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
