export type ProjectThemeName =
  | "walkability"
  | "replacement"
  | "bantr"
  | "storm";

type ProjectDefinition = {
  key: string;
  theme: ProjectThemeName;
  title: string;
  subtext: string;
  tag: string;
  image: string;
  route: string;
};

export const replacementTrapProject = {
  key: "replacementTrap",
  theme: "replacement",
  title: "The Replacement Trap",
  subtext:
    "A household appliance model showing which upgrades never repay their cost.",
  tag: "Housing Analytics",
  image: "/assets/thumbs/the-replacement-trap.webp",
  route: "/projects/replacement-trap",
} as const satisfies ProjectDefinition;

export const stormSignalProject = {
  key: "stormSignal",
  theme: "storm",
  title: "Storm Signal",
  subtext:
    "An emergency message routing system using a 4.5 MB machine learning model with sub-100 ms latency.",
  tag: "Machine Learning",
  image: "/assets/thumbs/storm-signal.webp",
  route: "/projects/signal-storm",
} as const satisfies ProjectDefinition;

export const walkabilityIndexProject = {
  key: "walkabilityIndex",
  theme: "walkability",
  title: "Walkability Index",
  subtext: "A walkability analysis app for neighborhood-scale comparisons.",
  tag: "Geospatial Analysis",
  image: "/assets/thumbs/walkability-index-map-shot.webp",
  route: "/projects/walkability-index",
} as const satisfies ProjectDefinition;

export const bantrProject = {
  key: "bantr",
  theme: "bantr",
  title: "Bantr",
  subtext: "A mobile-first platform for creativity-driven conversation games.",
  tag: "Full-Stack Engineering",
  image: "/assets/thumbs/bantr-landing-page.webp",
  route: "/projects/bantr",
} as const satisfies ProjectDefinition;

export const selectedWorkProjects = [
  replacementTrapProject,
  stormSignalProject,
  walkabilityIndexProject,
  bantrProject,
] as const;

export type ProjectKey = (typeof selectedWorkProjects)[number]["key"];
export type SelectedWorkProject = (typeof selectedWorkProjects)[number];

const selectedWorkProjectsByRoute = new Map<string, SelectedWorkProject>(
  selectedWorkProjects.map((project) => [project.route, project])
);

/** Returns the selected-work project for the current route, if one exists. */
export function getSelectedWorkProjectByRoute(
  route: string
): SelectedWorkProject | undefined {
  return selectedWorkProjectsByRoute.get(route);
}

/** Returns the next selected-work project, wrapping to the first item. */
export function getNextSelectedWorkProject(
  projectKey: ProjectKey
): SelectedWorkProject {
  const currentIndex = selectedWorkProjects.findIndex(
    (project) => project.key === projectKey
  );

  if (currentIndex === -1) {
    throw new Error(`Unknown selected work project key: ${projectKey}`);
  }

  return selectedWorkProjects[(currentIndex + 1) % selectedWorkProjects.length];
}
