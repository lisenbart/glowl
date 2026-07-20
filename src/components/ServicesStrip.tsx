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
      {stripServices.map((service) => (
        <div key={`${groupId}-${service.id}`} className="flex shrink-0 items-center">
          <ServiceItem {...service} />
          <ServiceDot />
        </div>
      ))}
    </div>
  );
}

/** Marquee track — embed inside another card (e.g. Craft over automation). */
export function ServicesMarquee({ className = "" }: { className?: string }) {
  return (
    <div
      className={`strip-marquee-viewport overflow-hidden${className ? ` ${className}` : ""}`}
      aria-label="Production types"
    >
      <div className="strip-marquee-clip">
        <div className="strip-marquee-track">
          <ServiceRow groupId="a" />
          <ServiceRow groupId="b" />
        </div>
      </div>
    </div>
  );
}
