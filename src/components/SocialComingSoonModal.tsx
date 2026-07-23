import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { sectionIds, site } from "@/data/site";
import { navigateToSection } from "@/lib/routing";

interface SocialComingSoonModalProps {
  channelLabel: string;
  onClose: () => void;
}

export default function SocialComingSoonModal({ channelLabel, onClose }: SocialComingSoonModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = site.socialComingSoon;

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
      aria-labelledby="social-coming-soon-title"
      aria-describedby="social-coming-soon-body"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.22 }}
        className="social-coming-soon-panel modal-panel relative w-full max-w-md overflow-hidden rounded-[20px]"
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
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">{channelLabel}</p>
          <h2 id="social-coming-soon-title" className="mt-3 font-display text-xl font-medium tracking-[0.02em] text-text-primary md:text-2xl">
            {copy.title}
          </h2>
          <p id="social-coming-soon-body" className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-text-secondary md:text-[15px]">
            {copy.body}
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.setTimeout(() => navigateToSection(sectionIds.contact), 50);
              }}
              className="gradient-button btn-on-accent inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              <Send size={16} strokeWidth={1.75} aria-hidden="true" />
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
