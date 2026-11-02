# Last summary — PerPixel

## 2026-11-02 — Mobile hero handoff and scrolled navbar

- Tightened the gap between the mobile homepage hero and studio tiles. At 390×844, the studio section now starts at 759px rather than 892px; the last hero content still ends at 711px. Desktop and tablet spacing is unchanged.
- The navbar gains a light frosted background after 24px of scrolling, and a dark one over featured work. The open menu keeps the light header; reduced-transparency preference uses an opaque background. CSS declaration order matters here: prefix before standard `backdrop-filter` so the production CSS retains both.
- Verified in headless Edge at 360×640, 390×844, and 768×1024. No phone horizontal overflow; menu and featured header remain legible. Production preview computed `blur(16px)` after scroll. `npm run build`, targeted ESLint, and `git diff --check` passed.
- Changes remain local and uncommitted. Current turn changed `src/components/Navbar.tsx` and `src/app/globals.css`; earlier mobile spacing, wordmark, and sticky-offers changes remain in the working tree. `memory.md` records the durable details.

### Next useful step

Review the hero and header on a real phone, then deploy the mobile changes when approved.
