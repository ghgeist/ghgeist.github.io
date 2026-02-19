# Visual QA Playbook

Use this playbook for screenshot-based visual audits and post-change validation.

## Screenshot Set

Capture all routes in desktop and mobile with `top` and `mid` frames.

Required files under `docs/scratch/visual-qa/`:

- `home-desktop-top.png`
- `home-desktop-mid.png`
- `home-mobile-top.png`
- `home-mobile-mid.png`
- `home-mobile-menu.png`
- `storm-signal-desktop-top.png`
- `storm-signal-desktop-mid.png`
- `storm-signal-mobile-top.png`
- `storm-signal-mobile-mid.png`
- `walkability-desktop-top.png`
- `walkability-desktop-mid.png`
- `walkability-mobile-top.png`
- `walkability-mobile-mid.png`
- `replacement-desktop-top.png`
- `replacement-desktop-mid.png`
- `replacement-mobile-top.png`
- `replacement-mobile-mid.png`
- `bantr-desktop-top.png`
- `bantr-desktop-mid.png`
- `bantr-mobile-top.png`
- `bantr-mobile-mid.png`

## Capture Standards

- Use deterministic browser zoom and device emulation settings.
- Prefer viewport height around 1400 for better top/mid differentiation.
- Ensure `mid` captures show a different scroll context from `top`.
- Reject blank, gray, error-page, or duplicate captures.

## Analysis Rubric

Order findings by severity:

1. Cross-route cohesion breaks.
2. Mobile readability and hierarchy breaks.
3. Interaction language inconsistency (CTA/nav/back-link).
4. Surface/card role inconsistency.
5. Motion continuity issues.
6. Accessibility-risk items (contrast or tiny text).

For each finding include:

- Issue.
- Why it matters.
- Screenshot evidence file names.
- Recommended fix.
- Likely file targets.

## Expected Audit Output

Each QA report should include:

1. Screenshot integrity check (missing/blank/duplicate status).
2. Findings ordered by severity.
3. Proposed design-language updates, if any.
4. Implementation patch plan (quick wins, consistency fixes, optional refinements).
5. Do/Don't guardrails for implementation agents.

## Post-Change Verification

After a patch pass:

1. Re-capture the full screenshot set.
2. Compare with previous findings.
3. Update `docs/design_system/change_log.md` with accepted decisions.
4. Run verification commands from `.verify.yml` for code changes.
