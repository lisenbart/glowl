import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Film,
  Gamepad2,
  Music,
  Sparkles,
  Tv,
  Wand2,
} from "lucide-react";

export interface StripService {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
}

export const stripServices: StripService[] = [
  { id: "commercial", label: "Commercial Animation", icon: Sparkles, accent: "var(--cyan)" },
  { id: "gaming", label: "Gaming Videos", icon: Gamepad2, accent: "var(--violet)" },
  { id: "gambling", label: "Gambling Videos", icon: Tv, accent: "var(--magenta)" },
  { id: "cinema", label: "Cinema", icon: Clapperboard, accent: "var(--pink)" },
  { id: "music", label: "Music Videos", icon: Music, accent: "var(--cyan)" },
  { id: "motion", label: "Motion Design", icon: Wand2, accent: "var(--magenta)" },
  { id: "brand", label: "Brand Films", icon: Film, accent: "var(--orange)" },
];
