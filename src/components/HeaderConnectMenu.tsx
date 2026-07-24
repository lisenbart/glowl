import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Menu,
  Send,
  X,
} from "lucide-react";
import { sectionIds, site } from "@/data/site";
import { AppLink, navigateToSection, useAppPathname } from "@/lib/routing";
import SocialIconLinks from "./SocialIconLinks";

const panelSpring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

export default function HeaderConnectMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reducedMotion = useReducedMotion();
  const pathname = useAppPathname();
  const isHome = pathname === "/";
  const isServices = pathname === "/services";

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const closeAndFocusTrigger = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndFocusTrigger();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeAndFocusTrigger]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("header-connect-open");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("header-connect-open");
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const resetScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    };
    resetScroll();
    const id = window.requestAnimationFrame(resetScroll);
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  const goHomeTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const panelMotion = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: -8 },
        animate: { opacity: 1, scale: 1, y: 0, transition: panelSpring },
        exit: { opacity: 0, scale: 0.98, y: -6, transition: { duration: 0.16 } },
      };

  return (
    <div ref={rootRef} className="header-connect relative shrink-0 lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        className={`header-connect-trigger${open ? " header-connect-trigger--open" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => {
          if (open) {
            closeAndFocusTrigger();
          } else {
            setOpen(true);
          }
        }}
      >
        <span className="header-connect-trigger-icon" aria-hidden="true">
          {open ? <X size={20} strokeWidth={1.85} /> : <Menu size={20} strokeWidth={1.85} />}
        </span>
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
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              aria-hidden="true"
              onClick={closeAndFocusTrigger}
            />
            <motion.div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="header-connect-panel header-mobile-menu"
              {...panelMotion}
            >
              <div ref={scrollRef} className="header-mobile-menu__scroll">
                <p className="header-connect-panel-label">Navigate</p>
                <nav aria-label="Site">
                  <ul className="header-mobile-menu__list">
                    <li>
                      <AppLink
                        to="/"
                        className={`header-connect-item${isHome ? " header-connect-item--active" : ""}`}
                        ariaCurrent={isHome ? "page" : undefined}
                        onNavigate={() => {
                          goHomeTop();
                          closeAndFocusTrigger();
                        }}
                      >
                        <span className="header-connect-item-copy">
                          <span className="header-connect-item-title">Home</span>
                        </span>
                        <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        to="/services"
                        className={`header-connect-item${isServices ? " header-connect-item--active" : ""}`}
                        ariaCurrent={isServices ? "page" : undefined}
                        onNavigate={() => {
                          window.scrollTo({ top: 0 });
                          closeAndFocusTrigger();
                        }}
                      >
                        <span className="header-connect-item-copy">
                          <span className="header-connect-item-title">Services</span>
                        </span>
                        <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
                      </AppLink>
                    </li>
                    <li>
                      <a
                        href={`#${sectionIds.contact}`}
                        className="header-connect-item"
                        onClick={(event) => {
                          event.preventDefault();
                          close();
                          window.requestAnimationFrame(() => {
                            navigateToSection(sectionIds.contact);
                            triggerRef.current?.focus();
                          });
                        }}
                      >
                        <span className="header-connect-item-copy">
                          <span className="header-connect-item-title">Contact</span>
                        </span>
                        <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="header-connect-divider" aria-hidden="true" />

                <p className="header-connect-panel-label">Connect</p>
                <ul className="header-mobile-menu__list">
                  {site.email ? (
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="header-connect-item header-connect-item--email"
                        onClick={closeAndFocusTrigger}
                      >
                        <span className="header-connect-item-icon" aria-hidden="true">
                          <Send size={17} strokeWidth={1.75} />
                        </span>
                        <span className="header-connect-item-copy">
                          <span className="header-connect-item-title">Email</span>
                          <span className="header-connect-item-sub">{site.email}</span>
                        </span>
                        <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a
                        href={`#${sectionIds.contact}`}
                        className="header-connect-item header-connect-item--email"
                        onClick={(event) => {
                          event.preventDefault();
                          close();
                          window.requestAnimationFrame(() => {
                            navigateToSection(sectionIds.contact);
                            triggerRef.current?.focus();
                          });
                        }}
                      >
                        <span className="header-connect-item-icon" aria-hidden="true">
                          <Send size={17} strokeWidth={1.75} />
                        </span>
                        <span className="header-connect-item-copy">
                          <span className="header-connect-item-title">Start a Project</span>
                          <span className="header-connect-item-sub">Contact form</span>
                        </span>
                        <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  )}
                </ul>
                <SocialIconLinks
                  className="mt-2"
                  layout="stack"
                  size="md"
                  onItemClick={closeAndFocusTrigger}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
