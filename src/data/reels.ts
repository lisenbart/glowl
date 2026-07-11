import { publicAsset } from "@/lib/publicAsset";

export interface Reel {
  id: string;
  title: string;
  poster: string;
  video: string;
  accent: string;
  description: string;
  projectCategory: string;
}

/** Single site-wide showreel */
export const mainShowreel = {
  title: "GLOWL Showreel",
  poster: publicAsset("/images/header_02.png"),
  video: publicAsset("/videos/showreel.mp4"),
};

export const reels: Reel[] = [
  {
    id: "commercial",
    title: "Commercial Animation",
    poster: publicAsset("/images/reels/commercial.svg"),
    video: publicAsset("/videos/commercial.mp4"),
    accent: "var(--cyan)",
    description: "Brand films, product campaigns and social content.",
    projectCategory: "commercial",
  },
  {
    id: "gaming",
    title: "Gaming & Gambling",
    poster: publicAsset("/images/reels/gaming.svg"),
    video: publicAsset("/videos/gaming.mp4"),
    accent: "var(--magenta)",
    description: "Trailers, gameplay creatives, cinematics and performance ads.",
    projectCategory: "gaming",
  },
  {
    id: "film",
    title: "Film & Entertainment",
    poster: publicAsset("/images/reels/cinema.svg"),
    video: publicAsset("/videos/cinema.mp4"),
    accent: "var(--orange)",
    description: "Short films, music videos and cinematic storytelling.",
    projectCategory: "film",
  },
];
