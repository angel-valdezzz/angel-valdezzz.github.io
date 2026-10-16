# Gallery demo verification

Visual target: the user's selected first three-column gallery, refined with charcoal, violet and differentiated project colors on October 15, 2026.

## Scope
Nine equally visible projects, brief personal introduction, GitHub/CV/EN-ES in the header, accessible project dialog, real project content, restrained Motion animations and reduced-motion support.

## Verification
- GitHub Actions compiles the actual branch, runs the existing Sites worker tests, then Chromium interaction and accessibility tests on desktop and mobile.
- Captures for English, Spanish, a project dialog and 320px layout are produced in the gallery-browser-review artifact.
- A standalone HTML demo embeds its assets and both CV PDFs. It can be opened after downloading and extracting the angel-gallery-demo artifact.
- Local command execution is blocked by helper_sandbox_lock_failed.
- CI desktop and mobile screenshots were retrieved and visually inspected. No interactive browser is available in this chat; a normalized comparison against the selected source image remains unavailable.
- Final run 38945788177 on commit fc214b1c4c9df2d37ad78f42f50d7c440e4a61af passed npm ci, production build, existing Sites worker checks and all 16 Chromium tests (desktop and mobile).

final result: blocked

The block is manual visual comparison / live preview, not user authorization. The demo stays on an isolated branch. The production GitHub Pages site is unchanged.

## First automated pass and fixes
- Run 38803951858 on commit 5f892c5: compilation and Sites worker checks passed; 12/14 browser checks passed.
- P1: system reduced-motion changes were not reflected while the page remained open. Replaced the initial-only library hook with a reactive matchMedia subscription; the test also checks restoration when the preference changes back.
- Desktop 1440px and mobile 390px screenshots were retrieved from CI and inspected. P2: excess vertical spacing and truncated source preview lines. Reduced hero/row spacing and shortened or reformatted preview excerpts without changing the complete source examples.
- Replaced the Request Logger source-code thumbnail with its genuine Rich console SVG export.
- Added an offline file:// test for the standalone demo, including language switching and CV download.
- Strict normalized side-by-side comparison with the generated source image remains unavailable; final result remains blocked pending that comparison only.


## Final candidate — October 16, 2026
- [Successful checks](https://github.com/angel-valdezzz/angel-valdezzz.github.io/actions/runs/38945788177): 16/16 browser tests passed, including live system motion changes, focus/scroll restoration, EN/ES, CV downloads, automated WCAG A/AA checks, embedded assets and offline file opening.
- [Download demo](https://github.com/angel-valdezzz/angel-valdezzz.github.io/actions/runs/38945788177/artifacts/12064782810): extract angel-gallery-demo.html and open it in a browser. Artifact retention ends October 30, 2026; the tracked packaging script can regenerate it.
- Final desktop and mobile captures were inspected: nine equal project cards, compact introduction, genuine project output, visible header actions and a single-column mobile layout. No page overflow was detected, including at 320px.
- Automated accessibility checks are not a complete accessibility certification. Strict visual matching remains blocked by unavailable source-image bytes; this candidate is ready for the user's design review, not a claim of completed source-image QA.
- No production merge or deployment was performed. README work remains after portfolio review.


## Motion revision — October 16, 2026
The user found the first candidate too static and noted the missing gradient. This revision adds an animated violet/blue/teal background, an actual continuously rendered geometric canvas on desktop and mobile, gradient greeting, pointer depth and light on cards, staggered entrances and native-dialog opening/closing from the selected card's position. Motion is stopped by pause/system preference; the canvas also suspends outside the viewport or when the tab is hidden.

New browser checks compare actual canvas pixels and computed gradient transforms/positions over time, then require them to stay unchanged while paused or with reduced motion. Interaction checks cover tilt, active dialog animation and restored focus. Timed viewport captures supplement the previous static/reduced-motion gallery captures. [Run 38951188409](https://github.com/angel-valdezzz/angel-valdezzz.github.io/actions/runs/38951188409) on 9e338bfaec5cd9d3917e20fa3956c7a4c455b1e7 passed the production build, existing Sites checks and all 20 browser tests. Actual canvas pixels, background transform and greeting-gradient position changed over time on desktop and mobile, stayed unchanged during pause/reduced motion and resumed after enabling motion. Desktop pointer depth, active detail transition, keyboard focus restoration, language switching, CV downloads, offline demo and WCAG A/AA automated checks passed. Timed desktop captures, the mobile viewport and a fully opened detail were visually inspected. This verifies the requested motion correction; it does not claim the previously blocked normalized source-image comparison is complete.
