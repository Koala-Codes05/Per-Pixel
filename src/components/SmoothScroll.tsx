"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { isScrollLocked, lenisRef, syncScrollLock } from "@/lib/lenis";
import { INTRO_END_EVENT } from "@/lib/intro";
import { useReducedMotionPreference } from "@/lib/use-media-query";

export default function SmoothScroll() {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.05 });
    if (isScrollLocked()) lenis.stop();
    lenisRef.current = lenis;
    window.addEventListener(INTRO_END_EVENT, syncScrollLock);

    return () => {
      window.removeEventListener(INTRO_END_EVENT, syncScrollLock);
      if (lenisRef.current === lenis) lenisRef.current = null;
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
