# Internal growth playbook

This is the studio's private operating note. It is not a public page and it is not linked from the site.

The interactive dossier is:

- `src/app/(site)/playbook/page.tsx`
- `src/components/playbook/PlaybookShowcase.tsx`
- `src/components/playbook/playbook-data.ts`

`next dev` renders it at `http://localhost:3000/playbook`. Production builds call `notFound()` for that route, so a deployed site, including a Vercel preview, returns 404. Do not add the route to navigation, the footer, or a sitemap.

Competitor screenshots used by the dossier are in `public/research/shots/`. Longer research notes stay in `research/`.

Read "How to use this" and "What we're doing" before the studio research. Channel shares, close rates, and price bands are October 2026 research, not PerPixel results. Published starting prices live on the public offers: 10-Day Launch Sprint from $4,500, Brand & Web System from $15,000, Motion & Editorial retainer from $2,500/month.
