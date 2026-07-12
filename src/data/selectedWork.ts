export interface SelectedWorkItem {
  id: string;
  title: string;
  category: string;
  deliverable: string;
}

export const selectedWork: SelectedWorkItem[] = [
  {
    id: "brand-launch",
    title: "Brand Launch Film",
    category: "Commercial / Brand Film",
    deliverable: "Hero film, social cutdowns, launch assets",
  },
  {
    id: "game-trailer",
    title: "Game Cinematic Trailer",
    category: "Games / Cinematics",
    deliverable: "Trailer direction, cinematic edit, campaign variants",
  },
  {
    id: "product-motion",
    title: "Product Animation System",
    category: "Product / Motion",
    deliverable: "Product visuals, explainers, performance assets",
  },
  {
    id: "title-sequence",
    title: "Title Sequence",
    category: "Film / Entertainment",
    deliverable: "Opening titles, visual language, motion package",
  },
  {
    id: "playable-ads",
    title: "Playable Ad Pack",
    category: "Games / Performance",
    deliverable: "Gameplay creatives, playable ad variants, social assets",
  },
  {
    id: "music-video",
    title: "Music Video",
    category: "Entertainment",
    deliverable: "Concept, AI-assisted production, final edit",
  },
];
