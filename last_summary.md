# Last summary — PerPixel

## 2026-10-28 — Kit newsletter integration

Replaced the footer's FormSubmit updates-request flow with the owner's Kit HTML embed for form `10109897` (`ab998e1941`). The visible newsletter retains its PerPixel layout, input placeholder, button label, typography, color, and responsive classes. Kit's official script handles pending, errors, and the configured confirmation message. Removed only the obsolete newsletter helper and its tests from the contact module; enquiry FormSubmit remains unchanged.

### Relevant files

- `src/components/Footer.tsx`: Kit form metadata and PerPixel markup.
- `src/app/globals.css`: scoped loading, error, and success presentation.
- `src/lib/contact.ts`, `tests/contact.test.mjs`: obsolete newsletter FormSubmit code removed; enquiry code preserved.
- `README.md`, `memory.md`: integration and verification notes.

### Verification

- `npm run build`: passed, including TypeScript.
- Focused ESLint with a separate cache location: passed.
- `node --experimental-strip-types --test tests/contact.test.mjs`: 8 enquiry tests passed.
- Local production HTML contains Kit's action, UID, `email_address`, and `ck.5.js` script URL. The contact form still points to FormSubmit.
- Kit's public script was inspected: it binds the supplied form attributes and owns submitting, error, and success states.
- Browser access was unavailable and no real subscription or confirmation email was sent. Live behavior and responsive appearance still require a browser check.

### Next useful step

On the deployed site, submit a test address in the footer. Confirm Kit displays its success message, sends the confirmation email, and records the subscriber after confirmation. Check mobile width and ensure the contact form still sends enquiries.

Pre-existing `package-lock.json` changes were left untouched.
