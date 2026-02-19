# Project Page Authoring Checklist

Use this checklist when creating or refactoring `src/app/projects/*` pages.

## Required Before Merge

1. Theme token contract
- If the page uses `CaseStudyHero`, ensure the page root includes theme vars.
- Prefer `ProjectPageShell`.
- If not using `ProjectPageShell`, root must include `project-theme` and a variant class when defined (for example, `project-theme--replacement`).

2. Shared primitives first
- Reuse `CaseStudyStatCard` for metric tiles.
- Reuse `CaseStudySectionHeading` for section headings.
- Reuse `CaseStudyFlowDiagram` for architecture/process lane diagrams.
- Do not duplicate these primitives inline unless there is a true one-off requirement.

3. Typography and metadata floor
- Metadata text must be 11px minimum on mobile.
- Applies to lane indices, connector labels, kicker labels, and compact status text.

4. Motion accessibility
- Motion reveals must respect reduced-motion preferences.
- In reduced-motion mode, content should render without translate animations.

5. Verification
- TS/JS changes: `npm run lint:js`
- CSS changes: `npm run lint:css`
- Then run: `npx tsc --noEmit` and `npm run build`

## Recommended QA Pass

1. Desktop + mobile visual check for section rhythm.
2. Verify hero back-link remains readable over background layers.
3. Confirm CTA sizing and hover behavior match shared anatomy.
4. Check architecture diagrams at mobile width for connector readability.
