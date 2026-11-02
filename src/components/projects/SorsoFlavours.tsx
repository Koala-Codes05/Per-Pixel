"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { SORSO_FLAVOURS } from "@/lib/sorso-flavours";
import { clamp01, flavourSceneCopyOffset } from "@/lib/scroll-sequence";
import { lenisRef } from "@/lib/lenis";
import { SorsoBottle } from "@/components/projects/SorsoBottle";

const COUNT = SORSO_FLAVOURS.length;

function parseHex(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function lerpHex(a: string, b: string, t: number) {
  const from = parseHex(a);
  const to = parseHex(b);
  const mix = clamp01(t);
  const channel = (start: number, end: number) => Math.round(start + (end - start) * mix);
  const r = channel(from.r, to.r);
  const g = channel(from.g, to.g);
  const bChannel = channel(from.b, to.b);
  return `rgb(${r} ${g} ${bChannel})`;
}

function sceneColors(progress: number) {
  const scaled = progress * COUNT;
  const index = Math.min(COUNT - 1, Math.floor(scaled));
  const next = Math.min(COUNT - 1, index + 1);
  const local = scaled - index;
  if (index === next) return SORSO_FLAVOURS[index];
  const t = local < 0.12 ? 0 : local > 0.88 ? 1 : (local - 0.12) / 0.76;
  return {
    bg: lerpHex(SORSO_FLAVOURS[index].bg, SORSO_FLAVOURS[next].bg, t),
    fg: lerpHex(SORSO_FLAVOURS[index].fg, SORSO_FLAVOURS[next].fg, t),
  };
}

function activeFlavourIndex(progress: number) {
  let best = 0;
  let distance = Infinity;
  for (let i = 0; i < COUNT; i += 1) {
    const d = Math.abs(flavourSceneCopyOffset(progress, i, COUNT));
    if (d < distance) {
      distance = d;
      best = i;
    }
  }
  return best;
}

export default function SorsoFlavours() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const artRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const paintRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const panels = [...section.querySelectorAll<HTMLElement>(".sorso-flv-panel")];
      if (!panels.length) return;

      const tallest = Math.max(...panels.map((panel) => panel.getBoundingClientRect().height));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fits = window.innerHeight >= 520 && tallest + 56 <= window.innerHeight;
      section.dataset.motion = !reduce && fits ? "on" : "off";
      paintRef.current();
    };

    measure();
    requestAnimationFrame(measure);

    const panels = [...section.querySelectorAll<HTMLElement>(".sorso-flv-panel")];
    const observer = new ResizeObserver(measure);
    panels.forEach((panel) => observer.observe(panel));
    window.addEventListener("resize", measure);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      section.dataset.motion = "off";
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reset = () => {
      copyRefs.current.forEach((copy) => {
        if (!copy) return;
        copy.style.transform = "";
      });
      artRefs.current.forEach((art) => {
        if (!art) return;
        art.style.opacity = "";
      });
      tabRefs.current.forEach((tab) => tab?.removeAttribute("aria-current"));
      stage.style.backgroundColor = "";
      stage.style.color = "";
    };

    const update = () => {
      if (section.dataset.motion !== "on") {
        reset();
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp01(-rect.top / scrollable);
      const colors = sceneColors(progress);
      const active = activeFlavourIndex(progress);

      stage.style.backgroundColor = colors.bg;
      stage.style.color = colors.fg;
      stage.style.setProperty("--sorso-flv-tab-on", SORSO_FLAVOURS[active].bg);

      copyRefs.current.forEach((copy, index) => {
        if (!copy) return;
        const offset = flavourSceneCopyOffset(progress, index, COUNT);
        copy.style.transform = `translate3d(0, ${offset}%, 0)`;
      });

      artRefs.current.forEach((art, index) => {
        if (!art) return;
        const offset = Math.abs(flavourSceneCopyOffset(progress, index, COUNT));
        const opacity = clamp01(1 - offset / 110);
        art.style.opacity = String(opacity);
      });

      tabRefs.current.forEach((tab, index) => {
        if (!tab) return;
        tab.setAttribute("aria-current", String(index === active));
      });
    };

    paintRef.current = update;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      paintRef.current = () => {};
      reset();
    };
  }, []);

  const scrollToFlavour = (index: number) => {
    const section = sectionRef.current;
    if (!section || section.dataset.motion !== "on") return;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = (index + 0.45) / COUNT;
    const target = section.getBoundingClientRect().top + window.scrollY + progress * scrollable;
    lenisRef.current?.scrollTo(target, { duration: 1.2 });
  };

  return (
    <section
      id="flavours"
      ref={sectionRef}
      className="sorso-flavours-section scroll-mt-24"
      data-motion="off"
      aria-label="Flavours"
    >
      <div className="sorso-flv-viewport">
        <div ref={stageRef} className="sorso-flv-stage">
          <div className="sorso-flv-pin">
            {SORSO_FLAVOURS.map((f, index) => (
              <article
                key={f.id}
                className="sorso-flv sorso-flv-layer"
                style={{ backgroundColor: f.bg, color: f.fg }}
              >
                <div className="sorso-flv-panel">
                  <div
                    ref={(node) => {
                      copyRefs.current[index] = node;
                    }}
                    className="sorso-flv-copy"
                  >
                    <h2 className="sorso-flv-name">{f.name}</h2>
                    <p className="sorso-flv-notes">{f.notes}</p>
                    <p className="sorso-flv-desc">{f.desc}</p>
                    <p className="sorso-flv-hour">
                      <span className="sorso-dash" aria-hidden="true" />
                      {f.hour}
                    </p>
                  </div>
                  <div
                    ref={(node) => {
                      artRefs.current[index] = node;
                    }}
                    className="sorso-flv-art"
                    aria-hidden="true"
                  >
                    <SorsoBottle flavour={f.id} className="sorso-flv-bottle" />
                  </div>
                </div>
              </article>
            ))}
            <div className="sorso-flv-tabs" role="tablist" aria-label="Flavours">
              {SORSO_FLAVOURS.map((f, index) => (
                <button
                  key={f.id}
                  type="button"
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  className="sorso-flv-tab"
                  role="tab"
                  aria-current={index === 0}
                  onClick={() => scrollToFlavour(index)}
                >
                  {f.name.replace(".", "")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
