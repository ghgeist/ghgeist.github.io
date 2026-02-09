## Agent Working Notes (Environment + Verification Model)

**Purpose:** This file provides essential guidance for AI agents working on this repository. Agents should read this file before making any changes to understand environment constraints, verification requirements, and expected workflows.

This repository is a GitHub Pages (Jekyll) site that uses Bundler with a pinned lockfile (`BUNDLED WITH 2.5.23`). The development workflow is intentionally local-first and CI-verified.

### Environment Constraints

- Some agent execution environments may have restricted outbound network access.
- In particular, dependency installation from RubyGems may fail in sandboxed environments.
- Agents should not assume they can successfully run `bundle install` unless explicitly confirmed.

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