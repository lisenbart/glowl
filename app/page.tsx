import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesStrip from "@/components/ServicesStrip";
import ReelsSection from "@/components/ReelsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesStrip />
        <ReelsSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
