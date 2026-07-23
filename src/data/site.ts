import { publicAsset } from "@/lib/publicAsset";

/** Interim public URL until the final brand domain is chosen. */
export const LIVE_SITE_URL = "https://lisenbart.github.io/glowl";

export const site = {
  name: "GLOWL",
  brand: "GLOWL",
  /** Shared Hero eyebrow / site positioning line */
  tagline: "Cinematic production for brands, games and entertainment.",
  hero: {
    headline: "Every Process. One Standard.",
    paragraph:
      "Every project begins with an idea. Bringing it to life may call for handcrafted production, a fully AI-generated film, or something in between. From first decision to final frame, experienced directors and producers hold it to one standard.",
  },
  aiPositioningLine:
    "Sometimes the idea calls for AI to expand visual development; sometimes to build a world, create individual sequences, or produce the complete film. The brief defines its role, and the directors and producers leading the project shape every decision.",
  closeLabel: "Close",
  /** Set after the final domain is live — leave empty until then. */
  email: "",
  linkedin: "",
  vimeo: "",
  youtube: "",
  social: {
    linkedin: {
      href: "",
      active: false,
    },
    whatsapp: {
      href: "",
      active: false,
    },
    facebook: {
      href: "",
      active: false,
    },
    instagram: {
      href: "",
      active: false,
    },
    tiktok: {
      href: "",
      active: false,
    },
  },
  socialComingSoon: {
    title: "Almost there",
    body: "Sorry — this channel is still in the works. Use the contact form and we'll get back to you.",
    cta: "Start a Project",
    closeLabel: "Close",
  },
  locations: "Canada · Ukraine · Poland",
  canonical: LIVE_SITE_URL,
  meta: {
    title: "GLOWL — Cinematic Production for Brands, Games and Entertainment",
    description:
      "GLOWL is a cinematic production studio for advertising, gaming, film and entertainment, led by experienced directors and producers across handcrafted, AI-generated and hybrid production.",
    ogImage: publicAsset("/images/Glowl_header.png"),
  },
  organizationDescription:
    "GLOWL is a cinematic production studio for advertising, gaming, film and entertainment, led by experienced directors and producers across handcrafted, AI-generated and hybrid production.",
  /** Set to your Formspree endpoint or backend URL for live submissions */
  contactEndpoint: "",
  maxUploadBytes: 10 * 1024 * 1024,
  acceptedFileTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "image/webp",
  ] as const,
  acceptedFileExtensions: ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp",
};

export const sectionIds = {
  work: "work",
  services: "services",
  contact: "contact",
  trusted: "trusted",
} as const;

export function scrollToSection(id: string, onDone?: () => void) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (onDone) {
      onDone();
    } else if (id === sectionIds.contact) {
      window.setTimeout(() => document.getElementById("contact-email")?.focus(), 650);
    }
  }
}
