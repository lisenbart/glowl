export interface SelectedWorkItem {
  id: string;
  title: string;
  image: string;
}

export const selectedWork: SelectedWorkItem[] = [
  {
    id: "commercial",
    title: "Commercial",
    image: "/images/capabilities/commercial.png",
  },
  {
    id: "gaming",
    title: "Gaming",
    image: "/images/capabilities/gaming.png",
  },
  {
    id: "film-entertainment",
    title: "Film & Entertainment",
    image: "/images/capabilities/film-entertainment.png",
  },
  {
    id: "performance-social",
    title: "Performance & Social",
    image: "/images/capabilities/performance-social.png",
  },
];
