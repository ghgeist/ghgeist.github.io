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
./script/verify
# or (after npm ci, same pipeline CI uses):
bash script/verify --skip-install
```

For a production-like static snapshot without the full verify pipeline:
```bash
npm run build:static   # build + prerender + assert:prerendered (requires Playwright Chromium)
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
  - `/about`
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
- Canonical route list: `src/app/content/siteRoutes.ts` (feeds sitemap / prerender via `public/sitemap.xml`)
- Additions require:
  - New component file in `src/app/projects/`
  - Route registration in `src/app/App.tsx`
  - Entry in `siteRoutes` / `selectedWorkProjects` as appropriate
  - Updates to `public/sitemap.xml` and `public/llms.txt` (drift-tested)
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
2. `bash script/verify --skip-install` (typecheck, lint, test, build, Chromium, prerender, assert prerendered)
3. Upload `dist/` artifact

Deploy job:
- Runs only on push to `main`
- Uses `actions/deploy-pages@v4`

Static deploy-critical files:
- `public/CNAME`
- `public/404.html`
- `public/favicon.ico`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`

## Conventions

- Keep edits small and targeted.
- Do not change dependency versions unless requested.
- Preserve root-deploy assumptions (no base path/basename).
- If SPA routing behavior changes, update both `public/404.html` and `index.html` decoder logic together.
- Prefer `npm run build` for the fast inner loop; use `npm run build:static` (or `./script/verify`) when you need prerendered HTML. Prerender requires Playwright Chromium (`npx playwright install chromium`).
- Adding a route: update the `siteRoutes` registry **and** `public/sitemap.xml` (and `llms.txt`). Prerender reads routes from `dist/sitemap.xml` — no hardcoded route list in the script.
- Verification pipeline lives in `./script/verify`; `.github/workflows/deploy.yml` calls it — do not duplicate steps in the workflow.

## Related Documentation

- **`.cursor/rules/`** – Scoped rules (naming always-on; design/React/assets by glob; workflow on demand). See `.cursor/rules/README.md` for the task → doc map
- **`AGENTS.md`** – Environment constraints, verification model, and agent behavior guidance
- **`.verify.yml`** – Single source of truth for verification steps
- **`README.md`** – User-facing project documentation
