import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const exploreProducts = [
  { name: "Cibil Score", badge: "FREE" },
  { name: "Home Loan" },
  { name: "Personal Loan", badge: "CASHBACK OFFER" },
  { name: "Business Loan", badge: "CASHBACK OFFER" },
  { name: "Loan Against Property" },
  { name: "Education Loan" },
  { name: "Credit Card", badge: "WIN RS. 1 LAKH" },
  { name: "Project Funding" },
];

const FinancialServices = [
  "ITR Filing",
  "GST Registrations",
  "Pan Card Services",
  "Passport Services",

];

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, url: "https://facebook.com" },
  { icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
  { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com" },
  { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com" },
];

const menuVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: "none" },
  visible: { opacity: 1, y: 0, pointerEvents: "auto" },
};

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const exploreTimeout = useRef(null);
  const learnTimeout = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateMobile);
    updateMobile();
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const handleMouseEnter = (menu) => {
    if (isMobile) return;
    if (menu === "explore") {
      clearTimeout(exploreTimeout.current);
      setOpenMenu("explore");
    } else if (menu === "learn") {
      clearTimeout(learnTimeout.current);
      setOpenMenu("learn");
    }
  };

  const handleMouseLeave = (menu) => {
    if (isMobile) return;
    if (menu === "explore") {
      exploreTimeout.current = setTimeout(() => setOpenMenu(null), 300);
    } else if (menu === "learn") {
      learnTimeout.current = setTimeout(() => setOpenMenu(null), 300);
    }
  };

  const handleMegaEnter = (menu) => {
    if (isMobile) return;
    if (menu === "explore") {
      clearTimeout(exploreTimeout.current);
      setOpenMenu("explore");
    } else if (menu === "learn") {
      clearTimeout(learnTimeout.current);
      setOpenMenu("learn");
    }
  };

  const handleMegaLeave = (menu) => {
    if (isMobile) return;
    if (menu === "explore") {
      exploreTimeout.current = setTimeout(() => setOpenMenu(null), 300);
    } else if (menu === "learn") {
      learnTimeout.current = setTimeout(() => setOpenMenu(null), 300);
    }
  };

  const toggleMobileMenu = (menu) => {
    if (!isMobile) return;
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 z-50 sticky top-0">
      {/* Topbar */}
      <div className="w-full bg-gray-50 border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 py-2 text-sm">
          <div className="flex items-center gap-6 text-[#1a2b57]">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+918186844222" className="hover:underline">
                +91 81868 44222
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@scionfinancials.com" className="hover:underline">
                support@scionfinancials.com
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2b57] hover:text-blue-600 transition"
                aria-label="Social Link"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 py-4 relative bg-white">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/lovable-uploads/f7fede72-f0db-4a37-aee3-a948f63288cd.png"
            alt="SCION Financial Services"
            className="h-12"
          />
        </Link>
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-grow gap-10">
          {/* Explore Products */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("explore")}
            onMouseLeave={() => handleMouseLeave("explore")}
          >
            <button
              onClick={() => toggleMobileMenu("explore")}
              aria-haspopup="true"
              aria-expanded={openMenu === "explore"}
              className="flex items-center gap-1 text-lg font-semibold text-[#1a2b57] hover:text-blue-600 transition"
            >
              Explore Products <ChevronDown size={18} />
            </button>
            <AnimatePresence>
              {openMenu === "explore" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => handleMegaEnter("explore")}
                  onMouseLeave={() => handleMegaLeave("explore")}
                  className="absolute left-0 top-full mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[700px] z-40 py-8 px-10 flex flex-col gap-8"
                >
                  <div>
                    <div className="font-bold text-xl mb-4 text-[#1a2b57]">POPULAR PRODUCTS</div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                      {exploreProducts.slice(0, 4).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-base text-[#222] font-medium whitespace-nowrap"
                        >
                          {item.name}
                          {item.badge && (
                            <span className="bg-green-400 text-white text-xs px-2 py-1 rounded font-bold ml-2">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                      {exploreProducts.slice(4).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-base text-[#222] font-medium whitespace-nowrap"
                        >
                          {item.name}
                          {item.badge && (
                            <span className="bg-green-400 text-white text-xs px-2 py-1 rounded font-bold ml-2">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-4 text-[#1a2b57]">FIANANCIAL SERVICES</div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                      {FinancialServices.map((item, idx) => (
                        <div key={idx} className="text-base text-[#222] font-medium whitespace-nowrap">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Learn & Resources */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("learn")}
            onMouseLeave={() => handleMouseLeave("learn")}
          >
            <button
              onClick={() => toggleMobileMenu("learn")}
              aria-haspopup="true"
              aria-expanded={openMenu === "learn"}
              className="flex items-center gap-1 text-lg font-semibold text-[#1a2b57] hover:text-blue-600 transition"
            >
              Learn & Resources <ChevronDown size={18} />
            </button>
            <AnimatePresence>
              {openMenu === "learn" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => handleMegaEnter("learn")}
                  onMouseLeave={() => handleMegaLeave("learn")}
                  className="absolute left-0 top-full mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[400px] z-40 py-8 px-10"
                >
                  <div className="font-bold text-xl mb-4 text-[#1a2b57]">Learn & Resources</div>
                  <div className="flex flex-col gap-3 whitespace-nowrap">
                    <Link
                      to="/blogs"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition"
                    >
                      Blogs
                    </Link>
                    <Link
                      to="/faqs"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition"
                    >
                      FAQs
                    </Link>
                    <Link
                      to="/calculators"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition"
                    >
                      Calculators
                    </Link>
                    <Link
                      to="/guides"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition"
                    >
                      Guides
                    </Link>
                    <Link
                      to="/testimonials"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition"
                    >
                      Testimonials
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Contact Us */}
          <Link
            to="/contact"
            className="text-lg font-semibold text-[#1a2b57] hover:text-blue-600 transition whitespace-nowrap"
          >
            Contact Us
          </Link>
        </nav>
        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+918186844222"
            className="flex items-center gap-2 border bg-[#1a2b57] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#163567] transition"
          >
            <Phone className="w-5 h-5" />
            Talk to Expert
          </a>
          <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition">
            <User className="w-5 h-5" />
            <ChevronDown size={16} />
          </button>
        </div>
        {/* Mobile Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 border rounded-md border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {/* Mobile Explore */}
              <button
                onClick={() => toggleMobileMenu("explore")}
                className="flex justify-between items-center w-full text-left text-[#1a2b57] font-semibold text-lg hover:text-blue-600 transition focus:outline-none"
                aria-expanded={openMenu === "explore"}
              >
                Explore Products <ChevronDown size={18} />
              </button>
              <AnimatePresence>
                {openMenu === "explore" && (
                  <motion.div
                    key="mobile-explore"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { height: 0, opacity: 0 },
                      visible: { height: "auto", opacity: 1 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="pl-4 grid grid-cols-2 gap-3"
                  >
                    {exploreProducts.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-base text-[#222] font-medium whitespace-nowrap"
                      >
                        {item.name}
                        {item.badge && (
                          <span className="bg-green-400 text-white text-xs px-2 py-1 rounded font-bold ml-2">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="col-span-2 mt-4 font-bold text-[#1a2b57]">
                      INSURANCE & INVESTMENTS
                    </div>
                    {FinancialServices.map((item, idx) => (
                      <div
                        key={`ins-${idx}`}
                        className="text-base text-[#222] font-medium whitespace-nowrap pl-2"
                      >
                        {item}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Mobile Learn */}
              <button
                onClick={() => toggleMobileMenu("learn")}
                className="flex justify-between items-center w-full text-left text-[#1a2b57] font-semibold text-lg hover:text-blue-600 transition focus:outline-none"
                aria-expanded={openMenu === "learn"}
              >
                Learn & Resources <ChevronDown size={18} />
              </button>
              <AnimatePresence>
                {openMenu === "learn" && (
                  <motion.div
                    key="mobile-learn"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { height: 0, opacity: 0 },
                      visible: { height: "auto", opacity: 1 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="pl-4 flex flex-col gap-3"
                  >
                    <Link
                      to="/blogs"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition whitespace-nowrap"
                    >
                      Blogs
                    </Link>
                    <Link
                      to="/faqs"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition whitespace-nowrap"
                    >
                      FAQs
                    </Link>
                    <Link
                      to="/calculators"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition whitespace-nowrap"
                    >
                      Calculators
                    </Link>
                    <Link
                      to="/guides"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition whitespace-nowrap"
                    >
                      Guides
                    </Link>
                    <Link
                      to="/testimonials"
                      className="text-base text-[#222] font-medium hover:text-blue-600 transition whitespace-nowrap"
                    >
                      Testimonials
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Mobile Contact */}
              <Link
                to="/contact"
                className="text-lg font-semibold text-[#1a2b57] hover:text-blue-600 transition whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
