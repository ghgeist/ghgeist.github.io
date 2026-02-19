---
description: File and directory naming conventions by context (React, assets, docs)
alwaysApply: true
---

# File and Directory Naming

Use naming that matches the ecosystem and existing codebase. Conventions differ by context.

## React / TypeScript (src/app/)

### Component and page files

- **PascalCase** for React components and project pages: `Hero.tsx`, `WalkabilityIndex.tsx`, `ErrorBoundary.tsx`, `App.tsx`
- **kebab-case** acceptable for UI primitives (e.g. shadcn-style): `toggle-group.tsx`, `scroll-area.tsx`, `alert-dialog.tsx`
- **lowercase** used in this repo for a few components (e.g. `footer.tsx`); prefer PascalCase for new components

### Other source files

- **camelCase** or **kebab-case** for hooks, utils, non-component modules: `use-mobile.ts`, `utils.ts`
- **lowercase** for config/entry when conventional: `main.tsx`, `setup.ts`

### Directories under src/

- **camelCase** or **lowercase** to match ecosystem: `app/`, `components/`, `projects/`, `styles/`, `test/`

## Static assets and public files

### public/ and asset paths

- **snake_case** for image and asset filenames: `embodied_ai_compressed.gltf`, `og-default.jpg`
- **Version suffixes**: `header_v2.jpg`, `header_v3.jpg`
- **Thumbnails**: `project_name_thumbnail.png` (same base name as full image)
- **Directories**: lowercase or snake_case: `assets/rhino/compressed/`, `assets/og/`

### Docs and content

- **snake_case** for doc directories and non-date-prefixed files: `dev_notes/`, `session-management-best-practices.md`
- **Date-prefixed sessions**: `YYYY-MM-DD-[type]-[description].md` with snake_case description, e.g. `2026-02-12-refactor-portfolio-grid.md`

## What to avoid

- **Don’t mix conventions within the same layer**: e.g. don’t add `ContactMe.tsx` next to `footer.tsx` if the rest of the folder is PascalCase; prefer `Footer.tsx` or match existing style
- **Don’t rename third-party or generated files** (e.g. in `node_modules/` or lockfiles); only apply conventions to files you create or own
- **Don’t use PascalCase for non-component files** (e.g. utils, hooks) unless the project already does

## Consistency

- **Match existing files** in the same directory when adding new ones
- **Be descriptive**: `WalkabilityIndex.tsx` over `Project1.tsx`; `embodied_ai_thumbnail.png` over `thumb1.png`
- **Stick to one convention per file type** in a given folder

## Quick reference

| Context              | Convention   | Examples                                      |
|----------------------|-------------|-----------------------------------------------|
| React components     | PascalCase  | `App.tsx`, `Hero.tsx`, `WalkabilityIndex.tsx`  |
| UI primitives        | kebab-case  | `toggle-group.tsx`, `scroll-area.tsx`         |
| Hooks / utils        | camelCase or kebab | `use-mobile.ts`, `utils.ts`              |
| Asset filenames      | snake_case  | `embodied_ai.png`, `header_v2.jpg`            |
| Doc/session filenames| snake_case or date | `dev_notes/`, `2026-02-12-refactor.md`   |
| Directories          | lowercase / snake_case | `src/app/`, `public/assets/rhino/`   |
