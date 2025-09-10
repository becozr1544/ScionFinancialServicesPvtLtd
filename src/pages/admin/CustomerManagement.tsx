import React from "react";

const CustomerManagement: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

      {/* Customer List */}
      <div className="overflow-auto bg-white rounded shadow p-6">
        {/* Table of customers with KYC and loan history */}
        <p className="text-gray-500">Customer list, KYC details, loan & communication history.</p>
      </div>
    </div>
  );
};

export default CustomerManagement;
