"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = ["For ambitious brands", "For growth driven brands"];
const COOLDOWN = 1100;
const MOVEMENT_THRESHOLD = 36;
const INTERACTIVE = "a, button, [role='button'], [role='tab'], summary";

export default function HeroPhrase() {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let lastActivity = -Infinity;
    let lastPoint: { x: number; y: number } | null = null;
    let movement = 0;
    let hovered: Element | null = null;
    const controller = new AbortController();
    const options = { passive: true, signal: controller.signal };

    const advance = (event: Event) => {
      if (
        document.visibilityState !== "visible" ||
        document.documentElement.classList.contains("pp-intro-pending") ||
        event.timeStamp - lastActivity < COOLDOWN
      ) return;
      lastActivity = event.timeStamp;
      setIndex((current) => (current + 1) % PHRASES.length);
    };

    const onMove = (event: PointerEvent) => {
      if (!event.isPrimary || event.pointerType === "touch") return;
      const point = { x: event.clientX, y: event.clientY };
      const distance = lastPoint ? Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) : MOVEMENT_THRESHOLD;
      lastPoint = point;
      if (distance < 1) return;
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
      movement += distance;
      if (movement >= MOVEMENT_THRESHOLD || (target && target !== hovered)) {
        movement = 0;
        advance(event);
      }
      hovered = target;
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (["Tab", "Enter", "Escape"].includes(event.key)) advance(event);
      if (event.key === " " && event.target instanceof Element && event.target.closest(INTERACTIVE)) advance(event);
    };

    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(INTERACTIVE)) advance(event);
    };

    window.addEventListener("pointermove", onMove, options);
    window.addEventListener("click", advance, options);
    window.addEventListener("keydown", onKey, options);
    window.addEventListener("focusin", onFocus, options);
    const element = root.current;
    element?.setAttribute("data-ready", "true");
    return () => {
      controller.abort();
      element?.removeAttribute("data-ready");
    };
  }, []);

  return (
    <p ref={root} className="hero-phrase" data-index={index}>
      <span className="sr-only">For ambitious and growth driven brands.</span>
      {PHRASES.map((phrase, position) => (
        <span
          key={phrase}
          className="hero-phrase-line"
          data-active={position === index}
          data-exiting={position === (index + PHRASES.length - 1) % PHRASES.length}
          aria-hidden="true"
        >
          {phrase}
        </span>
      ))}
    </p>
  );
}
