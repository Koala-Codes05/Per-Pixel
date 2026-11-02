import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConceptMark from "@/components/ConceptMark";
import ProjectLink from "@/components/ProjectLink";
import Reveal from "@/components/Reveal";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import Services from "@/components/projects/Services";
import { PROJECTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const hero = PROJECTS[2];

  return (
    <main className="pt-28" suppressHydrationWarning>
      {/* Hero */}
      <section className="mx-auto max-w-350 px-5 md:px-8">
        <Reveal variant="media">
          <div className="relative overflow-hidden rounded-card">
            <div className="relative aspect-4/5 sm:aspect-16/10 md:aspect-21/9">
              <Image
                src={hero.image}
                alt={hero.alt}
                fill
                preload
                sizes="(min-width: 1400px) 1400px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-ink/30 to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/90 md:inset-x-8 md:top-8">
              <span>Selected work, 2024–2026</span>
              <span>PerPixel</span>
            </div>
            <h1 className="absolute inset-x-6 bottom-6 max-w-[16ch] font-sans text-[clamp(2rem,5.4vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-paper md:inset-x-8 md:bottom-8">
              We build design on clarity, speed, and care.
            </h1>
            <Link
              href={PROJECTS[0].href}
              className="absolute bottom-6 right-6 hidden w-44 overflow-hidden rounded-xl bg-paper/90 p-2 backdrop-blur transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 md:block"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <p className="px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
                Latest — {PROJECTS[0].title} · Concept
              </p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Selected work */}
      <section className="mx-auto mt-20 max-w-350 px-5 md:mt-28 md:px-8">
        <Reveal>
          <h2 className="text-center font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-none tracking-[-0.01em]">
            Selected Work.
          </h2>
          <p className="mx-auto mt-4 max-w-[36ch] text-center text-sm leading-relaxed text-ink/65">
            Self-initiated concepts. Every piece on this page was made in the studio, without a client brief.
          </p>
        </Reveal>
        <ProjectsGallery />
      </section>

      {/* Studio statement */}
      <section id="services" className="services-section mx-auto mt-24 max-w-350 scroll-mt-20 px-5 md:mt-32 md:px-8" aria-labelledby="services-heading">
        <Reveal>
          <div className="services-surface">
            <div className="services-heading">
              <h2 id="services-heading">
                Design and development,<br />shaped by clarity and intent.
              </h2>
              <p>
                Every project pairs strategy with craft. We sketch in type, test in the
                browser, and let motion carry meaning — not decoration.
              </p>
            </div>
            <Services />
          </div>
        </Reveal>

        {/* Project rows */}
        <div className="mt-16">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 60}>
              <ProjectLink
                id={`details-${p.slug}`}
                href={p.href}
                className="group grid scroll-mt-24 grid-cols-12 items-center gap-4 border-t border-line py-6 last:border-b"
              >
                <span className="col-span-2 text-[11px] font-semibold tabular-nums text-ink/50 sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-none transition-transform duration-300 ease-out-expo group-hover:translate-x-2 sm:col-span-6 md:col-span-5">
                  <span>{p.title}</span>
                  <ConceptMark />
                </span>
                <span className="col-span-3 hidden text-[11px] uppercase tracking-[0.16em] text-ink/60 md:block">
                  {p.category}
                </span>
                <span className="col-span-3 text-right text-[11px] uppercase tracking-[0.16em] tabular-nums text-ink/60 sm:col-span-5 md:col-span-3 lg:col-span-2">
                  {p.year}
                </span>
                <span className="col-span-1 hidden justify-end lg:flex">
                  <span className="relative h-14 w-20 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Image src={p.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                </span>
              </ProjectLink>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
