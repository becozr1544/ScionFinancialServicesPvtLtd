import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import QuickApplyModal from "./QuickApplyModal";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden" data-aos="fade-up">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-scion-navy via-scion-navy/95 to-scion-navy/90"></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-scion-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-scion-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Make Your 
              <span className="text-scion-orange"> Dreams Reality?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who chose SCION for their financial needs. 
              Get instant approval and competitive rates today!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <QuickApplyModal>
              <Button size="lg" className="btn-primary group px-8 py-3">
                Apply Now - Get Instant Approval
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </QuickApplyModal>
            
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-scion-orange mb-2">24 Hours</div>
              <div className="text-white/70">Quick Approval</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-scion-orange mb-2">₹50 Lakh</div>
              <div className="text-white/70">Maximum Loan Amount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-scion-orange mb-2">8.5%*</div>
              <div className="text-white/70">Interest Rate Starting From</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-8 text-white/60 text-sm"
          >
            <MessageCircle size={16} />
            <span>*Terms and conditions apply. Interest rates may vary based on loan type and eligibility.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;