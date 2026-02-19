# Agent Prompt Template (Cursor)

Use this when handing implementation to another agent.

```text
You are implementing a design-system alignment pass for this React + Vite portfolio.

Read first:
1) AGENTS.md
2) .verify.yml
3) docs/design_system/README.md
4) docs/design_system/design_language_contract.md
5) docs/design_system/page_composition_contract.md
6) docs/design_system/project_page_authoring_checklist.md
7) docs/design_system/visual_qa_playbook.md

Goal:
- Improve cross-page cohesion while preserving per-project personality.
- Keep Storm Signal structure mostly intact unless a small targeted change is necessary.
- Prepare for future iteration; do not redesign everything in one pass.

Current priorities:
- Align Home and Storm Signal mechanics with newer project mechanics.
- Improve Replacement Trap layout rhythm and modular clarity.
- Enforce mobile metadata readability floors.
- Normalize CTA anatomy across nav/menu and project pages.

Constraints:
- No dependency upgrades.
- Do not modify lockfile unless explicitly needed.
- Keep route/export contracts unchanged.
- Preserve project accent families and narrative content.

Execution requirements:
1) Show a short plan before edits.
2) Make small, targeted edits.
3) Keep reusable primitives simple; avoid over-abstraction.
4) Run verification commands relevant to modified file types.

Verification:
- If TS/JS changed: `npm run lint:js`
- If CSS changed: `npm run lint:css`
- Then: `npx tsc --noEmit`, `npm run test:ci`, `npm run build`
- If blocked by environment, report exactly what ran and what remains.

Output format:
1) Files changed
2) Key design decisions and rationale
3) Verification results
4) Follow-up risks/TODOs
```

## Optional Analysis-Only Prompt

```text
Run a screenshot-only visual QA pass; do not modify code.
Use docs/design_system/visual_qa_playbook.md as rubric.
Return: screenshot integrity check, severity-ranked findings with evidence, patch plan, and do/don't guardrails.
```
