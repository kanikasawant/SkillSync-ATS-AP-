import React, { useEffect, useState } from 'react';
import { Search, Building2, Plus, Sparkles, X, ChevronRight, Copy, Shield, ExternalLink } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, organizations, onSelectOrg, onOnboardNew, onShowToast }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          document.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredOrgs = organizations.filter(o => 
    o.name.toLowerCase().includes(query.toLowerCase()) ||
    o.domain.toLowerCase().includes(query.toLowerCase()) ||
    o.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-600 ml-1 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organizations, domain, Org ID or type a command..."
            className="w-full bg-transparent text-slate-900 font-semibold text-sm outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-3">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Quick Admin Actions
            </div>
            <div className="space-y-1 mt-1">
              <button
                onClick={() => {
                  onOnboardNew();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/80 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600">
                      Onboard New Tenant Organization
                    </span>
                    <p className="text-[11px] text-slate-400">Provision fresh workspace & admin credentials</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Enter</span>
              </button>

              <button
                onClick={() => {
                  onShowToast && onShowToast('System Gemini AI quota recalculation initiated.');
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/80 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">
                      Recalculate Gemini AI Token Quotas
                    </span>
                    <p className="text-[11px] text-slate-400">Sync token balances across all 1,248 tenants</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded">Run AI</span>
              </button>
            </div>
          </div>

          {/* Organizations Matching Query */}
          <div>
            <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Organizations ({filteredOrgs.length})</span>
            </div>

            {filteredOrgs.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs font-medium">
                No organizations matching "{query}"
              </div>
            ) : (
              <div className="space-y-1 mt-1">
                {filteredOrgs.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      onSelectOrg(org);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 group transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 font-bold text-xs flex items-center justify-center">
                        {org.letter}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                          <span>{org.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            org.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {org.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {org.domain} • {org.id}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span>Navigate: <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-2xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-2xs">↓</kbd></span>
          <span>Close: <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 shadow-2xs">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
