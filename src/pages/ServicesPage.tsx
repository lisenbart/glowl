import ServicesHero from "@/components/ServicesHero";
import ProductionDirectionsSection from "@/components/ProductionDirectionsSection";
import ProductionCapabilitiesSection from "@/components/ProductionCapabilitiesSection";
import ContactForm from "@/components/ContactForm";

export default function ServicesPage() {
  return (
    <main className="site-main site-main-stack site-main--home">
      <ServicesHero />
      <ProductionDirectionsSection showCta={false} />
      <ProductionCapabilitiesSection />
      <ContactForm />
    </main>
  );
}
