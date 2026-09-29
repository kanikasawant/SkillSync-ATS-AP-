import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  Calendar,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onSignOut, onOpenSupport }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'organizations', label: 'Organizations', icon: Building2 },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'ai_usage', label: 'AI Usage', icon: Sparkles },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#F0F7FF] text-slate-700 flex flex-col justify-between shrink-0 min-h-screen select-none border-r border-blue-100/80 z-20">
      {/* Upper Section */}
      <div>
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3.5 border-b border-blue-100/80">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 shrink-0">
            T
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-serif text-slate-900 leading-tight">
              TalentAI
            </h1>
            <span className="text-[11px] font-semibold text-blue-600 mt-0.5">
              Super Admin
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'organization_detail' && item.id === 'organizations') || (activeTab === 'onboard_organization' && item.id === 'organizations');

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:bg-blue-100/70 hover:text-blue-700'
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 space-y-1 border-t border-blue-100/80 mb-2">
        <button
          onClick={onOpenSupport}
          className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-blue-100/70 hover:text-blue-700 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span>Support</span>
        </button>

        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-500 hover:text-red-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
