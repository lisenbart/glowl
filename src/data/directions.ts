import { publicAsset } from "@/lib/publicAsset";

export interface Direction {
  id: string;
  reelId: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  accent: string;
}

export const directions: Direction[] = [
  {
    id: "commercial",
    reelId: "commercial",
    label: "Commercials",
    title: "Commercials",
    description: "Brand films, product videos, campaign assets and social content.",
    cta: "View Commercial Work",
    image: publicAsset("/images/reels/commercial.svg"),
    accent: "var(--cyan)",
  },
  {
    id: "gaming",
    reelId: "gaming",
    label: "Gaming",
    title: "Gaming",
    description: "Trailers, gameplay ads, cinematics, UA creatives and gambling content.",
    cta: "View Gaming Work",
    image: publicAsset("/images/reels/gaming.svg"),
    accent: "var(--magenta)",
  },
  {
    id: "film",
    reelId: "film",
    label: "Film & Entertainment",
    title: "Film & Entertainment",
    description: "Concept films, music videos, title sequences and cinematic production.",
    cta: "View Film Work",
    image: publicAsset("/images/reels/cinema.svg"),
    accent: "var(--orange)",
  },
];
