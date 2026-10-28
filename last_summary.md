# Last summary — PerPixel

## 2026-10-28 — Footer updates request

The footer's formerly inert newsletter form now sends an updates request through the existing FormSubmit inbox (`perpixeldigital@gmail.com`). It has validation, a 20-second timeout, a duplicate-send guard, explicit accepted/error states, and a direct email fallback. Copy states that requests are added manually; this does not create a managed subscriber list or automatic newsletter. The footer's visual layout and links remain.

### Relevant files

- `src/components/Footer.tsx`: submission and feedback UI.
- `src/lib/contact.ts`: `sendUpdatesRequest` and distinct subject.
- `tests/contact.test.mjs`: provider payload and rejection checks.
- `README.md`: footer request setup and delivery caveat.
- `memory.md`: durable handling and verification notes.

### Verification

- `node --experimental-strip-types --test tests/contact.test.mjs`: 10 passed.
- `npm run build`: passed, including TypeScript.
- Full ESLint passed with a separate cache location (`npx eslint . --cache --cache-location .eslintcache-newsletter`). `npm run lint` failed with EPERM writing the existing `.eslintcache`; this is a cache permission issue, not a reported lint finding.
- No real updates-request delivery or production browser interaction was verified here.

### Next step

After deployment, submit one test request from the live footer. Confirm the email with subject `New updates request — PerPixel` reaches the studio inbox and activate FormSubmit for the live origin if prompted. Add the address to a manually maintained updates list only with the visitor's request, or connect a managed newsletter provider when chosen.

Pre-existing `package-lock.json` changes were left untouched.
