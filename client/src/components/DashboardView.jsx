import React from 'react';
import { 
  Briefcase, 
  Users, 
  Star, 
  Calendar, 
  ArrowRight, 
  Video, 
  Clock, 
  TrendingUp, 
  Sparkles,
  Plus
} from 'lucide-react';
import { MOCK_CANDIDATES, MOCK_INTERVIEWS } from '../data/mockCandidates';

export default function DashboardView({ onSelectCandidate, onNavigateCandidates, onScheduleInterview }) {
  const topStats = [
    {
      title: 'TOTAL JOBS',
      value: '12',
      change: '↑ +2 new this month',
      changeColor: 'text-indigo-600',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'TOTAL CANDIDATES',
      value: '428',
      change: '📈 +34 active applicants',
      changeColor: 'text-purple-600',
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      title: 'SHORTLISTED',
      value: '64',
      change: '✔ 15% of total pool',
      changeColor: 'text-emerald-600',
      icon: Star,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'INTERVIEWS',
      value: '18',
      change: '⏰ 4 scheduled today',
      changeColor: 'text-blue-600',
      icon: Calendar,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
              WORKSPACE LIVE
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Welcome back, Sarah. Here is an overview of your recruitment pipeline today.
          </p>
        </div>

        {/* User Card on Top Right */}
        <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-2xl border border-[#E8ECF5] shadow-2xs self-start sm:self-auto">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
            alt="Sarah Jenkins"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">Sarah Jenkins</h4>
            <p className="text-[11px] font-medium text-slate-500">Senior Recruiter</p>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E8ECF5] shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.iconBg}`}>
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
                  {stat.value}
                </span>
                <span className={`text-xs font-semibold ${stat.changeColor} mt-1 block`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Left Recent Candidates + Inflow | Right Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Candidates Table Card */}
          <div className="bg-white rounded-2xl border border-[#E8ECF5] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#E8ECF5] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="font-extrabold text-base text-slate-900">Recent Candidates</h3>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  4 New
                </span>
              </div>
              <button
                onClick={onNavigateCandidates}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
              >
                <span>View All Candidates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E8ECF5] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-5">CANDIDATE NAME</th>
                    <th className="py-3.5 px-5">APPLIED FOR</th>
                    <th className="py-3.5 px-5">EXPERIENCE</th>
                    <th className="py-3.5 px-5">AI MATCH SCORE</th>
                    <th className="py-3.5 px-5">STAGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECF5]">
                  {MOCK_CANDIDATES.map((cand) => (
                    <tr
                      key={cand.id}
                      onClick={() => onSelectCandidate(cand)}
                      className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Name Column */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                            {cand.initials}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {cand.name}
                            </h4>
                            <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
                              {cand.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Applied For */}
                      <td className="py-4 px-5">
                        <span className="text-xs font-semibold text-slate-700">
                          {cand.appliedFor}
                        </span>
                      </td>

                      {/* Experience */}
                      <td className="py-4 px-5">
                        <span className="text-xs font-medium text-slate-600">
                          {cand.experienceYears} Years
                        </span>
                      </td>

                      {/* AI Match Score Badge */}
                      <td className="py-4 px-5">
                        {cand.aiTier === 'Elite' ? (
                          <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            94% Elite Match
                          </span>
                        ) : cand.aiTier === 'High Fit' ? (
                          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            87% High Fit
                          </span>
                        ) : cand.aiTier === 'Strong Match' ? (
                          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            84% Strong Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 text-slate-400" />
                            78% Moderate Fit
                          </span>
                        )}
                      </td>

                      {/* Stage Tag */}
                      <td className="py-4 px-5">
                        {cand.status === 'Shortlisted' ? (
                          <span className="inline-block bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                            Shortlisted
                          </span>
                        ) : cand.status === 'Interview' ? (
                          <span className="inline-block bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                            Interview
                          </span>
                        ) : (
                          <span className="inline-block bg-indigo-100/80 text-indigo-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                            Under Review
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Application Inflow Chart Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8ECF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-base text-slate-900">Application Inflow</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md">
                  +28%
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                6-Month applicant volume overview (Jan – Jun)
              </p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 block tracking-tight">1,842</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Submissions</span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="flex items-end gap-3 h-24 pt-4">
              {[
                { month: 'Jan', val: 'h-10 bg-indigo-100' },
                { month: 'Feb', val: 'h-12 bg-indigo-100' },
                { month: 'Mar', val: 'h-8 bg-indigo-100' },
                { month: 'Apr', val: 'h-14 bg-indigo-100' },
                { month: 'May', val: 'h-16 bg-indigo-200' },
                { month: 'Jun', val: 'h-20 bg-[#3633D6]' },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`w-7 rounded-lg transition-all ${bar.val}`}></div>
                  <span className="text-[10px] font-semibold text-slate-400">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Interviews Panel */}
        <div className="bg-white rounded-2xl border border-[#E8ECF5] shadow-xs p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8ECF5]">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Upcoming Interviews</h3>
                <p className="text-xs font-medium text-slate-500">Today & Tomorrow Schedule</p>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            {/* Interview List */}
            <div className="mt-5 space-y-4">
              {MOCK_INTERVIEWS.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#F8FAFC] border border-[#E8ECF5] rounded-2xl p-4 space-y-3 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.candidateName}</h4>
                      <p className="text-xs font-medium text-slate-500">{item.role}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      item.isToday ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.time}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 font-medium flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Interviewer: {item.interviewer}</span>
                  </div>

                  {item.platform === 'Google Meet' ? (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-indigo-600" />
                        Google Meet
                      </span>
                      <a
                        href={item.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#3633D6] hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Meet
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.stage}
                      </span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-200/60 px-2.5 py-1 rounded-lg">
                        Scheduled
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Button */}
          <button
            onClick={onScheduleInterview}
            className="w-full py-3 bg-[#EEF2FF] hover:bg-indigo-100 text-[#3633D6] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <span>Schedule another interview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
