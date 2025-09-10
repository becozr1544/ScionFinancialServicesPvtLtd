import { Link } from "react-router-dom";

// Import PNG icons for loan services
import personalImg from "../assets/services/personal.png";
import homeImg from "../assets/services/home.png";
import vehicleImg from "../assets/services/vehicle.png";
import businessImg from "../assets/services/business.png";
import educationImg from "../assets/services/study.png";
import projectImg from "../assets/services/project.png";

// Import PNG icons for financial services
import itrImg from "../assets/services/itr.png";
import gstImg from "../assets/services/gst.png";
import panImg from "../assets/services/pan.png";
import passportImg from "../assets/services/passport.png";

const loanServices = [
  {
    title: "Personal Loan",
    icon: personalImg,
    label: "Cashback Offer",
    labelColor: "bg-green-500",
    href: "/apply-loan",
  },
  {
    title: "Home Loan",
    icon: homeImg,
    label: "",
    labelColor: "",
    href: "/home-loan-application",
  },
  {
    title: "Auto Loan",
    icon: vehicleImg,
    label: "",
    labelColor: "",
    href: "/apply-loan",
  },
  {
    title: "Business Loan",
    icon: businessImg,
    label: "Cashback Offer",
    labelColor: "bg-green-500",
    href: "/apply-loan",
  },
  {
    title: "Education Loan",
    icon: educationImg,
    label: "",
    labelColor: "",
    href: "/apply-loan",
  },
  {
    title: "Project Funding",
    icon: projectImg,
    label: "",
    labelColor: "",
    href: "/apply-loan",
  },
];

const financialServices = [
  {
    title: "IT Returns Filing",
    icon: itrImg,
    label: "",
    labelColor: "",
    href: "/itr-filing",
  },
  {
    title: "GST Registration",
    icon: gstImg,
    label: "",
    labelColor: "",
    href: "/gst-registration",
  },
  {
    title: "PAN Card Services",
    icon: panImg,
    label: "",
    labelColor: "",
    href: "/pan-card-services",
  },
  {
    title: "Passport Services",
    icon: passportImg,
    label: "",
    labelColor: "",
    href: "/passport-services",
  },
];

// Realistic ribbon style for cashback offer
const Ribbon = ({ text }) => (
  <div
    className="absolute -top-3 -left-1 z-20"
    style={{
      width: 110,
      height: 32,
      transform: "rotate(-3deg)",
      pointerEvents: "none",
    }}
  >
    <div className="flex items-center justify-center text-xs font-bold text-white bg-green-500 px-4 py-1 rounded-full">
      {text}
    </div>
  </div>
);

const cardHover =
  "hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.18)] hover:border-blue-400 hover:ring-2 hover:ring-blue-100 transition-all duration-300";

const Services = () => {
  return (
    <section
      id="services"
      className="py-16 px-2 md:px-0 bg-[#f7fafd] min-h-[80vh]"
      style={{
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2b57] mb-2 text-center tracking-tight">
            Popular Products
          </h2>
        </div>
        {/* Loan Services */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7 mb-14">
          {loanServices.map((service, idx) => (
            <Link
              to={service.href}
              key={idx}
              className={`group relative bg-white rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] flex flex-col items-center py-8 px-2 border border-gray-100 focus:outline-none active:scale-95 ${cardHover}`}
              style={{
                minHeight: 180,
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
                border: "1.5px solid #e5e7eb",
                textDecoration: "none",
              }}
              tabIndex={0}
              aria-label={service.title}
            >
              {service.label && <Ribbon text={service.label} />}
              <div className="mb-2 scale-110 group-hover:scale-125 transition-transform duration-300 z-10">
                <img
                  src={service.icon}
                  alt={service.title + " icon"}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-base font-semibold text-[#1a2b57] text-center mt-1 group-hover:text-blue-700 transition-colors z-10">
                {service.title}
              </div>
            </Link>
          ))}
        </div>
        {/* Financial Services */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2b57] mb-2 text-center tracking-tight">
            Financial Services
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
          {financialServices.map((service, idx) => (
            <Link
              to={service.href}
              key={idx}
              className={`group relative bg-white rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] flex flex-col items-center py-8 px-2 border border-gray-100 focus:outline-none active:scale-95 ${cardHover}`}
              style={{
                minHeight: 180,
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
                border: "1.5px solid #e5e7eb",
                textDecoration: "none",
              }}
              tabIndex={0}
              aria-label={service.title}
            >
              {service.label && <Ribbon text={service.label} />}
              <div className="mb-2 scale-110 group-hover:scale-125 transition-transform duration-300 z-10">
                <img
                  src={service.icon}
                  alt={service.title + " icon"}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-base font-semibold text-[#1a2b57] text-center mt-1 group-hover:text-blue-700 transition-colors z-10">
                {service.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
