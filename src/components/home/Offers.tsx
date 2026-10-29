import Link from "next/link";
import { ArrowUpRight } from "@/components/home/Bento";
import OfferScene from "@/components/home/OfferScene";
import { OFFERS } from "@/lib/offers";

export default function Offers() {
  return (
    <OfferScene
      id="offers"
      count={OFFERS.length}
      labelId="home-offers-title"
      className="home-offer-scene"
      header={
        <div className="offer-scene-chrome">
          <div>
            <p className="home-offers-kicker">Offers</p>
            <h2 id="home-offers-title" className="offer-scene-title">
              Three ways to <em>begin.</em>
            </h2>
          </div>
          <p className="home-offers-lede">
            Starting floors for funded seed-to-Series A teams. A sprint, a system, or a monthly seat. Scope is agreed before anything is signed.
          </p>
          <Link href="/offers" className="offer-scene-more">
            Read the three offers
            <ArrowUpRight />
          </Link>
        </div>
      }
    >
      {OFFERS.map((offer, index) => (
        <article
          key={offer.id}
          id={offer.id}
          className={`offer-frame offer-frame--home offer-frame--${offer.surface}`}
          data-index={index}
        >
          <div className="offer-frame-body">
            <p className="offer-frame-index" aria-hidden="true">{offer.index}</p>
            <div className="offer-frame-content">
              <div>
                <h3 className="offer-frame-name">{offer.name}</h3>
                <p className="offer-duration">{offer.duration}</p>
                <p className="offer-summary">{offer.summary}</p>
              </div>
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
            </div>
          </div>
        </article>
      ))}
    </OfferScene>
  );
}
