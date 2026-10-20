# memory.md — PerPixel

Persistent project memory: design decisions, rules, and recurring bugs.
Agents: append entries as work happens. Keep it tight — this is for things
worth remembering across sessions, not a changelog (that goes in `last_summary.md`).

## Design decisions

- **Motion language**: editorial, restrained, physical. Motion supports
  composition/hierarchy — the site must never feel like an animation showcase.
- **Standard easings**:
  - Entrances: `cubic-bezier(0.22, 1, 0.36, 1)`
  - Large movement: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Scroll-linked sections use continuous interpolation**, not eased triggers —
  easing fights user scroll.
- **Two animation categories**: viewport-triggered reveals (IntersectionObserver)
  for simple content; scroll-progress-driven for major sequences (wordplay,
  process 1→2→3, horizontal media).
- **Oversized typography is intentional** — preloader words, editorial
  statements, and the footer `PERPIXEL` wordmark may extend beyond the viewport.
  Do not shrink them to fit.
- **Whitespace is a design element** — never compress it to fill space.
- **Rounded image corners** are part of the visual identity; animations must not
  break clipping/radius.

## Rules

- Prefer `transform` / `opacity` / `clip-path`; avoid unnecessary layout animation.
  FAQ/project accordion expansion may animate grid rows as an intentional exception.
- Image containers stay fixed; images scale/move inside (`scale 1.03→1.00` pattern).
- Scroll sequences must reverse correctly on scroll-up — no one-shot observers for them.
- Reserve media dimensions before load; graceful fallback on asset failure; preloader
  must never trap the user (fallback timeout required).
- Disable custom-cursor effects on touch devices.
- Avoid React state updates per scroll frame; isolate animation logic.

## Implementation decisions — 2026-09-12

- The user confirmed this is a greenfield build and supplied desktop/tablet homepage references.
- Stack: Next.js 16.3.5, React 19.2.8, TypeScript, Tailwind v4, Motion 13.2.0, Lenis 1.3.26.
- No Three.js: the supplied design needs typography, images, and scroll motion, not WebGL.
- Homepage scope only. Navigation should target real homepage sections instead of empty routes.
- Original image files, contact details, social destinations, and newsletter integration have not been supplied. Do not present stock imagery as original client work or fake successful submissions.
- `npm run dev`, `npm run lint`, and `npm run build` are available. Read Next's bundled docs before changing framework behavior.

## Redesign decisions — 2026-09-14

- **Hero**: "CREATIVE STUDIO" wordmark with a serif italic signature and an activity-driven supporting phrase. The phrase lives in a stacked CSS grid (`grid-area: 1/1`) so swapping text never changes layout — only `opacity`/`translateY` transition on `.hero-phrase-line`.
- **Hero phrase is activity-driven, not scroll-driven**: `HeroPhrase.tsx` is a small Client Component. On meaningful activity (pointer movement past a 36px threshold, hover over interactive elements, click, Tab/Enter/Escape, focusin on interactive elements) it advances to the next predefined phrase after a 1.1s cooldown. Touch pointers are ignored for movement; the intro lock suppresses activity. Reduced motion shows only the active line instantly.
- **Bento**: editorial asymmetric grid (`article portrait / about contact projects`) using existing project data. Tiles are `bento-article` (blush, journal link), `bento-portrait` (image-only), `bento-about` (sage), `bento-contact` (coral, hover deepens), and `bento-projects-slot` (feature card + project links + disciplines strip). Collapses to 2-col at ≤1023px and 1-col at ≤767px.
- **Process**: the September 15 motion restoration keeps the redesigned compact typography and rounded imagery, but restores a 330svh sticky sequence: frame 2 travels over frame 1, then frame 3, with reversible progress and reading holds. Mobile (<768px), short viewports (<620px), reduced motion, and content-too-tall cases use readable static rows. Descriptions remain visible. ResizeObserver measures actual .process-content height; data-process-part="image" belongs on the inner scaling wrapper.
- **Services** (`/projects`): butter-yellow surface with a two-column heading, a white workspace (vertical tab list + stacked panel grid using `grid-area: 1/1` for layout-stable crossfades), and an image per service. Tabs are a `tablist` with roving keyboard support (ArrowDown/Up/Left/Right/Home/End). Collapses to horizontal scrollable tabs at ≤1023px.
- **New token**: `--color-sage: #e5ecdd` added to `@theme` for the about tile.
- **Hero title sizing**: clamp reduced to `clamp(3.5rem, 8.5vw, 8rem)` and `overflow-x: clip` on `.home-hero` to prevent the `CREATIVE STUDIO` wordmark + registered mark from overflowing the viewport on narrow screens. The `<sup>` is now inline-flex (not absolutely positioned) so it stays inside the title box.

## Homepage contact section — 2026-10-06

- Footer `PERPIXEL` wordmark is scroll-linked (not a Reveal): `useScroll({ offset: ["start end", "end end"] })` on the footer drives `translateY` 30%→8%, so it rests pushed 8% below the footer's bottom edge (cropped by `overflow-hidden`) and rises slightly as the footer enters. Progress runs through `useSpring` (stiffness 120, damping 30 — overdamped, no bounce) so stepped/native scroll inputs still produce a smooth settle rather than 1:1 jumps. Reduced motion = static 8%. `Reveal` no longer has a `footer` variant.
- `#contact-us` sits between `FeaturedProjects` and the footer in `src/app/page.tsx`. Editorial headline (Archivo black lines + Instrument Serif italic "in mind?"), "CONTACT US" label, short paragraph, and a ruled CTA link with a coral circle `ArrowUpRight` → `/contact#form` (the real, working contact flow — no duplicated unconnected form).
- Styling is bespoke `home-contact-*` CSS in `globals.css` (border-block rule, two-column grid → stacked under 768px). Mobile heading clamp is `13.4vw` — `12vw`/`3.5rem` overflowed horizontally at 320px.
- Featured-card "hold plateau" gotcha for tests: at `go(0.25)` card 0 needs ~176px of scroll before `leave` starts; a 140px wheel tick can never move it. `test_featured_portfolio_scene` now wheels 300px forward, 140px back (net stays <176px so the return lands on the hold).
- Known wart (pre-existing): reloading mid-sticky-scene restores scroll ~2 viewport-heights deeper — scroll restoration lands while `data-motion="off"` (short static layout), then the off→on height growth + scroll anchoring shifts scrollY by the section delta. `overflow-anchor: none` on `.featured-section` made it worse (anchored to lower content → clamps at page bottom). Test re-scrolls into the pin after reload; a real fix would need care across all three sticky scenes.

## Conventions established — 2026-09-13

- Design tokens live in `globals.css` `@theme`: `paper`, `ink`, `word-pale`, `coral`, `blush`, `butter`, `line`. Fonts: Archivo (sans/display black) + Instrument Serif (editorial headings). Radius utility: `rounded-card`.
- Tailwind v4 canonical syntax: prefer spacing-scale and ratio utilities over arbitrary values — `max-w-350` (=1400px, the site container) not `max-w-[1400px]`; `aspect-16/10` not `aspect-[16/10]`; `aspect-video` not `aspect-16/9`; `bg-linear-to-*` not `bg-gradient-to-*`. Any clean spacing multiple converts: `max-w-[1100px]` → `max-w-275`, `max-w-[760px]` → `max-w-190`. Bare numeric forms also cover ms durations (`duration-[380ms]` → `duration-380`) and decimal opacity modifiers (`bg-ink/[0.025]` → `bg-ink/2.5`). `text-[Npx]`, `tracking-[Nem]`, `max-w-[Nch]`, `backdrop-blur-[Npx]` stay arbitrary (no scale equivalent). The Tailwind linter flags legacy/arbitrary forms. Normalized codebase-wide 2026-10-17 (incl. page mains + FAQ). `src/works` sub-projects run their own Tailwind versions — leave their utility syntax alone.
- Shared pieces: `Reveal` (IntersectionObserver once-reveal), `ArrowUpRight`, `BrandX` (SVG X mark), `.accordion` CSS rows (grid-template-rows 0fr→1fr), `scroll-sequence.ts` pure scroll math (`frameProgress`, `wordEmphasis`), `lenisRef` singleton for scroll lock.
- Pages: `/` (hero, bento, wordplay, process), `/projects` (hero + filterable gallery + rows), `/journal` (expandable entries), `/about`, `/contact` (form → copyable brief, FAQ accordion). Navbar center mark toggles a full-screen serif menu.
- Preloader: word cycle → X → X expands → fade reveal. `sessionStorage["pp-intro-done"]` skips on repeat loads; 6.5s failsafe; skip button; reduced-motion path.
- Intro lifecycle: `INTRO_BOOTSTRAP` (`src/lib/intro.ts`) is injected with `next/script` `beforeInteractive`. It adds `pp-intro-pending`, locks scroll before first paint, marks `header, main, footer` inert at `DOMContentLoaded`, supports Escape/click skip, and restores everything on finish/timeout. `setRegionsInert` (`src/lib/lenis.ts`) owns the hydrated state and preserves preexisting values; the managed top-level regions use `suppressHydrationWarning` for this expected pre-hydration mutation.
- Contact/newsletter forms have NO backend — they produce a copyable brief / honest "not connected" note. Keep it that way until a real integration is supplied.
- Images are Unsplash placeholders in `src/lib/site.ts` (`PROJECTS`, `PROCESS_FRAMES`) — swap for real assets when provided.
- Next 16 image API: use `preload` for the LCP image; `priority` is deprecated.
- Tests: `node --test tests/scroll-sequence.test.mjs`. Visual checks: `python tests/visual_check.py`, `tests/pages_check.py`, `tests/interaction_check.py` (Playwright; shots land in `tests/shots/`).
- Editor warning `Unknown at rule @theme` comes from the plain-CSS language service; `@theme` is valid Tailwind v4 syntax processed by `@tailwindcss/postcss`. Resolved 2026-10-16 via `.vscode/css-custom-data.json` (declares `@theme`, `@source`, `@utility`, `@variant`, `@custom-variant`, `@reference`, `@plugin`, `@config`, `@tailwind`, `@apply`, `@screen`) wired through `.vscode/settings.json` `css.customData` — keeps unknown-at-rule warnings active for real typos. Alternative: Tailwind CSS IntelliSense extension's Tailwind CSS language mode. Never remove design tokens or disable CSS validation globally to silence it.

## Repository — 2026-10-06

- Remote: `origin` → `https://github.com/Koala-Codes05/Per-Pixel.git` (public, branch `main`). First push 2026-10-06; the remote was empty beforehand.
- Git identity is NOT set in git config (project rule: never modify it). Commit with per-command flags: `git -c user.name="Koala-Codes05" -c user.email="Koala-Codes05@users.noreply.github.com" commit ...`
- `.eslintcache` is gitignored (generated by `eslint --cache`).
- PowerShell shell: no `&&` or heredocs — chain with `;`, and pass multi-line commit messages as multiple `-m` flags. Git's stderr progress output surfaces as a `NativeCommandError` warning even on success; check the actual refs, not the exit noise.
- Vercel: project `koala-codes05s-projects/perpixel`, production https://perpixel-one.vercel.app. Vercel CLI 61.0.0 installed globally; login uses device-code OAuth (no TTY needed). `--name` must be lowercase — the folder name `PerPixel` fails validation, deploy with `--name perpixel`. The GitHub repo is connected, so pushes to `main` auto-deploy. 2026-10-16: CLI token expired — `vercel --prod` returns "Not authorized"; run `vercel login` to restore, git-push deploys unaffected.
- `.gitignore` note: `/node_modules` was root-anchored, which let `src/works/*/node_modules` and `*/dist` slip into staging. Unanchored to `node_modules` + `src/works/**/dist` on 2026-10-16 — keep it unanchored or nested projects will commit dependencies.

## Liquid distortion — 2026-10-06

- `src/components/LiquidDistortion.tsx` renders a `<canvas className="liquid-canvas">` sibling inside image hosts: `.featured-art` (×3), `.bento-portrait`, `.bento-project-image`, `.project-card` image divs (×6 on /projects). Mount it right after `<Image>`; the component finds `parentElement` + sibling `img` itself, so host components stay server-rendered.
- WebGL1 displacement shader (no Three.js): Gaussian falloff `exp(-d²/r²)` around the pointer, bulge `0.3` + velocity smear (`uVelocity`, max 0.09 UV). `uCoverScale` reproduces `object-fit: cover` UV mapping (portrait/landscape branches). `uStrength` runs on a critically-damped spring (ω=9, no bounce); pointer target is recomputed from `getBoundingClientRect()` on scroll so the field tracks during Lenis scroll.
- Texture loads lazily on first hover from `img.currentSrc` — same-origin `/_next/image` proxy → no CORS issue, browser-cached. Keep the GL context alive until unmount: never call `loseContext` to "release" — it can't be re-created on the same canvas.
- The canvas is opaque and covers the `<img>`, so the featured-card hover `blur(10px)` is hidden beneath it — the design keeps the distorted image sharp; blur only shows when WebGL is unavailable. Canvas mirrors each host's hover `scale()` via `.liquid-canvas` rules in globals.css.
- Pointer-fine + no-reduced-motion only (`useMediaQuery` gate, `pointerType !== "touch"`). rAF loop stops when settled; `data-active` toggles opacity (no transition — swap is pixel-identical).
- Headless-Playwright note: screenshot calls trigger harmless `GPU stall due to ReadPixels` WebGL warnings — not an app bug.

## Viewport bottom blur — 2026-10-06

- `.viewport-blur` (mounted in `layout.tsx`, `z-30`, `pointer-events: none`, `aria-hidden`) is a fixed `20svh` band at the bottom of the viewport: six stacked Tailwind backdrop-blur utilities (0.5, 1, 1.5, 2, 3, 4px; the last uses canonical `backdrop-blur-xs`) with staggered `linear-gradient(to top, …)` masks in `globals.css`; subtle blur at the edge that clears upward. The initial 30svh, 1→32px version was too intense after it actually rendered.
- **Root cause of the originally invisible blur:** the compiled CSS omitted `backdrop-filter` declarations written directly in `.viewport-blur > div:nth-child(n)` CSS selectors, leaving only the masks; `getComputedStyle(...).backdropFilter` returned `none` in Chromium even after restarting the server. Tailwind `backdrop-blur-[...]` utilities are compiled and computed correctly. Check computed styles, not just CSS source or a screenshot, when debugging effects.
- Hidden under `prefers-reduced-transparency: reduce`. z-order: content < blur(30) < menu-panel(40) < nav header(50) < preloader(100). `svh` keeps the band stable on mobile URL bars.

## Page-sheet route transition — 2026-10-11

- Internal navigations run a full-viewport "page sheet" via the **native `document.startViewTransition` root snapshot** — no React `ViewTransition` (needs React 19.3+; project is on 19.2.8) and no manual DOM cloning. `src/components/PageTransition.tsx` is a null-rendering client component mounted in `layout.tsx` after `<Preloader/>`.
- **Physical model**: forward = the outgoing page (old root snapshot, `z-index: 2`) slides DOWN `translateY(0 → 100%)` revealing the incoming page stationary underneath (`z-index: 1`, no transform). Browser Back reverses physically: the NEW root snapshot rises `translateY(100% → 0)` over the stationary old page. Browser Forward repeats the forward sheet.
- CSS lives at the end of `globals.css`: `html[data-page-transition='forward'|'back']` scopes `::view-transition-old/new(root)` — `page-sheet-down` / `page-sheet-up`, **1000ms `cubic-bezier(0.5, 0, 0.1, 1)`** (ease-in-out, `both` fill), `opacity: 1` (no crossfade), `mix-blend-mode: normal`, group animation disabled. Reduced-motion media query strips the sheet animations; the JS also bypasses entirely under `prefers-reduced-motion`.
- **Direction + scroll restore**: `history.state.__ppRouteIndex` tags every entry; a `popstate` listener (window capture, `stopImmediatePropagation` + redispatch so the router still navigates) compares indices for direction. A `Map<index, {x,y}>` stores per-entry scroll positions; Back restores via `lenisRef.scrollTo(y, {immediate, force})` (±5px verified).
- **Locking**: `lockScroll("route")` + `document.body.inert = true` for the whole transition; released in `finish()` along with `data-page-transition*` attrs. Scroll stays locked while fonts + visible `main img`s settle (1200ms cap) so the incoming snapshot is stable; in-viewport `.reveal`s get `.is-in`; `main` is focused (tabindex -1) after success.
- **Bypasses (plain navigation, no attr)**: reduced motion, missing `startViewTransition`, same pathname (incl. hash-only links), external/non-http(s), modified clicks (`meta/ctrl/shift/alt`, non-left button, `detail <= 0` so keyboard Enter clicks fall through), `download`, `target != _self`, `data-no-transition`, and while `pp-intro-pending` is set.
- **Aborts**: Escape, resize, `pagehide`, mid-transition media change, second pending navigation (`pending.current?.finish()` before a new `run()`), and a 6.5s watchdog all call `finish()` → `skipTransition()` + release. A second link click during a transition is `preventDefault`ed and dropped — first navigation wins.
- Verified by `python tests/page_transition_check.py` (Playwright; pause/seek `::view-transition-*` animations via `document.getAnimations()` for deterministic mid-animation asserts; shots in `tests/shots/`).

## Moove 2026 branding showcase — 2026-10-16

- **Dual deliverable**: Live Next.js route at `/projects/moove` (`src/app/(moove)/projects/moove/page.tsx` + client islands in `src/components/projects/MooveShowcase.tsx`) and standalone self-contained showcase at `src/works/Moove/index.html` (`src/works/Moove/PRODUCT.md`).
- **Project routing (`src/lib/site.ts`)**: `Project` now supports optional `href?: string`. `PROJECTS[0]` (`moove`) sets `href: "/projects/moove"`, wired across `Bento.tsx`, `FeaturedProjects.tsx`, `ProjectsGallery.tsx`, `/projects` (`#details-moove` row + hero card), and `Footer.tsx`.
- **Architecture & motion**:
  - `MooveHeroInspector`: `role="radiogroup"` finish switcher (`RC-04`, `RT-02`, `SC-07`, `BP-09`) with roving arrow-key focus, live stage tinting + `<LiquidDistortion />`, and toggleable SVG orthographic compass-crease overlay (`R 640 mm`).
  - `MooveCollectionLedger`: `role="tablist"` 4-edition catalog (`Arca 01`, `Plinth 02`, `Velo 03`, `Halo 04`) using `grid-area: 1 / 1` stacked panels for zero layout shift, SVG section drawings, and custom event `moove:select-piece` handoff to the dossier form.
  - `MooveShellSequence`: 290svh sticky scroll-linked sequence (`#shell-study`) driven by `frameProgress` and direct DOM/SVG updates on scroll (no per-frame React state). Syncs `html[data-featured-visible]` while behind the fixed header so the PerPixel navbar switches to light `paper` ink over the dark `#shell-study` band. Collapses to static readable rows on `<768px`, `<620px` height, and `prefers-reduced-motion: reduce`.
  - `MoovePaletteSwatches` & `MooveDossierBuilder`: click-to-copy mineral hex tokens and validated local specification sheet generator (`noValidate`, `role="alert"` errors, copyable `<pre>`).
- **Build & lint isolation**: `src/works` contains standalone sub-projects (with their own `node_modules` and standalone TSX playgrounds); excluded `src/works` in `tsconfig.json` and `eslint.config.mjs` ignores `src/works/**` plus `public/works/**` (prebuilt showcase bundles, untracked).

## External research — 2026-10-20

- Competitor landscape lives at `research/competitor-studios.md` (9 global studios + 9-studio India landscape + content-strategy patterns + pricing/review/culture deep dive + live-site critique + case-study anatomy + client-acquisition channel data + takeaways). Site screenshots in `research/shots/`.
- Case-study structure to reuse: client + one-line idea + industry/year header → Challenge → Strategy → Identity → Application → Outcome (Koto pattern). One project yields sales asset + LinkedIn post + awards entry + press pitch.
- Client acquisition reality: referrals dominate (~34% of discovery, 86% of branders rely on it); search ~21%; RFPs ~7%; directories ~6%; cold outreach ~2%. Case studies are the conversion layer for every channel; self-initiated platforms and adjacent partnerships (dev shops, consultants) are the referral multipliers.
- Pipeline mechanics (from doc): referral close 32-45%, tight outbound 18-25%, generic cold 4-9%; channel lead-times stack (referrals ~30d, outbound mo 4-5, content mo 6-9, SEO mo 10-12). Cold-start: spec studies on real brands + 2-3 strategic discounted projects + proximity outreach + VC referrals. Moove should be written up as the flagship self-initiated case; label spec work honestly, never implied client work.
- `/playbook` route (`src/app/(site)/playbook/page.tsx` + `src/components/playbook/PlaybookShowcase.tsx` + `src/components/playbook/playbook-data.ts`): interactive Studio Intelligence & Growth Playbook turning `research/competitor-studios.md` into an editorial web surface with 26 competitor screenshots (`public/research/shots/*.png`), 3-video showreel strip, filterable 18-studio matrix, side-by-side site critique inspector, dual-market INR/USD pricing & scope estimator, Koto/Uniqode case-study anatomy deconstructor, 6-stage pipeline & coverage calculator, 4 case-study blueprints, and an interactive `#next-plan` 30/60/90-day roadmap. Linked from `NAV_LINKS` and `/journal`.
- Windows/PowerShell worker note: PowerShell file writes from delegated workers can write non-UTF-8 bytes on `—`/`₹`/`×`; keep data files UTF-8 clean so Turbopack rope parsing never fails.
- Dev-preview / sticky-scroll gotchas fixed (2026-10-20): (1) Next 16 blocks `/_next/*` dev resources when accessed via `127.0.0.1` (`browser_preview`) unless `allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.7"]` is set in `next.config.ts` — when blocked, `INTRO_BOOTSTRAP` holds the white `.preloader` screen for 6.5s and SSR `data-motion="off"` sections never hydrate. (2) `FeaturedScene.tsx` (`tallest + 185 <= innerHeight`) and `Process.tsx` (`tallest + 112 <= innerHeight`) disabled sticky scroll on 1080p screens with 125%/150% scaling or preview bars (~600–710px `innerHeight`); relaxed buffers to `tallest + 60` (`>=540px`) and `tallest + 64` (`>=520px`). (3) On `D:\`, `next dev` has ~206ms FS latency and 1–5s per-route lazy compilation — use `npm run build` + `npm run start` for fast previewing.
- **agent-browser cannot reach LinkedIn**: all pages redirect to authwall when logged out; "Sign in with Google" is blocked inside automated Chrome ("browser or app may not be secure"). Working paths if ever needed: real LinkedIn email+password (user currently has Google-only — needs a "Forgot password" reset to set one), a `cookies set --curl` import, or `--profile`/`--auto-connect` on a Chrome where the user is already signed in.
- Fallback that worked: web_search/webfetch on studio sites + design press; LinkedIn company stats surface in public snippets/aggregators (Endole etc.) without logging in.
- Aggregator name-collision trap: Clutch's "Koto Design Studio" (Chile) ≠ Koto Studio London; Glassdoor's "The Walsh Group" (construction) ≠ &Walsh. Verify identity before citing reviews/pricing.
- `research/shots/` holds agent-browser screenshots of 12 competitor sites (2 each). Studio sites commonly take ~4-5s to settle (preloaders/video) — screenshot loops need a real wait, and lazy-load sections can render blank mid-scroll (Yukiko does this visibly).
- PowerShell notes for agent-browser: chain with `;` not `&&`; set `$env:AGENT_BROWSER_SESSION` per shell; `agent-browser wait --url <substr> --timeout <ms>` runs well as a background shell while the user acts.

## Route-group chrome split — 2026-10-17

- `/projects/moove` has its **own nav bar and footer**; site chrome is split by route group instead of pathname checks: `src/app/layout.tsx` keeps only intro bootstrap + `SmoothScroll`/`Preloader`/`PageTransition`/`viewport-blur`, `(site)/layout.tsx` adds `<Navbar/>`+`<Footer/>`, `(moove)/projects/moove/layout.tsx` adds `MooveNavbar`+`MooveFooter`. Group layouts are nested (not root) so client nav + view-transitions still work.
- `MooveNavbar.tsx` (server): sticky `top-0` header, translucent blush (`color-mix` 92%) + `backdrop-filter: blur(10px)`, `line-strong` bottom border, z-40 — port of `src/works/Moove` `.site-header`. MOOVE® badge + meta, section anchors, "All projects" back link (escape route to site). Mobile ≤767px: meta hidden, links wrap to second row.
- IDE gotcha: diagnostics lag route-group moves — warnings for `src/app/projects/moove/page.tsx` kept being reported after the file moved into `(moove)/`, and persisted even after the empty `src/app/projects/` dir was removed (verified gone via `Test-Path`). Recurred in a later session: the same 8 canonical-class warnings resurfaced against the deleted path while the live file was already clean. The language server holds a stale buffer — resolve via "Tailwind CSS: Restart Server" / "Developer: Reload Window"; if an orphaned editor tab exists, close WITHOUT saving (saving recreates a duplicate `/projects/moove` route that conflicts with the group route). Verify the file still exists before "fixing" stale warnings.
- `MooveFooter.tsx` (client): dark `bg-ink` sign-off echoing the PerPixel footer pattern — serif editorial line, `#dossier` CTA, Showcase/Studio link cols, `rounded-t-4xl`, and the same scroll-linked oversized wordmark (`useScroll` offset `["start end","end end"]` → spring 120/30 → `translateY` 30%→8%, reduced-motion static) at `clamp(6rem,28vw,28rem)` coral "MOOVE".
- `html[data-featured-visible]` is still toggled by `MooveShellSequence` but now matches nothing on this page (no `.site-navigation`); the sticky Moove header stays blush over the dark band. Harmless.
- Intro/inert compatibility: any page chrome must render as top-level `<header>`/`<footer>` + `suppressHydrationWarning` so `INTRO_BOOTSTRAP` + `setRegionsInert` (selector `header, main, footer`) cover it — both Moove chrome pieces do.
- `app/not-found.tsx` renders `<Navbar/>`+`<Footer/>` itself — group-level `not-found.tsx` only fires on `notFound()` inside that group; unmatched URLs render under the **root** layout, which has no chrome.

## Sorso aperitivo port — 2026-10-17

- Second native work route after Moove: `/projects/sorso` under `src/app/(sorso)/projects/sorso/` with its own chrome (`SorsoNavbar` sticky pill bar). Standalone original stays at `/works/offset/` (dir kept the historical name; slug + card point at the Next route).
- Deliberate simplification vs the 1745-line GSAP standalone: flavour tabs → three stacked full-bleed articles (`.sorso-flv`, per-flavour bg); keep everything else — aperitivo clock, tag marquees, bitter bento, serve ritual, filterable moments, mixed-case order, "Salute." wordmark footer.
- `SorsoShowcase.tsx` client islands: `SorsoClock` (scroll-progress 17:00→20:30, passive listener, no React state, reduced-motion off), `SorsoMoments` (`hidden`-attr filtering + `aria-pressed`), `SorsoCaseButton` (`data-added` toggle + `aria-live` announcement). Bottle SVGs are inline server-side in `page.tsx` (`SorsoBottle`, shared `<defs>` + `liq-*` gradient ids).
- `.sorso-*` CSS block at end of `globals.css` — its own palette (`--sorso-blush` etc.), NOT `@theme` tokens. Bodoni/display serif fallback stack local to the block.
- Mobile nav ≤620px: `.sorso-nav { flex-wrap: wrap }` + `.sorso-nav-links { width:100%; justify-content:flex-start }` — pills must drop to left-aligned rows under brand+clock, not stack as a squeezed right column (first attempt without `flex-wrap` did exactly that).
- Checks: `python tests/sorso_check.py` (16 asserts: filters, articles, case button, clock, reduced motion, overflow), `python tests/sorso_shots.py` (shots; seed `sessionStorage pp-intro-done` and point at the dev server :3000 — `next start` builds serve stale CSS).

## Bugs and prevention

| Date | Issue | Root cause | Fix / prevention |
|------|-------|------------|------------------|
| 2026-09-12 | Project agent instructions overwritten during scaffolding | Scaffold files were moved over the existing `AGENTS.md` | Restored project workflow alongside Next's generated block; merge scaffolding files selectively in future. |
| 2026-09-12 | Initial scaffold name rejected | npm package names cannot begin with an underscore | Use a valid package name; the installed app is named `perpixel`. |
| 2026-09-13 | `react-hooks/set-state-in-effect` errors | Synchronous `setState` in effect bodies | Schedule state changes via timeouts/microtasks, or adjust state during render (Navbar `prevPath` pattern). |
| 2026-09-13 | Full-page screenshots showed "missing" sections | `whileInView`/`once` reveals never fired below the fold during capture | Scroll through the page before `full_page` screenshots — not a real bug, but verify before assuming content is broken. |
| 2026-09-13 | Page regions were focusable before the intro hydrated | `inert` was applied only in a React effect, after `DOMContentLoaded` | Apply/release temporary inert state in the intro bootstrap, then let `setRegionsInert` take ownership; suppress expected hydration diffs on the managed top-level regions only. |
| 2026-09-13 | Invalid contact emails kept a stale required-field error | Native browser validation intercepted submit because `noValidate={false}` | Use `noValidate` plus the custom submit validation; keep `required` on required fields for semantics. |
| 2026-09-14 | Horizontal overflow from hero `CREATIVE STUDIO` wordmark + absolutely positioned `<sup>` | The registered-mark `<sup>` was positioned at `right: -0.8em`, pushing past the viewport; Archivo Black glyphs are wide at `10.5vw` | Make the `<sup>` inline-flex inside the title, reduce the title clamp to `8.5vw`, and add `overflow-x: clip` to `.home-hero` as a safety net. |
| 2026-09-15 | Process travel disappeared after redesign | Frame transforms were removed and tests were changed to expect stationary rows; animated/mobile CSS hid descriptions | Restore frameProgress-driven translateY with layered sticky panels while retaining new styling; assert actual overlap, holds, reversal, and readable static descriptions. |
| 2026-09-14 | Test bounding-box equality assertions were too strict | Lenis smooth-scroll settling and float rounding caused sub-pixel/2px drift | Use tolerance-based `same_box()` (±2.5px) for hero phrase stability and container-relative metrics for the services panel stability. |
| 2026-09-14 | Slow build & dev compilation times on Windows | Unexcluded Defender real-time scanning on D: drive, cold Turbopack cache, unoptimized Motion imports, and unscached ESLint | Added `optimizePackageImports: ["motion", "lenis"]` in `next.config.ts`, excluded `.next/cache` in `tsconfig.json`, added `"type": "module"` and `--cache` to `package.json`, and documented Defender exclusion for the project folder. |
|| 2026-09-13 | "Site not starting/compiling for 10–20 min" (user report) | Not a crash — site compiles & runs. Cold `/` compile = 16.8s (Turbopack first-compile of `motion`/`lenis` graph); warm = 0.4s. The 10–20 min is Defender real-time scanning compounding across thousands of small file ops; Next flagged "Slow filesystem benchmark 521ms" (up from 206ms — exclusion still not applied). | No code bug. Fix is `Add-MpPreference -ExclusionPath "D:\Dev Domain\~Projects\PerPixel"` (admin PowerShell). `optimizePackageImports` is a **no-op under Turbopack** (docs: Turbopack auto-optimizes) — left in place as harmless + helps `--webpack` fallback. Optional: `next/dynamic` lazy-load `Wordplay`/`Process` to shrink first-compile graph (~30% shave, not a Defender fix). |
| 2026-09-15 | Reduced-motion service tabs overlap | Generic opacity:1!important rule included all service panels | Exclude .service-panel from the opacity override, reset only its transform, and let data-active control visibility. |
| 2026-09-15 | Preloader diagnostic crashes after successful completion | tests/preloader_check.py called getComputedStyle(null) after overlay unmounted | Null-guard diagnostics and assert session completion, released locks/inert state, and no console/page errors. |
| 2026-10-06 | "Smooth scroll not working" user report — Lenis verified working (real wheel input → eased multi-frame scroll, `lenis-smooth` class active mid-scroll) on localhost AND prod | No code bug found | Diagnostic trick: `dispatchEvent(new WheelEvent(...))` is untrusted and cannot natively scroll — if scrollY still moves smoothly, Lenis drove it. If users report dead scroll, check `prefers-reduced-motion` (Lenis `respectReducedMotion` + `SmoothScroll` both disable it by design), touch input (`smoothTouch` off by default), or scrolling during the ≤6.5s intro lock. |
| 2026-10-11 | Page-transition test asserted released state while transition still ran | `animation.play()` on a `::view-transition` animation paused at `currentTime = duration` **restarts** it at 0 (spec auto-rewind), doubling the wait; also clicking a `#hash` link whose href equals the current URL is deduped by the router (no new history entry) | In tests, complete paused VT animations with `animation.finish()`, not `play()`. For same-page hash clicks, `history.replaceState` away the hash first so the click is a real new entry. |
| 2026-10-16 | Vite dev server returns 403 Forbidden for index.html | Trademark symbol '™' in directory name ('SNACKVERSE™') triggers Vite FS allow-list path comparison failure | Set server.fs.strict: false in vite.config.ts |
| 2026-10-16 | `npm run build` / `npm run lint` failed or stalled on `src/works/*` | Standalone sub-projects inside `src/works/` (`Ghaslet/node_modules`, `SNACKVERSE™/*.tsx`) were picked up by root TypeScript and ESLint globs | Exclude `"src/works"` in `tsconfig.json` and `"src/works/**"` in `eslint.config.mjs`. |
| 2026-10-16 | Instant `window.scrollTo` right after Playwright `.click()` was pulled back to previous scrollY | Playwright `.click()` scrolls target into view, starting a 1.05s Lenis smooth scroll whose `autoRaf` loop overwrites `window.scrollY` on the next frame | Wait for click-induced Lenis scroll to settle (~1.1s) before running instant scroll-position assertions. |
| 2026-10-16 | Impeccable v4.6.0 flagged WCAG contrast failures in `src/works/Moove/index.html` that v4.5 missed | Standalone palette uses `rgba(24,19,18,α)` muted text; α ≤0.62 computes to <4.5:1 on `--surface`/`--blush-soft` (0.55→3.8:1, 0.6→4.48:1) | Muted dark text on light Moove surfaces needs α≥0.68; use 0.72 as the baseline. Re-run `impeccable.cmd detect --json` after any palette/alpha change. |
| 2026-10-16 | Impeccable flagged intentional italic-serif hero `<em>` as `italic-serif-display` slop | Detector fully analyzes static HTML; the same Archivo-roman + italic-serif counterpoint on the React route isn't composed statically | Justified exceptions waive inline: `<!-- impeccable-disable <rule-id> -- reason -->` (file-wide), `-line`/`-next-line` scoped. Update ran `npx impeccable update` → v4.6.0, engine v0.1.15 in `~/.agents/skills/impeccable/scripts/bin/windows-x64/`. |
|| 2026-10-17 | `next build` type-check failed on moved routes (`Cannot find module src/app/about/page.js`) | `.next/dev/types/validator.ts` is generated per dev-server file tree and went stale after `git mv` into route groups | Delete `.next/dev` (or rerun `next dev` once) after moving app routes; build regenerates types. |
|| 2026-10-17 | `npm run lint` suddenly reported 45 errors / 1512 problems | Newly added `public/works/**` prebuilt Vite bundles (minified JS) were inside the eslint glob | Ignore `public/works/**` in `eslint.config.mjs` alongside `src/works/**`; generated bundles are never linted. |
