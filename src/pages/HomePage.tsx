import { useEffect } from "react";
import LatestWorkSection from "@/components/LatestWorkSection";
import BrandStripSection from "@/components/BrandStripSection";
import ShowreelSection from "@/components/ShowreelSection";
import AiPositioningSection from "@/components/AiPositioningSection";
import ContactForm from "@/components/ContactForm";
import FoundersSection from "@/components/FoundersSection";
import { scrollToSection } from "@/data/site";

export default function HomePage() {
  useEffect(() => {
    let target = "";
    try {
      target = sessionStorage.getItem("glowl-scroll-section") || "";
      if (target) sessionStorage.removeItem("glowl-scroll-section");
    } catch {
      /* ignore */
    }
    if (!target) {
      target = window.location.hash.replace(/^#/, "");
    }
    if (!target) return;
    const id = window.setTimeout(() => scrollToSection(target), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="site-main site-main-stack site-main--home">
      <LatestWorkSection />
      <BrandStripSection />
      <ShowreelSection />
      <AiPositioningSection />
      <ContactForm />
      <FoundersSection />
    </main>
  );
}
