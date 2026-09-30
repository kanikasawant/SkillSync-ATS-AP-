import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  TrendingUp, 
  MoreVertical, 
  ChevronLeft,
  ChevronRight,
  Building2,
  CheckCircle,
  AlertOctagon,
  Sparkles,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Eye,
  Calendar,
  Pencil,
  Trash2
} from 'lucide-react';
import SvgSparkline from './SvgSparkline';
import CustomDropdown from './CustomDropdown';

function CompanyLogoAvatar({ org }) {
  const [hasError, setHasError] = useState(false);
  const letter = org.letter || (org.name ? org.name.trim().charAt(0).toUpperCase() : 'O');

  if (org.logoUrl && !hasError) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shrink-0 shadow-2xs overflow-hidden flex items-center justify-center p-0.5">
        <img
          src={org.logoUrl}
          alt={org.name || 'Organization Logo'}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold text-base flex items-center justify-center border border-blue-200/80 shrink-0 shadow-2xs">
      {letter}
    </div>
  );
}

export default function OrganizationsDirectory({ 
  organizations, 
  onOnboardNew, 
  onSelectOrganization,
  onEditOrganization,
  onDeleteOrganization,
  onShowToast
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [orgToDelete, setOrgToDelete] = useState(null);

  // Sorting state
  const [sortField, setSortField] = useState('name'); // 'name' | 'plan' | 'status' | 'seats' | 'createdDate'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  // Multi-select state
  const [selectedOrgIds, setSelectedOrgIds] = useState([]);
  const [activeMenuOrgId, setActiveMenuOrgId] = useState(null);

  // Toggle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtering logic
  let processedOrgs = organizations.filter((org) => {
    const matchesSearch = 
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.shortName.toLowerCase().includes(search.toLowerCase()) ||
      org.domain.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || org.status === statusFilter;
    const matchesPlan = planFilter === 'All' || org.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Sorting logic
  processedOrgs.sort((a, b) => {
    let aVal = a.name;
    let bVal = b.name;

    if (sortField === 'plan') {
      aVal = a.plan;
      bVal = b.plan;
    } else if (sortField === 'status') {
      aVal = a.status;
      bVal = b.status;
    } else if (sortField === 'seats') {
      aVal = a.recruiterSeats.current;
      bVal = b.recruiterSeats.current;
    } else if (sortField === 'createdDate') {
      aVal = new Date(a.createdDate).getTime() || 0;
      bVal = new Date(b.createdDate).getTime() || 0;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Dynamic Pagination calculations
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(processedOrgs.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrgs = processedOrgs.slice(startIndex, startIndex + itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Select all handler
  const handleSelectAll = () => {
    if (selectedOrgIds.length === processedOrgs.length) {
      setSelectedOrgIds([]);
    } else {
      setSelectedOrgIds(processedOrgs.map(o => o.id));
    }
  };

  const handleToggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedOrgIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const targetOrgs = selectedOrgIds.length > 0 
      ? processedOrgs.filter(o => selectedOrgIds.includes(o.id))
      : processedOrgs;

    const headers = ['ID,Name,Domain,Plan,Status,Seats,CreatedDate'];
    const rows = targetOrgs.map(o => `${o.id},"${o.name}",${o.domain},${o.plan},${o.status},${o.recruiterSeats.current}/${o.recruiterSeats.max},${o.createdDate}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `talentai_organizations_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast && onShowToast(`Exported ${targetOrgs.length} organization(s) to CSV.`);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-blue-600 font-bold" />
      : <ArrowDown className="w-3 h-3 text-blue-600 font-bold" />;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Organizations Directory
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage tenant organizations, subscriptions, and AI usage quotas.
          </p>
        </div>
      </div>

      {/* Summary KPI Stat Cards with SVG Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Total Organizations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              TOTAL ORGANIZATIONS
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-slate-900">
                  {organizations.length}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                  <TrendingUp className="w-3 h-3" />
                  Live DB
                </span>
              </div>
            </div>
            <div className="opacity-80 group-hover:opacity-100 transition-opacity">
              <SvgSparkline color="#2563EB" data={[12, 14, 18, 22, 28, 34, 38, 42, 48, 52]} />
            </div>
          </div>
        </div>

        {/* Card 2: Active Subscriptions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ACTIVE SUBSCRIPTIONS
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-3xl font-bold font-serif text-slate-900">
                {organizations.filter(o => o.status === 'Active' || o.status === 'active').length}
              </span>
            </div>
            <div className="opacity-80 group-hover:opacity-100 transition-opacity">
              <SvgSparkline color="#10B981" data={[10, 15, 14, 19, 23, 29, 32, 36, 40, 44]} />
            </div>
          </div>
        </div>

        {/* Card 3: Suspended / Expired Accounts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              EXPIRED / SUSPENDED
            </span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertOctagon className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-3xl font-bold font-serif text-red-600">
                {organizations.filter(o => o.status === 'Expired' || o.status === 'Suspended' || o.status === 'expired').length}
              </span>
            </div>
            <div className="opacity-80 group-hover:opacity-100 transition-opacity">
              <SvgSparkline color="#EF4444" data={[8, 12, 10, 15, 14, 18, 16, 20, 15, 14]} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar (if items selected) */}
      {selectedOrgIds.length > 0 && (
        <div className="bg-blue-900 text-white p-3.5 px-6 rounded-2xl shadow-xl border border-blue-700 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="bg-blue-600 px-2.5 py-1 rounded-lg font-mono font-bold">
              {selectedOrgIds.length} Selected
            </span>
            <span>Perform batch operations on target tenant organizations</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export ({selectedOrgIds.length})</span>
            </button>

            <button
              onClick={() => {
                onShowToast && onShowToast(`Bulk action applied to ${selectedOrgIds.length} organization(s).`);
                setSelectedOrgIds([]);
              }}
              className="px-3 py-1.5 bg-white text-blue-900 hover:bg-blue-50 rounded-lg text-xs font-bold transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar Container */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative flex-1 group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by organization name or domain..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-slate-50/80 border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all shadow-xs"
          />
        </div>

        {/* Right Dropdowns & Download */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 min-w-0">
            <label className="text-xs font-bold text-slate-500 shrink-0">Status:</label>
            <CustomDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Active', label: 'Active' },
                { value: 'Suspended', label: 'Suspended' },
                { value: 'Cancelled', label: 'Cancelled' },
              ]}
            />
          </div>

          <div className="flex items-center gap-1.5 min-w-0">
            <label className="text-xs font-bold text-slate-500 shrink-0">Plan:</label>
            <CustomDropdown
              value={planFilter}
              onChange={setPlanFilter}
              options={[
                { value: 'All', label: 'All Plans' },
                { value: 'Enterprise', label: 'Enterprise' },
                { value: 'Growth', label: 'Growth' },
                { value: 'Starter', label: 'Starter' },
              ]}
            />
          </div>

          <button
            onClick={handleExportCSV}
            title="Export CSV"
            className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all hover:scale-105 active:scale-95 shadow-2xs shrink-0"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Upgraded Data Table */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-300 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider select-none">
                {/* Select All Checkbox */}
                <th className="py-4 px-4 w-10 text-center border-r border-slate-200/60">
                  <input
                    type="checkbox"
                    checked={processedOrgs.length > 0 && selectedOrgIds.length === processedOrgs.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-blue-600 border-slate-400 focus:ring-blue-500 cursor-pointer"
                  />
                </th>

                {/* Column 1: Org Name & Domain */}
                <th 
                  onClick={() => handleSort('name')}
                  className="py-4 px-4 cursor-pointer hover:text-blue-600 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Organization & Domain</span>
                    {renderSortIcon('name')}
                  </div>
                </th>

                {/* Column 2: Plan */}
                <th 
                  onClick={() => handleSort('plan')}
                  className="py-4 px-4 cursor-pointer hover:text-blue-600 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Plan</span>
                    {renderSortIcon('plan')}
                  </div>
                </th>

                {/* Column 3: Status */}
                <th 
                  onClick={() => handleSort('status')}
                  className="py-4 px-4 cursor-pointer hover:text-blue-600 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    {renderSortIcon('status')}
                  </div>
                </th>

                {/* Column 4: Recruiter Seats */}
                <th 
                  onClick={() => handleSort('seats')}
                  className="py-4 px-4 cursor-pointer hover:text-blue-600 transition-colors group min-w-[180px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Recruiter Seats</span>
                    {renderSortIcon('seats')}
                  </div>
                </th>

                {/* Column 5: Created Date */}
                <th 
                  onClick={() => handleSort('createdDate')}
                  className="py-4 px-4 cursor-pointer hover:text-blue-600 transition-colors group whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Created Date</span>
                    {renderSortIcon('createdDate')}
                  </div>
                </th>

                {/* Column 6: Actions */}
                <th className="py-4 px-6 text-right">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/90 text-sm">
              {paginatedOrgs.length > 0 ? (
                paginatedOrgs.map((org) => {
                  const seatPercentage = Math.round((org.recruiterSeats.current / org.recruiterSeats.max) * 100);
                  const isActive = org.status === 'Active';
                  const isSuspended = org.status === 'Suspended';
                  const isCancelled = org.status === 'Cancelled';
                  const isSelected = selectedOrgIds.includes(org.id);

                  return (
                    <tr 
                      key={org.id} 
                      onClick={() => onSelectOrganization(org)}
                      className={`cursor-pointer group ${
                        isSelected 
                          ? 'bg-blue-50/70 border-l-4 border-l-blue-600' 
                          : 'border-l-4 border-l-transparent'
                      }`}
                    >
                      {/* Checkbox Column */}
                      <td className="py-4 px-4 w-10 text-center border-r border-slate-200/60" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleToggleSelectRow(org.id, e)}
                          className="w-4 h-4 rounded text-blue-600 border-slate-400 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Org Name & Domain - Static (No hover color changes) */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          <CompanyLogoAvatar org={org} />
                          <div>
                            <div className="font-serif font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{org.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-medium text-slate-400 mt-0.5">
                              <span>{org.shortDomain || org.domain}</span>
                              <a 
                                href={`https://${org.domain}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                title="Open Website"
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plan Text */}
                      <td className="py-4 px-4 font-semibold text-xs">
                        <span className={
                          org.plan === 'Enterprise'
                            ? 'text-blue-600 font-bold'
                            : org.plan === 'Growth'
                            ? 'text-indigo-600 font-bold'
                            : 'text-slate-600 font-medium'
                        }>
                          {org.plan}
                        </span>
                      </td>

                      {/* Status Text */}
                      <td className="py-4 px-4 font-semibold text-xs">
                        <span className={`inline-flex items-center gap-1.5 font-bold ${
                          isActive
                            ? 'text-emerald-600'
                            : isSuspended
                            ? 'text-red-600'
                            : 'text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : isSuspended ? 'bg-red-500' : 'bg-slate-400'
                          }`} />
                          {org.status}
                        </span>
                      </td>

                      {/* Recruiter Seats Gauge Progress */}
                      <td className="py-4 px-4 min-w-[180px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-200/80 h-2 rounded-full overflow-hidden p-0.5 shadow-2xs">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isSuspended 
                                  ? 'bg-gradient-to-r from-red-600 to-rose-500' 
                                  : seatPercentage >= 100 
                                  ? 'bg-gradient-to-r from-red-500 to-amber-500' 
                                  : 'bg-gradient-to-r from-blue-600 to-indigo-500'
                              }`}
                              style={{ width: `${Math.min(seatPercentage, 100)}%` }}
                            />
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-mono font-bold text-slate-700 whitespace-nowrap">
                              {org.recruiterSeats.current}/{org.recruiterSeats.max}
                            </span>
                            {seatPercentage >= 100 && (
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 rounded border border-red-200">
                                Full
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-4 text-xs font-semibold text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{org.createdDate}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => onSelectOrganization(org)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuOrgId(activeMenuOrgId === org.id ? null : org.id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                              title="More Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* 3-Dots Action Popover Menu */}
                            {activeMenuOrgId === org.id && (
                              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl border border-slate-200/90 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuOrgId(null);
                                    onSelectOrganization(org);
                                  }}
                                  className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                                  <span>View Dashboard</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuOrgId(null);
                                    if (onEditOrganization) {
                                      onEditOrganization(org);
                                    }
                                  }}
                                  className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-indigo-600" />
                                  <span>Edit Organization</span>
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuOrgId(null);
                                    if (onShowToast) onShowToast(`Status for "${org.name}" toggled.`);
                                  }}
                                  className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <AlertOctagon className="w-3.5 h-3.5 text-amber-500" />
                                  <span>{org.status === 'Active' ? 'Suspend Tenant' : 'Activate Tenant'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuOrgId(null);
                                    if (onShowToast) onShowToast(`API Credentials re-issued for ${org.name}`);
                                  }}
                                  className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                                  <span>Re-issue API Keys</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuOrgId(null);
                                    setOrgToDelete(org);
                                  }}
                                  className="w-full px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer border-t border-slate-100 mt-1 pt-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                  <span>Delete Organization</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 font-medium">
                    No organizations match your current search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar Footer */}
        <div className="py-4 px-6 bg-slate-100/60 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <div>
            Showing <span className="text-slate-900 font-bold">{processedOrgs.length > 0 ? startIndex + 1 : 0}</span> to <span className="text-slate-900 font-bold">{Math.min(startIndex + itemsPerPage, processedOrgs.length)}</span> of <span className="text-slate-900 font-bold">{processedOrgs.length}</span> entries
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-30 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pageNumbers.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                    : 'hover:bg-slate-200 text-slate-600 font-semibold'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-30 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {orgToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-50 rounded-xl">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete Organization?</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Are you sure you want to permanently delete <strong className="text-slate-900">{orgToDelete.name}</strong> from local PostgreSQL database? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setOrgToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeleteOrganization) {
                    onDeleteOrganization(orgToDelete.id);
                  }
                  setOrgToDelete(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
