# Cursor Rules for Portfolio Site

This directory contains focused, scoped rules for working with this **React 18 + Vite 6 + Tailwind CSS v4** portfolio app. Rules are applied based on file patterns and context.

## Rule Files

### `design-tokens-and-layout.mdc`

- **Scope**: Project pages (`src/app/projects/**/*.tsx`) and components (`src/app/components/**/*.tsx`)
- **Purpose**: Design tokens and layout (containers, color palette, typography, spacing)
- **Key Topics**: Container structure, color palette, typography patterns, spacing rhythm

### `design-components-and-pages.mdc`

- **Scope**: Project pages and components (same globs as above)
- **Purpose**: Component patterns and project page structure
- **Key Topics**: SectionHeading, Card, Stat Card, CTA, motion, section order, reference components

### `react-structure.mdc`

- **Scope**: App structure (`src/app/**/*`, `src/styles/**/*`, `vite.config.*`)
- **Purpose**: Conventions for components, routes, and project architecture
- **Key Topics**: Component patterns, routing, styling, content model

### `iteration-workflow.mdc`

- **Scope**: Content and config files (`*.md`, `*.html`, `*.yml`, `*.yaml`)
- **Purpose**: Development workflow and verification
- **Key Topics**: npm scripts, testing strategy, git workflow, .verify.yml

### `file-naming.mdc`

- **Scope**: All files (always applied)
- **Purpose**: Naming conventions by context (React vs assets vs docs)
- **Key Topics**: PascalCase for components, snake_case for assets/docs, consistency

### `asset-management.mdc`

- **Scope**: Static assets (`public/**/*`, `src/**/*.{css,svg,png,jpg}`)
- **Purpose**: Asset organization and references in a Vite/React app
- **Key Topics**: public/, image naming, optimization

## How Rules Work

- **Glob patterns**: Rules activate when editing files matching the pattern
- **Always apply**: File naming applies to all files with context-aware conventions
- **Single source of truth**: CLAUDE.md and AGENTS.md define stack and verification; rules stay aligned

## Philosophy

- **Focused** – One concern per rule file
- **Aligned** – Match actual stack (React/Vite) and .verify.yml
- **Practical** – Concrete examples; no Jekyll/Liquid references

## Quick Start

**New to this codebase?** Start with **`QUICK_START.mdc`** – it maps common tasks to the right documentation.

## Related Documentation

- **`QUICK_START.mdc`** – Quick reference guide for common tasks
- **`CLAUDE.md`** – Project overview, commands, architecture
- **`AGENTS.md`** – Environment constraints and agent behavior
- **`.verify.yml`** – Verification steps (npm ci, tsc, test, build)
- **`README.md`** – User-facing project documentation

## Updating Rules

1. Keep rules focused and under ~500 lines
2. Use concrete examples from this repo
3. Ensure commands match `.verify.yml` and `package.json`
4. Do not reference Jekyll, _posts, _includes, or Liquid
