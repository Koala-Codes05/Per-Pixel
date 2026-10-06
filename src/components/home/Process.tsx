"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { PROCESS_FRAMES } from "@/lib/site";
import { clamp01, frameProgress } from "@/lib/scroll-sequence";
import { useReducedMotionPreference } from "@/lib/use-media-query";

const COUNT = PROCESS_FRAMES.length;

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    const contents = [...section.querySelectorAll<HTMLElement>(".process-content")];
    const measure = () => {
      // Compact sticky rows fit when the viewport is tall enough for all three rows.
      const tallest = Math.max(...contents.map((content) => content.scrollHeight));
      const fits = window.innerWidth >= 768 && window.innerHeight >= 620 && tallest + 112 <= window.innerHeight;
      section.dataset.motion = !reduceMotion && fits ? "on" : "off";
    };
    const resize = new ResizeObserver(measure);
    contents.forEach((content) => resize.observe(content));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", measure);
      section.dataset.motion = "off";
    };
  }, [reduceMotion]);

  return (
    <section id="process" ref={ref} className="process-section" data-motion="off" aria-label="Process">
      <h2 className="sr-only">How we work</h2>
      <div className="process-viewport">
        <div className="process-stage">
          {PROCESS_FRAMES.map((frame, index) => (
            <StickyFrame key={frame.number} frame={frame} index={index} progress={scrollYProgress} reduced={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyFrame({ frame, index, progress, reduced }: {
  frame: (typeof PROCESS_FRAMES)[number];
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const local = useTransform(progress, (p) => frameProgress(p, index, COUNT));
  const arrival = useTransform(local, (p) => clamp01((p - 0.25) / 0.75));
  const transform = useTransform(local, (p) => `translateY(${(1 - p) * 100}%)`);
  const numberTransform = useTransform(arrival, (p) => `translateY(${(1 - p) * 12}px)`);
  const labelTransform = useTransform(arrival, (p) => `translateY(${(1 - p) * 8}px)`);
  const labelOpacity = useTransform(arrival, [0, 1], [0.35, 1]);
  const descriptionTransform = useTransform(arrival, (p) => `translateY(${(1 - p) * 12}px)`);
  const descriptionOpacity = useTransform(arrival, [0, 1], [0.35, 1]);
  const imageTransform = useTransform(arrival, (p) => `scale(${1.03 - p * 0.03})`);
  const numberOpacity = useTransform(arrival, [0, 1], [0.82, 1]);

  return (
    <motion.div className="process-frame" style={{ transform: reduced ? "none" : transform, zIndex: index + 1 }}>
      <div className="process-content">
        <motion.span
          className="process-number"
          style={{ opacity: reduced ? 1 : numberOpacity, transform: reduced ? "none" : numberTransform }}
          data-process-part="number"
          aria-hidden="true"
        >
          {frame.number}
        </motion.span>
        <span className="sr-only">{`Step ${frame.number}`}</span>
        <div className="process-text">
          <motion.h3
            className="process-label"
            style={{ transform: reduced ? "none" : labelTransform, opacity: reduced ? 1 : labelOpacity }}
            data-process-part="label"
          >
            {frame.label}
          </motion.h3>
          <motion.p
            className="process-copy"
            style={{ transform: reduced ? "none" : descriptionTransform, opacity: reduced ? 1 : descriptionOpacity }}
            data-process-part="description"
          >
            {frame.description}
          </motion.p>
        </div>
        <div className="process-image">
          <motion.div className="absolute inset-0" data-process-part="image" style={{ transform: reduced ? "none" : imageTransform }}>
            <Image src={frame.image} alt={frame.alt} fill sizes="(min-width: 1400px) 310px, (min-width: 768px) 24vw, 100vw" className="object-cover grayscale" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
