import { Button } from "@/components/ui/button";

// 3D PNG icon imports
import trust3D from "../assets/3dicons/trust.png";
import customer3D from "../assets/3dicons/customer.png";
import innovation3D from "../assets/3dicons/innovation.png";
import excellence3D from "../assets/3dicons/excellence.png";
import mission3D from "../assets/3dicons/mission.png";
import vision3D from "../assets/3dicons/vision.png";
import values3D from "../assets/3dicons/values.png";
import achievement1 from "../assets/3dicons/achievement1.png";
import achievement2 from "../assets/3dicons/achievement2.png";
import achievement3 from "../assets/3dicons/achievement3.png";
import achievement4 from "../assets/3dicons/achievement4.png";

const values = [
  {
    icon: trust3D,
    title: "Trust & Transparency",
    description: "Building lasting bonds through clear, open communication at every step."
  },
  {
    icon: customer3D,
    title: "Customer Centricity",
    description: "User-focused, tailored solutions for every unique journey."
  },
  {
    icon: innovation3D,
    title: "Innovation",
    description: "Pioneering fintech—driven by intelligent automation and AI advances."
  },
  {
    icon: excellence3D,
    title: "Excellence",
    description: "Pushing the edge with world-class service, design, and reliability."
  }
];

const achievements = [
  { number: "₹500Cr+", label: "Loans Disbursed", icon: achievement1 },
  { number: "10,000+", label: "Happy Customers", icon: achievement2 },
  { number: "5+", label: "Years Experience", icon: achievement3 },
  { number: "24/7", label: "Support", icon: achievement4 }
];

const About = () => (
  <section
    id="about"
    className="py-28 min-h-[80vh] bg-white relative overflow-hidden"
  >
    <div className="container mx-auto px-6 relative z-10">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-center gap-20">
        {/* About Left */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-8">
            <img src={mission3D} alt="Mission 3D icon" className="w-10 h-10" />
            <span className="text-lg font-semibold text-neutral-700 tracking-widest bg-white border border-gray-200 rounded-full px-6 py-2 shadow">
              About SCION
            </span>
          </div>
          <h2 className="text-5xl font-black text-neutral-800 mb-6 tracking-tight leading-tight">
            Shaping the Future of Finance
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-xl">
            Since 2020, SCION Financial Services leverages technology and design to transform personal and business finance with efficiency, accessibility, and radical transparency.
          </p>
          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4">
              <img src={excellence3D} alt="Expert Guidance" className="w-9 h-9" />
              <div>
                <h4 className="font-semibold text-neutral-900">Expert Guidance</h4>
                <p className="text-neutral-600 text-base">Get actionable insights from smart algorithms and seasoned advisors.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img src={innovation3D} alt="Fast & Hassle-Free" className="w-9 h-9" />
              <div>
                <h4 className="font-semibold text-neutral-900">Instant Approvals</h4>
                <p className="text-neutral-600 text-base">Automated checks, digital processes—finance as fast as streaming.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img src={trust3D} alt="Competitive Rates" className="w-9 h-9" />
              <div>
                <h4 className="font-semibold text-neutral-900">Competitive Rates</h4>
                <p className="text-neutral-600 text-base">Smart contracts deliver best rates, tailored repayment options.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img src={customer3D} alt="24/7 Support" className="w-9 h-9" />
              <div>
                <h4 className="font-semibold text-neutral-900">24/7 Support</h4>
                <p className="text-neutral-600 text-base">AI chatbots and experts respond instantly to queries—day or night.</p>
              </div>
            </div>
          </div>
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-neutral-900 hover:bg-neutral-700 text-white px-10 py-4 rounded-lg font-bold shadow-lg transition">
              Get Started
            </Button>
            <Button variant="outline" className="border-gray-400 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 px-10 py-4 rounded-lg font-bold transition shadow">
              Learn More
            </Button>
          </div>
        </div>
        {/* Mission/Vision/Values with 3D icons */}
        <div className="flex-1 space-y-8 w-full">
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-3">
              <img src={mission3D} alt="Mission 3D Icon" className="w-8 h-8" />
              <h3 className="text-2xl font-bold text-neutral-900">Our Mission</h3>
            </div>
            <p className="text-neutral-700 font-medium">
              Expand opportunity—make finance accessible, automated, and empowering for every dream.
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-3">
              <img src={vision3D} alt="Vision 3D Icon" className="w-8 h-8" />
              <h3 className="text-2xl font-bold text-neutral-900">Our Vision</h3>
            </div>
            <p className="text-neutral-700 font-medium">
              Become India’s most inventive, trusted fintech—setting benchmarks in service, ethics, and delight.
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-3">
              <img src={values3D} alt="Values 3D Icon" className="w-8 h-8" />
              <h3 className="text-2xl font-bold text-neutral-900">Our Values</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {values.map((value, idx) => (
                <div key={idx} className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <img src={value.icon} alt={value.title + " icon"} className="w-7 h-7" />
                    <span className="font-semibold text-neutral-900 text-base">{value.title}</span>
                  </div>
                  <span className="text-neutral-600 text-xs">{value.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Achievements Section - 3D cards */}
      <div className="mt-24">
        <h3 className="text-4xl font-black text-center text-neutral-800 mb-8 tracking-tight">
          Our Impact in Numbers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl p-10 flex flex-col items-center border border-gray-300 shadow-md bg-white transition-transform duration-300 hover:scale-105 overflow-hidden"
            >
              <img src={ach.icon} alt={ach.label + " 3D icon"} className="w-14 h-14 mb-5" />
              <div className="text-4xl font-extrabold text-neutral-700 mb-1">{ach.number}</div>
              <div className="text-neutral-700 font-medium text-lg">{ach.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
