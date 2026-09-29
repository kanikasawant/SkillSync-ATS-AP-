import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Shield, Filter } from 'lucide-react';
import { fetchOrganizations } from '../api/orgApi';

export default function UsersView({ onShowToast }) {
  const [search, setSearch] = useState('');
  const [usersList, setUsersList] = useState([
    { id: 'u_1', name: 'Jane Doe', email: 'jane@acmecorp.com', org: 'Acme Corporation', role: 'Org Admin', status: 'Active', lastActive: '2 mins ago' },
    { id: 'u_2', name: 'Marcus Vance', email: 'marcus@acmecorp.com', org: 'Acme Corporation', role: 'Senior Recruiter', status: 'Active', lastActive: '1 hour ago' },
    { id: 'u_3', name: 'Robert Chen', email: 'robert@globaltech.io', org: 'Global Tech', role: 'Org Admin', status: 'Suspended', lastActive: '12 days ago' },
    { id: 'u_4', name: 'Priya Sharma', email: 'priya@nexusai.dev', org: 'Nexus Artificial Intelligence', role: 'Org Admin', status: 'Active', lastActive: '5 mins ago' },
    { id: 'u_5', name: 'Sarah Jenkins', email: 'sarah@startup.com', org: 'Startup Inc', role: 'Org Admin', status: 'Inactive', lastActive: '30 days ago' }
  ]);

  useEffect(() => {
    loadDbUsers();
  }, []);

  const loadDbUsers = async () => {
    try {
      const dbOrgs = await fetchOrganizations();
      if (dbOrgs && dbOrgs.length > 0) {
        const dbUsers = dbOrgs.map((org, index) => ({
          id: `u_db_${org.id}`,
          name: `${org.name} Admin`,
          email: org.website ? `admin@${org.website.replace(/^https?:\/\//, '')}` : `admin@${org.id}.com`,
          org: org.name,
          role: 'Org Admin',
          status: org.status === 'active' ? 'Active' : 'Suspended',
          lastActive: 'Just now',
        }));

        setUsersList(prev => {
          const dbOrgNames = new Set(dbUsers.map(u => u.org));
          const existingMock = prev.filter(u => !dbOrgNames.has(u.org));
          return [...dbUsers, ...existingMock];
        });
      }
    } catch (err) {
      console.warn('Could not load DB users:', err);
    }
  };


  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.org.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Users Directory
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage provisioned users, roles, and administrative privileges across all tenant organizations.
          </p>
        </div>

        <button
          onClick={() => onShowToast && onShowToast('Add Super Admin modal opened.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision Super Admin</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user by name, email, or organization..."
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Users Table with Dark Grey Borders & Clean Text Status */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-300 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider select-none">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-4">Organization</th>
              <th className="py-4 px-4">Role</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/90 text-sm">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-all duration-150">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-xs text-slate-400">{u.email}</div>
                </td>
                <td className="py-4 px-4 font-serif font-bold text-slate-800">{u.org}</td>
                <td className="py-4 px-4 text-xs font-semibold text-slate-600">{u.role}</td>
                
                {/* Status Column - Clean Text + Dot (No Block/Border) */}
                <td className="py-4 px-4 font-semibold text-xs">
                  <span className={`inline-flex items-center gap-1.5 font-bold ${
                    u.status === 'Active'
                      ? 'text-emerald-600'
                      : u.status === 'Suspended'
                      ? 'text-red-600'
                      : 'text-slate-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      u.status === 'Active' ? 'bg-emerald-500' : u.status === 'Suspended' ? 'bg-red-500' : 'bg-slate-400'
                    }`} />
                    {u.status}
                  </span>
                </td>

                <td className="py-4 px-4 text-xs font-medium text-slate-500">{u.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
