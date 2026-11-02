import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PlaybookShowcase from "./PlaybookShowcase";

export const metadata: Metadata = {
  title: "Studio Intelligence & Growth Playbook",
  description:
    "Competitor intelligence, live website critiques, global vs India pricing benchmarks, case-study anatomy, client acquisition pipeline, and PerPixel's 30/60/90-day growth plan.",
  // Internal research: reachable by direct URL only, never listed or indexed.
  robots: { index: false, follow: false },
};

export default function PlaybookPage() {
  return (
    <main className="pt-28 md:pt-36" suppressHydrationWarning>
      {/* Editorial Hero + Dual Video Stage */}
      <header className="px-5 pb-14 md:px-8 md:pb-20">
        <div className="mx-auto max-w-350">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
              PERPIXEL RESEARCH PRACTICE · COMPETITOR &amp; PIPELINE DOSSIER
            </p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,8.5vw,7.8rem)] leading-[0.88] tracking-[-0.04em]">
              Studio Intelligence &amp;{" "}
              <span className="italic text-coral">Growth Playbook.</span>
            </h1>
          </Reveal>

          <Reveal delay={60} className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="max-w-[54ch] text-base leading-relaxed text-ink/75 lg:col-span-5">
              Everything we uncovered studying 18 global and Indian branding/editorial/motion
              studios: how they position, why their websites succeed or fail, what they charge
              across one-pagers to enterprise rebrands, how a case study converts referrals, and
              the exact 30/60/90-day execution plan for PerPixel.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
              <div className="rounded-card bg-blush p-5">
                <p className="font-serif text-4xl leading-none">18</p>
                <p className="mt-2 text-xs text-ink/70">Global &amp; Indian studios dissected</p>
              </div>
              <div className="rounded-card bg-butter p-5">
                <p className="font-serif text-4xl leading-none">26</p>
                <p className="mt-2 text-xs text-ink/70">Live website screenshots critiqued</p>
              </div>
              <div className="rounded-card bg-sage p-5">
                <p className="font-serif text-4xl leading-none">34.2%</p>
                <p className="mt-2 text-xs text-ink/70">Client discovery from referrals (#1)</p>
              </div>
              <div className="rounded-card border border-line bg-white p-5">
                <p className="font-serif text-4xl leading-none">8–10×</p>
                <p className="mt-2 text-xs text-ink/70">Global vs India rate arbitrage</p>
              </div>
            </div>
          </Reveal>

          {/* Showreel Video Strip */}
          <Reveal delay={100} className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-ink">
              <video
                src="/works/offset/assets/videos/raw_12-aurora-glass.mp4"
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-xs">
                01 · Industrial &amp; Material Systems (Moove)
              </span>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-ink">
              <video
                src="/works/dune/assets/videos/dunes_golden.webm"
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-xs">
                02 · Editorial &amp; Cultural Motion (Dune)
              </span>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-ink">
              <video
                src="/works/offset/assets/videos/raw_07-liquid.mp4"
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-xs">
                03 · D2C &amp; Tactile Commerce (Sorso / Ghaslet)
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      <PlaybookShowcase />
    </main>
  );
}
