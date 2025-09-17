import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import star3D from "../assets/3dicons/star.png";


const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Hyderabad",
    rating: 5,
    text: "SCION helped me get my business loan approved within 24 hours. Their team was professional and the process was smooth. Highly recommended!",
    loanType: "Business Loan",
  },
  {
    name: "Priya Sharma",
    location: "Warangal",
    rating: 5,
    text: "Got my home loan at the best interest rate in the market. The documentation was minimal and the approval was quick. Thank you SCION!",
    loanType: "Home Loan",
  },
  {
    name: "Venkat Reddy",
    location: "Karimnagar",
    rating: 5,
    text: "Excellent service for personal loan. No hidden charges and transparent process. The team guided me through every step.",
    loanType: "Personal Loan",
  },
  {
    name: "Anjali Patel",
    location: "Nizamabad",
    rating: 5,
    text: "SCION made my car loan journey hassle-free. From application to disbursement, everything was handled professionally.",
    loanType: "Auto Loan",
  },
  {
    name: "Suresh Babu",
    location: "Vijayawada",
    rating: 5,
    text: "Their education loan service was seamless. I could fund my studies abroad without any stress. The advisors were very helpful and patient.",
    loanType: "Education Loan",
  },
  {
    name: "Geetha Rani",
    location: "Vizag",
    rating: 5,
    text: "Loan Against Property with SCION gave me the financial flexibility I needed. The process was transparent and fast. Highly satisfied with the support.",
    loanType: "Loan Against Property",
  },
  {
    name: "Mohammed Asif",
    location: "Hyderabad",
    rating: 5,
    text: "Project funding made simple! SCION’s team helped me structure the repayment terms with ease. They know what they are doing.",
    loanType: "Project Funding",
  },
  {
    name: "Latha Devi",
    location: "Guntur",
    rating: 5,
    text: "Personalized attention and quick disbursal for my personal loan. I am grateful for SCION’s professional approach and guidance.",
    loanType: "Personal Loan",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const Testimonials: React.FC = () => {
  return (
    <section
      className="py-24 bg-gradient-to-tr from-[#f9fafb] via-[#e0e7ff] to-[#dbeafe]"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-gradient-to-tr from-orange-200 via-orange-300 to-orange-400 rounded-full px-6 py-3 text-orange-700 text-xl font-semibold shadow-lg mb-6 select-none relative overflow-hidden">
            <img src={star3D} alt="Star icon" className="w-7 h-7" />
            Testimonials
            <img src={star3D} alt="Star icon" className="w-7 h-7" />
            <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 animate-shimmer-blur pointer-events-none" />
          </div>
          <h2 className="text-5xl font-extrabold text-indigo-900 tracking-wide drop-shadow-md mb-6">
            What Our Valued Customers Say
          </h2>
          <p className="text-lg text-indigo-700 font-medium leading-relaxed">
            Explore honest reviews and stories from our customers who trusted SCION Financials for all
            their loan needs. We take pride in transparency, speed, and personalized service.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              tabIndex={0}
              aria-label={`Testimonial by ${t.name} from ${t.location}`}
            >
              <Card className="h-full backdrop-blur-sm bg-white/60 border border-indigo-200 hover:border-indigo-400 shadow-lg rounded-2xl hover:shadow-indigo-500 transition-shadow cursor-pointer relative overflow-hidden group">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                 

                  <p className="text-indigo-900 mb-5 italic tracking-wide leading-relaxed line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
                    &quot;{t.text}&quot;
                  </p>

                  <div className="flex items-center space-x-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <img key={i} src={star3D} alt="Star" className="w-6 h-6" />
                    ))}
                  </div>

                  <div className="border-t border-indigo-300 pt-5">
                    <h4 className="font-semibold text-indigo-900 text-lg">{t.name}</h4>
                    <p className="text-indigo-600 text-sm">{t.location}</p>
                    <span className="mt-3 inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-4 py-1 rounded-full">
                      {t.loanType}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
