"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CLOCK_START = 17 * 60;
const CLOCK_END = 20 * 60 + 30;

export function SorsoClock() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / scrollable));
      const t = Math.round(CLOCK_START + p * (CLOCK_END - CLOCK_START));
      el.textContent = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <span className="sorso-clock" title="The page runs from 17:00 to 20:30. Scroll to move the hour along.">
      <span className="sorso-clock-dot" aria-hidden="true" />
      <span ref={ref} className="sorso-clock-time" aria-hidden="true">17:00</span>
      <span className="sorso-clock-label" aria-hidden="true">aperitivo time</span>
    </span>
  );
}

type Moment = {
  cat: "seaside" | "piazza" | "counter";
  src: string;
  alt: string;
  tag: string;
  title: string;
};

const MOMENTS: Moment[] = [
  { cat: "seaside", src: "https://images.unsplash.com/photo-1534250617995-d16425086b91?auto=format&fit=crop&w=1200&h=750&q=72", alt: "Rows of blue and white beach umbrellas below a cliffside town", tag: "Seaside · 18:55", title: "Atrani, the long way down" },
  { cat: "piazza", src: "https://images.unsplash.com/photo-1560433956-b2847671bb86?auto=format&fit=crop&w=1200&h=750&q=72", alt: "Two people clinking orange drinks at an outdoor table", tag: "Piazza · 19:10", title: "Cin cin, on the corner" },
  { cat: "counter", src: "https://images.unsplash.com/photo-1607687332053-ef831d0775ad?auto=format&fit=crop&w=1200&h=750&q=72", alt: "A single orange drink with ice and an orange slice on a wooden bar", tag: "At the counter · 19:05", title: "One, before the others arrive" },
  { cat: "seaside", src: "https://images.unsplash.com/photo-1543257461-f3d2a74687a5?auto=format&fit=crop&w=1200&h=750&q=72", alt: "Orange and green striped beach umbrellas seen from above", tag: "Seaside · 17:50", title: "Orange, green, repeat" },
  { cat: "piazza", src: "https://images.unsplash.com/photo-1781972959826-98cdd45c8488?auto=format&fit=crop&w=1200&h=750&q=72", alt: "Overhead view of people at small round tables outside a café", tag: "Piazza · 19:20", title: "Watching the street go by" },
  { cat: "counter", src: "https://images.unsplash.com/photo-1615830783066-26a99bc9d959?auto=format&fit=crop&w=1200&h=750&q=72", alt: "An orange drink beside green olives and a paper cone of fried snacks", tag: "At the counter · 18:20", title: "Olives, crisps, Chinotto" },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "seaside", label: "Seaside" },
  { id: "piazza", label: "Piazza" },
  { id: "counter", label: "At the counter" },
] as const;

export function SorsoMoments() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  return (
    <>
      <div className="sorso-filters" role="group" aria-label="Filter moments by place">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className="sorso-filter"
            data-active={filter === f.id}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="sorso-m-grid">
        {MOMENTS.map((m) => (
          <li key={m.src} className="sorso-m-card" data-cat={m.cat} hidden={filter !== "all" && m.cat !== filter}>
            <figure>
              <div className="sorso-m-media">
                <Image src={m.src} alt={m.alt} fill sizes="(min-width: 700px) 46vw, 92vw" className="object-cover" />
              </div>
              <figcaption>
                <span className="sorso-m-tag">{m.tag}</span>
                <span className="sorso-m-title">{m.title}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}

export function SorsoCaseButton() {
  const [count, setCount] = useState(0);
  const added = count > 0;

  return (
    <>
      <button
        type="button"
        className="sorso-order-btn"
        data-added={added}
        onClick={() => setCount(added ? 0 : 1)}
      >
        <span className="sorso-order-btn-label">
          {added ? "Added to your case" : "Add a mixed case"}
        </span>
        <span className="sorso-order-btn-icon" aria-hidden="true">
          {added ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          )}
        </span>
      </button>
      <p className="sr-only" aria-live="polite">{added ? `Mixed case added. ${count} case in your order.` : ""}</p>
    </>
  );
}
