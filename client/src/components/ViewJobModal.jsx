import React from 'react';
import { X, MapPin, Wifi, Users, Sparkles, Building, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

export default function ViewJobModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-start justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[11px] font-bold tracking-widest text-indigo-300 uppercase block mb-1">
              REQUISITION SPECIFICATION
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">{job.title}</h2>
            <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-indigo-200">
              <span className="bg-white/10 px-2.5 py-0.5 rounded-md text-white">{job.id}</span>
              <span>•</span>
              <span className="bg-indigo-500/30 px-2.5 py-0.5 rounded-md text-indigo-100">{job.department}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {job.locationType === 'remote' ? <Wifi className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                {job.location}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Subtle background graphic */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#F3F5FC] rounded-2xl border border-[#E2E6F5]">
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Applicants</span>
              <span className="text-xl font-extrabold text-slate-900">{job.applicantsCount}</span>
            </div>
            <div className="text-center border-x border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Experience</span>
              <span className="text-base font-bold text-slate-800">{job.experience}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
              <span className={`inline-block mt-0.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
              }`}>
                {job.status}
              </span>
            </div>
          </div>

          {/* AI Match Overview */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                SkillSync AI Match Insight
              </h4>
              <p className="text-xs text-indigo-900 mt-1 leading-relaxed">
                SkillSync Neural v2.4 has calculated high candidate affinity score (94%) for this requisition. 
                Top applicant skills matched: React, TypeScript, System Architecture, and Team Leadership.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Role Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {job.description || 'No detailed description specified for this requisition.'}
            </p>
          </div>

          {/* Pipeline Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Candidate Pipeline Stages
            </h4>
            <div className="space-y-2">
              {[
                { stage: 'Screening & AI Rank', count: 32, status: 'Completed' },
                { stage: 'Technical Assessment', count: 18, status: 'In Progress' },
                { stage: 'Hiring Manager Interview', count: 8, status: 'Scheduled' },
                { stage: 'Final Offer', count: 2, status: 'Pending Approval' },
              ].map((stg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-semibold text-slate-800">{stg.stage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">{stg.count} candidates</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {stg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
}
