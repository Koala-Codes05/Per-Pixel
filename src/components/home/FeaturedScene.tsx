"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useScroll } from "motion/react";
import { portfolioCardPose, portfolioScrollUnits, clamp01 } from "@/lib/scroll-sequence";
import { useReducedMotionPreference } from "@/lib/use-media-query";

export default function FeaturedScene({ count, children }: { count: number; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    const cards = [...section.querySelectorAll<HTMLElement>(".featured-card")];
    const images = [...section.querySelectorAll<HTMLImageElement>(".featured-image")];

    const paint = (progress: number) => {
      if (section.dataset.motion !== "on") return;
      cards.forEach((card, index) => {
        const pose = portfolioCardPose(progress, index, count);
        card.style.transform = `translate3d(-50%, calc(-50% + ${pose.y.toFixed(2)}svh), 0) scale(${pose.scale.toFixed(3)})`;
        card.style.opacity = `${pose.opacity}`;
      });
    };

    const measure = () => {
      const mobile = window.innerWidth < 768;
      const tallest = Math.max(0, ...cards.map((card) => card.offsetHeight));
      const fits = window.innerHeight >= (mobile ? 760 : 680) && tallest + (mobile ? 310 : 185) <= window.innerHeight;
      section.dataset.motion = !reduceMotion && fits ? "on" : "off";
      if (section.dataset.motion === "on") {
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        paint(clamp01(-section.getBoundingClientRect().top / distance));
      } else {
        cards.forEach((card) => {
          card.style.removeProperty("transform");
          card.style.removeProperty("opacity");
        });
      }
    };

    const theme = () => {
      const bounds = section.getBoundingClientRect();
      document.documentElement.toggleAttribute("data-featured-visible", bounds.top <= 64 && bounds.bottom > 64);
    };
    let frame = 0;
    const scheduleTheme = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        theme();
      });
    };

    const onFocus = (event: FocusEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>(".featured-card-link") : null;
      if (!link?.matches(":focus-visible") || section.dataset.motion !== "on") return;
      const index = Number(link.closest<HTMLElement>(".featured-card")?.dataset.index);
      if (!Number.isInteger(index)) return;
      const progress = (1.02 + index * 1.2) / portfolioScrollUnits(count);
      const top = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({ top: top + (section.offsetHeight - window.innerHeight) * progress, behavior: "instant" });
    };

    const onImageError = (event: Event) => {
      if (event.target instanceof HTMLImageElement && event.target.closest(".featured-card")) {
        event.target.classList.add("featured-image-failed");
      }
    };

    const resize = new ResizeObserver(() => {
      measure();
      scheduleTheme();
    });
    cards.forEach((card) => resize.observe(card));
    images.forEach((image) => {
      if (image.complete && image.currentSrc && image.naturalWidth === 0) image.classList.add("featured-image-failed");
    });
    section.addEventListener("focusin", onFocus);
    section.addEventListener("error", onImageError, true);
    window.addEventListener("scroll", scheduleTheme, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("resize", scheduleTheme);
    const unsubscribe = scrollYProgress.on("change", paint);
    measure();
    theme();

    return () => {
      unsubscribe();
      resize.disconnect();
      section.removeEventListener("focusin", onFocus);
      section.removeEventListener("error", onImageError, true);
      window.removeEventListener("scroll", scheduleTheme);
      window.removeEventListener("resize", measure);
      window.removeEventListener("resize", scheduleTheme);
      cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-featured-visible");
    };
  }, [count, reduceMotion, scrollYProgress]);

  return (
    <section
      id="featured-projects"
      ref={ref}
      className="featured-section"
      data-motion="off"
      aria-labelledby="featured-heading"
      style={{ "--featured-height": `${Math.round((portfolioScrollUnits(count) + 1) * 100)}svh` } as CSSProperties}
    >
      {children}
    </section>
  );
}
