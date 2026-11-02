"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ACQUISITION_CHANNELS,
  CASE_STUDY_ANATOMY,
  CASE_STUDY_BLUEPRINTS,
  DELIVERABLE_PRICING,
  NEXT_PLAN_PHASES,
  PIPELINE_STAGES,
  SITE_CRITIQUES,
  STUDIOS,
} from "./playbook-data";

const CHAPTERS = [
  { num: "01", label: "Global & India Comps", id: "comps" },
  { num: "02", label: "Website Critique", id: "critique" },
  { num: "03", label: "Pricing & Estimator", id: "pricing" },
  { num: "04", label: "Case Study Anatomy", id: "anatomy" },
  { num: "05", label: "Acquisition & Pipeline", id: "pipeline" },
  { num: "06", label: "Cold-Start & Blueprints", id: "cold-start" },
  { num: "07", label: "Next Plan Roadmap", id: "next-plan" },
] as const;

const STUDIO_FILTERS = [
  "All",
  "Global",
  "India",
  "Founder-Led",
  "Motion/Tech",
  "Editorial/Small Prestige",
] as const;

function AmbientVideo({ src, className = "" }: { src: string; className?: string }) {
  return (
    <video
      src={src}
      className={`h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      onCanPlay={(e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          e.currentTarget.pause();
        }
      }}
    />
  );
}

export default function PlaybookShowcase() {
  const [studioFilter, setStudioFilter] = useState<(typeof STUDIO_FILTERS)[number]>("All");
  const [search, setSearch] = useState("");
  const [critiqueIndex, setCritiqueIndex] = useState(0);
  const [shotView, setShotView] = useState<"both" | "1" | "2">("both");
  const [market, setMarket] = useState<"INR" | "USD">("INR");
  const [selectedDeliverableId, setSelectedDeliverableId] = useState("identity");
  const [clientStage, setClientStage] = useState<"early" | "growth" | "enterprise">("growth");
  const [anatomyStep, setAnatomyStep] = useState(0);
  const [activePipeStage, setActivePipeStage] = useState(0);
  const [revenueTarget, setRevenueTarget] = useState(1000000);
  const [closeRatePct, setCloseRatePct] = useState(25);
  const [activePhaseId, setActivePhaseId] = useState<string>(NEXT_PLAN_PHASES[0].id);
  const [completedTasks, setCompletedTasks] = useState<string[]>(["t1"]);

  const filteredStudios = useMemo(() => {
    return STUDIOS.filter((s) => {
      const matchesFilter =
        studioFilter === "All" ||
        s.region === studioFilter ||
        s.tags.includes(studioFilter as "Founder-Led" | "Motion/Tech" | "Editorial/Small Prestige");
      const q = search.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.clients.toLowerCase().includes(q) ||
        s.positioning.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [studioFilter, search]);

  const activeCritique = SITE_CRITIQUES[critiqueIndex] ?? SITE_CRITIQUES[0];
  const activeDeliverable =
    DELIVERABLE_PRICING.find((d) => d.id === selectedDeliverableId) ?? DELIVERABLE_PRICING[0];
  const priceBand =
    market === "INR"
      ? activeDeliverable.indiaBands[clientStage]
      : activeDeliverable.globalBands[clientStage];

  const formatMoney = (val: number, cur: "INR" | "USD" = market) =>
    cur === "INR"
      ? `₹${Math.round(val).toLocaleString("en-IN")}`
      : `$${Math.round(val).toLocaleString("en-US")}`;

  const activeAnatomy = CASE_STUDY_ANATOMY[anatomyStep] ?? CASE_STUDY_ANATOMY[0];
  const activePipeline = PIPELINE_STAGES[activePipeStage] ?? PIPELINE_STAGES[0];
  const requiredPipeline = Math.round(revenueTarget / Math.max(closeRatePct / 100, 0.05));
  const activePhase =
    NEXT_PLAN_PHASES.find((p) => p.id === activePhaseId) ?? NEXT_PLAN_PHASES[0];

  const allTaskIds = NEXT_PLAN_PHASES.flatMap((p) => p.tasks.map((t) => t.id));
  const progressPct = Math.round((completedTasks.length / allTaskIds.length) * 100);

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-24">
      {/* Sticky Chapter Bar */}
      <nav
        aria-label="Playbook chapters"
        className="sticky top-18 z-20 border-y border-line bg-paper/90 px-5 py-3 backdrop-blur-md md:px-8"
      >
        <div className="mx-auto flex max-w-350 items-center justify-between gap-4 overflow-x-auto">
          <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper">
            FIELD DOSSIER · 2026
          </span>
          <div className="flex items-center gap-5 text-xs font-medium">
            {CHAPTERS.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="shrink-0 text-ink/65 transition-colors hover:text-ink"
              >
                <span className="font-semibold text-ink/40">{ch.num}</span> {ch.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* SECTION 01: COMP MATRIX */}
      <section id="comps" className="scroll-mt-32 px-5 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                01 / COMPARABLE STUDIOS (9 GLOBAL · 9 INDIA)
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
                Who we are benchmarking against.
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-relaxed text-ink/70">
              LinkedIn follower counts do not equal prestige — Studio Yukiko and OK-RM sit near
              ~1k followers while winning Nike, Apple, and Guggenheim briefs. Self-initiated
              platforms and narrative case studies do the heavy lifting.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter studios">
              {STUDIO_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStudioFilter(f)}
                  aria-pressed={studioFilter === f}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    studioFilter === f
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white/60 text-ink/75 hover:border-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs">
              <span className="text-ink/50">Search</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Studio, city, client..."
                className="w-44 bg-transparent text-ink outline-none placeholder:text-ink/35"
              />
            </label>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredStudios.map((studio) => (
              <article
                key={studio.name}
                className="flex flex-col justify-between rounded-card border border-line bg-white/80 p-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">
                    <span>
                      {studio.region} · {studio.location}
                    </span>
                    <span>Est. {studio.founded}</span>
                  </div>

                  {studio.slug && (
                    <div className="relative mt-4 aspect-video overflow-hidden rounded-lg border border-line bg-word-pale">
                      <Image
                        src={`/research/shots/${studio.slug}-1.png`}
                        alt={`${studio.name} live homepage capture`}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}

                  <div className="mt-5 flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-3xl leading-none tracking-[-0.02em]">
                      {studio.name}
                    </h3>
                    <span className="text-xs text-ink/55">
                      {studio.size} staff · {studio.linkedin} LI
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-ink/55">Founders: {studio.founders}</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
                    {studio.positioning}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/65">
                    <strong className="text-ink">Notable work:</strong> {studio.clients}
                  </p>
                </div>

                <div className="mt-5 space-y-2 border-t border-line pt-4 text-xs leading-relaxed">
                  <p className="rounded-lg bg-sage/60 p-3 text-ink/85">
                    <strong>Culture / Pricing / Rating:</strong> {studio.ratingSignal}{" "}
                    {studio.culturePricingSignal}
                  </p>
                  <p className="rounded-lg bg-butter/60 p-3 text-ink/85">
                    <strong>Growth Playbook:</strong> {studio.playbook}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 02: LIVE WEBSITE CRITIQUE INSPECTOR */}
      <section
        id="critique"
        className="mt-24 scroll-mt-32 border-t border-line bg-ink px-5 py-20 text-paper md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-paper/15 pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/55">
                02 / LIVE WEBSITE CRITIQUE (26 VIEWPORT CAPTURES)
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
                Why their sites work — and where they fail.
              </h2>
            </div>
            <div className="flex gap-2" role="group" aria-label="Screenshot view mode">
              {(
                [
                  ["both", "Side-by-Side (Shot 01 + 02)"],
                  ["1", "Shot 01: Above Fold"],
                  ["2", "Shot 02: Mid-Scroll"],
                ] as const
              ).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setShotView(mode)}
                  aria-pressed={shotView === mode}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    shotView === mode
                      ? "border-coral bg-coral text-ink"
                      : "border-paper/20 text-paper/75 hover:border-paper"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Studio Selector Strip */}
          <div
            role="tablist"
            aria-label="Select studio website to critique"
            className="mt-8 flex gap-2 overflow-x-auto pb-2"
          >
            {SITE_CRITIQUES.map((item, idx) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={critiqueIndex === idx}
                onClick={() => setCritiqueIndex(idx)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  critiqueIndex === idx
                    ? "border-paper bg-paper text-ink"
                    : "border-paper/20 text-paper/70 hover:border-paper/60"
                }`}
              >
                {item.name} <span className="opacity-50">({item.region})</span>
              </button>
            ))}
          </div>

          {/* Active Studio Critique Stage */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div
                className={`grid gap-4 ${
                  shotView === "both" ? "md:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {(shotView === "both" || shotView === "1") && (
                  <figure className="overflow-hidden rounded-card border border-paper/15 bg-paper/5">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={`/research/shots/${activeCritique.slug}-1.png`}
                        alt={`${activeCritique.name} above the fold screenshot`}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="flex items-center justify-between px-4 py-2.5 text-[11px] text-paper/65">
                      <span>SHOT 01 · FIRST VIEWPORT (HERO)</span>
                      <span>{activeCritique.name}</span>
                    </figcaption>
                  </figure>
                )}
                {(shotView === "both" || shotView === "2") && (
                  <figure className="overflow-hidden rounded-card border border-paper/15 bg-paper/5">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={`/research/shots/${activeCritique.slug}-2.png`}
                        alt={`${activeCritique.name} mid-scroll screenshot`}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="flex items-center justify-between px-4 py-2.5 text-[11px] text-paper/65">
                      <span>SHOT 02 · MID-SCROLL / WORK INDEX</span>
                      <span>{activeCritique.name}</span>
                    </figcaption>
                  </figure>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-card border border-paper/15 bg-paper/5 p-6 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-4xl leading-none">{activeCritique.name}</h3>
                  <a
                    href={activeCritique.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-paper/25 px-3 py-1 text-xs text-paper/80 hover:border-paper"
                  >
                    Visit site ↗
                  </a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">
                  {activeCritique.verdict}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-sage p-4 text-ink">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60">
                      WHY IT IS GOOD (STEAL THIS)
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
                      {activeCritique.good.map((g) => (
                        <li key={g}>+ {g}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-blush p-4 text-ink">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60">
                      WHY IT IS BAD (AVOID THIS)
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
                      {activeCritique.bad.map((b) => (
                        <li key={b}>− {b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mt-5 rounded-xl border border-coral/40 bg-coral/15 p-4 text-xs leading-relaxed text-paper">
                <strong className="text-coral">PerPixel Takeaway:</strong>{" "}
                {activeCritique.perpixelLesson}
              </p>
            </div>
          </div>

          {/* 4 Synthesis Laws */}
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              [
                "01 / Real work in viewport #1",
                "Dumbar, &Walsh, and Eeksaurus lead with visceral work in context — no slow manifesto gate.",
              ],
              [
                "02 / Persistent orientation",
                "Porto Rocha's fixed column and Koto's collapsing HOME pill keep navigation effortless at any scroll depth.",
              ],
              [
                "03 / Zero lazy-load holes",
                "Yukiko's mid-scroll blank viewports look broken; PerPixel's reserved media containers prevent this.",
              ],
              [
                "04 / One ownable device",
                "darkroom's pixel darkroom, Otherway's pink ticket, PerPixel's BrandX + oversized editorial wordplay.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="rounded-card border border-paper/15 bg-paper/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-coral">
                  {title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-paper/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: PRICING & DUAL-MARKET CALCULATOR */}
      <section id="pricing" className="scroll-mt-32 border-t border-line px-5 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                03 / GLOBAL VS INDIA PRICING & SCOPE CALCULATOR
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
                The 8–10× rate delta — and how to price each job.
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-relaxed text-ink/70">
              Top studios never publish itemized menus — they publish engagement floors (Studio
              Freight: $80k minimum) or price by client stage. Indian domestic rates run ~8–10×
              below global agency rates, making dual INR/USD positioning a major margin lever.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Interactive Estimator */}
            <div className="rounded-card bg-ink p-6 text-paper md:p-8 lg:col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-coral">
                  INTERACTIVE DUAL-MARKET ESTIMATOR
                </span>
                <div className="flex rounded-full border border-paper/20 p-1 text-xs">
                  {(["INR", "USD"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMarket(m)}
                      aria-pressed={market === m}
                      className={`rounded-full px-3 py-1 font-medium transition-colors ${
                        market === m ? "bg-coral text-ink" : "text-paper/70"
                      }`}
                    >
                      {m === "INR" ? "INR (India Domestic)" : "USD (Global Client)"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DELIVERABLE_PRICING.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDeliverableId(d.id)}
                    aria-pressed={selectedDeliverableId === d.id}
                    className={`rounded-xl border p-3.5 text-left text-xs transition-colors ${
                      selectedDeliverableId === d.id
                        ? "border-coral bg-paper text-ink"
                        : "border-paper/15 bg-paper/5 text-paper/80 hover:border-paper/40"
                    }`}
                  >
                    <p className="font-semibold">{d.label}</p>
                    <p className="mt-1 opacity-70">{d.timeline}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.12em] text-paper/60">Client Stage</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  {(
                    [
                      ["early", "Seed / Early"],
                      ["growth", "Funded / Growth"],
                      ["enterprise", "Enterprise / Scale"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setClientStage(key)}
                      aria-pressed={clientStage === key}
                      className={`rounded-lg border py-2.5 font-medium ${
                        clientStage === key
                          ? "border-paper bg-paper text-ink"
                          : "border-paper/20 text-paper/75"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-paper/15 bg-paper/5 p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-paper/60">
                  Recommended Engagement Band ({activeDeliverable.timeline})
                </p>
                <p className="mt-2 font-serif text-4xl md:text-5xl">
                  {formatMoney(priceBand[0])} – {formatMoney(priceBand[1])}
                </p>
                <p className="mt-2 text-xs text-paper/70">
                  Standard 50/50 payment schedule: {formatMoney(priceBand[0] / 2)}–
                  {formatMoney(priceBand[1] / 2)} on kickoff · balance before final asset handoff.
                </p>
                <ul className="mt-4 grid gap-1.5 border-t border-paper/15 pt-4 text-xs text-paper/85 sm:grid-cols-2">
                  {activeDeliverable.included.map((inc) => (
                    <li key={inc}>✓ {inc}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg bg-coral/20 p-3 text-xs leading-relaxed text-paper">
                  <strong className="text-coral">Positioning Note:</strong>{" "}
                  {activeDeliverable.strategicNote}
                </p>
              </div>
            </div>

            {/* Full Deliverable Comparison Table */}
            <div className="overflow-x-auto rounded-card border border-line bg-white p-6 lg:col-span-6">
              <h3 className="font-serif text-3xl">Per-Deliverable Market Benchmarks</h3>
              <p className="mt-1 text-xs text-ink/60">
                Comparing Global agency rates (Clutch 2026 / Studio Freight) vs Indian studio packages.
              </p>
              <table className="mt-5 w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-ink text-[11px] uppercase tracking-[0.12em] text-ink/60">
                    <th className="py-3 pr-3">Deliverable</th>
                    <th className="py-3 pr-3">Global Studio (USD)</th>
                    <th className="py-3">India Studio (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERABLE_PRICING.map((row) => (
                    <tr key={row.id} className="border-b border-line">
                      <td className="py-3.5 pr-3 font-medium">
                        {row.label}
                        <span className="block text-[11px] font-normal text-ink/55">
                          {row.timeline}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3">
                        {formatMoney(row.globalBands.early[0], "USD")} –{" "}
                        {formatMoney(row.globalBands.enterprise[1], "USD")}
                      </td>
                      <td className="py-3.5">
                        {formatMoney(row.indiaBands.early[0], "INR")} –{" "}
                        {formatMoney(row.indiaBands.enterprise[1], "INR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-butter/70 p-4 text-xs leading-relaxed">
                  <strong>Snask’s Pricing Psychology:</strong> Quote a high senior rate to anchor
                  perceived value, then negotiate by narrowing scope or hours — never by slashing
                  the rate itself.
                </div>
                <div className="rounded-xl bg-blush/70 p-4 text-xs leading-relaxed">
                  <strong>Studio Freight’s Floor Anchor:</strong> Publishing &ldquo;Engagements start
                  at $80k&rdquo; on the contact form filters out low-budget inquiries automatically.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: CASE STUDY ANATOMY DECONSTRUCTOR */}
      <section id="anatomy" className="scroll-mt-32 border-t border-line px-5 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                04 / WHAT A CASE STUDY ACTUALLY IS (KOTO / UNIQODE TEMPLATE)
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
                One project = four growth assets.
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-relaxed text-ink/70">
              A case study is not an image gallery. It is a 6-part strategic proof document that
              simultaneously serves as your sales conversion page, LinkedIn carousel, awards
              submission, and design-press pitch.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-5" role="tablist" aria-label="Case study sections">
              {CASE_STUDY_ANATOMY.map((item, idx) => (
                <button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={anatomyStep === idx}
                  onClick={() => setAnatomyStep(idx)}
                  className={`flex w-full items-start justify-between gap-4 rounded-xl border p-4 text-left transition-colors ${
                    anatomyStep === idx
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white hover:border-ink"
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-60">
                      SECTION {item.step}
                    </span>
                    <p className="mt-1 font-serif text-2xl leading-none">{item.name}</p>
                    <p className="mt-2 text-xs leading-relaxed opacity-80">{item.job}</p>
                  </div>
                  <span className="text-lg">→</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col justify-between rounded-card border border-line bg-white p-6 md:p-8 lg:col-span-7">
              <div>
                <div className="aspect-video overflow-hidden rounded-xl border border-line bg-ink">
                  <AmbientVideo src={activeAnatomy.video} />
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <span className="rounded-full bg-coral px-3 py-1 text-xs font-semibold text-ink">
                    STEP {activeAnatomy.step} · {activeAnatomy.name.toUpperCase()}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-word-pale p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                      KOTO / UNIQODE BENCHMARK
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {activeAnatomy.kotoExample}
                    </p>
                  </div>
                  <div className="rounded-xl bg-sage p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                      PERPIXEL / MOOVE APPLICATION
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {activeAnatomy.perpixelApplication}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-line pt-5 text-xs md:grid-cols-4">
                {[
                  ["Asset 01", "Sales Conversion Page"],
                  ["Asset 02", "8-Slide LinkedIn Carousel"],
                  ["Asset 03", "Kyoorius / Awwwards Entry"],
                  ["Asset 04", "Design Press Pitch"],
                ].map(([num, label]) => (
                  <div key={num} className="rounded-lg bg-butter/65 p-3">
                    <p className="font-semibold text-ink/55">{num}</p>
                    <p className="mt-1 font-medium text-ink">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: CLIENT ACQUISITION CHANNELS & 6-STAGE PIPELINE */}
      <section id="pipeline" className="scroll-mt-32 border-t border-line px-5 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                05 / HOW STUDIOS GET CUSTOMERS & THE 6-STAGE PIPELINE
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
                Referrals start it. Systems scale it.
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-relaxed text-ink/70">
              Across 4,000+ agency reviews and the State of Brand survey, referrals (34.2%) and
              organic search (20.6%) drive over half of all new clients — while case studies act as
              the conversion layer for every single channel.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Channel Bars */}
            <div className="space-y-3 rounded-card border border-line bg-white p-6 lg:col-span-7">
              <h3 className="font-serif text-3xl">Client Discovery by Channel</h3>
              <div className="mt-4 space-y-3.5">
                {ACQUISITION_CHANNELS.map((ch) => (
                  <div key={ch.name} className="rounded-xl border border-line/70 p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold">{ch.name}</span>
                      <span className="text-ink/60">
                        Close rate: <strong className="text-ink">{ch.closeRate}</strong> · Share:{" "}
                        <strong className="text-ink">{ch.share}%</strong>
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-word-pale">
                      <div
                        className="h-full rounded-full bg-coral"
                        style={{ width: `${Math.min(100, (ch.share / 34.2) * 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-ink/65">
                      <strong>Timing:</strong> {ch.leadTime} — {ch.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Coverage Calculator & Real Studio Teardown */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              <div className="rounded-card bg-sage p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">
                  PIPELINE COVERAGE CALCULATOR
                </p>
                <h3 className="mt-2 font-serif text-3xl">How much pipeline do you need?</h3>
                <label className="mt-5 block text-xs font-medium">
                  Quarterly Revenue Goal ({market})
                  <input
                    type="number"
                    value={revenueTarget}
                    step={50000}
                    onChange={(e) => setRevenueTarget(Math.max(0, Number(e.target.value)))}
                    className="mt-1.5 w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-lg font-semibold outline-none"
                  />
                </label>
                <label className="mt-4 block text-xs font-medium">
                  Expected Close Rate ({closeRatePct}%)
                  <input
                    type="range"
                    min={10}
                    max={45}
                    value={closeRatePct}
                    onChange={(e) => setCloseRatePct(Number(e.target.value))}
                    className="mt-2 w-full accent-ink"
                  />
                </label>
                <div className="mt-5 rounded-xl bg-white p-4">
                  <p className="text-xs text-ink/60">Required Qualified Pipeline</p>
                  <p className="mt-1 font-serif text-4xl">{formatMoney(requiredPipeline)}</p>
                  <p className="mt-1 text-xs text-ink/65">
                    30%+ close rates require confirming budget, authority, need & timeline before
                    Call #1 ends.
                  </p>
                </div>
              </div>

              <div className="rounded-card bg-ink p-6 text-paper md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral">
                  REAL STUDIO OUTBOUND BENCHMARK (12 MONTHS)
                </p>
                <p className="mt-2 text-xs leading-relaxed text-paper/75">
                  How a referral-only identity studio built a $660k pipeline from scratch:
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg bg-paper/10 p-3">
                    <p className="font-serif text-3xl text-coral">6,450</p>
                    <p className="text-[11px] text-paper/70">Contacts Engaged</p>
                  </div>
                  <div className="rounded-lg bg-paper/10 p-3">
                    <p className="font-serif text-3xl text-coral">61 → 33</p>
                    <p className="text-[11px] text-paper/70">Meetings → SQL Opps</p>
                  </div>
                  <div className="rounded-lg bg-paper/10 p-3">
                    <p className="font-serif text-3xl text-coral">14</p>
                    <p className="text-[11px] text-paper/70">New Clients Won (42%)</p>
                  </div>
                  <div className="rounded-lg bg-paper/10 p-3">
                    <p className="font-serif text-3xl text-coral">$252k</p>
                    <p className="text-[11px] text-paper/70">Closed ($660k Pipeline)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Stage Interactive Funnel */}
          <div className="mt-10 rounded-card border border-line bg-white p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-serif text-3xl">The 6-Stage New Business Funnel</h3>
              <span className="text-xs text-ink/60">
                Click any stage to inspect exit criteria & conversion rates
              </span>
            </div>

            <div className="mt-6 grid gap-2 md:grid-cols-6">
              {PIPELINE_STAGES.map((st, idx) => (
                <button
                  key={st.stage}
                  type="button"
                  onClick={() => setActivePipeStage(idx)}
                  aria-pressed={activePipeStage === idx}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    activePipeStage === idx
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-word-pale/50 hover:border-ink"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-60">
                    {st.stage} · {st.duration}
                  </p>
                  <p className="mt-3 font-serif text-2xl leading-none">{st.name}</p>
                  <p className="mt-3 text-[11px] opacity-75">{st.conversion}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 rounded-xl bg-butter/60 p-5 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                  EXIT CRITERION ({activePipeline.name.toUpperCase()})
                </p>
                <p className="mt-1 text-sm font-medium text-ink">{activePipeline.exitCriterion}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                  STUDIO PLAYBOOK MOVE
                </p>
                <p className="mt-1 text-sm text-ink/85">{activePipeline.ownerAction}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: COLD-START PLAYBOOK & CONCRETE CASE STUDY BLUEPRINTS */}
      <section
        id="cold-start"
        className="scroll-mt-32 border-t border-line px-5 pt-20 md:px-8 md:pt-28"
      >
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                06 / COLD-START PLAYBOOK & SUGGESTED CASE STUDIES
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
                How to win clients before you have client logos.
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-relaxed text-ink/70">
              Every top studio broke the portfolio paradox the same way: self-initiated flagships,
              honest concept studies in a target vertical, and open tools that make peers refer
              them.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CASE_STUDY_BLUEPRINTS.map((bp) => (
              <article
                key={bp.title}
                className="flex flex-col justify-between overflow-hidden rounded-card border border-line bg-white"
              >
                <div>
                  <div className="grid aspect-16/10 grid-cols-2 overflow-hidden border-b border-line bg-ink">
                    <div className="relative h-full w-full">
                      <Image
                        src={bp.image}
                        alt={bp.title}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <AmbientVideo src={bp.video} />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                        {bp.tag}
                      </span>
                      <span className="text-xs text-ink/55">{bp.label}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl leading-tight">{bp.title}</h3>

                    <dl className="mt-4 space-y-2.5 text-xs leading-relaxed">
                      <div>
                        <dt className="font-semibold text-ink">The Challenge:</dt>
                        <dd className="text-ink/75">{bp.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">The Strategy:</dt>
                        <dd className="text-ink/75">{bp.strategy}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">System Deliverables:</dt>
                        <dd className="text-ink/75">{bp.deliverables}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="border-t border-line bg-word-pale/50 p-6">
                  <p className="text-xs leading-relaxed text-ink/80">
                    <strong>Why this converts leads:</strong> {bp.whyItSells}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={bp.href}
                      className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-coral hover:text-ink"
                    >
                      Inspect live work →
                    </Link>
                    {"secondaryHref" in bp && bp.secondaryHref && (
                      <Link
                        href={bp.secondaryHref}
                        className="rounded-full border border-ink px-4 py-2 text-xs font-medium text-ink hover:bg-ink hover:text-paper"
                      >
                        Inspect Ghaslet →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07: NEXT PLAN (30 / 60 / 90-DAY EXECUTION ROADMAP) */}
      <section
        id="next-plan"
        className="mt-24 scroll-mt-32 border-t border-line bg-butter/45 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-350">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">
                07 / NEXT PLAN — 30 / 60 / 90-DAY EXECUTION ROADMAP
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.8rem,6.5vw,5.6rem)] leading-[0.9] tracking-[-0.03em]">
                The exact next plan for PerPixel.
              </h2>
            </div>
            <div className="rounded-card border border-ink/15 bg-white px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                EXECUTION PROGRESS
              </p>
              <p className="mt-1 font-serif text-3xl">
                {completedTasks.length} / {allTaskIds.length} steps ({progressPct}%)
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Execution phases">
            {NEXT_PLAN_PHASES.map((phase) => (
              <button
                key={phase.id}
                type="button"
                role="tab"
                aria-selected={activePhaseId === phase.id}
                onClick={() => setActivePhaseId(phase.id)}
                className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition-colors ${
                  activePhaseId === phase.id
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 bg-white text-ink hover:border-ink"
                }`}
              >
                {phase.badge} · {phase.title}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-card border border-line bg-white p-6 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-coral">
                  {activePhase.badge}
                </span>
                <h3 className="mt-2 font-serif text-4xl">{activePhase.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-ink/70">{activePhase.objective}</p>
              </div>
              <div className="rounded-xl bg-sage px-4 py-3 text-xs font-medium text-ink">
                <strong>Target KPI:</strong> {activePhase.kpi}
              </div>
            </div>

            <ul className="mt-6 divide-y divide-line">
              {activePhase.tasks.map((task) => {
                const isDone = completedTasks.includes(task.id);
                return (
                  <li key={task.id} className="py-5">
                    <label className="flex cursor-pointer items-start gap-4">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1 h-5 w-5 shrink-0 accent-ink"
                      />
                      <div>
                        <p
                          className={`text-base font-semibold ${
                            isDone ? "text-ink/40 line-through" : "text-ink"
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-ink/65">{task.detail}</p>
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <p className="text-xs text-ink/60">
                Rule #1: Never invent fake client claims — label self-initiated and concept work
                honestly, lead with strategic narrative, and let craft close the referral.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects/moove"
                  className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-paper transition-colors hover:bg-coral hover:text-ink"
                >
                  Open Moove Flagship →
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-ink px-5 py-2.5 text-xs font-semibold text-ink hover:bg-ink hover:text-paper"
                >
                  Explore All Works →
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-ink px-5 py-2.5 text-xs font-semibold text-ink hover:bg-ink hover:text-paper"
                >
                  Contact / Brief Builder →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
