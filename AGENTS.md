# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Portfolio decisions
- Person-first selected design: generated_images/exec-6ae8dff6-9ee9-4bd4-8438-318634415dcf.png.
- Preserve original option 2 palette: green/teal, blue and violet. Do not replace with only purple/blue.
- Centered serif introduction: Hola, soy Angel. Keep La curiosidad es mi punto de partida.
- Do not imply mathematics or robotics expertise. Pillars: Desarrollo, Automatización, Aprendizaje.
- Actual employment: Senior Tester at EPAM Neoris, client AXA; SDET is a career direction.
- Animated cosmos; stars, parallax, slow orbital movement, pause and reduced-motion support.
- ES/EN, dark/light/system, responsive, real CV downloads, projects appear after personal introduction.

## Motion revision approved October 6, 2026
- Name is Angel, without accent, throughout site copy and metadata. Existing CV files remain unchanged.
- English is default at root; Spanish remains /es/.
- Replace superficial image translation with visibly flowing nebula shaders, independent orbiting planets and rotating Earth surface/clouds. Preserve teal/green-blue-violet palette, serif personal introduction and readable text.
- Gravitational cursor lens, magnetic buttons, scroll reveals and project depth. All motion must honor pause and reduced motion; mobile uses autonomous motion and touch response.

## Current redesign (supersedes earlier visual and motion decisions)
- Selected Flow Studio, first displayed reference: /workspace/scratch/e971ddb20d52/generated_images/exec-2b08855a-d9b4-49bd-9bca-644a3dd894a8.png.
- Dark only. Remove theme selector. Preserve teal/green, blue and violet.
- Large sans-serif left-aligned personal greeting, animated abstract fine lines to the right. No planets, Earth, space photos or nebula.
- User explicitly requires real continuous runtime animation and pointer response; a static generated raster is insufficient. Canvas trajectories are the intended runtime artwork.
- Mobile keeps copy above animation, with no overlap, accessible pause and reduced-motion support.

## Professional positioning
- Introduce QA Engineer, test automation, and Python tooling in both hero languages. SDET is the next career step, not the current employment title. Keep the personal headline and current visual design.

## Approved professional portfolio — October 7, 2026
- This decision supersedes every earlier visual, palette and animation direction above.
- Source of truth: the approved interactive preview at /workspace/portfolio-scroll.html, based on the third sober visual option.
- Dark navy/charcoal with warm sand/gold accents. Header A.M.; Angel Molina appears once as the main heading, without an accent.
- Hero subtitle: QA Automation Engineer · SDET. Retain actual employment titles Tester Sr / Senior Tester and Tester Jr / Junior Tester.
- Three featured projects precede compact experience and contact. Preserve English at root, Spanish at /es/, real CV downloads, project demos, technical case details and repository/documentation links.
- Native page scrolling changes the background from navy to charcoal to a subtle warm dark tone. No internal scrolling frame in the published site.
- Subtle gold button gradients, 2px hover lift and a thin rotating light on button borders. Honor reduced motion and provide a pause control.
- No planets, nebulas, cursor lens, large canvas art, competency column or generic service landing page presentation.
- GitHub Pages remains the hosting. Publish via the existing main-branch workflow after build, tests and browser QA pass.
