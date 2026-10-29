# Last summary — PerPixel

## 2026-10-29 — Contact inbox published

- The earlier `create@perpixel.agency` edit was only local. The published site still used `perpixeldigital@gmail.com`, explaining why a live test could not trigger FormSubmit activation for the new recipient.
- Committed the contact change, rebased it onto current `origin/main`, and pushed commit `d3069d5` to `main`. This changes the shared recipient used by the contact page, mail links, form action, and FormSubmit AJAX. README, memory, and the explicit-address contact test were updated.
- Verification: contact tests passed (8/8); targeted ESLint passed. After the push, `https://perpixel-one.vercel.app/contact` returned HTTP 200 with `create@perpixel.agency` present and the old Gmail address absent. Full `npm run lint` failed due to protected `.eslintcache` (`EPERM`); build was not run for this address-only change.
- FormSubmit activation and inbox delivery remain unverified. FormSubmit's help says a changed recipient requires activation again. A first submission from the now-updated live page should trigger that message; check spam and mailbox delivery, then submit again after activation to verify receipt and Reply-To.

### Next useful step

Submit a test enquiry from the live contact page and check `create@perpixel.agency` for FormSubmit activation. If none arrives, verify ordinary inbound mail to that address and contact FormSubmit support with the submission time and site URL.
