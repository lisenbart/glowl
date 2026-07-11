"use client";

import { services } from "@/data/services";

function ServiceItem({ label, icon: Icon, accent }: (typeof services)[0]) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-1">
      <Icon
        size={15}
        strokeWidth={1.5}
        style={{ color: accent }}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap text-[13px] font-light tracking-wide text-white/90 md:text-sm">
        {label}
      </span>
    </div>
  );
}

function ServiceDot() {
  return (
    <span
      className="mx-3 h-1 w-1 shrink-0 rounded-full bg-white/25 md:mx-4"
      aria-hidden="true"
    />
  );
}

export default function ServicesStrip() {
  const items = services.map((service) => (
    <ServiceItem key={service.id} {...service} />
  ));

  return (
    <section
      id="services"
      className="relative z-10 -mt-6 px-[var(--page-padding)] md:-mt-10"
      aria-label="Services"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="glass-panel-glow overflow-hidden rounded-[30px] md:rounded-[34px]">
          <div className="glass-panel px-5 py-4 md:px-8 md:py-5">
            {/* Desktop: static centered row */}
            <div className="hidden flex-wrap items-center justify-center gap-y-3 md:flex">
              {services.map((service, i) => (
                <div key={service.id} className="flex items-center">
                  <ServiceItem {...service} />
                  {i < services.length - 1 && <ServiceDot />}
                </div>
              ))}
            </div>

            {/* Mobile: marquee scroll */}
            <div className="relative md:hidden">
              <div className="scrollbar-hide overflow-x-auto">
                <div className="flex w-max items-center px-2">
                  {services.map((service, i) => (
                    <div key={service.id} className="flex items-center">
                      <ServiceItem {...service} />
                      {i < services.length - 1 && <ServiceDot />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional marquee for wide screens with overflow */}
            <div className="hidden">
              <div className="marquee-track flex w-max items-center">
                {[...items, ...items].map((item, i) => (
                  <div key={i} className="flex items-center">
                    {item}
                    <ServiceDot />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
