import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, FileText, Upload } from "lucide-react";

const ApplyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const loanTypes = [
    "Personal Loan",
    "Home Loan", 
    "Auto Loan",
    "Business Loan",
    "Education Loan",
    "Project Funding"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section id="apply" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-scion-orange/10 rounded-full px-4 py-2 text-scion-orange text-sm font-medium mb-4">
            <FileText size={16} />
            Quick Application
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Apply for Your Loan in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete our simple 3-step application process and get instant approval. 
            Our experts will guide you through every step.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep 
                      ? 'bg-scion-orange text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step < currentStep ? <CheckCircle size={20} /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`h-1 w-full mx-4 ${
                      step < currentStep ? 'bg-scion-orange' : 'bg-muted'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Personal Details</span>
              <span>Loan Information</span>
              <span>Documents</span>
            </div>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Step {currentStep} of {totalSteps}: {
                  currentStep === 1 ? "Personal Information" :
                  currentStep === 2 ? "Loan Details" :
                  "Upload Documents"
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter your full name"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date of Birth *
                      </label>
                      <Input 
                        type="date" 
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mobile Number *
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="Enter your mobile number"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        PAN Number *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter your PAN number"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Monthly Income *
                      </label>
                      <Input 
                        type="number" 
                        placeholder="Enter your monthly income"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Address *
                    </label>
                    <Textarea 
                      placeholder="Enter your complete address"
                      className="border-border focus:border-scion-orange"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Loan Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Loan Type *
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-scion-orange focus:outline-none">
                        <option value="">Select loan type</option>
                        {loanTypes.map((type) => (
                          <option key={type} value={type.toLowerCase().replace(' ', '-')}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Loan Amount *
                      </label>
                      <Input 
                        type="number" 
                        placeholder="Enter desired loan amount"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Loan Tenure (Years) *
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-scion-orange focus:outline-none">
                        <option value="">Select tenure</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="5">5 Years</option>
                        <option value="7">7 Years</option>
                        <option value="10">10 Years</option>
                        <option value="15">15 Years</option>
                        <option value="20">20 Years</option>
                        <option value="25">25 Years</option>
                        <option value="30">30 Years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Employment Type *
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-scion-orange focus:outline-none">
                        <option value="">Select employment type</option>
                        <option value="salaried">Salaried</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="business">Business Owner</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Purpose of Loan
                    </label>
                    <Textarea 
                      placeholder="Please describe the purpose of this loan"
                      className="border-border focus:border-scion-orange"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                      Please upload the following documents. All documents should be clear and legible.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-scion-orange/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-1">Identity Proof</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Aadhaar Card, PAN Card, Passport, etc.
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-scion-orange/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-1">Address Proof</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Utility Bill, Bank Statement, etc.
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-scion-orange/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-1">Income Proof</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Salary Slip, ITR, Bank Statement, etc.
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-scion-orange/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-1">Bank Statement</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Last 6 months bank statement
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-scion-orange mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Document Guidelines</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• All documents should be in PDF, JPG, or PNG format</li>
                          <li>• Maximum file size: 5MB per document</li>
                          <li>• Documents should be clear and legible</li>
                          <li>• Ensure all corners and text are visible</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="btn-secondary"
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} className="btn-primary">
                    Next Step
                  </Button>
                ) : (
                  <Button className="btn-primary">
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Need help with your application? Our experts are here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="btn-secondary">
                Call: +91 98765 43210
              </Button>
              <Button variant="outline" className="btn-secondary">
                WhatsApp Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyForm;