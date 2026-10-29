import Link from "next/link";
import { ArrowUpRight } from "@/components/home/Bento";
import Reveal from "@/components/Reveal";
import { OFFERS } from "@/lib/offers";

export default function Offers() {
  return (
    <section id="offers" className="home-offers" aria-labelledby="home-offers-title">
      <div className="home-offers-inner">
        <Reveal>
          <div className="home-offers-head">
            <div>
              <p className="home-offers-kicker">Offers</p>
              <h2 id="home-offers-title" className="home-offers-title">
                Three ways
                <br />
                to <em>begin.</em>
              </h2>
            </div>
            <p className="home-offers-lede">
              Starting floors for funded seed-to-Series A teams. A sprint, a system, or a monthly seat. Scope is agreed before anything is signed.
            </p>
          </div>
        </Reveal>

        <div className="offer-sheet">
          {OFFERS.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 50} className={offer.core ? "offer-row is-core" : "offer-row"}>
              <span className="offer-index">{offer.index}</span>
              <div>
                <h3 className="offer-name">{offer.name}</h3>
                <p className="offer-duration">{offer.duration}</p>
              </div>
              <p className="offer-summary">{offer.summary}</p>
              <div className="offer-aside">
                <p className="offer-price">
                  <span>from</span>
                  {offer.price}
                  {offer.unit ? <small>{offer.unit}</small> : null}
                </p>
                <Link href="/contact" className="offer-cta">
                  Start a project
                  <ArrowUpRight />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="home-offers-more">
            <Link href="/offers">
              Read the three offers
              <ArrowUpRight />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
