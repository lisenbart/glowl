import { site, sectionIds, scrollToSection } from "@/data/site";

/** Short brand strip between Latest Work and Showreel — not a full hero. */
export default function BrandStripSection() {
  return (
    <section
      className="brand-strip scroll-mt-24 px-[var(--page-padding)]"
      aria-label="About GLOWL"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1100px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner brand-strip__inner">
            {site.tagline ? (
              <p className="hero-eyebrow hero-eyebrow--banner hero-eyebrow--lead brand-strip__eyebrow">
                {site.tagline}
              </p>
            ) : null}
            <h2 className="brand-strip__headline font-display">
              <span className="hero-headline__line">Every Process.</span>{" "}
              <span className="hero-headline__line">One Standard.</span>
            </h2>
            <p className="brand-strip__copy how-support-line">{site.hero.paragraph}</p>
            <div className="brand-strip__cta">
              <button
                type="button"
                className="gradient-button btn-on-accent px-5 py-3 text-sm font-medium"
                onClick={() => scrollToSection(sectionIds.contact)}
              >
                Start a Project
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
