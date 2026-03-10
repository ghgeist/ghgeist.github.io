type SiteNavLink = {
  name: string;
  to: string;
  variant: "link" | "cta";
};

export const selectedWorkNavHref = "/#page-top";
export const selectedWorkLabel = "Selected Work";
export const backToSelectedWorkLabel = `Back to ${selectedWorkLabel}`;
export const nextProjectLabel = "Next Project";

export const siteNavLinks: readonly SiteNavLink[] = [
  { name: selectedWorkLabel, to: selectedWorkNavHref, variant: "link" },
  { name: "Approach", to: "/#skills", variant: "link" },
  { name: "About", to: "/about", variant: "link" },
  { name: "Work with me", to: "/#work-with-me", variant: "cta" },
] as const;
