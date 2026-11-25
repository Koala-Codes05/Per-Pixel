import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConceptMark from "@/components/ConceptMark";

const liveUrl = "https://auriel.perpixel.agency/";

export const metadata: Metadata = {
  title: "Auriel — A Hospitality Concept for Slower Stays",
  description:
    "A self-initiated PerPixel hospitality concept: an editorial identity for an imagined Aravalli retreat, an interactive property atlas, and a transparent stay-planning demo.",
};

const experiences = [
  { number: "01", title: "Explore the place", body: "An illustrated property atlas gives six imagined spaces a clear role, with selectable locations and an equivalent list for smaller screens.", href: `${liveUrl}atlas`, action: "Open the property atlas" },
  { number: "02", title: "Follow the day", body: "A six-chapter selector moves from a sunrise walk to a quiet courtyard at night. Each moment leads to a relevant part of the site.", href: liveUrl, action: "See a day at Auriel" },
  { number: "03", title: "Curate a stay", body: "Guests can choose dates and people, compare rooms, add experiences, and review a calculated sample total before creating a demo itinerary.", href: `${liveUrl}reserve`, action: "Try the stay planner" },
] as const;

export default function AurielCaseStudy() {
  return (
    <main className="overflow-hidden bg-[#e9e2d3] pt-24 text-[#292620]" suppressHydrationWarning>
      <div className="mx-auto max-w-350 px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#292620]/60">
          <Link href="/projects" className="transition-colors hover:text-[#945f43]">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Auriel</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3 pb-5 text-[11px] font-bold uppercase tracking-[0.16em]">
          <ConceptMark />
          <span>Hospitality · Identity & digital product · 2026</span>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#454a38] px-5 py-2 text-[#454a38] transition-colors hover:bg-[#454a38] hover:text-[#e9e2d3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#454a38] md:ml-auto">Visit the live concept ↗</a>
        </div>
        <div className="grid gap-7 pb-12 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-12">
          <h1 className="font-serif text-[clamp(5.3rem,13vw,12rem)] leading-[0.8] tracking-[-0.07em]">Auriel<span className="text-[#945f43]">.</span></h1>
          <p className="max-w-[37ch] text-lg leading-relaxed md:justify-self-end md:text-xl">The art of being elsewhere. A quieter way to arrive, and a clearer way to plan a stay.</p>
        </div>
      </div>

      <div className="bg-[#454a38]">
        <div className="relative mx-auto aspect-4/5 max-w-400 overflow-hidden sm:aspect-16/10 md:aspect-21/9">
          <Image src="/works/auriel/courtyard.webp" alt="Original illustration of Auriel's imagined limewashed courtyard and Aravalli landscape" fill preload sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#292620]/70 via-transparent to-transparent px-5 pb-6 pt-24 text-[#f5efe3] md:px-8 md:pb-8"><span className="text-[11px] font-semibold uppercase tracking-[0.2em]">An imagined retreat in the Aravalli foothills</span></div>
        </div>
      </div>

      <section className="mx-auto grid max-w-350 gap-10 px-5 py-20 md:grid-cols-[0.72fr_1.28fr] md:gap-20 md:px-8 md:py-28" aria-labelledby="auriel-brief">
        <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#945f43]">01 / The proposition</p><h2 id="auriel-brief" className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">A retreat built around the hours.</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-[#292620]/75 md:text-xl">
          <p>Auriel is a self-initiated concept for a 24-key heritage retreat near Udaipur. PerPixel imagined a place where architecture, regional food and attentive experiences invite a slower pace.</p>
          <p>The digital challenge was to hold that atmosphere while helping a guest compare rooms, understand what a stay includes and see the full cost of an illustrative itinerary.</p>
          <dl className="grid gap-5 border-t border-[#292620]/20 pt-7 text-sm sm:grid-cols-2"><div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Scope</dt><dd>Art direction, identity, website, property atlas, stay planner</dd></div><div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Status</dt><dd>Live concept demo · No operating property</dd></div></dl>
        </div>
      </section>

      <section className="bg-[#454a38] px-5 py-20 text-[#f4ede0] md:px-8 md:py-28" aria-labelledby="auriel-visual">
        <div className="mx-auto max-w-350">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#e0c9ad]">02 / The visual world</p>
          <h2 id="auriel-visual" className="max-w-[17ch] font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.93] tracking-[-0.05em]">A quieter kind <em>of presence.</em></h2>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-[#f4ede0]/75">Limewash, sandstone and dark teak give Auriel its material vocabulary. Spacious typography and fine rules leave room for the images: original imagined scenes of an arched suite, a craft courtyard and a long dinner.</p>
          <div className="mt-14 grid gap-5 md:grid-cols-[1.35fr_0.65fr]">
            <figure className="overflow-hidden rounded-card bg-[#292620]"><div className="relative aspect-4/3 md:aspect-16/10"><Image src="/works/auriel/suite.webp" alt="Original illustration of an imagined Auriel suite with an arched hillside window" fill sizes="(min-width: 768px) 800px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4ede0]/70">The room · light and shelter</figcaption></figure>
            <figure className="overflow-hidden rounded-card bg-[#292620]"><div className="relative aspect-4/3 md:aspect-16/10"><Image src="/works/auriel/craft.webp" alt="Original illustration of hand-block printing in Auriel's imagined craft courtyard" fill sizes="(min-width: 768px) 430px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4ede0]/70">The encounter · material and making</figcaption></figure>
          </div>
          <figure className="mt-5 overflow-hidden rounded-card bg-[#292620]"><div className="relative aspect-4/3 sm:aspect-21/9"><Image src="/works/auriel/dining.webp" alt="Original illustration of a shared seasonal dinner in Auriel's imagined pavilion" fill sizes="(min-width: 1400px) 1400px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4ede0]/70">The table · an evening with room to linger</figcaption></figure>
          <div className="mt-10 flex flex-wrap gap-3" aria-label="Auriel colour palette"><span className="rounded-full bg-[#e9e2d3] px-4 py-2 text-xs font-bold text-[#292620]">Limewash</span><span className="rounded-full bg-[#c3a47e] px-4 py-2 text-xs font-bold text-[#292620]">Sandstone</span><span className="rounded-full bg-[#945f43] px-4 py-2 text-xs font-bold">Terracotta</span><span className="rounded-full border border-[#e9e2d3]/40 bg-[#454a38] px-4 py-2 text-xs font-bold">Olive</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-5 py-20 md:px-8 md:py-28" aria-labelledby="auriel-experience">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#945f43]">03 / Three ways in</p>
        <h2 id="auriel-experience" className="max-w-[18ch] font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">Explore, imagine, decide.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{experiences.map((item) => <article className="flex flex-col rounded-card border border-[#292620]/15 bg-[#f5efe4] p-7" key={item.number}><span className="text-xs font-bold tracking-[0.15em] text-[#945f43]">{item.number}</span><h3 className="mt-10 font-serif text-3xl leading-none">{item.title}</h3><p className="mt-4 grow text-sm leading-relaxed text-[#292620]/70">{item.body}</p><a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-3 border-t border-[#292620]/20 pt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#454a38] hover:underline">{item.action} ↗</a></article>)}</div>
        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[#292620]/60">Every location, schedule, room and rate is part of the fictional demonstration. The atlas is a schematic, not a surveyed plan.</p>
      </section>

      <section className="bg-[#d4c7b2] px-5 py-20 md:px-8 md:py-28" aria-labelledby="auriel-product">
        <div className="mx-auto max-w-350">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end"><div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#945f43]">04 / Useful by design</p><h2 id="auriel-product" className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">The invitation has a next step.</h2></div><p className="max-w-[50ch] text-base leading-relaxed text-[#292620]/75">The atlas makes the imagined property legible. The planner turns room choices and optional moments into an itemised sample total, with validation for dates, party size and a fixed sold-out example.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
            <figure className="overflow-hidden rounded-card bg-[#e9e2d3]"><div className="relative aspect-4/3"><Image src="/works/auriel/atlas.webp" alt="Capture of the Auriel property atlas with illustrated locations and a detail panel" fill sizes="(min-width: 768px) 760px, 100vw" className="object-cover object-left-top" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#292620]/70">An interactive schematic with matching location list</figcaption></figure>
            <figure className="overflow-hidden rounded-card bg-[#e9e2d3]"><div className="relative aspect-4/3"><Image src="/works/auriel/reserve-mobile.webp" alt="Capture of the Auriel mobile stay planner with date and guest controls" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-[center_40%]" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#292620]/70">A guided planner on a mobile screen</figcaption></figure>
          </div>
          <div className="mt-12 grid gap-8 border-t border-[#292620]/20 pt-8 md:grid-cols-[1fr_1fr_1fr]"><div><span className="text-xs font-bold text-[#945f43]">01 / Compare</span><h3 className="mt-5 font-serif text-3xl">Three room types</h3><p className="mt-3 text-sm leading-relaxed text-[#292620]/70">Area, occupancy, beds, inclusions and illustrative nightly rates sit together for comparison.</p></div><div><span className="text-xs font-bold text-[#945f43]">02 / Compose</span><h3 className="mt-5 font-serif text-3xl">A stay with moments</h3><p className="mt-3 text-sm leading-relaxed text-[#292620]/70">The guided flow adds a walk, craft session or dinner and keeps dates and choices editable.</p></div><div><span className="text-xs font-bold text-[#945f43]">03 / Review</span><h3 className="mt-5 font-serif text-3xl">A transparent total</h3><p className="mt-3 text-sm leading-relaxed text-[#292620]/70">The local calculation shows nights, room cost and per-person add-ons. The confirmation states that nothing was reserved or charged.</p></div></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-350 gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20 md:px-8 md:py-28" aria-labelledby="auriel-outcome">
        <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#945f43]">05 / In the world</p><h2 id="auriel-outcome" className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">A working retreat concept.</h2><p className="mt-6 max-w-[43ch] text-lg leading-relaxed text-[#292620]/70">Auriel is live as a hospitality design and product demonstration. The independent Next.js application pairs an expressive identity with room details, editorial stories, a property atlas and a guided stay planner.</p><p className="mt-5 max-w-[43ch] text-sm leading-relaxed text-[#292620]/60">The hotel and its imagery are imagined. All inventory, rates and activities are illustrative. The planner collects no personal details and makes no real reservation or payment. There are no guest or conversion results to report.</p><a href={liveUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#454a38] px-7 py-4 text-sm font-bold text-[#f4ede0] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#454a38]">Visit the live concept ↗</a></div>
        <figure className="overflow-hidden rounded-card bg-[#454a38]"><div className="relative aspect-4/5 sm:aspect-16/10 md:aspect-4/5"><Image src="/works/auriel/pavilion.webp" alt="Original illustration of Auriel's imagined Pavilion Residence opening toward the hills" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4ede0]/70">A place to settle into the landscape</figcaption></figure>
      </section>

      <nav aria-label="More projects" className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-4 border-t border-[#292620]/20 px-5 py-12 text-sm font-semibold md:px-8"><Link href="/projects" className="underline underline-offset-4 hover:text-[#945f43]">← All projects</Link><Link href="/contact#form" className="underline underline-offset-4 hover:text-[#945f43]">Have a hospitality project? Let’s talk ↗</Link></nav>
    </main>
  );
}
