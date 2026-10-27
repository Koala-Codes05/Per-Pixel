/**
 * Written concept studies for projects without a built brand site.
 * Self-initiated work: no client, results, or metrics are implied. Photography is Unsplash, used illustratively.
 */

type Crop = { x: number; y: number; z: number };

export type CaseStudy = {
  slug: string;
  /** Unsplash photo id (the part after `photo-`). */
  photo: string;
  heroFocus: string;
  idea: string;
  sector: string;
  scope: string[];
  challenge: string;
  strategy: { title: string; body: string }[];
  wordmark: { text: string; style: "serif" | "serif-italic" | "sans-wide" | "sans-black" | "sans-lower"; note: string };
  palette: { name: string; hex: string }[];
  type: { display: string; text: string; note: string };
  crops: { poster: Crop; detail: Crop & { caption: string }; wide: Crop };
  web: { headline: string; nav: string[] };
  deliverables: string[];
  theme: { surface: string; ink: string; accent: string; onAccent: string };
  liquid?: boolean;
};

export function unsplash(photo: string, w: number, h: number, crop?: Crop) {
  const params = new URLSearchParams({ auto: "format", fit: "crop", w: String(w), h: String(h), q: "80" });
  if (crop) {
    params.set("crop", "focalpoint");
    params.set("fp-x", String(crop.x));
    params.set("fp-y", String(crop.y));
    params.set("fp-z", String(crop.z));
  }
  return `https://images.unsplash.com/photo-${photo}?${params}`;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "velora",
    photo: "1534528741775-53994a69daeb",
    heroFocus: "50% 35%",
    idea: "A skincare label lit like the blue hour — calm, cool, and clinically clear.",
    sector: "Skincare & fragrance",
    scope: ["Visual identity", "Packaging system", "E-commerce design"],
    challenge:
      "Clean beauty has collapsed into one look: beige glass, a soft serif, a sprig of something green. We asked how a calm brand could still be recognisable at a glance — without borrowing the wellness clichés it was meant to stand apart from.",
    strategy: [
      { title: "Own a light, not a colour", body: "Velora is defined by a lighting condition — the cool violet of the blue hour — so photography, packaging, and screens share one recognisable atmosphere." },
      { title: "Clinical clarity", body: "Ingredients, concentrations, and routines sit up front in a strict typographic grid. The calm comes from order, not vagueness." },
      { title: "Portrait first", body: "Campaign imagery treats skin as the product: close, unretouched crops that let texture do the persuading." },
    ],
    wordmark: { text: "velora", style: "serif-italic", note: "Lowercase italic — a voice, not a badge." },
    palette: [
      { name: "Blue hour", hex: "#9998e4" },
      { name: "Night", hex: "#1b2140" },
      { name: "Skin", hex: "#d8a48a" },
      { name: "Mist", hex: "#eeedf8" },
    ],
    type: { display: "Instrument Serif Italic", text: "Archivo", note: "A soft italic for the voice; a precise grotesque for ingredient lists and dosage." },
    crops: {
      poster: { x: 0.5, y: 0.45, z: 1.15 },
      detail: { x: 0.5, y: 0.42, z: 2.4, caption: "Skin as surface — campaign close-up" },
      wide: { x: 0.5, y: 0.4, z: 1 },
    },
    web: { headline: "Skin care, under a cooler light.", nav: ["Routine", "Serums", "Journal"] },
    deliverables: ["Lowercase logotype", "Blue-hour colour and lighting guide", "Bottle and carton system, three products", "Product page and checkout design", "Campaign art direction"],
    theme: { surface: "#e9e8f7", ink: "#1b2140", accent: "#9998e4", onAccent: "#141414" },
  },
  {
    slug: "kilim",
    photo: "1604085572504-a392ddf0d86a",
    heroFocus: "45% 40%",
    idea: "A quarterly on craft and the botanical world, woven together like the rug it is named after.",
    sector: "Independent print magazine",
    scope: ["Masthead and identity", "Editorial grid", "Cover system", "Digital edition"],
    challenge:
      "Craft magazines tend to whisper — beige stock, small type, polite photography. Kilim needed to feel as bold as the textiles and plants it covers, while keeping long essays genuinely comfortable to read.",
    strategy: [
      { title: "A grid that weaves", body: "Columns alternate like warp and weft: a wide reading column crossed by narrow bands for captions, specimens, and pull quotes." },
      { title: "One dye per issue", body: "Each issue takes a single colour from its lead story — marigold for the first — and runs it through every spread." },
      { title: "Slow pages", body: "Generous margins and one idea per spread keep the pace closer to a book than a feed." },
    ],
    wordmark: { text: "Kilim", style: "sans-wide", note: "Tracked-out capitals, set like a woven border." },
    palette: [
      { name: "Marigold", hex: "#f29a1d" },
      { name: "Forest", hex: "#10301c" },
      { name: "Moss", hex: "#4c6a37" },
      { name: "Undyed", hex: "#f2ebdd" },
    ],
    type: { display: "Archivo Black, wide tracking", text: "Instrument Serif", note: "A loud masthead over a quiet, bookish reading face." },
    crops: {
      poster: { x: 0.5, y: 0.45, z: 1.6 },
      detail: { x: 0.53, y: 0.4, z: 3, caption: "Issue 01 dye study — marigold" },
      wide: { x: 0.45, y: 0.45, z: 1 },
    },
    web: { headline: "Issue 01 — Marigold.", nav: ["Issues", "Essays", "Subscribe"] },
    deliverables: ["Masthead and wordmark", "Twelve-column woven editorial grid", "Cover system with a seasonal dye palette", "Feature spread templates", "Responsive digital edition"],
    theme: { surface: "#f2ebdd", ink: "#10301c", accent: "#f29a1d", onAccent: "#10301c" },
  },
  {
    slug: "norra",
    photo: "1550684848-fac1c5b4e853",
    heroFocus: "50% 50%",
    idea: "A motion identity that behaves like colour under water — always moving, never looping.",
    sector: "Music and light festival",
    scope: ["Motion language", "Titles and stings", "Social templates", "Stage visuals"],
    challenge:
      "Festival identities often freeze into a poster and get animated as an afterthought. Norra had to be born moving — and still hold together as a single frame on a ticket or a wristband.",
    strategy: [
      { title: "Liquid, not looped", body: "Colour fields drift and merge on slow, continuous curves, so no two frames of the identity are quite the same." },
      { title: "Type rides the surface", body: "The lowercase wordmark sits on the moving field and never fights it; the motion lives in the colour, not the letters." },
      { title: "Tempo sets the speed", body: "Each stage drifts at its own pace, mapped to the tempo of its line-up — from ambient to club." },
    ],
    wordmark: { text: "norra", style: "sans-lower", note: "Heavy lowercase, still while the colour moves." },
    palette: [
      { name: "Bloom", hex: "#f4a3c6" },
      { name: "Sun", hex: "#f7c235" },
      { name: "Ember", hex: "#ef6430" },
      { name: "Depth", hex: "#1f4fd0" },
    ],
    type: { display: "Archivo Black, lowercase", text: "Archivo", note: "One family at two speeds: heavy for the mark, regular for timetables." },
    crops: {
      poster: { x: 0.3, y: 0.4, z: 1.8 },
      detail: { x: 0.72, y: 0.6, z: 2.6, caption: "Liquid field — stage visual frame" },
      wide: { x: 0.5, y: 0.5, z: 1.2 },
    },
    web: { headline: "Three nights of sound and colour.", nav: ["Line-up", "Stages", "Tickets"] },
    deliverables: ["Lowercase wordmark and lock-ups", "Liquid colour motion system", "Title sequence and six-second stings", "Social and screen templates", "Stage visual guidelines"],
    theme: { surface: "#16182a", ink: "#f4f2ee", accent: "#f7c235", onAccent: "#141414" },
    liquid: true,
  },
  {
    slug: "atlas",
    photo: "1524758631624-e2822e304c36",
    heroFocus: "55% 55%",
    idea: "An identity for an interiors practice that maps rooms the way an atlas maps the world.",
    sector: "Architecture and interiors",
    scope: ["Visual identity", "Signage and wayfinding", "Project index website"],
    challenge:
      "Interiors studios usually lead with mood photography, which makes every portfolio look alike. Atlas wanted clients to understand how a space works — light, circulation, proportion — before they ever saw a styled photo.",
    strategy: [
      { title: "Coordinates as a system", body: "Every project is filed by grid reference, like a map. The same coordinates appear on drawings, signage, and the website index." },
      { title: "A daylight palette", body: "Colours are sampled from plaster, birch, and painted steel under north light, so the brand never looks louder than the rooms." },
      { title: "Plans before photos", body: "Each project opens with its plan and section; photography follows as evidence, not decoration." },
    ],
    wordmark: { text: "Atlas", style: "sans-black", note: "Compact capitals with a coordinate tag, like a title block." },
    palette: [
      { name: "Plaster", hex: "#f0eee8" },
      { name: "Birch", hex: "#e0cdb1" },
      { name: "Slate", hex: "#3b494e" },
      { name: "Pine", hex: "#1f4c39" },
    ],
    type: { display: "Archivo Black, capitals", text: "Archivo, tabular figures", note: "Set like a drawing title block: capitals for names, tabular figures for coordinates." },
    crops: {
      poster: { x: 0.68, y: 0.4, z: 1.7 },
      detail: { x: 0.35, y: 0.72, z: 2.2, caption: "Lounge, grid ref. C4 — seating study" },
      wide: { x: 0.5, y: 0.55, z: 1 },
    },
    web: { headline: "Rooms, mapped.", nav: ["Index", "Practice", "Contact"] },
    deliverables: ["Wordmark and coordinate system", "Daylight colour palette", "Signage and wayfinding family", "Drawing title-block templates", "Project index website"],
    theme: { surface: "#f0eee8", ink: "#141414", accent: "#1f4c39", onAccent: "#f4f2ee" },
  },
  {
    slug: "field-notes",
    photo: "1490750967868-88aa4486c946",
    heroFocus: "50% 60%",
    idea: "A seasonal journal that records a garden the way a naturalist would — dated, observed, and in colour.",
    sector: "Botanical garden publication",
    scope: ["Journal design", "Seasonal covers", "Specimen layouts", "Web edition"],
    challenge:
      "Garden publications swing between gift-shop sentiment and dry plant catalogues. This journal needed the rigour of a field record and the warmth of a walk on a clear morning.",
    strategy: [
      { title: "Dated observations", body: "Every entry carries a date, a bed number, and the weather, like a page from a naturalist's notebook." },
      { title: "Specimen layouts", body: "Plants are set like pressed specimens: one subject, generous white space, a precise caption beneath." },
      { title: "The season sets the palette", body: "Each issue takes its colours from what is in flower — poppy orange and open sky for early summer." },
    ],
    wordmark: { text: "Field Notes", style: "serif", note: "A naturalist's roman — quiet, legible, dated." },
    palette: [
      { name: "Open sky", hex: "#4aa2d6" },
      { name: "Poppy", hex: "#f29a1a" },
      { name: "Stem", hex: "#5b7b47" },
      { name: "Notebook", hex: "#f6f1e5" },
    ],
    type: { display: "Instrument Serif", text: "Archivo", note: "A naturalist's serif for headings; a clear grotesque for dates and captions." },
    crops: {
      poster: { x: 0.55, y: 0.62, z: 1.5 },
      detail: { x: 0.78, y: 0.72, z: 2.6, caption: "Bed 14, early summer — poppy specimen" },
      wide: { x: 0.5, y: 0.55, z: 1 },
    },
    web: { headline: "Early summer, bed 14.", nav: ["Seasons", "Specimens", "Visit"] },
    deliverables: ["Journal masthead", "Seasonal cover system", "Specimen and entry templates", "Caption and dating conventions", "Web edition design"],
    theme: { surface: "#f6f1e5", ink: "#141414", accent: "#4aa2d6", onAccent: "#141414" },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
