import {
  productionCapabilities,
  productionCapabilitiesSection,
} from "@/data/productionCapabilities";

function CapabilityItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="capability-item">
      <h3 className="capability-item__title">{title}</h3>
      <p className="capability-item__description">{description}</p>
    </li>
  );
}

export default function ProductionCapabilitiesSection() {
  return (
    <section
      className="production-capabilities scroll-mt-24 px-[var(--page-padding)]"
      aria-label={productionCapabilitiesSection.title}
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                {productionCapabilitiesSection.title}
              </h2>
              <p className="section-card-header__lead how-support-line">
                {productionCapabilitiesSection.lead}
              </p>
            </div>
            <ul className="capability-item-grid">
              {productionCapabilities.map((item) => (
                <CapabilityItem key={item.id} title={item.title} description={item.description} />
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
