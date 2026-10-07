# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Portfolio decisions
- Person-first selected design: generated_images/exec-6ae8dff6-9ee9-4bd4-8438-318634415dcf.png.
- Preserve original option 2 palette: green/teal, blue and violet. Do not replace with only purple/blue.
- Centered serif introduction: Hola, soy Ángel. Keep La curiosidad es mi punto de partida.
- Do not imply mathematics or robotics expertise. Pillars: Desarrollo, Automatización, Aprendizaje.
- Actual employment: Senior Tester at EPAM Neoris, client AXA; SDET is a career direction.
- Animated cosmos; stars, parallax, slow orbital movement, pause and reduced-motion support.
- ES/EN, dark/light/system, responsive, real CV downloads, projects appear after personal introduction.
