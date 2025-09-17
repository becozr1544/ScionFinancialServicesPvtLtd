import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  User2,
  FileText,
  CreditCard,
  Briefcase,
  FileCheck2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = 7;

const employmentTypes = [
  { label: "Salaried", icon: User2 },
  { label: "Self-Employed Business", icon: Briefcase },
  { label: "Self-Employed Professional", icon: FileCheck2 },
];
const bankList = [
  "State Bank of India",
  "ICICI Bank",
  "HDFC Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "IDFC First Bank",
  "Yes Bank",
  "IndusInd Bank",
  "Federal Bank",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Muthoot Finance",
];
const propertyTypes = [
  { label: "Apartment", img: "/property-apartment.png" },
  { label: "Independent House", img: "/property-house.png" },
  { label: "Villa", img: "/property-villa.png" },
  { label: "Plot/Land", img: "/property-land.png" },
];

const incomeOptions = [
  "₹3 Lakh - ₹6 Lakh",
  "₹6 Lakh - ₹10 Lakh",
  "₹10 Lakh - ₹20 Lakh",
  "₹20 Lakh & Above",
];

const experienceOptions = ["< 1 Year", "1 - 3 Years", "3 - 5 Years", "5+ Years"];

const stepLabels = [
  "Loan Amount",
  "Location",
  "Property Type",
  "Employment",
  "Income",
  "Experience",
  "Bank",
];

const icons = [User2, FileText, CreditCard, Briefcase, FileCheck2];

export default function HomeLoanApplication() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: 2000000,
    pincode: "",
    propertyType: "",
    employmentType: "",
    incomeRange: "",
    experience: "",
    bank: "",
  });
  const [referenceId, setReferenceId] = useState(null);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function generateReferenceId() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }

  function validateStep() {
    switch (step) {
      case 1:
        if (!formData.loanAmount || formData.loanAmount < 300000) {
          alert("Please select a loan amount (min ₹3 Lakh).");
          return false;
        }
        break;
      case 2:
        if (!formData.pincode || formData.pincode.length !== 6) {
          alert("Please enter a valid 6-digit pincode.");
          return false;
        }
        break;
      case 3:
        if (!formData.propertyType) {
          alert("Please select a property type.");
          return false;
        }
        break;
      case 4:
        if (!formData.employmentType) {
          alert("Please select employment type.");
          return false;
        }
        break;
      case 5:
        if (!formData.incomeRange) {
          alert("Please select your income range.");
          return false;
        }
        break;
      case 6:
        if (!formData.experience) {
          alert("Please select your work experience.");
          return false;
        }
        break;
      case 7:
        if (!formData.bank) {
          alert("Please select a primary bank.");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  }

  function handleNext() {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, STEPS + 1));
    }
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function handleSubmit() {
    const id = generateReferenceId();
    setReferenceId(id);
    setStep(STEPS + 1);
  }

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - 50% width */}
      <div
        className="relative w-1/2 bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: "url('/modern-3d-home-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-purple-700/80" />
        <div className="relative z-10 p-12 text-white max-w-sm">
          <img src="/logo-white.svg" alt="Logo" className="mb-8 w-40" />
          <h1 className="text-4xl font-extrabold mb-6">Apply for Home Loan</h1>
          <ul className="space-y-3 text-lg leading-relaxed">
            <li>✓ Compare & Choose the Best Offer</li>
            <li>✓ Eligibility Check in Minutes</li>
            <li>✓ Quick Approval Chances</li>
          </ul>
        </div>
      </div>

      {/* Right Side - 50% width */}
      <div className="w-1/2 bg-white rounded-l-3xl flex flex-col p-10 relative overflow-hidden">
        {/* Step Indicator */}
        <div className="flex justify-between mb-10">
          {stepLabels.map((label, i) => {
            const Icon = icons[i] || null;
            const isActive = step === i + 1;
            const isCompleted = step > i + 1;
            return (
              <button
                key={label}
                onClick={() => isCompleted && setStep(i + 1)}
                className={`flex flex-col items-center cursor-pointer select-none transition-transform ${
                  isActive ? "scale-110" : "hover:scale-105"
                }`}
                type="button"
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`flex items-center justify-center rounded-full h-12 w-12 border-4 transition-colors ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-800 text-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={24} />
                  ) : Icon ? (
                    <Icon size={24} />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-semibold uppercase whitespace-nowrap ${
                    isActive ? "text-indigo-800" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="flex-grow flex flex-col justify-center">
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <motion.div
                key="loanAmount"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Select Loan Amount
                </h2>
                <div className="px-12">
                  <input
                    type="range"
                    min={300000}
                    max={50000000}
                    step={50000}
                    value={formData.loanAmount}
                    onChange={(e) =>
                      updateField("loanAmount", Number(e.target.value))
                    }
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="mt-4 text-2xl font-semibold text-indigo-800">
                    ₹{formData.loanAmount.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="pincode"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Property Location
                </h2>
                <input
                  type="text"
                  maxLength={6}
                  pattern="\d{6}"
                  inputMode="numeric"
                  placeholder="Enter 6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) => {
                    // Allow digits only, max 6 length
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    updateField("pincode", val);
                  }}
                  className="mx-auto block w-40 rounded-xl px-5 py-3 border border-gray-300 text-center text-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow"
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="propertyType"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Type of Property
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                  {propertyTypes.map((pt) => (
                    <button
                      key={pt.label}
                      type="button"
                      onClick={() => updateField("propertyType", pt.label)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 shadow-md transition-all ${
                        formData.propertyType === pt.label
                          ? "border-indigo-700 bg-indigo-50 scale-105"
                          : "border-gray-300 bg-white hover:scale-105"
                      }`}
                    >
                      <img
                        src={pt.img}
                        alt={pt.label}
                        className="w-20 h-20 object-contain mb-3"
                        draggable={false}
                      />
                      <span className="text-indigo-900 font-semibold">
                        {pt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="employmentType"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Employment Type
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                  {employmentTypes.map(({ label, icon: IconComp }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => updateField("employmentType", label)}
                      className={`flex flex-col items-center justify-center p-5 rounded-full border-2 shadow-md cursor-pointer transition-all ${
                        formData.employmentType === label
                          ? "border-purple-700 bg-purple-100 scale-110"
                          : "border-gray-300 bg-white hover:scale-105"
                      }`}
                      aria-pressed={formData.employmentType === label}
                    >
                      <IconComp size={32} className="mb-2 text-purple-700" />
                      <span className="font-semibold text-purple-800">{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="incomeRange"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Annual Income
                </h2>
                <div className="flex justify-center gap-5 flex-wrap max-w-md mx-auto">
                  {incomeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField("incomeRange", opt)}
                      className={`px-8 py-3 rounded-full border-2 font-bold cursor-pointer transition-colors ${
                        formData.incomeRange === opt
                          ? "bg-indigo-600 border-indigo-700 text-white"
                          : "bg-white border-gray-300 text-indigo-700 hover:bg-indigo-50"
                      }`}
                      aria-pressed={formData.incomeRange === opt}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="experience"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Work Experience
                </h2>
                <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                  {experienceOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField("experience", opt)}
                      className={`py-4 rounded-xl font-medium border-2 cursor-pointer transition-colors ${
                        formData.experience === opt
                          ? "bg-purple-600 border-purple-700 text-white"
                          : "bg-white border-gray-300 text-purple-700 hover:bg-purple-50"
                      }`}
                      aria-pressed={formData.experience === opt}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="bank"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-indigo-900">
                  Select Primary Bank
                </h2>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
                  {bankList.map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => updateField("bank", bank)}
                      className={`block w-full px-6 py-3 rounded-lg border-2 text-indigo-700 font-semibold cursor-pointer transition-colors ${
                        formData.bank === bank
                          ? "bg-indigo-600 border-indigo-700 text-white"
                          : "bg-white border-gray-300 hover:bg-indigo-50"
                      }`}
                      aria-pressed={formData.bank === bank}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === STEPS + 1 && referenceId && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6 mt-16"
              >
                <CheckCircle2 size={72} className="mx-auto text-green-500" />
                <h2 className="text-3xl font-bold text-green-700">
                  Application Submitted!
                </h2>
                <p className="text-lg text-gray-700">
                  Your Reference ID:&nbsp;
                  <span className="font-mono bg-green-100 px-3 py-1 rounded">
                    {referenceId}
                  </span>
                </p>
                <p className="text-gray-600">
                  Toll-free: 1800-123-4567 <br />
                  Email:{" "}
                  <a href="mailto:support@scionfinancials.com" className="text-indigo-600 underline">
                    support@scionfinancials.com
                  </a>
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-12 py-3 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-semibold shadow hover:shadow-lg transition"
                >
                  Go Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step <= STEPS && (
          <div className="flex justify-between mt-auto pt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                step === 1
                  ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
                  : "bg-white border border-indigo-700 text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              Back
            </button>

            {/* Show "Next" button only for steps 1 to 6 */}
            {step < STEPS && (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                Next
              </button>
            )}

            {/* Show "Submit" button only on step 7 */}
            {step === STEPS && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.bank}
                className={`px-8 py-3 rounded-full font-semibold shadow-lg transition ${
                  formData.bank
                    ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white hover:shadow-xl"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
