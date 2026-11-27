import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PlaybookShowcase from "@/components/playbook/PlaybookShowcase";
import { HOW_TO_USE } from "@/components/playbook/playbook-data";

export const metadata: Metadata = {
  title: "Internal growth playbook",
  description:
    "Internal notes on how PerPixel finds work, plus October 2026 research on other studios, pricing, and case studies.",
  robots: { index: false, follow: false },
};

export default function PlaybookPage() {
  return (
    <main className="pt-28 md:pt-36" suppressHydrationWarning>
      <header className="px-5 pb-14 md:px-8 md:pb-20">
        <div className="mx-auto max-w-350">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
              Internal · PerPixel team only · Not a public page
            </p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,8.5vw,7.8rem)] leading-[0.88] tracking-[-0.04em]">
              How we find work.{" "}
              <span className="italic text-coral">Growth playbook.</span>
            </h1>
          </Reveal>

          <Reveal delay={40} className="mt-10">
            <div className="rounded-card border border-line bg-white/80 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                How to use this
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-ink/75">
                Read this before the research. The first section is the work we are actually
                running. The studio studies, screenshots, and price bands later in the page are
                background. They are not our results.
              </p>
              <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {HOW_TO_USE.map((item) => (
                  <li key={item.n} className="rounded-xl bg-word-pale/70 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">
                      {item.n}
                    </p>
                    <p className="mt-2 font-serif text-2xl leading-none">{item.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-ink/75">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={60} className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="max-w-[54ch] text-base leading-relaxed text-ink/75 lg:col-span-5">
              We are PerPixel, a design and development studio. Branding and web are one job:
              branding, visual identity, web and store design, motion, and development. The public
              site is perpixel.agency. Figures below are the tracker on 27 Nov 2026, not targets.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
              <div className="rounded-card bg-blush p-5">
                <p className="font-serif text-4xl leading-none">4</p>
                <p className="mt-2 text-xs text-ink/70">People on the team</p>
              </div>
              <div className="rounded-card bg-butter p-5">
                <p className="font-serif text-4xl leading-none">~183</p>
                <p className="mt-2 text-xs text-ink/70">Cold emails sent, of 300 planned</p>
              </div>
              <div className="rounded-card bg-sage p-5">
                <p className="font-serif text-4xl leading-none">5</p>
                <p className="mt-2 text-xs text-ink/70">Active conversations, from about 12 replies</p>
              </div>
              <div className="rounded-card border border-line bg-white p-5">
                <p className="font-serif text-4xl leading-none">0</p>
                <p className="mt-2 text-xs text-ink/70">Paid projects won so far</p>
              </div>
            </div>
          </Reveal>

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
                Concept clip · Moove
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
                Concept clip · Dune
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
                Concept clip · Sorso / Ghaslet
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      <PlaybookShowcase />
    </main>
  );
}
