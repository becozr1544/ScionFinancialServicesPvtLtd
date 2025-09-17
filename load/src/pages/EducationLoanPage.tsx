import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, GraduationCap, Clock, FileText } from "lucide-react";
import QuickApplyModal from "@/components/QuickApplyModal";
import AOS from "aos";
import "aos/dist/aos.css";

const EducationLoanPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const features = [
    "Cover complete education costs",
    "Study abroad financing",
    "Professional course funding",
    "Flexible repayment options",
    "Moratorium period available",
    "Tax benefits under 80E"
  ];

  const eligibility = [
    "Indian citizen",
    "Secured admission in recognized institute",
    "Co-applicant required",
    "Good academic record"
  ];

  const documents = [
    "Admission letter & fee structure",
    "Academic records & certificates",
    "Identity & address proof",
    "Income proof of co-applicant"
  ];

  return (
    <div className="min-h-screen bg-scion-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-scion-navy via-scion-navy/95 to-scion-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 rounded-full px-4 py-2 text-teal-400 text-sm font-medium mb-6">
              <GraduationCap size={16} />
              Education Loan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Invest in Your 
              <span className="text-teal-400 block">Bright Future</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Comprehensive education loan programs for domestic and international studies with flexible repayment options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuickApplyModal>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg">
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
                    <CheckCircle className="w-6 h-6 text-teal-400 inline mr-2" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
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
                    <FileText className="w-6 h-6 text-teal-400 inline mr-2" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
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
                    <Clock className="w-6 h-6 text-teal-400 inline mr-2" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
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
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <div data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Shape Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't let finances hold back your dreams. Apply for education loan today.
            </p>
            <QuickApplyModal>
              <Button className="bg-white text-teal-600 hover:bg-white/90 px-8 py-6 text-lg font-semibold">
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

export default EducationLoanPage;