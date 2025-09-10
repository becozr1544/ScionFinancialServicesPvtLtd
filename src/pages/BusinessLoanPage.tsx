import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Building, Clock, FileText } from "lucide-react";
import QuickApplyModal from "@/components/QuickApplyModal";
import AOS from "aos";
import "aos/dist/aos.css";

const BusinessLoanPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const features = [
    "Loan amount up to ₹2 Crore",
    "Working capital funding",
    "Equipment financing options",
    "Quick approval process",
    "Flexible repayment terms",
    "Competitive interest rates"
  ];

  const eligibility = [
    "Business vintage: 2+ years",
    "Annual turnover: ₹20 Lakh+",
    "CIBIL Score: 650+",
    "Valid business registration"
  ];

  const documents = [
    "Business registration documents",
    "Financial statements (2 years)",
    "Bank statements (12 months)",
    "Income tax returns (2 years)"
  ];

  return (
    <div className="min-h-screen bg-scion-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-scion-navy via-scion-navy/95 to-scion-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-scion-orange/10 rounded-full px-4 py-2 text-scion-orange text-sm font-medium mb-6">
              <Building size={16} />
              Business Loan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Fuel Your Business 
              <span className="text-scion-orange block">Growth</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get customized business loan solutions up to ₹2 Crore for working capital, equipment, and expansion needs.
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
              Ready to Expand Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Take your business to the next level with SCION's flexible business loan solutions.
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

export default BusinessLoanPage;