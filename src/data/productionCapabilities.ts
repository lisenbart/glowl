export type ProductionCapability = {
  id: string;
  title: string;
  description: string;
};

export const productionCapabilitiesSection = {
  title: "Production Capabilities",
  lead: "Every project brings together the disciplines its idea and delivery require.",
} as const;

export const productionCapabilities: ProductionCapability[] = [
  {
    id: "creative-development",
    title: "Creative Development",
    description: "Concepts, treatments, scripts, storyboards and visual development.",
  },
  {
    id: "direction",
    title: "Direction",
    description: "Creative leadership across design, performance, animation and production.",
  },
  {
    id: "animation-design",
    title: "Animation & Design",
    description: "2D, 3D, motion design and mixed-media production.",
  },
  {
    id: "ai-production",
    title: "AI Production",
    description: "AI-generated sequences, complete films and hybrid workflows shaped around the brief.",
  },
  {
    id: "vfx-post",
    title: "VFX & Post",
    description: "Editing, compositing, colour, sound and final finishing.",
  },
  {
    id: "delivery-adaptation",
    title: "Delivery & Adaptation",
    description: "Final assets prepared for every agreed format, platform and market.",
  },
];
