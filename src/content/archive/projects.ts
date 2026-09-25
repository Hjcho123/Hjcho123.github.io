export type Project = {
  no: string;
  slug: string;
  title: string;
  detail: string;
  year: string;
  field: string;
};

export const archivedProjects: Project[] = [
  {
    no: "01",
    slug: "empirical-asset-pricing",
    title: "Empirical Asset Pricing using Deep Learning — Independent Research Project",
    detail: "Models and experiments for understanding markets, signals, and uncertainty.",
    year: "2025—",
    field: "quantitative trading",
  },
  {
    no: "02",
    slug: "learning-machines",
    title: "Learning machines",
    detail: "Small implementations that make deep-learning concepts tangible.",
    year: "2025—",
    field: "machine learning",
  },
  {
    no: "03",
    slug: "mathematical-studies",
    title: "Mathematical studies",
    detail: "Visual and computational notes on structures worth investigating.",
    year: "2025—",
    field: "mathematics",
  },
];