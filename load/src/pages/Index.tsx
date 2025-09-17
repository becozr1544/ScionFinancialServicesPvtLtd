import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AOS from "aos";
import "aos/dist/aos.css";
import LoanCalculator from "@/components/LoanCalculator";

const Index = () => {
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
      <main>
        <Hero />
        <Services />
        <About />
        <Achievements />
        <LoanCalculator />
        
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
