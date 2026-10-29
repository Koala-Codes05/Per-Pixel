export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/offers", label: "Offers" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const WORDPLAY_WORDS = ["Branding", "Design", "Editorial", "Motion"] as const;

export const PROCESS_FRAMES = [
  {
    number: "1",
    label: "Start",
    description:
      "We begin every project with deep discovery. Understanding your audience and strategic goals forms the foundation we build upon. This phase shapes everything that follows.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
    alt: "Pale wooden stool against a blue-grey backdrop",
  },
  {
    number: "2",
    label: "Ready",
    description:
      "Strategy meets craft in the concept phase. We develop ideas, explore directions, and refine until the path forward is clear. Nothing moves to execution until the vision is sharp and the strategy is sound.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    alt: "Flowing purple, pink, and blue gradient waves",
  },
  {
    number: "3",
    label: "Takeoff",
    description:
      "Execution with precision and care. Your brand comes to life through meticulous design and seamless delivery. We stay close through launch and beyond.",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80",
    alt: "Red and blue ink clouds swirling in water",
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  category: "Branding" | "Design" | "Editorial" | "Motion";
  year: string;
  image: string;
  alt: string;
  tone: "pink" | "blue" | "neutral";
  href: string;
  /** "site" = a built brand website; "case-study" = a written concept study page. */
  kind: "site" | "case-study";
};

export const PROJECTS: Project[] = [
  {
    slug: "moove",
    title: "Moove",
    category: "Branding",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
    alt: "Cream tufted armchair against a pale studio wall",
    tone: "pink",
    href: "/projects/moove",
    kind: "site",
  },
  {
    slug: "sorso",
    title: "Sorso",
    category: "Branding",
    year: "2026",
    image: "/works/offset/images/hero-trio.jpg",
    alt: "Three Sorso aperitivo soda bottles in rose and rosso tones",
    tone: "pink",
    href: "/projects/sorso",
    kind: "site",
  },
  {
    slug: "dune",
    title: "Dune",
    category: "Editorial",
    year: "2026",
    image: "/works/dune/assets/images/hero_editorial_dawn.jpg",
    alt: "Dune fashion editorial at dawn across desert dunes",
    tone: "neutral",
    href: "/works/dune/index.html",
    kind: "site",
  },
  {
    slug: "ghaslet",
    title: "Ghaslet",
    category: "Branding",
    year: "2026",
    image: "/works/ghaslet/assets/hero-product.jpg",
    alt: "Ghaslet hot sauce bottle hero shot",
    tone: "neutral",
    href: "/works/ghaslet/index.html",
    kind: "site",
  },
  {
    slug: "snackverse",
    title: "SNACKVERSE",
    category: "Design",
    year: "2026",
    image: "/works/snackverse/cover.jpg",
    alt: "SNACKVERSE homepage with pink and blue snack bento tiles",
    tone: "blue",
    href: "/works/snackverse/index.html",
    kind: "site",
  },
  {
    slug: "velora",
    title: "Velora",
    category: "Design",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    alt: "Portrait of a woman lit in cool blue and violet light",
    tone: "blue",
    href: "/projects/velora",
    kind: "case-study",
  },
  {
    slug: "kilim",
    title: "Kilim",
    category: "Editorial",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?auto=format&fit=crop&w=900&q=80",
    alt: "Orange flower against a deep green background",
    tone: "neutral",
    href: "/projects/kilim",
    kind: "case-study",
  },
  {
    slug: "norra",
    title: "Norra",
    category: "Motion",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80",
    alt: "Oil-and-water bubbles in pink, yellow, orange, and blue",
    tone: "blue",
    href: "/projects/norra",
    kind: "case-study",
  },
  {
    slug: "atlas",
    title: "Atlas",
    category: "Branding",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    alt: "Bright lounge interior with grey chairs and a black floor lamp",
    tone: "neutral",
    href: "/projects/atlas",
    kind: "case-study",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    category: "Editorial",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    alt: "Orange poppies against a clear blue sky",
    tone: "blue",
    href: "/projects/field-notes",
    kind: "case-study",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How do we get started?",
    answer:
      "Send a short note about your project through the form above. We reply within two working days with first questions and a suggested call.",
  },
  {
    question: "What types of projects do you take on?",
    answer:
      "Brand identities, editorial websites, and motion systems — usually all three at once. We work best with teams who care about craft and give the work room to breathe.",
  },
  {
    question: "How does the process work?",
    answer:
      "Three phases: Start, Ready, Takeoff. Discovery first, then concept and design, then build and launch. You see work early and often — no big reveals.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "A launch sprint takes ten working days. A brand and web system runs six to ten weeks. Motion and editorial work continues as a monthly retainer. The floors and what each includes are on the offers page. We scope honestly before anything is signed.",
  },
  {
    question: "Can we improve an existing site?",
    answer:
      "Yes. We audit what's there, keep what works, and rebuild what doesn't. Motion and typography are usually the fastest wins.",
  },
] as const;
