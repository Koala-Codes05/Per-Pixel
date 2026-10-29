# Last summary — PerPixel

## 2026-10-29 — Mobile featured pin and wordplay

Scoped to ≤767px. Desktop featured and wordplay math, height, and type are unchanged.

- Featured: card 0 is already on screen at the start of the pin (about 40svh) and settles quickly. The mobile pin is shorter (`--featured-height-mobile`). Cards sit lower (`top: 62%`). The Portfolio wordmark scales during the opening, and the intro line fades as the first card settles so it does not sit under the heading.
- Wordplay: words are sized to the screen width, the stack is about 60% of the viewport, the section is 170svh, and the top margin is 2.5rem. Even and odd words drift ±8vw with scroll progress. Reduced motion keeps the static stack.

### Verification

- `npm run build` passed. Scroll-sequence tests passed, including the new mobile pose and drift cases.
- Chrome at 390×844 and 360×800: featured opens with the first card visible and not under the heading; wordplay block is 61% and 60% of the viewport. At 1440×900 the featured height is still 4590px, wordplay is still 2340px, card 0 starts at opacity 0, and the wordmark has no inline transform.

## 2026-10-29 — Empty hash no longer jumps to offers

`OfferScene` scrolled to the first frame whenever `location.hash` was empty, because homepage offer frames had no `id` and `"".slice` matched `frame.id === ""`. The scroll now runs only when the hash is non-empty. Homepage frames use `launch-sprint`, `brand-system`, and `retainer`, the same ids as `/offers`.

### Verification

- Fresh `/` load (intro skipped) stayed at scrollY 0 after 1.5s on desktop and mobile.
- `/offers#brand-system`, `#launch-sprint`, and `#retainer` still land on those frames.
- `npm run build` passed.

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
