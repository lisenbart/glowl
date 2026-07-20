import { clients } from "@/data/clients";

// Prototype claim data — verify before public launch.
export const clientExperienceProof = {
  projectsLabel: "2000+ projects",
  awardsLabel: "15 awards & 45 selections",
  locationsLabel: "Canada · Ukraine · Poland",
  /**
   * Compact line under Hero founder portraits.
   * Uses existing prototype claims — verify before public launch.
   */
  heroExperienceLine:
    "20+ years each · Experience across 2,000+ projects · 15 awards & 45 selections · Canada · Ukraine · Poland",
} as const;

export const clientExperienceCopy = {
  title: "Selected Client Experience",
  lead: "Brands our founders have delivered for across commercial and gaming work.",
} as const;

export const clientExperienceBrands = clients;

export const clientsModalCopy = {
  title: "Selected Client Experience",
  body: "Brands our founders have delivered for across commercial and gaming work.",
  closeLabel: "Close",
  cta: "Get a Project Estimate",
} as const;
