# Last summary — PerPixel

## 2026-11-02 — Featured portfolio opening

- Added Ghaslet before Moove in the homepage featured sequence. The four cards now run Ghaslet, Moove, Sorso, Dune, with counters and scroll height derived from the count.
- Added a desktop/tablet "Scroll to explore featured work" cue in the opening pause. Its opacity follows the first card's scroll pose and reverses when scrolling back. Mobile, reduced-motion, and static layouts do not show it.
- Updated the existing visual-check expectations for four cards and the offers section between portfolio and contact. The three offers themselves were reviewed and left as the current follow-on section.
- Files: `src/components/home/FeaturedProjects.tsx`, `src/components/home/FeaturedScene.tsx`, `src/app/globals.css`, `tests/visual_check.py`, `memory.md`, `last_summary.md`.
- Verification: `npm run build` passed; all 15 `tests/scroll-sequence.test.mjs` tests passed; full ESLint passed with an alternate cache path; `git diff --check` passed. Production HTML on localhost:3100 contained the cue, four cards in the intended order, and offers after featured work. `npm run lint` failed at the protected `.eslintcache` with EPERM. Browser automation was unavailable (browser host down; Windows Python launcher inaccessible), so viewport appearance and scrolling still need visual confirmation.

### Next useful step

Preview the homepage at desktop and tablet widths, scroll into the featured section and back, then check that the cue clears before Ghaslet occupies the center. Check the mobile opening and offer transition visually. The earlier FormSubmit activation and inbox delivery check for `create@perpixel.agency` also remains open.
