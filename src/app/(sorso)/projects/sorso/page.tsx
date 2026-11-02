import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BottleDefs, SorsoBottle } from "@/components/projects/SorsoBottle";
import SorsoFlavours from "@/components/projects/SorsoFlavours";
import { SorsoCaseButton, SorsoMoments } from "@/components/projects/SorsoShowcase";

export const metadata: Metadata = {
  title: "Sorso — Bitter Aperitivo Soda, Zero Proof",
  description:
    "Sorso is a bitter aperitivo soda made with blood orange and gentian root. 0.0% alcohol, built for the hour between work and dinner — a PerPixel brand world.",
};

const TAG_ROWS = [
  [
    ["#D42C0C", "#FFF3EA", "0.0% alcohol"],
    ["#2B0B10", "#FFF3EA", "Sicilian blood orange"],
    ["#FFF3EA", "#2B0B10", "Gentian root"],
    ["#FFD23F", "#2B0B10", "Lightly sparkling"],
    ["#FF6F5E", "#2B0B10", "Rhubarb"],
    ["#E6E3FF", "#B8260A", "Pink grapefruit"],
    ["#FFF3EA", "#2B0B10", "Rosemary"],
    ["#2B0B10", "#FFF3EA", "Ligurian chinotto"],
  ],
  [
    ["#FFF3EA", "#2B0B10", "5 g sugar per bottle"],
    ["#E6E3FF", "#B8260A", "No artificial colour"],
    ["#D42C0C", "#FFF3EA", "Bay leaf"],
    ["#FFD23F", "#2B0B10", "Cocoa husk"],
    ["#2B0B10", "#FFF3EA", "Vegan"],
    ["#FF6F5E", "#2B0B10", "Pink pepper"],
    ["#FFF3EA", "#2B0B10", "Bitter orange peel"],
    ["#D42C0C", "#FFF3EA", "Best over ice"],
  ],
] as const;

const STEPS = [
  "Fill a wine glass with ice. All the way up.",
  "Pour one bottle over the ice, slowly, down the side.",
  "Add a wheel of orange. Grapefruit, if it’s Rosa.",
  "Put something salty next to it. Olives, crisps, a friend.",
];

export default function SorsoPage() {
  return (
    <main className="sorso-main" suppressHydrationWarning>
      <BottleDefs />

      {/* Hero */}
      <section className="sorso-hero" aria-label="Sorso hero">
        <h1 className="sorso-hero-title">
          <span className="sorso-hl"><em>All the</em> Bitter.</span>
          <span className="sorso-hl"><em>None of the</em> Proof.</span>
        </h1>
        <div className="sorso-trio" aria-hidden="true">
          <SorsoBottle flavour="rosa" className="sorso-trio-bottle sorso-trio-rosa" />
          <SorsoBottle flavour="rosso" className="sorso-trio-bottle sorso-trio-rosso" />
          <SorsoBottle flavour="chinotto" className="sorso-trio-bottle sorso-trio-chinotto" />
        </div>
      </section>

      {/* Ingredient tags marquee */}
      <section className="sorso-tags" aria-label="What is in it">
        {TAG_ROWS.map((row, i) => (
          <div key={i} className="sorso-tags-row" data-dir={i % 2 ? "right" : "left"}>
            <ul className="sorso-tags-track">
              {[...row, ...row].map(([bg, fg, label], j) => (
                <li key={j} className="sorso-tag" style={{ backgroundColor: bg, color: fg }}>{label}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <SorsoFlavours />

      {/* Bitter statement + bento */}
      <section className="sorso-bitter" aria-labelledby="sorso-bitter-title">
        <div className="sorso-bitter-head">
          <h2 className="sorso-bitter-title" id="sorso-bitter-title">Bitter, <em>on purpose.</em></h2>
          <p>Most soft drinks chase sweet. Sorso is built the way an aperitivo is: bitter up front, so your appetite turns up in time for dinner.</p>
        </div>
        <div className="sorso-bento">
          <div className="sorso-tile sorso-tile-text" style={{ backgroundColor: "#2B0B10", color: "#FFF3EA" }}>
            <h3>Real roots, not “bitter flavouring”</h3>
            <p>Gentian root and bitter orange peel, steeped cold for 48 hours and filtered twice.</p>
          </div>
          <div className="sorso-tile sorso-tile-photo">
            <Image src="https://images.unsplash.com/photo-1583855061290-b72764abbf97?auto=format&fit=crop&w=800&h=1100&q=72" alt="Two halves of a blood orange on a red surface" fill sizes="(min-width: 900px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="sorso-tile sorso-tile-photo">
            <Image src="https://images.unsplash.com/photo-1564090654281-eb1db56d15fc?auto=format&fit=crop&w=800&h=1100&q=72" alt="Two orange drinks over ice on a sunlit wooden table" fill sizes="(min-width: 900px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="sorso-tile sorso-tile-text" style={{ backgroundColor: "#FFD23F", color: "#2B0B10" }}>
            <h3>Zero proof, all ritual</h3>
            <p>The glass, the ice, the slice. Everything about the hour except the morning after.</p>
          </div>
          <div className="sorso-tile sorso-tile-photo sorso-tile-wide">
            <Image src="https://images.unsplash.com/photo-1718627742424-0d0ba2c1c230?auto=format&fit=crop&w=900&h=700&q=72" alt="Half a pink grapefruit on red and yellow paper in hard sunlight" fill sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="sorso-tile sorso-tile-text" style={{ backgroundColor: "#D42C0C", color: "#FFF3EA" }}>
            <h3>5 g of sugar a bottle</h3>
            <p>Enough to round off the bitter, not enough to bury it.</p>
          </div>
          <div className="sorso-tile sorso-tile-photo sorso-tile-wide">
            <Image src="/works/offset/images/hero-trio.jpg" alt="All three bottles of Sorso bitter aperitivo soda side-by-side on Italian marble" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Serve ritual */}
      <section id="serve" className="sorso-serve scroll-mt-24" aria-labelledby="sorso-serve-title">
        <div className="sorso-serve-copy">
          <h2 className="sorso-serve-title" id="sorso-serve-title">Serve it like an <em>aperitivo.</em></h2>
          <ol className="sorso-steps">
            {STEPS.map((s, i) => (
              <li key={i} className="sorso-step">
                <span className="sorso-step-n" aria-hidden="true">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="sorso-serve-art" aria-hidden="true">
          <div className="sorso-glass-card">
            <Image src="/works/offset/images/serve-glass.jpg" alt="" fill sizes="(min-width: 900px) 40vw, 100vw" className="object-cover" />
            <div className="sorso-glass-badge"><span>The Ritual</span><span>Step 1 · High wine glass, filled with ice</span></div>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section id="moments" className="sorso-moments scroll-mt-24" aria-labelledby="sorso-moments-title">
        <div className="sorso-moments-head">
          <h2 className="sorso-moments-title" id="sorso-moments-title">Seven-ish.</h2>
          <p>Where the hour actually happens. Tag yours with #orasorso and we’ll put the good ones here.</p>
        </div>
        <SorsoMoments />
      </section>

      {/* Order / night footer */}
      <footer className="sorso-night" id="order">
        <div className="sorso-night-top">
          <h2 className="sorso-night-title">Salute.</h2>
          <div className="sorso-order">
            <div className="sorso-order-pack">
              <Image src="/works/offset/images/mixed-case.jpg" alt="Sorso 12-bottle mixed case packshot" fill sizes="(min-width: 700px) 280px, 60vw" className="object-cover" />
            </div>
            <h3>The mixed case</h3>
            <p>Four Rosso, four Rosa, four Chinotto. Twelve bottles, delivered in two to four days anywhere in the EU.</p>
            <div className="sorso-order-row">
              <span className="sorso-order-price">€36</span>
              <SorsoCaseButton />
            </div>
          </div>
          <nav className="sorso-night-links" aria-label="Sorso footer">
            <a href="/works/offset/showreel.html">Showreel</a>
            <a href="/works/offset/storyboard.html">Storyboard</a>
            <Link href="/projects">PerPixel</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="sorso-wordmark" aria-hidden="true">Sorso</div>
        <div className="sorso-night-fine">
          <span>© 2026 Sorso Bevande. A fictional brand, built as a motion study by PerPixel.</span>
          <span>Photography from Unsplash, standing in until the real shoot.</span>
        </div>
      </footer>
    </main>
  );
}
