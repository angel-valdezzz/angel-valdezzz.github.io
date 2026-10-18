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

## Approved audit improvements — October 7, 2026
- Preserve the current sober navy/charcoal/gold design; make motion more perceptible without decorative continuous effects.
- Show authentic project output previews and direct real-example links. Keep conceptual demos secondary and clearly labeled.
- One-time scroll entrances (roughly 520 ms / 18 px), gold divider draws, brighter one-pass button border light, restrained preview hover lift.
- Active-section navigation, compact mobile introduction, coherent mobile demo tabs with complete arrow/Home/End keyboard support.
- Contact headline positions quality engineering rather than freelance services. Accessible motion control also lives in the header; pause and system reduced motion must keep all content visible.

## Experience color adjustment — October 7, 2026
- Job titles (Tester Sr / Tester Jr and English equivalents) use the existing sand/gold accent. Keep the main Experience heading white and company, dates, and description in their current neutral colors. No gradients or animation on job titles.

## Approved interaction refinements — October 7, 2026
- Hero focus: maintainable automation, test architecture, reusable tools (ES and EN). Replace "Evidencia clara" / "Clear evidence" so reporting does not dominate the positioning.
- Warm gold hover and keyboard-focus feedback on buttons, links, previews, and disclosures. Preserve layout, palette, authentic outputs, and gold experience titles.
- Button border light loops slowly only while hovered or keyboard-focused, and fades when interaction ends; the button itself does not rotate. Gold primary-button gradients gently move during interaction.
- Scroll entrance effects remain one-time. Every motion still honors pause and system reduced motion.

## Approved gallery demo — October 15, 2026
- Supersedes prior visual directions for this demo branch. The main production site is not being published yet.
- Selected visual: the first displayed three-column, nine-project gallery, refined with charcoal #101218, warm white #F2F0EB and violet #B59AFF.
- All seven tools and both Robot Framework web/API practice projects have equal prominence. No featured Evidence Reporter, hidden secondary collection, sales language, location or CV-like timeline.
- Preserve the brief greeting "Hi, I'm Angel." / "Hola, soy Angel.", personal tone and compact About/contact footer.
- Header includes direct GitHub icon/link, real language-specific CV download, EN/ES and motion control.
- React + Vite + Motion for React. Purposeful entrances, hover response and accessible project details. Pause and system reduced motion must leave content available.
- Use actual existing output screenshots and source excerpts from the repositories. Never present generated code or simulated outcomes as real test executions.
- Senior Tester / Tester Sr is the actual role. SDET is the next career step.
- README work follows selection and integration of the portfolio.
- Local shell is currently blocked by helper_sandbox_lock_failed. Use GitHub Actions checks on this isolated branch, with screenshots and a self-contained demo artifact; do not claim manual visual QA or live preview until actually available.

## Demo publication — October 16, 2026
- User authorized deploying the gallery demo through GitHub Actions to view it in the browser.
- Publish the standalone gallery under /demo/ alongside the current portfolio. Keep the current main page until the user approves replacing it.
- Embedded demos retain their current URL path when changing language, including after refresh.

## Motion correction approved — October 16, 2026
- User rejected the gallery as too static and pointed out the missing gradient. React alone does not satisfy the agreed design.
- Add a visible flowing violet/blue/teal gradient, continuous autonomous geometric animation on desktop and mobile, pointer-responsive project depth, staggered scroll reveals and a spatially connected detail opening/closing.
- Preserve the nine equal projects and existing content/layout. Interactive tool demos are a future improvement, not this pass.
- Pause and system reduced motion stop continuous animation and pointer/scroll motion. Canvas rendering stops when hidden/offscreen. Verify actual pixels/time changes, not only the presence of animation code.
- Deploy the updated candidate under /demo/ through the existing Pages workflow after checks pass.

## Programmed star ceiling approved — October 16, 2026
- User approved a Rolls-Royce-style star ceiling: small luminous points drawn with code, slow drift, gentle twinkle and depth. A translated image is not acceptable.
- Add stars above the retained flowing gradient while preserving the cube, gradient greeting, card depth, entrances and detail transitions. Desktop adds light pointer/scroll parallax; mobile is autonomous.
- English remains the default without a lang query. Use English when sharing the new demo link.
- Use the same pause and system reduced-motion controls, keep text legible and suspend the star canvas in hidden tabs. No planets, tunnel or extra visual theme.

## Star visibility and autonomous movement correction — October 16, 2026
- User found the first stars too faint and cursor-following unnatural. Star positions must depend only on elapsed time, never cursor or page scroll. This supersedes the star-field parallax decision above.
- Increase point brightness/size moderately, gently increase density and make autonomous drift clearly perceptible without interaction. Keep soft twinkle and varied depth/speeds.
- Render stars above the gradient's darkening veil. Keep all other approved motion and English default unchanged; pointer response of project cards and the hero cube is retained.

## Navigation and galactic gradient approved — October 16, 2026
- User approved a grouped translucent nav, brief header entrance, hover feedback and a sliding illuminated active-section indicator.
- Active Projects/About/Contact must follow manual scroll in both directions, preserve explicitly clicked targets, support keyboard/history/language changes and remain clear with motion paused/reduced.
- About and Contact receive distinct compact rows and stronger section headings, resolving the ambiguous shared footer position. Keep all nine equal projects and current personal content.
- Broaden the moving purple/blue/cyan gradient into the visible page, add restrained rose light and reduce the dark veil. Preserve autonomous stars (no cursor/scroll influence on their positions), cube and project interactions.
- English remains default. Publish only the reviewed demo route /demo/ through the existing Pages workflow.

## Quiet navigation and technologies approved — October 16, 2026
- User disliked the capsule/glow navigation. Replace it with integrated text links, color feedback and only a fine sliding underline.
- Menu is Projects / Technologies / About, translated EN/ES. Contact stays clearly visible inside the personal closing and shares About's nav state; no rapid About/Contact switching. Retain old #contact links as an About destination alias.
- Add a compact Technologies & skills section after all nine projects. Only confirmed technologies: Python, Java, Robot Framework, GitHub Actions. Do not list individual packages such as RequestsLibrary or the user's own tools here.
- Capabilities: web test automation, API testing, automation architecture and CI/CD pipelines. Authentic brand icon geometry, visible names, no proficiency ratings.
- Preserve the accepted galaxy gradient, autonomous stars, cube, card/detail interactions, motion controls and English default. Embed icons and notices in the offline demo.

## Interactive technology inventory approved — October 17, 2026
- Supersedes the four-technology limit above. Approved inventory: Python, Java, JavaScript, TypeScript, Robot Framework, Selenium, Playwright, Cypress, Postman, Git, GitHub, GitHub Actions, Docker, Jira, Xray, Confluence and complementary SQL.
- The user's abbreviation pg means Playwright, not PostgreSQL. Do not add PostgreSQL. SQL is basic knowledge from university; Angel can write statements but has not used it regularly since.
- JS/TS Selenium/Playwright practice projects are planned. Identify this scope explicitly and add project links when those projects exist; do not present future demos as completed work.
- Xray is used through Jira to create and execute test cases. Keep descriptions within this stated scope. Docker is basic and Java is language/OOP knowledge.
- Add only GitHub and Xray from the additional suggestions, retaining requested Jira and Confluence. Exclude Poetry, PyPI, MkDocs and Allure from this section; no individual package inventory.
- Each technology/tool has an icon and visible name. Clicking opens one inline detail at a time, with actual usage, a few applications and links to existing related projects when available. Support keyboard activation, Escape/close with focus restoration and live EN/ES changes. No proficiency scores.
- Group by languages/queries, automation/testing, development/execution and management/documentation. Keep SQL's complementary/basic scope explicit in its detail.
- Capabilities summarize web automation, API testing, automation architecture, data-driven testing, testing-tool development and CI test execution, with simple decorative icons and visible text.
- Preserve all nine equally visible projects, existing motion, autonomous stars, gradient, quiet navigation and English default. Publish the reviewed candidate under /demo/; production integration remains pending user review.

## Focus and example-link refinement — October 17, 2026
- Preserve focus restoration after a project closes. The full-card focus outline and focus-driven decorative effects should appear only when the Explore button matches :focus-visible, rather than every :focus-within state. Mouse/touch closing should leave no persistent focus ring; keyboard navigation and Escape retain a visible focus indicator.
- Supersedes future-practice announcements in technology details: omit all coming-soon/planned-example notices, including JS, TS and Playwright. Keep neutral descriptions of knowledge without suggesting unbuilt examples are completed.
- Where no related project exists, omit the project-links block entirely: no placeholder, empty heading, future announcement or fabricated link. Keep Python and other existing related-project links.
- Browser testing found that native :focus-visible can persist when clicking an already focused trigger after keyboard use. Track keyboard/pointer input in the document capture phase and gate card focus decoration by that intent as well as :focus-visible; retain focus restoration and keyboard accessibility.

## Production integration approved — October 17, 2026
- User approved replacing the main portfolio with the current nine-project gallery and all technology/focus refinements. This supersedes the demo-only publishing limitation above.
- Publish directly from main to https://angel-valdezzz.github.io/ with English default and working /en/ and /es/ paths. Preserve real CVs, all projects, technology details and every approved interaction.
- Retire the duplicate /demo/ application: old links redirect to the main page, preserving section hashes and Spanish lang query as /es/.
- Use the main branch source directly in Pages; remove the secondary pinned demo checkout. Verify the deployed build revision, language routes and legacy redirect.
- The demo is a branch/path within the publication repository, not a separate repository. Keep the repository required for the live site; do not delete it as demo cleanup. Repository visibility has not been changed.
- Merge the approved work with history preserved. Profile README work follows production publication.

## Retire merged demo branch — October 17, 2026
- User clarified that only the demo should be deleted; preserve the official public portfolio repository.
- The demo is the fully merged branch codex/portfolio-gallery-demo, not a separate repository. Remove that branch only after checking its exact reviewed SHA, merged PR #1, ancestry in main and the verified official site.
- A one-time workflow is restricted to the explicit cleanup commit message and fixed branch; it refuses the default branch, changed demo heads or unmerged work. No application source or repository visibility changes.
- Keep the small /demo/ redirect for old links; it no longer hosts a duplicate app.
- Cleanup validates the immutable production merge's parent SHA and its ancestry in main directly. A PR metadata predicate differed under the workflow API and stopped the first attempt before deletion; immutable Git history is the authoritative integration proof.
