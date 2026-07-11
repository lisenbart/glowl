import { stripServices } from "@/data/stripServices";

function ServiceItem({ label, icon: Icon, accent }: (typeof stripServices)[0]) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-1">
      <Icon size={15} strokeWidth={1.5} style={{ color: accent }} aria-hidden="true" />
      <span className="whitespace-nowrap text-[13px] font-light tracking-wide text-white/90 md:text-sm">
        {label}
      </span>
    </div>
  );
}

function ServiceDot() {
  return <span className="mx-3 h-1 w-1 shrink-0 rounded-full bg-white/25 md:mx-4" aria-hidden="true" />;
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
      className="relative z-10 -mt-8 px-[var(--page-padding)] md:-mt-10"
      aria-label="Production types"
    >
      <div className="mx-auto max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner how-ios-card-inner--compact overflow-hidden">
            <div className="strip-marquee-viewport overflow-hidden">
              <div className="strip-marquee-track flex w-max items-center">
                <ServiceRow groupId="a" />
                <ServiceRow groupId="b" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
