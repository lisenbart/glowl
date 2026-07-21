import { clients } from "@/data/clients";

// Prototype claim data — verify before public launch.
export const clientExperienceProof = {
  projectsLabel: "2000+ projects",
  awardsLabel: "15 awards & 45 selections",
  locationsLabel: "Canada · Ukraine · Poland",
  /**
   * Compact line under Hero founder portraits (legacy).
   * Uses existing prototype claims — verify before public launch.
   */
  heroExperienceLine:
    "20+ years each · 2,000+ projects across our founders' careers · 15 awards & 45 selections · Canada · Ukraine · Poland",
  /** Readable proof facts for the Hero rail — same claims, split for scanability. */
  heroProofFacts: [
    "20+ years each",
    "2,000+ projects across our founders' careers",
    "15 awards & 45 selections",
    "Canada · Ukraine · Poland",
  ],
} as const;

export const clientExperienceCopy = {
  title: "Selected Client Experience",
  lead: "Across our founders’ careers, that standard has shaped commercial and gaming work for these brands.",
} as const;

export const clientExperienceBrands = clients;
