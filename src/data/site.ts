import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "GLOWL WORKS",
  brand: "GLOWL",
  tagline: {
    line1: "Creative partner for",
    line2: "brands, games and new worlds",
  },
  hero: {
    headlineLine1: "Films, games and brand worlds",
    headlineLine2BeforeAccent: "brought to ",
    headlineAccent: "light",
    paragraph:
      "Commercials, game trailers and cinematic content shaped by experienced artists, directors and producers — with AI used where it helps the work move faster without losing the eye.",
    audienceLine: "For brands, agencies, game teams, producers and entertainment projects.",
  },
  aiPositioningLine: "AI helps us move faster. Directors, artists and producers keep the work sharp.",
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
  locations: "Warsaw · Ukraine · Canada",
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
  process: "process",
  contact: "contact",
  estimate: "estimate",
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
