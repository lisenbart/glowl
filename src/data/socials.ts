import { site } from "@/data/site";

export type SocialNetworkId = "linkedin" | "vimeo";

export interface SocialChannel {
  href: string;
  active: boolean;
}

export type SocialChannels = Record<SocialNetworkId, SocialChannel>;

export const socialChannels: SocialChannels = {
  linkedin: site.social.linkedin,
  vimeo: {
    href: site.vimeo,
    active: Boolean(site.vimeo.trim()),
  },
};

export interface SocialNetwork {
  id: SocialNetworkId;
  label: string;
  href: string;
  active: boolean;
}

/** Only channels shown in header / footer icon rows. */
export const socialNetworks: SocialNetwork[] = [
  { id: "linkedin", label: "LinkedIn", ...socialChannels.linkedin },
  { id: "vimeo", label: "Vimeo", ...socialChannels.vimeo },
];

export function isSocialChannelActive(id: SocialNetworkId): boolean {
  const channel = socialChannels[id];
  return channel.active && channel.href.trim().length > 0;
}
