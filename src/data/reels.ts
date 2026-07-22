import { publicAsset } from "@/lib/publicAsset";
import type { HostedVideo } from "@/lib/videoEmbed";

/**
 * Showreel source — switch provider + id when moving to Vimeo or another host.
 *
 * YouTube: provider "youtube", id = video ID or full URL
 * Vimeo:   provider "vimeo",   id = numeric ID or vimeo.com/… URL
 */
export const mainShowreel: HostedVideo = {
  title: "GLOWL Showreel",
  poster: publicAsset("/images/showreel-poster.png"),
  provider: "youtube",
  id: "-cdiXSJczdU",
};
