import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "GLOWL WORKS",
  brand: "GLOWL",
  tagline: {
    line1: "Creative partner for",
    line2: "brands, games and new worlds",
  },
  hero: {
    eyebrow: "Cinematic production for brands, games and entertainment.",
    headline: "Every Process. One Standard.",
    paragraph:
      "Whether handcrafted, fully AI-generated, or somewhere in between, every project is shaped by experienced directors and producers from first idea to final frame.",
  },
  aiPositioningLine:
    "AI can expand visual development, build worlds, create individual sequences, or produce a complete film. For each brief, experienced directors and producers define its role and lead every creative and production decision.",
  clientsModal: {
    title: "Selected Client Experience",
    body: "Brands our founders have delivered for across commercial and gaming work.",
    closeLabel: "Close",
    cta: "Get a Project Estimate",
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
    title: "GLOWL — Cinematic Production for Brands, Games and New Worlds",
    description:
      "GLOWL creates commercials, brand films, game trailers, cinematics and AI-assisted visual production for brands, agencies, game teams and producers.",
    ogImage: publicAsset("/images/header_01.png"),
  },
  organizationDescription: "Cinematic production studio for commercials, games and new worlds.",
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
