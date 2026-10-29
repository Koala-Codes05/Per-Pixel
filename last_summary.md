# Last summary — PerPixel

## 2026-10-29 — Offers pin and change with the scroll

The homepage offers, and `/offers` when the copy fits the screen, are now a pinned scroll sequence in the same family as the featured projects scene.

### What changed

- `OfferScene` sticks a full-viewport stage. Each offer is a full-screen frame. The first offer is already in place when the section pins. Later offers rise in `svh` and the previous one leaves upward, using the featured-project travel (`offerFramePose` over `portfolioCardPose`).
- Phones use the same vertical frames, one offer at a time. There is no swipe carousel.
- If `prefers-reduced-motion` is set, or the copy plus the nav/blur padding does not fit the viewport, the frames stack in normal flow.
- Copy, prices, and the Start a project links are unchanged. Titles sit below the fixed navigation. The price and CTA sit above the bottom blur.
- On a 1440×900 desktop, both the homepage and `/offers` pin. On a 390×844 phone the homepage pins; `/offers` stacks because the longer copy does not fit one frame.

### Files

- `src/components/home/OfferScene.tsx`, `src/components/home/Offers.tsx`, `src/app/(site)/offers/page.tsx`
- `src/lib/scroll-sequence.ts`, `src/app/globals.css`, `tests/scroll-sequence.test.mjs`

### Verification

- `npm run build` passed. `node --test tests/scroll-sequence.test.mjs` passed, including the new offer pose tests.
- Chrome: homepage `data-motion="on"` at 1440×900 and 390×844. Offer titles sit about 350px down, the header ends at 41px, and there is no horizontal overflow. `/offers` pins at 1440×900 and stacks at 390×844.
- Scroll recordings: `offers-desktop-scroll.mp4` and `offers-mobile-scroll.mp4`.

### Not verified

- A physical phone, or the deployed Vercel URL. The branch is not merged.
