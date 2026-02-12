# Grant Geist's Portfolio

Welcome to my portfolio website repository! This site showcases my projects and professional experience.

**Live Site:** [grantgeist.com](https://grantgeist.com)

## Features

- Responsive design for optimal viewing on all devices
- Interactive elements to enhance user experience
- Easy navigation to different sections and projects
- Built with React 18, Vite 6, and Tailwind CSS v4
- Single-page application (SPA) with client-side routing

## Technology Stack

- **React 18** - UI library
- **Vite 6** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **Radix UI** - Accessible component primitives

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ghgeist/ghgeist.github.io.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ghgeist.github.io
   ```

3. Install dependencies:

   ```bash
   npm ci
   ```

### Running the Site Locally

**Quick start:**

```bash
./script/dev
```

This starts the Vite development server with hot module replacement at [http://localhost:5173](http://localhost:5173).

**Manual start:**

```bash
npm run dev
```

**Preview production build:**

```bash
npm run preview
```

### Local Development

**Verification:**

Before pushing changes, run the verification script:

```bash
./script/verify
```

This script:

- Installs dependencies (`npm ci`)
- Runs TypeScript type checking (`npx tsc --noEmit`)
- Builds the production bundle (`npm run build`)

**Verification Configuration:**

See `.verify.yml` for the complete verification contract. This file serves as the single source of truth for what needs to be verified, readable by both humans and AI agents.

**CI/CD:**

GitHub Actions runs full verification on push/PR to catch issues automatically. The workflow:

1. Installs dependencies
2. Runs type checking
3. Runs tests (non-blocking)
4. Builds the production bundle
5. Deploys to GitHub Pages (on push to `main`)

### Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with verbose output (CI mode):

```bash
npm run test:ci
```

Tests use Vitest and are located in `src/test/`. The main test suite is `src/test/smoke.test.tsx`.

### Type Checking

Run TypeScript type checking without building:

```bash
npm run typecheck
# or
npx tsc --noEmit
```

### Linting

This project uses linting tools to maintain code quality across CSS and JavaScript files.

**Run all linters:**

```bash
npm run lint
```

**Run individual linters:**

- `npm run lint:css` - Lint CSS files (Stylelint)
- `npm run lint:js` - Lint JavaScript/TypeScript files (ESLint)

**Auto-fix issues:**

```bash
npm run lint:fix
```

Linters are configured to ignore minified files and vendor libraries. Configuration files:

- `stylelint.config.mjs` - CSS linting rules
- `eslint.config.mjs` - JavaScript/TypeScript linting rules

## Project Structure

```text
.
├── .verify.yml          # Verification configuration (single source of truth)
├── script/              # Development scripts
│   ├── verify           # Verification script
│   └── dev              # Development server script
├── src/                 # Source code
│   ├── app/             # Application code
│   │   ├── App.tsx      # App shell and routes
│   │   ├── components/  # React components
│   │   │   ├── ui/      # UI primitives (Radix-based)
│   │   │   └── ...      # Feature components
│   │   └── projects/    # Project detail pages
│   │       ├── Bantr.tsx
│   │       ├── ReplacementTrap.tsx
│   │       ├── StormSignal.tsx
│   │       └── WalkabilityIndex.tsx
│   ├── styles/          # Global styles
│   │   ├── index.css    # Main stylesheet
│   │   ├── tailwind.css # Tailwind imports
│   │   └── theme.css    # Theme variables
│   ├── test/            # Test files
│   │   ├── setup.ts     # Test setup
│   │   └── smoke.test.tsx
│   └── main.tsx         # Entry point
├── public/              # Static assets
│   ├── 404.html         # SPA routing fallback
│   ├── CNAME            # Custom domain
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/          # Static assets (images, PDFs, 3D models)
│       └── og/          # Open Graph images
├── .github/             # GitHub configuration
│   └── workflows/       # CI/CD workflows
│       └── deploy.yml   # GitHub Actions deployment workflow
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Node dependencies
├── package-lock.json    # Locked dependency versions
├── LICENSE              # MIT License
└── README.md            # This file
```

## Architecture

### Routing

The app uses React Router's `BrowserRouter` for client-side routing. Routes are defined in `src/app/App.tsx`:

- `/` - Homepage
- `/projects/walkability-index` - Walkability Index project
- `/projects/replacement-trap` - Replacement Trap project
- `/projects/bantr` - Bantr project
- `/projects/signal-storm` - Signal Storm project

### GitHub Pages SPA Support

Since GitHub Pages doesn't natively support SPAs, the project includes:

- `public/404.html` - Fallback page that redirects to the SPA
- Redirect decoder in `index.html` - Handles deep links correctly

### Component Structure

- **Shared components**: `src/app/components/`
- **Project pages**: `src/app/projects/`
- **UI primitives**: `src/app/components/ui/` (Radix UI-based)
- **Global styles**: `src/styles/`

## Deployment

The site is deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). The workflow:

1. Builds the production bundle to `dist/`
2. Deploys to GitHub Pages on push to `main`

Static deploy-critical files in `public/`:

- `CNAME` - Custom domain configuration
- `404.html` - SPA routing fallback
- `favicon.ico` - Site favicon
- `robots.txt` - Search engine directives

## Contact
- **Website:** [grantgeist.com](https://grantgeist.com)
- **LinkedIn:** [linkedin.com/in/grantgeist](https://www.linkedin.com/in/grantgeist)
- **Substack:** https://substack.com/@grantgeist
- **GitHub:** [github.com/ghgeist](https://github.com/ghgeist)

## License

This project is licensed under the [MIT License](LICENSE).

## Open Graph Image

Default OG image path is `/assets/og/og-default.jpg`. If missing, create a 1200x630 JPEG named `og-default.jpg`.
