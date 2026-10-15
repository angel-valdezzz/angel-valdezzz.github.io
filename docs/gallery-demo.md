# Personal gallery demo

This branch implements the approved nine-project gallery with React, Vite and Motion. It is a review candidate; it is not merged or deployed to the production portfolio.

## Review
Download the **angel-gallery-demo** artifact from the latest successful **Gallery demo checks** run. Extract the ZIP and open **angel-gallery-demo.html** in a browser. It embeds scripts, styles, fonts, the three output captures and both CV PDFs. External repository/documentation links still require network access.

Normal development remains `npm ci`, `npm run dev`. Build with `npm run build`; create the single-file review artifact with `node scripts/package-gallery-demo.mjs`. Run existing worker checks with `npm run test:sites`; browser checks with `npm run test:gallery` after installing Chromium via Playwright.

## Sources
- Web/API, Paylo, pytabify, Request Logger and TestScript source excerpts were read from their current GitHub READMEs on 2026-10-15. Code is displayed as source, not executed or presented as live results.
- Output screenshots reuse `public/assets/projects/`. Their original provenance is documented in that directory's README. They depict published demo output captured on October 7, 2026; linked project examples may now be newer.
- All nine projects retain repository links. Practice projects expose architecture and published reports; tools expose documentation and examples.
- TestScript uses .tscr, is experimental and installs as testscript-lang.
- The current role is Senior Tester / Tester Sr in QA Automation; SDET is the next career step.

## Remaining review
See `design-qa.md`. Automated browser tests do not replace visual comparison with the selected mockup. Production integration and the profile README follow user review.
