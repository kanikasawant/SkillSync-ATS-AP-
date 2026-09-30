import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import OrganizationsDirectory from './components/OrganizationsDirectory';
import OnboardOrganizationView from './components/OnboardOrganizationView';
import OrganizationDetailView from './components/OrganizationDetailView';
import JobTable from './components/JobTable';
import CreateJobModal from './components/CreateJobModal';
import ViewJobModal from './components/ViewJobModal';
import CandidatesView from './components/CandidatesView';
import InterviewsView from './components/InterviewsView';
import UsersView from './components/UsersView';
import SystemSettingsView from './components/SystemSettingsView';
import SettingsView from './components/SettingsView';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';

import { fetchOrganizations, createOrganization, deleteOrganization } from './api/orgApi';
import { INITIAL_JOBS } from './data/initialJobs';


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'organizations' | 'jobs' | 'candidates' | 'interviews' | 'ai_usage' | 'users' | 'settings' | 'onboard_organization' | 'organization_detail'
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  
  // Jobs State
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [viewingJob, setViewingJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [jobSearch, setJobSearch] = useState('');
  const [jobDeptFilter, setJobDeptFilter] = useState('All');
  const [jobStatusFilter, setJobStatusFilter] = useState('All');

  // Candidates State
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const handleOpenPalette = () => setIsCommandPaletteOpen(true);
    document.addEventListener('open-command-palette', handleOpenPalette);
    return () => document.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  // Sync PostgreSQL organizations into state on mount & active tab switch
  useEffect(() => {
    loadDbOrganizations();
  }, [activeTab]);

  const loadDbOrganizations = async () => {
    try {
      const dbOrgs = await fetchOrganizations();
      if (dbOrgs && dbOrgs.length > 0) {
        const mappedDbOrgs = dbOrgs.map(dbOrg => ({
          id: dbOrg.id,
          name: dbOrg.name,
          shortName: dbOrg.name,
          domain: dbOrg.website ? dbOrg.website.replace(/^https?:\/\//, '') : 'jaro.com',
          shortDomain: dbOrg.website ? dbOrg.website.replace(/^https?:\/\//, '') : 'jaro.com',
          letter: dbOrg.name ? dbOrg.name.trim().charAt(0).toUpperCase() : 'O',
          logoUrl: dbOrg.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
          plan: 'Enterprise',
          status: dbOrg.status === 'active' ? 'Active' : 'Expired',
          recruiterSeats: { current: 18, max: 50 },
          activeJobs: 12,
          aiMatchScore: 94,
          sparklineData: [20, 25, 30, 42, 50, 65, 78, 85, 92, 98],
          createdDate: new Date(dbOrg.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          industry: dbOrg.industry || 'Technology / SaaS',
          companySize: dbOrg.company_size || '50-200 employees',
          description: dbOrg.description || 'Primary entity',
        }));

        setOrganizations(mappedDbOrgs);
      } else {
        setOrganizations([]);
      }
    } catch (err) {
      console.warn('Could not load DB orgs in App.jsx:', err);
    }
  };

  const selectedOrganization = organizations.find(o => o.id === selectedOrgId);

  const handleSelectOrganization = (org) => {
    setSelectedOrgId(org.id);
    setActiveTab('organization_detail');
  };

  const handleCreateOrganization = async (newOrg) => {
    try {
      await createOrganization({
        id: newOrg.id,
        name: newOrg.name,
        website: newOrg.domain,
        industry: newOrg.industry || 'Technology / SaaS',
        company_size: '50-200 employees',
        description: `${newOrg.name} Primary Workspace`,
        status: 'active'
      });
    } catch (err) {
      console.warn('DB creation fallback:', err);
    }
    setOrganizations(prev => [newOrg, ...prev]);
    showToast(`Organization "${newOrg.name}" onboarded & persisted to PostgreSQL!`);
    setSelectedOrgId(newOrg.id);
    setActiveTab('organization_detail');
  };

  const handleToggleSuspend = (orgId) => {
    setOrganizations(prev => prev.map(org => {
      if (org.id === orgId) {
        const newStatus = org.status === 'Suspended' ? 'Active' : 'Suspended';
        showToast(`Organization "${org.name}" status set to ${newStatus}.`);
        return { ...org, status: newStatus };
      }
      return org;
    }));
  };

  const handleUpdateOrg = (updatedOrg) => {
    setOrganizations(prev => prev.map(org => org.id === updatedOrg.id ? updatedOrg : org));
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Dark Charcoal Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'organization_detail') {
            setSelectedOrgId(null);
          }
        }}
        onSignOut={() => showToast('Simulated Sign Out executed.')}
        onOpenSupport={() => showToast('TalentAI Support Center: Contact support@talentai.io')}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Control Plane Header */}
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNewEntity={() => {
            setActiveTab('onboard_organization');
          }}
          onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
        />

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onSelectCandidate={(cand) => {
                setSelectedCandidate(cand);
                setActiveTab('candidates');
              }}
              onNavigateCandidates={() => setActiveTab('candidates')}
              onScheduleInterview={() => setActiveTab('interviews')}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'organizations' && (
            <OrganizationsDirectory 
              organizations={organizations}
              onOnboardNew={() => setActiveTab('onboard_organization')}
              onSelectOrganization={handleSelectOrganization}
              onEditOrganization={(org) => {
                setSelectedOrgId(org.id);
                setActiveTab('settings');
                showToast(`Loaded ${org.name} in Settings for editing.`);
              }}
              onDeleteOrganization={async (orgId) => {
                const targetOrg = organizations.find(o => o.id === orgId);
                try {
                  await deleteOrganization(orgId);
                  setOrganizations(prev => prev.filter(o => o.id !== orgId));
                  showToast(`Organization "${targetOrg?.name || orgId}" deleted from PostgreSQL!`);
                } catch (err) {
                  // If not in DB, remove from state
                  setOrganizations(prev => prev.filter(o => o.id !== orgId));
                  showToast(`Organization removed from active workspace list.`);
                }
              }}
              onShowToast={showToast}
            />
          )}

          {/* {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">REQUISITION MANAGEMENT</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">{jobs.length} Active Openings</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Job Requisitions</h1>
                  <p className="text-xs font-medium text-slate-500 mt-1">Manage job openings, applicant counts, and recruitment requisitions across your organization.</p>
                </div>
                <button
                  onClick={() => { setEditingJob(null); setIsCreateJobOpen(true); }}
                  className="inline-flex items-center gap-2 bg-[#3633D6] hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Job Requisition</span>
                </button>
              </div>

              <JobTable 
                jobs={jobs}
                onViewJob={(job) => setViewingJob(job)}
                onEditJob={(job) => { setEditingJob(job); setIsCreateJobOpen(true); }}
                onDeleteJob={(jobId) => {
                  setJobs(prev => prev.filter(j => j.id !== jobId));
                  showToast(`Job requisition ${jobId} deleted.`);
                }}
                searchQuery={jobSearch}
                setSearchQuery={setJobSearch}
                departmentFilter={jobDeptFilter}
                setDepartmentFilter={setJobDeptFilter}
                statusFilter={jobStatusFilter}
                setStatusFilter={setJobStatusFilter}
                onResetFilters={() => {
                  setJobSearch('');
                  setJobDeptFilter('All');
                  setJobStatusFilter('All');
                }}
              />

              <CreateJobModal
                isOpen={isCreateJobOpen}
                onClose={() => { setIsCreateJobOpen(false); setEditingJob(null); }}
                editJob={editingJob}
                onSubmit={(jobData) => {
                  if (editingJob) {
                    setJobs(prev => prev.map(j => j.id === jobData.id ? jobData : j));
                    showToast(`Job requisition "${jobData.title}" updated.`);
                  } else {
                    setJobs(prev => [jobData, ...prev]);
                    showToast(`Job requisition "${jobData.title}" created.`);
                  }
                }}
              />

              <ViewJobModal
                job={viewingJob}
                onClose={() => setViewingJob(null)}
              />
            </div>
          )} */}

          {/* {activeTab === 'candidates' && (
            <CandidatesView 
              selectedCandidate={selectedCandidate}
              onSelectCandidate={(cand) => setSelectedCandidate(cand)}
              onClearSelectedCandidate={() => setSelectedCandidate(null)}
              onShowToast={showToast}
            />
          )} */}

          {/* {activeTab === 'interviews' && (
            <InterviewsView onShowToast={showToast} />
          )} */}

          {activeTab === 'onboard_organization' && (
            <OnboardOrganizationView 
              onCancel={() => setActiveTab('organizations')}
              onSubmit={handleCreateOrganization}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'organization_detail' && selectedOrganization && (
            <OrganizationDetailView 
              organization={selectedOrganization}
              onBack={() => setActiveTab('organizations')}
              onToggleSuspend={handleToggleSuspend}
              onShowToast={showToast}
              onUpdateOrg={handleUpdateOrg}
            />
          )}

          {/* {activeTab === 'users' && (
            <UsersView onShowToast={showToast} />
          )} */}

          {activeTab === 'settings' && (
            <SettingsView initialOrgId={selectedOrgId} onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        organizations={organizations}
        onSelectOrg={handleSelectOrganization}
        onOnboardNew={() => setActiveTab('onboard_organization')}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
