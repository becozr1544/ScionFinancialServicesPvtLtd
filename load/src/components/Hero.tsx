import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Unsplash/AI-generated images for each loan type
const carouselImages = [
  // Home Loan
  "../assets/cool/homeloans1.png",
  // Car Loan
  
  "../assets/cool/carloan.png",
  // Business Loan
  "../assets/cool/businessloans.png",
  // Mortgage Loan
  "../assets/cool/against.png",
  // Property Loan
  "../assets/cool/loans.png",
  // Loan Against Property
  "../assets/cool/property.png",
  // Education Loan
  "../assets/cool/eduloan.png",
];

const carouselTitles = [
  "Home Loan",
  "Car Loan",
  "Business Loan",
  "Mortgage Loan",
  "Property Loan",
  "Loan Against Property",
  "Education Loan",
];

const carouselDescriptions = [
  "Unlock your dream home with flexible home loan options and quick approvals.",
  "Drive your dream car with our easy and affordable car loans.",
  "Empower your business growth with tailored business loan solutions.",
  "Get the best mortgage rates and expert guidance for your property.",
  "Finance your property purchase with competitive rates and fast processing.",
  "Leverage your property for funds with our loan against property service.",
  "Invest in your future with education loans for students and professionals.",
];

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  // Carousel autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      setCarouselIdx((idx) => (idx + 1) % carouselImages.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [carouselIdx, autoPlay]);

  // Carousel navigation
  const goToSlide = (idx: number) => {
    setAutoPlay(false);
    setCarouselIdx(idx);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      
    >
      {/* Left: Content */}
      <div className="flex-1 flex flex-col justify-center pl-16 pr-8 z-10">
       
        <h1
          ref={titleRef}
          className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-tight mb-6"
          style={{
            color: "#1a2b57",
            fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
            letterSpacing: "-0.03em",
            textShadow: "0 2px 24px #ff7a2922",
            fontSize: "5rem",

          }}
        >
          One <span className="text-[#ff7a29]">Stop Solution</span> for All Type of Loans
          
        </h1>
        
        <p className="text-lg md:text-xl text-[#1a2b57cc] mb-8 max-w-xl font-medium">
          Home, Vehicle, Business, Mortgage, Education & More.<br />
          <span className="text-[#1a2b57cc] font-semibold">Futuristic finance, powered by AI.</span>
        </p>
        <div className="flex gap-4 mb-10">
          <Button
            size="lg"
            className="bg-[#1a2b57cc] hover:bg-[#1a2b57cc] text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all text-lg"
          >
            Explore Loans
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Link to="/about">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 text-[#1a2b57] border border-[#908884] hover:bg-[#fff7f0] font-semibold px-8 py-4 rounded-full shadow transition-all text-lg"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      {/* Right: 3D Carousel */}
      <div className="flex-1 flex items-center justify-center pr-16 z-10">
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black flex items-center justify-center"
          style={{
            width: "500px",
            height: "600px",
            background: "linear-gradient(120deg,#fff 0%,#ffff 100%)",
            boxShadow: "0 8px 48px #1a2b57",
          }}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIdx}
              initial={{ opacity: 0, scale: 0.96, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -60 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <img
                src={carouselImages[carouselIdx]}
                alt={carouselTitles[carouselIdx]}
                className="object-cover w-[340px] h-[340px] mb-6 rounded-2xl shadow-lg"
                style={{
                  filter: "drop-shadow(0 0 32px #1a2b57)",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "2rem",
                  transition: "box-shadow 0.3s",
                }}
              />
              <div className="text-2xl font-bold text-[#1a2b57] mb-2 text-center drop-shadow-lg">
                {carouselTitles[carouselIdx]}
              </div>
              <div className="text-base text-[#1a2b57cc] text-center px-6 mb-2 font-medium">
                {carouselDescriptions[carouselIdx]}
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Carousel Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200
                  ${carouselIdx === idx
                    ? "bg-[#1a2b57] border-[#1a2b57] scale-110 shadow"
                    : "bg-white border-[#1a2b57]/40 opacity-60 hover:scale-110"}
                `}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Top: Logo */}
      <div className="absolute top-8 left-10 z-20 flex items-center gap-3">
       
      </div>
      {/* Top-right: Navigation */}
      
      {/* Outer Card Shadow */}
      <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] shadow-[0_0_80px_0_#ff7a2944]" />
    </section>
  );
};

export default Hero;