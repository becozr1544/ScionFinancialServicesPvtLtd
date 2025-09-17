import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const STEPS = 5;

const stepLabels = [
  "Business Info",
  "Owner Details",
  "Documents Upload",
  "Verification",
  "Review & Submit",
];

export default function GstRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    ownerPAN: "",
    documents: [],
    verificationMethod: "",
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
        if (!formData.businessName.trim()) {
          alert("Please enter the business name.");
          return false;
        }
        if (!formData.businessType.trim()) {
          alert("Please select the business type.");
          return false;
        }
        break;
      case 2:
        if (!formData.ownerName.trim()) {
          alert("Please enter the owner name.");
          return false;
        }
        if (!formData.ownerPAN.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.ownerPAN.trim())) {
          alert("Please enter a valid owner PAN number (e.g. ABCDE1234F).");
          return false;
        }
        break;
      case 3:
        if (!formData.documents || formData.documents.length === 0) {
          alert("Please upload required business documents.");
          return false;
        }
        break;
      case 4:
        if (!formData.verificationMethod.trim()) {
          alert("Please select a verification method.");
          return false;
        }
        break;
      // no validation for review step
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

  const businessTypes = [
    "Proprietorship",
    "Partnership",
    "Private Limited",
    "Public Limited",
    "LLP",
    "One Person Company",
  ];

  const verificationOptions = [
    "Email Verification",
    "SMS Verification",
    "Physical Verification",
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      {/* Left Section */}
      <div
        className="w-1/2 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/gst-registration-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/70 to-purple-800/70" />
        <h1 className="relative z-10 text-white text-5xl font-extrabold drop-shadow-lg max-w-xs text-center">
          GST Registration
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 p-12 flex flex-col bg-white shadow-xl rounded-l-3xl relative z-20">
        {/* Stepper */}
        <div className="flex justify-between mb-12 select-none">
          {stepLabels.map((label, i) => {
            const isActive = step === i + 1;
            const isCompleted = step > i + 1;
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center rounded-full h-12 w-12 border-2 mb-1 transition-colors ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-gradient-to-br from-indigo-600 to-purple-700 border-transparent text-white shadow-lg"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <span className="font-semibold">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    isActive ? "text-indigo-700" : "text-gray-400"
                  } text-center whitespace-nowrap`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="flex-grow overflow-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="businessInfo"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
                  Business Information
                </h2>
                <input
                  type="text"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <select
                  value={formData.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                  className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="" disabled>
                    Select Business Type
                  </option>
                  {businessTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="ownerDetails"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
                  Owner Details
                </h2>
                <input
                  type="text"
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={(e) => updateField("ownerName", e.target.value)}
                  className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <input
                  type="text"
                  placeholder="Owner PAN Number (e.g. ABCDE1234F)"
                  maxLength={10}
                  value={formData.ownerPAN.toUpperCase()}
                  onChange={(e) => updateField("ownerPAN", e.target.value.toUpperCase())}
                  className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="documents"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
                  Upload Business Documents
                </h2>
                <input
                  type="file"
                  multiple
                  onChange={(e) => updateField("documents", e.target.files)}
                  className="block w-full rounded-xl border border-gray-300 p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {formData.documents.length > 0 && (
                  <ul className="mt-4 list-disc list-inside text-indigo-700 max-h-40 overflow-auto text-sm">
                    {[...formData.documents].map((file, idx) => (
                      <li key={idx} title={file.name}>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="verification"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
                  Verification Method
                </h2>
                <select
                  value={formData.verificationMethod}
                  onChange={(e) => updateField("verificationMethod", e.target.value)}
                  className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="" disabled>
                    Select Verification Method
                  </option>
                  {[
                    "Email Verification",
                    "SMS Verification",
                    "Physical Verification",
                  ].map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="review"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
                  Review Your Information
                </h2>

                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm max-h-[340px] overflow-auto text-left space-y-6">
                  <div>
                    <h3 className="text-indigo-800 font-semibold mb-1">Business Name</h3>
                    <p className="text-gray-700">{formData.businessName || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 font-semibold mb-1">Business Type</h3>
                    <p className="text-gray-700">{formData.businessType || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 font-semibold mb-1">Owner Name</h3>
                    <p className="text-gray-700">{formData.ownerName || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 font-semibold mb-1">Owner PAN Number</h3>
                    <p className="text-gray-700">{formData.ownerPAN || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 font-semibold mb-1">Uploaded Documents</h3>
                    {formData.documents.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700 max-h-28 overflow-auto text-sm">
                        {[...formData.documents].map((file, idx) => (
                          <li key={idx} title={file.name}>
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">No documents uploaded.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-indigo-800 font-semibold mb-1">Verification Method</h3>
                    <p className="text-gray-700">{formData.verificationMethod || "-"}</p>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold transition-shadow shadow-lg"
                >
                  Submit Application
                </button>
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
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 border rounded-lg font-semibold transition ${
                step === 1
                  ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-500"
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              Back
            </button>
            {step < STEPS && (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
