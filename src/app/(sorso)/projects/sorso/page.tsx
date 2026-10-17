import type { Metadata } from "next";
import Image from "next/image";
import { SorsoCaseButton, SorsoMoments } from "@/components/projects/SorsoShowcase";

export const metadata: Metadata = {
  title: "Sorso — Bitter Aperitivo Soda, Zero Proof",
  description:
    "Sorso is a bitter aperitivo soda made with blood orange and gentian root. 0.0% alcohol, built for the hour between work and dinner — a PerPixel brand world.",
};

type Flavour = "rosso" | "rosa" | "chinotto";

const FLAVOUR_ART: Record<
  Flavour,
  { gradient: string; glass: string; accent: string; cap: string; label: string }
> = {
  rosso: { gradient: "liq-rosso", glass: "#B3121A", accent: "#D42C0C", cap: "#2B0B10", label: "ROSSO 0.0%" },
  rosa: { gradient: "liq-rosa", glass: "#FF5F6D", accent: "#FF5F6D", cap: "#D42C0C", label: "ROSA 0.0%" },
  chinotto: { gradient: "liq-chinotto", glass: "#3A140C", accent: "#3A140C", cap: "#2B0B10", label: "CHINOTTO 0.0%" },
};

function BottleDefs() {
  return (
    <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="sorso-clip">
          <path d="M46,508 Q31,508 32,494 L72,186 Q74,170 85,160 L85,92 Q85,86 91,86 L109,86 Q115,86 115,92 L115,160 Q126,170 128,186 L168,494 Q169,508 154,508 Z" />
        </clipPath>
        <linearGradient id="liq-rosso" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C0E14" /><stop offset="35%" stopColor="#E52614" /><stop offset="70%" stopColor="#F2381C" /><stop offset="100%" stopColor="#8A0C10" />
        </linearGradient>
        <linearGradient id="liq-rosa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D94858" /><stop offset="35%" stopColor="#FF6B7D" /><stop offset="70%" stopColor="#FF8A98" /><stop offset="100%" stopColor="#C2384A" />
        </linearGradient>
        <linearGradient id="liq-chinotto" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#240B06" /><stop offset="35%" stopColor="#4E1A0C" /><stop offset="70%" stopColor="#6E2814" /><stop offset="100%" stopColor="#1E0804" />
        </linearGradient>
        <linearGradient id="sorso-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity=".32" /><stop offset="18%" stopColor="#fff" stopOpacity=".04" /><stop offset="72%" stopColor="#000" stopOpacity="0" /><stop offset="88%" stopColor="#000" stopOpacity=".18" /><stop offset="100%" stopColor="#fff" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id="sorso-shadow">
          <stop offset="0%" stopColor="#2B0B10" stopOpacity=".36" /><stop offset="100%" stopColor="#2B0B10" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function SorsoBottle({ flavour, className }: { flavour: Flavour; className?: string }) {
  const a = FLAVOUR_ART[flavour];
  return (
    <svg className={className} viewBox="0 0 200 540" aria-hidden="true">
      <ellipse cx="100" cy="514" rx="88" ry="12" fill="url(#sorso-shadow)" />
      <g clipPath="url(#sorso-clip)">
        <rect width="200" height="540" fill={a.glass} opacity=".14" />
        <path d="M0,178 L200,178 L200,540 L0,540 Z" fill={`url(#${a.gradient})`} />
        <path d="M0,178 L200,178" stroke="#fff" strokeWidth="2.5" strokeOpacity=".5" fill="none" />
        <rect width="200" height="540" fill="url(#sorso-sheen)" />
      </g>
      <path d="M46,508 Q31,508 32,494 L72,186 Q74,170 85,160 L85,92 Q85,86 91,86 L109,86 Q115,86 115,92 L115,160 Q126,170 128,186 L168,494 Q169,508 154,508 Z" fill="none" stroke="#2B0B10" strokeOpacity=".25" strokeWidth="1.5" />
      <path d="M50,476 L82,196 L89,192 L60,476 Z" fill="#fff" opacity=".35" />
      <path d="M150,470 L124,214 L127,212 L155,470 Z" fill="#fff" opacity=".18" />
      <rect x="85" y="112" width="30" height="20" fill="#FFF3EA" />
      <g>
        <path d="M57,300 L143,300 L157,414 L43,414 Z" fill="#FFF3EA" />
        <path d="M59,303 L141,303 L154,411 L46,411 Z" fill="none" stroke={a.accent} strokeWidth="0.75" strokeOpacity=".4" />
        <text className="sorso-b-brand" x="100" y="344" textAnchor="middle" fill={a.accent}>Sorso</text>
        <text className="sorso-b-flavour" x="100" y="375" textAnchor="middle" fill={a.accent}>{a.label}</text>
        <text className="sorso-b-sub" x="100" y="391" textAnchor="middle" fill={a.accent}>BITTER APERITIVO SODA</text>
        <text className="sorso-b-meta" x="100" y="405" textAnchor="middle" fill={a.accent}>250 ML · TORINO</text>
      </g>
      <g>
        <rect x="80" y="60" width="40" height="26" rx="3" fill={a.cap} />
        <rect x="83" y="63" width="34" height="3" rx="1.5" fill="#fff" opacity=".35" />
        <path d="M80,84 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 Z" fill={a.cap} />
      </g>
    </svg>
  );
}

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

const FLAVOURS: { id: Flavour; name: string; notes: string; desc: string; hour: string; bg: string; fg: string }[] = [
  { id: "rosso", name: "Rosso.", notes: "Blood orange · Rhubarb · Gentian", desc: "The classic. Bright red, properly bitter, finished with orange peel. Pour it over ice and leave it alone.", hour: "Best at 17:30", bg: "#D42C0C", fg: "#FFF3EA" },
  { id: "rosa", name: "Rosa.", notes: "Pink grapefruit · Rosemary · Pink pepper", desc: "The softer one. Sour first, bitter second, with a resin edge from the rosemary that keeps it honest.", hour: "Best at 18:15", bg: "#FFB3A3", fg: "#2B0B10" },
  { id: "chinotto", name: "Chinotto.", notes: "Chinotto · Bay leaf · Cocoa husk", desc: "The dark one. Bittersweet Ligurian citrus that tastes a little like cola and nothing like it at all.", hour: "Best at 19:00", bg: "#E6E3FF", fg: "#B8260A" },
];

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

      {/* Flavours */}
      <section id="flavours" className="sorso-flavours scroll-mt-24" aria-label="Flavours">
        {FLAVOURS.map((f) => (
          <article key={f.id} className="sorso-flv" style={{ backgroundColor: f.bg, color: f.fg }}>
            <div className="sorso-flv-copy">
              <h2 className="sorso-flv-name">{f.name}</h2>
              <p className="sorso-flv-notes">{f.notes}</p>
              <p className="sorso-flv-desc">{f.desc}</p>
              <p className="sorso-flv-hour"><span className="sorso-dash" aria-hidden="true" />{f.hour}</p>
            </div>
            <div className="sorso-flv-art" aria-hidden="true">
              <SorsoBottle flavour={f.id} className="sorso-flv-bottle" />
            </div>
          </article>
        ))}
      </section>

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
            <a href="/projects">PerPixel</a>
            <a href="/contact">Contact</a>
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
