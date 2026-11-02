# Studio playbook (not a public route)

This folder is the former `/playbook` page. It is internal research: competitor studios, pricing notes, and a 30/60/90 plan. It is not part of the Next.js app, so `/playbook` returns 404.

- `page.tsx` — the old route
- `PlaybookShowcase.tsx` and `playbook-data.ts` — the interactive dossier
- `research/shots/` — the competitor screenshots that used to be served from `public/research/shots`

The written research notes remain in `research/`. Nothing here is linked from the site.

To restore the route later, move `page.tsx` back to `src/app/(site)/playbook/page.tsx`, the two component files back to `src/components/playbook/`, point the page import at `@/components/playbook/PlaybookShowcase`, and move `research/shots/` back to `public/research/shots`.
