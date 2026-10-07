# Ángel Molina — Personal portfolio

Person-first portfolio with an animated cosmic scene, Spanish/English content, dark/light/system themes, responsive navigation, real CV downloads, experience and selected engineering projects.

**Website:** https://angel-valdezzz.github.io/

## Development

```bash
npm ci
npm run dev -- --host 0.0.0.0 --port 4173
npm run build
npm run test:sites
```

Node.js 22. React and Vite. Phosphor icons. Self-hosted Cormorant Garamond and Inter fonts. Generated cosmic artwork. No backend or analytics.

## Content

Personal content and project descriptions live in `src/App.jsx`; styles in `src/styles.css`. Assets and both CV languages are under `public/`. Public source references: [profile README](https://github.com/angel-valdezzz/angel-valdezzz) and individual project READMEs. Experience dates use the author's existing CV. SDET is a career direction, not a claimed current title.

The local interactive demos are explicitly illustrative and use fictional data; links open actual project reports and documentation. They do not execute Robot Framework, Selenium, or HTTP requests.

## Deployment

A push to main builds and deploys `dist/client` to GitHub Pages through `.github/workflows/pages.yml`. Pages source must be **GitHub Actions**. The build produces static `/es/` and `/en/` routes, social metadata, a sitemap and robots.txt.

Motion can be paused and respects reduced-motion preferences. Theme selection is stored locally in the browser.
