import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// FAQ data for different loan types
const faqsData = [
  {
    category: "Home Loans",
    questions: [
      {
        q: "What is a Home Loan?",
        a: "A home loan is a secured loan used to purchase, construct, or renovate a house. The property acts as collateral, and you repay in EMIs over 10-30 years. Interest rates are typically lower than other loans.",
      },
      {
        q: "Who can apply for a Home Loan?",
        a: "Any individual with stable income—salaried, self-employed, or professional—can apply, subject to eligibility checks on credit history, property, and documentation.",
      },
      {
        q: "What documents are required?",
        a: "Common documents include ID proof, address proof, income proof (salary slip or IT returns), property papers, and bank statements.",
      },
    ],
  },
  {
    category: "Business Loans",
    questions: [
      {
        q: "What is a Business Loan?",
        a: "Business loans provide funding for business expenses, expansion, working capital, or equipment. They can be secured (with collateral) or unsecured, depending on the lender and business profile.",
      },
      {
        q: "How is eligibility determined?",
        a: "Eligibility typically depends on business turnover, credit history, profitability, and years of operation.",
      },
      {
        q: "What is the loan tenure?",
        a: "Business loan tenure usually ranges from 1 to 10 years or as suited for the project.",
      },
    ],
  },
  {
    category: "Personal Loans",
    questions: [
      {
        q: "What is a Personal Loan?",
        a: "A personal loan is an unsecured loan offered for any personal purpose such as medical, travel, home renovation, or wedding. It doesn’t require collateral and is based on the applicant's creditworthiness.",
      },
      {
        q: "How quickly can I get funds?",
        a: "Funds are usually disbursed within a few hours to a few days after successful approval and documentation.",
      },
      {
        q: "Can I prepay my Personal Loan?",
        a: "Yes, most banks allow loan prepayment with applicable charges, reducing interest payout.",
      },
    ],
  },
  {
    category: "Education Loans",
    questions: [
      {
        q: "What is an Education Loan?",
        a: "Education loans help students finance higher studies in India or overseas. The course and institute must be recognized, and repayment is typically deferred until study completion.",
      },
      {
        q: "What documents do I need?",
        a: "Admission letter, fee schedule, academic records, co-applicant information, and collateral details (if needed).",
      },
      {
        q: "Are there tax benefits?",
        a: "Yes, interest paid on education loans qualifies for tax deduction under Section 80E.",
      },
    ],
  },
  {
    category: "Loan Against Property",
    questions: [
      {
        q: "What is Loan Against Property?",
        a: "A Loan Against Property (LAP) lets you secure funds by mortgaging residential or commercial property. The loan amount is usually up to 70% of property value.",
      },
      {
        q: "Which properties are eligible?",
        a: "Self-owned, rented, or leased residential/commercial properties are generally eligible, subject to legal clearance.",
      },
      {
        q: "What is the repayment structure?",
        a: "Loans are repaid over a period ranging from 5 to 20 years through EMIs.",
      },
    ],
  },
  {
    category: "Project Funding",
    questions: [
      {
        q: "What is Project Funding?",
        a: "Project funding refers to loans or credit lines raised for specific infrastructure, industrial, or commercial projects. The loan is repaid from project-generated income.",
      },
      {
        q: "Who is eligible?",
        a: "Corporates, startups, or individuals with viable project plans and strong financial backgrounds are eligible.",
      },
      {
        q: "Are there special terms?",
        a: "Yes, project loans often have flexible tenures, phased disbursement, and may require detailed viability analysis.",
      },
    ],
  },
];

// Card-style FAQ UI
function FAQCard({ category, questions }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-[#e5eeff] hover:border-[#acc6ff] transition-all">
      <h2 className="text-2xl font-bold text-[#1a2b57] mb-6">{category}</h2>
      {questions.map((faq, idx) => (
        <div key={idx} className="mb-5">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between text-lg font-medium text-[#3554aa] py-3 px-4 rounded-md bg-[#f5faff] hover:bg-[#e5eeff] transition"
          >
            {faq.q}
            <span className="ml-2">{openIdx === idx ? "−" : "+"}</span>
          </button>
          {openIdx === idx && (
            <div className="bg-[#fcfcfd] border-l-4 border-[#acc6ff] p-4 mt-1 text-gray-700 rounded-md transition animate-fade-in">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Main Exported Page Component with Header and Footer
export default function LoanFaqsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#eaf2ff] via-[#f6fcff] to-[#fbfafc]">
      <Header />
      <main className="flex-1 px-4 py-10 md:py-20">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold text-[#1a2b57] mb-5">
              Loans & Project Funding - FAQs
            </h1>
            <p className="text-lg text-[#3554aa] font-semibold">
              Get clear answers to all your queries about loan products, eligibility, and process.
            </p>
          </header>
          {faqsData.map((faqSet, i) => (
            <FAQCard key={i} category={faqSet.category} questions={faqSet.questions} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
