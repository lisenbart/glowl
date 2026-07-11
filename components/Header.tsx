"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-[var(--page-padding)] pt-4 md:pt-5">
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 md:px-6 md:py-3 ${
          scrolled
            ? "border-white/10 bg-black/50 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-white/8 bg-black/30 backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <Link href="#" className="relative flex shrink-0 items-center" aria-label="GLOWL WORKS home">
          <Image
            src="/logos/glowl-logo.png"
            alt="GLOWL WORKS"
            width={120}
            height={32}
            className="h-6 w-auto object-contain md:h-7"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-light tracking-wide text-white/90 transition-colors hover:bg-white/5 hover:text-white hover:drop-shadow-[0_0_8px_rgba(66,217,255,0.5)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1440px] overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col p-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-2xl px-4 py-3.5 text-sm font-light tracking-wide text-white/90 transition-colors hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
