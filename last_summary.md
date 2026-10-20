# Last summary — PerPixel

## 2026-10-20 — Built `/playbook` Studio Intelligence & Growth Playbook website

### What was asked
Turn all the competitor, pricing, website critique, case-study anatomy, acquisition, and pipeline research into an image-and-video-rich interactive website with a dedicated `Next Plan` section, delegating heavy lifting to avoid burning main-session tokens.

### What changed
- `public/research/shots/*.png`: copied all 26 live competitor website screenshots into `public/research/shots/` so Next.js serves them.
- `src/components/playbook/playbook-data.ts`: structured dataset for all 18 studios (9 global, 9 India), 13 website critiques with good/bad/lesson notes, 6 deliverable pricing tiers (Global USD + India INR across Seed/Growth/Enterprise stages), 6-step case-study anatomy (Koto/Uniqode benchmark vs PerPixel/Moove application), 9 client acquisition channels, 6-stage new-business pipeline, 4 concrete PerPixel case-study blueprints, and the 3-phase 30/60/90-day Next Plan roadmap.
- `src/components/playbook/PlaybookShowcase.tsx`: interactive client showcase with:
  - Sticky chapter bar (`01`–`07`)
  - `01` Filterable & searchable 18-studio comp matrix with live homepage previews
  - `02` Interactive Website Critique Inspector (`Side-by-Side`, `Shot 01`, `Shot 02` toggle across 26 captures + Steal This / Avoid This cards + 4 synthesis rules)
  - `03` Dual-Market Pricing & Scope Estimator (`INR Domestic` vs `USD Global` toggle, deliverable & client-stage selector, 50/50 payment split, full comparison table)
  - `04` Interactive Case-Study Anatomy Deconstructor (`01 Header` → `06 Outcome` with video stage + `1 Project → 4 Assets` multiplier)
  - `05` Client Acquisition Channels + Pipeline Coverage Calculator + 12-month $660k outbound benchmark + interactive 6-stage funnel inspector
  - `06` Cold-Start Playbook + 4 image-and-video Case Study Blueprints linking to `/projects/moove`, `/projects/sorso`, `/works/ghaslet/index.html`, and `/works/dune/index.html`
  - `07` `#next-plan` Interactive 30/60/90-Day Execution Roadmap with checkable tasks and progress counter
- `src/app/(site)/playbook/page.tsx`: Server Component assembling the editorial hero, 4 stat tiles, 3-video showreel strip (`raw_12-aurora-glass.mp4`, `dunes_golden.webm`, `raw_07-liquid.mp4`), and `<PlaybookShowcase />`.
- `src/lib/site.ts`: added `{ href: "/playbook", label: "Playbook" }` to `NAV_LINKS`.
- `src/app/(site)/journal/page.tsx`: added featured research callout banner linking to `/playbook`.

### Verification
- Delegated initial scaffold via `bridge_delegate` (`codex`), cleaned up `.bridge/`, fixed CP1252 encoding / `next/image` / hook lint warnings, and ran `npm run lint` + `npm run build` — both passed cleanly.
- Fixed 3 root causes behind broken preloader/sticky-scroll/slowness in preview:
  1. Added `allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.7"]` to `next.config.ts` (Next 16 was blocking `/_next/*` dev resources when opened via `127.0.0.1` preview proxy, trapping `INTRO_BOOTSTRAP` for 6.5s and preventing client hydration of preloader, Lenis, and sticky scroll).
  2. Relaxed viewport-height fit thresholds in `FeaturedScene.tsx` (`>=540px`, `tallest + 60`) and `Process.tsx` (`>=520px`, `tallest + 64`) so 1080p laptops with scaling/browser chrome don't fall back to `data-motion="off"`.
  3. Switched background videos in `PlaybookShowcase.tsx` to `preload="none"` and started the precompiled production server (`npm run start`) on `http://localhost:3000` to eliminate `next dev`'s 1–5s on-demand compile lag on `D:\`.

### Blockers / next step
- None. Next useful step: apply Phase 1 of `/playbook#next-plan` — add the Challenge → Strategy → Identity → Application → Outcome header narrative directly onto `/projects/moove` and `/projects/sorso`.
