export interface Project {
  id: string;
  title: string;
  type: string;
  year: string;
}

export const projectsByCategory: Record<string, Project[]> = {
  commercial: [
    { id: "c1", title: "Luxury Product Launch Film", type: "Brand Film", year: "2025" },
    { id: "c2", title: "Global Campaign Series", type: "Commercial", year: "2024" },
    { id: "c3", title: "Social Content System", type: "Campaign Assets", year: "2024" },
  ],
  gaming: [
    { id: "g1", title: "Game Launch Trailer", type: "Cinematic Trailer", year: "2025" },
    { id: "g2", title: "UA Performance Creatives", type: "Gameplay Ads", year: "2024" },
    { id: "g3", title: "Mobile Performance Pack", type: "Performance Creatives", year: "2024" },
  ],
  film: [
    { id: "f1", title: "Short Film — Neon District", type: "Concept Film", year: "2025" },
    { id: "f2", title: "Artist Music Video", type: "Music Video", year: "2024" },
    { id: "f3", title: "Series Title Sequence", type: "Title Design", year: "2023" },
  ],
};

export const categoryLabels: Record<string, string> = {
  commercial: "Commercial Animation",
  gaming: "Gaming & Interactive",
  film: "Film & Entertainment",
};
