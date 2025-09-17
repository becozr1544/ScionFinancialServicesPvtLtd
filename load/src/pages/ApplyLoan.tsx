import { useState } from "react";
import { CheckCircle, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Personal from '@/assets/personal.png';
import Loan from '@/assets/office.png';
import Pancard from '@/assets/pancard.png';

const aiBackground = "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/f105c5a8-ff9a-48b7-ac1d-07e315664341.png";

const employmentTypes = [
  {
    label: "Salaried Employee",
    description: "Receive fixed amount each month",
    value: "salaried",
  },
  {
    label: "Self-Employed Business",
    description: "Run your own business",
    value: "business",
  },
  {
    label: "Self-Employed Professionals",
    description: "Eg: Doctor, C.A., Lawyer, etc.",
    value: "professional",
  },
];

function generateApplicationId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const ApplyLoan = () => {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [personalDetails, setPersonalDetails] = useState({ name: "", email: "", mobile: "" });
  const [loanDetails, setLoanDetails] = useState({
    fullName: "",
    company: "",
    city: "",
    income: "",
    amount: "",
  });
  const [pan, setPan] = useState("");
  const [panValid, setPanValid] = useState(false);
  const [panError, setPanError] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  // PAN validation
  const validatePAN = () => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (regex.test((pan ?? "").trim().toUpperCase())) {
      setPanValid(true);
      setPanError("");
    } else {
      setPanValid(false);
      setPanError("Invalid PAN format. Example: ABCDE1234F");
    }
  };

  const stepLabels = ["Employment", "Personal", "Loan", "PAN"];

  // Handle Next for Employment Type
  const handleEmploymentNext = () => {
    if (selectedType === "business") {
      navigate("/self-employed-business-loan");
    } else if (selectedType === "professional") {
      navigate("/self-employed-professional-loan");
    } else if (selectedType === "salaried") {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 transition-all duration-300">
      {/* Left Side: AI background */}
      <div
        className="hidden md:block relative w-full h-screen"
        style={{ background: "#130b38", overflow: "hidden" }}
      >
        <img
          src={aiBackground}
          className="absolute inset-0 w-full h-full object-cover brightness-95"
          alt="AI Loan Categories Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-700/60 z-10" />
        <div className="relative z-20 p-8">
          <Link to="/" className="inline-block">
            <img
              src="/lovable-uploads/f7fede72-f0db-4a37-aee3-a948f63288cd.png"
              alt="SCION Logo"
              className="h-12 hover:scale-105 transition-transform"
            />
          </Link>
        </div>
        <div className="relative z-20 flex flex-col items-start px-8 pt-32">
          <h2 className="text-white font-extrabold text-3xl mb-7 tracking-tight drop-shadow-lg">
            Apply for Any Loan
          </h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-2 text-white/90">
              <CheckCircle className="text-green-400 mr-2" size={22} /> Compare & Choose the Best Offer
            </li>
            <li className="flex items-center gap-2 text-white/90">
              <CheckCircle className="text-green-400 mr-2" size={22} /> Eligibility In Minutes
            </li>
            <li className="flex items-center gap-2 text-white/90">
              <CheckCircle className="text-green-400 mr-2" size={22} /> Quick Approval Chances
            </li>
          </ul>
        </div>
      </div>
      {/* Right Side: Form */}
      <div className="flex items-center justify-center bg-[#f7fafd] w-full h-screen relative">
        <div className="w-[97vw] max-w-md mx-auto bg-white shadow-2xl rounded-3xl px-7 py-8 flex flex-col justify-between h-[600px] md:h-[700px]">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {stepLabels.map((label, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-250
                    ${step === idx
                      ? "bg-gradient-to-br from-indigo-500 to-purple-400 text-white ring-2 ring-purple-200 ring-offset-2"
                      : step > idx
                        ? "bg-green-400 text-white"
                        : "bg-gray-100 text-gray-400"}
                  `}
                >
                  {step > idx ? <CheckCircle size={20} /> : idx + 1}
                </div>
                <div className="text-xs mt-1 text-gray-700 font-semibold">{label}</div>
              </div>
            ))}
          </div>
          {/* Success */}
          {step === 3 && submitted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-green-100 rounded-full p-5 mb-3"><CheckCircle className="w-10 h-10 text-green-600" /></div>
              <h2 className="text-xl font-bold text-green-700 mb-3">Application Submitted!</h2>
              <div className="text-md text-gray-700 mb-2">Your Application ID:</div>
              <div className="font-mono font-semibold text-purple-700 bg-gray-50 px-4 py-2 rounded-xl border mb-4">
                {applicationId}
              </div>
              <div className="text-xs text-gray-500 mb-6">Please save this ID for future reference.</div>
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.03] transition"
                onClick={() => navigate("/")}
              >
                <Home className="w-5 h-5" /> Home
              </button>
            </div>
          ) : null}
          {/* Step 0: Employment Type */}
          {step === 0 && !submitted && (
            <>
              <div className="text-center mb-7">
                <h3 className="text-indigo-700 font-bold text-lg mb-3">Employment Type</h3>
                <p className="text-gray-500">Select your current employment status</p>
              </div>
              <div className="flex flex-col gap-3 mb-7">
                {employmentTypes.map((type) => (
                  <label key={type.value} className="group cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="employment"
                      checked={selectedType === type.value}
                      onChange={() => setSelectedType(type.value)}
                      className="peer sr-only"
                    />
                    <div
                      className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all
                        bg-white shadow-sm
                        ${selectedType === type.value
                          ? "border-indigo-500 ring-2 ring-purple-300"
                          : "border-gray-200"}
                        group-hover:scale-[1.03] group-hover:ring-2 group-hover:ring-indigo-300
                      `}
                    >
                      <div>
                        <div className="font-medium text-indigo-900">{type.label}</div>
                        <div className="text-xs text-indigo-500 mt-1">{type.description}</div>
                      </div>
                      <div className={`transition-all 
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${selectedType === type.value
                          ? "border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-400"
                          : "border-gray-300 bg-white"}
                        group-hover:border-indigo-400
                      `}>
                        <div className={`transition-transform duration-200 ${selectedType === type.value
                          ? "scale-100 opacity-100 bg-white w-3 h-3 rounded-full"
                          : "scale-0 opacity-0"}`}></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button
                className={`w-full py-3 mt-2 rounded-xl font-semibold text-lg transition-all
                  ${selectedType
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:scale-[1.03]"
                    : "bg-gray-100 text-indigo-200 cursor-not-allowed"}
                `}
                disabled={!selectedType}
                onClick={handleEmploymentNext}
              >
                Next
              </button>
            </>
          )}
          {/* Salaried Employee Stepper Flow */}
          {step === 1 && selectedType === "salaried" && !submitted && (
            <form className="grid grid-cols-1 gap-2" onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <div className="flex justify-center mb-3">
                <img
                  src={Personal}
                  alt="Personal Details"
                  className="w-100 h-100 object-contain rounded-xl shadow"
                />
              </div>
              <h3 className="text-indigo-700 font-bold text-lg mb-1 text-center">Personal Details</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={personalDetails.name}
                onChange={e => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={personalDetails.email}
                onChange={e => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={personalDetails.mobile}
                onChange={e => setPersonalDetails({ ...personalDetails, mobile: e.target.value })}
                required
              />
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-xl font-semibold bg-gray-100 text-purple-600"
                  onClick={() => setStep(0)}
                >Back</button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                >Next</button>
              </div>
            </form>
          )}
          {step === 2 && selectedType === "salaried" && !submitted && (
            <form className="grid grid-cols-1 gap-2" onSubmit={e => { e.preventDefault(); setStep(3); }}>
              <div className="flex justify-center mb-3">
                <img
                  src={Loan}
                  alt="Loan Details"
                  className="w-100 h-100 object-contain rounded-xl shadow"
                />
              </div>
              <h3 className="text-indigo-700 font-bold text-lg mb-1 text-center">Loan Details</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={loanDetails.fullName}
                onChange={e => setLoanDetails({ ...loanDetails, fullName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Current Company"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={loanDetails.company}
                onChange={e => setLoanDetails({ ...loanDetails, company: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={loanDetails.city}
                onChange={e => setLoanDetails({ ...loanDetails, city: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Gross Annual Income (₹)"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={loanDetails.income}
                onChange={e => setLoanDetails({ ...loanDetails, income: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Required Loan Amount (₹)"
                className="px-4 py-3 rounded-xl border focus:border-purple-400 outline-none transition"
                value={loanDetails.amount}
                onChange={e => setLoanDetails({ ...loanDetails, amount: e.target.value })}
                required
              />
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-xl font-semibold bg-gray-100 text-purple-600"
                  onClick={() => setStep(1)}
                >Back</button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                >Next</button>
              </div>
            </form>
          )}
          {step === 3 && selectedType === "salaried" && !submitted && (
            <form className="grid grid-cols-1 gap-2" onSubmit={e => { e.preventDefault(); if (panValid) { setApplicationId(generateApplicationId()); setSubmitted(true); } }}>
              <div className="flex justify-center mb-3">
                <img
                  src={Pancard}
                  alt="PAN Card"
                  className="w-100 h-100 object-contain rounded-xl shadow"
                />
              </div>
              <h3 className="text-indigo-700 font-bold text-lg mb-1 text-center">PAN Card Validation</h3>
              <input
                type="text"
                placeholder="PAN Card Number (ABCDE1234F)"
                className={`px-4 py-3 rounded-xl border outline-none transition ${panValid ? "border-green-400" : panError ? "border-red-400" : "border-purple-200"}`}
                value={pan}
                onChange={e => { setPan(e.target.value.toUpperCase()); setPanValid(false); setPanError(""); }}
                maxLength={10}
                required
              />
              {panError && <div className="text-red-500 text-xs">{panError}</div>}
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-xl font-semibold bg-gray-100 text-purple-600"
                  onClick={() => setStep(2)}
                >Back</button>
                {!panValid ? (
                  <button
                    type="button"
                    className="flex-1 py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    onClick={validatePAN}
                  >Validate</button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-green-400 text-white"
                  >Submit Application</button>
                )}
              </div>
              {panValid && (
                <div className="text-green-600 text-xs flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4" /> PAN Validated! You can submit your application.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;