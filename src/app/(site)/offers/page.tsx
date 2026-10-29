import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/home/Bento";
import Reveal from "@/components/Reveal";
import { OFFERS } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Three PerPixel engagements for funded seed-to-Series A teams: a 10-day launch sprint from ₹75k, a brand and web system from ₹2.5L, and a motion and editorial retainer from ₹40k a month.",
};

export default function OffersPage() {
  return (
    <main className="offers-page" suppressHydrationWarning>
      <header className="offers-intro">
        <Reveal>
          <p className="home-offers-kicker">Offers</p>
          <h1 className="offers-title">
            What it costs <em>to begin.</em>
          </h1>
        </Reveal>
        <Reveal delay={60} className="offers-intro-copy">
          <p>
            PerPixel works with funded seed-to-Series A founders who need the public face to catch up with the product. Three ways in. Each one has a starting price in INR and a scope we write down before kickoff.
          </p>
          <p>
            Travel, paid media, and third-party tools sit outside the fee. If the work falls between these, write anyway.
          </p>
        </Reveal>
      </header>

      {OFFERS.map((offer) => (
        <section
          key={offer.id}
          id={offer.id}
          className={`offer-band offer-band--${offer.surface}`}
          aria-labelledby={`offer-${offer.id}`}
        >
          <p className="offer-band-index" aria-hidden="true">{offer.index}</p>
          <Reveal className="offer-band-copy">
            <p className="offer-duration">{offer.duration}</p>
            <h2 id={`offer-${offer.id}`}>{offer.name}</h2>
            <p className="offer-detail">{offer.detail}</p>
            <ul className="offer-includes">
              {offer.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="offer-band-aside">
            <p className="offer-price offer-price--display">
              <span>from</span>
              {offer.price}
              {offer.unit ? <small>{offer.unit}</small> : null}
            </p>
            <Link href="/contact" className="home-contact-link offer-band-cta">
              Start a project
              <span className="home-contact-icon"><ArrowUpRight /></span>
            </Link>
          </Reveal>
        </section>
      ))}

      <section className="offers-close" aria-labelledby="offers-close-title">
        <Reveal>
          <h2 id="offers-close-title">
            Bring the brief
            <br />
            <em>as it is.</em>
          </h2>
          <p>A few lines on the product, the timing, and what the site has to do is enough to start.</p>
          <Link href="/contact" className="home-contact-link offer-band-cta">
            Start a project
            <span className="home-contact-icon"><ArrowUpRight /></span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
