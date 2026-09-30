import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Check, 
  Globe, 
  MapPin, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ChevronDown,
  Sparkles,
  Upload,
  Bell,
  Zap,
  Clock,
  Trash2,
  RefreshCw,
  AlertCircle,
  Plus
} from 'lucide-react';
import {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
} from '../api/orgApi';
import CustomDropdown from './CustomDropdown';


export default function SettingsView({ initialOrgId, onShowToast }) {
  // Organization Management Action Tab: 'create' | 'edit' | 'delete'
  const [activeOrgAction, setActiveOrgAction] = useState(initialOrgId ? 'edit' : 'edit');

  // Company / Organization state mapped to Drizzle Postgres schema
  const [allOrgs, setAllOrgs] = useState([]);
  const [orgId, setOrgId] = useState(initialOrgId || null);
  const [companyLegalName, setCompanyLegalName] = useState('');
  const [primaryIndustry, setPrimaryIndustry] = useState('Technology / SaaS');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySize, setCompanySize] = useState('50-200 employees');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [status, setStatus] = useState('active');

  // API State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Account state
  const [recruiterName, setRecruiterName] = useState('Sarah Jenkins');
  const [recruiterEmail, setRecruiterEmail] = useState('sarah.jenkins@skillsync.io');
  const [currentPassword, setCurrentPassword] = useState('password123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Notification toggles state
  const [aiAlertsEnabled, setAiAlertsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  // Load organization from PostgreSQL API on mount or when initialOrgId changes
  useEffect(() => {
    loadOrganizationData(initialOrgId);
  }, [initialOrgId]);

  const loadOrganizationData = async (targetId = null) => {
    setLoading(true);
    setApiError(null);
    try {
      const orgs = await fetchOrganizations();
      setAllOrgs(orgs || []);
      if (orgs && orgs.length > 0) {
        const activeId = targetId || orgId || initialOrgId;
        const targetOrg = orgs.find(o => o.id === activeId) || orgs[0];
        populateForm(targetOrg);
      } else {
        // If no orgs, default to create mode
        switchToCreateMode();
      }
    } catch (err) {
      console.warn('API fetch warning (DB may be initializing):', err);
      setApiError('Unable to connect to local PostgreSQL API server. Check if Express server on http://localhost:5000 is running.');
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (targetOrg) => {
    if (!targetOrg) return;
    setOrgId(targetOrg.id);
    setCompanyLegalName(targetOrg.name || '');
    setPrimaryIndustry(targetOrg.industry || 'Technology / SaaS');
    setCompanyWebsite(targetOrg.website || '');
    setCompanySize(targetOrg.company_size || '');
    setDescription(targetOrg.description || '');
    setLogoUrl(targetOrg.logoUrl || '');
    setStatus(targetOrg.status || 'active');
  };

  const switchToCreateMode = () => {
    setActiveOrgAction('create');
    setOrgId(null);
    setCompanyLegalName('');
    setPrimaryIndustry('Technology / SaaS');
    setCompanyWebsite('');
    setCompanySize('50-200 employees');
    setDescription('');
    setLogoUrl('');
    setStatus('active');
    setApiSuccess(null);
    setApiError(null);
    setShowDeleteConfirm(false);
  };

  const switchToEditMode = (targetId = null) => {
    setActiveOrgAction('edit');
    setApiSuccess(null);
    setApiError(null);
    setShowDeleteConfirm(false);
    const selectedId = targetId || orgId || (allOrgs[0]?.id);
    if (selectedId) {
      const targetOrg = allOrgs.find(o => o.id === selectedId) || allOrgs[0];
      populateForm(targetOrg);
    }
  };

  const switchToDeleteMode = (targetId = null) => {
    setActiveOrgAction('delete');
    setApiSuccess(null);
    setApiError(null);
    setShowDeleteConfirm(false);
    const selectedId = targetId || orgId || (allOrgs[0]?.id);
    if (selectedId) {
      const targetOrg = allOrgs.find(o => o.id === selectedId) || allOrgs[0];
      populateForm(targetOrg);
    }
  };

  const handleOrgDropdownChange = (selectedId) => {
    const targetOrg = allOrgs.find(o => o.id === selectedId);
    if (targetOrg) {
      populateForm(targetOrg);
    }
  };

  const handleSaveCompany = async (e) => {
    e.preventDefault();
    setSaving(true);
    setApiError(null);
    setApiSuccess(null);

    const payload = {
      name: companyLegalName,
      industry: primaryIndustry,
      website: companyWebsite,
      company_size: companySize,
      description: description,
      logoUrl: logoUrl,
      status: status,
    };

    try {
      if (activeOrgAction === 'create' || !orgId) {
        // Create new org in PostgreSQL
        const newId = `org-${Date.now()}`;
        const savedOrg = await createOrganization({ id: newId, ...payload });
        setOrgId(savedOrg.id);
        const updatedOrgs = [...allOrgs, savedOrg];
        setAllOrgs(updatedOrgs);
        setActiveOrgAction('edit');
        setApiSuccess(`Organization "${savedOrg.name}" created in PostgreSQL database!`);
        if (onShowToast) onShowToast(`Organization "${savedOrg.name}" created & persisted!`);
      } else {
        // Update existing org in PostgreSQL
        const savedOrg = await updateOrganization(orgId, payload);
        const updatedOrgs = allOrgs.map(o => o.id === orgId ? savedOrg : o);
        setAllOrgs(updatedOrgs);
        setApiSuccess(`Organization "${savedOrg.name}" profile & PostgreSQL database updated successfully.`);
        if (onShowToast) onShowToast(`Organization "${savedOrg.name}" updated!`);
      }
    } catch (err) {
      console.error('Error saving organization:', err);
      setApiError(err.message || 'Failed to save organization to PostgreSQL');
      if (onShowToast) onShowToast(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOrg = async () => {
    if (!orgId) return;
    setSaving(true);
    setApiError(null);
    try {
      const deletedName = companyLegalName || orgId;
      await deleteOrganization(orgId);
      setShowDeleteConfirm(false);
      
      // Refresh organization list from PostgreSQL
      const updatedOrgs = await fetchOrganizations();
      setAllOrgs(updatedOrgs || []);
      
      if (updatedOrgs && updatedOrgs.length > 0) {
        switchToEditMode(updatedOrgs[0].id);
      } else {
        switchToCreateMode();
      }

      setApiSuccess(`Organization "${deletedName}" removed from PostgreSQL database.`);
      if (onShowToast) onShowToast(`Organization "${deletedName}" permanently deleted from PostgreSQL.`);
    } catch (err) {
      setApiError(err.message || 'Failed to delete organization');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (onShowToast) onShowToast('Account credentials and security preferences updated.');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
              PLATFORM CONFIGURATION
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Manage your organization profile (PostgreSQL) and recruiter account preferences.
          </p>
        </div>

        <button
          onClick={() => loadOrganizationData(orgId)}
          disabled={loading}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Reload DB</span>
        </button>
      </div>

      {/* Global API Messages */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{apiError}</span>
        </div>
      )}

      {apiSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-medium">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{apiSuccess}</span>
        </div>
      )}

      {/* Grid: Left Organization Management | Right Account & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Organization Management Section */}
        <div className="bg-white rounded-3xl border border-[#E8ECF5] shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Card Header & 3 Organization Action Buttons */}
            <div className="p-6 border-b border-[#E8ECF5] bg-white space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Organization Management
                    </h2>
                    <p className="text-xs font-medium text-slate-500">
                      Create, Edit, or Delete organizations in PostgreSQL.
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {activeOrgAction === 'create' ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      NEW RECORD
                    </span>
                  ) : activeOrgAction === 'delete' ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                      DELETE MODE
                    </span>
                  ) : (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {status}
                    </span>
                  )}
                </div>
              </div>

              {/* 3 Action Options: Create Organization | Edit Organization | Delete Organization */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={switchToCreateMode}
                  className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeOrgAction === 'create'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Org</span>
                </button>

                <button
                  type="button"
                  onClick={() => switchToEditMode()}
                  className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeOrgAction === 'edit'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Edit Org</span>
                </button>

                <button
                  type="button"
                  onClick={() => switchToDeleteMode()}
                  className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeOrgAction === 'delete'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Org</span>
                </button>
              </div>

              {/* Dynamic PostgreSQL Organization Selector Dropdown (for Edit & Delete modes) */}
              {activeOrgAction !== 'create' && (
                <div className="pt-1 flex items-center gap-3 bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100">
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                    Select Organization:
                  </span>
                  {allOrgs.length > 0 ? (
                    <CustomDropdown
                      value={orgId}
                      onChange={handleOrgDropdownChange}
                      options={allOrgs.map(o => ({ value: o.id, label: o.name }))}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">No organizations available</span>
                  )}
                </div>
              )}
            </div>

            {/* Reused Company Information Form Component */}
            <form id="company-form" onSubmit={handleSaveCompany} className="p-6 space-y-5">
              {/* Organization Mark Logo Uploader Box */}
              <div className="bg-[#F3F5FC] border border-[#E2E6F5] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="font-extrabold text-xs text-indigo-600">SkillSync</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">BRAND</span>
                    </>
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-slate-900">Organization Mark</h4>
                    <span className="text-[9px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">PNG / SVG</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Logo URL (e.g. https://...)"
                    disabled={activeOrgAction === 'delete'}
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-mono rounded-lg p-2 outline-none mt-1 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>
              </div>

              {/* Legal Name & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={activeOrgAction === 'delete'}
                    value={companyLegalName}
                    onChange={(e) => setCompanyLegalName(e.target.value)}
                    className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Industry
                  </label>
                  <CustomDropdown
                    value={primaryIndustry}
                    onChange={setPrimaryIndustry}
                    disabled={activeOrgAction === 'delete'}
                    options={[
                      'Technology / SaaS',
                      'FinTech',
                      'E-Commerce',
                      'Healthcare',
                      'Artificial Intelligence'
                    ]}
                  />
                </div>
              </div>

              {/* Website & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Website
                  </label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled={activeOrgAction === 'delete'}
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pl-8 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Organization Status
                  </label>
                  <CustomDropdown
                    value={status}
                    onChange={setStatus}
                    disabled={activeOrgAction === 'delete'}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'expired', label: 'Expired' }
                    ]}
                  />
                </div>
              </div>

              {/* Company Size & Description / Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50-200 employees"
                    disabled={activeOrgAction === 'delete'}
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Address / Info
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled={activeOrgAction === 'delete'}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pl-8 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Live PostgreSQL Status Banner */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-indigo-950">SkillSync PostgreSQL Persistence</h4>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Drizzle ORM Direct
                  </span>
                </div>
                <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                  Organization metadata is persisted in your local PostgreSQL database (`organizations` table) with full CRUD support.
                </p>
              </div>
            </form>
          </div>

          {/* Card Footer Actions based on active action mode */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div>
              {activeOrgAction === 'delete' && (
                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Review details above before permanent deletion
                </span>
              )}
            </div>

            <div>
              {activeOrgAction === 'delete' ? (
                <div>
                  {showDeleteConfirm ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDeleteOrg}
                        disabled={saving}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        <span>Confirm Permanent Delete</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Organization</span>
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="submit"
                  form="company-form"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#3633D6] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>{activeOrgAction === 'create' ? 'Create Organization' : 'Save Company Info'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Account & Security Settings */}
        <div className="bg-white rounded-3xl border border-[#E8ECF5] shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-[#E8ECF5] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Account & Security Settings</h2>
                  <p className="text-xs font-medium text-slate-500">Recruiter credentials, authentication, and smart delivery alerts.</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                Personal
              </span>
            </div>

            <form id="account-form" onSubmit={handleSaveAccount} className="p-6 space-y-5">
              {/* Recruiter Full Name & Login Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Recruiter Full Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={recruiterName}
                      onChange={(e) => setRecruiterName(e.target.value)}
                      className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pl-8 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Recruiter Login Email
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={recruiterEmail}
                      onChange={(e) => setRecruiterEmail(e.target.value)}
                      className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pl-8 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Change Password Panel */}
              <div className="bg-[#F3F5FC] border border-[#E2E6F5] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Change Password
                  </span>
                  <span className="text-[10px] text-slate-400">Min. 8 characters</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 text-xs font-semibold rounded-xl p-2.5 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 text-xs font-semibold rounded-xl p-2.5 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Confirm New Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 text-xs font-semibold rounded-xl p-2.5 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Preferences with Toggle Switches */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  NOTIFICATION PREFERENCES
                </span>

                {/* Toggle 1 */}
                <div className="bg-[#F8FAFC] border border-[#E8ECF5] rounded-2xl p-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">
                        Email alerts for high AI match candidates (≥90%)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                        Instant notification as soon as algorithmic parsing discovers a tier-1 fit.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAiAlertsEnabled(!aiAlertsEnabled)}
                    className={`w-11 h-6 rounded-full p-1 transition-colors shrink-0 ${
                      aiAlertsEnabled ? 'bg-[#3633D6]' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      aiAlertsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="bg-[#F8FAFC] border border-[#E8ECF5] rounded-2xl p-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">
                        Interview reminders 1 hour before
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                        Syncs direct calendar dispatch with prepared candidate brief and resume highlights.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRemindersEnabled(!remindersEnabled)}
                    className={`w-11 h-6 rounded-full p-1 transition-colors shrink-0 ${
                      remindersEnabled ? 'bg-[#3633D6]' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      remindersEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              form="account-form"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Update Account & Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
