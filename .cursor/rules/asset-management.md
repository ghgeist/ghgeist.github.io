---
description: Image and asset organization patterns for portfolio site
globs: ["img/**/*", "assets/**/*", "css/**/*"]
alwaysApply: false
---

# Asset Management for Portfolio Site

## Directory Structure

### `img/` - Image Assets
```
img/
├── portfolio/          # Portfolio project images
│   ├── project_name.png
│   └── project_name_thumbnail.png
├── about/             # About section images
├── logos/             # Logo images
└── header_v*.jpg      # Site header images
```

### `assets/` - Larger Assets
```
assets/
├── og/                # Open Graph images
│   └── og-default.jpg
├── rhino/             # 3D model files
│   ├── compressed/
│   └── raw/
└── *.pdf              # PDF documents
```

## Image Naming Conventions

### Portfolio Images
- **Full image**: `project_name.png` (e.g., `embodied_ai.png`)
- **Thumbnail**: `project_name_thumbnail.png` (e.g., `embodied_ai_thumbnail.png`)
- Use snake_case consistently
- Keep base name matching between full and thumbnail

### Header Images
- Use version suffix: `header_v2.jpg`, `header_v3.jpg`
- Increment version number for new headers
- Keep old versions for reference

### About Section Images
- Use descriptive names: `ai.png`, `new_york.png`
- Group by theme or category
- Use snake_case

## Image Requirements

### Portfolio Images
- **Full image**: Displayed in modal, larger size
- **Thumbnail**: Displayed in grid, smaller size (typically 400px max width)
- **Format**: PNG for graphics, JPEG for photos
- **Optimization**: Compress but don't block on perfect assets initially

### Open Graph Image
- **Path**: `/assets/og/og-default.jpg`
- **Size**: 1200x630 pixels (standard OG image size)
- **Format**: JPEG
- **Purpose**: Social media sharing preview
- Update for major site changes

### Thumbnail Guidelines
- Keep aspect ratio consistent for grid display
- Max width: ~400px (check CSS for exact size)
- File size: Optimize for web (aim for <200KB)
- Quality: Balance file size and visual quality

## Asset Organization Patterns

### By Category
- Group related images in subdirectories
- `img/portfolio/` for project images
- `img/about/` for about section
- `img/logos/` for logo images

### By Type
- Keep compressed versions separate: `assets/rhino/compressed/`
- Keep raw versions: `assets/rhino/raw/`
- Use descriptive subdirectories

### Version Management
- Use version suffixes: `header_v2.jpg`, `header_v3.jpg`
- Keep old versions for reference
- Update references when switching versions

## Image Optimization

### Iterative Approach
- **Start with readable images** - Don't block on perfect optimization
- **Optimize later** - When you have time or need arises
- **Measure impact** - Optimize what matters most
- **Use tools** - Image optimization tools when ready

### When to Optimize
- Images are clearly too large (>500KB)
- Page load times are slow
- User feedback indicates issues
- Before major deployments

### Optimization Tools
- Use image compression tools
- Consider WebP format for modern browsers
- Keep originals for future re-optimization
- Test quality after compression

## Asset References

### In Front Matter
```yaml
img: project_name.png              # Filename only
thumbnail: project_name_thumbnail.png
```
- Reference filename only (not full path)
- Jekyll resolves path from `img/portfolio/`

### In HTML/Includes
```liquid
{{ 'img/portfolio/' | append: post.img | relative_url }}
```
- Use `relative_url` filter for proper path resolution
- Works with baseurl configuration

### In CSS
```css
background-image: url('/img/header_v2.jpg');
```
- Use absolute paths from site root
- Start with `/` for root-relative paths

## Best Practices

### File Naming
- ✅ Use snake_case: `embodied_ai.png`
- ✅ Be descriptive: `urbanism_project.png` not `project1.png`
- ✅ Match patterns: `project_name_thumbnail.png`
- ✅ Use version suffixes: `header_v2.jpg`

### Organization
- ✅ Group by category: `img/portfolio/`, `img/about/`
- ✅ Keep related assets together
- ✅ Use subdirectories for organization
- ✅ Don't over-organize - simple is better

### Optimization
- ✅ Start with readable images
- ✅ Optimize iteratively
- ✅ Keep originals for re-optimization
- ✅ Test quality after compression

### References
- ✅ Use relative URLs in Jekyll
- ✅ Use `relative_url` filter in Liquid
- ✅ Reference filenames in front matter
- ✅ Use absolute paths in CSS

## Common Patterns

### Adding New Project Images
1. Create full image: `img/portfolio/project_name.png`
2. Create thumbnail: `img/portfolio/project_name_thumbnail.png`
3. Reference in post front matter:
   ```yaml
   img: project_name.png
   thumbnail: project_name_thumbnail.png
   ```

### Updating Header Image
1. Add new version: `img/header_v4.jpg`
2. Update reference in layout or include
3. Keep old versions for reference
4. Test in browser

### Adding Open Graph Image
1. Create 1200x630 JPEG: `assets/og/og-default.jpg`
2. Update `_config.yml` if path differs
3. Test with social media preview tools

## Iteration-Friendly Guidelines

- **Don't block on perfect assets** - Use placeholder or draft images initially
- **Optimize later** - Focus on content first
- **Keep originals** - For future re-optimization
- **Test incrementally** - Check images as you add them
- **Refactor organization** - When structure becomes unwieldy, not preemptively
