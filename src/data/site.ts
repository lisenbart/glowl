export const site = {
  name: "GLOWL WORKS",
  email: "hello@glowlworks.com",
  linkedin: "https://linkedin.com/company/glowlworks",
  vimeo: "https://vimeo.com/glowlworks",
  youtube: "https://youtube.com/@glowlworks",
  locations: "Warsaw · Ukraine · Canada",
  canonical: "https://glowlworks.com",
  meta: {
    title: "GLOWL WORKS — Commercial, Gaming and Cinematic Video Production",
    description:
      "GLOWL WORKS creates commercials, product animation, game trailers, gameplay creatives and cinematic content for brands, agencies, game teams and producers.",
    ogImage: "/images/header_01.png",
  },
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
    onDone?.();
  }
}
