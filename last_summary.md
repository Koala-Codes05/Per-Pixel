# Latest task — Other Table in PerPixel

## Changed

- Added a dedicated `/projects/other-table` case study with an early and closing live-demo link to `https://ot.perpixel.agency/`, original editorial imagery, guest-journey links, and an explicitly synthetic redesign exercise. The text identifies the restaurant and booking flow as fictional.
- Linked the Other Table gallery record and a new homepage featured card to the case study. The concept badge remains in place. Updated the featured-card fallback assertion for five cards.
- Kept `/case-studies/other-table` as a permanent redirect to the new route.
- Copied the original room, aubergine and seal assets from the standalone repository into `public/works/other-table/` beside the existing table image.

## Relevant files

- `src/app/(site)/projects/other-table/page.tsx`
- `src/app/(site)/case-studies/other-table/page.tsx`
- `src/lib/site.ts`, `src/components/home/FeaturedProjects.tsx`, `tests/visual_check.py`
- `public/works/other-table/`

## Verification

- `npm run build` passed, including TypeScript and both Other Table routes.
- `npx eslint . --cache --cache-location ./.eslintcache-other-table` passed.
- Production HTTP check: case study and homepage returned 200; the case study included the live URL and fictional disclosure; the homepage included the new featured description; the old route returned 308 with location `/projects/other-table`.
- Published commit `3e66471` to PerPixel `main`. The public `https://perpixel.agency/projects/other-table` returned 200 with the expected title, case study text and live-demo link.
- `git diff --check` passed. Browser viewport inspection and the visual test suite were not run.

## Current state and next step

- The case study is deployed. Inspect the page and five-card featured sequence at desktop and mobile sizes when a browser viewport is available.
