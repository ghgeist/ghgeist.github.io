export type RatioBenchmark = {
  label: string;
  ratio: number;
  note: string;
};

export const heroImageSrc = "/assets/the-replacement-trap.png";

export const dishwashersBenchmarks: RatioBenchmark[] = [
  { label: "Standard", ratio: 0.191, note: "Baseline replacement option." },
  { label: "Premium", ratio: 0.2, note: "Mid-tier efficiency." },
  { label: "Energy Star", ratio: 0.275, note: "Highest efficiency tier." },
];

export const waterHeatersBenchmarks: RatioBenchmark[] = [
  { label: "Standard", ratio: 0.206, note: "Structural loss under base case." },
  { label: "Premium", ratio: 0.529, note: "Mid-tier efficiency upgrade." },
  { label: "Energy Star (heatpump)", ratio: 2.51, note: "Exceeds repayment threshold." },
];

export const airConditionersBenchmarks: RatioBenchmark[] = [
  { label: "Standard", ratio: 0.06, note: "Replacement far shorter than payback." },
  { label: "Premium", ratio: 0.217, note: "Mid-tier efficiency upgrade." },
  { label: "Energy Star", ratio: 0.51, note: "Higher efficiency, still below threshold." },
];

// Match StormSignal model chart colors for cross-page chart consistency.
export const CHART_LOSS = {
  bar: "bg-rose-400/70",
  label: "text-rose-300/95",
} as const;

export const CHART_SURVIVAL = {
  bar: "bg-emerald-400/70",
  label: "text-emerald-300/90",
} as const;
