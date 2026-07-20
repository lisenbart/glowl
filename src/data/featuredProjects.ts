export type FeaturedProject = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  role: string;
  /** Temporary prototype image path under /public */
  image: string;
  isPlaceholder: true;
};

export const featuredProjectsSection = {
  title: "Selected Work",
  lead: "A closer look at the ideas, craft and production decisions behind the work.",
} as const;

/**
 * Future case-study templates — not rendered on Home.
 * Replace with real projects after site approval.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "advertising-template",
    eyebrow: "Advertising",
    title: "Project title",
    summary: "A concise project story will introduce the brief, creative approach and final result.",
    role: "Creative Direction · Production · Animation",
    image: "/images/capabilities/commercial.png", // temporary prototype media
    isPlaceholder: true,
  },
  {
    id: "gaming-template",
    eyebrow: "Gaming",
    title: "Project title",
    summary: "A concise project story will introduce the brief, creative approach and final result.",
    role: "Creative Direction · Production · Game Content",
    image: "/images/capabilities/gaming.png", // temporary prototype media
    isPlaceholder: true,
  },
  {
    id: "film-template",
    eyebrow: "Film & Entertainment",
    title: "Project title",
    summary: "A concise project story will introduce the brief, creative approach and final result.",
    role: "Direction · Production · Animation",
    image: "/images/capabilities/film-entertainment.png", // temporary prototype media
    isPlaceholder: true,
  },
];
