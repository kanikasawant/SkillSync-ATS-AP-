import React from 'react';
import { Search, Bell, HelpCircle, Command } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onNewEntity }) {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Page / App Header Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold font-serif text-slate-900 tracking-tight">
          TalentAI Control Plane
        </h2>
      </div>

      {/* Right Action Tools & Search */}
      <div className="flex items-center gap-4">
        {/* Global Search Field */}
        <div 
          onClick={() => document.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="relative w-64 md:w-80 group cursor-pointer"
        >
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" />
          <input
            type="text"
            readOnly
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organizations or ⌘K..."
            className="w-full pl-10 pr-12 py-2 text-xs font-medium bg-slate-50/80 border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none cursor-pointer group-hover:border-blue-500/50 transition-all shadow-xs"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-200/70 rounded text-[10px] font-mono text-slate-600 pointer-events-none group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* Notification Bell */}
        <button 
          title="Notifications"
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse"></span>
        </button>

        {/* Help Circle */}
        <button 
          title="Help & Documentation"
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>



        {/* User Profile Avatar */}
        <div className="pl-2 border-l border-slate-200/80 flex items-center gap-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Super Admin Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30 border border-white cursor-pointer hover:opacity-90 transition-opacity shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
