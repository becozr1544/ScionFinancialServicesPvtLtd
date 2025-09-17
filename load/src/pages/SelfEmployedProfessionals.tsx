import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, User2, FileText, CreditCard, Briefcase, FileCheck2 } from "lucide-react";

const professionOptions = [
  "Doctor",
  "Lawyer",
  "Engineer",
  "Chartered Accountant",
  "Architect",
  "Consultant",
  "Other",
];
const loanPurposeOptions = [
  "Clinic Setup",
  "Office Setup",
  "Equipment Purchase",
  "Expansion",
  "Personal Needs",
];
const stepIcons = [User2, FileText, CreditCard, Briefcase, FileCheck2];
const stepLabels = [
  "Professional",
  "Financial",
  "Loan",
  "KYC",
  "Review",
];

const initialForm = {
  fullName: "",
  professionType: "",
  registrationNumber: "",
  yearsOfPractice: "",
  workAddress: "",
  monthlyIncome: "",
  annualIncome: "",
  itrFiled: "",
  itrFiles: [] as File[],
  bankStatementFiles: [] as File[],
  loanAmount: "",
  loanPurpose: "",
  preferredTenure: "",
  panFile: null as File | null,
  aadhaarFile: null as File | null,
  licenseFile: null as File | null,
};

function generateApplicationId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 10; i++)
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

export default function SelfEmployedProfessional() {
  const [formData, setFormData] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const navigate = useNavigate();

  // Helpers
  type FormField =
    | string
    | File
    | File[]
    | null;

  const updateField = (field: keyof typeof initialForm, value: FormField) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleMultiFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "itrFiles" | "bankStatementFiles"
  ) => {
    if (e.target.files) updateField(field, Array.from(e.target.files));
  };

  const handleSingleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "panFile" | "aadhaarFile" | "licenseFile"
  ) => {
    if (e.target.files && e.target.files.length > 0)
      updateField(field, e.target.files[0]);
  };

  const displayFileNames = (files: File[] | File | null) => {
    if (!files) return "No file chosen";
    if (Array.isArray(files))
      return files.length ? files.map((f) => f.name).join(", ") : "No file chosen";
    return files.name;
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
      if (!formData.professionType) newErrors.professionType = "Select profession.";
      if (!formData.registrationNumber.trim())
        newErrors.registrationNumber = "Registration/License No. required.";
      if (!formData.yearsOfPractice.trim())
        newErrors.yearsOfPractice = "Years of practice required.";
      if (!formData.workAddress.trim()) newErrors.workAddress = "Address is required.";
    } else if (step === 1) {
      if (!formData.monthlyIncome.trim())
        newErrors.monthlyIncome = "Monthly income is required.";
      if (!formData.annualIncome.trim())
        newErrors.annualIncome = "Annual income is required.";
      if (!formData.itrFiled) newErrors.itrFiled = "Specify ITR filed.";
      if (formData.itrFiled === "Yes" && formData.itrFiles.length < 1)
        newErrors.itrFiles = "Upload ITR file(s).";
      if (!formData.bankStatementFiles.length)
        newErrors.bankStatementFiles = "Upload bank statement.";
    } else if (step === 2) {
      if (!formData.loanAmount.trim()) newErrors.loanAmount = "Loan Amount required.";
      if (!formData.loanPurpose) newErrors.loanPurpose = "Select loan purpose.";
      if (!formData.preferredTenure.trim())
        newErrors.preferredTenure = "Preferred tenure required.";
    } else if (step === 3) {
      if (!formData.panFile) newErrors.panFile = "Upload PAN card.";
      if (!formData.aadhaarFile) newErrors.aadhaarFile = "Upload Aadhaar card.";
      if (!formData.licenseFile) newErrors.licenseFile = "Upload License Proof.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };
  const handleBack = () => setStep((s) => (s > 0 ? s - 1 : s));
  const handleSubmit = () => {
    if (validateStep()) {
      setApplicationId(generateApplicationId());
      setSubmitted(true);
      setStep(step + 1);
    }
  };

  // Section content
  const formSections = [
    // Professional Details
    <div key="prof-details" className="space-y-4">
      <h2 className="text-xl font-extrabold text-[#4328a4] text-center mb-2">Professional Details</h2>
      <input
        className={`w-full rounded-xl px-4 py-3 border text-base mb-2 ${
          errors.fullName ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => updateField("fullName", e.target.value)}
      />
      <select
        className={`w-full rounded-xl px-4 py-3 border text-base mb-2 ${
          errors.professionType ? "border-red-400" : "border-gray-200"
        }`}
        value={formData.professionType}
        onChange={(e) => updateField("professionType", e.target.value)}
      >
        <option value="">Select Profession</option>
        {professionOptions.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <input
        className={`w-full rounded-xl px-4 py-3 border text-base mb-2 ${
          errors.registrationNumber ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Registration/License Number"
        value={formData.registrationNumber}
        onChange={(e) => updateField("registrationNumber", e.target.value)}
      />
      <input
        type="number"
        className={`w-full rounded-xl px-4 py-3 border text-base mb-2 ${
          errors.yearsOfPractice ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Years of Practice"
        value={formData.yearsOfPractice}
        onChange={(e) => updateField("yearsOfPractice", e.target.value)}
      />
      <textarea
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.workAddress ? "border-red-400" : "border-gray-200"
        }`}
        rows={2}
        placeholder="Work/Clinic/Office Address"
        value={formData.workAddress}
        onChange={(e) => updateField("workAddress", e.target.value)}
      />
      {Object.values(errors).map((msg, i) => (
        <div className="text-red-500 text-xs" key={i}>{msg}</div>
      ))}
    </div>,
    // Financial Details
    <div key="fin-details" className="space-y-4">
      <h2 className="text-xl font-extrabold text-[#4328a4] text-center mb-2">Financial Details</h2>
      <input
        type="number"
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.monthlyIncome ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Avg Monthly Income (₹)"
        value={formData.monthlyIncome}
        onChange={(e) => updateField("monthlyIncome", e.target.value)}
      />
      <input
        type="number"
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.annualIncome ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Annual Income (₹)"
        value={formData.annualIncome}
        onChange={(e) => updateField("annualIncome", e.target.value)}
      />
      <select
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.itrFiled ? "border-red-400" : "border-gray-200"
        }`}
        value={formData.itrFiled}
        onChange={(e) => updateField("itrFiled", e.target.value)}
      >
        <option value="">ITR Filed?</option>
        <option>Yes</option>
        <option>No</option>
      </select>
      {formData.itrFiled === "Yes" && (
        <>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className={`w-full rounded-xl px-4 py-2 border mb-2 ${
              errors.itrFiles ? "border-red-400" : "border-gray-200"
            }`}
            onChange={(e) => handleMultiFileChange(e, "itrFiles")}
          />
          <div className="text-xs text-gray-500 mb-2">{displayFileNames(formData.itrFiles)}</div>
        </>
      )}
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className={`w-full rounded-xl px-4 py-2 border mb-2 ${
          errors.bankStatementFiles ? "border-red-400" : "border-gray-200"
        }`}
        onChange={(e) => handleMultiFileChange(e, "bankStatementFiles")}
      />
      <div className="text-xs text-gray-500 mb-1">{displayFileNames(formData.bankStatementFiles)}</div>
      {Object.values(errors).map((msg, i) => (
        <div className="text-red-500 text-xs" key={i}>{msg}</div>
      ))}
    </div>,
    // Loan
    <div key="loan-details" className="space-y-4">
      <h2 className="text-xl font-extrabold text-[#4328a4] text-center mb-2">Loan Requirements</h2>
      <input
        type="number"
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.loanAmount ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Loan Amount Required (₹)"
        value={formData.loanAmount}
        onChange={(e) => updateField("loanAmount", e.target.value)}
      />
      <select
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.loanPurpose ? "border-red-400" : "border-gray-200"
        }`}
        value={formData.loanPurpose}
        onChange={(e) => updateField("loanPurpose", e.target.value)}
      >
        <option value="">Loan Purpose</option>
        {loanPurposeOptions.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <input
        className={`w-full rounded-xl px-4 py-3 border mb-2 ${
          errors.preferredTenure ? "border-red-400" : "border-gray-200"
        }`}
        placeholder="Preferred Tenure (Years/Months)"
        value={formData.preferredTenure}
        onChange={(e) => updateField("preferredTenure", e.target.value)}
      />
      {Object.values(errors).map((msg, i) => (
        <div className="text-red-500 text-xs" key={i}>{msg}</div>
      ))}
    </div>,
    // KYC
    <div key="kyc" className="space-y-4">
      <h2 className="text-xl font-extrabold text-[#4328a4] text-center mb-2">KYC Verification</h2>
      <label className="block text-gray-600 mb-1 text-sm">Upload PAN Card</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className={`w-full rounded-xl px-4 py-2 border mb-2 ${
          errors.panFile ? "border-red-400" : "border-gray-200"
        }`}
        onChange={(e) => handleSingleFileChange(e, "panFile")}
      />
      <div className="text-xs text-gray-500 mb-1">{displayFileNames(formData.panFile)}</div>
      <label className="block text-gray-600 mb-1 text-sm">Upload Aadhaar Card</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className={`w-full rounded-xl px-4 py-2 border mb-2 ${
          errors.aadhaarFile ? "border-red-400" : "border-gray-200"
        }`}
        onChange={(e) => handleSingleFileChange(e, "aadhaarFile")}
      />
      <div className="text-xs text-gray-500 mb-1">{displayFileNames(formData.aadhaarFile)}</div>
      <label className="block text-gray-600 mb-1 text-sm">Upload License / Registration Proof</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className={`w-full rounded-xl px-4 py-2 border mb-2 ${
          errors.licenseFile ? "border-red-400" : "border-gray-200"
        }`}
        onChange={(e) => handleSingleFileChange(e, "licenseFile")}
      />
      <div className="text-xs text-gray-500 mb-1">{displayFileNames(formData.licenseFile)}</div>
      {Object.values(errors).map((msg, i) => (
        <div className="text-red-500 text-xs" key={i}>{msg}</div>
      ))}
    </div>,
    // Review
    <div key="review" className="space-y-4">
      <h2 className="text-xl font-extrabold text-[#4328a4] text-center mb-2">Review & Submit</h2>
      <div className="rounded-xl bg-gray-50 border p-4 text-gray-800">
        <div><strong>Name:</strong> {formData.fullName}</div>
        <div><strong>Profession:</strong> {formData.professionType}</div>
        <div><strong>Reg Number:</strong> {formData.registrationNumber}</div>
        <div><strong>Years of Practice:</strong> {formData.yearsOfPractice}</div>
        <div><strong>Work Address:</strong> {formData.workAddress}</div>
        <div><strong>Monthly Income:</strong> ₹{formData.monthlyIncome}</div>
        <div><strong>Annual Income:</strong> ₹{formData.annualIncome}</div>
        <div><strong>ITR Filed:</strong> {formData.itrFiled}</div>
        <div><strong>ITR Files:</strong> {displayFileNames(formData.itrFiles)}</div>
        <div><strong>Bank Statement Files:</strong> {displayFileNames(formData.bankStatementFiles)}</div>
        <div><strong>Loan Amount:</strong> ₹{formData.loanAmount}</div>
        <div><strong>Loan Purpose:</strong> {formData.loanPurpose}</div>
        <div><strong>Preferred Tenure:</strong> {formData.preferredTenure}</div>
        <div><strong>PAN Card:</strong> {displayFileNames(formData.panFile)}</div>
        <div><strong>Aadhaar Card:</strong> {displayFileNames(formData.aadhaarFile)}</div>
        <div><strong>License Proof:</strong> {displayFileNames(formData.licenseFile)}</div>
      </div>
    </div>,
  ];

  // Success Screen
  const renderSuccess = () => (
    <div className="flex flex-col items-center text-center py-14">
      <CheckCircle2 className="h-16 w-16 text-green-500 mb-5" />
      <div className="text-3xl font-extrabold mb-3 text-green-700">Success!</div>
      <div className="mb-4">Your Application ID:</div>
      <div className="font-mono text-[#8f2bfa] text-2xl mb-6">{applicationId}</div>
      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-[#8f2bfa] to-[#3a1c61] text-white py-3 px-8 rounded-full text-base font-semibold mt-2 shadow hover:shadow-xl transition"
      >
        Go Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#380074] via-[#8431eb] to-[#2b1d78] flex items-center justify-center">
      <div className="flex w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-transparent">
        {/* Left Gradient Side */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#380074] via-[#8431eb] to-[#2b1d78] w-[44%] p-10 gap-2 relative">
          <img src="/scion-logo.png" alt="SCION" className="h-12 mb-8 mt-2" />
          <div>
            <h2 className="text-white text-3xl mb-6 font-extrabold tracking-tight leading-tight">Apply for a <span className="text-purple-200">Professional Loan</span></h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-200" />
                Fast, Flexible Eligibility
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-200" />
                100% Digital Process
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-200" />
                Trusted by Doctors, CAs, Lawyers, and more
              </li>
            </ul>
          </div>
          <div className="mt-auto" />
        </div>
        {/* Right Stepper Card */}
        <div className="w-full md:w-[56%] flex flex-col items-center pt-10 pb-10 px-6 sm:px-10 bg-white rounded-3xl">
          {/* Stepper */}
          <div className="flex justify-center gap-5 mb-8 w-full">
            {stepLabels.map((label, i) => {
              const Icon = stepIcons[i];
              const active = step === i;
              const done = step > i;
              return (
                <div className="flex flex-col items-center" key={i}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 transition mb-1 
                    ${done ? "bg-gradient-to-br from-green-400 to-teal-400 border-green-400 text-white" :
                      active ? "bg-gradient-to-br from-[#7b2ff2] to-[#380074] border-[#7b2ff2] text-white" :
                        "bg-white border-gray-300 text-gray-400"}`}
                  >
                    {done ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs font-semibold ${active ? "text-[#8431eb]" : "text-gray-400"} mt-1`}>{label}</span>
                </div>
              );
            })}
          </div>
          {/* Form */}
          <form
            className="w-full max-w-lg"
            onSubmit={e => {
              e.preventDefault();
              if (step === formSections.length - 1) handleSubmit();
              else handleNext();
            }}
          >
            {!submitted ? (
              <>
                {formSections[step]}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    disabled={step === 0}
                    onClick={handleBack}
                    className={`px-6 py-2 rounded-full font-semibold text-[#8431eb] bg-[#f4eefe] shadow ${step === 0 ? "opacity-0 pointer-events-none" : "hover:bg-[#efe7fc]"}`}
                  >Back</button>
                  <button
                    type="submit"
                    className="px-8 py-2 rounded-full font-bold text-white bg-gradient-to-r from-[#7b2ff2] to-[#380074] shadow hover:shadow-lg"
                  >
                    {step === formSections.length - 1 ? "Submit Application" : "Next"}
                  </button>
                </div>
              </>
            ) : (
              renderSuccess()
            )}
          </form>
        </div>
      </div>
    </div>
  );
}