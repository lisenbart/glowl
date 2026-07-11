import { useEffect, useState } from "react";
import { sectionIds, scrollToSection } from "@/data/site";

export default function MobileEstimateCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.65);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#030510]/90 px-4 py-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={() => scrollToSection(sectionIds.contact)}
        className="gradient-button w-full rounded-full py-3 text-sm font-medium text-white"
      >
        Get an Estimate
      </button>
    </div>
  );
}
