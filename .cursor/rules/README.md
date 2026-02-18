# Cursor Rules for Portfolio Site

This directory contains focused, scoped rules for working with this React + Vite portfolio site. Rules are automatically applied based on file patterns and context.

## Rule Files

### `design-consistency.md`

- **Scope**: Project pages (`src/app/projects/**/*.tsx`) and components (`src/app/components/**/*.tsx`)
- **Purpose**: Maintain visual and structural consistency between landing page and project detail pages
- **Key Topics**: Container structure, color palette, typography, spacing, component patterns

### `file-naming.md`

- **Scope**: All files (always applied)
- **Purpose**: Naming conventions for files and directories
- **Key Topics**: Naming patterns, consistency guidelines, special cases

### `iteration-workflow.md`

- **Scope**: Content files (`*.md`, `*.html`, `*.markdown`, `*.yml`)
- **Purpose**: Development workflow and iteration patterns
- **Key Topics**: Testing strategy, git workflow, common update patterns

### `asset-management.md`

- **Scope**: Asset directories (`img/**/*`, `assets/**/*`, `css/**/*`)
- **Purpose**: Image and asset organization patterns
- **Key Topics**: Image naming, optimization, organization patterns

### Legacy Rules (Jekyll-era, may be outdated)

- `jekyll-portfolio.md` - Legacy Jekyll patterns (may not apply to current React structure)
- `jekyll-structure.md` - Legacy Jekyll structure patterns (may not apply to current React structure)

## How Rules Work

Rules use glob patterns to automatically apply when working with matching files:

- **Glob patterns**: Rules activate when editing files matching the pattern
- **Always apply**: Some rules (like file naming) apply to all files
- **Context-aware**: Rules activate based on what you're editing

## Philosophy

These rules are designed to be:

- **Flexible** - Support iteration and experimentation
- **Focused** - One concern per rule file
- **Practical** - Concrete examples over abstract principles
- **Iteration-friendly** - Don't block on perfection

## Related Documentation

- `AGENTS.md` - Environment constraints and agent behavior
- `README.md` - Project overview and setup
- `agents/` - Agent prompts and integration standards

## Updating Rules

When updating rules:

1. Keep rules focused and under 500 lines
2. Use concrete examples
3. Test with actual use cases
4. Document changes
