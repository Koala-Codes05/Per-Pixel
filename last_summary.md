# Last summary — PerPixel

## 2026-10-29 — Phone wordplay stays intact, featured card moves up

Scoped to ≤767px. Same branch `cursor/concept-nav-slot-d312`, PR #2, not merged. Desktop featured and wordplay are unchanged.

- Wordplay uses one size, `17vw`, chosen for Branding (the longest word). The sticky viewport is padded by the ±8vw drift plus 8px, so every word stays fully inside the clip at both ends of the drift. Design and Motion no longer lose their last letter.
- Featured card 0 opens about 5.6svh below its rest (`FEATURED_MOBILE_SETTLE` 0.86) and the phone anchor is `top: 56%`. At the start of the pin the intro-to-card gap is 116px at 390×844 and 104px at 360×800. The intro is fully opaque there and fades as the card settles; the card never covers the intro.

### Files

- `src/app/globals.css` — phone wordplay padding and size; featured card `top: 56%`
- `src/lib/scroll-sequence.ts` — mobile settle 0.86
- `src/components/home/FeaturedScene.tsx` — intro fade uses the measured opening travel
- `tests/scroll-sequence.test.mjs`

### Verification

- `npm run build` passed. `node --experimental-strip-types --test tests/scroll-sequence.test.mjs` — 15 passed.
- Chrome, intro skipped, pin start / mid drift / end drift: ink is at least 8px inside the wordplay clip at 390×844 and 360×800. Tightest right margin is Branding at the end of the drift (22px at 390, 20px at 360).
- Featured opening: intro opacity 1, no overlap with the heading or the intro. After the settle the intro opacity is 0 and the gap is still positive (68px at 390, 59px at 360).
- At 1440×900 the featured card still starts at `y: 100svh` with `top: 53%`, the intro stays opaque, and wordplay stays at 189px (21svh cap) with 40px padding and no sideways drift.

### Not verified

- A physical phone.

### Next

- Leave this PR unmerged until the phone frames are accepted.
