# Last summary — PerPixel

## 2026-10-29 — Offers, concept labels, private playbook, showreel credit

The public site now has priced engagements, every portfolio piece is marked as concept work, the internal growth playbook is no longer a route, and the Offset showreel is credited to PerPixel.

### What changed

- `/playbook` returns 404. The page, interactive showcase, pricing data, and competitor screenshots moved to `docs/playbook/`. Written research in `research/` is unchanged.
- Homepage offers sheet and `/offers` publish three floors for funded seed-to-Series A teams: 10-Day Launch Sprint from ₹75k, Brand & Web System from ₹2.5L (6–10 weeks), Motion & Editorial retainer from ₹40k/month. Each tier links to `/contact`. Offers is in the primary navigation and the full-screen menu. Desktop text links appear from 920px so they clear the center mark.
- The contact FAQ timeline matches those durations and links to the offers page.
- A small Concept tag appears on the homepage bento and featured cards, the projects grid and index, case-study pages, Moove and Sorso, and the Dune, Ghaslet, Snackverse, and Offset pages. Dune no longer claims a Rub' al Khali location shoot. Sorso no longer says the photos are waiting on a real shoot. Moove’s lead calls it a self-initiated concept.
- `/works/offset/showreel.html` title, kicker, kinetic word, and end lockup say PerPixel. The personal “Anakin / lead motion designer” credit is gone. The pill reads “A concept reel”. The frame structure, type, and colour of the reel are unchanged.

### Files

- `src/lib/offers.ts`, `src/components/home/Offers.tsx`, `src/app/(site)/offers/page.tsx`, `src/app/globals.css`, `src/lib/site.ts`, `src/components/Navbar.tsx`, `src/components/contact/Faq.tsx`
- `src/components/ConceptMark.tsx` and the homepage, projects, case-study, Moove, Sorso, and footer call sites
- `public/works/dune/index.html`, `public/works/ghaslet/index.html`, `public/works/snackverse/index.html`, `public/works/offset/index.html`, `public/works/offset/showreel.html`, plus the matching `src/works` sources
- `docs/playbook/`

### Verification

- `npm run build` passed. `/offers` is a static route. `/playbook` is not in the route list.
- Production server on port 3000: `/playbook` and `/research/shots/koto-1.png` returned 404. `/offers` returned 200.
- Chrome at 1440 and 390: homepage offers sheet, `/offers` bands, and a Concept tag on Moove in the project grid. Start a project landed on `/contact`. The timeline FAQ links to `/offers`. Nav links do not overlap the center mark at 768 (menu only), 920, or 1024. Showreel lockup shows PERPIXEL and “A concept reel”. No horizontal overflow on the checked pages.

### Not verified

- A physical phone, reduced-motion walkthrough of the new sheets, and the deployed Vercel URL. This branch is not merged.

### Next useful step

Review the offers copy and floors with the owner, then look at the still-open enquiry receipt check on the deployed origin.
