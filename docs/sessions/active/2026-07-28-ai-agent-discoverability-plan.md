# Make grantgeist.com legible to AI agents (prerender + metadata)

## Status (2026-07-28)

| PR | Scope | Status |
|----|-------|--------|
| 1 | Discovery files (`sitemap.xml`, `llms.txt`, `siteRoutes`, drift test) | **Merged** (#27) |
| 2 | Per-route document metadata | **Merged** (#28) |
| 3 | Prerender script | **Merged** (#29) |
| 4 | Wire prerender into CI / verify contract | **Merged** (#30) |
| 5 | Retire SPA redirect hack | **In progress** on `feat/retire-spa-redirect-404` → open as #31 |


---

## Context

The site is a pure client-side-rendered SPA. `index.html` ships `<div id="root"></div>` and nothing else, so anything that reads HTML without executing JavaScript — most AI agent fetch tools, social preview scrapers, `curl`-based lookups — sees zero body text and zero `<a href>` links on every route. Additionally, before PR 2 all six routes served the identical `<title>`/description/OG block from `index.html`; there was no `document.title` management, no canonical tag, and no JSON-LD anywhere in `src/`.

Goal: every route returns real, self-describing HTML on a no-JS fetch. Approach chosen by the user: snapshot the built SPA with Playwright (already a devDependency; used by `script/prerender.js` after PR 3) as an explicit post-build step (`npm run build:static`, not a `postbuild` hook). GitHub Pages serves the resulting static files natively — no host change, no framework migration.

Deliberately rejected: an Astro migration (multi-week rewrite of working, tested code for six routes), `react-snap` (unmaintained since 2020, breaks on React 18 `createRoot`), and a `react-dom/server` refactor (requires restructuring routing and misses post-effect DOM).

## Constraints that shape the design

These were verified against the repo and drive several non-obvious choices:

- **`tsconfig.json` is `include: ["src"]`, and `@types/node` is not installed.** A script outside `src/` is not typechecked and cannot be `.ts` without adding a dependency — which `AGENTS.md:52-54` forbids unrequested. Same constraint blocked `node:fs` in the PR 1 drift test (see below).
- **ESLint is a CI gate** (`eslint . --max-warnings=0`) and grants `globals.node` only to `files: ["**/*.{ts,tsx,js,jsx}"]` ([eslint.config.mjs:14-21](eslint.config.mjs#L14-L21)). A `.mjs` script using `process`/`fs` would fail `no-undef`; a `.js` script gets Node globals free and is an ES module via `"type": "module"`. **So the prerender script must be `.js`.**
- **Tests run before build** in `script/verify` (and therefore CI). A Vitest test asserting on `dist/` output would pass vacuously on a clean checkout. The prerender script must therefore self-assert and exit non-zero; PR 4 also adds a post-write `assert:prerendered` gate.
- **`vite preview` serves extensionless paths from the pristine `dist/index.html`** (sirv runs with `extensions: []`), so prerendering is naturally idempotent per project route. `/` is the exception since we overwrite `dist/index.html` — needs an explicit guard.
- `public/robots.txt` advertises `/sitemap.xml`. **PR 1 added `public/sitemap.xml`** (and removed the dead root `robots.txt`). Live 404 clears once that branch deploys.
- Every indexable route now has exactly one `<h1>` (PR 2 promoted About's heading). Hero + CaseStudyHero remain the other `h1` sources.

---

## PR 1 — Discovery files: `sitemap.xml`, `llms.txt`, dead-file cleanup ✅

Smallest, zero-risk, fixes a live 404. Ships first and independently.

**Branch:** `feat/discovery-files-sitemap-llms` → merged via #27.

**Added**
- `public/sitemap.xml` — six `<loc>` entries, absolute `https://grantgeist.com` URLs. No `<lastmod>` (keeps builds reproducible; the field is optional).
- `public/llms.txt` — markdown index per [llmstxt.org](https://llmstxt.org): site summary, Pages + Selected Work sections, one line per route with title link and (for projects) `subtext` as the one-line description.
- `src/app/content/siteRoutes.ts` — canonical route list: static routes (`/`, `/about`) plus the four project routes derived from `selectedWorkProjects`. Exports `siteRoutes` (`{ path, title }` only) and `SITE_URL`. **Intentionally no `description` field** — SEO copy stays for PR 2's `routeMetadata` / `metaDescription`, so the registry does not bake in Hero `subtext` as meta copy.
- `src/test/discovery-files.test.ts` — drift test via Vite `?raw` imports of `public/sitemap.xml` and `public/llms.txt`. Asserts every `siteRoutes` URL appears in both files (llms.txt as `[title](url)`), every project's `title` + `subtext` appear on its llms.txt line, and neither file lists a grantgeist.com route absent from the registry.

**Deleted**
- `robots.txt` at repo root — never served, since Vite only copies `public/`.

**Deviations from the original PR 1 sketch**
- Drift test uses `*?raw` instead of `node:fs`: `tsconfig` has `types: ["vite/client"]` only; importing `node:fs` fails `tsc` without adding `@types/node`.
- Test file is `.ts` (no JSX), not `.tsx`.
- `siteRoutes` is path+title only after review — thinner than first draft, cleaner handoff to PR 2.

**Verify (done):** `npx tsc --noEmit && npm run lint:js && npm run test:ci && npm run build`; confirmed `dist/sitemap.xml` and `dist/llms.txt` exist.

**Risk:** Near zero. Note honestly that `llms.txt` is a speculative convention with no confirmed major consumer; it's included because it's nearly free and directly on-goal.

---

## PR 2 — Per-route document metadata ✅

Valuable standalone (Google executes JS, so this improves real SEO immediately) **and** a prerequisite: the Playwright snapshot in PR 3 captures whatever this hook writes to `<head>`.

**Branch:** `feat/per-route-document-metadata` → merged via #28.

**Added**
- `src/app/content/routeMetadata.ts` — `TITLE_SUFFIX`, `DEFAULT_OG_IMAGE`, exported `absoluteUrl()`, `type RouteMeta = { path, title, description, ogType, ogImage, jsonLd }`, project entries derived from `selectedWorkProjects`, and `getRouteMeta(pathname): RouteMeta` with an unknown-path fallback.
- `src/app/components/DocumentMeta.tsx` — named export, returns `null`, `useLocation()`, single `useEffect` with deps `[location.pathname]`. Mirrors the existing route-effect pattern in [RouteScrollManager.tsx](src/app/components/RouteScrollManager.tsx). Imports `absoluteUrl` / `getRouteMeta` from `routeMetadata` (no duplicated URL helper).
- `src/test/document-meta.test.tsx` — asserts home head tags / JSON-LD / OG+Twitter image URLs, project routes use `DEFAULT_OG_IMAGE` (JPG, not webp thumbs), and exactly one canonical across two successive project navigations.
- `public/assets/og/og-default.jpg` — real 1200×630 branded JPG (replaced a 0-byte placeholder). Matches site palette: `#0B0E14` background, Hero-style 40px grid, small `#0066cc` accent dot only, white / gray-300 / mono copy.

**Modified**
- [selectedWorkProjects.ts](src/app/projects/content/selectedWorkProjects.ts) — add **optional** `metaDescription?: string` to `ProjectDefinition`. Drafted ~140–150 char descriptions from each case-study's `framing` prose. Leaves the existing `subtext` field untouched — it renders in the Hero card grid and shouldn't be repurposed.
- [App.tsx](src/app/App.tsx) — mount `<DocumentMeta />` beside `<RouteScrollManager />`, inside `BrowserRouter`, outside `Routes`.
- [About.tsx](src/app/components/About.tsx) — `<h2>About</h2>` → `<h1>`. Gives every route exactly one `h1`, which PR 3 asserts on. Existing `app-routing.test.tsx` queries by name without level, so it still passes.
- [index.html](index.html) — delete the `og:*` and `twitter:*` blocks so `DocumentMeta` is sole owner. Keep `<title>` and `<meta name="description">` as pre-JS defaults.

**Core approach — tag ownership.** This is the one detail to get right, since the effect reruns on every client-side navigation:
- `<title>`: assign `document.title`.
- `meta[name="description"]`: update in place (it exists in `index.html`); create if absent.
- canonical, `og:*`, `twitter:*`, JSON-LD `<script>`: every managed node carries `data-managed-meta`. Each run removes all `[data-managed-meta]` nodes first, then reinserts. Prevents duplicate accumulation across navigations and across prerender re-runs.

JSON-LD: `Person` + `WebSite` on `/`, `Person` on `/about`, `CreativeWork` + `BreadcrumbList` on project pages. CreativeWork `image` and all route `ogImage` / `twitter:image` values use `DEFAULT_OG_IMAGE` until dedicated per-project OG assets exist (webp card thumbs are unreliable for social scrapers).

**Post-implementation review fixes (same branch)**
- Replaced empty `og-default.jpg` with a real asset matching Guidelines palette (no large accent fills).
- Stopped pointing `og:image` at project `.webp` thumbnails.
- Deduplicated `absoluteUrl` into a single export from `routeMetadata.ts`.

**Known residual (closes when PR 4 deploys to main)**
- Until #30 merges and Pages deploys, production still serves pre-prerender HTML — no-JS social scrapers miss OG tags on first paint (static `og:*` removed from `index.html` by design). Google executes JS; prerendered snapshots close the gap once #30 lands on `main`.
- Unknown paths reuse home title/description with a pathname-specific canonical; PR 5's real 404 should add `noindex` + distinct copy.

**Verify (done):** `npx tsc --noEmit && npm run lint:js && npm run test:ci` (document-meta + full suite green after review fixes).

**Risk:** Low. Worst case is wrong copy. The duplicate-tag bug was the review focus and is covered by the successive-navigation test.

---

## PR 3 — The prerender script ✅

Ships alone, changes nothing in production until PR 4. All the risk lives here, isolated.

**Branch:** `feat/prerender-script` → merged via #29.

**Added**
- `script/prerender.js` — sits beside the existing `script/dev` and `script/verify`.
- `public/assets/noise.svg` — local fractal-noise texture (replaces a dead third-party Hero URL that 404'd and would fail strict console checks).
- `src/test/local-assets.test.ts` — drift test: noise SVG exists (`?raw`) and Hero references `/assets/noise.svg`, not an external host.

**Modified**
- `package.json` — add `"prerender": "node script/prerender.js"` and `"build:static": "npm run build && npm run prerender"` (PR 4 later appends `assert:prerendered`). No dependency changes.
- [Hero.tsx](src/app/components/Hero.tsx) — card overlay `bg-[url('/assets/noise.svg')]`.

**Deliberately not a `postbuild` hook:** that would require Chromium binaries for every local `npm run build`, slow the documented fast inner loop, and break the restricted-network agent sandbox contract in `AGENTS.md:9-11`.

**Route list — no hardcoding.** The script parses `dist/sitemap.xml` (a regex over `<loc>` elements; no XML parser dependency), derives `siteOrigin` from the first `<loc>`, and strips origins to get pathnames. Chain of custody: registry → PR 1's drift test → `sitemap.xml` → prerender. No second list to forget; no hardcoded `https://grantgeist.com` in the script.

**Serving `dist/`:** import Vite's programmatic `preview()` rather than spawning `vite preview` — no cross-platform process kill, and `server.resolvedUrls.local[0]` gives the real port. Pass `configFile: false` so it doesn't boot the Tailwind/React plugins for a static file server, and pin `preview.host` to `127.0.0.1` (the repo sets `server.host: '0.0.0.0'`, which preview would otherwise inherit).

**Wait ladder per route** — `waitUntil: 'load'`, never `networkidle` (About still loads remote Unsplash images; a slow third party would hang the build). Each step has a 30s timeout and fails as `${pathname}: timed out waiting for …`:
1. `#root` has children — React mounted.
2. Exactly one non-empty `<h1>` is attached — the real Suspense-completion signal, since all non-home routes are `lazy()`.
3. `link[rel=canonical][data-managed-meta]` present — proves `DocumentMeta` ran. Home title matches the `index.html` default by design, so title alone is not a signal.
4. Scroll pass through full page height, then back to top, to trigger every `whileInView` and let the Navbar's scroll state settle.

Browser context uses `reducedMotion: 'reduce'` and a 1280×900 viewport. That first setting matters: [CaseStudyFlowDiagram.tsx:135-137](src/app/projects/components/CaseStudyFlowDiagram.tsx#L135-L137) short-circuits to a plain `div` under reduced motion, which eliminates the only `opacity: 0` initial state in the app. No component conditionally *renders* on in-view state — everything animates but is present in the DOM — so no content can be missing from the snapshot.

**Fail-loud assertions, evaluated before anything is written:** exactly one non-empty `h1`; no `"Loading..."` (Suspense fallback); no `"Something went wrong while loading this page."` (ErrorBoundary fallback); `body.innerText.length >= 800`; at least four internal `a[href^="/"]`; canonical matches `${siteOrigin}${path}`; description 50–200 chars; `script[type="module"]` survives; zero `pageerror` and zero `console.error`. Chromium launch failures suggest `npx playwright install chromium`. Cross-route: **all titles must be distinct**.

Results buffer in a `Map` and write only after **all** routes pass. Output is directory-form (`/projects/bantr` → `dist/projects/bantr/index.html`) via `page.content()`, with `data-prerendered` on `<html>` — also the idempotency guard against re-running on already-prerendered `dist/index.html`. `finally` closes browser and server, then `process.exit(code)`.

`createRoot` in [main.tsx](src/main.tsx) stays as-is. React discards the prerendered DOM and re-renders on mount. `hydrateRoot` would be wrong against a post-effects snapshot.

**Deviations / review hardening (same PR)**
- First draft filtered off-origin resource `console.error`s because Hero's grainy-gradients noise URL 404'd. Fixed properly: local asset + strict console checks.
- Dropped hardcoded `SITE_ORIGIN` / `DEFAULT_TITLE`; origin from sitemap, DocumentMeta wait is canonical-only.
- Wait/launch errors are route- and step-labeled.

**Verify (done):** `npm run lint:js && npm run test:ci` (including `local-assets`) && `npm run build:static`; preview fetch of `/projects/bantr/` shows real `<h1>Bantr`, prose, canonical, JSON-LD, internal links; re-running `npm run prerender` without rebuild exits non-zero on the `data-prerendered` guard.

**Risk:** Highest-complexity PR, but zero production impact until PR 4. Review focus: wait ladder, idempotency guard, `close()` ordering.

**Next:** merge #30, then PR 5 (retire SPA redirect) after live curl checks.

---

## PR 4 — Wire into CI and update the verification contract ✅

**Branch:** `feat/wire-prerender-ci` → merged via #30.

**Goal:** ship prerendered HTML in the Pages artifact, and stop hand-duplicating the verify pipeline across three files.

**Added**
- `script/assert-prerendered.js` + `npm run assert:prerendered` — parses `dist/sitemap.xml`, asserts every route’s directory-form HTML exists under `dist/` and carries `data-prerendered`. Fail-loud for CI / `build:static`.

**Modified**
- [deploy.yml](.github/workflows/deploy.yml) — after `npm ci`, run `bash script/verify --skip-install`, then upload artifact. No duplicated typecheck/lint/test/build/prerender steps in the workflow. `CI=true` makes the script install Chromium with `--with-deps`.
- `script/verify` — single executable pipeline for local + CI; supports `--skip-install`; Chromium / prerender / assert steps included.
- `package.json` — `build:static` is now `build && prerender && assert:prerendered`.
- `.verify.yml` — documents the contract and points at `./script/verify` as the implementation (`implementation:` field; CI note for `--skip-install`).
- `README.md`, `CLAUDE.md`, `AGENTS.md`, `.cursor/rules/iteration-workflow.mdc`, `CONTRIBUTING.md` — document shared pipeline, `build:static`, Chromium prerequisite, and that adding a route updates the registry *and* `public/sitemap.xml` / `llms.txt`.

**Deviations / review hardening (same PR)**
- First pass duplicated Chromium + prerender into `deploy.yml`, `.verify.yml`, and `script/verify`. Follow-up collapsed CI onto `script/verify --skip-install` so steps cannot drift.
- Added automated artifact gate (`assert:prerendered`) instead of relying on manual Actions log inspection alone.
- Updated user-facing `README.md` (was still describing the pre-prerender verify/CI story, including an incorrect “tests non-blocking” claim).

Skip Playwright browser caching for now — a stale cache key is a confusing failure mode, and it's an optimization for after the pipeline is proven.

**Verify (done on #30 Actions + live):** build job ~1m20s; `script/verify --skip-install` prerendered 6 routes; `assert:prerendered` passed. After merge to `main`, live curl confirmed all six routes return `data-prerendered` HTML with unique titles and matching canonicals; `sitemap.xml` resolves 200.

**Risk:** First production deploy of prerendered HTML. Mitigated by the PR run proving the pipeline pre-merge; live smoke cleared the gate for PR 5.

**Next:** PR 5 (retire SPA redirect).

---

## PR 5 — Retire the SPA redirect hack (must land last)

**Branch:** `feat/retire-spa-redirect-404`

Every route in this app is a literal — no dynamic params — so once six real files exist, the `sessionStorage` redirect serves *only* genuinely unknown paths, where bouncing to home is a textbook soft 404 that Google flags and that makes a typo'd URL indistinguishable from the homepage.

**Modified**
- [public/404.html](public/404.html) — replace the redirect script with a real static page: `<h1>Page not found</h1>`, `<meta name="robots" content="noindex">`, Montserrat via Google Fonts, links to `/`, `/about`, and the four projects. Inline `<style>` only, since `public/` files bypass the Tailwind bundle.
- [index.html](index.html) — delete the decoder script. Keep `<title>` / description / favicon as pre-JS defaults.
- `NotFound` catch-all route + unknown-path `DocumentMeta` (`noindex` + distinct title/description) so in-SPA unknown URLs match the static 404 behavior.
- `src/test/not-found-page.test.ts` — drift guard: no `sessionStorage` redirect, `noindex`, font load, every `siteRoutes` path/title linked.
- `CLAUDE.md`, `.cursor/rules/iteration-workflow.mdc` — replace the redirect-decoder convention with the prerender-based model. Also aligned `README.md`, `asset-management.mdc`, and `react-structure.mdc`.

**Verify — on the live site, not locally.** `vite preview` does not emulate GitHub Pages' extensionless→directory 301. After PR 4 deploys: `curl -sL https://grantgeist.com/projects/bantr` and the other five routes, confirming real HTML with no JS; then fetch a bogus path and confirm a genuine 404 with links and no redirect.

**Risk:** Highest of the five. If any prerendered file is missing, that deep link degrades from "works via redirect" to "hard 404." Gated by PR 3's all-or-nothing write and live verification of all six routes before merge.

---

## End-to-end verification

After PR 4 deploys, the acceptance test for the whole effort:

```bash
for r in / /about /projects/bantr /projects/signal-storm \
         /projects/walkability-index /projects/replacement-trap; do
  curl -sL "https://grantgeist.com$r" | grep -c '<h1'
done
```

Every route should return real prose, a unique `<title>`, a matching `<link rel=canonical>`, JSON-LD, and internal `<a href>` links — with JavaScript never executing. `https://grantgeist.com/sitemap.xml` should resolve instead of 404.

## Explicitly not doing

- **A Vitest test on `dist/` prerender output** — vacuous, since tests run before build. The script's own assertions are strictly better.
- **`postbuild`** — breaks agent sandboxes, slows the fast inner loop.
- **`@playwright/test` + a config file** — we need one script, not a test runner; adding it is an unrequested dependency change.
- **`@types/node` or a second tsconfig** to write the script in TypeScript — a dependency change for a ~200-line script.
- **Flat `dist/<route>.html` siblings** — would break the pristine-`index.html` idempotency property. One GitHub Pages 301 is cheaper.
- **`hydrateRoot`** — guaranteed hydration mismatch against a post-effects snapshot, which degrades to full client render anyway. Pure downside.
- **`<MotionConfig reducedMotion="user">`** in App — a real a11y win and it would make prerender fully static, but it's an app behavior change unrelated to this effort.
