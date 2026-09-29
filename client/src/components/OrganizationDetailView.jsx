import React, { useState } from 'react';
import { 
  ChevronRight, 
  Globe, 
  Copy, 
  AlertTriangle, 
  Edit3, 
  Check,
  Briefcase,
  Users,
  Sparkles,
  UserPlus,
  Server,
  Database
} from 'lucide-react';

export default function OrganizationDetailView({ 
  organization, 
  onBack, 
  onToggleSuspend, 
  onShowToast,
  onUpdateOrg
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'recruiters' | 'audit'
  const [copied, setCopied] = useState(false);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editMaxJobs, setEditMaxJobs] = useState(organization.metrics?.maxJobs || 250);

  const handleCopyOrgId = () => {
    navigator.clipboard.writeText(organization.id);
    setCopied(true);
    onShowToast && onShowToast(`Organization ID copied: ${organization.id}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSuspended = organization.status === 'Suspended';
  const isActive = organization.status === 'Active';

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={onBack} className="hover:text-blue-600 transition-colors">
          Organizations
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">{organization.name}</span>
      </div>

      {/* Top Organization Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Org Identity */}
          <div className="flex items-center gap-4">
            {organization.logoUrl ? (
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs p-1 shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src={organization.logoUrl}
                  alt={organization.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 text-blue-700 font-bold text-2xl flex items-center justify-center" style={{ display: 'none' }}>
                  {organization.letter || (organization.name ? organization.name.charAt(0).toUpperCase() : 'O')}
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 text-blue-700 font-bold text-2xl flex items-center justify-center border border-blue-200/80 shadow-sm shrink-0">
                {organization.letter || (organization.name ? organization.name.charAt(0).toUpperCase() : 'O')}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
                  {organization.name}
                </h1>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                  isActive
                    ? 'text-emerald-600'
                    : isSuspended
                    ? 'text-red-600'
                    : 'text-slate-500'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-emerald-500' : isSuspended ? 'bg-red-500' : 'bg-slate-400'
                  }`} />
                  {organization.status}
                </span>
              </div>

              {/* Sub-line Domain & ID */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mt-2">
                <a 
                  href={`https://${organization.domain}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{organization.domain}</span>
                </a>

                <span className="text-slate-300">|</span>

                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg font-mono text-[11px] text-slate-600 shadow-2xs">
                  <span>{organization.id}</span>
                  <button 
                    onClick={handleCopyOrgId}
                    title="Copy Org ID"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400 hover:text-slate-700" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsEditingModalOpen(true)}
              className="px-4 py-2.5 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Details</span>
            </button>

            <button
              onClick={() => onToggleSuspend(organization.id)}
              className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs ${
                isSuspended
                  ? 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  : 'border-red-200 text-red-600 bg-white hover:bg-red-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isSuspended ? 'Reactivate Organization' : 'Suspend Organization'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200/80">
        <nav className="flex gap-8 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3.5 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Limits
          </button>
          
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`pb-3.5 border-b-2 transition-all ${
              activeTab === 'recruiters'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Provisioned Recruiters ({organization.recruiters?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3.5 border-b-2 transition-all ${
              activeTab === 'audit'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Audit Logs
          </button>
        </nav>
      </div>

      {/* TAB 1: OVERVIEW & LIMITS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Active Jobs */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Jobs</span>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-serif text-slate-900">
                    {organization.metrics?.activeJobs || 142}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Limit: {organization.metrics?.maxJobs || 250}
                  </span>
                </div>
                
                {/* Gradient progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full" 
                    style={{ width: `${Math.min((organization.metrics?.activeJobs / organization.metrics?.maxJobs) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Candidates */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Candidates</span>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-serif text-slate-900">
                    {organization.metrics?.candidates || "12.5k"}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Processed
                  </span>
                </div>

                <div className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <span>↗</span>
                  <span>{organization.metrics?.candidatesGrowth || "+15% this month"}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Gemini Tokens */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Gemini Tokens</span>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-serif text-slate-900">
                    {organization.metrics?.geminiTokens || "8.2M"}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {organization.metrics?.tokensCost || "$24.60 est."}
                  </span>
                </div>

                {/* Gradient progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-slate-700 to-slate-900 h-full rounded-full" 
                    style={{ width: `${organization.metrics?.tokensProgress || 82}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* System Quotas Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-lg font-bold font-serif text-slate-900 pb-3 border-b border-slate-100">
              System Quotas
            </h2>

            <div className="space-y-6">
              {/* Quota 1: Monthly API Requests */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Monthly API Requests</span>
                  <span className="text-slate-600 font-mono">
                    {organization.quotas?.monthlyApiRequests?.current || "450k"} / {organization.quotas?.monthlyApiRequests?.max || "1M"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${organization.quotas?.monthlyApiRequests?.percent || 45}%` }}
                  />
                </div>
              </div>

              {/* Quota 2: Provisioned Seats */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Provisioned Seats (Recruiters)</span>
                  <span className="text-slate-600 font-mono">
                    {organization.quotas?.provisionedSeats?.current || "12"} / {organization.quotas?.provisionedSeats?.max || "20"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${organization.quotas?.provisionedSeats?.percent || 60}%` }}
                  />
                </div>
              </div>

              {/* Quota 3: Storage Capacity */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span>Storage Capacity</span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">High Usage</span>
                  </span>
                  <span className="text-slate-600 font-mono">
                    {organization.quotas?.storageCapacity?.current || "85GB"} / {organization.quotas?.storageCapacity?.max || "100GB"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${organization.quotas?.storageCapacity?.percent || 85}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROVISIONED RECRUITERS */}
      {activeTab === 'recruiters' && (
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Provisioned Recruiters Roster
            </h2>
            <button 
              onClick={() => onShowToast && onShowToast('Recruiter invitation form launched.')}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Recruiter</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-300 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Name & Email</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/90 text-sm">
                {organization.recruiters && organization.recruiters.length > 0 ? (
                  organization.recruiters.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{rec.name}</div>
                        <div className="text-xs text-slate-400">{rec.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 font-semibold">{rec.role}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                          rec.status === 'Active' ? 'text-emerald-600' : 'text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            rec.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`} />
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-slate-500">{rec.joined}</td>
                      <td className="py-3.5 px-4 text-right text-xs">
                        <button 
                          onClick={() => onShowToast && onShowToast(`Revoked access for ${rec.name}`)}
                          className="text-red-600 hover:text-red-800 font-bold transition-colors"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400 text-sm font-medium">
                      No recruiters currently provisioned for this organization.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
            Organization Audit Trail
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-300 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Event / Action</th>
                  <th className="py-3.5 px-4">Initiated By</th>
                  <th className="py-3.5 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/90 text-xs font-mono text-slate-600">
                {organization.auditLogs && organization.auditLogs.length > 0 ? (
                  organization.auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                      <td className="py-3 px-4 font-sans font-bold text-slate-900">{log.action}</td>
                      <td className="py-3 px-4 font-sans font-medium text-slate-700">{log.user}</td>
                      <td className="py-3 px-4 text-slate-400">{log.ip}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400 text-sm font-sans font-medium">
                      No audit log events recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
            <h3 className="text-lg font-bold font-serif text-slate-900">Edit Organization Quotas</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Active Jobs Limit</label>
              <input 
                type="number"
                value={editMaxJobs}
                onChange={(e) => setEditMaxJobs(e.target.value)}
                className="w-full px-3.5 py-2.5 border rounded-xl text-xs font-mono font-bold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setIsEditingModalOpen(false)}
                className="px-4 py-2 border text-xs font-semibold rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onUpdateOrg && onUpdateOrg({
                    ...organization,
                    metrics: { ...organization.metrics, maxJobs: parseInt(editMaxJobs) || 250 }
                  });
                  setIsEditingModalOpen(false);
                  onShowToast && onShowToast('Organization details updated.');
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
