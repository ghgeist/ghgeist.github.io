# Agent Prompt Review & Optimization Analysis

**Date**: 2026-02-09  
**Reviewed Agents**: `dev_note_agent.md`, `performance-agent.md`, `testing_agent.md`  
**Repository Context**: Jekyll-based portfolio website (`ghgeist.github.io`)

---

## Executive Summary

The three agent prompts are well-structured but contain **critical mismatches** with this repository's actual structure and purpose. They reference infrastructure that doesn't exist and assume a complex software engineering project context, while this repo is a static Jekyll portfolio site.

---

## Critical Issues

### 1. Missing Dependencies

All three agents reference files that **do not exist** in this repository:

**Missing Platform Integration Files:**
- `docs/agents/_cursor-integration-standard.md`
- `docs/agents/_claude-code-integration-standard.md`
- `docs/agents/_gemini-cli-integration-standard.md`
- `docs/agents/_codex-integration-standard.md`
- `docs/agents/_platform-detection-guide.md`

**Missing Session Management:**
- `docs/agents/_session-management-core.md`
- `docs/sessions/completed/` directory
- `docs/sessions/active/` directory

**Impact**: Agents will fail when trying to follow "MANDATORY" instructions that reference non-existent files.

**Recommendation**: 
- **Option A**: Remove platform integration sections if not needed for this repo
- **Option B**: Create stub/placeholder files that gracefully handle missing infrastructure
- **Option C**: Make platform integration optional with fallback behavior

### 2. Context Mismatch

**Repository Reality**: 
- Static Jekyll site (HTML, CSS, JavaScript, Markdown)
- No database operations
- No API endpoints (except contact form)
- No Python test frameworks
- No complex build pipelines
- Simple GitHub Pages deployment

**Agent Assumptions**:
- Database query optimization (performance-agent.md)
- API testing (testing_agent.md)
- Complex session management workflows (dev_note_agent.md)
- Python test execution (`python scripts/run_tests.py`)
- Production deployment pipelines
- Performance profiling tools

**Impact**: Agents will attempt to optimize/test things that don't exist or aren't relevant.

**Recommendation**: Adapt agent scopes to Jekyll-specific concerns:
- **Performance**: Image optimization, CSS/JS minification, page load times, asset bundling
- **Testing**: HTML validation, link checking, Jekyll build verification, responsive design testing
- **Dev Notes**: Focus on content updates, design changes, blog posts, asset additions

### 3. Structural Coherence Issues

Using the **Topology Read** framework, several structural issues emerge:

#### Connectedness Problem
**Issue**: Agents mix multiple disconnected concerns:
- Platform detection (infrastructure)
- Session management (workflow)
- Core agent functionality (domain logic)

**Example**: `dev_note_agent.md` combines:
- Git commit analysis (works for any repo)
- Session file synthesis (requires non-existent infrastructure)
- Platform-specific tool usage (requires missing standards)

**Fix**: Separate concerns into optional vs. required sections.

#### Boundary Bleeding
**Issue**: Unmarked transitions between phases:
- Discovery → Execution (agents jump to implementation without explicit phase markers)
- Analysis → Optimization (performance agent doesn't clearly separate measurement from optimization)

**Example**: `performance-agent.md` Phase 2 (Measurement) immediately flows into Phase 3 (Optimization) without explicit "stop and validate" boundaries.

**Fix**: Add explicit phase completion criteria and validation gates.

#### Discontinuities
**Issue**: Silent assumptions about infrastructure:
- "and then it understands" the platform (platform detection)
- "obviously it shouldn't" break existing functionality (assumes test infrastructure exists)

**Example**: `testing_agent.md` assumes Python test frameworks exist, but Jekyll sites typically use Ruby-based testing or simple HTML validation.

**Fix**: Make infrastructure assumptions explicit and provide fallbacks.

---

## Optimization Recommendations

### For `dev_note_agent.md`

**1. Make Session Management Optional**
```markdown
## SESSION FILES (OPTIONAL)
If `docs/sessions/completed/` and `docs/sessions/active/` directories exist:
- Scan for session files matching the target date
- Use session files to provide additional context
- Cross-reference with GitHub commits

If session directories don't exist:
- Rely solely on GitHub commit history
- Focus on commit messages and file changes
```

**2. Simplify for Jekyll Context**
- Remove references to PR numbers (unless using GitHub PRs)
- Focus on commit themes: "Content Updates", "Design Changes", "Asset Additions", "Blog Posts"
- Adapt template to Jekyll-specific metrics: page load times, image optimization, build times

**3. Make Platform Integration Optional**
```markdown
## PLATFORM INTEGRATION (OPTIONAL)
If platform integration standards exist in `docs/agents/_*.md`:
- Follow the appropriate standard for your platform
- Use platform-specific tool mappings

If standards don't exist:
- Use standard tool calls available in your environment
- Skip platform-specific optimizations
```

### For `performance-agent.md`

**1. Add Jekyll-Specific Performance Areas**
```markdown
## JEKYLL-SPECIFIC PERFORMANCE AREAS
1. **Image Optimization**: Compress images, use modern formats (WebP), lazy loading
2. **Asset Bundling**: Minify CSS/JS, combine files, remove unused code
3. **Build Performance**: Optimize Jekyll build times, reduce Liquid template complexity
4. **Page Load Times**: Optimize critical rendering path, defer non-critical assets
5. **GitHub Pages Optimization**: Leverage CDN caching, optimize for static hosting
```

**2. Remove Database/API Assumptions**
- Remove "Database Performance" from priority list (or mark as N/A)
- Remove "API Performance" section (or adapt to contact form only)
- Focus on static site optimization patterns

**3. Add Fallback for Missing Profiling Tools**
```markdown
### Measurement Tools
If performance profiling tools exist:
- Use existing profiling infrastructure
- Run benchmarks with established tools

If profiling tools don't exist:
- Use browser DevTools (Lighthouse, Network tab)
- Measure build times with `time bundle exec jekyll build`
- Use simple timing in JavaScript for runtime metrics
```

### For `testing_agent.md`

**1. Add Jekyll-Specific Testing Strategy**
```markdown
## JEKYLL TESTING STRATEGY

### 1. Build Validation (Highest Priority)
- Verify Jekyll builds without errors
- Check for broken Liquid syntax
- Validate YAML front matter

### 2. HTML Validation (High Priority)
- Validate HTML output
- Check for broken links
- Verify accessibility basics

### 3. Responsive Design Testing (Medium Priority)
- Test on multiple screen sizes
- Verify mobile responsiveness
- Check cross-browser compatibility

### 4. Content Validation (Medium Priority)
- Check for broken image references
- Verify markdown rendering
- Validate Open Graph metadata
```

**2. Remove Python Test Assumptions**
```markdown
### Test Execution
**For Jekyll sites:**
- Use `bundle exec jekyll build` to verify builds
- Use HTML validators (W3C, HTML5 Validator)
- Use link checkers (htmltest, linkchecker)
- Use browser DevTools for manual testing

**For Python projects (if applicable):**
- Use `pytest` or project-specific test runners
- Follow existing test patterns in the codebase
```

**3. Simplify Test Patterns**
Replace Python examples with Jekyll-relevant examples:
```markdown
### Link Validation Testing
```bash
# PRESERVED: Site structure, content, navigation
# TRANSFORMED: Confidence level (unknown → validated)
# ADDED: Link checking, broken reference detection
htmltest -c .htmltest.yml
```

### Build Validation
```bash
# PRESERVED: Jekyll configuration, content structure
# TRANSFORMED: Build confidence (unknown → verified)
# ADDED: Build verification, error detection
bundle exec jekyll build --trace
```
```

---

## Structural Improvements

### 1. Add Explicit Phase Boundaries

**Current Problem**: Phases bleed into each other without validation gates.

**Fix**: Add explicit completion criteria:

```markdown
### Phase 2: Measurement (How Slow?)
[... existing content ...]

**Phase Completion Criteria:**
- [ ] Baseline metrics documented
- [ ] Performance bottlenecks identified with evidence
- [ ] Measurement methodology validated
- [ ] **STOP**: Do not proceed to optimization until all criteria met
```

### 2. Make Infrastructure Dependencies Explicit

**Current Problem**: Agents assume infrastructure exists.

**Fix**: Add dependency checks:

```markdown
## INFRASTRUCTURE REQUIREMENTS

### Required
- Git repository (for commit history)
- Terminal access (for command execution)

### Optional (with fallbacks)
- Session management system → Use git commits only
- Performance profiling tools → Use browser DevTools
- Test frameworks → Use build validation + manual testing
- Platform integration standards → Use default tool calls
```

### 3. Add Repository Context Detection

**Current Problem**: Agents don't adapt to repository type.

**Fix**: Add context detection:

```markdown
## REPOSITORY CONTEXT DETECTION

Before executing, determine repository type:
1. Check for `_config.yml` → Jekyll site
2. Check for `package.json` → Node.js project
3. Check for `requirements.txt` or `setup.py` → Python project
4. Check for `Gemfile` → Ruby project

Adapt agent behavior based on detected context:
- **Jekyll**: Focus on static site optimization, build validation, content testing
- **Node.js**: Focus on npm scripts, bundling, API testing
- **Python**: Focus on pytest, database optimization, API performance
```

---

## Priority Actions

### Immediate (Critical)
1. ✅ **Remove or make optional** platform integration references
2. ✅ **Remove or make optional** session management dependencies
3. ✅ **Add fallback behavior** for missing infrastructure
4. ✅ **Add repository context detection** to adapt agent behavior

### Short-term (High Value)
5. ✅ **Add Jekyll-specific sections** to each agent
6. ✅ **Replace Python examples** with Jekyll-relevant examples
7. ✅ **Add explicit phase boundaries** with completion criteria
8. ✅ **Document infrastructure dependencies** clearly

### Long-term (Nice to Have)
9. Create platform integration standards if needed
10. Create session management system if needed
11. Add Jekyll-specific test utilities
12. Create agent orchestration for multi-agent workflows

---

## Compositional Integrity Check

Using the **Compositional Sanity Check** framework:

### ✅ Object Stability: PASS
- Agents are clearly named and have distinct purposes
- Objects (dev notes, performance optimizations, tests) are well-defined

### ⚠️ Explicit Transformations: PARTIAL
- Some transformations are explicit (e.g., "PRESERVED/TRANSFORMED/ADDED" in performance-agent.md)
- Platform detection and session management transitions are implicit ("and then it understands")

### ❌ Compositional Integrity: FAIL
- Agents reference non-existent infrastructure without fallbacks
- Meaning breaks when infrastructure is missing
- Agents can't compose with actual repository structure

### ⚠️ Identity/No-Op Validity: PARTIAL
- Agents can skip optional steps, but "MANDATORY" sections create failures
- No clear "do nothing" path when infrastructure is missing

### ❌ Intent-Preserving Mapping: FAIL
- Agents assume complex software project context
- Same prompts produce different (broken) behavior in Jekyll context
- Intent (optimize/test/document) doesn't survive context change

**Overall**: Agents need structural fixes to maintain compositional integrity across different repository types.

---

## Recommended Next Steps

1. **Create optimization versions** of each agent with:
   - Optional platform integration
   - Jekyll-specific adaptations
   - Explicit fallbacks for missing infrastructure
   - Repository context detection

2. **Test agents** against actual Jekyll repository to validate fixes

3. **Document** which sections are required vs. optional for different repository types

4. **Consider** creating a "repository type detection" utility that agents can use

---

## Conclusion

The agent prompts are well-designed but need **contextual adaptation** for this Jekyll portfolio repository. The main issues are:

1. **Missing infrastructure dependencies** → Make optional with fallbacks
2. **Context mismatch** → Add Jekyll-specific sections
3. **Structural coherence** → Add explicit boundaries and dependency checks
4. **Compositional integrity** → Ensure agents work across repository types

With these optimizations, the agents will be more robust and useful for this specific repository while maintaining their core functionality.
