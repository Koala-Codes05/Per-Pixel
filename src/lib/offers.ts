export type Offer = {
  id: string;
  index: string;
  name: string;
  duration: string;
  price: string;
  unit?: string;
  summary: string;
  detail: string;
  includes: readonly string[];
  surface: "paper" | "blush" | "sage";
  core?: boolean;
};

/** Starting floors for funded seed-to-Series A teams. Not a rate card of add-ons. */
export const OFFERS: readonly Offer[] = [
  {
    id: "launch-sprint",
    index: "01",
    name: "10-Day Launch Sprint",
    duration: "10 working days",
    price: "$4,500",
    summary:
      "A public face in ten working days. One positioning line, a wordmark, type and colour, and a short site you can send before a launch, a raise, or a first hire.",
    detail:
      "For a funded team that already has a product and needs the outside world to understand it. Ten working days, one direction. You leave with a line you can say out loud, a wordmark, the type and colour to hold it, and a launch page of about five sections, with motion on the first screen. A full identity is the longer engagement. This is the page you can send this month.",
    includes: [
      "A working session to lock the audience, the offer, and the line",
      "One wordmark direction",
      "Type, colour, and a short motion note",
      "A responsive launch page, about five sections",
      "Files your team can edit, and a handoff",
    ],
    surface: "paper",
  },
  {
    id: "brand-system",
    index: "02",
    name: "Brand & Web System",
    duration: "6–10 weeks",
    price: "$15,000",
    summary:
      "Identity and a marketing site designed as one system. For a seed to Series A company whose product is ahead of its website.",
    detail:
      "The studio's core engagement. We start with who the site is for, which competitors you actually lose to, and what the page has to do: raise, hire, or sell. Then a wordmark, colour, type, and a short guidelines note, and a site with a home, a product or offer, an about, and a contact. Editorial layout throughout. Motion only where it carries the story. Scope is written down before kickoff, and you see work in the first weeks.",
    includes: [
      "Discovery against the real audience and the sites you lose to",
      "Wordmark, colour, type, and a short guidelines note",
      "Marketing site: home, product or offer, about, contact",
      "Editorial layout, and motion where it earns its place",
      "A written scope before anything is signed",
    ],
    surface: "blush",
    core: true,
  },
  {
    id: "retainer",
    index: "03",
    name: "Motion & Editorial retainer",
    duration: "Monthly",
    price: "$2,500",
    unit: "/month",
    summary:
      "After the system exists. One scoped priority a month: a short motion asset, a campaign section, or an editorial update.",
    detail:
      "The work continues once the site is up. The retainer holds one scoped priority at a time, art-directed against the identity you already have: short motion made with existing assets, a focused campaign section, or an editorial update. Full film production and new sites require separate quotes. A standing review and a three-month minimum give each piece room to build on the last.",
    includes: [
      "One scoped motion or editorial piece a month",
      "Short motion using supplied assets, a campaign section, or an editorial update",
      "Art direction held to the existing system",
      "A standing review",
      "Three-month minimum; larger productions quoted separately",
    ],
    surface: "sage",
  },
] as const;
