---
title: "Jekyll to React Migration Plan"
date: "2026-02-12"
status: "archived"
session_type: "plan"
priority: "high"
tags: ["migration", "react", "jekyll", "github-pages", "archived"]
archived_date: "2026-07-28"
canonical_record: "docs/dev_notes/2026-02-12.md"
---

# Jekyll to React Migration Plan

> **ARCHIVED — do not treat as active work.**  
> This was the working checklist for the Feb 2026 Jekyll → React migration (`react-overhaul` / PR #11). The migration is complete; the site is React/Vite.  
> **Canonical historical write-up:** [`docs/dev_notes/2026-02-12.md`](../../dev_notes/2026-02-12.md).  
> Unchecked boxes below (especially “post-deploy production verification”) are stale leftovers from migration day — not open tasks. Do not resume this plan or re-run Commit 1–3 steps.

## Context

The portfolio site at grantgeist.com was migrated from Jekyll 4.3.0 (Bootstrap 3 + jQuery) to a React/Vite SPA exported from Figma Make. This document was the execution checklist during that migration; it is retained only for historical reference.

Branch context: `react-overhaul` (merged)

GitHub Pages context: user site root deploy (no Vite base path, no React Router basename).

## Current Status (Updated 2026-07-28)

- **Archived.** Migration complete; see `docs/dev_notes/2026-02-12.md`.
- Commit 1: Done and locally verified.
- Commit 2: Done (workflow shipped; production is live React).
- Commit 3: Done (Jekyll infrastructure removed, docs rewritten).
- Follow-up: Linting restored (`npm run lint` now configured and passing).

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

**Status:** ✅ Complete

### Phase 1: Move React source to repo root ✅

- [x] 1. Move files from `_vendor/` to root
- [x] 2. Create merged root `package.json`
- [x] 3. Create `tsconfig.json`
- [x] 4. Create `public/` static assets and preserve deploy-critical files
- [x] Asset path correction: flattened `public/assets/rhino/rhino/*` to `public/assets/rhino/*`

### Phase 2: Fix React app issues ✅

- [x] 5. Fix `src/app/components/ui/sonner.tsx` (remove `next-themes`, force dark theme)
- [x] 6. Add `<Toaster />` in `src/app/App.tsx`
- [x] 7. Update `index.html` metadata

### Phase 3: SPA routing for GitHub Pages ✅

- [x] 8. Create `public/404.html` redirect handler
- [x] 9. Add decoder script in `index.html`

### Phase 4: Add Vitest test harness ✅

- [x] 10. Configure Vitest in `vite.config.ts`
- [x] 11. Create `src/test/setup.ts`
- [x] 12. Add smoke tests for home route, project routes, and WorkWithMe submission handler
- [x] Test setup hardening: added jsdom compatibility setup (`@testing-library/jest-dom/vitest`, cleanup, `IntersectionObserver` mock)

### Phase 5: Update dev tooling ✅

- [x] 13. Update `script/dev` to Vite
- [x] 14. Update `script/verify` to Node/Vite verification
- [x] 15. Update `.git/hooks/pre-commit` to use `npm run build`
- [x] 16. Update `.verify.yml` to Node/Vite steps
- [x] 17. Update `.gitignore`
- [x] 18. Delete old `.eslintrc.json` and `.stylelintrc.json`

### Commit 1 gate: npm install + npm run build must succeed ✅

- [x] Run `npm install` to generate `package-lock.json`
- [x] Run `npm run build`
- [x] Inspect `dist/` for required files (`index.html`, `404.html`, `CNAME`, `favicon.ico`, `robots.txt`, assets)
- [x] Run `npm run preview` and verify all 5 routes return 200
- [x] Run `npm run test` (6 tests passing)

---

## Commit 2: GitHub Actions deployment

**Status:** 🟡 Local implementation complete; remote validation pending

- [x] 19. Create `.github/workflows/deploy.yml`
  - Includes: push to `main` and `react-overhaul`, PR to `main`, `workflow_dispatch`
  - Permissions, concurrency, Node 20 setup, `npm ci`, `npx tsc --noEmit`, non-blocking `npm run test:ci`, `npm run build`, pages artifact upload, deploy on `main` push only
- [x] 20. Delete `.github/workflows/verify.yml`
- [ ] 21. Validate deployment remotely
  - [x] Temporarily include `react-overhaul` in push trigger
  - [ ] Push and run `workflow_dispatch` / confirm GitHub build job in Actions UI
  - [ ] Merge to `main` and set Pages source to GitHub Actions in repo settings
  - [ ] Tighten push trigger to `main` only after production confirmation

### Commit 2 gate

- [ ] Workflow build job passes on GitHub for `react-overhaul`
- [ ] Deploy succeeds from `main`

---

## Commit 3: Delete Jekyll infrastructure

**Status:** ✅ Complete (local)

- [x] 22. Delete Jekyll directories
  - `_posts/`, `_includes/`, `_layouts/`, `_sass/`, `_data/`, `_plugins/`
  - `js/`, `css/`, `mail/`, `img/`
- [x] 23. Delete Jekyll files
  - `_config.yml`, `Gemfile`, `Gemfile.lock`, `Rakefile`, `style.css`, `feed.xml`
- [x] 24. Delete `_vendor/`
- [x] 25. Delete legacy root `assets/` (preserved needed files in `public/assets/`)

### Phase 6: Update documentation ✅

- [x] 26. Rewrite `CLAUDE.md` for React architecture, commands, deployment, and testing

---

## Follow-up Completed (Post-plan)

- [x] Restored linting workflow for React/Tailwind stack:
  - Added npm scripts: `lint`, `lint:js`, `lint:css`, `lint:fix`
  - Added `eslint.config.mjs`
  - Added `stylelint.config.mjs` (Tailwind v4 compatible)
  - Added lint dev dependencies in `package.json`
  - Verified: `npm run lint` passes

---

## Key files to modify/create

| Action | File | Status |
|--------|------|--------|
| Create | `package.json` (merged), `tsconfig.json`, `vite.config.ts`, `postcss.config.mjs` | ✅ Done |
| Create | `public/CNAME`, `public/404.html`, `public/favicon.ico`, `public/robots.txt` | ✅ Done |
| Create | `public/assets/og/og-default.jpg`, `public/assets/rhino/`, `public/assets/risd_capstone.pdf` | ✅ Done |
| Create | `.github/workflows/deploy.yml` | ✅ Done (local) |
| Create | `src/test/setup.ts`, smoke test files | ✅ Done |
| Modify | `index.html` (metadata + SPA redirect script) | ✅ Done |
| Modify | `src/app/components/ui/sonner.tsx` | ✅ Done |
| Modify | `src/app/App.tsx` | ✅ Done |
| Modify | `vite.config.ts` (vitest config) | ✅ Done |
| Modify | `script/dev`, `script/verify`, `.gitignore`, `.verify.yml` | ✅ Done |
| Modify | `.git/hooks/pre-commit` | ✅ Done |
| Rewrite | `CLAUDE.md` | ✅ Done |
| Delete | `_vendor/`, `_posts/`, `_includes/`, `_layouts/`, `_sass/`, `_data/`, `_plugins/`, `js/`, `css/`, `mail/`, `img/`, `assets/` | ✅ Done |
| Delete | `_config.yml`, `Gemfile`, `Gemfile.lock`, `Rakefile`, `style.css`, `feed.xml`, `.eslintrc.json`, `.stylelintrc.json` | ✅ Done |
| Delete | `.github/workflows/verify.yml` | ✅ Done |

---

## Verification

### All 5 routes

- `/` (home)
- `/projects/walkability-index`
- `/projects/replacement-trap`
- `/projects/bantr`
- `/projects/signal-storm`

### Local verification (completed)

1. [x] `npx tsc --noEmit` passes
2. [x] `npm run build` passes
3. [x] `dist/` contains required root files and assets
4. [x] `npm run preview` route checks return HTTP 200 for all 5 routes
5. [x] `npm run test` passes (6/6)
6. [x] `npm run lint` passes

### Post-deploy production verification (stale — not open work)

> Left unchecked at archival time. Production has long been the React site; do not treat these as remaining tasks.

7. [ ] Home route renders correctly at `https://grantgeist.com`
8. [ ] Deep-link in fresh incognito window: `https://grantgeist.com/projects/bantr`
9. [ ] Hard refresh on project route
10. [ ] Direct URL paste external-entry behavior
11. [ ] Form toast behavior in production
12. [ ] Mobile responsiveness on device
13. [ ] No console errors in production
14. [ ] `http://grantgeist.com` redirects to `https://grantgeist.com`
15. [ ] `www.grantgeist.com` behavior matches DNS intent
