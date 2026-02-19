## Agent Working Notes (Environment + Verification Model)

**Purpose:** This file provides essential guidance for AI agents working on this repository. Agents should read this file before making any changes to understand environment constraints, verification requirements, and expected workflows.

This repository is a React 18 + Vite 6 + Tailwind CSS v4 single-page portfolio app deployed as a GitHub Pages user site at `grantgeist.com`. The development workflow is Node-first and CI-verified.

### Environment Constraints

- Some agent execution environments may have restricted outbound network access.
- In particular, dependency installation from npm may fail in sandboxed environments.
- Agents should not assume they can successfully run `npm ci` unless explicitly confirmed.

### Shell/Terminal Handling

**Script Compatibility:**

- The repository includes bash scripts (`script/verify`, `script/dev`) designed for Unix-like environments (Linux, macOS, Git Bash).
- These scripts may not run directly in PowerShell or other Windows shells.
- **Agents should adapt commands for the current shell environment.**

**When executing commands:**

- **If bash scripts are unavailable** (e.g., PowerShell environment): Execute the underlying Node/Vite commands directly:
    - Instead of `./script/verify`, run: `npm ci` then `npx tsc --noEmit` then `npm run build`
    - Instead of `./script/dev`, run: `npm run dev`
- **Read the scripts** (`script/verify`, `script/dev`) to understand what commands they execute, then run those commands directly in the available shell.
- **Core Node/npm commands work in all shells** - the scripts are convenience wrappers, not requirements.

**For verification:**

- Agents can read `.verify.yml` to understand required steps and execute them directly.
- If scripts cannot be run, note: "Verify locally with: ./script/verify" (for users with bash) or execute the verification steps manually.

### Source of Truth for Verification

**`.verify.yml` is the single source of truth** for verification requirements. This declarative config file defines:

- Required Node version (>= 18.0.0)
- Verification steps (dependency installation, TypeScript type checking, production build)
- Development server configuration

**Verification Execution:**

- **Local development**: Run `./script/verify` to execute all verification steps
- **CI**: Secondary verification layer, treated as final correctness signal on push/PR
- **Agent sandboxes**: May not be capable of running full builds/tests and should not block changes solely due to environment limitations

### Expected Agent Behavior

When making changes:

1. Prefer small, targeted edits.
2. Do not introduce dependency upgrades unless explicitly requested.
3. Do not modify the lockfile unless the task specifically requires dependency changes.
4. **Run linters when modifying CSS or TypeScript/JavaScript files:**
   - After editing CSS files: Run `npm run lint:css`
   - After editing TypeScript/JavaScript files: Run `npm run lint:js`
   - Use `npm run lint:fix` to auto-fix issues, but always review changes
   - If npm is unavailable, note linting verification in output
5. If tests/build cannot be run due to environment restrictions:
   - Read `.verify.yml` to understand verification requirements
   - Provide the patch and note: "Verify locally with: ./script/verify"
   - Reference the verification steps from `.verify.yml` in your output

### Code Quality & Linting

**Linting Tools Available:**

- **Stylelint** - CSS files
- **ESLint** - TypeScript/JavaScript files (`eslint.config.mjs`)

**When to run linters:**

- After modifying CSS or TypeScript/JavaScript files
- Before committing changes (if environment supports npm)
- Linters automatically ignore minified files and vendor libraries

**Linting commands:**

- `npm run lint` - Run all linters
- `npm run lint:fix` - Auto-fix issues (review before committing)
- Individual linters: `npm run lint:css` or `npm run lint:js`

**Agent guidance:**

- If npm/node is unavailable, note linting verification in output
- Prefer fixing linting issues directly in code when possible
- Use auto-fix sparingly and always review changes

### Safe Edit Loop

**Before proposing changes:** Agents should read `.verify.yml` to understand what verification steps are expected, even if they cannot execute them in their environment.

Typical workflow:

1. Agent reads `.verify.yml` to understand verification requirements.
2. Agent proposes code/content changes.
3. Agent runs linters if modifying CSS/TypeScript (if npm available).
4. Human runs local verification (`./script/verify` or `npm run build`) if needed.
5. Changes are pushed.
6. CI confirms build + test integrity.

Agents should optimize for correctness of edits and minimal surface area rather than attempting to fully reproduce the local toolchain.

## Related Documentation

- **`.cursor/rules/QUICK_START.mdc`** – Quick reference guide for common tasks (start here!)
- **`.cursor/rules/`** – Focused, scoped rules for components, design tokens, workflow, file naming, and asset management
- **`CLAUDE.md`** – Project overview, commands, architecture, and content model
- **`.verify.yml`** – Single source of truth for verification steps
- **`README.md`** – User-facing project documentation
