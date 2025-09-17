import React, { useState } from "react";

const LoanApplications: React.FC = () => {
  const [filterLoanType, setFilterLoanType] = useState<string | null>(null);

  // Placeholder data and handlers...

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Loan Applications</h1>

      {/* Filters */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Loan Type: </label>
        <select
          value={filterLoanType || ""}
          onChange={(e) => setFilterLoanType(e.target.value || null)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Home">Home</option>
          <option value="Business">Business</option>
          <option value="Personal">Personal</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {/* Applications Table */}
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-4 border">Applicant Name</th>
            <th className="p-4 border">Loan Type</th>
            <th className="p-4 border">Status</th>
            <th className="p-4 border">Assigned Officer</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map application data rows here */}
          <tr className="text-center">
            <td colSpan={5} className="p-6 text-gray-500">No applications available</td>
          </tr>
        </tbody>
      </table>

      {/* Pagination Controls */}
    </div>
  );
};

export default LoanApplications;
