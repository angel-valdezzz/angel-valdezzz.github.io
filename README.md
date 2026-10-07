# Angel Molina — Personal portfolio

Professional QA Automation / SDET portfolio with a navy and charcoal palette, warm gold accents, English/Spanish content, responsive navigation, real CV downloads and featured projects before compact experience.

**Website:** https://angel-valdezzz.github.io/

## Development

```bash
npm ci
npm run dev -- --host 0.0.0.0 --port 4173
npm run build
npm run test:sites
```

Node.js 22. React and Vite. Phosphor icons and self-hosted Inter fonts. No backend or analytics.

## Content

Layout and introduction: `src/App.jsx`. Project data and interactive demos: `src/PortfolioContent.jsx`. Styles: `src/styles.css`. CV files: `public/cv/`. The hero uses QA Automation Engineer · SDET; experience retains the actual Senior Tester and Junior Tester titles.

The local demos use fictional data. Links open real project reports and documentation. Demos do not execute Robot Framework, Selenium or HTTP requests.

## Motion

Native page scrolling shifts the background from navy to charcoal and a subtle warm dark tone. Buttons use restrained gold gradients, a 2px hover lift and a fine rotating border highlight on hover or keyboard focus. The footer pause control and operating-system reduced-motion preference disable effects. Scroll updates are passive and batched with requestAnimationFrame; no canvas or continuous background animation is loaded.

## Deployment

A push to `main` builds and deploys `dist/client` to GitHub Pages using `.github/workflows/pages.yml`. Root and `/en/` are English; `/es/` is Spanish. The build includes metadata, robots.txt and a sitemap. There is one carefully tuned dark theme.
