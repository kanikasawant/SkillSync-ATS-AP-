import React from 'react';
import { Search, Bell, HelpCircle, Command, Menu } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onNewEntity, onToggleMobileMenu }) {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Menu Button & App Header Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 tracking-tight truncate max-w-[160px] sm:max-w-none">
          TalentAI Control Plane
        </h2>
      </div>

      {/* Right Action Tools & Search */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Field */}
        <div 
          onClick={() => document.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="relative w-36 sm:w-64 md:w-80 group cursor-pointer"
        >
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" />
          <input
            type="text"
            readOnly
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or ⌘K..."
            className="w-full pl-9 sm:pl-10 pr-8 sm:pr-12 py-1.5 sm:py-2 text-xs font-medium bg-slate-50/80 border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none cursor-pointer group-hover:border-blue-500/50 transition-all shadow-xs"
          />
          <div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 bg-slate-200/70 rounded text-[10px] font-mono text-slate-600 pointer-events-none group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* Notification Bell */}
        <button 
          title="Notifications"
          className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse"></span>
        </button>

        {/* Help Circle */}
        <button 
          title="Help & Documentation"
          className="hidden sm:block p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Profile Avatar */}
        <div className="pl-1 sm:pl-2 border-l border-slate-200/80 flex items-center gap-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Super Admin Profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-blue-500/30 border border-white cursor-pointer hover:opacity-90 transition-opacity shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
