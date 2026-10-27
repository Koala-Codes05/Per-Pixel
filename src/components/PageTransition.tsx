"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { lenisRef, lockScroll, unlockScroll } from "@/lib/lenis";

const OWNER = "route";
const HISTORY_KEY = "__ppRouteIndex";

type Point = { x: number; y: number };
type PendingNavigation = {
  pathname: string;
  index: number;
  resolve: () => void;
  finish: () => void;
};
type PageViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};
type TransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => PageViewTransition;
};

function nextFrame(signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    let frame = 0;
    let timer = 0;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    frame = requestAnimationFrame(finish);
    timer = window.setTimeout(finish, 50);
    signal.addEventListener("abort", finish, { once: true });
  });
}

function showVisibleReveals() {
  document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0) {
      element.classList.add("is-in");
    }
  });
}

async function waitForVisibleAssets(signal: AbortSignal) {
  if (signal.aborted) return;
  const local = new AbortController();
  const stop = () => local.abort();
  signal.addEventListener("abort", stop, { once: true });
  let timer = 0;
  const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img")).filter((image) => {
    const rect = image.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0;
  });
  const imageReady = (image: HTMLImageElement) => new Promise<void>((resolve) => {
    const decode = () => {
      if (typeof image.decode === "function") void image.decode().catch(() => {}).finally(resolve);
      else resolve();
    };
    if (image.complete) {
      decode();
      return;
    }
    const settle = () => decode();
    image.addEventListener("load", settle, { once: true, signal: local.signal });
    image.addEventListener("error", settle, { once: true, signal: local.signal });
    local.signal.addEventListener("abort", () => resolve(), { once: true });
  });
  const ready = Promise.allSettled([
    document.fonts.ready,
    ...images.map(imageReady),
  ]);
  const timeout = new Promise<void>((resolve) => {
    timer = window.setTimeout(() => {
      local.abort();
      resolve();
    }, 1200);
  });
  await Promise.race([ready, timeout]);
  window.clearTimeout(timer);
  local.abort();
  signal.removeEventListener("abort", stop);
}

function focusMain() {
  const main = document.querySelector<HTMLElement>("main");
  if (!main) return;
  const previous = main.getAttribute("tabindex");
  main.tabIndex = -1;
  main.focus({ preventScroll: true });
  if (previous === null) main.removeAttribute("tabindex");
  else main.setAttribute("tabindex", previous);
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const pending = useRef<PendingNavigation | null>(null);
  const positionsRef = useRef(new Map<number, Point>());

  useLayoutEffect(() => {
    pathnameRef.current = pathname;
    const task = pending.current;
    if (task?.pathname === pathname) task.resolve();
  }, [pathname]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const transitionDocument = document as TransitionDocument;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const setup = new AbortController();
    const positions = positionsRef.current;
    const previousScrollRestoration = history.scrollRestoration;
    const savedIndex = history.state?.[HISTORY_KEY];
    let currentIndex = typeof savedIndex === "number" ? savedIndex : 0;
    let replayingPop = false;

    if (typeof savedIndex !== "number") {
      history.replaceState({ ...(history.state ?? {}), [HISTORY_KEY]: currentIndex }, "");
    }
    history.scrollRestoration = "manual";

    const run = (
      url: URL,
      direction: "forward" | "back",
      index: number,
      navigate: () => void,
      restore?: Point,
    ) => {
      pending.current?.finish();
      positions.set(currentIndex, { x: window.scrollX, y: window.scrollY });
      const wasInert = document.body.inert;
      const controller = new AbortController();
      let transition: PageViewTransition | undefined;
      let ended = false;
      let didCommit = false;
      let callbackInvoked = false;
      let navigationInvoked = false;
      let watchdog = 0;
      let resolveCommit = () => {};
      const committed = new Promise<void>((resolve) => { resolveCommit = resolve; });
      const finish = (successful = false) => {
        if (ended) return;
        ended = true;
        controller.abort();
        resolveCommit();
        window.clearTimeout(watchdog);
        try {
          transition?.skipTransition();
        } catch {}
        if (pending.current === task) {
          pending.current = null;
          delete root.dataset.pageTransition;
          delete root.dataset.pageTransitionPhase;
          document.body.inert = wasInert;
          unlockScroll(OWNER);
          if (successful && didCommit) focusMain();
        }
      };
      const task: PendingNavigation = { pathname: url.pathname, index, resolve: resolveCommit, finish };
      const performNavigate = () => {
        if (navigationInvoked) return;
        navigationInvoked = true;
        navigate();
      };
      const targetPoint = () => {
        if (restore) return restore;
        if (!url.hash) return { x: 0, y: 0 };
        let id = url.hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {}
        const target = document.getElementById(id);
        if (!target) return { x: 0, y: 0 };
        const rect = target.getBoundingClientRect();
        return { x: rect.left + window.scrollX, y: rect.top + window.scrollY };
      };
      const scrollToTarget = () => {
        const target = targetPoint();
        lenisRef.current?.resize();
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target.y, { immediate: true, force: true });
          if (target.x !== window.scrollX) {
            window.scrollTo({ top: target.y, left: target.x, behavior: "instant" as ScrollBehavior });
          }
        } else {
          window.scrollTo({ top: target.y, left: target.x, behavior: "instant" as ScrollBehavior });
        }
      };

      pending.current = task;
      root.dataset.pageTransition = direction;
      root.dataset.pageTransitionPhase = "preparing";
      lockScroll(OWNER);
      document.body.inert = true;
      watchdog = window.setTimeout(() => finish(), 6500);
      window.addEventListener("resize", () => finish(), { signal: controller.signal });
      window.addEventListener("pagehide", () => finish(), { signal: controller.signal });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") finish();
      }, { capture: true, signal: controller.signal });
      media.addEventListener("change", () => finish(), { signal: controller.signal });

      try {
        transition = transitionDocument.startViewTransition!(async () => {
          callbackInvoked = true;
          if (ended) return;
          try {
            performNavigate();
            await committed;
            if (ended) return;
            history.replaceState({ ...(history.state ?? {}), [HISTORY_KEY]: index }, "");
            currentIndex = index;
            pathnameRef.current = url.pathname;
            await nextFrame(controller.signal);
            await nextFrame(controller.signal);
            if (ended) return;
            scrollToTarget();
            showVisibleReveals();
            await waitForVisibleAssets(controller.signal);
            if (ended) return;
            scrollToTarget();
            showVisibleReveals();
            didCommit = true;
          } catch {
            finish();
          }
        });
        void transition.ready.then(() => {
          if (!ended) root.dataset.pageTransitionPhase = "animating";
        }, () => finish());
        void transition.finished.then(() => finish(true), () => finish());
      } catch {
        if (!callbackInvoked) {
          try {
            performNavigate();
          } catch {}
        }
        finish();
      }
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.detail <= 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("data-no-transition")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if ((url.protocol !== "http:" && url.protocol !== "https:") || url.origin !== location.origin || url.pathname === pathnameRef.current) return;
      // Static files (e.g. the standalone /works/*.html builds) are full document loads, not router transitions.
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;
      if (root.classList.contains("pp-intro-pending") || media.matches || typeof transitionDocument.startViewTransition !== "function") return;
      event.preventDefault();
      event.stopPropagation();
      if (pending.current) return;
      const index = currentIndex + 1;
      for (const key of positions.keys()) {
        if (key >= index) positions.delete(key);
      }
      const href = `${url.pathname}${url.search}${url.hash}`;
      run(url, "forward", index, () => router.push(href, { scroll: false }));
    };

    const onPopState = (event: PopStateEvent) => {
      if (replayingPop) return;
      const targetIndex = event.state?.[HISTORY_KEY];
      const targetPath = location.pathname;
      if (typeof targetIndex !== "number") {
        pathnameRef.current = targetPath;
        return;
      }
      if (targetIndex === currentIndex || targetPath === pathnameRef.current || root.classList.contains("pp-intro-pending") || media.matches || typeof transitionDocument.startViewTransition !== "function") {
        if (targetPath !== pathnameRef.current) positions.set(currentIndex, { x: scrollX, y: scrollY });
        currentIndex = targetIndex;
        pathnameRef.current = targetPath;
        return;
      }
      const direction = targetIndex < currentIndex ? "back" : "forward";
      const url = new URL(location.href);
      const restore = positions.get(targetIndex) ?? { x: 0, y: 0 };
      event.stopImmediatePropagation();
      run(url, direction, targetIndex, () => {
        replayingPop = true;
        try {
          window.dispatchEvent(new PopStateEvent("popstate", { state: event.state }));
        } finally {
          replayingPop = false;
        }
      }, restore);
    };

    document.addEventListener("click", onClick, { capture: true, signal: setup.signal });
    window.addEventListener("popstate", onPopState, { capture: true, signal: setup.signal });

    return () => {
      setup.abort();
      pending.current?.finish();
      history.scrollRestoration = previousScrollRestoration;
    };
  }, [router]);

  return null;
}
