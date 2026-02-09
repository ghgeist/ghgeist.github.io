## Agent Working Notes (Environment + Verification Model)

**Purpose:** This file provides essential guidance for AI agents working on this repository. Agents should read this file before making any changes to understand environment constraints, verification requirements, and expected workflows.

This repository is a GitHub Pages (Jekyll) site that uses Bundler with a pinned lockfile (`BUNDLED WITH 2.5.23`). The development workflow is intentionally local-first and CI-verified.

### Environment Constraints

- Some agent execution environments may have restricted outbound network access.
- In particular, dependency installation from RubyGems may fail in sandboxed environments.
- Agents should not assume they can successfully run `bundle install` unless explicitly confirmed.

### Shell/Terminal Handling

**Script Compatibility:**
- The repository includes bash scripts (`script/verify`, `script/dev`) designed for Unix-like environments (Linux, macOS, Git Bash).
- These scripts may not run directly in PowerShell or other Windows shells.
- **Agents should adapt commands for the current shell environment.**

**When executing commands:**
- **If bash scripts are unavailable** (e.g., PowerShell environment): Execute the underlying Ruby/Bundler/Jekyll commands directly:
  - Instead of `./script/verify`, run: `bundle install --path vendor/bundle` then `bundle exec rake test` then `bundle exec jekyll build --trace`
  - Instead of `./script/dev`, run: `bundle exec jekyll serve --livereload --host 0.0.0.0`
- **Read the scripts** (`script/verify`, `script/dev`) to understand what commands they execute, then run those commands directly in the available shell.
- **Core Ruby/Jekyll commands work in all shells** - the scripts are convenience wrappers, not requirements.

**For verification:**
- Agents can read `.verify.yml` to understand required steps and execute them directly.
- If scripts cannot be run, note: "Verify locally with: ./script/verify" (for users with bash) or execute the verification steps manually.

### Source of Truth for Verification

**`.verify.yml` is the single source of truth** for verification requirements. This declarative config file defines:
- Required Bundler version
- Verification steps (dependency installation, test suite, build)
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
4. If tests/build cannot be run due to environment restrictions:
   - Read `.verify.yml` to understand verification requirements
   - Provide the patch and note: "Verify locally with: ./script/verify"
   - Reference the verification steps from `.verify.yml` in your output

### Safe Edit Loop

**Before proposing changes:** Agents should read `.verify.yml` to understand what verification steps are expected, even if they cannot execute them in their environment.

Typical workflow:

1. Agent reads `.verify.yml` to understand verification requirements.
2. Agent proposes code/content changes.
3. Human runs local verification (`./script/verify` or `bundle exec …`) if needed.
4. Changes are pushed.
5. CI confirms build + test integrity.

Agents should optimize for correctness of edits and minimal surface area rather than attempting to fully reproduce the local toolchain.