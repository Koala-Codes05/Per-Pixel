# PerPixel client-readiness audit — 2026-10-27

## Scope and confidence

Reviewed local `Per-Pixel` source, contact/newsletter handlers, portfolio data/templates, About/Journal, metadata, and stored desktop/mobile screenshots in `tests/shots`. These are historical screenshots, not new captures of production. Sibling `perpixel` is a different scaffold.

Web fetches of live home/contact/projects failed; a separate PowerShell HTTP request also failed. No connected browser was available. This does not prove the public site is down. Deployment parity, live interactions, delivery, real-device behavior, and performance remain unverified. No application changes or messages sent; no tests/build run for this audit.

## Verdict

Strong visual foundation; local implementation is not ready to collect enquiries. Prioritize contact delivery, credible work evidence, and a clear offer before additional visual work.

## Prioritized findings

| Priority | Finding and source | Action today | Acceptance check |
| --- | --- | --- | --- |
| P0 | `ContactForm.tsx`: submit prevents default and only generates a copyable brief. Contact/FAQ promise replies. No direct studio email fallback found. | Connect a real inbox through a server-side handler or configured form service; add visible direct email. Keep phone optional. | Verify actual inbox receipt and reply-to from another device/address. Test invalid input, failure/retry, duplicate clicks. Only show success after service acceptance. |
| P0 | `Footer.tsx`: newsletter submit sets `no-list`; no subscription integration. | Remove the block until configured. Replace with project CTA/email. | No unconnected subscription affordance. |
| P1 | `Hero.tsx`: broad “Creative Studio” / “digital experiences” positioning. | Keep visual headline; add concrete buyer/service sentence and nearby “Start a project” CTA. | New visitor understands what to hire you for without scrolling. |
| P1 | About: no named practitioner, background, location/time zone, or professional profile. Bento says “Contact me”; most copy says “we.” | Add factual bio/name, portrait if available, location/time zone, real profile links, consistent solo/studio voice. | Visitor knows who does the work and how to reach them. |
| P1 | Five studies share a template and repeat one stock photograph per study. Deliverables exceed displayed evidence. | Feature three strong projects. Use actual design covers and show claimed packaging, spreads, checkout, and motion—or narrow claims. | Each featured project demonstrates its listed outputs. |
| P1 | Immersive brand sites do not consistently explain the studio contribution up front. | Add short case-study introductions: project status, problem, role, scope, duration, actual outputs, decisions; clear return/contact route around demos. | Prospect understands your contribution and can return to enquire. |
| P2 | `JournalList.tsx`: three image/excerpt accordions; no full article bodies. | Hide Journal from primary navigation or publish one finished useful article. | Promoted stories deliver substantive content. |
| P2 | Intro has 6500ms failsafe; route animations last 1000ms. Historical notes report ~5–6s phone intros, not remeasured here. | Shorten forced waits; consider skipping full intro on contact/deep links while preserving visual language. | Measure fresh visits on a real phone; no trapped scrolling or navigation. |
| P2 | Root metadata has basic title/description; no explicit OG image, Twitter card, canonical base; no app sitemap/robots files found. | Add deliberate share preview/URL metadata and crawl files after the enquiry path works. | Inspect deployed previews and crawl metadata. |

## Project assessment

- **Sorso:** strongest immediate visual candidate from stored mobile screenshot: coherent palette, bottles, product narrative, serving scenes, and showreel. Add concise studio case study and concept label near entry; fictional-brand disclosure currently appears in footer.
- **Ghaslet:** strong contrasting project: energetic type, illustrated bottles, product interaction, bright palette. Good initial featured candidate. Source points to real Ghaslet Instagram/DM destinations; state accurately whether commissioned or independent, without implying an unverified client relationship.
- **Moove:** substantial restrained identity and interactive experience. Good featured candidate. Replace generic chair cover with a designed identity/application image; distinguish brand/web work from furniture engineering. Blank black area in stored screenshot could be sticky-scroll capture behavior, not a demonstrated defect.
- **Dune:** useful if pursuing fashion/editorial clients. Needs real scrolling/readability check on phones. Sparse regions in stored screenshot may be reveal/sticky capture artifacts; do not classify as bugs without runtime evidence.
- **SNACKVERSE:** distinctive playful secondary project. Dense mobile presentation deserves real-device readability review; add a concise purpose/role explanation.
- **Velora, Kilim, Norra, Atlas, Field Notes:** honest self-initiated labels are good. Shared template and stock-photo recrops provide weaker evidence than built brand experiences. Velora lists bottle/carton/checkout outputs but displays a wordmark, palette, portraits, and homepage concept. Norra should demonstrate actual titles/stings/stage visuals. Expand selected studies or move these into an experiments collection.

Suggested initial feature order: Sorso, Ghaslet, Moove. Substitute Dune if fashion/editorial clients are the immediate target. This is an editorial assessment from local source and historical images, not a production performance ranking.

## One-day scope

1. Establish actual destination email and make enquiries deliver. If backend configuration is unavailable today, expose working direct email immediately.
2. Remove unconnected newsletter and unfinished Journal promotion.
3. Tighten hero offer and add factual founder/contact details.
4. Feature three projects with honest status, role, scope, actual outputs, and design-specific covers.
5. Test deployed enquiry and featured-project paths on desktop/real phone: menu, back, portfolio return, touch/keyboard access, image failures, error feedback.

Minimum scope is a focused day if inbox/domain configuration and project assets are available; fully documenting ten studies is separate work. More projects, animation, awards, and a complete blog need not precede outreach.
