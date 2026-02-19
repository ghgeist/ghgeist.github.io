# Design Language Contract

This document defines what should stay consistent everywhere and what can vary by page.

## System Goal

- Keep a cohesive portfolio language across Home + project pages.
- Preserve each project's personality through accent and content choices.
- Make future refactors safe by giving agents a strict mechanical baseline.

## Fixed Mechanics (Cross-Site)

These are not page-specific and should remain consistent.

## Typography Roles

- `display`: Hero title only.
  - Desktop: 56-64
  - Mobile: 44-48
- `section_title`: Section heading.
  - Desktop: 34-36
  - Mobile: 30-32
- `body`: Paragraph copy.
  - Desktop: 18
  - Mobile: 16
- `meta`: Kicker/labels/stat captions.
  - Desktop: 12
  - Mobile: 11 minimum

Rules:

- Avoid 10px metadata on mobile.
- Use uppercase mono for short labels only.
- Prefer one contrast step higher for metadata than current minimum if over gradients/images.

## Spacing Tiers

- `hero`: Largest spacing for top intro and hero media.
- `default`: Main section rhythm.
- `compact`: Dense cards/stats/cta groups.

Rules:

- Every section chooses one tier.
- Avoid one-off spacing jumps between adjacent sections.
- Home cadence should align with project cadence even if Home remains slightly more open.

## CTA Anatomy

- Shared height and padding across navbar/menu and project CTAs.
- Shared radius and border-opacity ladder.
- Shared icon slot sizing and icon/text gap.
- Shared hover delta (one step for border/fill).

Rules:

- Per-page accent hue can vary.
- CTA structure cannot vary.

## Surface Roles

- `surface_meta`: Small status/stat cards.
- `surface_content`: Narrative and section cards.
- `surface_highlight`: Callouts, summaries, and section endpoints.

Rules:

- Keep role depth consistent using border and fill intensity.
- Keep radius/border model consistent.

## Motion Rules

- Core content reveal: subtle translate and mild opacity shift.
- Decorative elements may use stronger movement.
- Use one timing scale (`fast`, `base`, `slow`) and one easing family.
- Reduced-motion mode: no translate; content should remain immediately readable.

## Variable Identity (Per Project)

These can vary to keep personality:

- Accent hue family (`storm` blue, `walkability` teal, `replacement` amber, `bantr` rose).
- Hero imagery.
- Project-specific callouts and narrative emphasis.
- One optional project motif/background treatment.

## Current Alignment Notes

- Storm Signal is the dense systems baseline.
- Home should align in cadence, typography floors, and CTA mechanics.
- Replacement Trap needs deeper layout iteration next, but with this contract as guardrails.

## Implementation Touchpoints

- Home components:
  - `src/app/components/Hero.tsx`
  - `src/app/components/Approach.tsx`
  - `src/app/components/About.tsx`
  - `src/app/components/WorkWithMe.tsx`
  - `src/app/components/Navbar.tsx`
- Project shared components:
  - `src/app/projects/components/CaseStudyHero.tsx`
  - `src/app/projects/components/CaseStudyCtaButton.tsx`
  - `src/app/projects/components/CaseStudySectionCard.tsx`
  - `src/app/projects/components/CaseStudyPill.tsx`

## Change Rule

If a proposed design change modifies a fixed mechanic, update this file in the same PR with:

1. What changed.
2. Why it changed.
3. Which pages/components are impacted.
