# Last summary — PerPixel

## 2026-10-29 — Contact inbox update and deployment diagnosis

- The shared recipient in `src/lib/contact.ts` is `create@perpixel.agency`, which feeds the contact page mail links, form action, and FormSubmit AJAX request. `README.md`, `memory.md`, and `tests/contact.test.mjs` were updated too.
- The first update remained local and uncommitted, so the remote `main` branch still served `perpixeldigital@gmail.com`. This explains why a submission from the published site would not activate the new address. The change has now been committed and rebased onto the two newer commits on `origin/main`; publication still needs verification.
- Contact tests passed (8/8), and targeted ESLint passed. Full `npm run lint` failed because `.eslintcache` is protected (`EPERM`). Build and live browser checks have not yet run for this change.
- FormSubmit states that changing the recipient requires a new activation. Receipt at `create@perpixel.agency` remains unverified. After publication, submit a test from the live contact page, check the inbox and spam folder for activation, activate, then submit again and verify receipt and Reply-To.

### Next useful step

Publish the rebased commit and verify the live form points to `create@perpixel.agency`; then verify FormSubmit activation and receipt.
