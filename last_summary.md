# Last summary — PerPixel

## 2026-11-02 — Homepage section order

- Moved the featured portfolio and three offers directly after the Branding / Design / Editorial / Motion wordplay. The process section now follows offers, then the contact invitation. Hero and Bento remain first.
- Updated the homepage order assertion in `tests/visual_check.py` to reflect the new sequence.
- Current featured work remains Ghaslet, Moove, Sorso, Dune. The desktop/tablet opening scroll cue remains in place.
- Files changed this task: `src/app/(site)/page.tsx`, `tests/visual_check.py`, `memory.md`, `last_summary.md`.
- Verification: `npm run build` passed, full ESLint passed using an alternate cache path, and `git diff --check` passed. Generated homepage HTML places wordplay, featured work, offers, process, and contact in that order. Browser visual checks were unavailable in this environment and the Python visual suite was not run.

### Next useful step

Preview the transition from wordplay into the featured portfolio and from offers into process on desktop, tablet, and mobile. The FormSubmit activation and inbox delivery check for `create@perpixel.agency` also remains open.
