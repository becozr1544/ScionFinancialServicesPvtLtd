import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Car, Clock, FileText } from "lucide-react";
import QuickApplyModal from "@/components/QuickApplyModal";
import AOS from "aos";
import "aos/dist/aos.css";

const AutoLoanPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const features = [
    "Up to 90% financing available",
    "New and used car loans",
    "Quick processing in 24-48 hours",
    "Competitive interest rates",
    "Flexible repayment options",
    "No prepayment penalties"
  ];

  const eligibility = [
    "Age: 21-65 years",
    "Minimum income: ₹30,000/month",
    "Employment: 2+ years experience",
    "Valid driving license required"
  ];

  const documents = [
    "Income & identity proof",
    "Driving license",
    "Vehicle quotation/invoice",
    "Bank statements (3 months)"
  ];

  return (
    <div className="min-h-screen bg-scion-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-scion-navy via-scion-navy/95 to-scion-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 text-purple-400 text-sm font-medium mb-6">
              <Car size={16} />
              Auto Loan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Drive Your Dream Car 
              <span className="text-purple-400 block">Today</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get hassle-free auto loans for new and used cars with up to 90% financing. Quick approval and competitive interest rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuickApplyModal>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg">
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
                    <CheckCircle className="w-6 h-6 text-purple-400 inline mr-2" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
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
                    <FileText className="w-6 h-6 text-purple-400 inline mr-2" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
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
                    <Clock className="w-6 h-6 text-purple-400 inline mr-2" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
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
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Drive Your Dream Car?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get behind the wheel of your dream car with SCION's flexible auto loan solutions.
            </p>
            <QuickApplyModal>
              <Button className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg font-semibold">
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

export default AutoLoanPage;