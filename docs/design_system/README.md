# Design System Docs

This folder is the working contract for visual consistency across the portfolio.

It is optimized for two use cases:

- Humans making iterative design decisions without re-debating basics every time.
- AI agents making safe, consistent updates without breaking route contracts or visual language.

## Current Context

- Home and Storm Signal are close, but still subtly out of sync with the newer project pages.
- The Replacement Trap layout needs a deeper structural pass later.
- We are not forcing immediate redesigns here; this docs set is for repeatable iteration.

## Source Files

- `docs/design_system/design_language_contract.md`: Tokens, roles, and fixed-vs-variable rules.
- `docs/design_system/page_composition_contract.md`: Home/project page composition rules.
- `docs/design_system/visual_qa_playbook.md`: Screenshot protocol and analysis rubric.
- `docs/design_system/agent_prompt_template.md`: Copy/paste prompt template for Cursor agents.
- `docs/design_system/change_log.md`: Decision log for design-system evolution.

## Workflow

1. Run capture + analysis using `docs/design_system/visual_qa_playbook.md`.
2. Propose changes against `docs/design_system/design_language_contract.md` and `docs/design_system/page_composition_contract.md`.
3. Implement in small passes.
4. Record decisions in `docs/design_system/change_log.md`.
5. Re-capture and compare.

## Guardrails

- Keep route/export contracts stable.
- Avoid dependency upgrades and lockfile edits unless explicitly requested.
- Preserve per-project personality (accent and narrative) while standardizing mechanics.
- Treat `.verify.yml` as verification source of truth.
