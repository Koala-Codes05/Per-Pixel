"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { WORDPLAY_WORDS } from "@/lib/site";
import { wordEmphasis } from "@/lib/scroll-sequence";
import { useMediaQuery, useReducedMotionPreference } from "@/lib/use-media-query";

const PALE = "#e3e1da";
const INK = "#141414";

export default function Wordplay() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const hasRoom = useMediaQuery("(min-height: 560px)", true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    section.dataset.motion = !reduceMotion && hasRoom ? "on" : "off";
    return () => { section.dataset.motion = "off"; };
  }, [reduceMotion, hasRoom]);

  return (
    <section ref={ref} className="wordplay-section relative mt-24" data-motion="off" aria-label="What we do">
      <div className="wordplay-viewport flex flex-col justify-center overflow-hidden px-5 md:px-10">
        {WORDPLAY_WORDS.map((word, index) => (
          <Word key={word} progress={scrollYProgress} index={index} reduced={reduceMotion}>
            {word}
          </Word>
        ))}
        <p className="wordplay-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.24em] text-ink/40" aria-hidden="true">
          Scroll
        </p>
      </div>
    </section>
  );
}

function Word({ children, progress, index, reduced }: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  reduced: boolean;
}) {
  const emphasis = useTransform(progress, (p) => wordEmphasis(p, index, WORDPLAY_WORDS.length));
  const color = useTransform(emphasis, [0, 1], [PALE, INK]);
  const transform = useTransform(emphasis, (value) => `translateY(${(1 - value) * 6}px) scale(${0.995 + value * 0.005})`);

  return (
    <motion.span
      className="wordplay-word block origin-left font-sans font-black leading-[0.94] tracking-[-0.045em]"
      style={{ color: reduced ? INK : color, transform: reduced ? "none" : transform }}
    >
      {children}
    </motion.span>
  );
}
