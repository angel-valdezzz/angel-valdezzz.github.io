# Angel Molina — Personal portfolio

Person-first portfolio with a continuously evolving abstract line field, dark styling, English/Spanish content, responsive navigation, real CV downloads, experience and selected engineering projects.

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

Copy and projects: `src/App.jsx`. Layout: `src/styles.css`. Animation: `src/FlowField.jsx`. CV files: `public/cv/`. SDET is a career direction, not a claimed current title.

The local demos use fictional data. Links open real project reports and documentation. Demos do not execute Robot Framework, Selenium or HTTP requests.

## Motion

Canvas renders three-dimensional Lorenz trajectories as fine teal, blue and violet strands. Autonomous rotation and evolving traces continue without mouse movement; pointer input changes the viewing angle smoothly. Mobile stacks the field below the introduction. The pause control preserves the scene and reduced-motion preferences disable continuous motion. Rendering suspends off screen and when the tab is hidden. Animation density is capped for smaller screens.

## Deployment

A push to `main` builds and deploys `dist/client` to GitHub Pages using `.github/workflows/pages.yml`. Root and `/en/` are English; `/es/` is Spanish. The build includes metadata, robots.txt and a sitemap. There is one carefully tuned dark theme.
