import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-scion-orange/10 rounded-full px-4 py-2 text-scion-orange text-sm font-medium mb-4">
            <MessageCircle size={16} />
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact our expert team today for personalized financial solutions. 
            We're here to help you achieve your financial goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="p-2 bg-scion-orange/10 rounded-full">
                    <Phone className="w-5 h-5 text-scion-orange" />
                  </div>
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Call us for immediate assistance</p>
                <a href="tel:+919876543210" className="text-scion-orange font-semibold hover:underline">
                  +91 98765 43210
                </a>
                <br />
                <a href="tel:+919876543211" className="text-scion-orange font-semibold hover:underline">
                  +91 98765 43211
                </a>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="p-2 bg-scion-orange/10 rounded-full">
                    <Mail className="w-5 h-5 text-scion-orange" />
                  </div>
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Send us your queries</p>
                <a href="mailto:info@scionfinancialservices.in" className="text-scion-orange font-semibold hover:underline">
                  info@scionfinancialservices.in
                </a>
                <br />
                <a href="mailto:support@scionfinancialservices.in" className="text-scion-orange font-semibold hover:underline">
                  support@scionfinancialservices.in
                </a>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="p-2 bg-scion-orange/10 rounded-full">
                    <MapPin className="w-5 h-5 text-scion-orange" />
                  </div>
                  Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Visit our office</p>
                <address className="text-foreground not-italic">
                  123 Financial District,<br />
                  Business Hub, Mumbai - 400001<br />
                  Maharashtra, India
                </address>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="p-2 bg-scion-orange/10 rounded-full">
                    <Clock className="w-5 h-5 text-scion-orange" />
                  </div>
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="text-foreground">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="text-foreground">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="text-foreground">10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
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
                        Phone Number *
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number"
                        className="border-border focus:border-scion-orange"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Service Interested In
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-scion-orange focus:outline-none">
                        <option value="">Select a service</option>
                        <option value="personal-loan">Personal Loan</option>
                        <option value="home-loan">Home Loan</option>
                        <option value="auto-loan">Auto Loan</option>
                        <option value="business-loan">Business Loan</option>
                        <option value="education-loan">Education Loan</option>
                        <option value="other">Other Services</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your requirements or ask any questions..."
                      rows={5}
                      className="border-border focus:border-scion-orange resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className="mt-1 accent-scion-orange"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      I agree to receive communications from SCION Financial Services and 
                      understand that I can opt out at any time. 
                      <a href="#" className="text-scion-orange hover:underline ml-1">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto btn-primary">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Need Immediate Assistance?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary">
              WhatsApp Chat
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary">
              Request Callback
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;