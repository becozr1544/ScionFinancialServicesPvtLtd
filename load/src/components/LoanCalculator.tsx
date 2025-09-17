import React, { useState, useEffect } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(20); // years
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // EMI calculation
  useEffect(() => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyInterestRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const emi =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      setMonthlyPayment(emi);
    }
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#091725] via-[#182045] to-[#31254a]">
      <div className="w-full max-w-5xl px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Loan Amount Calculator
        </h2>
        <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#19233c] to-[#2e2349] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Inputs: horizontal at all times on desktop */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 p-8">
            
            {/* Loan Amount */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <label htmlFor="loanAmount" className="font-semibold text-lg text-white mb-3">
                Loan Amount (₹)
              </label>
              <input
                type="range"
                id="loanAmount"
                min="100000"
                max="10000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-44 accent-orange-400 cursor-pointer"
              />
              <input
                type="number"
                min="100000"
                max="10000000"
                value={loanAmount}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (val < 100000) val = 100000;
                  if (val > 10000000) val = 10000000;
                  setLoanAmount(val);
                }}
                className="mt-2 w-32 rounded-lg px-4 py-2 font-semibold text-gray-900 shadow-inner focus:outline-none"
                aria-label="Loan Amount Input"
              />
            </div>

            {/* Interest Rate */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <label htmlFor="interestRate" className="font-semibold text-lg text-white mb-3">
                Interest Rate (% p.a.)
              </label>
              <input
                type="range"
                id="interestRate"
                min="5"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-44 accent-pink-400 cursor-pointer"
              />
              <input
                type="number"
                min="5"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (val < 5) val = 5;
                  if (val > 25) val = 25;
                  setInterestRate(val);
                }}
                className="mt-2 w-20 rounded-lg px-4 py-2 font-semibold text-gray-900 shadow-inner focus:outline-none"
                aria-label="Interest Rate Input"
              />
            </div>

            {/* Loan Term */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <label htmlFor="loanTerm" className="font-semibold text-lg text-white mb-3">
                Loan Term (Years)
              </label>
              <input
                type="range"
                id="loanTerm"
                min="1"
                max="30"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-44 accent-indigo-400 cursor-pointer"
              />
              <input
                type="number"
                min="1"
                max="30"
                value={loanTerm}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (val < 1) val = 1;
                  if (val > 30) val = 30;
                  setLoanTerm(val);
                }}
                className="mt-2 w-16 rounded-lg px-4 py-2 font-semibold text-gray-900 shadow-inner focus:outline-none"
                aria-label="Loan Term Input"
              />
            </div>
          </div>
          {/* EMI Result */}
          <div className="flex items-center justify-center md:w-64 bg-gradient-to-r from-orange-500 to-pink-600 px-2 py-10 md:py-0 rounded-r-3xl">
            <div className="text-center w-full">
              <h3 className="text-lg font-semibold text-white mb-2">Estimated Monthly Payment</h3>
              <p className="text-3xl font-bold text-black bg-white bg-opacity-70 px-3 py-2 rounded-xl inline-block">
                ₹{monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
