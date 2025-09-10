import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Wallet, Clock, FileText } from "lucide-react";
import QuickApplyModal from "@/components/QuickApplyModal";
import AOS from "aos";
import "aos/dist/aos.css";

const PersonalLoanPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const features = [
    "Loan amount up to ₹50 Lakh",
    "24-hour approval process",
    "Minimal documentation required",
    "Competitive interest rates",
    "Flexible repayment tenure",
    "No hidden charges"
  ];

  const eligibility = [
    "Age: 21-65 years",
    "Minimum salary: ₹25,000/month",
    "Employment: 2+ years experience",
    "CIBIL Score: 650+"
  ];

  const documents = [
    "Aadhaar Card & PAN Card",
    "3 months salary slips",
    "6 months bank statements",
    "Employment proof"
  ];

  return (
    <div className="min-h-screen bg-scion-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-scion-navy via-scion-navy/95 to-scion-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-scion-orange/10 rounded-full px-4 py-2 text-scion-orange text-sm font-medium mb-6">
              <Wallet size={16} />
              Personal Loan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Quick Personal Loans for 
              <span className="text-scion-orange block">All Your Needs</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get instant personal loans up to ₹50 Lakh with minimal documentation and competitive interest rates. Apply online and get approval within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuickApplyModal>
                <Button className="btn-primary px-8 py-6 text-lg">
                  Apply Now
                </Button>
              </QuickApplyModal>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-8 py-6 text-lg">
                Calculate EMI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-scion-navy/95">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Key Features */}
            <div data-aos="fade-up" data-aos-delay="100">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-xl mb-4">
                    <CheckCircle className="w-6 h-6 text-scion-orange inline mr-2" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-scion-orange rounded-full mt-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Eligibility */}
            <div data-aos="fade-up" data-aos-delay="200">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-xl mb-4">
                    <FileText className="w-6 h-6 text-scion-orange inline mr-2" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-scion-orange rounded-full mt-2"></div>
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Documents */}
            <div data-aos="fade-up" data-aos-delay="300">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-xl mb-4">
                    <Clock className="w-6 h-6 text-scion-orange inline mr-2" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-scion-orange rounded-full mt-2"></div>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-scion-orange to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Your Personal Loan?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who chose SCION for their personal loan needs.
            </p>
            <QuickApplyModal>
              <Button className="bg-white text-scion-orange hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Submit Application Form
              </Button>
            </QuickApplyModal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PersonalLoanPage;