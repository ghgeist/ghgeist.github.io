# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jekyll 4.3.0 portfolio site for Grant Geist, hosted on GitHub Pages at grantgeist.com. Single-page layout with anchor navigation (#portfolio, #about, #contact, #skills) and modal-based project detail views. Built on Bootstrap 3 (Flatly Bootswatch theme) with jQuery 1.11.0.

## Commands

### Development Server
```bash
./script/dev                           # Start dev server with livereload (localhost:4000)
bundle exec jekyll serve --livereload  # Direct equivalent (use in PowerShell)
```

### Build & Test
```bash
bundle exec rake test:build            # Quick build validation (always works)
bundle exec rake test                  # Full suite: build + HTML validation + link checking
bundle exec rake test:html:external    # Include external link checking (requires libcurl)
./script/verify                        # Full verification (reads .verify.yml)
```

### Linting
```bash
npm run lint           # Run all linters (Stylelint + ESLint)
npm run lint:fix       # Auto-fix all linting issues
npm run lint:css       # Stylelint only
npm run lint:js        # ESLint only
bundle exec rake lint  # Same via Rake
```

Run linters after modifying any CSS/SCSS or JavaScript files. Linters auto-ignore vendor/minified files (bootstrap, jquery, Font Awesome, etc.).

### Setup
```bash
bundle install --path vendor/bundle
npm install
```

## Architecture

### Content Model
Portfolio projects are Jekyll posts in `_posts/` with format `YYYY-MM-DD-project-name.markdown`. Each post requires front matter fields: `title`, `subtitle`, `layout: default`, `modal-id` (unique incrementing integer), `date`, `img`, `thumbnail`, `alt`. Optional: `tags`, `category`, `project`, `github`, `demo`, `description`, `tools_used`. Projects auto-appear in the portfolio grid — no manual registration needed.

### Page Assembly
`_layouts/default.html` assembles the page by including components from `_includes/`: `head.html`, `header.html`, `skills.html`, `portfolio_grid.html`, `modals.html`, `about.html`, `contact.html`, `footer.html`, `js.html`. The portfolio grid iterates `site.posts` and links each to `portfolioModal{{ post.modal-id }}`.

### Styling Pipeline
`/style.css` (Jekyll layout) imports `_sass/main.scss` which defines SCSS variables and global styles. `_includes/css/agency.css` contains the theme styles. Bootstrap is in `_includes/css/bootstrap.min.css`.

### JavaScript
Custom JS in `js/`: `agency.js` (smooth scroll, scrollspy, mobile menu), `contact_me.js` (email obfuscation). Modals use the History API for back-button support (embedded in `modals.html`).

### Verification Contract
`.verify.yml` is the single source of truth for verification requirements. `script/verify` reads it. CI (`.github/workflows/verify.yml`) runs verification on push/PR. Pre-commit hook runs `bundle exec rake test:build`.

## Conventions

- **File naming**: All new files and directories use snake_case. Third-party libraries keep their original names.
- **Modal IDs**: Check existing posts for highest `modal-id` and increment by 1 for new projects.
- **Permalink structure**: `/:categories/:title/` (set in `_config.yml`).
- **Images**: Full images and thumbnails go in `img/portfolio/` with snake_case names.
- **Edits**: Prefer small, targeted changes. Do not modify `Gemfile.lock` or upgrade dependencies unless explicitly requested.

## Session Management

Work is tracked through session files in `sessions/`. Always check for existing sessions before starting significant work.

### Directory Structure
```
sessions/
├── active/          # Current work in progress (max 2)
├── backlog/         # Planned future work
└── completed/       # Finished sessions with outcomes
```

### Workflow
1. **Discover**: Check `sessions/active/` for existing relevant sessions before starting work.
2. **Create or resume**: If no relevant session exists, create one in `sessions/active/`. If one exists, read it for context and update it.
3. **Update**: Document progress, decisions, and blockers throughout work.
4. **Complete**: Mark session as completed, document outcomes and next steps, then move to `sessions/completed/`. Create follow-up sessions in `sessions/backlog/` if needed.

### Session File Format
**Naming**: `YYYY-MM-DD-[type]-[description].md` (e.g., `2025-09-12-debug-modal-layout.md`)

**Types**: `research`, `plan`, `execute`, `debug`, `deploy`, `refactor`, `test`, `dev-note`, `release`

**Template front matter**:
```yaml
---
title: "Type: Clear Description"
date: "YYYY-MM-DD"
status: "active|completed|blocked"
session_type: "type"
priority: "high|medium|low"
tags: ["relevant", "tags"]
related: ["paths/to/related/sessions"]
---
```

Include sections: Objective, Success Criteria, Progress Log, Outcomes, Related Work, Next Steps. See `agents/_session-management-core.md` for the full template.

## Workflow Orchestration

### Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, STOP and re-plan immediately — don't keep pushing.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront to reduce ambiguity.

### Subagent Strategy
- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- One task per subagent for focused execution.

### Self-Improvement Loop
- After ANY correction from the user: update `sessions/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Review lessons at session start for the relevant project.

### Verification Before Done
- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Run tests, check logs, demonstrate correctness.

### Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.

### Task Tracking
1. **Plan First**: Write plan to `sessions/todo.md` with checkable items.
2. **Verify Plan**: Check in before starting implementation.
3. **Track Progress**: Mark items complete as you go.
4. **Explain Changes**: High-level summary at each step.
5. **Document Results**: Add review section to `sessions/todo.md`.
6. **Capture Lessons**: Update `sessions/lessons.md` after corrections.

### Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Demand Elegance (Balanced)**: For non-trivial changes, pause and ask "is there a more elegant way?" Skip this for simple, obvious fixes.

## Environment Notes

- Windows development environment (Git Bash). Bash scripts (`script/verify`, `script/dev`) may not work in PowerShell — run the underlying bundle/rake commands directly.
- HTML validation (`rake test:html`) gracefully skips on systems without libcurl. `rake test:build` always works.
- Bundler version pinned to 2.5.23 (in `Gemfile.lock`). Ruby >= 2.6.0 required.
