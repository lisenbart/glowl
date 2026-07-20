export interface SelectedWorkItem {
  id: string;
  title: string;
  image: string;
  description: string;
  formats: string[];
  featured?: boolean;
  secondary?: boolean;
}

export const selectedWork: SelectedWorkItem[] = [
  {
    id: "commercial",
    title: "Advertising",
    image: "/images/capabilities/commercial.png",
    description:
      "Brand films, commercials and product visuals — from concept through final delivery.",
    formats: ["TV & digital ads", "brand films", "product animation", "explainer videos"],
    featured: true,
  },
  {
    id: "gaming",
    title: "Gaming",
    image: "/images/capabilities/gaming.png",
    description:
      "Trailers, cinematics and performance creatives — built for the pace and scale of game production.",
    formats: ["game trailers", "cinematics", "gameplay ads", "playable ads"],
  },
  {
    id: "film-entertainment",
    title: "Film & Entertainment",
    image: "/images/capabilities/film-entertainment.png",
    description:
      "Short films, music videos and cinematic storytelling across 2D, 3D and mixed media.",
    formats: ["short films", "music videos", "title sequences", "motion & VFX"],
  },
  {
    id: "performance-social",
    title: "Performance & Social",
    image: "/images/capabilities/performance-social.png",
    description:
      "Social campaign assets and performance creatives shaped for platforms and paid media.",
    formats: ["social content", "reels & shorts", "performance creatives", "campaign cutdowns"],
  },
];
