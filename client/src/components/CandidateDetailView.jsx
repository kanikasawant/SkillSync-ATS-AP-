import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Calendar, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  GraduationCap, 
  Sparkles,
  ExternalLink,
  Flag,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function CandidateDetailView({ candidate, onBack, onShowToast }) {
  const [candidateStatus, setCandidateStatus] = useState(candidate?.status || 'Shortlisted');

  if (!candidate) return null;

  const handleStatusChange = (newStatus) => {
    setCandidateStatus(newStatus);
    onShowToast(`Candidate ${candidate.name} updated to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Action Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Candidates</span>
          </button>
          <span>/</span>
          <span className="font-bold text-slate-900">{candidate.name}</span>
          <span>—</span>
          <span>{candidate.appliedFor}</span>
          <span>/</span>
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[11px]">
            Application #{candidate.id}
          </span>
        </div>

        {/* Quick Action Pills */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full mr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Stage: {candidateStatus}
          </span>
          <button
            onClick={() => handleStatusChange('Shortlisted')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              candidateStatus === 'Shortlisted'
                ? 'bg-[#3633D6] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            Shortlist
          </button>
          <button
            onClick={() => handleStatusChange('Interview Scheduled')}
            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#3633D6] border border-indigo-200/60 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Schedule
          </button>
          <button
            onClick={() => handleStatusChange('Rejected')}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            Reject
          </button>
        </div>
      </div>

      {/* Main Candidate Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8ECF5] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {candidate.name}
                </h1>
                {candidate.readyToInterview && (
                  <span className="bg-indigo-100/80 text-indigo-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Ready to Interview
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-500">
                {candidate.role} • {candidate.experience} • {candidate.location}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Badges & Social Links */}
        <div className="pt-2 border-t border-[#E8ECF5] space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#F3F5FC] text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {candidate.email}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#F3F5FC] text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {candidate.phone}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#F3F5FC] text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {candidate.locationDetail || candidate.location}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {candidate.github && (
              <a
                href={`https://${candidate.github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#F3F5FC] hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-slate-500" />
                {candidate.github}
              </a>
            )}
            {candidate.linkedin && (
              <a
                href="#"
                className="inline-flex items-center gap-1.5 bg-[#F3F5FC] hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                {candidate.linkedin}
              </a>
            )}
            {candidate.portfolio && (
              <a
                href={`https://${candidate.portfolio}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#F3F5FC] hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                {candidate.portfolio}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Resume Specs | Right SkillSync AI Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work History Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8ECF5] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8ECF5]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Experience & Work History</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {candidate.experienceHistory?.length || 2} roles logged
              </span>
            </div>

            <div className="space-y-6">
              {candidate.experienceHistory?.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-indigo-100 space-y-2">
                  <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-white"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900">{exp.role}</h4>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-indigo-900">{exp.company} • {exp.location}</p>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                    {exp.bullets}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Tech Stack Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8ECF5] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8ECF5]">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Skills & Technical Stack</h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {candidate.skills?.map((sk, sIdx) => (
                <span 
                  key={sIdx}
                  className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200/50"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Highlighted Projects & Open Source */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8ECF5] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8ECF5]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Highlighted Projects & Open Source</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Verified Repos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {candidate.projects?.map((proj, pIdx) => (
                <div key={pIdx} className="bg-[#F8FAFC] border border-[#E8ECF5] rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm text-slate-900">{proj.name}</h4>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                        {proj.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-semibold text-slate-500">{proj.tech}</span>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8ECF5] shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8ECF5]">
              <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Education</h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{candidate.education?.degree}</h4>
                <p className="text-xs font-medium text-slate-500">{candidate.education?.institution}</p>
              </div>
              <div className="text-right self-start sm:self-auto">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md block">
                  {candidate.education?.period}
                </span>
                <span className="text-xs font-bold text-emerald-700 block mt-1">
                  {candidate.education?.cgpa}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SkillSync AI Evaluation Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8ECF5] shadow-xs space-y-6 sticky top-20">
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8ECF5]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">
                  SkillSync AI Evaluation
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">
                Model v4.2 Calibrated
              </span>
            </div>

            {/* Circular Meter Gauge */}
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#EEF2FF"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3633D6"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - candidate.aiBreakdown.weightedFit / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {candidate.aiBreakdown.weightedFit}%
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    WEIGHTED FIT
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed px-2">
                Score represents how well the candidate matches the selected job requirements based on verified code samples, architectural experience, and project evidence.
              </p>
            </div>

            {/* Skill Confidence Breakdown */}
            <div className="space-y-3 pt-2 border-t border-[#E8ECF5]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Skill Confidence Breakdown</span>
                <span className="text-[10px] text-slate-400 font-normal">Evidence-backed</span>
              </div>

              <div className="space-y-2.5">
                {candidate.aiBreakdown.confidence.map((cf, cIdx) => (
                  <div key={cIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 flex items-center gap-1.5">
                        {cf.skill}
                        {cf.flag && <Flag className="w-3 h-3 text-rose-500" />}
                      </span>
                      <span className={cf.flag ? 'text-rose-600 font-bold' : 'text-slate-900 font-bold'}>
                        {cf.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cf.color}`}
                        style={{ width: `${cf.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched Skills vs Identified Gaps */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> MATCHED SKILLS
                </span>
                <ul className="text-xs text-emerald-950 font-medium space-y-1">
                  {candidate.aiBreakdown.matchedSkills.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-center gap-1">
                      <span>✓</span> {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-3 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> IDENTIFIED GAPS
                </span>
                <ul className="text-xs text-rose-950 font-medium space-y-1">
                  {candidate.aiBreakdown.identifiedGaps.map((g, gIdx) => (
                    <li key={gIdx} className="flex items-center gap-1">
                      <span>⚠</span> {g}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-rose-700 leading-tight pt-1">
                  Not evidenced in public repos or primary work history.
                </p>
              </div>
            </div>

            {/* Recruiter Advisory */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  Recruiter Advisory
                </h4>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed font-medium italic">
                "{candidate.aiBreakdown.advisoryNote}"
              </p>
              <p className="text-[10px] text-indigo-500 font-medium pt-1">
                ⓘ SkillSync AI acts as decision support. Final hiring decisions remain strictly with the recruiter.
              </p>
            </div>

            {/* Bottom Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleStatusChange('Shortlisted')}
                className="w-full py-3 bg-[#3633D6] hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Shortlist Candidate</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleStatusChange('Interview Scheduled')}
                  className="py-2.5 bg-indigo-50 hover:bg-indigo-100 text-[#3633D6] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Interview</span>
                </button>
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
