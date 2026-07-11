import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionIds, scrollToSection } from "@/data/site";

import { publicAsset } from "@/lib/publicAsset";

const navLinks = [
  { id: sectionIds.work, label: "Work" },
  { id: sectionIds.services, label: "Services" },
  { id: sectionIds.process, label: "Process" },
  { id: sectionIds.contact, label: "Contact" },
];

function NavLink({
  id,
  label,
  onNavigate,
  className,
}: {
  id: string;
  label: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(id, onNavigate);
      }}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const goEstimate = () => scrollToSection(sectionIds.contact, closeMenu);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className="transition-all duration-300"
        style={{
          background: scrolled ? "rgba(3, 5, 16, 0.88)" : "rgba(3, 5, 16, 0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex min-h-16 max-w-[1440px] items-center gap-3 px-[var(--page-padding)] py-3 md:gap-4">
          <a
            href="#top"
            className="relative z-10 flex min-w-0 shrink-0 items-center gap-2.5 md:gap-4"
            aria-label="GLOWL home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src={publicAsset("/logos/glowl-logo-white.png")}
              alt="GLOWL"
              className="h-[1.925rem] w-auto shrink-0 object-contain md:h-[2.2rem]"
              width={2100}
              height={795}
            />
            <span
              className="font-sans hidden flex-col justify-center gap-px leading-none text-white/55 uppercase sm:flex"
              style={{
                fontSize: "clamp(7px, 1.05vw, 10px)",
                letterSpacing: "0.14em",
                maxHeight: "2.2rem",
              }}
            >
              <span className="whitespace-nowrap">Creative partner for</span>
              <span className="whitespace-nowrap">AI-era moving image</span>
            </span>
          </a>

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  id={link.id}
                  label={link.label}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white/65 transition-colors hover:text-white xl:px-4 xl:text-[13px]"
                />
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-2.5">
            <button
              type="button"
              onClick={goEstimate}
              className="gradient-button whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-medium tracking-wide text-white sm:px-4 sm:text-[11px] md:px-5 md:text-xs lg:text-sm"
            >
              <span className="sm:hidden">Estimate</span>
              <span className="hidden sm:inline">Get a Project Estimate</span>
            </button>

            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center text-white lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
              style={{ background: "rgba(3, 5, 16, 0.95)" }}
            >
              <ul className="flex flex-col gap-1 px-[var(--page-padding)] py-5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <NavLink
                      id={link.id}
                      label={link.label}
                      onNavigate={closeMenu}
                      className="block py-3 text-left text-[13px] font-medium uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
