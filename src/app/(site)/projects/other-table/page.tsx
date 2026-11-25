import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConceptMark from "@/components/ConceptMark";

const liveUrl = "https://ot.perpixel.agency/";

export const metadata: Metadata = {
  title: "Other Table — Restaurant Concept & Digital Experience",
  description:
    "A self-initiated hospitality concept by PerPixel: an editorial restaurant identity, useful guest journeys, a live demo, and a clearly labelled synthetic redesign audit.",
};

const journeys = [
  { number: "01", title: "See what is on the table", body: "An HTML menu makes dishes, descriptions, sample prices and dietary labels easy to scan on a phone.", href: `${liveUrl}menu`, action: "Explore the menu" },
  { number: "02", title: "Find a seat", body: "A short, clearly simulated reservation journey shows the details a guest needs before committing to a night out.", href: `${liveUrl}reserve`, action: "Try the reservation demo" },
  { number: "03", title: "Bring more people", body: "Gatherings have their own path, with formats and an enquiry preview for celebrations and small groups.", href: `${liveUrl}gatherings`, action: "See gatherings" },
] as const;

const audit = [
  { number: "01", issue: "An image-only menu", consequence: "Dishes and prices are hard to scan, search or read with assistive technology.", response: "Structured HTML dishes with visible prices, descriptions and dietary labels." },
  { number: "02", issue: "A buried reservation link", consequence: "A guest who is ready to book has to search for the next step.", response: "Reserve remains prominent in the desktop header and mobile quick actions." },
  { number: "03", issue: "Missing mobile visit details", consequence: "Hours, access and contact information become harder to find while planning a visit.", response: "A dedicated Visit page makes the expected practical information easy to locate." },
] as const;

export default function OtherTableCaseStudy() {
  return (
    <main className="overflow-hidden bg-[#f1eadf] pt-24 text-[#27231f]" suppressHydrationWarning>
      <div className="mx-auto max-w-350 px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#27231f]/60">
          <Link href="/projects" className="transition-colors hover:text-[#762d37]">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Other Table</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3 pb-5 text-[11px] font-bold uppercase tracking-[0.16em]">
          <ConceptMark />
          <span>Hospitality · Brand & digital product · 2026</span>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#762d37] px-5 py-2 text-[#762d37] transition-colors hover:bg-[#762d37] hover:text-[#f1eadf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#762d37] md:ml-auto">Visit the live concept ↗</a>
        </div>
        <div className="grid gap-7 pb-12 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-12">
          <h1 className="font-serif text-[clamp(4.2rem,11.5vw,11rem)] leading-[0.83] tracking-[-0.07em]">Other<br /><em className="text-[#762d37]">Table.</em></h1>
          <p className="max-w-[37ch] text-lg leading-relaxed md:justify-self-end md:text-xl">A place for the first glass, the extra plate, and the conversations that run past dessert.</p>
        </div>
      </div>

      <div className="bg-[#3d1c27]">
        <div className="relative mx-auto aspect-4/5 max-w-400 overflow-hidden sm:aspect-16/10 md:aspect-21/9">
          <Image src="/works/other-table/table.webp" alt="Friends passing plates around the imagined Other Table" fill preload sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
          <div className="absolute bottom-5 left-5 rounded-full bg-[#f1eadf] p-2 shadow-xl md:bottom-8 md:left-8"><Image src="/works/other-table/seat-seal.svg" alt="" width={100} height={100} className="h-17 w-17 md:h-25 md:w-25" /></div>
        </div>
      </div>

      <section className="mx-auto grid max-w-350 gap-10 px-5 py-20 md:grid-cols-[0.72fr_1.28fr] md:gap-20 md:px-8 md:py-28" aria-labelledby="ot-brief">
        <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#762d37]">01 / The brief</p><h2 id="ot-brief" className="font-serif text-[clamp(2.9rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">Dinner is a conversation.</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-[#27231f]/75 md:text-xl">
          <p>Other Table is a self-initiated restaurant concept. PerPixel imagined a neighbourhood place where ingredient-led plates and the pleasure of gathering shape both the identity and the website.</p>
          <p>The digital brief had two equal demands: make the restaurant feel particular, and help a guest decide what to order, how to book, and whether the room fits their occasion.</p>
          <dl className="grid gap-5 border-t border-[#27231f]/20 pt-7 text-sm sm:grid-cols-2"><div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Scope</dt><dd>Art direction, identity, website, guest journeys</dd></div><div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Status</dt><dd>Live concept demo · No operating restaurant</dd></div></dl>
        </div>
      </section>

      <section className="bg-[#3d1c27] px-5 py-20 text-[#f1eadf] md:px-8 md:py-28" aria-labelledby="ot-design">
        <div className="mx-auto max-w-350">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d9a79f]">02 / The visual world</p>
          <h2 id="ot-design" className="max-w-[17ch] font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.93] tracking-[-0.05em]">A dinner invitation <em>with its own character.</em></h2>
          <p className="mt-7 max-w-[55ch] text-lg leading-relaxed text-[#f1eadf]/75">Warm paper, oxblood and olive set the tone. A characterful serif carries the invitation; practical text and clear actions help the guest. Original table photography, a printed seal and drawn details give the site its own visual language.</p>
          <div className="mt-14 grid gap-5 md:grid-cols-[1.35fr_0.65fr]">
            <figure className="overflow-hidden rounded-card bg-[#251518]"><div className="relative aspect-4/3 md:aspect-16/10"><Image src="/works/other-table/room.webp" alt="Warm restaurant room with an oxblood banquette" fill sizes="(min-width: 768px) 800px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f1eadf]/70">The room · warm, lived in, unhurried</figcaption></figure>
            <figure className="overflow-hidden rounded-card bg-[#251518]"><div className="relative aspect-4/3 md:aspect-16/10"><Image src="/works/other-table/aubergine.webp" alt="A shared plate of charred aubergine, labneh and herbs" fill sizes="(min-width: 768px) 430px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f1eadf]/70">The food · specific dishes before abstractions</figcaption></figure>
          </div>
          <div className="mt-10 flex flex-wrap gap-3" aria-label="Other Table colour palette"><span className="rounded-full bg-[#f1eadf] px-4 py-2 text-xs font-bold text-[#27231f]">Warm paper</span><span className="rounded-full bg-[#762d37] px-4 py-2 text-xs font-bold">Oxblood</span><span className="rounded-full bg-[#646a4e] px-4 py-2 text-xs font-bold">Olive</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-5 py-20 md:px-8 md:py-28" aria-labelledby="ot-journeys">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#762d37]">03 / The guest experience</p>
        <h2 id="ot-journeys" className="max-w-[18ch] font-serif text-[clamp(2.9rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">Beautiful enough to remember. Clear enough to use.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{journeys.map((item) => <article className="flex flex-col rounded-card border border-[#27231f]/15 bg-[#f8f3e9] p-7" key={item.number}><span className="text-xs font-bold tracking-[0.15em] text-[#762d37]">{item.number}</span><h3 className="mt-10 font-serif text-3xl leading-none">{item.title}</h3><p className="mt-4 grow text-sm leading-relaxed text-[#27231f]/70">{item.body}</p><a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-3 border-t border-[#27231f]/20 pt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#762d37] hover:underline">{item.action} ↗</a></article>)}</div>
        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[#27231f]/60">Menu prices, service details, time slots and capacities are illustrative. The reservation and enquiry journeys do not collect personal data or connect to a real venue.</p>
      </section>

      <section className="bg-[#d8d1c3] px-5 py-20 md:px-8 md:py-28" aria-labelledby="ot-audit">
        <div className="mx-auto max-w-350">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end"><div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#762d37]">04 / A redesign exercise</p><h2 id="ot-audit" className="font-serif text-[clamp(2.9rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">What would we repair?</h2></div><p className="max-w-[52ch] text-base leading-relaxed text-[#27231f]/70">This “before” is a synthetic legacy-site example made for the case study. It is not a captured client website, and it carries no measured conversion claim.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2"><div className="overflow-hidden rounded-card border border-[#27231f]/15 bg-[#aaa39a]"><div className="flex justify-between gap-4 bg-[#bcb7af] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em]"><span>Before · synthetic</span><span>Legacy pattern</span></div><div className="flex aspect-4/3 flex-col justify-between bg-[#6e685f] p-7 text-white"><span className="text-xs uppercase tracking-widest">Restaurant name</span><div><p className="text-[clamp(2.7rem,5vw,5rem)] font-bold leading-none">WELCOME.</p><p className="mt-4 max-w-[33ch] text-sm">An oversized hero with no dish, price or clear next step.</p></div><span className="text-xs">Menu.JPG · Booking link in footer</span></div></div><div className="overflow-hidden rounded-card border border-[#27231f]/15 bg-[#f1eadf]"><div className="flex justify-between gap-4 bg-[#762d37] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f1eadf]"><span>After · Other Table</span><span>Useful first</span></div><div className="relative aspect-4/3"><Image src="/works/other-table/table.webp" alt="Dinner table photograph used for the Other Table concept" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-7 text-white"><p className="font-serif text-[clamp(2rem,4vw,4rem)] leading-none">Good things happen around a table.</p><p className="mt-4 text-xs">Menu with prices · Reserve in reach · Visit details</p></div></div></div></div>
          <div className="mt-12 divide-y divide-[#27231f]/20 border-y border-[#27231f]/20">{audit.map((item) => <div className="grid gap-4 py-7 md:grid-cols-[55px_1fr_1fr_1fr]" key={item.number}><span className="text-xs font-bold">{item.number}</span><h3 className="font-serif text-3xl leading-none">{item.issue}</h3><p className="text-sm leading-relaxed text-[#27231f]/65">{item.consequence}</p><p className="text-sm leading-relaxed"><strong>Design response:</strong> {item.response}</p></div>)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-350 gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20 md:px-8 md:py-28" aria-labelledby="ot-outcome">
        <div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#762d37]">05 / In the world</p><h2 id="ot-outcome" className="font-serif text-[clamp(2.9rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">A live concept. An open invitation.</h2><p className="mt-6 max-w-[43ch] text-lg leading-relaxed text-[#27231f]/70">Other Table is online as a working hospitality demonstration. It shows the kind of expressive, practical site PerPixel can create for an operator, or the targeted improvements we could make to a site they already have.</p><p className="mt-5 max-w-[43ch] text-sm leading-relaxed text-[#27231f]/60">The restaurant, menu, hours and bookings are fictional. There are no guest interviews, live reservation outcomes or conversion measurements to report.</p><a href={liveUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#762d37] px-7 py-4 text-sm font-bold text-[#f1eadf] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#762d37]">Visit the live concept ↗</a></div>
        <figure className="overflow-hidden rounded-card bg-[#3d1c27]"><div className="relative aspect-4/5 sm:aspect-16/10 md:aspect-4/5"><Image src="/works/other-table/aubergine.webp" alt="Charred aubergine with labneh, tomatoes and herbs from the illustrative menu" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f1eadf]/70">Order another plate. Stay a little longer.</figcaption></figure>
      </section>

      <nav aria-label="More projects" className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-4 border-t border-[#27231f]/20 px-5 py-12 text-sm font-semibold md:px-8"><Link href="/projects" className="underline underline-offset-4 hover:text-[#762d37]">← All projects</Link><Link href="/contact#form" className="underline underline-offset-4 hover:text-[#762d37]">Have a hospitality project? Let’s talk ↗</Link></nav>
    </main>
  );
}
