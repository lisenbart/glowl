import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { clientExperienceBrands, clientsModalCopy } from "@/data/clientExperience";
import { sectionIds } from "@/data/site";
import { navigateToSection } from "@/lib/routing";

interface ClientsModalProps {
  onClose: () => void;
}

export default function ClientsModal({ onClose }: ClientsModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = clientsModalCopy;

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clients-modal-title"
      aria-describedby="clients-modal-body"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.22 }}
        className="clients-modal-panel modal-panel relative w-full max-w-md overflow-hidden rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="modal-close-btn absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--link-accent)]"
          aria-label={copy.closeLabel}
        >
          <X size={20} />
        </button>

        <div className="px-6 pb-6 pt-8 text-center md:px-8 md:pb-8 md:pt-9">
          <h2
            id="clients-modal-title"
            className="font-display text-xl font-medium tracking-[0.02em] text-text-primary md:text-2xl"
          >
            {copy.title}
          </h2>
          <p
            id="clients-modal-body"
            className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-text-secondary md:text-[15px]"
          >
            {copy.body}
          </p>

          <ul className="clients-modal-list" aria-label="Selected client experience">
            {clientExperienceBrands.map((brand) => (
              <li key={brand} className="clients-modal-item">
                {brand}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="gradient-button btn-on-accent inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
              onClick={() => {
                onClose();
                navigateToSection(sectionIds.contact);
              }}
            >
              {copy.cta}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="estimate-cta-secondary inline-flex items-center justify-center px-6 py-3 text-sm font-medium"
            >
              {copy.closeLabel}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
