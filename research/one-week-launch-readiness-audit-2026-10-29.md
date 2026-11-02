# PerPixel — one-week launch readiness audit

**Date:** 2026-10-29  
**Decision frame:** Can PerPixel launch as a credible client-acquisition site within seven days?  
**Benchmark:** `/playbook`, especially `NEXT_PLAN_PHASES[0]` (proof, positioning, first-viewport work, human About page), its case-study anatomy, and its intake pipeline. These are internal targets, not verified market forecasts.

## Scope and confidence

Reviewed the local App Router source for home, Projects, About, Contact, Journal, the featured portfolio, the FormSubmit and Kit integrations, root metadata, and the `/playbook` source. Compared it with the 2026-10-27 client-readiness audit and the recent changes recorded in `last_summary.md`. The local dev server returned HTTP 200 for `/playbook` and `/contact`; `/playbook` served a `noindex` directive. I did **not** inspect the deployed site, run a browser/device session, send an enquiry, confirm Kit subscription, measure Core Web Vitals, or verify any business result. Source evidence does not establish production behavior.

The playbook's conversion rates, channel shares, rates, and pipeline targets are hypotheses for planning. Do not use them as achieved PerPixel results or guaranteed outcomes. All displayed work is currently self-initiated per the owner's 2026-10-27 clarification; two commissioned sites may be added later.

## Verdict

**Conditional launch in one week is feasible as a focused studio portfolio, provided the enquiry path is proven live and the featured work is presented with honest, specific context.** Do not wait for all 12 playbook tasks or ten polished case studies. A broad outbound launch should wait if either delivery or portfolio proof is still unverified. The first-week goal is a site that lets a prospect answer: *What can PerPixel do for me? Who will do it? What have they actually made? How do I start?*

## Playbook standard versus current site

| Playbook standard | Current evidence | Gap and launch consequence |
| --- | --- | --- |
| Three Challenge → Outcome cases: Moove, Sorso, Ghaslet | `NEXT_PLAN_PHASES` task `t1`; `/projects/moove` and `/projects/sorso` are immersive brand experiences; Ghaslet lives at `/works/ghaslet/index.html`. Five written studies use one template and repeated Unsplash crops, though they honestly identify themselves as self-initiated. | The three strongest pieces lack one consistent buyer-facing layer that states status, problem, PerPixel role, scope, decisions, visible outputs, and a truthful outcome or learning. Concept work cannot claim client results. |
| What we do / do not do and engagement floors | Task `t2`; `/projects` lists services, `/about` lists capabilities, Contact FAQ gives broad categories and durations. No public scope exclusions, package boundaries, or approved starting investment found. | A buyer cannot quickly qualify fit, timing, and likely engagement size. The playbook's sample prices have not been approved as PerPixel offers; do not publish them automatically. |
| Named work and motion in the first homepage viewport | Task `t3`; the hero now has a specific offer and “Start a project” CTA, but the named projects sit later in a large scrolling experience. | The first screen states the service but offers little immediate proof. Add a compact, named work cue or project preview near the hero without sacrificing its editorial composition. Confirm actual phone fold visually. |
| Human About page | Task `t4`; `/about` says “small studio” and describes a process, but no verified name, practitioner background, portrait, location/time zone, or professional profile is supplied. | Trust and accountability remain weaker than the playbook's founder-led positioning. This needs owner-provided facts and consent to publish them. |
| Fast, reliable intake | Playbook stages: human reply within 24 hours, suggested owner action within two hours. Contact form uses FormSubmit AJAX and provides direct email; the page promises a reply within two working days. | Provider acceptance in code is not proof of inbox delivery or reply-to. The operational target and public promise differ. Choose a sustainable reply standard and a simple lead log before outreach. |
| A finished content route | `/journal` is in primary navigation and footer, but its three entries expand to images and short excerpts, with no full articles. | It reads as unfinished editorial authority. Hide it from primary navigation for launch or finish one substantive article. |
| Launch discovery and share hygiene | Root metadata has title/description. No `sitemap.ts`, `robots.ts`, explicit canonical base, social preview, or share image found in `src/app`; `/playbook` has `noindex`. | Shared links have no deliberate preview; crawl discovery is incomplete. This is a short launch task after proof and delivery. A sitemap is a discovery hint, not a ranking or indexing guarantee. |
| Measured mobile experience | Previous real-phone report found stalled standalone links, clipped hero, heavy blur, and slow intro; fixes are in source. Recent FAQ reorder and CTA routing were built and linted, but browser checks were unavailable. | Treat current mobile behavior as unverified. Test fresh and repeat visits, every featured route, backward navigation, reduced motion, keyboard, failed images, and actual form states before launch. |

## Ranked work for the next seven days

### P0 — gates for client-facing launch

1. **Prove real enquiry delivery.** Activate FormSubmit for the actual deployment origin if required. Send a test from another device/address; confirm inbox arrival, Reply-To, error/retry, invalid input, double click, and the direct email fallback. Record the test date and deployment URL. Keep the public promise at two working days unless there is a staffed process to meet the playbook's faster target. Owner input needed: inbox access and a test sender.
2. **Make three featured projects truthful sales evidence.** Start with Sorso, Moove, and Ghaslet (the earlier audit's recommended order). Add a concise studio-context entry before each immersive experience: self-initiated status, intended buyer/problem, exact role, scope, distinctive design decisions, three to five actual outputs, and a return/contact route. Use “what we built” or “what this demonstrates” when there is no client launch or measured outcome. Replace weak stock covers with existing designed assets where available. Review every deliverable claim against imagery shown. Owner input needed: factual contribution and permissions for each project.
3. **Repair high-friction copy and paths.** The Contact FAQ now precedes the form, but `FAQ_ITEMS[0]` still says “form above.” Change it to “form below” or neutral wording. Test that Start a project opens Contact at the top and “Get in touch” reaches the form. Verify all featured cards, standalone demos, browser Back, mobile menu, and phone scroll lock on the deployed build.

### P1 — complete during launch week

4. **Make the offer legible.** Turn broad service categories into two or three specific engagements with typical deliverables, timing, what is excluded, and the next step. Decide with the owner whether to publish starting prices; the playbook's numbers are research examples, not approved quotes. Put a short version on Projects and Contact.
5. **Show the practitioner.** Add a verified name, role, short background, operating location/time zone, and one real professional link or portrait if supplied. Align “we” and “me” language with the actual delivery model. Do not invent credentials or a team.
6. **Surface proof early.** Put a restrained Sorso/Moove/Ghaslet cue near the homepage hero and use project-specific covers. Keep “Start a project” primary. Evaluate the initial viewport at 320, 390, 820, and 1440 pixels and with reduced motion.
7. **Finish basic launch metadata and editorial navigation.** Add canonical/site URL, social preview image, `robots` and sitemap routes once the real domain is known. Keep `/playbook` out of the sitemap. Remove Journal from primary promotion until there is a finished article, or publish one useful, fully written piece.

### P2 — defer unless the gates are already green

- Directory listings, 30 founder teardowns, referral partnerships, open motion kit, four SEO posts, more concept studies, awards, and extra animation are the playbook's 30–90 day growth work. They do not repair the first client's path through the site this week.
- The Kit newsletter is integrated but actual subscription and confirmation remain unverified. Verify it before inviting launch traffic to subscribe; it is separate from the enquiry gate.
- `/playbook` is publicly reachable by direct URL despite `noindex`. Decide whether it is intentionally shareable. If private, restrict access or remove it from the production build; `noindex` only asks search engines not to index it. If public, review its pricing, conversion claims, screenshots, and “live” language before sharing.

## Seven-day execution sequence

| Day | Work | Exit check |
| --- | --- | --- |
| 1 | Confirm domain and inbox; perform deployed FormSubmit and Kit tests; fix Contact FAQ direction and any broken contact path. | Real enquiry appears in inbox with correct Reply-To; owner can reply. |
| 2–3 | Write and implement Sorso and Moove case-study context; select honest cover media; review claimed outputs. | A new visitor can identify status, role, decisions, and visible work before entering each experience. |
| 4 | Give Ghaslet a concise study/entry and accurate self-initiated label; audit every featured link and return route. | Three featured pieces have buyer-facing context and no implied commissioned result. |
| 5 | Approve offer boundaries and founder facts; update Projects, Contact, About, and homepage proof cue. | Fit, timing, responsible person, and next action are clear without a call. |
| 6 | Complete metadata/share preview, Journal navigation choice, and mobile/performance/accessibility pass. | No dead promoted route; share preview correct; serious mobile or keyboard defects fixed. |
| 7 | Test the deployed release on real phone and desktop, including fresh/repeat load, slow network, back/forward, reduced motion, image failure, form failure/retry, and subscriber confirmation. Freeze copy and deploy. | All P0 checks recorded against the deployed URL; otherwise launch narrowly and keep outreach paused. |

## Launch acceptance checklist

- A first-time visitor can name the offer, see a real project, and reach Contact within the first viewport or one obvious action.
- Three featured pieces state **self-initiated** clearly and distinguish concept output from client impact.
- The operator is identifiable through owner-approved facts.
- A real external test enquiry reaches the inbox and can be answered; the site's response promise matches operations.
- Contact starts at the top from project CTAs, FAQ precedes form, and the in-page form link works.
- No promoted Journal item ends at an excerpt; `/playbook` publication intent is resolved.
- Desktop and phone navigation, accessibility basics, and performance have been checked on the deployed site. Use W3C's [preliminary accessibility checks](https://www.w3.org/WAI/test-evaluate/preliminary/) for titles, headings, alternatives, contrast, resize, and keyboard interaction. Track Google's [Core Web Vitals](https://web.dev/articles/vitals/) as LCP, INP, and CLS; do not label unmeasured pages “fast.”
- Search and share metadata are deliberate. Google's [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) describes sitemap submission as a crawl hint, not an indexing guarantee.
