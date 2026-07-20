export type FounderPerson = {
  id: string;
  name: string;
  role: string;
  /** Visible trust fact under the role — always shown, no click needed */
  fact: string;
  initials: string;
  /** Optional portrait path under /public; when absent, initials avatar is used */
  photo?: string;
  modalTitle: string;
  modalBody: string;
  /** True when copy is a temporary TODO placeholder */
  placeholder?: boolean;
};

export const foundersSection = {
  title: "The People Behind It",
} as const;

export const proofStrip = {
  projectsLabel: "2000+ projects",
  awardsLabel: "15 awards & 45 selections",
  locationsLabel: "Canada · Ukraine · Poland",
} as const;

/**
 * Order: Adrian, Dmytro, then open-role hiring cards.
 */
export const founders: FounderPerson[] = [
  {
    id: "adrian-sakhaltuev",
    name: "Adrian Sakhaltuev",
    role: "Head Director",
    fact: "20+ years in animation · 1000+ projects delivered",
    initials: "AS",
    photo: "/images/founders/adrian-sakhaltuev.png",
    modalTitle: "Adrian Sakhaltuev",
    modalBody:
      "20+ years in animation, film and commercial production — with 1000+ projects delivered across his career. At GLOWL he leads creative direction: the final call on what looks right before anything ships.",
  },
  {
    id: "dmytro-lisenbart",
    name: "Dmytro Lisenbart",
    role: "General Producer",
    fact: "20+ years in producing · 1000+ projects delivered",
    initials: "DL",
    photo: "/images/founders/dmytro-lisenbart.png",
    modalTitle: "Dmytro Lisenbart",
    modalBody:
      "20+ years in producing across film and commercial production — with 1000+ projects delivered and 15 awards & 45 selections across his career. At GLOWL he runs production: turning briefs into delivered work, not just ideas.",
  },
  {
    id: "line-producer",
    name: "Line Producer",
    role: "",
    fact: "We're hiring for this role.",
    initials: "",
    modalTitle: "Line Producer",
    modalBody: "We're hiring for this role.",
    placeholder: true,
  },
  {
    id: "client-manager",
    name: "Client Manager",
    role: "",
    fact: "We're hiring for this role.",
    initials: "",
    modalTitle: "Client Manager",
    modalBody: "We're hiring for this role.",
    placeholder: true,
  },
];
