# Design System Change Log

Track accepted design-system decisions here so future work does not regress.

## Entry Template

- Date: YYYY-MM-DD
- Scope: Home, project pages, or shared primitives
- Decision: What changed
- Rationale: Why we changed it
- Impacted files: paths
- Follow-up: Any known next iteration work

## Entries

- Date: 2026-02-19
- Scope: Documentation system
- Decision: Added design-system docs pack in `docs/design_system/` (contract, composition, QA playbook, agent prompt template, change log).
- Rationale: Make future design iterations easier for humans and AI agents without forcing immediate redesign.
- Impacted files:
  - `docs/design_system/README.md`
  - `docs/design_system/design_language_contract.md`
  - `docs/design_system/page_composition_contract.md`
  - `docs/design_system/visual_qa_playbook.md`
  - `docs/design_system/agent_prompt_template.md`
  - `docs/design_system/change_log.md`
- Follow-up: Use this framework for the next alignment pass focused on Home/Storm cohesion and Replacement Trap layout.
