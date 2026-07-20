export default function ServicesHero() {
  return (
    <section
      className="services-hero scroll-mt-24 px-[var(--page-padding)] pt-24 md:pt-[4.5rem]"
      aria-label="Services"
      id="services"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header">
              <h1 className="how-col-title how-col-title-cyan section-card-header__title services-hero__title">
                Production Built Around the Brief.
              </h1>
              <p className="section-card-header__lead how-support-line">
                From creative development and direction through animation, AI production and final delivery.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
