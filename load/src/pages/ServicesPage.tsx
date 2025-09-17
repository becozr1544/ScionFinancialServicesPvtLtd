import { useEffect } from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AOS from "aos";
import "aos/dist/aos.css";

const ServicesPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero Section for Services */}
        <section className="py-16 bg-gradient-to-br from-background to-navy-secondary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-scion-orange">Services</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your needs. From loans to financial services, we've got you covered.
            </p>
          </div>
        </section>
        <Services />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ServicesPage;