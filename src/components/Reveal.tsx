"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotionPreference } from "@/lib/use-media-query";

let observer: IntersectionObserver | null = null;
const observed = new Set<Element>();

function observe(element: HTMLElement) {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer?.unobserve(entry.target);
        observed.delete(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -24px 0px" });
  }
  observed.add(element);
  observer.observe(element);
  return () => {
    observer?.unobserve(element);
    observed.delete(element);
    if (!observed.size) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/** Viewport-triggered reveal (fires once). Uses IntersectionObserver, no scroll state. */
export default function Reveal({ children, className = "", delay = 0, variant = "content" }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "content" | "media" | "footer";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || element.classList.contains("is-in")) return;
    if (reducedMotion || !window.IntersectionObserver) {
      element.classList.add("is-in");
      return;
    }
    element.classList.add("is-ready");
    const stop = observe(element);
    return () => { stop(); element.classList.remove("is-ready"); };
  }, [reducedMotion]);

  return (
    <div ref={ref} className={`reveal ${className}`} data-reveal={variant} style={{ transitionDelay: `${Math.min(delay, 160)}ms` }}>
      {children}
    </div>
  );
}
