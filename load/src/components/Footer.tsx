import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Apply Now", href: "#apply" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    { label: "Personal Loan", href: "#" },
    { label: "Home Loan", href: "#" },
    { label: "Auto Loan", href: "#" },
    { label: "Business Loan", href: "#" },
    { label: "Education Loan", href: "#" },
    { label: "Project Funding", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Disclaimer", href: "#" },
    { label: "Grievance Policy", href: "#" },
    { label: "Fair Practice Code", href: "#" },
  ];

  // Gradient text utility for headings
  const gradientText = "bg-gradient-to-r from-[#a5b4fc] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent";

  return (
    <footer
      style={{
        background: "#1a2b57",
      }}
      className="text-white"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/lovable-uploads/footer_logo.png"
                alt="SCION Financial Services"
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm leading-relaxed text-blue-100/80">
                Your trusted partner for all financial solutions. We provide
                comprehensive loan and financial services with competitive rates
                and quick approvals.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-[#22336a] to-[#334155] rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#60a5fa] hover:to-[#38bdf8] hover:text-[#1a2b57] transition-all duration-200 shadow-md"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-[#22336a] to-[#334155] rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#60a5fa] hover:to-[#38bdf8] hover:text-[#1a2b57] transition-all duration-200 shadow-md"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-[#22336a] to-[#334155] rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#60a5fa] hover:to-[#38bdf8] hover:text-[#1a2b57] transition-all duration-200 shadow-md"
                aria-label="Linkedin"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-[#22336a] to-[#334155] rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#60a5fa] hover:to-[#38bdf8] hover:text-[#1a2b57] transition-all duration-200 shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${gradientText}`}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-100/90 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${gradientText}`}>Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-blue-100/90 hover:text-blue-400 transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${gradientText}`}>Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-100/90 text-sm">
                  Scion Financials Pvt Ltd,<br />
                  Plat No. 19, Road No.2B, Chandrapuri Colony,<br />
                  LB Nagar, Hyderabad - 500074
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <a href="tel:+919876543210" className="text-blue-100/90 hover:text-blue-400 transition-colors text-sm block">
                    +91 81868 44222
                  </a>
                  
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:info@scionfinancialservices.in"
                  className="text-blue-100/90 hover:text-blue-400 transition-colors text-sm"
                >
                  support@scionfinancialse.com
                </a>
              </div>
            </div>
            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-blue-200 mb-2">Business Hours</h4>
              <div className="text-blue-100/80 text-xs space-y-1">
                <div>Mon - Fri: 9:00 AM - 7:00 PM</div>
                <div>Saturday: 9:00 AM - 5:00 PM</div>
                <div>Sunday: 10:00 AM - 2:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#22336a] bg-[#1a2b57]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-blue-200">
              © 2024 <span className={gradientText}>SCION Financial Services</span>. All rights reserved.
            </div>
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-blue-100/90 hover:text-blue-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {/* Disclaimer */}
          <div className="mt-4 text-xs leading-relaxed text-blue-300">
            <p>
              SCION Financial Services is a registered financial services provider.
              All loan products are subject to credit approval and income verification.
              Interest rates, fees, and terms are subject to change without notice.
              Please read all terms and conditions carefully before applying.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;