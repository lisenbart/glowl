import { publicAsset } from "@/lib/publicAsset";
import type { HostedVideo } from "@/lib/videoEmbed";

export type LatestWorkProject = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  ctaLabel: string;
  video: HostedVideo;
};

export const latestWorkSection = {
  title: "Latest Work",
  eyebrow: "New work from GLOWL.",
  description:
    "Films, commercials and visual stories — handcrafted, AI-generated or somewhere in between. Different processes. One standard.",
} as const;

/**
 * Featured projects for the homepage Latest Work section.
 * Newest first — add new entries at the top when publishing fresh work.
 */
export const latestWorkProjects: LatestWorkProject[] = [
  {
    id: "die-letzte-kneipe",
    title: "Die Letzte Kneipe",
    subtitle: "A medieval tale with a modern production process.",
    body: "A cinematic short built around character, comedy and atmosphere — bringing direction, animation and new production tools together under one creative vision.",
    ctaLabel: "Watch Film",
    video: {
      title: "Die Letzte Kneipe — GLOWL",
      provider: "vimeo",
      id: "1218646081",
      poster: publicAsset("/images/die-letzte-kneipe-poster.jpg"),
    },
  },
];
