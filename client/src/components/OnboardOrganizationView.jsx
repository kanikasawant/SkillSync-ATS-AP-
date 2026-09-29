import React, { useState } from 'react';
import { ChevronRight, Calendar, Rocket, Building, Layers, UserCheck } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

export default function OnboardOrganizationView({ onCancel, onSubmit, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    billingEmail: '',
    plan: 'Growth',
    maxSeats: 5,
    maxJobs: 10,
    expirationDate: '',
    adminName: '',
    adminEmail: '',
    sendEmail: true
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Legal Name is required';
    if (!formData.domain.trim()) newErrors.domain = 'Domain is required';
    if (!formData.billingEmail.trim()) newErrors.billingEmail = 'Billing Email is required';
    if (!formData.adminName.trim()) newErrors.adminName = 'Full Name is required';
    if (!formData.adminEmail.trim()) newErrors.adminEmail = 'Work Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      onShowToast && onShowToast('Please fill out all required fields (*)');
      return;
    }

    const domainClean = formData.domain.replace(/^https?:\/\//, '');
    const shortName = formData.name;
    const firstLetter = formData.name.charAt(0).toUpperCase();

    const newOrg = {
      id: `org_${Math.random().toString(36).substring(2, 9)}-${Math.random().toString(36).substring(2, 6)}`,
      name: formData.name,
      shortName: shortName,
      domain: domainClean,
      shortDomain: domainClean,
      letter: firstLetter || 'O',
      plan: formData.plan,
      status: 'Active',
      recruiterSeats: { current: 1, max: parseInt(formData.maxSeats) || 5 },
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      billingEmail: formData.billingEmail,
      admin: { name: formData.adminName, email: formData.adminEmail },
      metrics: {
        activeJobs: 0,
        maxJobs: parseInt(formData.maxJobs) || 10,
        candidates: "0",
        candidatesGrowth: "+0% this month",
        geminiTokens: "0K",
        tokensCost: "$0.00 est.",
        tokensProgress: 0
      },
      quotas: {
        monthlyApiRequests: { current: "0k", max: "100k", percent: 0 },
        provisionedSeats: { current: 1, max: parseInt(formData.maxSeats) || 5, percent: 20 },
        storageCapacity: { current: "0GB", max: "10GB", percent: 0 }
      },
      recruiters: [
        { id: `rec_${Date.now()}`, name: formData.adminName, email: formData.adminEmail, role: 'Org Admin', status: 'Active', joined: 'Just now' }
      ],
      auditLogs: [
        { id: `log_${Date.now()}`, action: 'Organization Onboarded & Credentials Issued', user: 'Super Admin', timestamp: new Date().toLocaleString(), ip: '10.0.0.1' }
      ]
    };

    onSubmit(newOrg);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={onCancel} className="hover:text-blue-600 transition-colors">
          Organizations
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Onboard New</span>
      </div>

      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
          Onboard New Organization
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Provision a new tenant environment and administrator account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Organization Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Organization Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Legal Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Acme Corp"
                className={`w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all ${
                  errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
            </div>

            {/* Domain */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Domain <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-300 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 focus-within:bg-white transition-all">
                <span className="px-3.5 py-2.5 text-xs text-slate-500 bg-slate-100 border-r border-slate-300 font-mono font-semibold shrink-0">
                  https://
                </span>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleChange('domain', e.target.value)}
                  placeholder="acme.com"
                  className={`w-full px-3.5 py-2.5 text-xs font-medium bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.domain ? 'bg-red-50/20' : ''
                  }`}
                />
              </div>
              {errors.domain && <p className="text-xs text-red-500 mt-1 font-medium">{errors.domain}</p>}
            </div>
          </div>

          {/* Billing Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Billing Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.billingEmail}
              onChange={(e) => handleChange('billingEmail', e.target.value)}
              placeholder="billing@acme.com"
              className={`w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all ${
                errors.billingEmail ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
              }`}
            />
            {errors.billingEmail && <p className="text-xs text-red-500 mt-1 font-medium">{errors.billingEmail}</p>}
          </div>
        </div>

        {/* Card 2: Subscription & Limits */}
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Subscription & Limits
            </h2>
          </div>

          {/* Plan Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Plan Tier
            </label>
            <CustomDropdown
              value={formData.plan}
              onChange={(val) => handleChange('plan', val)}
              options={[
                { value: 'Starter', label: 'Starter' },
                { value: 'Growth', label: 'Growth' },
                { value: 'Enterprise', label: 'Enterprise' },
              ]}
              className="w-full"
            />
          </div>

          {/* Max Seats & Max Jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Max Seats
              </label>
              <input
                type="number"
                value={formData.maxSeats}
                onChange={(e) => handleChange('maxSeats', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Max Active Jobs
              </label>
              <input
                type="number"
                value={formData.maxJobs}
                onChange={(e) => handleChange('maxJobs', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Contract Expiration Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Contract Expiration Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleChange('expirationDate', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
              <Calendar className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Card 3: Initial Administrator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Initial Administrator
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.adminName}
                onChange={(e) => handleChange('adminName', e.target.value)}
                placeholder="Jane Doe"
                className={`w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all ${
                  errors.adminName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.adminName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.adminName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.adminEmail}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
                placeholder="jane@acme.com"
                className={`w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all ${
                  errors.adminEmail ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {errors.adminEmail && <p className="text-xs text-red-500 mt-1 font-medium">{errors.adminEmail}</p>}
            </div>
          </div>

          {/* Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer select-none bg-slate-50 p-3.5 rounded-xl border border-slate-300 hover:bg-slate-100/80 transition-colors">
              <input
                type="checkbox"
                checked={formData.sendEmail}
                onChange={(e) => handleChange('sendEmail', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Send automated password setup email
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  User will receive an encrypted link valid for 24 hours to set their password.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Bottom Form Actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200/80">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Complete Onboarding & Issue Credentials</span>
          </button>
        </div>
      </form>
    </div>
  );
}
