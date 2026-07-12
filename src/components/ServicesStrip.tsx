import { stripServices } from "@/data/stripServices";

function ServiceItem({ label, icon: Icon, accent }: (typeof stripServices)[0]) {
  return (
    <div className="services-strip-item flex shrink-0 items-center gap-2.5 px-2 md:px-2.5">
      <Icon size={14} strokeWidth={1.65} style={{ color: accent }} aria-hidden="true" />
      <span className="whitespace-nowrap text-[13px] font-light tracking-wide text-text-primary md:text-sm">
        {label}
      </span>
    </div>
  );
}

function ServiceDot() {
  return <span className="strip-service-dot mx-3 h-1 w-1 shrink-0 rounded-full md:mx-4" aria-hidden="true" />;
}

function ServiceRow({ groupId }: { groupId: string }) {
  return (
    <div className="flex shrink-0 items-center">
      {stripServices.map((service, i) => (
        <div key={`${groupId}-${service.id}`} className="flex shrink-0 items-center">
          <ServiceItem {...service} />
          <ServiceDot />
        </div>
      ))}
    </div>
  );
}

export default function ServicesStrip() {
  return (
    <section
      className="services-strip relative z-10 -mt-8 px-[var(--page-padding)] md:-mt-10"
      aria-label="Production types"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1440px]">
        <article className="how-ios-card services-strip-panel min-w-0 max-w-full">
          <div className="how-ios-card-inner how-ios-card-inner--compact min-w-0">
            <div className="strip-marquee-viewport overflow-hidden">
              <div className="strip-marquee-clip">
                <div className="strip-marquee-track">
                  <ServiceRow groupId="a" />
                  <ServiceRow groupId="b" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
