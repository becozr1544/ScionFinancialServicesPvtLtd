import React from "react";

const LoanProducts: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Loan Products (Master Settings)</h1>

      {/* CRUD Form for loan products */}
      <div className="bg-white rounded shadow p-6">
        <p>Manage loan products, interest rates, tenures, fees, eligibility rules, calculator settings.</p>
      </div>
    </div>
  );
};

export default LoanProducts;
