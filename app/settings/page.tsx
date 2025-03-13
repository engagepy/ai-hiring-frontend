"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeaderComponent from "../components/header";

const SettingsPage = () => {
  // Zoom Configuration State
  const [zoomApiKey, setZoomApiKey] = useState("");
  const [zoomApiSecret, setZoomApiSecret] = useState("");

  // Role-Based Access Control State
  const [roles, setRoles] = useState([
    { id: 1, role: "Admin", permissions: ["Create", "Edit", "Delete", "View"] },
    { id: 2, role: "Hiring Manager", permissions: ["Create", "Edit", "View"] },
    { id: 3, role: "Interviewer", permissions: ["View"] },
  ]);

  // AI Auto-Filter Parameters
  const [aiParams, setAiParams] = useState({
    minConfidenceScore: 70,
    minRelevanceScore: 65,
    minClarityScore: 60,
    autoRejectThreshold: 50,
  });

  // General Settings
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);

  // Security Settings
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireSpecialCharacter: true,
    requireNumber: true,
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Branding
  const [logo, setLogo] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAiParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(file);
  };

  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      zoomApiKey,
      zoomApiSecret,
      roles,
      aiParams,
      theme,
      notifications,
      passwordPolicy,
      twoFactorAuth,
      logo,
    });
  };

  return (
    <div className="root">
      <div className="layout">
        {/* Header */}
        <HeaderComponent />
    

        {/* Main Content */}
        <main>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            System Settings
          </h1>

          <div className="grid grid-cols-2 gap-6">
            {/* Zoom Configurations */}
            <div className="panel">
              <h2 className="text-lg font-semibold mb-4">Zoom API Configuration</h2>
              <input
                type="text"
                placeholder="Zoom API Key"
                value={zoomApiKey}
                onChange={(e) => setZoomApiKey(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Zoom API Secret"
                value={zoomApiSecret}
                onChange={(e) => setZoomApiSecret(e.target.value)}
                className="input-field"
              />
            </div>

            {/* AI Parameters */}
            <div className="panel">
              <h2 className="text-lg font-semibold mb-4">AI Auto-Filter Parameters</h2>
              {Object.entries(aiParams).map(([key, value]) => (
                <input
                  key={key}
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  className="input-field"
                />
              ))}
            </div>

            {/* RBAC */}
            <div className="panel">
              <h2 className="text-lg font-semibold mb-4">Role-Based Access Control (RBAC)</h2>
              {roles.map((role) => (
                <div key={role.id} className="flex justify-between py-2">
                  <span>{role.role}</span>
                  <span className="text-blue-400">
                    {role.permissions.join(", ")}
                  </span>
                </div>
              ))}
            </div>

            {/* General Settings */}
            <div className="panel">
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="input-field"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className="slider"></span>
                Enable Notifications
              </label>
            </div>

            {/* Security Settings */}
            <div className="panel">
              <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
              <input
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) =>
                  setPasswordPolicy({ ...passwordPolicy, minLength: +e.target.value })
                }
                className="input-field"
                placeholder="Minimum Password Length"
              />
              <label>
                <input
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                />
                Enable 2FA
              </label>
            </div>

            {/* Branding */}
            <div className="panel">
              <h2 className="text-lg font-semibold mb-4">Custom Branding</h2>
              <input type="file" onChange={handleLogoUpload} />
              {logo && <p>{logo.name}</p>}
            </div>
          </div>

          {/* Save Button */}
          <button
            className="control-button w-full mt-6"
            onClick={handleSaveSettings}
          >
            Save Settings
          </button>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
