import { site } from "@/data/site";

export type SocialNetworkId = "linkedin" | "whatsapp" | "facebook" | "instagram" | "tiktok";

export interface SocialChannel {
  href: string;
  active: boolean;
}

export type SocialChannels = Record<SocialNetworkId, SocialChannel>;

export const socialChannels: SocialChannels = site.social;

export interface SocialNetwork {
  id: SocialNetworkId;
  label: string;
  href: string;
  active: boolean;
}

export const socialNetworks: SocialNetwork[] = [
  { id: "linkedin", label: "LinkedIn", ...socialChannels.linkedin },
  { id: "whatsapp", label: "WhatsApp", ...socialChannels.whatsapp },
  { id: "facebook", label: "Facebook", ...socialChannels.facebook },
  { id: "instagram", label: "Instagram", ...socialChannels.instagram },
  { id: "tiktok", label: "TikTok", ...socialChannels.tiktok },
];

export function isSocialChannelActive(id: SocialNetworkId): boolean {
  const channel = socialChannels[id];
  return channel.active && channel.href.trim().length > 0;
}
