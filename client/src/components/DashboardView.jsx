import React, { useState } from 'react';
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
  Plus,
  PieChart,
  BarChart3,
  Download,
  Activity,
  CheckCircle2,
  Building2,
  FileText,
  UserCheck,
  ChevronDown,
  Check
} from 'lucide-react';

export default function DashboardView({ onSelectCandidate, onNavigateCandidates, onScheduleInterview, onShowToast }) {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const dateOptions = ['Last 30 Days', 'This Quarter', 'Year to Date'];

  const topStats = [
    {
      title: 'TOTAL JOBS',
      value: '12',
      change: '+2 new this month',
      changeColor: 'text-indigo-600',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'TOTAL CANDIDATES',
      value: '428',
      change: '+34 active applicants',
      changeColor: 'text-purple-600',
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      title: 'SHORTLISTED',
      value: '64',
      change: '15% of total pool',
      changeColor: 'text-emerald-600',
      icon: Star,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'INTERVIEWS',
      value: '18',
      change: '4 scheduled today',
      changeColor: 'text-blue-600',
      icon: Calendar,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Aarav Mehta',
      action: 'moved to Interview stage for Frontend Developer',
      time: '12 minutes ago',
      icon: UserCheck,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 2,
      user: 'Nexus Technologies',
      action: 'onboarded into PostgreSQL Super-Admin workspace',
      time: '1 hour ago',
      icon: Building2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 3,
      user: 'Riya Shah',
      action: 'submitted application for Senior React Developer',
      time: '3 hours ago',
      icon: FileText,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      id: 4,
      user: 'TalentAI Engine',
      action: 'completed AI Match Score evaluations for 34 candidates',
      time: '5 hours ago',
      icon: Sparkles,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      id: 5,
      user: 'Sarah Jenkins',
      action: 'updated organization default seat allocation rules',
      time: 'Yesterday at 4:15 PM',
      icon: CheckCircle2,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

        {/* Top Right Controls: Date Range Filter + Export PDF + User Card */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Sleek Date Range Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#E8ECF5] shadow-xs text-xs font-bold text-slate-800 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{dateRange}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>

            {isDateDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setIsDateDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                  {dateOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setDateRange(option);
                        setIsDateDropdownOpen(false);
                        if (onShowToast) onShowToast(`Dashboard dataset filtered for ${option}`);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors ${
                        dateRange === option 
                          ? 'bg-indigo-50 text-indigo-700 font-bold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{option}</span>
                      {dateRange === option && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export Report PDF Button */}
          <button
            onClick={() => {
              const printWindow = window.open('', '_blank');
              if (!printWindow) {
                if (onShowToast) onShowToast('Please allow popups to export PDF.');
                return;
              }

              printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                  <head>
                    <title>TalentAI_Executive_Report_${dateRange.replace(/\s+/g, '_')}</title>
                    <style>
                      @page {
                        size: portrait;
                        margin: 8mm 12mm;
                      }
                      * { box-sizing: border-box; }
                      body { font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #0f172a; background: #fff; margin: 0; }
                      .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 14px; }
                      .logo { font-size: 20px; font-weight: 800; color: #2563eb; }
                      .badge { background: #dbeafe; color: #1e40af; font-weight: 700; padding: 3px 10px; border-radius: 6px; font-size: 11px; }
                      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px; }
                      .card { border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 8px; background: #f8fafc; }
                      .card-title { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; }
                      .card-val { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 2px; }
                      .card-change { font-size: 10px; font-weight: 600; color: #2563eb; }
                      .section { border: 1px solid #e2e8f0; padding: 10px 14px; border-radius: 8px; margin-bottom: 12px; page-break-inside: avoid; }
                      .section-title { font-size: 13px; font-weight: 800; margin-bottom: 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
                      .row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; }
                      .footer { font-size: 10px; text-align: center; color: #94a3b8; margin-top: 12px; }
                      @media print {
                        html, body { height: 99%; overflow: hidden; padding: 0; }
                        .section { page-break-inside: avoid; }
                      }
                    </style>
                  </head>
                  <body>
                    <div class="header">
                      <div>
                        <div class="logo">TalentAI Control Plane</div>
                        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Executive Performance & Analytics Report</div>
                      </div>
                      <div style="text-align: right;">
                        <span class="badge">${dateRange}</span>
                        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Generated: ${new Date().toLocaleString()}</div>
                      </div>
                    </div>

                    <div class="grid">
                      <div class="card">
                        <div class="card-title">Total Jobs</div>
                        <div class="card-val">12</div>
                        <div class="card-change">+2 new this month</div>
                      </div>
                      <div class="card">
                        <div class="card-title">Total Candidates</div>
                        <div class="card-val">428</div>
                        <div class="card-change">+34 active applicants</div>
                      </div>
                      <div class="card">
                        <div class="card-title">Shortlisted</div>
                        <div class="card-val">64</div>
                        <div class="card-change">15% of total pool</div>
                      </div>
                      <div class="card">
                        <div class="card-title">Interviews</div>
                        <div class="card-val">18</div>
                        <div class="card-change">4 scheduled today</div>
                      </div>
                    </div>

                    <div class="section">
                      <div class="section-title">Application Inflow Distribution</div>
                      <div class="row"><span>Direct Apply</span><strong>42% (773 candidates)</strong></div>
                      <div class="row"><span>LinkedIn Jobs</span><strong>32% (589 candidates)</strong></div>
                      <div class="row"><span>Referrals</span><strong>16% (295 candidates)</strong></div>
                      <div class="row"><span>Career Portal</span><strong>10% (185 candidates)</strong></div>
                      <div class="row" style="border:none; margin-top:4px;"><span>Total Submissions</span><strong style="color:#2563eb;">1,842 (Avg 307/mo)</strong></div>
                    </div>

                    <div class="section">
                      <div class="section-title">Candidate Pool by Industry Sector</div>
                      <div class="row"><span>Technology & SaaS</span><strong>45% (192 candidates)</strong></div>
                      <div class="row"><span>Financial Services</span><strong>25% (107 candidates)</strong></div>
                      <div class="row"><span>Healthcare & MedTech</span><strong>18% (77 candidates)</strong></div>
                      <div class="row"><span>E-Commerce & Retail</span><strong>12% (52 candidates)</strong></div>
                    </div>

                    <div class="section">
                      <div class="section-title">Recent System Audit Log</div>
                      <div class="row"><span>Aarav Mehta moved to Interview stage</span><span style="color:#64748b;">12 mins ago</span></div>
                      <div class="row"><span>Nexus Technologies onboarded to PostgreSQL</span><span style="color:#64748b;">1 hour ago</span></div>
                      <div class="row"><span>Riya Shah submitted application for Senior React Developer</span><span style="color:#64748b;">3 hours ago</span></div>
                      <div class="row"><span>AI Match Score evaluations completed for 34 candidates</span><span style="color:#64748b;">5 hours ago</span></div>
                    </div>

                    <div class="footer">
                      Confidential Executive Report • TalentAI Super Admin Platform
                    </div>

                    <script>
                      window.onload = function() {
                        setTimeout(function() {
                          window.print();
                        }, 300);
                      };
                    </script>
                  </body>
                </html>
              `);
              printWindow.document.close();

              if (onShowToast) onShowToast('PDF Print/Save dialog opened!');
            }}
            className="flex items-center gap-2 bg-[#3633D6] hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>

          {/* User Card */}
          <div className="flex items-center gap-3 bg-white p-2 px-3.5 rounded-2xl border border-[#E8ECF5] shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
              alt="Sarah Jenkins"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden sm:block">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">Sarah Jenkins</h4>
              <p className="text-[10px] font-medium text-slate-500">Senior Recruiter</p>
            </div>
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

      {/* Main Grid: Application Inflow + Candidate Distribution by Sector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Square Application Inflow Pie Chart Card */}
        <div className="bg-[#FFFFFF] rounded-2xl p-7 border border-[#E8ECF5] shadow-xs flex flex-col justify-between space-y-6 min-h-[380px] h-full">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="font-extrabold text-lg text-slate-900">Application Inflow</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md">
                  +28%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <PieChart className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Applicant inflow distribution by source channel ({dateRange})
            </p>
          </div>

          {/* Solid Pie Chart & Legend */}
          <div className="flex items-center justify-between gap-6 my-auto py-2">
            {/* Conic Gradient Pie Chart */}
            <div 
              className="w-36 h-36 rounded-full shrink-0 shadow-md border-4 border-white flex items-center justify-center relative transition-transform hover:scale-105 duration-200"
              style={{
                background: 'conic-gradient(#3633D6 0% 42%, #3B82F6 42% 74%, #8B5CF6 74% 90%, #10B981 90% 100%)'
              }}
            >
              <div className="w-18 h-18 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-xs">
                <span className="text-sm font-extrabold text-slate-900 leading-none">1.8k</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Total</span>
              </div>
            </div>

            {/* Pie Chart Legend */}
            <div className="space-y-2.5 flex-1 min-w-0">
              {[
                { label: 'Direct Apply', percent: '42%', color: 'bg-[#3633D6]' },
                { label: 'LinkedIn Jobs', percent: '32%', color: 'bg-blue-500' },
                { label: 'Referrals', percent: '16%', color: 'bg-purple-500' },
                { label: 'Career Portal', percent: '10%', color: 'bg-emerald-500' },
              ].map((leg, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-2.5 h-2.5 rounded-full ${leg.color} shrink-0`} />
                    <span className="font-semibold text-slate-700 truncate">{leg.label}</span>
                  </div>
                  <span className="font-bold text-slate-900 text-xs ml-1">{leg.percent}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8ECF5] flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Volume: <strong className="text-slate-900 font-bold">1,842</strong></span>
            <span className="font-bold text-indigo-600">Avg 307/mo</span>
          </div>
        </div>

        {/* Candidate Distribution by Sector Box Chart Card */}
        <div className="bg-[#FFFFFF] rounded-2xl p-7 border border-[#E8ECF5] shadow-xs flex flex-col justify-between space-y-6 min-h-[380px] h-full">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900">Distribution by Sector</h3>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Candidate pool split across industry sectors ({dateRange})
            </p>
          </div>

          {/* Vertical Bar Chart for Sectors */}
          <div className="flex items-end justify-between gap-4 h-44 pt-2 px-2 my-auto">
            {[
              { sector: 'Tech', fullName: 'Tech & SaaS', count: '192', percent: '45%', val: 'h-36 bg-[#3633D6]' },
              { sector: 'Finance', fullName: 'Financial Services', count: '107', percent: '25%', val: 'h-24 bg-emerald-500' },
              { sector: 'Health', fullName: 'Healthcare', count: '77', percent: '18%', val: 'h-16 bg-purple-500' },
              { sector: 'Retail', fullName: 'E-Commerce', count: '52', percent: '12%', val: 'h-10 bg-amber-500' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-xs font-extrabold text-slate-800 opacity-90 group-hover:opacity-100 transition-opacity">
                  {bar.percent}
                </span>
                <div className="w-full max-w-[44px] bg-slate-100 relative flex items-end justify-center overflow-hidden h-40">
                  <div className={`w-full transition-all group-hover:brightness-110 ${bar.val}`} />
                </div>
                <span className="text-xs font-bold text-slate-700 mt-0.5">{bar.sector}</span>
              </div>
            ))}
          </div>

          {/* Compact Footer Legend */}
          <div className="pt-3 border-t border-[#E8ECF5] flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="truncate">Top Sector: <strong className="text-slate-900 font-bold">Tech & SaaS (45%)</strong></span>
            <span className="font-bold text-purple-600 shrink-0">428 Candidates</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed Card */}
      <div className="bg-white rounded-2xl border border-[#E8ECF5] shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8ECF5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">Recent Activity Feed</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time system events and recruiter actions</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Live Updates
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivities.map((act) => {
            const IconComp = act.icon;
            return (
              <div key={act.id} className="py-3 flex items-start justify-between gap-4 hover:bg-slate-50/60 p-2 rounded-xl transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${act.iconBg} shrink-0 mt-0.5`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-800 font-medium">
                      <strong className="font-bold text-slate-900">{act.user}</strong> {act.action}
                    </p>
                    <span className="text-[11px] text-slate-400 font-medium">{act.time}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                  Logged
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
