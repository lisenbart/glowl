export type ProductionDirection = {
  id: string;
  title: string;
  description: string;
  /** Temporary prototype image path under /public */
  image: string;
  isTemporaryMedia: true;
};

export const productionDirectionsSection = {
  title: "What We Make",
  lead: "Cinematic production across advertising, gaming and entertainment.",
  cta: "Explore Our Capabilities",
} as const;

export const productionDirections: ProductionDirection[] = [
  {
    id: "advertising",
    title: "Advertising",
    description:
      "Commercials, brand films and product stories developed from concept through final delivery.",
    image: "/images/capabilities/commercial.png",
    isTemporaryMedia: true,
  },
  {
    id: "gaming",
    title: "Gaming",
    description:
      "Trailers, cinematics and performance content built around the world, audience and goals of the game.",
    image: "/images/capabilities/gaming.png",
    isTemporaryMedia: true,
  },
  {
    id: "film-entertainment",
    title: "Film & Entertainment",
    description:
      "Short films, music videos and cinematic storytelling across animation, mixed media and VFX.",
    image: "/images/capabilities/film-entertainment.png",
    isTemporaryMedia: true,
  },
  {
    id: "performance-social",
    title: "Performance & Social",
    description:
      "Social campaign assets and performance creatives shaped for platforms and paid media.",
    image: "/images/capabilities/performance-social.png",
    isTemporaryMedia: true,
  },
];
