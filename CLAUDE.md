# CLAUDE.md

This file provides guidance for agents working in this repository.

## Project Overview

This is a React 18 + Vite 6 + Tailwind CSS v4 single-page portfolio app deployed as a GitHub Pages user site at `grantgeist.com`.

- Root deploy (no `base` in `vite.config.ts`)
- BrowserRouter routes (no React Router basename)
- GitHub Pages deep-link support via `public/404.html` + redirect decoder in `index.html`

## Commands

### Development
```bash
npm run dev
# or
./script/dev
```

### Verification
```bash
npm ci
npx tsc --noEmit
npm run test:ci
npm run build
# or
./script/verify
```

### Preview production build
```bash
npm run preview
```

## Architecture

### Entry point and routing
- Entry point: `src/main.tsx`
- App shell + routes: `src/app/App.tsx`
- Router: `BrowserRouter`
- Routes:
  - `/`
  - `/projects/walkability-index`
  - `/projects/replacement-trap`
  - `/projects/bantr`
  - `/projects/signal-storm`

### Component structure
- Shared sections/components: `src/app/components/`
- Project detail pages: `src/app/projects/`
- UI primitives: `src/app/components/ui/` (Radix-based)
- Global styles: `src/styles/`

### Styling
- Tailwind v4 + PostCSS pipeline
- Theme and utility styles in `src/styles/theme.css`, `src/styles/index.css`, `src/styles/tailwind.css`
- Design direction and system guidance: `guidelines/Guidelines.md`

## Content Model

Project content is route-component based.

- Each project is implemented as a React component in `src/app/projects/`
- Additions require:
  - New component file in `src/app/projects/`
  - Route registration in `src/app/App.tsx`
  - Any card/link surface updates in homepage components

## Testing

Vitest smoke tests live in `src/test/`.

- Setup: `src/test/setup.ts`
- Main suite: `src/test/smoke.test.tsx`
- Run with `npm run test` (or `npm run test:ci` in CI)

## Deployment

GitHub Actions workflow: `.github/workflows/deploy.yml`

Build job:
1. `npm ci`
2. `npx tsc --noEmit`
3. `npm run test:ci`
4. `npm run build`
5. Upload `dist/` artifact

Deploy job:
- Runs only on push to `main`
- Uses `actions/deploy-pages@v4`

Static deploy-critical files:
- `public/CNAME`
- `public/404.html`
- `public/favicon.ico`
- `public/robots.txt`

## Conventions

- Keep edits small and targeted.
- Do not change dependency versions unless requested.
- Preserve root-deploy assumptions (no base path/basename).
- If SPA routing behavior changes, update both `public/404.html` and `index.html` decoder logic together.

## Related Documentation

- **`.cursor/rules/QUICK_START.mdc`** – Quick reference guide for common tasks (start here!)
- **`.cursor/rules/`** – Focused, scoped rules for components, design, workflow, and naming conventions
- **`AGENTS.md`** – Environment constraints, verification model, and agent behavior guidance
- **`.verify.yml`** – Single source of truth for verification steps
- **`README.md`** – User-facing project documentation
