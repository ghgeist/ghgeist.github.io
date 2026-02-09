---
description: Portfolio project content patterns and front matter conventions for Jekyll posts
globs: ["_posts/**/*.markdown", "_posts/**/*.md"]
alwaysApply: false
---

# Portfolio Project Content Patterns

## Adding New Portfolio Projects

Create new project posts in `_posts/` directory. Projects automatically appear in the portfolio grid - no manual registration needed.

### File Naming
- Format: `YYYY-MM-DD-project-name.markdown` or `.md`
- Use project completion/publication date (not necessarily today)
- Use descriptive, snake_case names: `2024-07-01-urbanism-project.markdown`

### Front Matter Pattern

**Required fields:**
```yaml
---
title: Project Name                    # Display title
subtitle: Brief category/tagline        # Shown under title in grid
layout: default                         # Use default layout
modal-id: [unique number]               # Increment from highest existing modal-id
date: YYYY-MM-DD                       # Project date
img: project_image.png                  # Full image filename in img/portfolio/
thumbnail: project_thumbnail.png         # Thumbnail filename in img/portfolio/
alt: Descriptive alt text               # Accessibility description
---
```

**Optional fields (add as needed):**
```yaml
tags: [Tag1, Tag2, Tag3]               # For filtering/categorization
category: Category Name                 # Project category
project: path/to/file.pdf               # PDF or external project link
github: https://github.com/user/repo    # GitHub repository URL
demo: https://live-demo-url.com        # Live demo URL
description: |                          # Markdown-supported description
  Project description here...
  
  #### Key highlights:
  
  - Feature 1
  - Feature 2
tools_used:                             # Array of tools/technologies
  - Tool 1
  - Tool 2
```

### Examples

**Design Project:**
```yaml
---
title: Embodied A.I.
subtitle: Product Design
layout: default
modal-id: 2
date: 2024-05-01
img: embodied_ai.png
thumbnail: embodied_ai_thumbnail.png
alt: Embodied A.I. product design
tags: [Product Design, AI, Embodied A.I.]
project: assets/risd_capstone.pdf
demo: https://sketchfab.com/3d-models/embodied-ai-fc2d32e53e074a6c8963db94fa0c63e4
category: Product Design
description: |
  An exploration into the future of embodied artificial intelligence...
tools_used:
  - Rhino
  - Adobe Photoshop
---
```

**Technical Project:**
```yaml
---
title: Exploring the National Walkability Index
subtitle: Data Analysis & Urban Planning
layout: default
modal-id: 3
date: 2024-07-01
img: urbanism_project.png
thumbnail: urbanism_project_thumbnail.png
alt: Urban walkability heatmap visualization
tags: [Python, GIS, Data Visualization]
github: https://github.com/ghgeist/urbanism_project
demo: https://urbanismproject.streamlit.app/
category: Data Analytics
description: |
  A data-driven exploration of walkability patterns...
tools_used:
  - Python (geopandas, pandas)
  - Folium for interactive mapping
---
```

## Content Guidelines

### Description Field
- Use markdown formatting for readability
- Include headers (`#### Key highlights:`)
- Use bullet lists for features
- Keep concise but informative
- Focus on what makes the project interesting

### Image Requirements
- Full image: `img/portfolio/project_name.png` (referenced as `img:`)
- Thumbnail: `img/portfolio/project_name_thumbnail.png` (referenced as `thumbnail:`)
- Use descriptive, snake_case filenames
- Images should be optimized but don't block on perfect assets initially

### Iteration-Friendly Practices
- ✅ Experiment with new front matter fields - Jekyll is flexible
- ✅ Update existing projects anytime - just edit the markdown file
- ✅ Reorder projects by changing dates (newest first by default)
- ✅ Add/remove optional fields (github, demo, project) as needed
- ✅ Use markdown in descriptions for rich formatting
- ✅ Update images anytime - just change `img` and `thumbnail` paths

## Modal ID Management

- Each project needs a unique `modal-id` number
- Check existing posts to find the highest `modal-id`
- Increment by 1 for new projects
- Example: If highest is `modal-id: 3`, new project uses `modal-id: 4`

## Project Ordering

- Projects display newest first (by date)
- To reorder: change the `date` field in front matter
- Use actual project dates, not today's date
