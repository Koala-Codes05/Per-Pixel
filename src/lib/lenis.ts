import type Lenis from "lenis";

/** Shared handle so non-scroll components (e.g. the preloader) can lock scroll. */
export const lenisRef: { current: Lenis | null } = { current: null };

const scrollLocks = new Set<string>();

export function isScrollLocked() {
  return scrollLocks.size > 0 || document.documentElement.classList.contains("pp-intro-pending");
}

export function syncScrollLock() {
  const locked = isScrollLocked();
  document.documentElement.classList.toggle("pp-lock", locked);
  if (locked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}

export function lockScroll(owner: string) {
  scrollLocks.add(owner);
  syncScrollLock();
}

export function unlockScroll(owner: string) {
  scrollLocks.delete(owner);
  syncScrollLock();
}

const inertRegions = new WeakMap<HTMLElement, {
  owners: Set<string>;
  inert: boolean;
  ariaHidden: string | null;
}>();

export function setRegionsInert(owner: string, active: boolean, selector = "header, main, footer") {
  document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    let region = inertRegions.get(element);
    if (active) {
      if (!region) {
        const bootstrapManaged = element.hasAttribute("data-pp-intro-inert");
        region = {
          owners: new Set(),
          inert: bootstrapManaged ? element.hasAttribute("data-pp-intro-was-inert") : element.inert,
          ariaHidden: bootstrapManaged
            ? element.getAttribute("data-pp-intro-aria-hidden")
            : element.getAttribute("aria-hidden"),
        };
        ["data-pp-intro-inert", "data-pp-intro-was-inert", "data-pp-intro-aria-hidden"].forEach((marker) => {
          element.removeAttribute(marker);
        });
        inertRegions.set(element, region);
      }
      region.owners.add(owner);
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    } else if (region) {
      region.owners.delete(owner);
      if (region.owners.size) return;
      element.inert = region.inert;
      if (region.ariaHidden === null) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", region.ariaHidden);
      ["data-pp-intro-inert", "data-pp-intro-was-inert", "data-pp-intro-aria-hidden"].forEach((marker) => {
        element.removeAttribute(marker);
      });
      inertRegions.delete(element);
    }
  });
}
