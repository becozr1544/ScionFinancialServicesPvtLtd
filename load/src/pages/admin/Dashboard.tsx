import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">Total Applications Overview (Pending, Approved, Rejected)</div>
        <div className="bg-white p-6 rounded shadow">Loan Type Breakdown (Home, Business, Personal, Education)</div>
        <div className="bg-white p-6 rounded shadow">Key Metrics: Total Loan Amount, Active Apps, EMI Collections</div>
      </section>

      {/* Graphs Section */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Applications, Approval Ratio, Revenue Trends</h2>
        {/* Insert Charts.js or Recharts components here */}
      </section>
    </div>
  );
};

export default Dashboard;
