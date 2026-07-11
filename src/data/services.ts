export interface Deliverable {
  id: string;
  label: string;
  featured?: boolean;
}

export const deliverables: Deliverable[] = [
  { id: "commercials", label: "Commercials and brand films", featured: true },
  { id: "product", label: "Product animation" },
  { id: "trailers", label: "Game trailers and cinematics", featured: true },
  { id: "gameplay", label: "Gameplay and performance creatives", featured: true },
  { id: "gambling", label: "Gambling videos" },
  { id: "social", label: "Social campaign assets" },
  { id: "music", label: "Music videos" },
  { id: "titles", label: "Title sequences" },
  { id: "motion", label: "Motion design and VFX" },
  { id: "ai", label: "AI-assisted visual production" },
];

export const projectTypes = [
  "Commercial Animation",
  "Gaming Video",
  "Gambling Video",
  "Film & Entertainment",
  "Music Video",
  "Motion Design",
  "Other",
] as const;
