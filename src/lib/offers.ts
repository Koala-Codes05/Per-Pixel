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
    price: "₹75k",
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
    price: "₹2.5L",
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
    price: "₹40k",
    unit: "/month",
    summary:
      "After the system exists. One priority a month: a launch film, a product explainer, a campaign page, or an editorial update.",
    detail:
      "The work does not stop once the site is up. The retainer holds one priority at a time, art-directed against the identity you already have. A standing review, not a ticket queue. Three months minimum, so the second piece can learn from the first.",
    includes: [
      "One active piece a month",
      "Launch film, explainer, campaign page, or editorial update",
      "Art direction held to the existing system",
      "A standing review",
      "Three-month minimum",
    ],
    surface: "sage",
  },
] as const;
