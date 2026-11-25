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
- The full visual test suite was not run.

## Current state and next step

- The change is ready to publish to PerPixel `main`. Verify the public Projects page after deployment.
