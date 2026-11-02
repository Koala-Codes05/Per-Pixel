export type SorsoFlavourId = "rosso" | "rosa" | "chinotto";

export type SorsoFlavour = {
  id: SorsoFlavourId;
  name: string;
  notes: string;
  desc: string;
  hour: string;
  bg: string;
  fg: string;
};

export const SORSO_FLAVOURS: SorsoFlavour[] = [
  {
    id: "rosso",
    name: "Rosso.",
    notes: "Blood orange · Rhubarb · Gentian",
    desc: "The classic. Bright red, properly bitter, finished with orange peel. Pour it over ice and leave it alone.",
    hour: "Best at 17:30",
    bg: "#D42C0C",
    fg: "#FFF3EA",
  },
  {
    id: "rosa",
    name: "Rosa.",
    notes: "Pink grapefruit · Rosemary · Pink pepper",
    desc: "The softer one. Sour first, bitter second, with a resin edge from the rosemary that keeps it honest.",
    hour: "Best at 18:15",
    bg: "#FFB3A3",
    fg: "#2B0B10",
  },
  {
    id: "chinotto",
    name: "Chinotto.",
    notes: "Chinotto · Bay leaf · Cocoa husk",
    desc: "The dark one. Bittersweet Ligurian citrus that tastes a little like cola and nothing like it at all.",
    hour: "Best at 19:00",
    bg: "#E6E3FF",
    fg: "#B8260A",
  },
];
