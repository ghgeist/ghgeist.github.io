export const architectureTransitions = [
  "Messages",
  "Classifications + Confidence",
  "Prioritized Signals",
];

export type ModelComparison = {
  label: string;
  sizeMB: number;
  color: "red" | "yellow" | "blue" | "green";
};

export const modelComparisons: ModelComparison[] = [
  { label: "Random Forest", sizeMB: 900, color: "red" },
  { label: "LR (unlimited vocabulary)", sizeMB: 67.7, color: "yellow" },
  { label: "LR (with vocabulary filters)", sizeMB: 13.0, color: "blue" },
  { label: "LR (15K features)", sizeMB: 4.5, color: "green" },
];

export const stormStats = [
  {
    label: "Model Size",
    value: "4.5 MB",
    subtext: "Designed for local deployment",
  },
  {
    label: "Inference Latency",
    value: "< 100ms",
    subtext: "Fast local inference",
  },
  {
    label: "Weighted F1",
    value: "92.8%",
    subtext: "Across 36 categories (multi-label)",
  },
];
