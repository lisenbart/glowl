export type FounderPerson = {
  id: string;
  name: string;
  role: string;
  /** Visible trust fact — used in profiles/popovers, not repeated as competing Hero lines */
  fact: string;
  initials: string;
  /** Optional portrait path under /public; when absent, initials avatar is used */
  photo?: string;
  /** Optional looping portrait video (preferred over photo in hero) */
  video?: string;
  /** Colour plate / popover shadow — matches hero portrait accent */
  accent?: "cyan" | "green" | "magenta" | "coral";
  modalTitle: string;
  modalBody: string;
};

export type ContactNextStep = {
  id: string;
  title: string;
  description: string;
};

export const foundersSection = {
  title: "The Team Behind the Work",
} as const;

/** Co-founders shown in the Hero composition. */
export const heroFounders: FounderPerson[] = [
  {
    id: "adrian-sakhaltuev",
    name: "Adrian Sakhaltuev",
    role: "Director & Co-Founder",
    fact: "20+ years in animation · 1000+ projects delivered",
    initials: "AS",
    photo: "/images/founders/adrian-sakhaltuev.png",
    video: "/images/founders/adrian-sakhaltuev.mp4",
    accent: "cyan",
    modalTitle: "Adrian Sakhaltuev",
    modalBody:
      "20+ years in animation, film and commercial production — with 1000+ projects delivered across his career. At GLOWL he leads creative direction: the final call on what looks right before anything ships.",
  },
  {
    id: "dmytro-lisenbart",
    name: "Dmytro Lisenbart",
    role: "Executive Producer & Co-Founder",
    fact: "20+ years in producing · 1000+ projects delivered",
    initials: "DL",
    photo: "/images/founders/dmytro-lisenbart.png",
    video: "/images/founders/dmytro-lisenbart.mp4",
    accent: "green",
    modalTitle: "Dmytro Lisenbart",
    modalBody:
      "20+ years in producing across film and commercial production — with 1000+ projects delivered and 15 awards & 45 selections across his career. At GLOWL he runs production: turning briefs into delivered work, not just ideas.",
  },
];

/** Contact left panel — what happens after a brief is submitted. */
export const contactNextSteps: ContactNextStep[] = [
  {
    id: "review-brief",
    title: "We review the brief.",
    description: "We look at your goals, references and deliverables.",
  },
  {
    id: "shape-approach",
    title: "We shape the approach.",
    description: "We define the right production route and the specialists the project requires.",
  },
  {
    id: "clear-proposal",
    title: "You receive a clear proposal.",
    description: "Scope, schedule and estimate — with a clear next step.",
  },
];

export const contactSupportCopy = {
  heading: "What Happens Next",
  lead: "Tell us what you're making. Our production team will review the brief and come back with a clear next step.",
} as const;

/** @deprecated Prefer heroFounders — full list retained for profile tooling. */
export const founders: FounderPerson[] = heroFounders;
