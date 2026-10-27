# Last summary — PerPixel

## 2026-10-28 — Mobile preloader first-paint + frame-by-frame sticky on phones

### What was asked
"the frame by frame sticky is not working and the preloader is not working on mobile"

### Findings
- **Preloader root cause**: the intro bootstrap never ran at parse time. `next/script strategy="beforeInteractive"` and a manual JSX `<script>` both serialize into `__next_s`/`__next_f` flight data in Next 16 (Turbopack) — they only execute when the JS runtime hydrates, ~275ms–1s+ after first paint on a slow phone, so the homepage flashed before the overlay appeared. Verified in the served HTML: no executable script tag existed, only a flight payload.
- **Sticky root cause**: `Process` (homepage) and `MooveShellSequence` (/projects/moove) were hard-gated on `innerWidth >= 768` — every phone rendered them as a static stack. `Wordplay` and `FeaturedScene` already worked on mobile (measured fit gates) — confirmed via `tests/_sticky_probe.py`.

### What changed
- `src/app/layout.tsx`: bootstrap is now a real parse-time script — `<div id="pp-intro-bootstrap" dangerouslySetInnerHTML={__html: "<script>"+INTRO_BOOTSTRAP+"</script>"} />` as the first `<body>` child. Confirmed in served HTML at byte ~1984, before `.preloader`.
- `src/lib/intro.ts`: bootstrap adds `pp-intro-seen` for returning visits (hides the default-visible overlay), `pp-intro-pending` for new ones; `finish()`/`endIntro()` also set `pp-intro-seen`; `window.__ppIntroStart` records bootstrap time; new `pp:intro-hydrated` event so the bootstrap's 6.5s failsafe yields once the React Preloader mounts its own timer.
- `src/app/globals.css`: `.preloader` is `display:grid` by default (SSR covers first paint); `html.pp-intro-seen .preloader{display:none}`; `html:has(.preloader)` locks scroll before any JS. Mobile on-mode CSS: `.process-content` compact 2-col, smaller frame padding; `.moove-shell-viewport` gets `padding-top: 4.75rem` to clear the 2-row mobile header; `.moove-shell-frame-grid` stacks 1fr with `16/10` image capped at `min(64vw,300px)`; `.moove-shell-live-svg` hidden on phones; frame images hidden under `max-height:740px` so short phones still fit.
- `src/components/Preloader.tsx`: dispatches `pp:intro-hydrated` on mount; `noscript` style hides the overlay when JS is off; when hydration was slow (`waited > 1500ms` via `__ppIntroStart`) it skips to a short first+last word cycle instead of all four.
- `src/components/home/Process.tsx`: gate is now `innerHeight >= 520 && tallest + 72 <= innerHeight` — width check removed.
- `src/components/projects/MooveShowcase.tsx`: `isDesktop` removed; new `contentFits` state measured by ResizeObserver (tallest `.moove-shell-frame-grid` + header + 150px chrome <= `innerHeight`) with a `min-height:520px` floor.
- `tests/interaction_check.py` repaired (was red before these changes): polls for mid-transition opacity and accordion height instead of fixed-time samples; asserts services stage `w`/`h` only (dx/dy are viewport-relative and legitimately shift); card count 6→10, Design filter 1→2.
- New probes: `tests/_sticky_probe.py`, `tests/_sticky_shots.py`, `tests/_services_probe.py`.

### Verification (all run this session, against `next start` production build on :3000)
- `npm run lint`: clean. `npm run build`: passed.
- `tests/preloader_phone.py` (4× CPU, slow network): frame sheet shows the white overlay + word from the very first 250ms frame — zero homepage flash; intro completes ~6.1s, releases cleanly.
- `tests/webkit_phone.py`: intro releases 5.02s; `pp-intro-seen`; inert cleared; **`wordplay-section:on`, `process-section:on`, `featured-section:on`** on WebKit mobile; menu/nav/card-tap pass; 0 errors.
- `tests/_sticky_probe.py` phone (390×844): homepage `wordplay on` / `featured on` / `process on` with transforms progressing through scroll and holding at end; `/projects/moove` `shell-section on`, frames sliding 115%→0% per phase.
- `tests/_sticky_shots.py` screenshots reviewed: mobile Process frame centered and compact; mobile shell shows full header, κ readout, progress bar, frame text+image; desktop layouts unchanged.
- `node --test tests/scroll-sequence.test.mjs`: 11/11.
- `tests/mobile_audit.py`: 12 routes, no overflow/errors/broken images.
- `tests/mobile_interaction.py`, `tests/page_transition_check.py`, `tests/reduced_motion_check.py`, `tests/interaction_check.py`: all pass.
- Impeccable `detect` on all changed UI files: no findings.
- Served-HTML check: bootstrap script is a parse-time tag immediately after `<body>`; `.preloader` present in SSR markup.

### Current state / blockers
- Not committed or pushed.
- `next start` running on :3000; phone on same Wi-Fi can open `http://192.168.1.7:3000`. A stale node process had to be killed first (PID held the port and served the old build).
- Still waiting on the user for a contact email and social URLs.
- Not verified on a real iPhone — WebKit/Chromium emulation only.
- Very short phones (<~740px tall) hide the moove shell frame images so the sequence still fits; extremely short/landscape viewports still fall back to the static stack by measurement.

### Next useful step
Check on a real phone over LAN, then commit + push for Vercel deploy. Wire email/socials when supplied.
