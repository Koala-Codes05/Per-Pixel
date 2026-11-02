# Last summary — PerPixel

## 2026-11-02 — Restored direct-URL playbook

- Restored `/playbook` from the archived source at `docs/playbook/`: the route is `src/app/(site)/playbook/page.tsx`, interactive component/data are in `src/components/playbook/`, and all 26 competitor screenshots are back under `public/research/shots/`. Updated `docs/playbook/README.md` and the corresponding durable memory entries.
- The page remains absent from site navigation and retains `robots: { index: false, follow: false }`. Its URL can be shared directly.
- `npm run build` passed and lists `/playbook` as a static route. Targeted ESLint passed. Headless Edge returned HTTP 200 on 390px and 1440px viewports with no page errors or horizontal overflow; `meta[name=robots]` is `noindex, nofollow`, there are no `/playbook` navigation links, and a restored screenshot returns HTTP 200. Visual screenshots showed the hero and media on both widths.
- This work is local and has not been deployed. Earlier mobile spacing, wordmark, sticky-offer, and navbar edits are still uncommitted in the same working tree.

### Next useful step

Deploy the combined local changes when the user requests publication; then verify the live `/playbook` URL and its image assets.
