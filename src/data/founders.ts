export type FounderPerson = {
  id: string;
  name: string;
  role: string;
  fact: string;
  initials: string;
  photo?: string;
  video?: string;
  accent?: "cyan" | "green" | "magenta" | "coral";
  modalTitle: string;
  modalBody: string;
};

export type ContactNextStep = {
  id: string;
  title: string;
  description: string;
};

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
      "I usually know we’ve found the right direction when every choice starts belonging to the same world. My job is to find that visual language early and protect it through to the final frame.",
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
      "A good production gives an idea room to become real. I shape the route, bring in the right people, and make sure the ambition carries through every practical decision all the way to delivery.",
  },
];

/** Contact left panel — what happens after a brief is submitted. */
export const contactNextSteps: ContactNextStep[] = [
  {
    id: "review-brief",
    title: "Your brief comes first.",
    description: "Goals, references and deliverables give the idea a clear foundation.",
  },
  {
    id: "shape-approach",
    title: "The approach takes shape.",
    description: "The project determines its production route and the specialists it needs.",
  },
  {
    id: "clear-proposal",
    title: "A clear proposal follows.",
    description: "You receive the scope, schedule, estimate and a clear way forward.",
  },
];

export const contactSupportCopy = {
  heading: "What Happens Next",
  lead: "Tell us where the idea stands today. A brief is enough to begin.",
} as const;
