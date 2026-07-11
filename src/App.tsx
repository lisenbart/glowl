import Header from "./components/Header";
import DirectionCards from "./components/DirectionCards";
import HowWeWorkSection from "./components/HowWeWorkSection";
import EstimateCTA from "./components/EstimateCTA";
import ContactForm from "./components/ContactForm";
import MobileEstimateCTA from "./components/MobileEstimateCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />
      <Header />
      <main>
        <DirectionCards />
        <HowWeWorkSection />
        <EstimateCTA />
        <ContactForm />
      </main>
      <Footer />
      <MobileEstimateCTA />
    </>
  );
}
