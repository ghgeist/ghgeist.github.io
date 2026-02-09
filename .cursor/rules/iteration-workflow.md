---
description: Development workflow and iteration patterns for portfolio site updates
globs: ["*.md", "*.html", "*.markdown", "*.yml", "*.yaml"]
alwaysApply: false
---

# Iteration Workflow for Portfolio Site

## Quick Iteration Cycle

### Content Updates (Fast Path)

1. **Make changes** - Edit markdown, HTML, or config files
2. **Preview locally** - Run `bundle exec jekyll serve` or `./script/dev`
3. **Visual check** - Review in browser at `http://localhost:4000`
4. **Quick build test** - Run `bundle exec rake test:build` before committing
5. **Commit** - Small, focused commits

### Structural Changes (Thorough Path)

1. **Plan change** - Understand impact on site structure
2. **Make changes** - Edit includes, layouts, or plugins
3. **Build and test** - Run `bundle exec jekyll build`
4. **Full test suite** - Run `bundle exec rake test`
5. **Visual verification** - Check all pages in browser
6. **Commit** - Document what changed and why

## Testing Strategy

### When to Test Thoroughly

- ✅ Before deploying major structural changes
- ✅ When adding new Jekyll plugins or features
- ✅ Before merging to main branch
- ✅ When modifying `_config.yml` or site structure

### When Visual Check is Sufficient

- ✅ Content-only updates (new post, updated description)
- ✅ Image swaps or updates
- ✅ Minor text edits
- ✅ Adding optional front matter fields

### Test Commands

**Quick Build Check:**

```bash
bundle exec rake test:build
```

- Always works, even without libcurl
- Validates Jekyll build succeeds
- Catches syntax errors and missing files

**Full Test Suite:**

```bash
bundle exec rake test
# or
bundle exec rake test:all
```

- Build validation + HTML validation + link checking
- May skip external links on Windows without libcurl
- Use before pushing significant changes

**Development Server:**

```bash
./script/dev
# or
bundle exec jekyll serve
```

- Live reload for quick iteration
- Preview changes immediately
- Best for content updates

## Iteration Mindset

### Content-First Approach

- **Ship content quickly** - Fix issues iteratively
- **Don't block on perfect** - Optimize images/assets later
- **Focus on readability** - Structure can be refined
- **Keep it fresh** - Portfolios benefit from regular updates

### Experimentation-Friendly

- ✅ Try new Jekyll features - revert if needed
- ✅ Test new includes/components incrementally
- ✅ A/B test layouts by creating new files
- ✅ Use git branches for major redesigns
- ✅ Direct edits for content updates

### Safe Experimentation

- Use git branches for experiments
- Test locally before pushing
- Keep commits small and focused
- Document what worked/didn't work

## Common Update Patterns

### Adding a New Project

1. Create post file: `_posts/YYYY-MM-DD-project-name.markdown`
2. Add images to `img/portfolio/`
3. Set front matter (title, img, thumbnail, etc.)
4. Preview in browser
5. Quick build test
6. Commit

### Updating Existing Project

1. Edit post markdown file
2. Update images if needed
3. Preview changes
4. Visual check sufficient (no full test needed)
5. Commit

### Modifying Site Structure

1. Edit includes/layouts
2. Build and test thoroughly
3. Check all pages visually
4. Run full test suite
5. Commit with clear message

### Updating Site Configuration

1. Edit `_config.yml`
2. Rebuild site: `bundle exec jekyll build`
3. Test site functionality
4. Run full test suite
5. Commit

## Git Workflow

### Commit Strategy

- **Small, focused commits** - One concern per commit
- **Clear messages** - Describe what changed and why
- **Content updates** - Commit frequently
- **Structural changes** - Test thoroughly before committing

### Branch Strategy

- **Main branch** - Production-ready content
- **Feature branches** - Major redesigns or experiments
- **Direct commits** - Content updates and minor fixes

### Before Pushing

1. **Pre-commit hook** - Automatically runs `bundle exec rake test:build` (can skip with `--no-verify`)
2. For structural changes: run full test suite manually (`bundle exec rake test`)
3. Visual check in browser
4. Verify no broken links or images
5. **CI verification** - GitHub Actions runs `./script/verify` on push/PR (catches issues automatically)

## Error Handling

### Build Failures

- **Check YAML front matter** - Most common issue
- **Verify file paths** - Images, includes, layouts
- **Check syntax** - Liquid tags, markdown formatting
- **Read error messages** - Jekyll provides helpful context

### Common Issues

- **Missing images** - Check paths are relative to site root
- **Broken includes** - Verify file exists in `_includes/`
- **Layout errors** - Check front matter `layout:` field
- **Plugin errors** - Verify plugin syntax and `_config.yml` settings

### Quick Fixes

- Most issues are quick fixes - don't over-engineer
- Check existing working examples
- Use git to revert if needed
- Document solutions for future reference

## Performance Considerations

### Iterative Optimization

- **Start simple** - Get content live first
- **Optimize later** - Images, assets, performance
- **Measure impact** - Optimize what matters
- **Don't premature optimize** - Focus on content quality

### When to Optimize

- Site feels slow (measure first)
- Images are clearly too large
- Build times are slow
- User feedback indicates issues

## Documentation

### Update Documentation When

- Adding new features or patterns
- Changing site structure significantly
- Discovering useful patterns
- Fixing common issues

### Keep Documentation

- Simple and focused
- Examples over explanations
- Up-to-date with current patterns
- Accessible to future you
