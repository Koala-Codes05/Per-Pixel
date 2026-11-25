# Latest task — trim homepage featured portfolio

## Changed

- Removed Other Table and Moove from the homepage's scrolling featured portfolio. The four cards are PixieKat, Auriel, Ghaslet and Sorso, in that order. Both removed projects remain in the full Projects gallery and their dedicated routes.
- Updated the no-JS featured-card count assertion to four.
- Corrected the mobile featured opening offset and its stale scroll-sequence test expectation so the first card starts about 5.6svh below rest, matching the recorded visual intent.

## Relevant files

- `src/components/home/FeaturedProjects.tsx`
- `src/lib/scroll-sequence.ts`
- `tests/visual_check.py`, `tests/scroll-sequence.test.mjs`
- `memory.md`, `last_summary.md`

## Verification

- `npm run build` passed, including TypeScript.
- `npx eslint . --cache --cache-location ./.eslintcache-featured-trim` passed.
- `node --experimental-strip-types --test tests/scroll-sequence.test.mjs` passed all 15 tests after the opening correction. The first run exposed the stale assertion; it did not pass until corrected.
- Local production HTTP checks: homepage and Projects returned 200; the homepage rendered four featured cards without the removed descriptions; Other Table and Moove remained linked from the Projects gallery.
- Browser checks at 360px, 820px and 1440px with reduced motion showed four cards in the intended order, no horizontal overflow and no page errors.
- Published commit `b8f18af` to PerPixel `main`. A fresh request to the public homepage returned 200 with the four remaining featured descriptions and without the Other Table or Moove featured descriptions.
- `git diff --check` passed. The full visual test suite was not run.

## Current state and next step

- The focused change is deployed on the public homepage. The full Projects gallery still contains Other Table and Moove.
