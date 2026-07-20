import type { LucideIcon } from "lucide-react";
import {
  Box,
  Brain,
  Clapperboard,
  Film,
  Gamepad2,
  Megaphone,
  Music,
  Type,
} from "lucide-react";

export interface StripService {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
}

export const stripServices: StripService[] = [
  { id: "commercials", label: "Commercials", icon: Megaphone, accent: "var(--cyan)" },
  { id: "brand-films", label: "Brand Films", icon: Film, accent: "var(--orange)" },
  { id: "game-trailers", label: "Game Trailers", icon: Gamepad2, accent: "var(--violet)" },
  { id: "cinematics", label: "Cinematics", icon: Clapperboard, accent: "var(--pink)" },
  { id: "product", label: "Product Animation", icon: Box, accent: "var(--magenta)" },
  { id: "titles", label: "Title Sequences", icon: Type, accent: "var(--cyan)" },
  { id: "music", label: "Music Videos", icon: Music, accent: "var(--violet)" },
  { id: "ai", label: "AI Production", icon: Brain, accent: "var(--magenta)" },
];
