import { publicAsset } from "@/lib/publicAsset";

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
  clientsModal: {
    title: "Selected Client Experience",
    body: "Brands our founders have delivered for across commercial and gaming work.",
    closeLabel: "Close",
    cta: "Start a Project",
  },
  email: "hello@glowlworks.com",
  linkedin: "https://linkedin.com/company/glowlworks",
  vimeo: "https://vimeo.com/glowlworks",
  youtube: "https://youtube.com/@glowlworks",
  social: {
    linkedin: {
      href: "https://linkedin.com/company/glowlworks",
      active: true,
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
    body: "Sorry — this channel is still in the works. For now, drop us a line and we'll get back to you.",
    cta: "Email Us",
    closeLabel: "Close",
  },
  locations: "Canada · Ukraine · Poland",
  canonical: "https://glowlworks.com",
  meta: {
    title: "GLOWL — Cinematic Production for Brands, Games and Entertainment",
    description:
      "GLOWL is a cinematic production studio for advertising, gaming, film and entertainment, led by experienced directors and producers across handcrafted, AI-generated and hybrid production.",
    ogImage: publicAsset("/images/header_01.png"),
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
  estimate: "estimate",
  trusted: "trusted",
  founders: "founders",
  experience: "experience",
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
