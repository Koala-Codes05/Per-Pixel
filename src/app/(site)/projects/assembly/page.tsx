import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConceptMark from "@/components/ConceptMark";

const liveUrl = "https://assembly.perpixel.agency/";

export const metadata: Metadata = {
  title: "Assembly — A Hospitality and Events Concept",
  description:
    "A self-initiated PerPixel concept for gatherings: an editorial hospitality website, interactive culinary atelier, and a local event brief planner.",
};

const journeys = [
  {
    number: "01",
    title: "See the possibilities",
    body: "Celebrations, brand gatherings and food each have a clear route through the site. Fictional editorial studies show how a space might change for an occasion.",
    href: `${liveUrl}work/`,
    action: "Explore the studies",
  },
  {
    number: "02",
    title: "Compose the menu",
    body: "The Culinary Atelier lets visitors choose a service format and illustrative dishes, filter by course and carry selections into a shared brief.",
    href: `${liveUrl}atelier/`,
    action: "Try the Culinary Atelier",
  },
  {
    number: "03",
    title: "Assemble the brief",
    body: "A guided planner gathers the occasion, guest count, dining style and atmosphere, then produces a brief visitors can copy or download as a PDF.",
    href: `${liveUrl}planner/`,
    action: "Try the Assembly Planner",
  },
] as const;

export default function AssemblyCaseStudy() {
  return (
    <main className="overflow-hidden bg-[#eae8df] pt-24 text-[#22231f]" suppressHydrationWarning>
      <div className="mx-auto max-w-350 px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22231f]/60">
          <Link href="/projects" className="transition-colors hover:text-[#ad351c]">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Assembly</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3 pb-5 text-[11px] font-bold uppercase tracking-[0.16em]">
          <ConceptMark />
          <span>Hospitality & events · Identity & digital experience · 2026</span>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#ad351c] px-5 py-2 text-[#ad351c] transition-colors hover:bg-[#ad351c] hover:text-[#eae8df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ad351c] md:ml-auto">Visit the live concept ↗</a>
        </div>
        <div className="grid gap-7 pb-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-12">
          <h1 className="font-sans text-[clamp(3.6rem,10.8vw,10rem)] font-extrabold leading-[0.82] tracking-[-0.075em]">Assembly<span className="text-[#d45032]">.</span></h1>
          <p className="max-w-[36ch] text-lg leading-relaxed md:justify-self-end md:text-xl">Made for gathering. A hospitality world built around food, space and people.</p>
        </div>
      </div>

      <div className="bg-[#22231f]">
        <div className="relative mx-auto aspect-4/5 max-w-400 overflow-hidden sm:aspect-16/10 md:aspect-21/9">
          <Image src="/projects/assembly/installation.webp" alt="Illustrative sculptural fabric and floral installation in an imagined gathering space" fill preload sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover object-center" />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#22231f]/75 via-transparent to-transparent px-5 pb-6 pt-24 text-[#f7f3e8] md:px-8 md:pb-8"><span className="text-[11px] font-semibold uppercase tracking-[0.2em]">A fictional hospitality concept by PerPixel</span></div>
        </div>
      </div>

      <section className="mx-auto grid max-w-350 gap-10 px-5 py-20 md:grid-cols-[0.72fr_1.28fr] md:gap-20 md:px-8 md:py-28" aria-labelledby="assembly-premise">
        <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ad351c]">01 / The premise</p><h2 id="assembly-premise" className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">An occasion is a composition.</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-[#22231f]/75 md:text-xl">
          <p>Assembly is a self-initiated, fictional hospitality and events studio. PerPixel imagined how a brand could bring food, architecture, atmosphere and service together around the people in the room.</p>
          <p>The website needed to express that idea while giving visitors something useful to do: explore gathering formats, build a menu direction and leave with an illustrative event brief.</p>
          <dl className="grid gap-5 border-t border-[#22231f]/20 pt-7 text-sm sm:grid-cols-2"><div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Scope</dt><dd>Art direction, identity, website, interactive menu and planner</dd></div><div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Status</dt><dd>Live concept demo · No operating events studio</dd></div></dl>
        </div>
      </section>

      <section className="bg-[#22231f] px-5 py-20 text-[#eae8df] md:px-8 md:py-28" aria-labelledby="assembly-visual">
        <div className="mx-auto max-w-350">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#e68c6c]">02 / The visual language</p>
          <h2 id="assembly-visual" className="max-w-[17ch] font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.93] tracking-[-0.05em]">Space for people. <em>Shape for ideas.</em></h2>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-[#eae8df]/75">Oversized type, warm paper, dark ink and a sharp terracotta accent give the site an editorial voice. A geometric motif reduces a gathering to its parts: places, connections and the shared centre.</p>
          <div className="mt-14 grid gap-5 md:grid-cols-[1.35fr_0.65fr]">
            <figure className="overflow-hidden rounded-card bg-[#b9bda4]"><div className="relative aspect-4/3 md:aspect-16/10"><Image src="/projects/assembly/gathering.webp" alt="Illustrative long dining table beneath an open timber structure" fill sizes="(min-width: 768px) 800px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#22231f]">One table, one shared centre</figcaption></figure>
            <figure className="overflow-hidden rounded-card bg-[#b9bda4]"><div className="relative aspect-4/3 md:aspect-16/10"><Image src="/projects/assembly/geometry.svg" alt="Assembly's geometric illustration of people and place" fill sizes="(min-width: 768px) 430px, 100vw" className="object-contain p-8" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#22231f]">The geometry of gathering</figcaption></figure>
          </div>
          <div className="mt-10 flex flex-wrap gap-3" aria-label="Assembly colour palette"><span className="rounded-full bg-[#eae8df] px-4 py-2 text-xs font-bold text-[#22231f]">Paper</span><span className="rounded-full bg-[#b9bda4] px-4 py-2 text-xs font-bold text-[#22231f]">Sage</span><span className="rounded-full bg-[#d45032] px-4 py-2 text-xs font-bold text-[#22231f]">Terracotta</span><span className="rounded-full border border-[#eae8df]/40 bg-[#22231f] px-4 py-2 text-xs font-bold">Ink</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-5 py-20 md:px-8 md:py-28" aria-labelledby="assembly-experience">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ad351c]">03 / The experience</p>
        <h2 id="assembly-experience" className="max-w-[18ch] font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">From inspiration to a useful brief.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{journeys.map((item) => <article className="flex flex-col rounded-card border border-[#22231f]/15 bg-[#f7f3e8] p-7" key={item.number}><span className="text-xs font-bold tracking-[0.15em] text-[#ad351c]">{item.number}</span><h3 className="mt-10 font-serif text-3xl leading-none">{item.title}</h3><p className="mt-4 grow text-sm leading-relaxed text-[#22231f]/70">{item.body}</p><a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-3 border-t border-[#22231f]/20 pt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#ad351c] hover:underline">{item.action} ↗</a></article>)}</div>
        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[#22231f]/60">The work and dishes are illustrative. Menu tags do not establish allergy safety, and the planner does not send a booking, quote or enquiry.</p>
      </section>

      <section className="bg-[#b9bda4] px-5 py-20 md:px-8 md:py-28" aria-labelledby="assembly-outcome">
        <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20">
          <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#87331e]">04 / In the world</p><h2 id="assembly-outcome" className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">A working concept, open to explore.</h2><p className="mt-6 max-w-[43ch] text-lg leading-relaxed text-[#22231f]/75">Assembly is live as an interactive brand and website demonstration. Visitors can move from editorial stories to menu choices, then export a sample brief they can use as a starting point for a conversation.</p><p className="mt-5 max-w-[43ch] text-sm leading-relaxed text-[#22231f]/65">Assembly is fictional. Its projects and imagery are illustrative, and no real event service, booking or enquiry is offered through the demo.</p><a href={liveUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#22231f] px-7 py-4 text-sm font-bold text-[#eae8df] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22231f]">Visit the live concept ↗</a></div>
          <figure className="overflow-hidden rounded-card bg-[#eae8df]"><div className="relative aspect-4/3"><Image src="/projects/assembly/room.svg" alt="Illustrated room used in Assembly's before and after space comparison" fill sizes="(min-width: 768px) 600px, 100vw" className="object-contain p-6 md:p-12" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#22231f]/70">A room before its imagined transformation</figcaption></figure>
        </div>
      </section>

      <nav aria-label="More projects" className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-4 px-5 py-12 text-sm font-semibold md:px-8"><Link href="/projects" className="underline underline-offset-4 hover:text-[#ad351c]">← All projects</Link><Link href="/contact#form" className="underline underline-offset-4 hover:text-[#ad351c]">Have a project in mind? Let’s talk ↗</Link></nav>
    </main>
  );
}
