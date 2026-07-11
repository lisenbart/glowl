import { sectionIds, site, scrollToSection } from "@/data/site";

export default function EstimateCTA() {
  return (
    <section id={sectionIds.estimate} className="px-[var(--page-padding)] pb-[var(--section-spacing)]" aria-label="Get an estimate">
      <div className="mx-auto max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner text-center md:text-left">
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
        </article>
      </div>
    </section>
  );
}
