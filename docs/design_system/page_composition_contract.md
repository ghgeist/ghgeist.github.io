# Page Composition Contract

This file documents composition expectations for Home and project pages.

It standardizes structure without flattening page personality.

## Home Page Contract

Primary sections (high-level):

1. Hero introduction.
2. Project preview and navigation context.
3. Method/approach narrative.
4. About and credibility context.
5. Contact/work-with-me endpoint.

Composition rules:

- Keep section cadence tied to `hero/default/compact` spacing tiers.
- Ensure transitions between major sections do not create dead zones.
- Keep metadata readable on mobile (11-12px floor).
- Reuse CTA anatomy contract for primary menu and section actions.

## Project Page Contract

Primary sections (high-level):

1. Back-link + hero framing.
2. Core framing/context block.
3. Supporting cards/modules (metrics, process, architecture, outcomes).
4. CTA/next-step endpoint.
5. Return navigation.

Composition rules:

- Back-link treatment should use the shared hero preset.
- Section cards should map cleanly to `surface_meta`, `surface_content`, or `surface_highlight`.
- CTA pair semantics should remain consistent across projects.
- Type roles should be stable regardless of accent theme.

## Page-Specific Notes

- `src/app/projects/StormSignal.tsx`
  - Keep structure mostly intact as dense systems reference.
  - Apply only targeted mechanical alignment updates if needed.
- `src/app/projects/ReplacementTrap.tsx`
  - Structural layout iteration is expected next.
  - Keep copy and project personality intact while improving rhythm and modular clarity.
- `src/app/projects/WalkabilityIndex.tsx` and `src/app/projects/Bantr.tsx`
  - Maintain tokenized surfaces and CTA mechanics.
  - Prioritize readability and spacing continuity on mobile.

## Non-Goals

- No forced uniform page architecture.
- No removal of project-specific narrative or visual identity.
- No dependency/config churn for visual-only work.
