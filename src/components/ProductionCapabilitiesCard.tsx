import { selectedWork } from "@/data/selectedWork";
import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, site } from "@/data/site";
import { navigateToSection } from "@/lib/routing";

export default function ProductionCapabilitiesCard() {
  return (
    <article className="how-ios-card" aria-label="Production capabilities">
      <div className="how-ios-card-inner">
        <div className="section-card-header">
          <h2 className="how-col-title how-col-title-cyan section-card-header__title">
            Production capabilities
          </h2>
          <p className="section-card-header__lead how-support-line">
            Advertising and gaming production first — with film and social where the brief calls for it.
          </p>
        </div>

        <ul className="capability-grid">
          {selectedWork.map((item) => (
            <li
              key={item.id}
              className={`capability-card${item.featured ? " capability-card--featured" : ""}${item.secondary ? " capability-card--secondary" : ""}`}
            >
              <div className="capability-media">
                <img
                  src={publicAsset(item.image)}
                  alt=""
                  className="capability-image"
                  loading="lazy"
                />
                <div className="capability-scrim" aria-hidden="true" />
                <h3 className="capability-title">
                  <span>{item.title}</span>
                </h3>
              </div>
              <div className="capability-body">
                <p className="capability-description">{item.description}</p>
                <ul className="capability-formats" aria-label={`${item.title} formats`}>
                  {item.formats.map((format) => (
                    <li key={format} className="capability-format-tag">
                      {format}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div id={sectionIds.estimate} className="capability-cta scroll-mt-24" aria-label="Get an estimate">
          <h3 className="capability-cta-title">Have a project in mind?</h3>
          <p className="capability-cta-text">
            Send us your brief, references or even an early idea. We'll read it and come back with a clear plan.
          </p>

          <div className="estimate-cta-actions mt-7 flex w-full min-w-0 max-w-full flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
            <button
              type="button"
              onClick={() => navigateToSection(sectionIds.contact)}
              className="gradient-button btn-on-accent w-full min-w-0 max-w-full rounded-full px-5 py-3 text-sm font-medium md:w-auto md:px-6"
            >
              Get a Project Estimate
            </button>
            <a href={`mailto:${site.email}`} className="estimate-cta-secondary w-full min-w-0 max-w-full md:w-auto">
              Email Us Directly
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
