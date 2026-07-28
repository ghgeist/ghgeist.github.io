# Make grantgeist.com legible to AI agents (prerender + metadata)

## Context

The site is a pure client-side-rendered SPA. `index.html` ships `<div id="root"></div>` and nothing else, so anything that reads HTML without executing JavaScript — most AI agent fetch tools, social preview scrapers, `curl`-based lookups — sees zero body text and zero `<a href>` links on every route. Additionally, all six routes currently serve the identical `<title>`/description/OG block from `index.html:6-20`; there is no `document.title` management, no canonical tag, and no JSON-LD anywhere in `src/`.

Goal: every route returns real, self-describing HTML on a no-JS fetch. Approach chosen by the user: snapshot the built SPA with Playwright (already a devDependency, currently unused) as a post-build step. GitHub Pages serves the resulting static files natively — no host change, no framework migration.

Deliberately rejected: an Astro migration (multi-week rewrite of working, tested code for six routes), `react-snap` (unmaintained since 2020, breaks on React 18 `createRoot`), and a `react-dom/server` refactor (requires restructuring routing and misses post-effect DOM).

## Constraints that shape the design

These were verified against the repo and drive several non-obvious choices:

- **`tsconfig.json` is `include: ["src"]`, and `@types/node` is not installed.** A script outside `src/` is not typechecked and cannot be `.ts` without adding a dependency — which `AGENTS.md:52-54` forbids unrequested.
- **ESLint is a CI gate** (`eslint . --max-warnings=0`) and grants `globals.node` only to `files: ["**/*.{ts,tsx,js,jsx}"]` ([eslint.config.mjs:14-21](eslint.config.mjs#L14-L21)). A `.mjs` script using `process`/`fs` would fail `no-undef`; a `.js` script gets Node globals free and is an ES module via `"type": "module"`. **So the prerender script must be `.js`.**
- **Tests run before build** in [deploy.yml](.github/workflows/deploy.yml) and `script/verify`. A Vitest test asserting on `dist/` output would pass vacuously on a clean checkout. The prerender script must therefore self-assert and exit non-zero.
- **`vite preview` serves extensionless paths from the pristine `dist/index.html`** (sirv runs with `extensions: []`), so prerendering is naturally idempotent per project route. `/` is the exception since we overwrite `dist/index.html` — needs an explicit guard.
- `public/robots.txt:4` advertises `/sitemap.xml`, which **does not exist**. There is also a stray duplicate [robots.txt](robots.txt) at the repo root that Vite never copies — a dead file.
- Only `Hero.tsx:35` and `CaseStudyHero.tsx:93` render an `<h1>`. [About.tsx:118](src/app/components/About.tsx#L118) renders `<h2>About</h2>`, so `/about` has no `h1`.

---

## PR 1 — Discovery files: `sitemap.xml`, `llms.txt`, dead-file cleanup

Smallest, zero-risk, fixes a live 404. Ships first and independently.

**Added**
- `public/sitemap.xml` — six `<loc>` entries, absolute `https://grantgeist.com` URLs. No `<lastmod>` (keeps builds reproducible; the field is optional).
- `public/llms.txt` — markdown index per [llmstxt.org](https://llmstxt.org): site summary, then one line per project linking its route with the one-line description.
- `src/app/content/siteRoutes.ts` — the canonical route list: static routes (`/`, `/about`) plus the four project routes derived from `selectedWorkProjects`. Exports `siteRoutes` and `SITE_URL`. Becomes the single source of truth consumed by PRs 2 and 3.
- `src/test/discovery-files.test.tsx` — reads `public/sitemap.xml` and `public/llms.txt` from disk via `node:fs` (works fine under the global `jsdom` environment) and asserts every route in `siteRoutes` appears in both, and that neither file lists a route absent from the registry. **This drift test is what makes hand-written static files safe.**

**Deleted**
- `robots.txt` at repo root — never served, since Vite only copies `public/`.

**Verify:** `npm run test:ci && npm run build`, then confirm `dist/sitemap.xml` and `dist/llms.txt` exist.

**Risk:** Near zero. Note honestly that `llms.txt` is a speculative convention with no confirmed major consumer; it's included because it's nearly free and directly on-goal.

---

## PR 2 — Per-route document metadata

Valuable standalone (Google executes JS, so this improves real SEO immediately) **and** a prerequisite: the Playwright snapshot in PR 3 captures whatever this hook writes to `<head>`.

**Added**
- `src/app/content/routeMetadata.ts` — `TITLE_SUFFIX`, `DEFAULT_OG_IMAGE`, `type RouteMeta = { path, title, description, ogType, ogImage, jsonLd }`, project entries derived from `selectedWorkProjects`, and `getRouteMeta(pathname): RouteMeta` with an unknown-path fallback.
- `src/app/components/DocumentMeta.tsx` — named export, returns `null`, `useLocation()`, single `useEffect` with deps `[location.pathname]`. Mirrors the existing route-effect pattern in [RouteScrollManager.tsx](src/app/components/RouteScrollManager.tsx).
- `src/test/document-meta.test.tsx`

**Modified**
- [selectedWorkProjects.ts](src/app/projects/content/selectedWorkProjects.ts) — add **optional** `metaDescription?: string` to `ProjectDefinition`. Because the four literals use `as const satisfies ProjectDefinition` rather than `:`, optional fields need no changes to them. I'll draft 140-160 char descriptions drawing on the richer `framing` prose already inline in each case-study page (e.g. StormSignal's "disaster-response monitoring dashboard that routes high-volume messages into actionable categories"). Leaves the existing `subtext` field untouched — it renders in the Hero card grid and shouldn't be repurposed.
- [App.tsx:127](src/app/App.tsx#L127) — mount `<DocumentMeta />` beside `<RouteScrollManager />`, inside `BrowserRouter`, outside `Routes`.
- [About.tsx:118](src/app/components/About.tsx#L118) — `<h2>About</h2>` → `<h1>`. Gives every route exactly one `h1`, which PR 3 asserts on. Existing `app-routing.test.tsx:26` queries by name without level, so it still passes.
- [index.html](index.html) — delete the `og:*` and `twitter:*` blocks so `DocumentMeta` is sole owner. Keep `<title>` and `<meta name="description">` as pre-JS defaults.

**Core approach — tag ownership.** This is the one detail to get right, since the effect reruns on every client-side navigation:
- `<title>`: assign `document.title`.
- `meta[name="description"]`: update in place (it exists in `index.html`); create if absent.
- canonical, `og:*`, `twitter:*`, JSON-LD `<script>`: every managed node carries `data-managed-meta`. Each run removes all `[data-managed-meta]` nodes first, then reinserts. Prevents duplicate accumulation across navigations and across prerender re-runs.

JSON-LD: `Person` + `WebSite` on `/`, `Person` on `/about`, `CreativeWork` + `BreadcrumbList` on project pages.

**Verify:** `npx tsc --noEmit && npm run lint && npm run test:ci`, then `npm run dev` and check `<head>` on each route — including a client-side nav between two projects, asserting exactly one canonical tag. The test must cover two successive navigations.

**Risk:** Low. Worst case is wrong copy. The duplicate-tag bug is the review focus.

---

## PR 3 — The prerender script (not yet wired into CI)

Ships alone, changes nothing in production, consumed by nothing. All the risk lives here, isolated.

**Added**
- `script/prerender.js` — sits beside the existing `script/dev` and `script/verify`.

**Modified**
- `package.json` — add `"prerender": "node script/prerender.js"` and `"build:static": "npm run build && npm run prerender"`. No dependency changes.

**Deliberately not a `postbuild` hook:** that would require Chromium binaries for every local `npm run build`, slow the documented fast inner loop, and break the restricted-network agent sandbox contract in `AGENTS.md:9-11`.

**Route list — no hardcoding.** The script parses `dist/sitemap.xml` (a regex over `<loc>` elements; no XML parser dependency) and strips the origin to get pathnames. Chain of custody: registry → PR 1's drift test → `sitemap.xml` → prerender. Adding a route to the registry without updating the sitemap fails PR 1's test; the sitemap then automatically drives prerendering. There is no second list to forget.

**Serving `dist/`:** import Vite's programmatic `preview()` rather than spawning `vite preview` — no cross-platform process kill, and `server.resolvedUrls.local[0]` gives the real port. Pass `configFile: false` so it doesn't boot the Tailwind/React plugins for a static file server, and pin `preview.host` to `127.0.0.1` (the repo sets `server.host: '0.0.0.0'`, which preview would otherwise inherit).

**Wait ladder per route** — `waitUntil: 'load'`, never `networkidle` (About loads seven remote Unsplash images and Hero references an external noise SVG; a slow third party would hang the build):
1. `#root` has children — React mounted.
2. Exactly one non-empty `<h1>` is attached — the real Suspense-completion signal, since all non-home routes are `lazy()`.
3. `document.title` differs from the `index.html` default — proves `DocumentMeta` ran.
4. Scroll pass through full page height, then back to top, to trigger every `whileInView` and let the Navbar's scroll state settle.

Browser context uses `reducedMotion: 'reduce'` and a 1280×900 viewport. That first setting matters: [CaseStudyFlowDiagram.tsx:135-137](src/app/projects/components/CaseStudyFlowDiagram.tsx#L135-L137) short-circuits to a plain `div` under reduced motion, which eliminates the only `opacity: 0` initial state in the app. I verified no component conditionally *renders* on in-view state — everything animates but is present in the DOM — so no content can be missing from the snapshot.

**Fail-loud assertions, evaluated before anything is written:** exactly one non-empty `h1`; no `"Loading..."` (the Suspense fallback at `App.tsx:72`); no `"Something went wrong while loading this page."` (the `ErrorBoundary` fallback — it *swallows* render errors, so without this check you'd ship an error page happily); `body.innerText.length >= 800`; at least four internal `a[href^="/"]`; `link[rel=canonical]` matches the expected URL for that route; description present and 50-200 chars; the `script[type="module"]` tag survives so the SPA still boots; zero `pageerror` and zero `console.error` events. Plus one cross-route check: **all six titles must be distinct** — that directly catches the "every route shares one title" bug this work exists to fix, without hardcoding expected strings.

Results buffer in a `Map` and write only after **all** routes pass. Partial output is worse than none. Output is directory-form (`/projects/bantr` → `dist/projects/bantr/index.html`) captured via `page.content()`, with a `data-prerendered` attribute stamped on `<html>` — which doubles as the guard against re-running prerender on already-prerendered output. `finally` closes browser and server, then an explicit `process.exit(code)` (Vite's preview server keeps the event loop alive).

`createRoot` in [main.tsx](src/main.tsx) stays as-is. React discards the prerendered DOM and re-renders on mount — a sub-frame flash of identical markup. Switching to `hydrateRoot` would be actively wrong: hydrating against a post-effects browser snapshot guarantees a mismatch, and a mismatch degrades to full client render anyway.

**Verify:** `npm run build:static`, then `npm run preview` and `curl -s http://localhost:4173/projects/bantr/` — **trailing slash matters**, since without it preview serves the pristine index. Confirm real `<h1>Bantr`, prose text, and `<a href="/projects/...">` links in the raw bytes. Also confirm the script exits non-zero if you deliberately break a route.

**Risk:** Highest-complexity PR, but zero production impact. Review focus: the wait ladder, the idempotency guard, and `close()` ordering (a leaked preview server hangs CI).

---

## PR 4 — Wire into CI and update the verification contract

**Modified**
- [deploy.yml](.github/workflows/deploy.yml) — after `npm run build`, add `npx playwright install --with-deps chromium` then `npm run prerender`, before `upload-pages-artifact`. Adds roughly 45-90s per run. Runs on PRs too (the build job has no branch guard), so **this PR verifies itself in its own Actions log**.
- `.verify.yml`, `script/verify` — add the prerender step. These plus `deploy.yml` hand-duplicate the same pipeline in three places, and `.cursor/rules/iteration-workflow.mdc` requires keeping them in sync.
- `CLAUDE.md`, `AGENTS.md`, `.cursor/rules/iteration-workflow.mdc` — document `build:static`, the Chromium prerequisite, and that adding a route means updating the registry *and* `public/sitemap.xml`.

Skip Playwright browser caching for now — a stale cache key is a confusing failure mode, and it's an optimization for after the pipeline is proven.

**Verify:** read the PR's Actions log; confirm the uploaded artifact contains six prerendered HTML files and note the added wall-clock time.

**Risk:** First production deploy of prerendered HTML. Mitigated by the PR run proving it pre-merge.

---

## PR 5 — Retire the SPA redirect hack (must land last)

Every route in this app is a literal — no dynamic params — so once six real files exist, the `sessionStorage` redirect serves *only* genuinely unknown paths, where bouncing to home is a textbook soft 404 that Google flags and that makes a typo'd URL indistinguishable from the homepage.

**Modified**
- [public/404.html](public/404.html) — replace the redirect script with a real static page: `<h1>Page not found</h1>`, `<meta name="robots" content="noindex">`, links to `/`, `/about`, and the four projects. Inline `<style>` only, since `public/` files bypass the Tailwind bundle.
- [index.html:24-33](index.html#L24-L33) — delete the decoder script. `CLAUDE.md:105` requires these two to change together; removing both satisfies it.
- `CLAUDE.md`, `.cursor/rules/iteration-workflow.mdc` — replace the redirect-decoder convention with the prerender-based model.

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
