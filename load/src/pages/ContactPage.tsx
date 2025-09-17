import { useEffect } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;