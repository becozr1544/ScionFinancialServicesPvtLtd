import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Replace these imports with your actual 3D PNG icons for the achievements
import trending3D from "../assets/3dicons/trending.png";
import users3D from "../assets/3dicons/users.png";
import award3D from "../assets/3dicons/award.png";
import clock3D from "../assets/3dicons/clock.png";

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const achievements = [
    {
      icon: <img src={trending3D} alt="Trending up icon" className="w-12 h-12" />,
      number: 500,
      suffix: "Cr+",
      prefix: "₹",
      label: "Loans Disbursed",
      description: "Total amount disbursed across all loan categories"
    },
    {
      icon: <img src={users3D} alt="Users icon" className="w-12 h-12" />,
      number: 10000,
      suffix: "+",
      prefix: "",
      label: "Happy Customers",
      description: "Satisfied customers across Telangana"
    },
    {
      icon: <img src={award3D} alt="Award icon" className="w-12 h-12" />,
      number: 98,
      suffix: "%",
      prefix: "",
      label: "Success Rate",
      description: "Loan approval success rate"
    },
    {
      icon: <img src={clock3D} alt="Clock icon" className="w-12 h-12" />,
      number: 24,
      suffix: "Hrs",
      prefix: "",
      label: "Quick Approval",
      description: "Average loan approval time"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      }, 
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const CountUpNumber = ({ number, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const duration = 2000;
        const steps = 60;
        const stepValue = number / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          setCount(Math.min(Math.round(stepValue * currentStep), number));
          if (currentStep >= steps) clearInterval(timer);
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }, [isVisible, number]);

    return <span>{count}</span>;
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-gray-800 text-sm font-medium mb-4 shadow">
              <img src={award3D} alt="Award icon" className="w-4 h-4" />
              <span>Our Achievements</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-neutral-900">
              Numbers That Speak Our Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These milestones reflect our commitment to serving our customers with{" "}
              <span className="font-semibold text-gray-900">excellence</span> and{" "}
              <span className="font-semibold text-gray-900">trust</span>.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl p-8 flex flex-col items-center justify-center border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.05] overflow-hidden"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {/* Glow effect */}
              <span className="pointer-events-none absolute left-1/2 top-0 w-32 h-32 bg-gray-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"></span>
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 inline-flex justify-center items-center rounded-full p-5 bg-gray-100 shadow-md group-hover:bg-gray-200 transition-colors">
                  {achievement.icon}
                </div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2 text-neutral-900">
                  <span className="text-gray-700 font-normal">{achievement.prefix}</span>
                  <span>
                    <CountUpNumber number={achievement.number} isVisible={isVisible} />
                  </span>
                  <span className="text-gray-700 font-normal">{achievement.suffix}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-800">
                  {achievement.label}
                </h3>
                <p className="text-gray-600 text-sm text-center max-w-xs">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
