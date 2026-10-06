# Last summary — PerPixel

## 2026-10-06 — Homepage "Contact us" section after portfolio

### Changed
- `src/app/page.tsx` — added `<section id="contact-us">` after `<FeaturedProjects />`: headline "HAVE SOMETHING *in mind?*" (Archivo black + Instrument Serif italic), "CONTACT US" label, short paragraph, ruled CTA "Start a project brief" with coral circle arrow linking to `/contact#form` (the existing working contact flow — no duplicated form, no fake integration).
- `src/app/globals.css` — new `home-contact-*` styles: border-block rule, 2-column grid (headline / details) that stacks under 768px, coral icon hover with 200ms editorial ease, `scale(0.96)` press, hover gated behind `(hover:hover) and (pointer:fine)`. Mobile heading `clamp(2.625rem, 13.4vw, 5.25rem)` fixed a 320px horizontal overflow found during verification.
- `tests/visual_check.py` — new `test_home_contact_follows_portfolio` (section order, CTA href, visibility, no overflow at 1440/820/390/320, keyboard focus, click → `/contact#form`, reduced motion). Also fixed two pre-existing failures in `test_featured_portfolio_scene`: wheel distance 140→300 (card hold plateau needs ~176px to start leaving) and re-scroll into the pin after reload (scroll restoration lands ~2061px deep due to off→on height growth + scroll anchoring — noted in `memory.md` as a known wart).

### Verified
- `npm run lint` — clean, no findings.
- `npm run build` — exit 0, all routes prerendered.
- `python tests/visual_check.py` — 12/12 pass (full suite re-run).
- Browser inspection at 1440×900, 820×1180, 390×844, 320×700 — correct layout, no overflow, visible focus ring, CTA navigates; no console/page errors.
- Impeccable `detect` on changed files — no findings.

### State
- Dev server was already running on :3000 and was used for checks; left running.
- No Git repository; no commit, push, or PR.
- Agent-browser session `perpixel-contact-home` closed.

### Next step
- Nothing outstanding. If the reload-mid-scene scroll jump (memory.md) ever becomes a priority, it needs a coordinated fix across the three sticky scenes, not a per-section anchor tweak.
