# Approved professional portfolio: design QA

Source visual truth: `/workspace/portfolio-scroll.html`, the interactive preview approved by Angel on October 7, 2026. Earlier cosmic and Flow Studio designs are superseded.

Evidence:
- Source browser capture: `/workspace/scratch/e9e2aec29a44/portfolio-reference-qa.jpg` (1363 × 936).
- Desktop implementation: `/workspace/scratch/e9e2aec29a44/portfolio-desktop-qa.jpg` (1348 × 926).
- Combined comparison: `/workspace/scratch/e9e2aec29a44/portfolio-comparison-qa.jpg`.
- Mobile implementation: `/workspace/scratch/e9e2aec29a44/portfolio-mobile-qa.jpg`, a 360px iframe with 345px content width after its scrollbar.
- Local implementation: `http://terminal.local:4173/es/`.
- State: Spanish, dark, initial hero. Screenshots are CSS-pixel density 1. The combined comparison removes conversation toolbar chrome and compares the top 620px product regions at equivalent widths.

## Findings

No actionable P0/P1/P2 design differences remain.

- **Fonts/typography:** self-hosted Inter, sans-serif heading, sober weights and the approved role line. Main body type is 16px rather than the compact preview's 14–15px, intentionally improving reading on the published site. Supporting labels are at least 12px.
- **Spacing/layout:** A.M. header, one name heading, two-column desktop introduction, three numbered project rows, compact experience and contact. The full page has a 1120px maximum content width and native scrolling, replacing the conversation's 620px scroll frame. Additional ES/EN controls and existing demos/case details are intentional preserved capabilities.
- **Colors/tokens:** approved navy `rgb(20,33,46)`, charcoal `rgb(22,25,32)` and warm dark endpoint `rgb(36,29,29)`. Gold is `#d8bd93`. Scroll verification observed charcoal at projects and `rgb(35,29,29)` near contact; pausing restores navy.
- **Image/asset fidelity:** the approved preview has no representational imagery. No canvas artwork, planets or generated background images are rendered. Phosphor icons match the source's thin directional and download icon treatment. Gold gradients are explicitly approved button styling.
- **Copy/content:** Angel Molina without accent; QA Automation Engineer · SDET in the hero; Tester Sr / Senior Tester retained in employment. Projects appear before experience. Root stays English, `/es/` Spanish. CV assets remain real existing PDFs.

## Browser interaction verification

- Navigation to projects/contact and back to top.
- ES/EN switch updates visible copy, document language, URL and CV target.
- Evidence demo dialog opens; API tab produces fictional 200/JSON validation output; annotation tab highlights the email field and changes its action to remove annotation; close restores the page.
- Mobile project case study expands with problem, solution and technical decisions. No horizontal overflow at desktop or mobile width.
- Keyboard focus activates the CV border animation while the button remains stable; pause turns motion off and background returns to navy.
- Console checked: no site warnings/errors. Browser extension metadata errors were excluded by their `chrome-extension:` source.
- Build and four existing worker/packaging tests pass.

## Comparison history

First full-view comparison found no actionable P0/P1/P2 mismatch. Focused visual inspection covered readable hero copy, button treatment and the mobile project row. Before final checks, language touch targets were enlarged for coarse pointers, navigation was allowed to wrap for enlarged text, and the demo dialog received an accessible name. These are accessibility refinements, not changes to the approved visual direction.

## Implementation checklist

- Preserve existing GitHub Pages workflow and CVs.
- Remove temporary QA wrappers before the production build.
- Publish only after the final build and tests pass.
- Verify the deployed GitHub Pages route in the browser.

## Follow-up polish

None required. Actual Android hardware and OS-level reduced-motion emulation were not available; CSS and runtime guards both honor that preference.

final result: passed
