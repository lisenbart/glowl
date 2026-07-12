import { sectionIds, site, scrollToSection } from "@/data/site";

export default function EstimateCTA() {
  return (
    <section id={sectionIds.estimate} className="estimate-cta px-[var(--page-padding)]" aria-label="Get an estimate">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card min-w-0 max-w-full">
          <div className="how-ios-card-inner text-center">
            <h2 className="section-heading">Have a project in mind?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-text-secondary md:text-[15px]">
              Send us your brief, references or even an early idea. We'll review it and propose the most effective
              production approach.
            </p>

            <div className="estimate-cta-actions mt-7 flex w-full min-w-0 max-w-full flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
              <button
                type="button"
                onClick={() => scrollToSection(sectionIds.contact)}
                className="gradient-button btn-on-accent w-full min-w-0 max-w-full rounded-full px-5 py-3 text-sm font-medium md:w-auto md:px-6"
              >
                Get a Project Estimate
              </button>
              <a
                href={`mailto:${site.email}`}
                className="estimate-cta-secondary w-full min-w-0 max-w-full md:w-auto"
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
