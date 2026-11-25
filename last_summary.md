# Latest task — Projects page hierarchy

## Changed

- Moved “Selected Work.” and its introduction above the PixieKat featured case-study banner on `/projects`. The filterable grid follows the banner.
- Made “Selected Work.” the page `h1` and the banner headline an `h2`. Gave the banner a compact, legible “Featured project” badge, with more detail on wider screens.

## Relevant files

- `src/app/(site)/projects/page.tsx`
- `memory.md`, `last_summary.md`

## Verification

- `npm run build` passed, including TypeScript.
- Targeted ESLint passed.
- Local production browser checks at 360px, 820px and 1440px confirmed the heading, banner and filters appear in that order, with no horizontal overflow or page errors. Screenshots were inspected at mobile and desktop widths.
- Published commit `d6a49d6` to PerPixel `main`. A fresh public `/projects` response returned 200 and confirmed the heading appears before the featured badge and gallery filters.
- The full visual test suite was not run.

## Current state and next step

- The change is live on the public Projects page. The PerPixel working tree is clean after the handoff commit.
