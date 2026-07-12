import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, ContactRound, Send, X } from "lucide-react";
import { site } from "@/data/site";
import SocialIconLinks from "./SocialIconLinks";

const panelSpring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

export default function HeaderConnectMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reducedMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("header-connect-open");
    return () => document.body.classList.remove("header-connect-open");
  }, [open]);

  const panelMotion = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.88, y: -10 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { ...panelSpring, staggerChildren: 0.045, delayChildren: 0.04 } },
        exit: { opacity: 0, scale: 0.94, y: -6, transition: { duration: 0.16 } },
      };

  const itemMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: 14 },
        animate: { opacity: 1, x: 0, transition: panelSpring },
        exit: { opacity: 0, x: 8, transition: { duration: 0.12 } },
      };

  return (
    <div ref={rootRef} className="header-connect relative shrink-0 lg:hidden">
      <button
        type="button"
        className={`header-connect-trigger${open ? " header-connect-trigger--open" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-label={open ? "Close connect menu" : "Open connect menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <motion.span
          className="header-connect-trigger-icon"
          animate={{ rotate: open ? 90 : 0, scale: open ? 0.92 : 1 }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 28 }}
          aria-hidden="true"
        >
          {open ? <X size={18} strokeWidth={1.85} /> : <ContactRound size={18} strokeWidth={1.85} />}
        </motion.span>
        <span className="header-connect-trigger-glow" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="header-connect-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              aria-hidden="true"
              onClick={close}
            />
            <motion.div
              id={panelId}
              role="menu"
              aria-label="Connect with GLOWL"
              className="header-connect-panel"
              {...panelMotion}
            >
              <motion.p className="header-connect-panel-label" {...itemMotion}>
                Connect
              </motion.p>

              <motion.a
                role="menuitem"
                href={`mailto:${site.email}`}
                className="header-connect-item header-connect-item--email"
                onClick={close}
                {...itemMotion}
              >
                <span className="header-connect-item-icon" aria-hidden="true">
                  <Send size={17} strokeWidth={1.75} />
                </span>
                <span className="header-connect-item-copy">
                  <span className="header-connect-item-title">Email</span>
                  <span className="header-connect-item-sub">{site.email}</span>
                </span>
                <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
              </motion.a>

              <motion.div className="header-connect-divider" {...itemMotion} aria-hidden="true" />

              <motion.div {...itemMotion}>
                <SocialIconLinks layout="stack" size="md" onItemClick={close} className="header-connect-social" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
