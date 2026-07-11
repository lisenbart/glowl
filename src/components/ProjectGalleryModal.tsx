import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { categoryLabels, projectsByCategory, type Project } from "@/data/projects";

interface ProjectGalleryModalProps {
  category: string;
  onClose: () => void;
}

export default function ProjectGalleryModal({ category, onClose }: ProjectGalleryModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const projects: Project[] = projectsByCategory[category] ?? [];
  const title = categoryLabels[category] ?? "Projects";

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} projects`}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-[28px] border border-white/15 bg-[#0a0c1a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="font-display text-base font-light tracking-[0.04em] text-white">{title}</h3>
            <p className="text-xs font-light text-text-secondary">Selected project examples</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10"
            aria-label="Close projects"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="max-h-[60vh] overflow-y-auto p-4">
          {projects.map((p) => (
            <li
              key={p.id}
              className="mb-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 last:mb-0"
            >
              <p className="text-sm font-light text-white">{p.title}</p>
              <p className="mt-1 text-xs font-light text-text-secondary">
                {p.type} · {p.year}
              </p>
            </li>
          ))}
        </ul>

        <p className="border-t border-white/8 px-5 py-3 text-[11px] font-light text-text-secondary/60">
          Placeholder gallery — replace with final project pages or case studies.
        </p>
      </motion.div>
    </motion.div>
  );
}
