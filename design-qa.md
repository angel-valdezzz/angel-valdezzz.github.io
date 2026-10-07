# Live universe revision — design QA

Source visual: ../generated_images/exec-6ae8dff6-9ee9-4bd4-8438-318634415dcf.png (1487×1058). User-approved revision: independently moving nebula, planets and Earth, gravity lens, magnetic buttons, scroll reveals and project depth; English default; Angel without accent.

Browser implementation: ../motion-desktop.jpg (1348×926 screenshot; browser viewport 1363×936 including scrollbar), ../motion-mobile.jpg (390×844 iframe region; usable content 375px). Combined comparison: ../motion-comparison.jpg, both fit to 800px width without stretching. Dark comparison differs in language and moving object positions intentionally. Light and mobile states inspected in browser. Focused hero/mobile screenshots show readable controls and copy; no additional crop needed for those surfaces.

Fidelity surfaces: Cormorant Garamond display type and Inter UI retained; personal hierarchy, centered hero, three-column about and project grid retained; teal/green, blue and violet palette retained. Nebula artwork derives from the selected source, with planets/Earth removed to enable independent animation. NASA Earth texture has different geography and lighting from original artwork intentionally. Copy preserves biography, project content and role; name corrected to Angel and root metadata is English.

Comparison history:
- P2: first software cloud sampling produced horizontal bands and hard panel edges. Fixed with a background-only cloud asset and continuously overlapping opaque ribbons; light tint applied uniformly after composition. Revised dark/light captures show no bands or panel edges.
- P2: coarse Earth and low-contrast light-theme about. Increased sphere projection detail, separate surface/cloud rotation, reduced Earth opacity in light mode and darkened pillar text. Revised captures show readable about text.
- P2: mobile planets and horizon too close to intro/CTA. Moved large planet above greeting, omitted third planet on narrow software scene, lowered mobile Earth horizon; revised mobile screenshot shows clear copy and buttons with no overflow.

Interaction evidence: universe elapsed advanced from 0.20 to 5.63; paused value stayed 0.85 across observations. Gravity lens seen on left nebula with surrounding cloud displacement. Desktop CTA reaches projects; four project panels revealed at viewport positions 350/756px. Menu, language switching, dark/light/system and mobile width checked. Mobile body width and scroll width both 375px. Root and /en/ metadata English, /es/ Spanish; no accented name in HTML or source copy.

Rendering: WebGL shader plus animated Canvas renderer when WebGL is unavailable. This cloud browser uses Canvas; hardware WebGL visuals could not be inspected here. Reduced-motion handled by live media query checks and CSS; OS setting itself was not changed. Canvas stops off-screen/hidden, runs at bounded cadence, cleans listeners and animation frame on unmount. Console contains extension metadata errors only, no application errors.

Validation: production build and four packaging/worker tests pass. Existing CV downloads and project demos retained. No actionable P0/P1/P2 findings remain. P3: planetary surface detail varies between WebGL and software rendering; hardware/per-device frame rates are not benchmarked.

final result: passed
