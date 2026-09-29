import React, { useState } from 'react';
import { Save, ShieldCheck, Key, Bell, Sliders } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

export default function SystemSettingsView({ onShowToast }) {
  const [rateLimit, setRateLimit] = useState('1000');
  const [maxRecruitersPerOrg, setMaxRecruitersPerOrg] = useState('50');
  const [enableAuditLogging, setEnableAuditLogging] = useState(true);
  const [defaultPlan, setDefaultPlan] = useState('Growth');

  const handleSave = (e) => {
    e.preventDefault();
    onShowToast && onShowToast('System control plane settings updated successfully.');
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
          System Settings & Control Plane Config
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Global platform configurations, security policies, API caps, and environment controls.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Global Limits Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-slate-200">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Tenant Default Controls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Default Tenant Plan Tier
              </label>
              <CustomDropdown
                value={defaultPlan}
                onChange={setDefaultPlan}
                options={[
                  { value: 'Starter', label: 'Starter' },
                  { value: 'Growth', label: 'Growth' },
                  { value: 'Enterprise', label: 'Enterprise' },
                ]}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Default Max Recruiter Seats
              </label>
              <input
                type="number"
                value={maxRecruitersPerOrg}
                onChange={(e) => setMaxRecruitersPerOrg(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Security & Audit Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-slate-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Security & Compliance Policies
            </h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer select-none bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-100/80 transition-colors">
              <input
                type="checkbox"
                checked={enableAuditLogging}
                onChange={(e) => setEnableAuditLogging(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-slate-800">
                Enforce Immutable Multi-tenant Audit Logging
              </span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
