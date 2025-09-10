import { useEffect } from "react";
import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutPage = () => {
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
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;