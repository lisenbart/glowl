import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileEstimateCTA from "./components/MobileEstimateCTA";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import { navigate, useAppPathname } from "./lib/routing";

export default function App() {
  const pathname = useAppPathname();

  useEffect(() => {
    if (pathname === "/capabilities") {
      navigate("/services", { replace: true });
    }
  }, [pathname]);

  const page = pathname === "/services" || pathname === "/capabilities" ? "services" : "home";

  useEffect(() => {
    const pendingScroll =
      typeof sessionStorage !== "undefined" && sessionStorage.getItem("glowl-scroll-section");
    if (pendingScroll && page === "home") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, page]);

  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />
      <Header />
      {page === "services" ? <ServicesPage /> : <HomePage />}
      <Footer />
      <MobileEstimateCTA />
    </>
  );
}
