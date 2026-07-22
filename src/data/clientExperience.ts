import { clients } from "@/data/clients";

export const clientExperienceProof = {
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
