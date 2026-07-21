import {
  clientExperienceBrands,
  clientExperienceCopy,
} from "@/data/clientExperience";
import { sectionIds } from "@/data/site";

function BrandRow({ groupId, brands }: { groupId: string; brands: readonly string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {brands.map((brand) => (
        <div key={`${groupId}-${brand}`} className="flex shrink-0 items-center">
          <span className="trusted-by__item whitespace-nowrap px-2 md:px-2.5">{brand}</span>
          <span className="strip-service-dot trusted-by__dot mx-3 h-1 w-1 shrink-0 rounded-full md:mx-4" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

/** Client experience label + marquee — used under the Hero. */
export function ClientExperienceBlock({ compact = false }: { compact?: boolean }) {
  const brands = clientExperienceBrands;

  return (
    <div
      className={`client-experience-block${compact ? " client-experience-block--hero" : ""}`}
    >
      <div className="client-experience-block__header">
        <p className="trusted-by__label">{clientExperienceCopy.title}</p>
        <p className="client-experience-block__lead how-support-line">{clientExperienceCopy.lead}</p>
      </div>

      <div
        id={sectionIds.trusted}
        className="trusted-by trusted-by--in-card trusted-by--marquee scroll-mt-24"
        aria-label={clientExperienceCopy.title}
      >
        <div className="trusted-by__marquee strip-marquee-viewport overflow-hidden">
          <div className="strip-marquee-clip">
            <div className="strip-marquee-track">
              <BrandRow groupId="a" brands={brands} />
              <BrandRow groupId="b" brands={brands} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Standalone Client Experience section — not mounted on Home.
 * Retained for a future dedicated layout if needed.
 */
export default function ClientExperienceSection() {
  return (
    <section
      id={sectionIds.experience}
      className="client-experience scroll-mt-24 px-[var(--page-padding)]"
      aria-label={clientExperienceCopy.title}
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <ClientExperienceBlock />
          </div>
        </article>
      </div>
    </section>
  );
}
