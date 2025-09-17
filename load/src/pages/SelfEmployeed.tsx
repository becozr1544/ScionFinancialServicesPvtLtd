import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FileUp,
  FileText,
  Briefcase,
  CreditCard,
  FileCheck2,
} from "lucide-react";

const businessTypeOptions = ["Shop", "E-commerce", "Manufacturing", "Services"];
const loanPurposeOptions = [
  "Working Capital",
  "Expansion",
  "Inventory",
  "Equipment Purchase",
];

const icons = [
  Briefcase, // Business Details
  FileText, // Financial Details
  CreditCard, // Loan
  FileUp, // KYC
  FileCheck2, // Review
];

const stepLabels = [
  "Business",
  "Financial",
  "Loan",
  "KYC",
  "Review",
];

type FormDataType = {
  businessName: string;
  businessType: string;
  businessStartDate: string;
  registrationNumber: string;
  businessAddress: string;
  nature: string;
  annualTurnover: string;
  monthlyIncome: string;
  itrFiled: string;
  itrFiles: File[];
  bankFiles: File[];
  loanAmount: string;
  loanPurpose: string;
  preferredTenure: string;
  panFile: File | null;
  aadhaarFile: File | null;
  registrationProof: File | null;
};

type ErrorsType = {
  [K in keyof FormDataType]?: string;
};

const initialFormData: FormDataType = {
  businessName: "",
  businessType: "",
  businessStartDate: "",
  registrationNumber: "",
  businessAddress: "",
  nature: "",
  annualTurnover: "",
  monthlyIncome: "",
  itrFiled: "",
  itrFiles: [],
  bankFiles: [],
  loanAmount: "",
  loanPurpose: "",
  preferredTenure: "",
  panFile: null,
  aadhaarFile: null,
  registrationProof: null,
};

export default function SelfEmployedBusiness() {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const navigate = useNavigate();

  function updateField<K extends keyof FormDataType>(field: K, value: FormDataType[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleMultiFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "itrFiles" | "bankFiles"
  ) {
    if (e.target.files) {
      updateField(field, Array.from(e.target.files) as File[]);
    }
  }

  function handleSingleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "panFile" | "aadhaarFile" | "registrationProof"
  ) {
    if (e.target.files && e.target.files.length > 0) {
      updateField(field, e.target.files[0] as File);
    }
  }

  function displayFileNames(files: File[] | File | null | undefined): string {
    if (!files) return "No file chosen";
    if (Array.isArray(files)) {
      if (files.length === 0) return "No file chosen";
      return files.map((f) => f?.name).join(", ");
    }
    return files.name ?? "No file chosen";
  }

  function validateStep(): boolean {
    const newErrors: ErrorsType = {};
    if (step === 0) {
      if (!formData.businessName.trim()) newErrors.businessName = "Business Name required";
      if (!formData.businessType.trim()) newErrors.businessType = "Business Type required";
      if (!formData.businessStartDate.trim()) newErrors.businessStartDate = "Business Start Date required";
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration Number required";
      if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business Address required";
      if (!formData.nature.trim()) newErrors.nature = "Nature of Business required";
    } else if (step === 1) {
      if (!formData.annualTurnover.trim()) newErrors.annualTurnover = "Annual Turnover required";
      if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = "Monthly Income required";
      if (!formData.itrFiled.trim()) newErrors.itrFiled = "ITR Filed info required";
      // Skipping itrFiles validation (testing)
      if (formData.bankFiles.length === 0) newErrors.bankFiles = "Bank Statements required";
    } else if (step === 2) {
      if (!formData.loanAmount.trim()) newErrors.loanAmount = "Loan Amount required";
      if (!formData.loanPurpose.trim()) newErrors.loanPurpose = "Loan Purpose required";
      if (!formData.preferredTenure.trim()) newErrors.preferredTenure = "Preferred Tenure required";
    } else if (step === 3) {
      if (!formData.panFile) newErrors.panFile = "PAN Card upload required";
      if (!formData.aadhaarFile) newErrors.aadhaarFile = "Aadhaar upload required";
      if (!formData.registrationProof) newErrors.registrationProof = "Registration Proof upload required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      if (step < stepLabels.length) setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function submitForm() {
    if (validateStep()) {
      const id = String(Math.floor(1000000000 + Math.random() * 9000000000));
      setApplicationId(id);
      setSubmitted(true);
      setStep(step + 1);
    }
  }

  return (
    <div className="flex w-screen h-screen bg-gradient-to-br from-[#122044] to-[#1d3060] select-none">
      {/* Left Panel */}
      <div
        className="w-3/5 relative bg-cover bg-center"
        style={{ backgroundImage: "url(/path_to_your_3d_house_image.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#122044cc]" />
        <div className="absolute top-8 left-8 text-white space-y-6 max-w-xs z-10">
          <img src="../assets/scion-logo.png" alt="Scion Logo" className="w-40" />
          <h1 className="text-4xl font-extrabold leading-tight">Get
             Your Home Loan</h1>
          <ul className="text-lg space-y-4">
            <li>✔ Compare & Choose the Best Offer</li>
            <li>✔ Eligibility In Minutes</li>
            <li>✔ Quick Approval Chances</li>
          </ul>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/5 bg-white rounded-l-3xl shadow-2xl flex flex-col p-10 relative overflow-hidden">
        {/* Stepper Indicator */}
        <div className="flex justify-end text-gray-500 text-sm font-semibold mb-6 uppercase">
          Step {step + 1} / {stepLabels.length + 1}
        </div>

        <div className="flex justify-center mb-8 space-x-8">
          {stepLabels.map((label, idx) => {
            const Icon = icons[idx];
            const isActive = step === idx;
            const isCompleted = step > idx;
            return (
              <div
                key={idx}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  if (isCompleted) setStep(idx);
                }}
              >
                <div
                  className={`flex items-center justify-center rounded-full h-11 w-11 sm:h-12 sm:w-12 border-2 border-opacity-50 transition-all ${
                    isCompleted
                      ? "bg-gradient-to-tr from-green-400 via-teal-400 to-green-400 border-green-400 text-white"
                      : isActive
                      ? "bg-gradient-to-tr from-indigo-700 via-indigo-800 to-indigo-700 border-indigo-700 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                </div>
                <span
                  className={`mt-1 text-xs tracking-widest font-semibold ${
                    isActive ? "text-indigo-800" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <form
          className="flex-grow overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === stepLabels.length) {
              submitForm();
            } else {
              nextStep();
            }
          }}
        >
          <AnimatePresence>
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Business Details</h2>
                <input
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.businessName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <select
                  value={formData.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.businessType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Business Type</option>
                  {businessTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={formData.businessStartDate}
                  onChange={(e) => updateField("businessStartDate", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.businessStartDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <input
                  placeholder="Registration Number/GSTIN"
                  value={formData.registrationNumber}
                  onChange={(e) => updateField("registrationNumber", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.registrationNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <textarea
                  placeholder="Business Address"
                  value={formData.businessAddress}
                  onChange={(e) => updateField("businessAddress", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none resize-none ${
                    errors.businessAddress ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                />
                <textarea
                  placeholder="Nature of Business"
                  value={formData.nature}
                  onChange={(e) => updateField("nature", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none resize-none ${
                    errors.nature ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Financial Details</h2>
                <input
                  type="number"
                  placeholder="Annual Turnover (₹)"
                  value={formData.annualTurnover}
                  onChange={(e) => updateField("annualTurnover", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.annualTurnover ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <input
                  type="number"
                  placeholder="Monthly Income (₹)"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateField("monthlyIncome", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.monthlyIncome ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <select
                  value={formData.itrFiled}
                  onChange={(e) => updateField("itrFiled", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.itrFiled ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">ITR Filed?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {formData.itrFiled === "Yes" && (
                  <>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => updateField("itrFiles", Array.from(e.target.files))}
                      className="w-full rounded-lg border px-4 py-3 text-lg outline-none cursor-pointer"
                    />
                    <p className="text-sm text-gray-600 mt-1">{displayFileNames(formData.itrFiles)}</p>
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateField("bankFiles", Array.from(e.target.files))}
                  className="w-full rounded-lg border px-4 py-3 text-lg outline-none cursor-pointer"
                />
                <p className="text-sm text-gray-600 mt-1">{displayFileNames(formData.bankFiles)}</p>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>
                <input
                  type="number"
                  placeholder="Loan Amount (₹)"
                  value={formData.loanAmount}
                  onChange={(e) => updateField("loanAmount", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.loanAmount ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <select
                  value={formData.loanPurpose}
                  onChange={(e) => updateField("loanPurpose", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.loanPurpose ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Loan Purpose</option>
                  {loanPurposeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <input
                  placeholder="Preferred Tenure (Years or Months)"
                  value={formData.preferredTenure}
                  onChange={(e) => updateField("preferredTenure", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none ${
                    errors.preferredTenure ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">KYC Verification</h2>
                <label className="block text-gray-600 mb-1">Upload PAN Card</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateField("panFile", e.target.files?.[0] ?? null)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none cursor-pointer ${
                    errors.panFile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-sm text-gray-600 mt-1">{displayFileNames(formData.panFile)}</p>
                <label className="block text-gray-600 mb-1">Upload Aadhaar Card</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateField("aadhaarFile", e.target.files?.[0] ?? null)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none cursor-pointer ${
                    errors.aadhaarFile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-sm text-gray-600 mt-1">{displayFileNames(formData.aadhaarFile)}</p>
                <label className="block text-gray-600 mb-1">Upload Registration Proof</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateField("registrationProof", e.target.files?.[0] ?? null)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg outline-none cursor-pointer ${
                    errors.registrationProof ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-sm text-gray-600 mt-1">{displayFileNames(formData.registrationProof)}</p>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Review Details</h2>
                <div className="p-6 bg-gray-50 rounded-lg border text-gray-800 space-y-2">
                  <div><b>Business Name:</b> {formData.businessName}</div>
                  <div><b>Business Type:</b> {formData.businessType}</div>
                  <div><b>Start Date:</b> {formData.businessStartDate}</div>
                  <div><b>Registration Number:</b> {formData.registrationNumber}</div>
                  <div><b>Address:</b> {formData.businessAddress}</div>
                  <div><b>Nature of Business:</b> {formData.nature}</div>
                  <div><b>Annual Turnover:</b> {formData.annualTurnover}</div>
                  <div><b>Monthly Income:</b> {formData.monthlyIncome}</div>
                  <div><b>ITR Filed:</b> {formData.itrFiled}</div>
                  <div><b>Loan Amount:</b> {formData.loanAmount}</div>
                  <div><b>Loan Purpose:</b> {formData.loanPurpose}</div>
                  <div><b>Preferred Tenure:</b> {formData.preferredTenure}</div>
                </div>
              </motion.div>
            )}
            {step === 5 && (
              <div className="flex flex-col items-center text-center py-20">
                <CheckCircle2 size={64} className="text-green-500 mb-8" />
                <h2 className="text-3xl font-bold text-green-700 mb-5">
                  Application Submitted Successfully!
                </h2>
                <p className="mb-4">
                  Your Application ID:{" "}
                  <code className="bg-gray-100 py-1 px-2 rounded font-mono text-lg">
                    {applicationId}
                  </code>
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-indigo-700 to-purple-700 px-8 py-3 rounded text-white font-semibold shadow hover:shadow-lg"
                >
                  Go Home
                </button>
              </div>
            )}
          </AnimatePresence>
          {step < 5 && (
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className={`px-6 py-3 rounded-lg border ${
                  step === 0 ? "opacity-50 cursor-not-allowed" : "border-indigo-700 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow hover:shadow-lg"
              >
                {step === 4 ? "Submit" : "Next"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
