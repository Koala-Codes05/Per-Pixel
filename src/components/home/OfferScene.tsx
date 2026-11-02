"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useScroll } from "motion/react";
import { clamp01, offerFrameFocus, offerFramePose, offerScrollUnits } from "@/lib/scroll-sequence";
import { useReducedMotionPreference } from "@/lib/use-media-query";

export default function OfferScene({
  count,
  id,
  labelId,
  header,
  children,
  className = "",
}: {
  count: number;
  id?: string;
  labelId: string;
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    const frames = [...section.querySelectorAll<HTMLElement>(".offer-frame")];

    const paint = (progress: number) => {
      if (section.dataset.motion !== "on") return;
      frames.forEach((frame, index) => {
        const pose = offerFramePose(progress, index, count);
        frame.style.transform = `translate3d(0, ${pose.y.toFixed(2)}svh, 0)`;
        frame.style.opacity = `${pose.opacity}`;
        const focused = frame.contains(document.activeElement);
        frame.style.pointerEvents = pose.opacity > 0.55 || focused ? "auto" : "none";
      });
    };

    const measure = () => {
      const mobile = window.innerWidth < 768;
      const contents = [...section.querySelectorAll<HTMLElement>(".offer-frame-content")];
      const tallest = Math.max(0, ...contents.map((content) => content.offsetHeight));
      const pinPad = parseFloat(getComputedStyle(section).getPropertyValue("--offer-pin-pad")) || 0;
      const fits = window.innerHeight >= (mobile ? 640 : 700) && tallest + pinPad <= window.innerHeight;
      section.dataset.motion = !reduceMotion && fits ? "on" : "off";
      if (section.dataset.motion === "on") {
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        paint(clamp01(-section.getBoundingClientRect().top / distance));
      } else {
        frames.forEach((frame) => {
          frame.style.removeProperty("transform");
          frame.style.removeProperty("opacity");
          frame.style.removeProperty("pointer-events");
        });
      }
    };

    const scrollToIndex = (index: number) => {
      if (section.dataset.motion !== "on" || !Number.isInteger(index)) return;
      const progress = offerFrameFocus(index, count);
      const top = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({ top: top + (section.offsetHeight - window.innerHeight) * progress, behavior: "instant" });
    };

    const onFocus = (event: FocusEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a, button") : null;
      if (!link?.matches(":focus-visible") || section.dataset.motion !== "on") return;
      const index = Number(link.closest<HTMLElement>(".offer-frame")?.dataset.index);
      scrollToIndex(index);
    };

    const resize = new ResizeObserver(measure);
    frames.forEach((frame) => resize.observe(frame));
    section.addEventListener("focusin", onFocus);
    window.addEventListener("resize", measure);
    const unsubscribe = scrollYProgress.on("change", paint);
    measure();

    const hash = window.location.hash.slice(1);
    if (hash) {
      const hashed = frames.findIndex((frame) => frame.id === hash);
      if (hashed >= 0) scrollToIndex(hashed);
    }

    return () => {
      unsubscribe();
      resize.disconnect();
      section.removeEventListener("focusin", onFocus);
      window.removeEventListener("resize", measure);
    };
  }, [count, reduceMotion, scrollYProgress]);

  return (
    <section
      id={id}
      ref={ref}
      className={`offer-scene ${className}`.trim()}
      data-motion="off"
      aria-labelledby={labelId}
      style={{ "--offer-height": `${Math.round((offerScrollUnits(count) + 1) * 100)}svh` } as CSSProperties}
    >
      <div className="offer-scene-viewport">
        {header}
        <div className="offer-scene-stage">{children}</div>
      </div>
    </section>
  );
}
