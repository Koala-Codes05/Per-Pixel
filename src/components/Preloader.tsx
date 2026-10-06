"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { lockScroll, setRegionsInert, unlockScroll } from "@/lib/lenis";
import { endIntro, INTRO_END_EVENT, INTRO_TIMEOUT_MS } from "@/lib/intro";
import { WORDPLAY_WORDS } from "@/lib/site";

const EASE_IN = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_BIG = "cubic-bezier(0.16, 1, 0.3, 1)";

function criticalAssetsReady(signal: AbortSignal) {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img")).filter((image) => {
    const rect = image.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
  });
  return Promise.allSettled([
    document.fonts.ready,
    ...images.map((image) => new Promise<void>((resolve) => {
      if (image.complete) {
        resolve();
        return;
      }
      image.addEventListener("load", () => resolve(), { once: true, signal });
      image.addEventListener("error", () => resolve(), { once: true, signal });
      signal.addEventListener("abort", () => resolve(), { once: true });
    })),
  ]);
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const finishRef = useRef(() => {});

  useLayoutEffect(() => {
    const layer = ref.current;
    if (!layer) return;
    const animations: Animation[] = [];
    const timers: number[] = [];
    const controller = new AbortController();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousFocus = document.activeElement;
    let disposed = false;

    const release = () => {
      controller.abort();
      timers.forEach(window.clearTimeout);
      animations.forEach((animation) => animation.cancel());
      setRegionsInert("intro", false);
      unlockScroll("intro");
    };
    const finish = () => {
      if (disposed) return;
      disposed = true;
      endIntro();
      release();
      if (layer.contains(document.activeElement)) {
        if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
          previousFocus.focus({ preventScroll: true });
        }
        (document.activeElement as HTMLElement | null)?.blur();
      }
      setDone(true);
    };
    finishRef.current = finish;

    const later = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };
    const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, { fill: "both", ...options });
      animations.push(animation);
      return animation.finished;
    };

    // Seen this session → finish on the next tick without replaying the overlay.
    if (!document.documentElement.classList.contains("pp-intro-pending")) {
      later(finish, 0);
    } else {
      const skip = layer.querySelector<HTMLButtonElement>("button");
      skip?.focus({ preventScroll: true });
      lockScroll("intro");
      setRegionsInert("intro", true);
      window.addEventListener(INTRO_END_EVENT, finish, { signal: controller.signal });
      window.addEventListener("pagehide", finish, { signal: controller.signal });
      media.addEventListener("change", finish, { signal: controller.signal });
      later(finish, INTRO_TIMEOUT_MS); // never trap the user

      if (media.matches) {
        later(finish, 180);
      } else {
        const assets = Promise.race([
          criticalAssetsReady(controller.signal),
          new Promise<void>((resolve) => later(resolve, 4600)),
        ]);
        const run = async () => {
          const words = Array.from(layer.querySelectorAll(".preloader-word"));
          await Promise.all(words.map((word, index) => animate(word, [
            { transform: "translateY(14%)", opacity: 0, offset: 0 },
            { transform: "translateY(0)", opacity: 1, offset: 0.34 },
            { transform: "translateY(0)", opacity: 1, offset: 0.66 },
            { transform: "translateY(-14%)", opacity: 0, offset: 1 },
          ], { duration: 840, delay: index * 620, easing: EASE_IN })));
          if (disposed) return;
          layer.dataset.phase = "mark";
          const mark = layer.querySelector<HTMLElement>(".preloader-mark")!;
          await Promise.all([
            animate(mark, [
              { transform: "scale(.94)", opacity: 0 },
              { transform: "scale(1)", opacity: 1 },
            ], { duration: 600, easing: EASE_IN }),
            assets,
          ]);
          if (disposed) return;
          layer.dataset.phase = "expand";
          const size = mark.getBoundingClientRect().width;
          const scale = Math.ceil((window.innerWidth + window.innerHeight) / (size * 0.24));
          await Promise.all([
            animate(mark, [
              { transform: "scale(1)", opacity: 1 },
              { transform: `scale(${scale})`, opacity: 1 },
            ], { duration: 880, easing: EASE_BIG }),
            animate(layer, [
              { opacity: 1, offset: 0 },
              { opacity: 1, offset: 0.65 },
              { opacity: 0, offset: 1 },
            ], { duration: 880, easing: "linear" }),
          ]);
          finish();
        };
        void run().catch(() => {
          if (!disposed) finish();
        });
      }
    }

    return () => {
      disposed = true;
      release();
      queueMicrotask(() => {
        if (finishRef.current === finish) endIntro();
      });
    };
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="preloader" data-phase="words" role="dialog" aria-modal="true" aria-label="PerPixel is loading">
      <span className="sr-only" role="status">Loading PerPixel</span>
      <div className="preloader-words" aria-hidden="true">
        {WORDPLAY_WORDS.map((word) => (
          <span key={word} className="preloader-word">{word}</span>
        ))}
      </div>
      <div className="preloader-mark" aria-hidden="true">
        <BrandX className="h-full w-full" />
      </div>
      <button
        type="button"
        data-skip-intro
        onClick={() => finishRef.current()}
        className="preloader-skip absolute right-5 top-5 rounded-full border border-line px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 hover:border-ink"
      >
        Skip intro
      </button>
    </div>
  );
}

export function BrandX({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="14" y="38" width="72" height="24" rx="2" fill="currentColor" transform="rotate(45 50 50)" />
      <rect x="14" y="38" width="72" height="24" rx="2" fill="currentColor" transform="rotate(-45 50 50)" />
    </svg>
  );
}
