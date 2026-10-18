# Personal gallery demo

This branch implements the approved nine-project gallery with React, Vite and Motion. It is a review candidate; it is not merged or deployed to the production portfolio.

## Review
Download the **angel-gallery-demo** artifact from the latest successful **Gallery demo checks** run. Extract the ZIP and open **angel-gallery-demo.html** in a browser. It embeds scripts, styles, fonts, the project output previews and both CV PDFs. External repository/documentation links still require network access.

Normal development remains `npm ci`, `npm run dev`. Build with `npm run build`; create the single-file review artifact with `node scripts/package-gallery-demo.mjs`. Run existing worker checks with `npm run test:sites`; browser checks with `npm run test:gallery` after installing Chromium via Playwright.

## Sources
- Web/API, Paylo, pytabify, Request Logger and TestScript source excerpts were read from their current GitHub READMEs on 2026-10-15. Code is displayed as source, not executed or presented as live results.
- Output screenshots reuse `public/assets/projects/`. Their original provenance is documented in that directory's README. They depict published demo output captured on October 7, 2026; linked project examples may now be newer.
- Request Logger uses an unchanged Rich SVG export from its documentation, retrieved on 2026-10-16; it is real console output rather than a terminal mockup.
- All nine projects retain repository links. Practice projects expose architecture and published reports; tools expose documentation and examples.
- TestScript uses .tscr, is experimental and installs as testscript-lang.
- The current role is Senior Tester / Tester Sr in QA Automation; SDET is the next career step.

## Remaining review
See `design-qa.md`. Automated browser tests do not replace visual comparison with the selected mockup. Production integration and the profile README follow user review.


## Motion revision
Continuous background and geometric canvas animation work on desktop and mobile. The header pause button stops them; the operating system's reduced-motion preference takes priority. Cards respond to mouse movement, and details expand from the selected card. These are visual interactions; source snippets remain unexecuted examples.


## Programmed stars
A transparent Canvas layer draws individual stars over the gradient. Each point has its own size, depth, velocity and slow brightness variation. The positions are reproducible and the sky is not an image. Stars drift automatically on desktop and mobile; their positions do not respond to cursor movement or page scroll. Depth comes from their different sizes and speeds. Existing motion controls also stop the star field, and hidden tabs stop rendering. English remains the initial language at /demo/.


## Navigation and galactic color
The grouped navigation shows one illuminated current section with a shared moving indicator. Manual scroll follows section positions; selected anchor links remain highlighted until manual scrolling resumes. Keyboard focus moves to the destination, browser history and ES/EN are supported, and paused/reduced motion use an immediate indicator. About and Contact are separate compact rows. The brighter purple/blue/cyan gradient includes soft rose light; autonomous stars and existing interactions are retained.


## Technologies and quieter navigation
The nav uses three plain text links with one fine moving underline: Projects, Technologies and About. The personal closing includes Contact, keeping About active throughout it; legacy #contact anchors still work. The new section contains only the four technologies confirmed by Angel (Python, Java, Robot Framework, GitHub Actions), plus web test automation, API testing, automation architecture and CI/CD pipelines. No package list or proficiency scores. Original SVG logos and license notices are included locally and in the standalone HTML.

## Interactive inventory — October 17, 2026
The Technologies section now contains 17 approved entries in four compact groups. Each icon/name is a real button that opens one inline detail at a time. The detail describes actual scope, applications and links to existing project repositories when relevant. Keyboard activation, Escape, close/focus return, live language changes and motion controls are supported.

JavaScript/TypeScript Selenium/Playwright examples are identified as planned practice, with no invented project links. SQL is complementary/basic university knowledge without recent regular use; it is not PostgreSQL. Xray describes creating/executing test cases within Jira. Poetry, PyPI, MkDocs, Allure and individual dependency packages are excluded from this section. All images (including the official Xray PNG) and source license notices are embedded in the standalone HTML.
