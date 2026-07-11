import { publicAsset } from "@/lib/publicAsset";
import type { HostedVideo } from "@/lib/videoEmbed";

export interface Reel {
  id: string;
  title: string;
  poster: string;
  video: string;
  accent: string;
  description: string;
  projectCategory: string;
}

/**
 * Showreel source — switch provider + id when moving to Vimeo or another host.
 *
 * YouTube: provider "youtube", id = video ID or full URL
 * Vimeo:   provider "vimeo",   id = numeric ID or vimeo.com/… URL
 */
export const mainShowreel: HostedVideo = {
  title: "GLOWL Showreel",
  poster: publicAsset("/images/header_02.png"),
  provider: "youtube",
  id: "-cdiXSJczdU",
  // provider: "vimeo",
  // id: "123456789",
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
