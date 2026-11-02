# Last summary — PerPixel

## 2026-11-02 — Sorso pinned flavour scene + ship

### What changed
- `/projects/sorso` flavours: **pinned viewport** (340svh) with backdrop/text/bottle **morphing in place** (Offset-style), not Process-style frame stacking. `SorsoFlavours.tsx`, `flavourSceneCopyOffset` in `scroll-sequence.ts`, flavour tabs, `SorsoBottle.tsx`, `sorso-flavours.ts`.
- CSS: `.sorso-flavours-section[data-motion]` pin + layer crossfade; static editorial stack when motion off or viewport too short.
- Footer links on Sorso use `next/link`; `tests/sorso_check.py` asserts pin + backdrop/tab progression.

### Verification
- `npm run lint`: clean (after removing unused constant).
- `npm run build`: passed.

### Git / deploy
- User requested commit, push, and deploy (in progress this session).

### Next useful step
- Confirm production URL after Vercel build; spot-check flavours scroll on phone (static fallback).
