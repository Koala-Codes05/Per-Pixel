# Latest task — Public direct URL for the playbook

## Changed

- `/playbook` is served on production builds again. The development-only `notFound()` gate is gone.
- The page is still unlinked. Its metadata stays `noindex, nofollow`. `src/app/robots.ts` disallows `/playbook`. There is no sitemap route, so the page is not listed in one.
- Playbook copy and layout were not edited.

## Relevant files

- `src/app/(site)/playbook/page.tsx`
- `src/app/robots.ts`
- `tests/playbook-access.test.mjs`
- `docs/playbook/README.md`
- `memory.md`

## Verification

- `node --experimental-strip-types --test tests/playbook-access.test.mjs` passed.
- ESLint on the page and `robots.ts` passed.
- `npm run build` passed and lists `/playbook` and `/robots.txt`.
- `next start` on port 3010: `/playbook` returned 200 with `noindex, nofollow` and the existing heading. `/robots.txt` disallows `/playbook`. `/sitemap.xml` returned 404 and did not contain `/playbook`. Home, projects, offers, about, contact, and journal returned 200 with no `/playbook` links.

## Current state and next step

- Deploy this to production and confirm `https://www.perpixel.agency/playbook` returns 200.
