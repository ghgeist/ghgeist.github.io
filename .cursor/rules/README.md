# Cursor Rules for Portfolio Site

Focused, scoped rules for this **React 18 + Vite 6 + Tailwind CSS v4** portfolio. Activation modes keep always-on context small; task-specific rules attach by glob or agent relevance.

## Activation matrix

| File | Mode | When it loads |
|------|------|---------------|
| `file-naming.mdc` | Always Apply | Every chat |
| `design-tokens-and-layout.mdc` | Globs | `src/app/projects/**/*.tsx`, `src/app/components/**/*.tsx` |
| `design-components-and-pages.mdc` | Globs | Same as above |
| `react-structure.mdc` | Globs | `src/app/**/*`, `src/styles/**/*`, `vite.config.*`, `index.html` |
| `asset-management.mdc` | Globs | `public/**/*`, CSS/image assets under `src/` |
| `typescript-best-practices.mdc` | Globs | `**/*.ts`, `**/*.tsx` |
| `iteration-workflow.mdc` | Agent Requested | When verifying, committing, linting, or fixing build/type errors |

Canonical overview and verification live in `CLAUDE.md`, `AGENTS.md`, and `.verify.yml` — rules point there instead of duplicating command lists.

## Task → documentation map

### Add a new project page
→ `CLAUDE.md` (Content Model) + `react-structure.mdc`  
→ Example: `src/app/projects/StormSignal.tsx`  
→ Naming: `file-naming.mdc` (PascalCase components)

### Style a component
→ `design-tokens-and-layout.mdc` + `design-components-and-pages.mdc`  
→ `guidelines/Guidelines.md`

### Add an image or asset
→ `asset-management.mdc` + `file-naming.mdc` (snake_case assets)

### Verify changes
→ `AGENTS.md` + `iteration-workflow.mdc`  
→ Run `./script/verify` or steps in `.verify.yml`

### Fix a build/type error
→ `AGENTS.md` + `iteration-workflow.mdc` + `typescript-best-practices.mdc`  
→ `npx tsc --noEmit`, `npm run build`

### Understand app structure
→ `CLAUDE.md` + `react-structure.mdc`  
→ `src/app/App.tsx`, `src/app/components/`

## Rule files (detail)

### `design-tokens-and-layout.mdc`
- Containers, color palette, typography, spacing

### `design-components-and-pages.mdc`
- SectionHeading, Card, Stat Card, CTA, motion, section order

### `react-structure.mdc`
- Components, routes, content model, app architecture

### `iteration-workflow.mdc`
- When to run full vs light verification; SPA routing sync notes

### `file-naming.mdc`
- PascalCase components, kebab UI primitives, snake_case assets/docs

### `asset-management.mdc`
- `public/` layout, references, optimization

### `typescript-best-practices.mdc`
- Repo-specific TS patterns (props, `import type`, `lazyWithRetry`)

## Philosophy

- **Focused** – One concern per rule file
- **Lean always-on** – Only hard naming conventions are Always Apply
- **Aligned** – Match stack and `.verify.yml`; point to `CLAUDE.md` / `AGENTS.md` for commands
- **Practical** – Concrete examples; no Jekyll/Liquid references

## Related documentation

- **`CLAUDE.md`** – Project overview, commands, architecture
- **`AGENTS.md`** – Environment constraints and agent behavior
- **`.verify.yml`** – Verification steps (npm ci, tsc, test, build)
- **`README.md`** (repo root) – User-facing project documentation

## Updating rules

1. Prefer globs or Agent Requested over Always Apply
2. Keep each rule under ~500 lines; aim much shorter for always-on
3. Point at canonical docs instead of copying command tables
4. Use concrete examples from this repo
5. Do not reference Jekyll, `_posts`, `_includes`, or Liquid
