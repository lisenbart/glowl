import { sectionIds, site, scrollToSection } from "@/data/site";

export default function EstimateCTA() {
  return (
    <section id={sectionIds.estimate} className="px-[var(--page-padding)] pb-[var(--section-spacing)]" aria-label="Get an estimate">
      <div className="mx-auto max-w-[1440px]">
        <div className="glass-panel-glow overflow-hidden rounded-[36px] md:rounded-[40px]">
          <div
            className="glass-panel relative overflow-hidden px-6 py-10 text-center md:px-12 md:py-14 md:text-left"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,15,38,0.85) 0%, rgba(20,18,48,0.9) 50%, rgba(13,15,38,0.85) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan/8 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative max-w-2xl">
              <h2 className="font-display text-2xl font-light tracking-[0.06em] text-white md:text-3xl">Have a project in mind?</h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary md:text-[15px]">
                Send us your brief, references or even an early idea. We'll review it and propose the most effective
                production approach.
              </p>

              <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row md:items-start">
                <button
                  type="button"
                  onClick={() => scrollToSection(sectionIds.contact)}
                  className="gradient-button w-full rounded-full px-6 py-3 text-sm font-medium text-white sm:w-auto"
                >
                  Get a Project Estimate
                </button>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm font-light text-text-secondary underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
