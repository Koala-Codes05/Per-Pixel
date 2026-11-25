# Latest task — Auriel case study in PerPixel

## Changed

- Added `/projects/auriel`, an editorial case study for the fictional Auriel retreat. It covers the proposition, material-led identity, interactive atlas, day selector and local stay planner. A visible concept badge and explicit fictional-data disclosures accompany early and closing links to `https://auriel.perpixel.agency/`.
- Added Auriel to the Projects gallery and homepage featured work, with the featured no-JS assertion updated to six cards.
- Copied five original generated concept images and two interface captures from the independent Auriel repository into `public/works/auriel/`.

## Relevant files

- `src/app/(site)/projects/auriel/page.tsx`
- `src/lib/site.ts`, `src/components/home/FeaturedProjects.tsx`, `tests/visual_check.py`
- `public/works/auriel/`, `memory.md`, `last_summary.md`

## Verification

- Auriel's live homepage, stay, reserve and atlas routes returned 200 before the PerPixel changes.
- `npm run build` passed, including TypeScript and `/projects/auriel`.
- `npx eslint . --cache --cache-location ./.eslintcache-auriel-case` passed.
- Local production HTTP checks: case study, homepage and Projects returned 200; the case study included the live URL and concept disclosure; Auriel appeared in featured work and the gallery.
- Browser checks at 360px, 820px and 1440px found no horizontal overflow or page errors, three homepage-to-demo links, and no broken loaded images. The homepage had six featured cards, including Auriel. Mobile and desktop screenshots were inspected.
- `git diff --check` passed. The full `tests/visual_check.py` suite was not run.

## Current state and next step

- The case study is ready to publish to PerPixel main. Verify its public URL after deployment.
