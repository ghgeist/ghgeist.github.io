# Contributing

This project is optimized for small, targeted changes with strong local verification.

## Before You Start

- Read `CLAUDE.md` for architecture and route/content conventions.
- Read `AGENTS.md` for environment constraints and verification expectations.
- Use `.verify.yml` as the source of truth for required checks.
- Review focused guidance in `.cursor/rules/`.

## Development Workflow

1. Create a focused branch.
2. Make the smallest change that solves the problem.
3. Run local verification:
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run test:ci`
   - `npm run build`
4. Open a PR with a concise summary and test notes.

If you cannot run bash scripts in your shell, run the npm commands directly instead of `./script/*`.

## Project Page Authoring Pattern

When editing pages in `src/app/projects/`:

- Prefer `ProjectPageShell` for page-level theme tokens and structure.
- Reuse shared primitives from `src/app/projects/components/`:
  - `CaseStudyHero`
  - `CaseStudySectionHeading`
  - `CaseStudySectionCard`
  - `CaseStudyFlowDiagram`
  - `CaseStudyStatCard`
  - `CaseStudyCtaButton`
- Keep large static data (arrays, metrics, card content, constants) in `src/app/projects/content/` and import into page components.
- Keep visuals stable unless a design change is explicitly intended.

## Naming and File Conventions

- Follow conventions in `.cursor/rules/file-naming.mdc`.
- Match nearby files in the same folder for style and naming consistency.

## Verification Checklist (Pre-PR)

- No TypeScript errors.
- No lint errors.
- Tests pass.
- Production build succeeds.
- No unintended design regressions on key routes.

## Helpful References

- `README.md`
- `docs/dev_notes/README.md`
- `docs/design_system/README.md`
- `docs/design_system/project_page_authoring_checklist.md`
