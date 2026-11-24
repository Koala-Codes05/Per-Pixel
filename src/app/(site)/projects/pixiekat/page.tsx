import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PixieKat — Live Gaming Commerce",
  description:
    "How PerPixel designed and built PixieKat, a live gaming top-up store with a bold brand, repeatable checkout, wallet, and admin tools.",
};

const flow = [
  { number: "01", title: "Find a game", body: "Browse a catalogue of game credits, diamonds, coins, and passes." },
  { number: "02", title: "Choose a pack", body: "Enter player details and select the right top-up package." },
  { number: "03", title: "Pay and receive", body: "Pay with UPI or Pixie Wallet. Supported packs are delivered automatically." },
];

const capabilities = [
  { title: "One path across games", body: "A familiar purchase flow makes each new game easier to navigate." },
  { title: "Wallet for repeat players", body: "Players can add prepaid coins and use their balance for later top-ups." },
  { title: "A store the team can run", body: "Private admin tools manage the catalogue, orders, promotions, and site graphics." },
];

export default function PixieKatPage() {
  return (
    <main className="overflow-hidden bg-[#f5f4fc] pt-24 text-[#0e041d]" suppressHydrationWarning>
      <div className="mx-auto max-w-350 px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e041d]/55">
          <Link href="/projects" className="transition-colors hover:text-[#5724ff]">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">PixieKat</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3 pb-4 text-[11px] font-bold uppercase tracking-[0.18em]">
          <span className="rounded-full bg-[#edff66] px-4 py-2">Live project</span>
          <span>Gaming commerce · 2026</span>
        </div>
        <div className="grid gap-6 pb-10 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-12">
          <h1 className="font-sans text-[clamp(4.5rem,13vw,11rem)] font-black leading-[0.85] tracking-[-0.085em]">PixieKat<span className="text-[#5724ff]">.</span></h1>
          <p className="max-w-[38ch] pb-2 text-lg leading-relaxed md:justify-self-end md:text-xl">
            A live gaming top-up store, designed and built from brand to checkout.
          </p>
        </div>
      </div>

      <div className="bg-[#0e041d]">
        <div className="relative mx-auto aspect-[4/3] max-w-400 overflow-hidden md:aspect-[16/9]">
          <Image src="/projects/pixiekat/hero.webp" alt="PixieKat storefront hero with its wordmark, game characters, and bright top-up call to action" fill preload sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover object-left" />
        </div>
      </div>

      <section className="mx-auto grid max-w-350 gap-10 px-5 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-20 md:px-8 md:py-30" aria-labelledby="pixiekat-challenge">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5724ff]">01 / The challenge</p>
          <h2 id="pixiekat-challenge" className="font-serif text-4xl italic leading-tight md:text-6xl">Fast should still feel safe.</h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-[#0e041d]/75 md:text-xl">
          <p>Players need credits on the right account, a payment path they can trust, and a clear sign that the order went through. The store needed to make that process easy across different games.</p>
          <p>PerPixel created the visual identity and built the storefront, checkout flow, Pixie Wallet, and the tools the PixieKat team uses to manage the store.</p>
          <dl className="grid gap-5 border-t border-[#0e041d]/15 pt-7 text-sm sm:grid-cols-2">
            <div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Scope</dt><dd>Brand, storefront UX, development, admin tools</dd></div>
            <div><dt className="mb-1 font-bold uppercase tracking-[0.12em]">Status</dt><dd>Live at pixiekat.store</dd></div>
          </dl>
        </div>
      </section>

      <section className="bg-[#0e041d] px-5 py-20 text-white md:px-8 md:py-28" aria-labelledby="pixiekat-approach">
        <div className="mx-auto max-w-350">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#edff66]">02 / The approach</p>
          <h2 id="pixiekat-approach" className="max-w-[14ch] font-sans text-[clamp(2.7rem,6vw,6rem)] font-black leading-[0.98] tracking-[-0.055em]">Built for the next top-up, too.</h2>
          <div className="mt-14 grid gap-8 border-t border-white/25 pt-8 md:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item.title}>
                <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
                <p className="max-w-[34ch] leading-relaxed text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-[1.35fr_0.65fr]">
            <figure className="overflow-hidden rounded-[1.5rem] bg-[#dedaf1]">
              <div className="relative aspect-[16/10]"><Image src="/projects/pixiekat/games.webp" alt="PixieKat storefront showing its trending games grid" fill sizes="(min-width: 768px) 800px, 100vw" className="object-cover object-top" /></div>
              <figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e041d]/65">The live games catalogue</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-[1.5rem] bg-[#dedaf1]">
              <div className="relative aspect-[4/5] md:aspect-[16/10]"><Image src="/projects/pixiekat/promotions.webp" alt="PixieKat promotions page with editable campaign cards" fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover object-left-top" /></div>
              <figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e041d]/65">Promotions managed by the team</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-5 py-20 md:px-8 md:py-28" aria-labelledby="pixiekat-flow">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5724ff]">03 / The experience</p>
        <h2 id="pixiekat-flow" className="max-w-[16ch] font-serif text-4xl italic leading-tight md:text-6xl">A clear route from game to delivery.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {flow.map((step) => (
            <div key={step.number} className="rounded-[1.5rem] border border-[#0e041d]/15 bg-white p-7">
              <span className="text-xs font-bold tracking-[0.15em] text-[#5724ff]">{step.number}</span>
              <h3 className="mt-10 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-[#0e041d]/65">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <div className="relative aspect-[16/10]"><Image src="/projects/pixiekat/topup.webp" alt="PixieKat top-up page with account fields and pack selection" fill sizes="(min-width: 768px) 680px, 100vw" className="object-cover object-top" /></div>
            <figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e041d]/55">Player details and pack selection</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <div className="relative aspect-[16/10]"><Image src="/projects/pixiekat/wallet.webp" alt="PixieKat wallet top-up screen showing coin amount and UPI payment" fill sizes="(min-width: 768px) 680px, 100vw" className="object-cover object-top" /></div>
            <figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e041d]/55">Pixie Wallet for repeat purchases</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#e4e0fa] px-5 py-20 md:px-8 md:py-28" aria-labelledby="pixiekat-outcome">
        <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5724ff]">04 / In the real world</p>
            <h2 id="pixiekat-outcome" className="font-sans text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[0.98] tracking-[-0.055em]">Built. Launched. Still growing.</h2>
            <p className="mt-7 max-w-[40ch] text-lg leading-relaxed text-[#0e041d]/70">PixieKat launched version 1.0 in August 2026 and remains in active development. The live store supports UPI payments, a prepaid wallet, and automatic delivery for supported packs.</p>
            <a href="https://www.pixiekat.store/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-[#5724ff] px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5724ff]">Visit the live store ↗</a>
          </div>
          <figure className="overflow-hidden rounded-[1.5rem] bg-[#0e041d]">
            <div className="relative aspect-[16/10]"><Image src="/projects/pixiekat/leaderboard.webp" alt="PixieKat monthly leaderboard, with player details obscured" fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover object-top" /></div>
            <figcaption className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">A reason for players to return</figcaption>
          </figure>
        </div>
      </section>

      <nav aria-label="More projects" className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-4 px-5 py-12 text-sm font-semibold md:px-8">
        <Link href="/projects" className="underline underline-offset-4 hover:text-[#5724ff]">← All projects</Link>
        <Link href="/contact#form" className="underline underline-offset-4 hover:text-[#5724ff]">Have a project in mind? Let’s talk ↗</Link>
      </nav>
    </main>
  );
}
