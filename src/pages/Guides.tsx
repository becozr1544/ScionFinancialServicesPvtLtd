import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GuideContent {
  category: string;
  points: string[];
}

const guidesData: GuideContent[] = [
  {
    category: "Home Loans",
    points: [
      "Home loans allow you to purchase, build, or renovate a residential property with affordable EMIs over long tenures.",
      "Check your eligibility by reviewing your credit score, monthly income, and employment status.",
      "Prepare essential documents like ID proof, address proof, income statements, and property papers.",
      "Compare interest rates from different lenders; fixed vs floating rates impact your EMI and total interest.",
      "Calculate your EMI and tenure carefully to fit your monthly budget before applying.",
      "Consider additional costs like processing fees, legal charges, and insurance.",
      "Make timely EMI payments to maintain a good credit score and avoid penalties.",
    ],
  },
  {
    category: "Business Loans",
    points: [
      "Business loans provide capital for expansion, working capital, or equipment purchase.",
      "Lenders assess your business turnover, profitability, and operational history for eligibility.",
      "Collaterals may be required to secure loans, but unsecured options are also available.",
      "Interest rates depend on loan type, tenure, and creditworthiness.",
      "Prepare a strong business plan and financial statements to support your application.",
      "Use a business loan calculator to estimate your monthly repayments and total cost.",
      "Ensure transparent usage of funds and maintain payment discipline for future loan access.",
    ],
  },
  {
    category: "Education Loans",
    points: [
      "Education loans help finance higher studies in India and abroad with flexible repayment options.",
      "Admission letter, fee structure, academic records, and co-applicant information are mandatory documents.",
      "Loan repayment generally starts after course completion or grace period.",
      "Interest rates are comparatively lower and may have tax benefits under Section 80E.",
      "Check loan eligibility based on course, institute, and applicant/co-applicant financials.",
      "Plan your finances early using an education loan calculator to manage EMIs and tenure.",
      "Understand moratorium period terms and consequences of delayed payments.",
    ],
  },
  {
    category: "Loan Against Property",
    points: [
      "Loan Against Property (LAP) lets you secure loans by mortgaging residential or commercial property.",
      "The loan amount can be up to 70% of the property’s market value.",
      "Legal and property valuation checks are part of the loan approval process.",
      "Repayment is done via EMIs over 5 to 20 years.",
      "Interest rates are generally lower compared to unsecured loans.",
      "Ensure property ownership documents and clear title are available.",
      "Use an LAP calculator to estimate monthly payments and total loan cost.",
    ],
  },
  {
    category: "Personal Loans",
    points: [
      "Personal loans are unsecured and can be used for any personal expense like travel, medical, or weddings.",
      "Eligibility depends majorly on your credit history, income, and debt-to-income ratio.",
      "Interest rates are higher than secured loans but processing is faster with minimal documents.",
      "Loan tenure is usually short, between 1 to 5 years.",
      "Compare personal loan offers and charges, including prepayment penalties.",
      "Use a personal loan calculator to assess affordable EMIs before applying.",
      "Always borrow within your repayment capacity to maintain healthy credit scores.",
    ],
  },
  {
    category: "Project Funding",
    points: [
      "Project funding loans support infrastructure, industrial, or commercial projects with tailored financing.",
      "Eligibility requires detailed project plans, viability reports, and a solid financial background.",
      "Loan disbursement is often phased based on project milestones.",
      "Flexible tenure and interest rates may be offered depending on negotiations.",
      "Use project funding calculators to simulate cash flows, repayments, and interest costs.",
      "Maintain clear documentation and timely repayments to support your business reputation.",
      "Consult financial experts for structuring complex project funding needs appropriately.",
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#f0f5ff] via-[#e4ecff] to-[#dce8ff]">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-blue-950 mb-12 text-center drop-shadow-md">
          Comprehensive Loan Guides
        </h1>
        {guidesData.map((guide) => (
          <section
            key={guide.category}
            className="bg-white/50 backdrop-blur-md rounded-xl p-8 mb-12 shadow-lg border border-blue-200"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">{guide.category}</h2>
            <ul className="list-disc ml-6 space-y-3 text-blue-800 text-lg">
              {guide.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
