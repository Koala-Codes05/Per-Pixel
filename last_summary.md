# Last summary — PerPixel

## 2026-11-02 — Sorso pinned flavour scene (shipped)

### What changed
- `/projects/sorso` flavours: **pinned viewport** (~340svh) with backdrop, copy, and bottles **crossfading in place** (Offset-style), not frame-on-frame stacking. New: `SorsoFlavours.tsx`, `SorsoBottle.tsx`, `sorso-flavours.ts`, `flavourSceneCopyOffset` in `scroll-sequence.ts`, flavour tabs.
- Merged with origin: homepage section order (featured/offers before process) from `cf722e7` remains on `(site)/page.tsx`.

### Verification
- `npm run lint`: clean.
- `npm run build`: passed before commit `932e2eb`.

### Git / deploy
- Commit on `main`; push + Vercel production deploy requested this session.

### Next useful step
- Confirm production `/projects/sorso` flavours pin on desktop; phone should fall back to static stack when panels do not fit.
