import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <section className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal variant="media">
          <div className="relative overflow-hidden rounded-card">
            <div className="relative aspect-[16/10] md:aspect-[21/9]">
              <Image
                src={hero.image}
                alt={hero.alt}
                fill
                preload
                sizes="(min-width: 1400px) 1400px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/90 md:inset-x-8 md:top-8">
              <span>Selected work, 2024–2026</span>
              <span>PerPixel</span>
            </div>
            <h1 className="absolute inset-x-6 bottom-6 max-w-[16ch] font-sans text-[clamp(2rem,5.4vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-paper md:inset-x-8 md:bottom-8">
              We build design on clarity, speed, and care.
            </h1>
            <Link
              href={PROJECTS[0].href ?? "#moove"}
              className="absolute bottom-6 right-6 hidden w-44 overflow-hidden rounded-xl bg-paper/90 p-2 backdrop-blur transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 md:block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <p className="px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
                Latest — {PROJECTS[0].title}
              </p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Selected work */}
      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-8">
        <Reveal>
          <h2 className="text-center font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-none tracking-[-0.01em]">
            Selected Work.
          </h2>
        </Reveal>
        <ProjectsGallery />
      </section>

      {/* Studio statement */}
      <section id="services" className="services-section mx-auto mt-24 max-w-[1400px] scroll-mt-20 px-5 md:mt-32 md:px-8" aria-labelledby="services-heading">
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
              <Link
                id={`details-${p.slug}`}
                href={p.href ?? `#${p.slug}`}
                className="group grid scroll-mt-24 grid-cols-12 items-center gap-4 border-t border-line py-6 last:border-b"
              >
                <span className="col-span-1 text-[11px] font-semibold tabular-nums text-ink/50">
                  0{i + 1}
                </span>
                <span className="col-span-6 flex items-baseline gap-3 font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-none transition-transform duration-300 ease-out-expo group-hover:translate-x-2 md:col-span-5">
                  <span>{p.title}</span>
                  {p.href && (
                    <span className="rounded-full bg-blush px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                      Brand site
                    </span>
                  )}
                </span>
                <span className="col-span-3 hidden text-[11px] uppercase tracking-[0.16em] text-ink/60 md:block">
                  {p.category}
                </span>
                <span className="col-span-3 text-right text-[11px] uppercase tracking-[0.16em] tabular-nums text-ink/60 md:col-span-2">
                  {p.year}
                </span>
                <span className="col-span-2 flex justify-end md:col-span-1">
                  <span className="relative hidden h-14 w-20 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
                    <Image src={p.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
