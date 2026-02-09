# Grant Geist's Portfolio

Welcome to my portfolio website repository! This site showcases my projects and professional experience.

**Live Site:** [grantgeist.com](https://grantgeist.com)

## Features
- Responsive design for optimal viewing on all devices.
- Interactive elements to enhance user experience.
- Easy navigation to different sections and projects.
- Built with Jekyll.

## Getting Started

### Prerequisites
- Ruby >= 2.6.0 (for Jekyll 4.3.0)
- Bundler gem installed (version 2.5.23 recommended, see `.verify.yml`)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/ghgeist/ghgeist.github.io.git
   ```
2. Navigate to the project directory:
   ```
   cd ghgeist.github.io
   ```
3. Install dependencies:
   ```
   bundle install
   ```

### Running the Site Locally

**Quick start:**
```bash
./script/dev
```
This starts the Jekyll server with live reload at [http://localhost:4000](http://localhost:4000).

**Manual start:**
```bash
bundle exec jekyll serve
```

### Local Development

**Verification:**
Before pushing changes, run the verification script:
```bash
./script/verify
```

This script:
- Checks Bundler version compatibility
- Installs dependencies to `vendor/bundle` (isolated from global gems)
- Runs the test suite (`bundle exec rake test`)
- Builds the Jekyll site with trace output

**Automated Safeguards:**
- **Pre-commit hook**: Automatically runs `bundle exec rake test:build` before each commit (skip with `git commit --no-verify` if needed)
- **CI/CD**: GitHub Actions runs full verification (`./script/verify`) on push/PR to catch issues automatically

**Verification Configuration:**
See `.verify.yml` for the complete verification contract. This file serves as the single source of truth for what needs to be verified, readable by both humans and AI agents.

### Testing
Run the test suite to validate builds and check HTML/links:
```
bundle exec rake test
```

Or run individual test tasks:
- `bundle exec rake test:build` - Build validation only (always works)
- `bundle exec rake test:html` - HTML validation and link checking (requires build)
- `bundle exec rake test:all` - Run all tests

**Note for Windows users**: HTML validation requires libcurl. If libcurl is not available, the test suite will skip HTML validation and only run build validation. This is sufficient for catching most common errors during development.

## Project Structure

```
.
├── _config.yml          # Jekyll configuration file
├── .verify.yml          # Verification configuration (single source of truth)
├── script/              # Development scripts
│   ├── verify           # Verification script
│   └── dev              # Development server script
├── _includes/           # HTML includes for modular sections
│   ├── header.html      # Site header and navigation
│   ├── footer.html      # Site footer
│   ├── portfolio_grid.html  # Portfolio grid display
│   ├── about.html       # About section
│   ├── contact.html     # Contact form and links
│   └── skills.html      # Skills section
├── _layouts/            # HTML layouts for pages
│   └── default.html     # Default page layout
├── _posts/              # Portfolio project posts
├── _plugins/            # Jekyll plugins
├── _sass/               # Sass stylesheets
├── assets/              # Static assets (images, PDFs, 3D models)
│   └── og/              # Open Graph images
├── img/                 # Image assets
│   ├── portfolio/       # Portfolio project images
│   └── about/           # About section images
├── js/                  # JavaScript files
├── css/                 # CSS files
├── Rakefile             # Rake tasks for testing
├── Gemfile              # Ruby dependencies
├── Gemfile.lock         # Locked dependency versions
├── .github/             # GitHub configuration
│   └── workflows/       # CI/CD workflows
│       └── verify.yml   # GitHub Actions verification workflow
├── .git/hooks/          # Git hooks
│   └── pre-commit       # Pre-commit validation hook
├── LICENSE              # MIT License
└── README.md            # This file
```

## Contact

- **Email:** granthgeist@gmail.com
- **Website:** [grantgeist.com](https://grantgeist.com)
- **LinkedIn:** [linkedin.com/in/grantgeist](https://www.linkedin.com/in/grantgeist)
- **X (Twitter):** [@grantgeist](https://x.com/grantgeist)
- **GitHub:** [github.com/ghgeist](https://github.com/ghgeist)

## License

This project is licensed under the [MIT License](LICENSE).

## Open Graph Image

Default OG image path is `/assets/og/og-default.jpg`. If missing, create a 1200x630 JPEG named `og-default.jpg`.