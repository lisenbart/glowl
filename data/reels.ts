export interface Reel {
  id: string;
  title: string;
  poster: string;
  video: string;
  accent: string;
  description: string;
}

export const reels: Reel[] = [
  {
    id: "commercial",
    title: "Commercial Animation",
    poster: "/images/reels/commercial.jpg",
    video: "/videos/commercial.mp4",
    accent: "var(--cyan)",
    description: "Premium commercial animation — luxury brands & product storytelling.",
  },
  {
    id: "gaming",
    title: "Gaming & Gambling",
    poster: "/images/reels/gaming.jpg",
    video: "/videos/gaming.mp4",
    accent: "var(--magenta)",
    description: "High-energy gaming and casino content with cinematic neon aesthetics.",
  },
  {
    id: "cinema",
    title: "Cinema",
    poster: "/images/reels/cinema.jpg",
    video: "/videos/cinema.mp4",
    accent: "var(--orange)",
    description: "Atmospheric cinematic films with dramatic environments and narrative depth.",
  },
];
