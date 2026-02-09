---
description: Jekyll structure conventions for includes, layouts, plugins, and site configuration
globs: ["_includes/**/*", "_layouts/**/*", "_plugins/**/*", "_config.yml", "_sass/**/*"]
alwaysApply: false
---

# Jekyll Structure Conventions

## Directory Structure

### `_includes/` - Reusable Components
- HTML fragments included in layouts
- Use snake_case naming: `portfolio_grid.html`, `contact_form.html`
- Keep components focused and reusable
- Examples: `header.html`, `footer.html`, `portfolio_grid.html`, `modals.html`

**Best Practices:**
- Use Jekyll includes (`{% include file.html %}`) over duplicating HTML
- Pass data through site variables or page front matter
- Keep includes modular - one concern per file

### `_layouts/` - Page Templates
- Base templates for different page types
- `default.html` is the main layout
- Use `layout: default` in front matter
- Create new layouts for different page types if needed

**Layout Pattern:**
```html
<!DOCTYPE html>
<html>
  {% include head.html %}
  <body>
    {% include header.html %}
    <main>{{ content }}</main>
    {% include footer.html %}
    {% include js.html %}
  </body>
</html>
```

### `_plugins/` - Custom Jekyll Plugins
- Ruby plugins for site-specific functionality
- Use snake_case naming: `hex_to_rgb.rb`
- Example: `hex_to_rgb.rb` converts hex colors to RGB

### `_sass/` - Stylesheets
- Sass partials for styling
- Imported in main stylesheet
- Use modular Sass structure

### `_config.yml` - Site Configuration
- Site-wide settings and metadata
- Single source of truth for site configuration
- Don't hardcode values - use `_config.yml` variables

**Key Configuration:**
```yaml
title: Grant Geist
url: "https://grantgeist.com"
baseurl: ""
timezone: Europe/Berlin
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
```

## Jekyll Conventions

### Front Matter
- Required for posts and pages
- YAML format between `---` delimiters
- Use consistent field names across similar content

### Liquid Templating
- Use `{{ variable }}` for output
- Use `{% tag %}` for logic
- Use `{% include file.html %}` for includes
- Use `{% for item in collection %}` for loops

### Data Files (`_data/`)
- Use for structured, reusable data
- YAML, JSON, or CSV format
- Access via `site.data.filename.key`
- Example: `_data/template.yml` for site template data

### Relative URLs
- Use `{{ 'path/to/file' | relative_url }}` filter
- Works regardless of baseurl configuration
- Example: `{{ 'img/portfolio/image.png' | relative_url }}`

## Iteration-Friendly Patterns

### Adding New Components
1. Create include file in `_includes/`
2. Add to layout where needed: `{% include new_component.html %}`
3. Test incrementally - don't refactor everything at once

### Experimenting with Structure
- ✅ Try new Jekyll features (collections, data files) - revert if needed
- ✅ Test new includes/components without breaking existing content
- ✅ A/B test different layouts by creating new layout files
- ✅ Use git branches for major redesigns, direct edits for content updates

### Content-First Approach
- Focus on content quality over perfect structure
- Refactor structure later if needed - content is portable
- Don't over-engineer - simple markdown files are easy to migrate
- Keep includes organized but don't stress perfect folder structure initially

## Common Patterns

### Portfolio Grid
- Uses `site.posts` collection
- Loops through posts: `{% for post in site.posts %}`
- Displays thumbnails and titles
- Links to modals via `modal-id`

### Modals
- One modal per project
- ID format: `portfolioModal{{ post.modal-id }}`
- Contains full project description and links
- Uses Bootstrap modal structure

### Site Sections
- Header: Navigation and site title
- Portfolio: Grid of projects
- About: Personal information
- Contact: Contact form and links
- Skills: Technology skills display

## Validation and Error Prevention

### YAML Front Matter Validation
- **Required fields**: Check that required front matter fields are present
- **Syntax**: Ensure proper YAML indentation (2 spaces, not tabs)
- **Quotes**: Use quotes for strings with special characters or colons
- **Lists**: Use proper YAML list syntax (`- item` or `[item1, item2]`)
- **Common errors**: Missing closing `---`, incorrect indentation, unquoted strings with colons

**Quick validation:**
- Run `bundle exec jekyll build --trace` to catch YAML errors early
- Check for missing required fields before committing
- Validate YAML syntax in your editor if possible

### Liquid Template Validation
- **Syntax**: Ensure proper Liquid tag syntax `{% tag %}` and `{{ variable }}`
- **Filters**: Use correct filter syntax: `{{ variable | filter }}`
- **Includes**: Verify include paths exist: `{% include file.html %}`
- **Loops**: Check loop syntax: `{% for item in collection %}`

**Common errors:**
- Missing closing tags: `{% if %}` without `{% endif %}`
- Incorrect filter syntax: `{{ var |filter }}` (missing space)
- Broken include paths: File doesn't exist in `_includes/`
- Undefined variables: Referencing variables that don't exist

### Early Error Detection
- **Before committing**: Run `bundle exec rake test:build` (catches syntax errors)
- **In editor**: Use YAML/Liquid syntax highlighting to spot errors visually
- **Pre-commit hook**: Automatically runs build validation (can skip with `--no-verify`)
- **CI**: GitHub Actions runs full verification on push/PR

### Quick Fixes
- **YAML errors**: Usually indentation or missing quotes - check error message line number
- **Liquid errors**: Check for missing closing tags or typos in variable names
- **Include errors**: Verify file exists in `_includes/` directory
- **Build failures**: Read Jekyll error output - it's usually specific about the issue

## Best Practices

- **Modularity**: Keep includes focused and reusable
- **DRY**: Use includes instead of duplicating HTML
- **Configuration**: Store settings in `_config.yml`, not hardcoded
- **Flexibility**: Experiment with structure - Jekyll is forgiving
- **Iteration**: Make small changes, test, iterate
- **Validation**: Catch syntax errors early with build validation
