export type ProjectKey =
  | "replacementTrap"
  | "stormSignal"
  | "walkabilityIndex"
  | "bantr";

export type SelectedWorkProject = {
  key: ProjectKey;
  title: string;
  subtext: string;
  tag: string;
  image: string;
  to: string;
};

export const selectedWorkProjects: SelectedWorkProject[] = [
  {
    key: "replacementTrap",
    title: "The Replacement Trap",
    subtext:
      "A household appliance model showing which upgrades never repay their cost.",
    tag: "Housing Analytics",
    image: "/assets/thumbs/the-replacement-trap.webp",
    to: "/projects/replacement-trap",
  },
  {
    key: "stormSignal",
    title: "Storm Signal",
    subtext:
      "An emergency message routing system using a 4.5 MB machine learning model with sub-100 ms latency.",
    tag: "Machine Learning",
    image: "/assets/thumbs/storm-signal.webp",
    to: "/projects/signal-storm",
  },
  {
    key: "walkabilityIndex",
    title: "Walkability Index",
    subtext: "A walkability analysis app for neighborhood-scale comparisons.",
    tag: "Geospatial Analysis",
    image: "/assets/thumbs/walkability-index-map-shot.webp",
    to: "/projects/walkability-index",
  },
  {
    key: "bantr",
    title: "Bantr",
    subtext:
      "A mobile-first platform for creativity-driven conversation games.",
    tag: "Full-Stack Engineering",
    image: "/assets/thumbs/bantr-landing-page.webp",
    to: "/projects/bantr",
  },
];

/** Returns the next selected-work project, wrapping to the first item. */
export function getNextSelectedWorkProject(
  projectKey: ProjectKey
): SelectedWorkProject {
  const currentIndex = selectedWorkProjects.findIndex(
    (project) => project.key === projectKey
  );

  if (currentIndex === -1) {
    return selectedWorkProjects[0];
  }

  return selectedWorkProjects[(currentIndex + 1) % selectedWorkProjects.length];
}
