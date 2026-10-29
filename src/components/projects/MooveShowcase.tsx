"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import LiquidDistortion from "@/components/LiquidDistortion";
import { ArrowUpRight } from "@/components/home/Bento";
import { clamp01, frameProgress } from "@/lib/scroll-sequence";
import { useMediaQuery, useReducedMotionPreference } from "@/lib/use-media-query";

export const MOOVE_FINISHES = [
  {
    id: "rose-chalk",
    code: "RC-04",
    name: "Rose Chalk 04",
    material: "Pigmented mineral resin & Venetian rose earth",
    swatch: "#f2a18e",
    surface: "#f7ded4",
    veil: "rgba(242, 161, 142, 0.14)",
    density: "1.85 g/cm³",
    reflectance: "LRV 64%",
    finishGrade: "Honed satin · 12 GU",
    leadTime: "6 weeks",
  },
  {
    id: "raw-travertine",
    code: "RT-02",
    name: "Raw Travertine 02",
    material: "Open-pore Roman limestone, unfilled",
    swatch: "#d8cebe",
    surface: "#ebe5dc",
    veil: "rgba(216, 206, 190, 0.22)",
    density: "2.41 g/cm³",
    reflectance: "LRV 71%",
    finishGrade: "Raw open-pore · 6 GU",
    leadTime: "8 weeks",
  },
  {
    id: "sienna-clay",
    code: "SC-07",
    name: "Sienna Clay 07",
    material: "Kiln-pressed terracotta aggregate",
    swatch: "#d9785f",
    surface: "#f2d2c7",
    veil: "rgba(217, 120, 95, 0.20)",
    density: "2.12 g/cm³",
    reflectance: "LRV 48%",
    finishGrade: "Brushed mineral · 9 GU",
    leadTime: "6 weeks",
  },
  {
    id: "brushed-pewter",
    code: "BP-09",
    name: "Brushed Pewter 09",
    material: "Cold-formed 6mm anodized aluminum",
    swatch: "#aebbc4",
    surface: "#dceaf2",
    veil: "rgba(174, 187, 196, 0.24)",
    density: "2.70 g/cm³",
    reflectance: "LRV 58%",
    finishGrade: "Directional grain · 24 GU",
    leadTime: "7 weeks",
  },
] as const;

export const MOOVE_EDITIONS = [
  {
    id: "arca-01",
    number: "01",
    name: "Arca Lounge Chair",
    subtitle: "Single-crease cantilevered shell",
    allocation: "Edition of 24 · 2026",
    dimensions: "780 × 840 × 690 mm",
    seatHeight: "360 mm",
    mass: "42 kg",
    radius: "R 640 mm",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    alt: "Arca 01 pale rose sculptural lounge chair against a rose backdrop",
    summary:
      "Cast as a continuous 18mm shell and folded along one parabolic lumbar crease. The geometry locks under its own curvature, eliminating internal steel frames or visible joinery.",
    svgPath: "M 52 146 C 84 44, 198 44, 228 146 C 186 122, 94 122, 52 146 Z",
    arcPath: "M 64 114 Q 140 62 216 114",
  },
  {
    id: "plinth-02",
    number: "02",
    name: "Plinth Low Table",
    subtitle: "Split-cylinder travertine monolith",
    allocation: "Edition of 18 · 2026",
    dimensions: "1180 × 720 × 310 mm",
    seatHeight: "310 mm",
    mass: "86 kg",
    radius: "R 590 mm",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimal sculptural low table and stool study in directional studio light",
    summary:
      "Two interlocking half-shells support a honed stone plane with a 14mm shadow reveal. Engineered so light passes beneath the slab while the base anchors the room.",
    svgPath: "M 36 74 L 244 74 L 244 92 L 36 92 Z M 68 92 C 68 142, 118 148, 134 92 M 146 92 C 162 148, 212 142, 212 92",
    arcPath: "M 48 83 L 232 83",
  },
  {
    id: "velo-03",
    number: "03",
    name: "Velo Daybed",
    subtitle: "Swept monocoque gallery bench",
    allocation: "Edition of 12 · 2026",
    dimensions: "1920 × 680 × 410 mm",
    seatHeight: "390 mm",
    mass: "64 kg",
    radius: "R 1120 mm",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    alt: "Quiet architectural interior featuring sculptural seating and soft daylight",
    summary:
      "An elongated catenary span that touches the floor at two tangential arcs. Topped with a removable cylinder bolster in unbleached wool bouclé.",
    svgPath: "M 28 118 Q 140 92 252 118 L 234 150 Q 140 124 46 150 Z",
    arcPath: "M 34 106 Q 140 80 246 106",
  },
  {
    id: "halo-04",
    number: "04",
    name: "Halo Luminaire",
    subtitle: "Translucent cast-resin floor vessel",
    allocation: "Edition of 36 · 2026",
    dimensions: "340 × 340 × 480 mm",
    seatHeight: "480 mm",
    mass: "11 kg",
    radius: "R 170 mm",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Sculptural curved vessel form catching soft studio light",
    summary:
      "Poured in semi-translucent rose mineral composite that diffuses a warm 2400K LED core through graduated wall thickness from 22mm at the base to 6mm at the rim.",
    svgPath: "M 92 40 C 78 96, 78 132, 96 156 L 184 156 C 202 132, 202 96, 188 40 Z",
    arcPath: "M 92 40 Q 140 66 188 40",
  },
] as const;

export const MOOVE_SHELL_PHASES = [
  {
    step: "Phase I",
    title: "Planar mineral sheet",
    metric: "κ = 0.00 m⁻¹ · Flat cast",
    copy: "Each shell begins as a flat 18mm mineral-resin slab pigmented in the mass. A single parabolic crease is milled on the underside with a compass radius of 640mm.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80",
    alt: "Soft rose pigment and botanical light study",
  },
  {
    step: "Phase II",
    title: "Curved-crease thermoforming",
    metric: "κ = 0.88 m⁻¹ · 42° bend",
    copy: "While the composite cures in its elastic window, folding along the curved score forces the outer wings to rise into a self-bracing saddle without straight facets.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    alt: "Sculptural curved surface in directional studio light",
  },
  {
    step: "Phase III",
    title: "Locked monocoque shell",
    metric: "κ = 1.56 m⁻¹ · 104° rake",
    copy: "Once cooled and hand-honed to 12 gloss units, the opposing curves lock in tension—supporting 320 kg of static load with zero internal steel framing.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    alt: "Completed Arca 01 sculptural rose chair in studio",
  },
] as const;

export const MOOVE_SWATCHES = [
  { name: "Rose Chalk", hex: "#F7DED4", code: "MOOVE-01", note: "Primary mineral shell ground · LRV 64%" },
  { name: "Terra Coral", hex: "#F2A18E", code: "MOOVE-02", note: "Venetian earth pigment accent · LRV 52%" },
  { name: "Travertine Bone", hex: "#F4F2EE", code: "MOOVE-03", note: "Architectural gallery paper · LRV 86%" },
  { name: "Quarry Sage", hex: "#E5ECDD", code: "MOOVE-04", note: "Oxidized stone secondary · LRV 78%" },
  { name: "Foundry Umber", hex: "#141414", code: "MOOVE-05", note: "Deep carbon ink & brass stamp · LRV 4%" },
] as const;

export function MooveHeroInspector() {
  const [finishIndex, setFinishIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeFinish = MOOVE_FINISHES[finishIndex];

  const onFinishKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % MOOVE_FINISHES.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index + MOOVE_FINISHES.length - 1) % MOOVE_FINISHES.length;
    } else {
      return;
    }
    event.preventDefault();
    setFinishIndex(next);
    buttonsRef.current[next]?.focus();
  };

  return (
    <div className="moove-hero-grid">
      <div className="moove-hero-copy">
        <h1 className="moove-hero-title">
          Sculptural furniture held by <em>a single curve.</em>
        </h1>
        <p className="moove-hero-lead">
          Moove is a Milan and Lisbon furniture house casting pigment into mineral
          composite and carving honed travertine into monolithic seating. Every form in
          Collection 01 derives its structural rigidity from one continuous curved crease.
        </p>

        <div className="moove-finish-picker">
          <div className="moove-finish-header">
            <span className="moove-meta-label">Material finish — {activeFinish.code}</span>
            <span className="moove-meta-value">{activeFinish.material}</span>
          </div>
          <div
            className="moove-finish-pills"
            role="radiogroup"
            aria-label="Select Moove surface finish"
          >
            {MOOVE_FINISHES.map((finish, index) => {
              const selected = finishIndex === index;
              return (
                <button
                  key={finish.id}
                  ref={(el) => {
                    buttonsRef.current[index] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setFinishIndex(index)}
                  onKeyDown={(e) => onFinishKeyDown(e, index)}
                  className="moove-finish-pill"
                  data-active={selected}
                >
                  <span
                    className="moove-finish-dot"
                    style={{ backgroundColor: finish.swatch }}
                    aria-hidden="true"
                  />
                  <span>{finish.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="moove-hero-actions">
          <a href="#collection" className="moove-btn-primary group">
            <span>Explore Collection 01</span>
            <ArrowUpRight />
          </a>
          <a href="#dossier" className="moove-btn-secondary group">
            <span>Request commission dossier</span>
            <ArrowUpRight />
          </a>
          <button
            type="button"
            aria-pressed={showOverlay}
            onClick={() => setShowOverlay((v) => !v)}
            className="moove-diagram-toggle"
          >
            {showOverlay ? "Hide orthographic arcs" : "Show orthographic arcs"}
          </button>
        </div>
      </div>

      <div className="moove-hero-stage-wrap">
        <div
          className="moove-hero-stage"
          style={{ backgroundColor: activeFinish.surface }}
          data-finish={activeFinish.id}
        >
          <Image
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=82"
            alt="Moove Arca 01 sculptural lounge chair in soft rose studio light"
            fill
            preload
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="moove-hero-img object-cover"
          />
          <LiquidDistortion />
          <div
            className="moove-hero-veil"
            style={{ backgroundColor: activeFinish.veil }}
            aria-hidden="true"
          />

          <svg
            viewBox="0 0 600 480"
            className="moove-hero-diagram"
            data-visible={showOverlay}
            aria-hidden="true"
          >
            <circle
              cx="300"
              cy="250"
              r="182"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.55"
            />
            <path
              d="M 118 292 C 194 128, 406 128, 482 292"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M 148 334 Q 300 218 452 334"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <line
              x1="300"
              y1="68"
              x2="300"
              y2="418"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.45"
            />
            <line
              x1="118"
              y1="396"
              x2="482"
              y2="396"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.65"
            />
            <circle cx="300" cy="168" r="4" fill="currentColor" />
            <circle cx="118" cy="292" r="3.5" fill="currentColor" />
            <circle cx="482" cy="292" r="3.5" fill="currentColor" />
            <text x="312" y="164" fontSize="11" fontWeight="600" letterSpacing="1.4" fill="currentColor">
              R 640 MM CREASE
            </text>
            <text x="312" y="54" fontSize="10" letterSpacing="1.2" fill="currentColor" opacity="0.85">
              RAKE 104° · MONOCOQUE
            </text>
            <text x="242" y="414" fontSize="10" letterSpacing="1.4" fill="currentColor">
              780 × 840 × 690 MM
            </text>
          </svg>

          <div className="moove-stage-badge">
            <span>Plate 01 — Arca Lounge</span>
            <span>{activeFinish.name}</span>
          </div>
        </div>

        <dl className="moove-spec-strip" aria-label="Selected finish specifications">
          <div>
            <dt>Finish code</dt>
            <dd>{activeFinish.code}</dd>
          </div>
          <div>
            <dt>Density</dt>
            <dd>{activeFinish.density}</dd>
          </div>
          <div>
            <dt>Surface gloss</dt>
            <dd>{activeFinish.finishGrade}</dd>
          </div>
          <div>
            <dt>Atelier lead time</dt>
            <dd>{activeFinish.leadTime}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function MooveCollectionLedger() {
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % MOOVE_EDITIONS.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index + MOOVE_EDITIONS.length - 1) % MOOVE_EDITIONS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = MOOVE_EDITIONS.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setInstant(true);
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const selectForDossier = (pieceId: string) => {
    window.dispatchEvent(new CustomEvent("moove:select-piece", { detail: pieceId }));
    const target = document.getElementById("dossier");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="moove-ledger" data-instant={instant}>
      <div
        className="moove-ledger-tabs"
        role="tablist"
        aria-label="Moove 2026 numbered collection"
        aria-orientation="vertical"
      >
        {MOOVE_EDITIONS.map((item, index) => {
          const isSelected = active === index;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`moove-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`moove-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={(e) => {
                setInstant(e.detail === 0);
                setActive(index);
              }}
              onKeyDown={(e) => onTabKeyDown(e, index)}
              className="moove-ledger-tab"
            >
              <span className="moove-ledger-num">{item.number}</span>
              <span className="moove-ledger-title-group">
                <span className="moove-ledger-name">{item.name}</span>
                <span className="moove-ledger-sub">{item.subtitle}</span>
              </span>
              <span className="moove-ledger-dim">{item.dimensions}</span>
            </button>
          );
        })}
      </div>

      <div className="moove-ledger-panels">
        {MOOVE_EDITIONS.map((item, index) => {
          const isSelected = active === index;
          return (
            <div
              key={item.id}
              id={`moove-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`moove-tab-${index}`}
              aria-hidden={!isSelected}
              inert={!isSelected}
              tabIndex={isSelected ? 0 : -1}
              data-active={isSelected}
              className="moove-ledger-panel"
            >
              <div className="moove-panel-media">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="moove-panel-img object-cover"
                />
                <LiquidDistortion />
                <span className="moove-panel-pill">{item.allocation}</span>
              </div>

              <div className="moove-panel-body">
                <div className="moove-panel-top">
                  <div>
                    <h3 className="moove-panel-heading">{item.name}</h3>
                    <p className="moove-panel-summary">{item.summary}</p>
                  </div>
                  <div className="moove-elevation-box" aria-label={`${item.name} orthographic section`}>
                    <svg viewBox="0 0 280 180" className="moove-elevation-svg" aria-hidden="true">
                      <line x1="20" y1="156" x2="260" y2="156" stroke="currentColor" strokeWidth="1" opacity="0.35" />
                      <path
                        d={item.svgPath}
                        fill="rgba(242, 161, 142, 0.24)"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d={item.arcPath}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                      />
                      <text x="24" y="28" fontSize="10" fontWeight="600" letterSpacing="1.2" fill="currentColor">
                        SECTION · {item.radius}
                      </text>
                    </svg>
                  </div>
                </div>

                <dl className="moove-panel-specs">
                  <div>
                    <dt>Dimensions (W × D × H)</dt>
                    <dd>{item.dimensions}</dd>
                  </div>
                  <div>
                    <dt>Datum height</dt>
                    <dd>{item.seatHeight}</dd>
                  </div>
                  <div>
                    <dt>Mass</dt>
                    <dd>{item.mass}</dd>
                  </div>
                  <div>
                    <dt>Primary arc</dt>
                    <dd>{item.radius}</dd>
                  </div>
                </dl>

                <div className="moove-panel-footer">
                  <button
                    type="button"
                    onClick={() => selectForDossier(item.id)}
                    className="moove-btn-primary group"
                  >
                    <span>Specify {item.name} in dossier</span>
                    <ArrowUpRight />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MooveShellSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<(HTMLElement | null)[]>([]);
  const arcPathRef = useRef<SVGPathElement>(null);
  const metricTextRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const isTallEnough = useMediaQuery("(min-height: 520px)");
  const [contentFits, setContentFits] = useState(false);
  const activeMotion = !reducedMotion && isTallEnough && contentFits;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const grids = [...section.querySelectorAll<HTMLElement>(".moove-shell-frame-grid")];
    const header = section.querySelector<HTMLElement>(".moove-shell-header");
    const measure = () => {
      const tallest = Math.max(0, ...grids.map((grid) => grid.scrollHeight));
      const chrome = (header?.offsetHeight ?? 0) + 150;
      setContentFits(tallest > 0 && tallest + chrome <= window.innerHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    grids.forEach((grid) => observer.observe(grid));
    if (header) observer.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!activeMotion) {
      frameRefs.current.forEach((frame) => {
        if (!frame) return;
        frame.style.transform = "";
        frame.style.opacity = "";
      });
      if (progressFillRef.current) progressFillRef.current.style.transform = "scaleX(1)";
      return;
    }

    const syncNavTheme = () => {
      const bounds = section.getBoundingClientRect();
      document.documentElement.toggleAttribute(
        "data-featured-visible",
        bounds.top <= 64 && bounds.bottom > 64
      );
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      syncNavTheme();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp01(-rect.top / scrollable);

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const curvature = (progress * 1.56).toFixed(2);
      const angle = Math.round(progress * 76);
      if (metricTextRef.current) {
        metricTextRef.current.textContent = `κ = ${curvature} m⁻¹ · Fold ${angle}°`;
      }

      if (arcPathRef.current) {
        const apexY = Math.round(142 - progress * 78);
        const wingY = Math.round(142 + progress * 18);
        arcPathRef.current.setAttribute(
          "d",
          `M 48 ${wingY} Q 180 ${apexY} 312 ${wingY}`
        );
      }

      frameRefs.current.forEach((frame, index) => {
        if (!frame) return;
        const local = frameProgress(
          progress,
          index,
          MOOVE_SHELL_PHASES.length
        );
        const arrival = clamp01((local - 0.25) / 0.75);
        const translateY = (1 - local) * 115;
        const opacity = index === 0 ? 1 : 0.35 + arrival * 0.65;
        const scale = 1.03 - arrival * 0.03;
        frame.style.transform = `translate3d(0, ${translateY}%, 0)`;
        frame.style.opacity = String(opacity);
        const imgWrap = frame.querySelector<HTMLElement>('[data-shell-part="image"]');
        if (imgWrap) {
          imgWrap.style.transform = `scale(${scale})`;
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.removeAttribute("data-featured-visible");
    };
  }, [activeMotion]);

  return (
    <section
      id="shell-study"
      ref={sectionRef}
      aria-label="Curved shell structural study"
      data-motion={activeMotion ? "on" : "off"}
      className="moove-shell-section scroll-mt-20"
    >
      <div className="moove-shell-viewport">
        <div className="mx-auto flex h-full max-w-350 flex-col justify-between px-5 py-10 md:px-8 md:py-16">
          <div className="moove-shell-header">
            <div>
              <h2 className="moove-section-title">
                One curved crease turns flat mineral sheet into a load-bearing saddle.
              </h2>
            </div>
            <div className="moove-shell-live-box">
              <svg viewBox="0 0 360 190" className="moove-shell-live-svg" aria-hidden="true">
                <line x1="32" y1="142" x2="328" y2="142" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
                <path
                  ref={arcPathRef}
                  d="M 48 142 Q 180 142 312 142"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <circle cx="180" cy="100" r="3.5" fill="currentColor" />
              </svg>
              <div className="moove-shell-live-meta">
                <span ref={metricTextRef} className="tabular-nums">
                  κ = 0.00 m⁻¹ · Fold 0°
                </span>
                <span className="moove-shell-progress-bar" aria-hidden="true">
                  <span ref={progressFillRef} className="moove-shell-progress-fill" />
                </span>
              </div>
            </div>
          </div>

          <div className="moove-shell-stage">
            {MOOVE_SHELL_PHASES.map((phase, index) => (
              <article
                key={phase.step}
                ref={(el) => {
                  frameRefs.current[index] = el;
                }}
                className="moove-shell-frame"
                style={{ zIndex: index + 1 }}
              >
                <div className="moove-shell-frame-grid">
                  <div className="moove-shell-step-col">
                    <span className="moove-shell-num">0{index + 1}</span>
                    <span className="moove-shell-step-tag">{phase.step}</span>
                  </div>
                  <div className="moove-shell-text-col">
                    <h3 className="moove-shell-frame-title">{phase.title}</h3>
                    <p className="moove-shell-frame-copy">{phase.copy}</p>
                    <p className="moove-shell-frame-metric tabular-nums">{phase.metric}</p>
                  </div>
                  <div className="moove-shell-img-frame">
                    <div data-shell-part="image" className="relative h-full w-full">
                      <Image
                        src={phase.image}
                        alt={phase.alt}
                        fill
                        sizes="(min-width: 768px) 320px, 85vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MoovePaletteSwatches() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copySwatch = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // Clipboard API may be unavailable in restricted contexts; still reflect selection state.
    }
    setCopiedHex(hex);
  };

  return (
    <div className="moove-swatch-grid" role="list" aria-label="Moove brand color tokens">
      {MOOVE_SWATCHES.map((swatch) => {
        const isDark = swatch.hex === "#141414";
        const isCopied = copiedHex === swatch.hex;
        return (
          <button
            key={swatch.code}
            type="button"
            role="listitem"
            onClick={() => copySwatch(swatch.hex)}
            className="moove-swatch-card"
            style={{
              backgroundColor: swatch.hex,
              color: isDark ? "#f4f2ee" : "#141414",
            }}
          >
            <div className="moove-swatch-top">
              <span className="moove-swatch-code">{swatch.code}</span>
              <span className="moove-swatch-hex tabular-nums">
                {isCopied ? "Copied " + swatch.hex : swatch.hex}
              </span>
            </div>
            <div className="moove-swatch-bottom">
              <strong className="moove-swatch-name">{swatch.name}</strong>
              <span className="moove-swatch-note">{swatch.note}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function MooveDossierBuilder() {
  const [pieceId, setPieceId] = useState<string>(MOOVE_EDITIONS[0].id);
  const [finishId, setFinishId] = useState<string>(MOOVE_FINISHES[0].id);
  const [contextType, setContextType] = useState<string>("Private Residence");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dossier, setDossier] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) setPieceId(detail);
    };
    window.addEventListener("moove:select-piece", onSelect);
    return () => window.removeEventListener("moove:select-piece", onSelect);
  }, []);

  const selectedPiece = MOOVE_EDITIONS.find((p) => p.id === pieceId) ?? MOOVE_EDITIONS[0];
  const selectedFinish = MOOVE_FINISHES.find((f) => f.id === finishId) ?? MOOVE_FINISHES[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedName || !trimmedEmail || !trimmedNotes) {
      setError("Name, email, and spatial notes are required to generate the dossier.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
      setError("Enter a valid studio or personal email address.");
      return;
    }

    setError(null);
    setCopied(false);
    setDossier(
      [
        "MOOVE ATELIER — 2026 COMMISSION SPECIFICATION DOSSIER",
        "-----------------------------------------------------",
        `Edition Piece : ${selectedPiece.number} / ${selectedPiece.name} (${selectedPiece.dimensions})`,
        `Surface Finish: ${selectedFinish.name} (${selectedFinish.code}) — ${selectedFinish.material}`,
        `Lead Time     : ${selectedFinish.leadTime} · Mass ${selectedPiece.mass}`,
        `Project Space : ${contextType}`,
        `Client / Arch : ${trimmedName} <${trimmedEmail}>`,
        `Spatial Notes : ${trimmedNotes}`,
      ].join("\n")
    );
  };

  const copyDossier = async () => {
    if (!dossier) return;
    try {
      await navigator.clipboard.writeText(dossier);
    } catch {
      // Fallback handled silently if clipboard permission is denied
    }
    setCopied(true);
  };

  return (
    <div className="moove-dossier-grid">
      <div className="moove-dossier-intro">
        <h2 className="moove-section-title">
          Assemble a 2026 specification dossier.
        </h2>
        <p className="moove-dossier-copy">
          Each Moove piece is cast and honed to order in numbered annual runs. Select
          your edition and mineral finish to prepare a copyable specification sheet for
          your project brief.
        </p>

        <div className="moove-dossier-preview-card">
          <div className="moove-dossier-preview-row">
            <span>Selected edition</span>
            <strong>{selectedPiece.number} — {selectedPiece.name}</strong>
          </div>
          <div className="moove-dossier-preview-row">
            <span>Dimensions &amp; mass</span>
            <strong className="tabular-nums">{selectedPiece.dimensions} · {selectedPiece.mass}</strong>
          </div>
          <div className="moove-dossier-preview-row">
            <span>Finish specification</span>
            <strong>{selectedFinish.name} ({selectedFinish.code})</strong>
          </div>
          <div className="moove-dossier-preview-row">
            <span>Allocation &amp; lead time</span>
            <strong className="tabular-nums">{selectedPiece.allocation} · {selectedFinish.leadTime}</strong>
          </div>
        </div>
      </div>

      <div className="moove-dossier-form-wrap">
        <form onSubmit={handleSubmit} noValidate className="moove-dossier-form">
          <div className="moove-field-group">
            <label htmlFor="moove-piece">Edition piece</label>
            <select
              id="moove-piece"
              name="piece"
              value={pieceId}
              onChange={(e) => setPieceId(e.target.value)}
              className="moove-input"
            >
              {MOOVE_EDITIONS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.number} — {item.name} ({item.dimensions})
                </option>
              ))}
            </select>
          </div>

          <div className="moove-field-row">
            <div className="moove-field-group">
              <label htmlFor="moove-finish">Mineral finish</label>
              <select
                id="moove-finish"
                name="finish"
                value={finishId}
                onChange={(e) => setFinishId(e.target.value)}
                className="moove-input"
              >
                {MOOVE_FINISHES.map((finish) => (
                  <option key={finish.id} value={finish.id}>
                    {finish.name} ({finish.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="moove-field-group">
              <label htmlFor="moove-context">Spatial setting</label>
              <select
                id="moove-context"
                name="context"
                value={contextType}
                onChange={(e) => setContextType(e.target.value)}
                className="moove-input"
              >
                <option value="Private Residence">Private Residence</option>
                <option value="Gallery / Exhibition">Gallery / Exhibition</option>
                <option value="Architectural Specification">Architectural Specification</option>
              </select>
            </div>
          </div>

          <div className="moove-field-row">
            <div className="moove-field-group">
              <label htmlFor="moove-name">Your name or studio</label>
              <input
                id="moove-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Studio Rossini / Elena Vance"
                className="moove-input"
              />
            </div>

            <div className="moove-field-group">
              <label htmlFor="moove-email">Email address</label>
              <input
                id="moove-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@studiorossini.eu"
                className="moove-input"
              />
            </div>
          </div>

          <div className="moove-field-group">
            <label htmlFor="moove-notes">Room dimensions &amp; placement notes</label>
            <textarea
              id="moove-notes"
              name="notes"
              rows={3}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="South-facing limestone salon, pair of Arca 01 chairs in Rose Chalk 04."
              className="moove-input"
            />
          </div>

          {error && (
            <p role="alert" className="moove-form-error">
              {error}
            </p>
          )}

          <div className="moove-form-actions">
            <button type="submit" className="moove-btn-primary group">
              <span>Prepare specification sheet</span>
              <ArrowUpRight />
            </button>
          </div>
        </form>

        {dossier && (
          <div className="moove-dossier-output" aria-live="polite">
            <div className="moove-dossier-output-head">
              <strong>Your Moove specification sheet is ready.</strong>
              <span>
                This showcase generates a local trade brief — copy it below or bring it to{" "}
                <Link href="/contact" className="underline underline-offset-2">
                  PerPixel&apos;s project form
                </Link>
                .
              </span>
            </div>
            <pre className="moove-dossier-pre">{dossier}</pre>
            <div className="moove-dossier-output-actions">
              <button
                type="button"
                onClick={copyDossier}
                className="moove-btn-secondary"
              >
                {copied ? "Copied dossier" : "Copy dossier"}
              </button>
              <Link href="/contact" className="moove-btn-link group">
                <span>Continue to studio contact</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
