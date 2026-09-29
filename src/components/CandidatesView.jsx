import React, { useState } from 'react';
import { Search, Sparkles, Filter, Eye, UserPlus, ArrowRight } from 'lucide-react';
import { MOCK_CANDIDATES } from '../data/mockCandidates';
import CandidateDetailView from './CandidateDetailView';
import CustomDropdown from './CustomDropdown';

export default function CandidatesView({ selectedCandidate, onSelectCandidate, onClearSelectedCandidate, onShowToast }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  if (selectedCandidate) {
    return (
      <CandidateDetailView
        candidate={selectedCandidate}
        onBack={onClearSelectedCandidate}
        onShowToast={onShowToast}
      />
    );
  }

  const filteredCandidates = MOCK_CANDIDATES.filter(cand => {
    const matchesSearch = 
      cand.name.toLowerCase().includes(search.toLowerCase()) ||
      cand.email.toLowerCase().includes(search.toLowerCase()) ||
      cand.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cand.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
              TALENT POOL
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">
              428 Candidates Evaluated
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Candidates
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Search, filter, and review AI-ranked candidate profiles across active job requisitions.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Add Candidate modal opened')}
          className="inline-flex items-center gap-2 bg-[#3633D6] hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all shrink-0 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Candidate</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8ECF5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name, role, email..."
            className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-800 text-xs font-medium rounded-xl py-2.5 pl-9 pr-4 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <CustomDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'All', label: 'All Stages' },
              { value: 'Shortlisted', label: 'Shortlisted' },
              { value: 'Under Review', label: 'Under Review' },
              { value: 'Interview', label: 'Interview' }
            ]}
            className="w-44"
          />
        </div>
      </div>

      {/* Candidates List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            onClick={() => onSelectCandidate(cand)}
            className="bg-white rounded-3xl p-5 border border-[#E8ECF5] shadow-xs hover:shadow-card hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={cand.avatar}
                  alt={cand.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-50"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cand.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500">{cand.role}</p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {cand.aiLabel}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
              <span>📍 {cand.location}</span>
              <span>💼 {cand.experienceYears} Years Exp</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                Stage: {cand.status}
              </span>

              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
