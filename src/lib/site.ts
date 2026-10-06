export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
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
    alt: "Minimal black object study on a gray gradient",
  },
  {
    number: "2",
    label: "Ready",
    description:
      "Strategy meets craft in the concept phase. We develop ideas, explore directions, and refine until the path forward is clear. Nothing moves to execution until the vision is sharp and the strategy is sound.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    alt: "Dark sculptural form floating on a gray backdrop",
  },
  {
    number: "3",
    label: "Takeoff",
    description:
      "Execution with precision and care. Your brand comes to life through meticulous design and seamless delivery. We stay close through launch and beyond.",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80",
    alt: "Abstract monochrome texture study",
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
};

export const PROJECTS: Project[] = [
  {
    slug: "moove",
    title: "Moove",
    category: "Branding",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
    alt: "Pale pink chair against a rose studio backdrop",
    tone: "pink",
  },
  {
    slug: "velora",
    title: "Velora",
    category: "Design",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    alt: "Editorial portrait lit in soft pink",
    tone: "pink",
  },
  {
    slug: "kilim",
    title: "Kilim",
    category: "Editorial",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?auto=format&fit=crop&w=900&q=80",
    alt: "Orange flower against a clear blue sky",
    tone: "blue",
  },
  {
    slug: "norra",
    title: "Norra",
    category: "Motion",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80",
    alt: "Abstract gradient form in blue and violet",
    tone: "blue",
  },
  {
    slug: "atlas",
    title: "Atlas",
    category: "Branding",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    alt: "Quiet interior with a single chair and plant",
    tone: "neutral",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    category: "Editorial",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    alt: "Soft pink flowers in morning light",
    tone: "pink",
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
      "A focused identity runs four to six weeks. A full site with motion runs eight to twelve. We scope honestly before anything is signed.",
  },
  {
    question: "Can we improve an existing site?",
    answer:
      "Yes. We audit what's there, keep what works, and rebuild what doesn't. Motion and typography are usually the fastest wins.",
  },
] as const;
