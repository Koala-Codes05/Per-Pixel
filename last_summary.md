# Last summary — PerPixel

## 2026-11-25 — Global USD offer pricing

- Changed the three public offer floors in `src/lib/offers.ts` to $4,500 for the 10-day launch sprint, $15,000 for the brand and web system, and $2,500/month for the motion and editorial retainer. Both the homepage and `/offers` use this shared data.
- Updated the homepage offer introduction, Offers page copy and metadata, and the public playbook's floor note for USD pricing. The Offers page states the assumptions behind starting fees and identifies separately scoped work. The retainer now promises one scoped motion or editorial piece per month; full film production and new sites require separate quotes.
- Pricing is based on published 2026 Clutch branding and web-design ranges and current motion service comparisons, not an INR conversion. These are proposed commercial floors for a small studio targeting global funded startups; final quotes remain scope dependent.
- `npm run build`, ESLint with the alternate cache path, and `git diff --check` passed. Generated homepage and Offers HTML contain all three USD prices and none of the prior INR offer prices. Browser visual inspection was not run.
- Changes are local and uncommitted.

### Next useful step

Review the price positioning and scope assumptions with the studio, and inspect the offer layouts on mobile. The requested About location update remains outstanding.
