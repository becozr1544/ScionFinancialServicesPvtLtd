import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>

      <div className="bg-white rounded shadow p-6">
        <p>Manage profile, loan product config, interest slabs, tax settings, themes, API integrations (Payment, SMS, Email).</p>
      </div>
    </div>
  );
};

export default Settings;
