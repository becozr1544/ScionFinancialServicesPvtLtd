import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const calculators = [
  { id: "homeLoan", title: "Home Loan Calculator" },
  { id: "businessLoan", title: "Business Loan Calculator" },
  { id: "educationLoan", title: "Education Loan Calculator" },
  { id: "loanAgainstProperty", title: "Loan Against Property Calculator" },
  { id: "personalLoan", title: "Personal Loan Calculator" },
  { id: "projectFunding", title: "Project Funding Calculator" },
];

// Range settings for different loan types (you can easily customize these)
const loanRanges = {
  homeLoan: { min: 100000, max: 10000000, step: 10000 },
  businessLoan: { min: 50000, max: 3000000, step: 5000 },
  educationLoan: { min: 50000, max: 2000000, step: 5000 },
  loanAgainstProperty: { min: 100000, max: 5000000, step: 10000 },
  personalLoan: { min: 10000, max: 1000000, step: 5000 },
  projectFunding: { min: 100000, max: 10000000, step: 10000 },
};

function calculateEMI(amount, rate, tenure) {
  if (!amount || !rate || !tenure) return { emi: 0, total: 0 };
  const principal = parseFloat(amount);
  const monthlyRate = parseFloat(rate) / 12 / 100;
  const months = parseInt(tenure, 10);
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const emi = denominator === 0 ? 0 : numerator / denominator;
  const total = emi * months;
  return { emi: emi.toFixed(2), total: total.toFixed(2) };
}

function LoanCalculatorForm({ type }) {
  // Defaults based on loanRanges
  const { min, max, step } = loanRanges[type] || { min: 10000, max: 1000000, step: 1000 };

  const [amount, setAmount] = useState((min + max) / 2);
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const { emi, total } = calculateEMI(amount, rate, tenure);

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-xl px-6 py-6 shadow-lg border mt-6 transition-all duration-300">
      {/* Loan Amount Range with dynamic display */}
      <div className="mb-6">
        <label className="block font-semibold text-blue-900 mb-2">
          Loan Amount: <span className="text-blue-800 text-xl">₹ {amount.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1 mb-3">
          <span>₹ {min.toLocaleString()}</span>
          <span>₹ {max.toLocaleString()}</span>
        </div>
      </div>
      {/* Other inputs remain number/text */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="number"
          placeholder="Interest Rate (% p.a.)"
          className="form-input rounded-md border-blue-200 px-4 py-2 bg-white/70 backdrop-blur placeholder:text-slate-500"
          value={rate}
          onChange={e => setRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tenure (months)"
          className="form-input rounded-md border-blue-200 px-4 py-2 bg-white/70 backdrop-blur placeholder:text-slate-500"
          value={tenure}
          onChange={e => setTenure(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-blue-900 font-semibold text-xl mb-2">
          EMI: ₹ {emi}
        </div>
        <div className="text-blue-600 font-medium">
          Total Repayment: ₹ {total}
        </div>
      </div>
    </div>
  );
}

function CalculatorCard({ title, type }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/30 border border-blue-100 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl
      transition-all duration-300 cursor-pointer 
      hover:border-blue-300 hover:shadow-blue-200 
      relative"
      style={{
        boxShadow: '0 6px 32px 0 rgba(30,64,175,0.12)',
        borderRadius: '22px'
      }}>
      <h3
        className="text-xl font-extrabold text-blue-900 mb-3 cursor-pointer"
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => { if (e.key === "Enter") setOpen(o => !o); }}
      >
        {title}
      </h3>
      <p className="text-blue-700 mb-2 font-medium">Estimate EMI and total repayment instantly.</p>
      {open && <LoanCalculatorForm type={type} />}
      {/* Accent for glass effect */}
      <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 via-pink-100 to-violet-100 opacity-40 blur-lg pointer-events-none" />
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-100 via-slate-200 to-blue-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-blue-950 text-center mb-10 drop-shadow-lg">
          Loan Calculators & Project Funding Tools
        </h1>
        <p className="text-center text-blue-700 max-w-3xl mx-auto mb-14 font-semibold text-lg">
          Accurately estimate your monthly payments, interest outflow, and total repayment across all loan types.
          Enjoy a smooth, modern glass UI experience before you apply!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {calculators.map(calc => (
            <CalculatorCard key={calc.id} title={calc.title} type={calc.id} />
          ))}
        </div>
        <div className="mt-20 text-center text-slate-500 text-sm">
          Calculators provide instant EMI & repayment estimates. Consult our experts for personalized loan offers.
        </div>
      </main>
      <Footer />
    </div>
  );
}
