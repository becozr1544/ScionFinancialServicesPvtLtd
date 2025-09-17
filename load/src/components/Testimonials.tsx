import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Import 3D icons for testimonial decorations and stars

import star3D from "../assets/3dicons/star.png";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Hyderabad",
      rating: 5,
      text: "SCION helped me get my business loan approved within 24 hours. Their team was professional and the process was smooth. Highly recommended!",
      loanType: "Business Loan"
    },
    {
      name: "Priya Sharma",
      location: "Warangal",
      rating: 5,
      text: "Got my home loan at the best interest rate in the market. The documentation was minimal and the approval was quick. Thank you SCION!",
      loanType: "Home Loan"
    },
    {
      name: "Venkat Reddy",
      location: "Karimnagar",
      rating: 5,
      text: "Excellent service for personal loan. No hidden charges and transparent process. The team guided me through every step.",
      loanType: "Personal Loan"
    },
    {
      name: "Anjali Patel",
      location: "Nizamabad",
      rating: 5,
      text: "SCION made my car loan journey hassle-free. From application to disbursement, everything was handled professionally.",
      loanType: "Auto Loan"
    }
  ];

  return (
    <section className="py-20 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-5 py-2 text-orange-600 text-sm font-medium mb-4 shadow-sm">
            <img src={star3D} alt="Star icon" className="w-5 h-5" />
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-gray-200 hover:border-orange-300 transition-colors group shadow-md rounded-xl">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  

                  <p className="text-neutral-700 mb-6 line-clamp-4 italic">
                    &quot;{testimonial.text}&quot;
                  </p>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <img key={i} src={star3D} alt="Star" className="w-5 h-5 mr-0.5" />
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-auto">
                    <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-600">{testimonial.location}</p>
                    <div className="inline-block bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full mt-2">
                      {testimonial.loanType}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
