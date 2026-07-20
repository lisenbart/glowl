import ProductionCapabilitiesCard from "@/components/ProductionCapabilitiesCard";
import ContactForm from "@/components/ContactForm";

export default function ServicesPage() {
  return (
    <main className="site-main site-main-stack">
      <section
        id="services"
        className="how-section scroll-mt-24 px-[var(--page-padding)] pt-24 md:pt-[4.5rem]"
        aria-label="Services"
      >
        <div className="mx-auto w-full min-w-0 max-w-[920px]">
          <ProductionCapabilitiesCard />
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
