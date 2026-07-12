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
  { id: "playable", label: "Game trailers and playable ads" },
  { id: "social", label: "Social campaign assets" },
  { id: "music", label: "Music videos" },
  { id: "titles", label: "Title sequences" },
  { id: "motion", label: "Motion design and VFX" },
  { id: "ai", label: "AI-assisted visual production" },
];

export const projectTypes = [
  "Commercial Animation",
  "Gaming & Interactive",
  "Game Trailers & Playable Ads",
  "Gameplay Creatives",
  "Performance Creatives",
  "Film & Entertainment",
  "Music Video",
  "Motion Design",
  "Other",
] as const;
