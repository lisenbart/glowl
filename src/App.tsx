import Header from "./components/Header";
import DirectionCards from "./components/DirectionCards";
import HowWeWorkSection from "./components/HowWeWorkSection";
import ContactForm from "./components/ContactForm";
import MobileEstimateCTA from "./components/MobileEstimateCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />
      <Header />
      <main className="site-main site-main-stack">
        <DirectionCards />
        <HowWeWorkSection />
        <ContactForm />
      </main>
      <Footer />
      <MobileEstimateCTA />
    </>
  );
}
