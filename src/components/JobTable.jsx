import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import { 

  Search, 
  RotateCcw, 
  ChevronDown, 
  MapPin, 
  Wifi, 
  Eye, 
  Pencil, 
  Trash2,
  Code,
  Database,
  Palette,
  Compass,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function JobTable({ 
  jobs, 
  onViewJob, 
  onEditJob, 
  onDeleteJob,
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  onResetFilters
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter jobs logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDept = departmentFilter === 'All' || job.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Helper to render role icons based on iconType
  const renderJobIcon = (iconType) => {
    switch (iconType) {
      case 'code':
        return <Code className="w-4 h-4 text-indigo-600" />;
      case 'server':
        return <Database className="w-4 h-4 text-blue-600" />;
      case 'palette':
        return <Palette className="w-4 h-4 text-purple-600" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-violet-600" />;
      case 'chart':
      default:
        return <BarChart3 className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF5] shadow-xs overflow-hidden">
      {/* Filter and Search Bar Header */}
      <div className="p-4 bg-white border-b border-[#E8ECF5] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs by title or keyword..."
            className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-800 text-xs font-medium rounded-xl py-2.5 pl-9 pr-4 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Dropdowns & Reset Button */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto">
          {/* Department Filter */}
          <CustomDropdown
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={[
              { value: 'All', label: 'All Departments' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Design', label: 'Design' },
              { value: 'Product', label: 'Product' }
            ]}
            className="w-40"
          />

          {/* Status Filter */}
          <CustomDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'All', label: 'All Statuses' },
              { value: 'Active', label: 'Active' },
              { value: 'Closed', label: 'Closed' }
            ]}
            className="w-36"
          />

          {/* Reset Button */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Jobs Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E8ECF5] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">JOB TITLE</th>
              <th className="py-3.5 px-5">DEPARTMENT</th>
              <th className="py-3.5 px-5">LOCATION</th>
              <th className="py-3.5 px-5">EXPERIENCE</th>
              <th className="py-3.5 px-5">APPLICANTS</th>
              <th className="py-3.5 px-5">STATUS</th>
              <th className="py-3.5 px-5 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF5]">
            {paginatedJobs.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-400 text-sm">
                  No job requisitions match your search criteria.
                </td>
              </tr>
            ) : (
              paginatedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* Job Title Column */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {renderJobIcon(job.iconType)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {job.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {job.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Department Badge */}
                  <td className="py-4 px-5">
                    <span className="inline-block bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-lg">
                      {job.department}
                    </span>
                  </td>

                  {/* Location Column */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                      {job.locationType === 'remote' ? (
                        <Wifi className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{job.location}</span>
                    </div>
                  </td>

                  {/* Experience Column */}
                  <td className="py-4 px-5">
                    <span className="text-slate-600 text-xs font-medium">
                      {job.experience}
                    </span>
                  </td>

                  {/* Applicants Column */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        {job.applicantsCount}
                      </span>
                      {job.newApplicants ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          {job.newApplicants}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          {job.statusText || ''}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="py-4 px-5">
                    {job.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#64748B] text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></span>
                        Closed
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewJob(job)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditJob(job)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Requisition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteJob(job.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Requisition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Bar */}
      <div className="p-4 bg-white border-t border-[#E8ECF5] flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          Showing <span className="text-slate-900 font-bold">{filteredJobs.length}</span> of {jobs.length} total requisitions
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                currentPage === page
                  ? 'bg-[#3633D6] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
