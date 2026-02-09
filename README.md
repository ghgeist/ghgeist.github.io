# Grant Geist's Portfolio

Welcome to my portfolio website repository! This site showcases my projects and professional experience.

## Features
- Responsive design for optimal viewing on all devices.
- Interactive elements to enhance user experience.
- Easy navigation to different sections and projects.
- Built with Jekyll.

## Getting Started

### Prerequisites
- Ruby installed (for Jekyll)
- Bundler gem installed

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ghgeist.github.io.git
   ```
2. Navigate to the project directory:
   ```
   cd ghgeist.github.io
   ```
3. Install dependencies:
   ```
   bundle install
   npm install
   ```

### Running the Site Locally
Start the Jekyll server:
```
bundle exec jekyll serve
```
Then, open your browser and go to [http://localhost:4000](http://localhost:4000).

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

### Linting

This project uses linting tools to maintain code quality across CSS, JavaScript, and Markdown files.

**Run all linters:**
```bash
npm run lint
# or
bundle exec rake lint
```

**Run individual linters:**
- `npm run lint:css` or `bundle exec rake lint:css` - Lint CSS/SCSS files
- `npm run lint:js` or `bundle exec rake lint:js` - Lint JavaScript files
- `npm run lint:md` or `bundle exec rake lint:md` - Lint Markdown files

**Auto-fix issues:**
```bash
npm run lint:fix
# or
bundle exec rake lint:fix
```

**Combine with testing:**
```bash
bundle exec rake lint test
```

Linters are configured to ignore minified files and vendor libraries. Configuration files:
- `.stylelintrc.json` - CSS/SCSS linting rules
- `.eslintrc.json` - JavaScript linting rules
- `.markdownlint.json` - Markdown linting rules

## Project Structure

```
.
├── _config.yml          # Jekyll configuration file
├── _includes            # HTML includes for modular sections
├── _layouts             # HTML layouts for pages
├── _posts               # Blog posts (if any)
├── assets               # CSS, JavaScript, images, etc.
├── README.md            # This file
└── [additional files and directories] 
```

## License
This project is licensed under the [MIT License](LICENSE).

## Open Graph Image
Default OG image path is `/assets/og/og-default.jpg`. If missing, create a 1200x630 JPEG named `og-default.jpg`.