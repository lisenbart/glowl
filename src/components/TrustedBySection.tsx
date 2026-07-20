import { sectionIds, site } from "@/data/site";

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

/** Trust strip — under proof strip: static label + marquee brands. */
export default function TrustedBySection() {
  const { trustedBy } = site;
  const brands = trustedBy.brands;

  return (
    <div
      id={sectionIds.trusted}
      className="trusted-by trusted-by--in-card trusted-by--marquee scroll-mt-24"
      aria-label={trustedBy.label}
    >
      <p className="trusted-by__label">{trustedBy.label}</p>
      <div className="trusted-by__marquee strip-marquee-viewport overflow-hidden">
        <div className="strip-marquee-clip">
          <div className="strip-marquee-track">
            <BrandRow groupId="a" brands={brands} />
            <BrandRow groupId="b" brands={brands} />
          </div>
        </div>
      </div>
    </div>
  );
}
