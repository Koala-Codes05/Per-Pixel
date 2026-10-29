# Last summary — PerPixel

## 2026-10-29 — Concept tags leave the nav flex row

Bugbot’s layout notes on the merged offers PR: the Sorso Concept pill was a flex item and pushed the aperitivo clock off centre, and Ghaslet’s Concept chip shifted the centred pill bar and sat alone in the bar below 760px.

### What changed

- Sorso (`SorsoNavbar` + `.sorso-nav`): the tag is absolutely positioned on the brand lockup, so the bar is brand, clock, and links again. From 1280px the clock is centred in the bar, with a 24px gap before the links at 1280. Below 620px the tag stacks under the wordmark and the section links wrap to the next row.
- Ghaslet (`public/works/ghaslet/index.html`): the tag is absolute on a logo wrapper, so logo, pill bar, and bag are the three flex items again. At ≤880px it sits under the logo instead of covering the pill bar.
- Dune and the Offset standalone nav: the tag moved onto the brand so it is not an extra link-row item. Moove already grouped its tag with the wordmark. Snackverse’s tag is fixed and was left as-is.

### Verification

- `npm run build` passed.
- Chrome measurements: Sorso clock centre delta 0 at 1280, no horizontal overflow. Ghaslet pill bar within 20px of centre at 1280, concept not overlapping the bar or the bag at 390. Dune’s flag is inside the brand link.

### Not verified

- A physical phone. This branch is not merged.
