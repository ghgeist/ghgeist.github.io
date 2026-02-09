---
description: File and directory naming conventions using snake_case
alwaysApply: true
---

# File and Directory Naming Conventions

## Core Rule: snake_case

**All files and directories must use snake_case naming.**

### Examples

**✅ Correct:**
- `contact_me.js`
- `header_v2.jpg`
- `embodied_ai_thumbnail.png`
- `portfolio_grid.html`
- `session-management-best-practices.md`

**❌ Incorrect:**
- `contactMe.js` (camelCase)
- `Header-V2.jpg` (PascalCase/kebab-case)
- `embodiedAI.png` (camelCase)
- `PortfolioGrid.html` (PascalCase)

## File Type Patterns

### JavaScript Files (`js/`)
- Use snake_case: `contact_me.js`, `agency.js`
- Descriptive names: `jq_bootstrap_validation.js`

### Image Files (`img/`)
- Use snake_case: `embodied_ai.png`, `header_v2.jpg`
- Include version numbers: `header_v3.jpg`, `header_v4.jpg`
- Thumbnails: `project_name_thumbnail.png`

### HTML Includes (`_includes/`)
- Use snake_case: `portfolio_grid.html`, `contact_form.html`
- Descriptive component names

### Jekyll Posts (`_posts/`)
- Format: `YYYY-MM-DD-project-name.markdown`
- Date prefix, then snake_case: `2024-07-01-urbanism_project.markdown`

### CSS/SCSS Files
- Use snake_case: `main.scss`, `agency.css`
- Match component names when possible

### Ruby Plugins (`_plugins/`)
- Use snake_case: `hex_to_rgb.rb`
- Descriptive of functionality

### Session Files (`docs/sessions/`)
- Format: `YYYY-MM-DD-[type]-[description].md`
- Use snake_case for description: `2024-02-09-refactor-portfolio-grid.md`

## Directory Naming

**✅ Correct:**
- `img/portfolio/`
- `assets/og/`
- `docs/dev_notes/`
- `agents/prompt_checks/`

**❌ Incorrect:**
- `img/Portfolio/` (PascalCase)
- `assets/OpenGraph/` (PascalCase)
- `docs/devNotes/` (camelCase)

## Special Cases

### Versioned Files
- Use `_v2`, `_v3` suffix: `header_v2.jpg`, `header_v3.jpg`
- Or descriptive suffixes: `embodied_ai_compressed.gltf`

### Thumbnails
- Use `_thumbnail` suffix: `project_name_thumbnail.png`
- Keep same base name as full image

### Compressed Assets
- Use `compressed/` subdirectory: `assets/rhino/compressed/`
- Keep original names: `embodied_ai_compressed.bin`

## Consistency Guidelines

- **Be descriptive**: `contact_me.js` is better than `contact.js`
- **Be consistent**: If you use `_v2`, use `_v3` for next version
- **Avoid abbreviations**: `portfolio_grid.html` not `port_grid.html`
- **Match context**: If file is for a component, match component name

## When Adding New Files

1. Check existing naming patterns in the same directory
2. Use snake_case consistently
3. Be descriptive but concise
4. Match existing patterns when possible

## Exceptions

- Third-party libraries may use their own naming (e.g., `jquery-1.11.0.js`)
- Keep external dependencies as-is
- Only apply snake_case to files you create/modify
