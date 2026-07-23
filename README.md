# Erfan Mohammadi — Portfolio

A lightweight, three-language (fa/en/de) personal portfolio built with plain
React + Vite — no framework beyond React itself. Projects, skills, and
tutorials sections start empty on purpose; fill them in whenever you're ready.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## Project structure

```
src/
  components/   Navbar, Footer, LanguageSwitcher, EmptyState
  pages/        Home, About, Projects, Skills, Tutorials, Contact, NotFound
  i18n/         translations.js (fa/en/de strings) + LanguageContext
  data/         projects.js, skills.js, tutorials.js — currently empty
  styles/       global.css (all styling, one file, CSS variables for theme)
```

## Filling in content later

- **Projects** → add entries to `src/data/projects.js`
- **Skills** → add entries to `src/data/skills.js`
- **Tutorials** → add entries to `src/data/tutorials.js`
- **Contact links** → edit the `CONTACT_LINKS` array at the top of
  `src/pages/Contact.jsx`
- **Text/translations** → edit `src/i18n/translations.js`

Each data file has a commented example of the shape it expects.

## Language routing

Every page lives under a language prefix: `/fa`, `/en`, `/de`
(e.g. `/en/projects`). Visiting `/` redirects to `/fa`. Persian pages
automatically render right-to-left.

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which builds and deploys
automatically on every push to `main`. One-time setup:

1. In the repo: **Settings → Pages → Build and deployment → Source** → select
   **GitHub Actions** (not "Deploy from a branch").
2. Push to `main` — the workflow builds the site and publishes it.
3. Your custom domain is already wired up via `public/CNAME`
   (`erfanmohammadi.ir`), which Vite copies into the build output automatically.

## Build manually

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```
