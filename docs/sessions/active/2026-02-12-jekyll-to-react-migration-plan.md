---
title: "Jekyll to React Migration Plan"
date: "2026-02-12"
status: "active"
session_type: "plan"
priority: "high"
tags: ["migration", "react", "jekyll", "github-pages"]
---

# Jekyll to React Migration Plan

## Context

The portfolio site at grantgeist.com currently runs on Jekyll 4.3.0 with Bootstrap 3 and jQuery. A complete React replacement already exists in `_vendor/` (exported from Figma Make) using Vite 6, React 18, Tailwind CSS v4, React Router v7, and Radix UI. This plan moves the React app to the repo root, removes all Jekyll infrastructure, and sets up GitHub Actions deployment.

We're working on the `react-overhaul` branch. This is a GitHub Pages user site (root deploy) — no Vite base path or React Router basename should be set.

### Current Status

**Commit 1 Progress:** ✅ Phases 1-5 complete (all file moves, fixes, tooling updates) | ⏳ Gate pending (`npm install` → `npm run build` → verification)

- All React source files moved to root
- All React app issues fixed (sonner.tsx, Toaster, metadata)
- SPA routing configured (404.html + decoder script)
- Vitest test harness created with smoke tests
- Dev tooling updated (scripts, .verify.yml, .gitignore, pre-commit hook)

**Next Steps:** Run `npm install`, then proceed with build verification and testing.

---

## Commit Boundary Strategy (Rollback Safety)

Migration is performed in 3 commit phases. Do not delete Jekyll before confirming React build + deploy success.

| Commit | Contents | Rollback safety |
|--------|----------|-----------------|
| Commit 1 | Move React to root, fix issues, configure build, add tests | Revert restores Jekyll |
| Commit 2 | Add GitHub Actions workflow, confirm deploy works | Revert restores old workflow |
| Commit 3 | Delete Jekyll infrastructure | Only after production verified |

---

## Commit 1: React app at root + build verified

**Status:** ✅ Phases 1-5 complete | ⏳ Gate pending (blocked on `npm install`)

### Phase 1: Move React source to repo root ✅

- [x] 1. Move files from `_vendor/` to root:
   - `_vendor/src/` → `src/`
   - `_vendor/index.html` → `index.html` (replaces Jekyll's index.html)
   - `_vendor/vite.config.ts` → `vite.config.ts`
   - `_vendor/postcss.config.mjs` → `postcss.config.mjs`
   - `_vendor/guidelines/` → `guidelines/`
   - `_vendor/ATTRIBUTIONS.md` → `ATTRIBUTIONS.md`

- [x] 2. Create new root `package.json` by merging `_vendor/package.json` into root:
   - Rename from `@figma/my-make-file` to `ghgeist-portfolio`
   - Move `react` and `react-dom` from `peerDependencies` to `dependencies`
   - Remove `peerDependenciesMeta` and `pnpm.overrides` sections
   - Remove `next-themes` dependency (see Phase 2)
   - Add `typescript`, `@types/react`, `@types/react-dom` to `devDependencies`
   - Add Vitest deps: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` to `devDependencies`
   - Scripts: `dev`, `build`, `preview`, `typecheck`, `test`, `test:watch`, `test:ci`
   - Ensure all Radix/UI, Tailwind v4, and PostCSS dependencies are preserved from `_vendor/package.json`

- [x] 3. Create `tsconfig.json` (missing from `_vendor/`):
   - Target ES2020, `"jsx": "react-jsx"`, `"moduleResolution": "bundler"`
   - `"types": ["vite/client"]` (prevents subtle Vite build failures)
   - Path alias: `@/*` → `./src/*`

- [x] 4. Create `public/` directory for Vite static assets:
   - `public/CNAME` → `grantgeist.com` (critical for custom domain)
   - `public/favicon.ico` → moved from root
   - `public/robots.txt` → new file
   - `public/assets/og/og-default.jpg` → moved from `assets/og/`
   - `public/assets/rhino/` → moved from `assets/rhino/` (preserve for external links)
   - `public/assets/risd_capstone.pdf` → moved from `assets/` (preserve for external links)

### Phase 2: Fix React app issues ✅

- [x] 5. Fix `src/app/components/ui/sonner.tsx`:
   - Remove `next-themes` import
   - Hardcode `theme="dark"` (site is always dark)
   - Remove `"use client"` directive

- [x] 6. Add `<Toaster />` to `src/app/App.tsx`:
   - Import and render `<Toaster />` so `toast.success()` in WorkWithMe actually displays

- [x] 7. Update `index.html` with proper metadata:
   - Title: "Grant Geist | Data Product Strategist"
   - Meta description, OG tags, Twitter card meta
   - Favicon link
   - SPA redirect handler script (see Phase 3)

### Phase 3: SPA routing for GitHub Pages ✅

- [x] 8. Create `public/404.html` with redirect script:
   - Uses the rafgraph spa-github-pages pattern (snippet inlined below, do not fetch externally)
   - When GitHub Pages serves a 404 for `/projects/bantr`, the script redirects to `/?/projects/bantr`
   - The exact `404.html` and `index.html` decoder snippets are specified in `CLAUDE.md` for reproducibility

- [x] 9. Add redirect decoder script to `index.html` `<head>`:
   - Decodes the `?/path` back to a real path via `history.replaceState` before React mounts

**Fallback strategy:** If SPA routing proves unstable on GitHub Pages, switch to HashRouter (tradeoff: `/#/projects/...` URLs). Alternative hosts (Cloudflare Pages, Netlify, Vercel) eliminate the 404 redirect complexity entirely — this is the clean escape hatch if needed.

### Phase 4: Add Vitest test harness ✅

- [x] 10. Configure Vitest in `vite.config.ts`:
    - `test.environment = "jsdom"`
    - `test.setupFiles = "./src/test/setup.ts"`

- [x] 11. Create `src/test/setup.ts`:
    - Import `@testing-library/jest-dom`

- [x] 12. Add smoke tests:
    - **Home route (router-level):** Mount `<App />` in a MemoryRouter at `/`, assert Hero, Approach, About, WorkWithMe sections render
    - **One representative project route (router-level):** Mount `<App />` in a MemoryRouter at `/projects/walkability-index`, assert the page renders without crashing
    - **Remaining 3 project routes (render-only):** Render each component directly (`<ReplacementTrap />`, `<StormSignal />`, `<Bantr />`), assert no crash — keeps maintenance low
    - **WorkWithMe form:** Submit triggers toast handler (or at least calls the handler)

Initially set the test step to `continue-on-error: true` in CI, then flip to blocking once the suite is stable.

### Phase 5: Update dev tooling ✅

- [x] 13. Update `script/dev`: Replace Jekyll serve with `npm run dev` (Vite on port 5173)
- [x] 14. Update `script/verify`: Replace Jekyll build verification with `npm ci` → `tsc --noEmit` → `npm run build`
- [x] 15. Update `.git/hooks/pre-commit`: Replace `bundle exec rake test:build` with `npm run build`
- [x] 16. Update `.verify.yml`: Rewrite for Node/Vite steps
- [x] 17. Update `.gitignore`: Remove Jekyll entries (`_site/`, `.sass-cache/`, etc.), add `dist/`, keep `node_modules/`
- [x] 18. Delete old linting configs: `.eslintrc.json`, `.stylelintrc.json` (jQuery/SCSS-focused, not useful for React/Tailwind)

### Commit 1 gate: npm install + npm run build must succeed ⏳

**Pending (blocked on npm install):**

- [ ] Run `npm install` to generate fresh `package-lock.json`
- [ ] Run `npm run build` to verify production build
- [ ] Inspect `dist/` to confirm: `index.html`, `404.html`, `CNAME`, `favicon.ico`, `robots.txt`, `assets/` (rhino, og, risd_capstone), JS/CSS bundles
- [ ] Run `npm run preview` and verify all 5 routes, toast notification, responsive layout
- [ ] Run `npm run test` — smoke tests pass

---

## Commit 2: GitHub Actions deployment

19. Create `.github/workflows/deploy.yml`:
    - Triggers on push to `main` and PRs to `main`, plus `workflow_dispatch` (manual trigger for validation)
    - `permissions`: `contents: read`, `pages: write`, `id-token: write`
    - `concurrency`: `group: "pages"`, `cancel-in-progress: false`
    - Build job: checkout → setup Node 20 → `npm ci` → `tsc --noEmit` → test step (`npm run test:ci`, `continue-on-error: true`) → `npm run build` → upload artifact
    - Deploy job: runs only on `main` push, uses `actions/deploy-pages@v4`

20. Delete old `.github/workflows/verify.yml`

21. Validate deployment (lower-risk option):
    - Temporarily add `react-overhaul` to the push trigger branches
    - Push Commit 2 to `react-overhaul`, trigger `workflow_dispatch`, confirm the build job passes end-to-end
    - Then merge to `main` and switch Pages source to "GitHub Actions" in repo Settings > Pages
    - After confirming production deploy, tighten triggers back to `main` only

### Commit 2 gate: workflow build job passes on react-overhaul, then deploys successfully from main

---

## Commit 3: Delete Jekyll infrastructure

22. Delete Jekyll directories:
    - `_posts/`, `_includes/`, `_layouts/`, `_sass/`, `_data/`, `_plugins/`
    - `js/` (agency.js, jQuery, Bootstrap JS, etc.)
    - `css/` (Font Awesome)
    - `mail/` (unused PHP handler)
    - `img/` (React app uses Unsplash, not local images)

23. Delete Jekyll files:
    - `_config.yml`, `Gemfile`, `Gemfile.lock`, `Rakefile`
    - `style.css` (Jekyll layout CSS)
    - `feed.xml`

24. Delete `_vendor/` (all content already moved)

25. Delete `assets/` (all preserved files already moved to `public/`)

### Phase 6: Update documentation

26. Rewrite `CLAUDE.md` for React architecture:
    - Project overview (React 18 + Vite 6 + Tailwind v4 SPA, root deploy, no base path)
    - Commands (`npm run dev/build/preview/test`, `./script/verify`)
    - Architecture (entry point, router, component tree, UI primitives, styling)
    - Content model (projects as route components in `src/app/projects/`)
    - Deployment (GitHub Actions artifact-based, CNAME in `public/`, `404.html` SPA redirect)
    - Conventions (design system → `guidelines/Guidelines.md`)
    - Testing (vitest, smoke tests)

---

## Key files to modify/create

| Action | File | Status |
|--------|------|--------|
| Create | `package.json` (merged), `tsconfig.json`, `vite.config.ts`, `postcss.config.mjs` | ✅ Done |
| Create | `public/CNAME`, `public/404.html`, `public/favicon.ico`, `public/robots.txt` | ✅ Done |
| Create | `public/assets/og/og-default.jpg`, `public/assets/rhino/`, `public/assets/risd_capstone.pdf` | ✅ Done |
| Create | `.github/workflows/deploy.yml` | ⏳ Commit 2 |
| Create | `src/test/setup.ts`, smoke test files | ✅ Done |
| Modify | `index.html` (metadata + SPA redirect script) | ✅ Done |
| Modify | `src/app/components/ui/sonner.tsx` (remove next-themes) | ✅ Done |
| Modify | `src/app/App.tsx` (add Toaster) | ✅ Done |
| Modify | `vite.config.ts` (add vitest config) | ✅ Done |
| Modify | `script/dev`, `script/verify`, `.gitignore`, `.verify.yml` | ✅ Done |
| Modify | `.git/hooks/pre-commit` | ✅ Done |
| Rewrite | `CLAUDE.md` | ⏳ Commit 3 |
| Delete | `_vendor/`, `_posts/`, `_includes/`, `_layouts/`, `_sass/`, `_data/`, `_plugins/`, `js/`, `css/`, `mail/`, `img/`, `assets/` | ⏳ Commit 3 |
| Delete | `_config.yml`, `Gemfile`, `Gemfile.lock`, `Rakefile`, `style.css`, `feed.xml`, `.eslintrc.json`, `.stylelintrc.json` | ✅ `.eslintrc.json`, `.stylelintrc.json` done; others Commit 3 |
| Delete | `.github/workflows/verify.yml` | ⏳ Commit 2 |

---

## Verification

### All 5 routes

- `/` (home: Hero + Approach + About + WorkWithMe)
- `/projects/walkability-index`
- `/projects/replacement-trap`
- `/projects/bantr`
- `/projects/signal-storm`

### Local (before merge)

1. `npm run build` succeeds with no errors
2. Inspect `dist/` — confirm all required root-level files present (CNAME, 404.html, favicon.ico, robots.txt, assets/)
3. `npm run preview` → site loads at `localhost:4173`
4. All 5 routes listed above render correctly
5. Toast notification works on form submit
6. `npm run test` — smoke tests pass

### Post-deploy production (after merge + Pages source switch)

7. Home route renders correctly at grantgeist.com
8. Deep-link in fresh incognito window: `https://grantgeist.com/projects/bantr`
9. Hard refresh on a project route (e.g. `/projects/walkability-index`)
10. Direct URL paste (external entry) to a project route
11. Form toast renders on submit
12. Mobile responsiveness (test from phone)
13. No console errors in production build
14. Custom domain + HTTPS: verify `http://grantgeist.com` redirects to `https://grantgeist.com`
15. www vs apex: verify `www.grantgeist.com` behavior matches DNS configuration
