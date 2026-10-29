"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useScroll } from "motion/react";
import { featuredMobileCardPose, featuredMobileFocus, featuredMobileScrollUnits, portfolioCardPose, portfolioScrollUnits, clamp01 } from "@/lib/scroll-sequence";
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
    const wordmark = section.querySelector<HTMLElement>(".featured-wordmark");
    const introduction = section.querySelector<HTMLElement>(".featured-introduction");

    const paint = (progress: number) => {
      if (section.dataset.motion !== "on") return;
      const mobile = window.innerWidth < 768;
      cards.forEach((card, index) => {
        const pose = mobile ? featuredMobileCardPose(progress, index, count) : portfolioCardPose(progress, index, count);
        card.style.transform = `translate3d(-50%, calc(-50% + ${pose.y.toFixed(2)}svh), 0) scale(${pose.scale.toFixed(3)})`;
        card.style.opacity = `${pose.opacity}`;
      });
      if (!mobile) {
        wordmark?.style.removeProperty("transform");
        introduction?.style.removeProperty("opacity");
        return;
      }
      const opening = featuredMobileCardPose(progress, 0, count);
      const startY = Math.max(1, featuredMobileCardPose(0, 0, count).y);
      const settled = clamp01(1 - opening.y / startY);
      if (wordmark) {
        const scale = (1.14 - settled * 0.14).toFixed(3);
        const rise = ((1 - settled) * 10).toFixed(2);
        wordmark.style.transform = `translate3d(0, ${rise}%, 0) scale(${scale})`;
      }
      if (introduction) introduction.style.opacity = `${(1 - settled).toFixed(3)}`;
    };

    const measure = () => {
      const mobile = window.innerWidth < 768;
      const tallest = Math.max(0, ...cards.map((card) => card.offsetHeight));
      const fits = window.innerHeight >= (mobile ? 640 : 540) && tallest + (mobile ? 180 : 60) <= window.innerHeight;
      section.dataset.motion = !reduceMotion && fits ? "on" : "off";
      if (section.dataset.motion === "on") {
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        paint(clamp01(-section.getBoundingClientRect().top / distance));
      } else {
        cards.forEach((card) => {
          card.style.removeProperty("transform");
          card.style.removeProperty("opacity");
        });
        wordmark?.style.removeProperty("transform");
        introduction?.style.removeProperty("opacity");
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
      const mobile = window.innerWidth < 768;
      const progress = mobile ? featuredMobileFocus(index, count) : (1.02 + index * 1.2) / portfolioScrollUnits(count);
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
      style={{
        "--featured-height": `${Math.round((portfolioScrollUnits(count) + 1) * 100)}svh`,
        "--featured-height-mobile": `${Math.round((featuredMobileScrollUnits(count) + 1) * 100)}svh`,
      } as CSSProperties}
    >
      {children}
    </section>
  );
}
