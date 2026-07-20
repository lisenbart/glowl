import { productionDirections, productionDirectionsSection } from "@/data/productionDirections";
import { AppLink } from "@/lib/routing";
import DirectionCard from "./DirectionCard";

type Props = {
  showCta?: boolean;
};

export default function ProductionDirectionsSection({ showCta = true }: Props) {
  return (
    <section
      className="production-directions scroll-mt-24 px-[var(--page-padding)]"
      aria-label={productionDirectionsSection.title}
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                {productionDirectionsSection.title}
              </h2>
              <p className="section-card-header__lead how-support-line">
                {productionDirectionsSection.lead}
              </p>
            </div>

            <ul className="direction-grid">
              {productionDirections.map((direction) => (
                <DirectionCard key={direction.id} direction={direction} />
              ))}
            </ul>

            {showCta ? (
              <div className="production-directions__cta">
                <AppLink
                  to="/services"
                  className="gradient-button-emerald btn-on-accent inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
                  onNavigate={() => window.scrollTo({ top: 0 })}
                >
                  {productionDirectionsSection.cta}
                </AppLink>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
