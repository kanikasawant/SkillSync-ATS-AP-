import React from 'react';
import { CheckSquare, Users, Zap, Archive } from 'lucide-react';

export default function StatCards({ jobs }) {
  const activeCount = jobs.filter(j => j.status === 'Active').length;
  const closedCount = jobs.filter(j => j.status === 'Closed').length;
  const totalInbound = jobs.reduce((sum, j) => sum + (j.applicantsCount || 0), 0);

  const stats = [
    {
      title: 'OPEN REQUISITIONS',
      value: activeCount,
      subtext: 'Active',
      subtextType: 'success', // green badge
      icon: CheckSquare,
      iconColor: 'text-blue-600 border-blue-200 bg-blue-50/50',
    },
    {
      title: 'TOTAL INBOUND',
      value: totalInbound,
      subtext: 'Candidates',
      subtextType: 'muted',
      icon: Users,
      iconColor: 'text-purple-600 border-purple-200 bg-purple-50/50',
    },
    {
      title: 'AVG. PIPELINE SPEED',
      value: '14d',
      subtext: 'Target Met',
      subtextType: 'success',
      icon: Zap,
      iconColor: 'text-emerald-600 border-emerald-200 bg-emerald-50/50',
    },
    {
      title: 'ARCHIVED ROLES',
      value: closedCount,
      subtext: 'Closed',
      subtextType: 'muted',
      icon: Archive,
      iconColor: 'text-slate-500 border-slate-200 bg-slate-50/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-[#E8ECF5] shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {stat.title}
              </span>
              <div className={`p-1.5 rounded-lg border ${stat.iconColor}`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </span>
              {stat.subtextType === 'success' ? (
                <span className="text-xs font-semibold text-emerald-600">
                  {stat.subtext}
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500">
                  {stat.subtext}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
