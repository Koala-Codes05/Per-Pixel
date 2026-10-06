# Last summary — PerPixel

## 2026-10-06 (later) — Footer wordmark spring smoothing

### Changed
- `src/components/Footer.tsx` — footer mark progress now passes through `useSpring(scrollYProgress, { stiffness: 120, damping: 30 })` before `useTransform` → the 30%→8% rise eases and settles instead of tracking scroll 1:1. Overdamped (ζ≈1.37): smooth, no bounce. Reduced motion still static 8%.

### Verified
- Instant jump to page bottom: mark eases 30%→8% over ~1.3s in ~13 visible steps (24.4→17.7→13.5→…→8); reverse scroll settles back toward 30%. Smooth even when scroll input moves in a single step.
- `npm run lint` clean; `npm run build` exit 0.

### State
- Dev server on :3000; pushed as `main` commit after `500a444`; Vercel auto-deploys.

## 2026-10-06 — Footer wordmark scroll trigger + smooth-scroll investigation

### Changed
- `src/components/Footer.tsx` — replaced the one-shot `<Reveal variant="footer">` on the `PERPIXEL` wordmark with scroll-linked Motion: `useScroll({ target: footerRef, offset: ["start end", "end end"] })` → `translateY` 30%→8%. The mark now rests pushed 8% below the footer's bottom edge (cropped by `overflow-hidden` = "moved down") and rises continuously/reversibly as the footer scrolls into view. Reduced motion: static 8%.
- `src/app/globals.css` — removed the now-unused `.reveal[data-reveal="footer"]` rule.
- No smooth-scroll code change: Lenis verified working (see below).

### Verified
- Lenis diagnostics (local dev AND production): real `mouse.wheel` and synthetic `WheelEvent` both produce eased multi-frame scroll (`lenis`/`lenis-scrolling`/`lenis-smooth` classes correct; `scroll-behavior` flips `smooth`→`auto` mid-scroll as designed). Untrusted wheel events can't natively scroll, so the interpolation proves Lenis is driving. No console/page errors.
- Footer check (1440×900): transform = 30% when footer enters, 13.7% mid-way, 8% at page bottom; screenshot confirms mark sits lower and crops at the bottom edge. Reduced-motion context: static 8%.
- `npm run lint` — clean. `npm run build` — exit 0, all routes prerendered.

### State
- Dev server left running on :3000 (background).
- Commit `85c79f8` pushed to `origin/main`; Vercel auto-deploys via the GitHub connection.
- "Smooth scroll not working" unresolved as a defect — it works in every automated check. Likely environmental causes if the user still sees it: `prefers-reduced-motion` set on their OS/browser (Lenis honors it → native scroll, by design), touch input (`smoothTouch` off by default), or attempting to scroll during the intro lock (≤6.5s).

### Next step
- If the user reports where it fails (device/browser/input), consider `syncTouch`/`smoothTouch` for touch devices or confirm their reduced-motion setting. Otherwise nothing outstanding.
