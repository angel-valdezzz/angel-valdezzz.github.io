# Gallery demo verification

Visual target: the user's selected first three-column gallery, refined with charcoal, violet and differentiated project colors on October 15, 2026.

## Scope
Nine equally visible projects, brief personal introduction, GitHub/CV/EN-ES in the header, accessible project dialog, real project content, restrained Motion animations and reduced-motion support.

## Verification
- GitHub Actions compiles the actual branch, runs the existing Sites worker tests, then Chromium interaction and accessibility tests on desktop and mobile.
- Captures for English, Spanish, a project dialog and 320px layout are produced in the gallery-browser-review artifact.
- A standalone HTML demo embeds its assets and both CV PDFs. It can be opened after downloading and extracting the angel-gallery-demo artifact.
- Local command execution is blocked by helper_sandbox_lock_failed.
- No interactive browser is available in this chat to compare generated captures against the selected visual target.
- Automated results will be recorded after the final branch run completes.

final result: blocked

The block is manual visual comparison / live preview, not user authorization. The demo stays on an isolated branch. The production GitHub Pages site is unchanged.

## First automated pass and fixes
- Run 38803951858 on commit 5f892c5: compilation and Sites worker checks passed; 12/14 browser checks passed.
- P1: system reduced-motion changes were not reflected while the page remained open. Replaced the initial-only library hook with a reactive matchMedia subscription; the test also checks restoration when the preference changes back.
- Desktop 1440px and mobile 390px screenshots were retrieved from CI and inspected. P2: excess vertical spacing and truncated source preview lines. Reduced hero/row spacing and shortened or reformatted preview excerpts without changing the complete source examples.
- Replaced the Request Logger source-code thumbnail with its genuine Rich console SVG export.
- Added an offline file:// test for the standalone demo, including language switching and CV download.
- Strict normalized side-by-side comparison with the generated source image remains unavailable; final result remains blocked pending that comparison and the final regression run.
