# Latest task — Internal growth playbook

## Changed

- Rewrote the internal playbook so the team can read it in order: how to use it, the work we are running, then the October 2026 research, then a short what's-next list.
- Added the current strategy from the 27 Nov 2026 notes only: positioning, the four-person team, PixieKat, the two offline Shopify themes, concept-work labels, five channels, pitch rules, the send-and-log process, and the tracker results (about 224 leads, about 12 human replies, 5 active conversations, 0 won).
- Retired the contradictory 30/60/90 instructions (sales calls, Loom videos, a fixed 10% fee, directory sign-ups, discounted projects). Survey rates and the price estimator are labelled as research. Published floors stay the USD offers.
- `/playbook` still renders in `next dev` and is still absent from navigation. A production build returns 404 for that route, so it is not a public page.

## Relevant files

- `src/app/(site)/playbook/page.tsx`
- `src/components/playbook/PlaybookShowcase.tsx`
- `src/components/playbook/playbook-data.ts`
- `src/lib/playbook-access.ts`
- `docs/playbook/README.md`
- `tests/playbook-access.test.mjs`
- `memory.md`

## Verification

- `node --experimental-strip-types --test tests/playbook-access.test.mjs` passed.
- ESLint on the playbook files passed with a task-specific cache.
- `npm run build` passed. The route list still names `/playbook` because the page module compiles; the prerender is a 404.
- `next start` on port 3010: `/playbook` returned 404 and the HTML did not contain the strategy copy. `/` returned 200.
- `next dev`: headless Chrome at 1440 and 390 loaded the dossier, found the operating copy, toggled the India studio filter and the USD price band, checked a next-step box, and found no `/playbook` link on the homepage. The phone page did not overflow horizontally.

## Current state and next step

- View the interactive page locally with `npm run dev`, then open `http://localhost:3000/playbook`. A deployed URL, including a Vercel preview, returns 404 for that path.
- No further implementation is pending. Do not merge this into a public route.
