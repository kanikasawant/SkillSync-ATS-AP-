import React, { useState } from 'react';
import { 
  Calendar, 
  Video, 
  Clock, 
  Users, 
  Plus, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Pencil, 
  Trash2,
  ExternalLink,
  ChevronDown,
  Bot
} from 'lucide-react';
import ScheduleInterviewModal from './ScheduleInterviewModal';
import { MOCK_CANDIDATES } from '../data/mockCandidates';

export default function InterviewsView({ onShowToast }) {
  const [activeSubTab, setActiveSubTab] = useState('upcoming');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [interviewsList, setInterviewsList] = useState([
    {
      id: 'INT-101',
      candidateName: 'Aarav Mehta',
      email: 'aarav.m@example.com',
      avatarColor: 'bg-[#DCFCE7] text-[#15803D]',
      initials: 'AM',
      position: 'Frontend Developer',
      team: 'Engineering Team',
      interviewer: 'Sarah Jenkins',
      interviewerTitle: 'Senior Recruiter',
      interviewerInitials: 'SJ',
      dateTime: 'Today 2:00 PM - 3:00 PM',
      status: 'Confirmed',
      statusType: 'confirmed',
      meetingUrl: 'meet.google.com/ss-aarm-dev'
    },
    {
      id: 'INT-102',
      candidateName: 'Karan Patel',
      email: 'karan.patel@acme.dev',
      avatarColor: 'bg-purple-100 text-purple-700',
      initials: 'KP',
      position: 'Backend Developer',
      team: 'Infrastructure Pod',
      interviewer: 'Alex Rivera',
      interviewerTitle: 'Tech Lead',
      interviewerInitials: 'AR',
      dateTime: 'Today 4:30 PM - 5:30 PM',
      status: 'Confirmed',
      statusType: 'confirmed',
      meetingUrl: 'meet.google.com/ss-kmp-eng'
    },
    {
      id: 'INT-103',
      candidateName: 'Riya Shah',
      email: 'riya.shah@designhub.io',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      initials: 'RS',
      position: 'React Developer',
      team: 'Frontend Architecture',
      interviewer: 'David Chen',
      interviewerTitle: 'VP Engineering',
      interviewerInitials: 'DC',
      dateTime: 'Tomorrow 11:00 AM - 12:00 PM',
      status: 'Scheduled',
      statusType: 'scheduled',
      meetingUrl: 'meet.google.com/ss-riyh-rct'
    },
    {
      id: 'INT-104',
      candidateName: 'Ananya Deshmukh',
      email: 'a.deshmukh@cloudtech.com',
      avatarColor: 'bg-blue-100 text-blue-700',
      initials: 'AD',
      position: 'Frontend Developer',
      team: 'Design Systems',
      interviewer: 'Sarah Jenkins',
      interviewerTitle: 'Senior Recruiter',
      interviewerInitials: 'SJ',
      dateTime: 'May 20, 2025 10:30 AM - 11:30 AM',
      status: 'Confirmed',
      statusType: 'confirmed',
      meetingUrl: 'meet.google.com/ss-anya-fnt'
    },
    {
      id: 'INT-105',
      candidateName: 'Rohan Verma',
      email: 'rohan.v@behance.net',
      avatarColor: 'bg-emerald-100 text-emerald-700',
      initials: 'RV',
      position: 'UI/UX Designer',
      team: 'Product Experience',
      interviewer: 'Elena Rostova',
      interviewerTitle: 'Design Lead',
      interviewerInitials: 'ER',
      dateTime: 'May 21, 2025 3:00 PM - 4:00 PM',
      status: 'Rescheduled',
      statusType: 'rescheduled',
      meetingUrl: 'meet.google.com/ss-rohn-uxd'
    }
  ]);

  const handleAddInterview = (newInt) => {
    setInterviewsList([newInt, ...interviewsList]);
    onShowToast(`Interview scheduled for ${newInt.candidateName}`);
  };

  const handleDeleteInterview = (id) => {
    setInterviewsList(prev => prev.filter(i => i.id !== id));
    onShowToast(`Interview ${id} cancelled`);
  };

  return (
    <div className="space-y-6">
      {/* Talent Operations Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
              TALENT OPERATIONS
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Interviews
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Manage scheduled candidate evaluations, meeting spaces, and interview slots.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => onShowToast('Calendar sync updated with Google Calendar.')}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Calendar Sync</span>
          </button>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#3633D6] hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E8ECF5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
              SCHEDULED TODAY
            </span>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight block mt-1">4</span>
            <span className="text-xs font-bold text-indigo-600 mt-0.5 block">↑ Next in 35 mins</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8ECF5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
              WEEKLY EVALUATIONS
            </span>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight block mt-1">24</span>
            <span className="text-xs font-semibold text-slate-500 mt-0.5 block">Across 6 department roles</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8ECF5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
              AI COPILOT IN-SESSION
            </span>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight block mt-1">98%</span>
            <span className="text-xs font-bold text-purple-600 mt-0.5 block flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Rubrics & probing active
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
            <Bot className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8ECF5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
              PASS RATE (AI PREP)
            </span>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight block mt-1">84.2%</span>
            <span className="text-xs font-bold text-emerald-600 mt-0.5 block">✨ +5.8% vs last month</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Data Table Container */}
      <div className="bg-white rounded-3xl border border-[#E8ECF5] shadow-xs overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-4 border-b border-[#E8ECF5] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'upcoming'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Upcoming <span className="ml-1 bg-indigo-200/70 text-indigo-900 px-1.5 py-0.5 rounded-md text-[10px]">8</span>
            </button>
            <button
              onClick={() => setActiveSubTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'completed'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Completed <span className="ml-1 bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-[10px]">14</span>
            </button>
            <button
              onClick={() => setActiveSubTab('rescheduled')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'rescheduled'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Rescheduled <span className="ml-1 bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md text-[10px]">2</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select className="appearance-none bg-[#F3F5FC] border border-transparent text-slate-700 text-xs font-semibold rounded-xl py-2 px-3 pr-7 outline-none cursor-pointer">
                <option>All Positions</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>UI/UX Designer</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E8ECF5] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">CANDIDATE</th>
                <th className="py-3.5 px-5">POSITION</th>
                <th className="py-3.5 px-5">INTERVIEWER</th>
                <th className="py-3.5 px-5">DATE & TIME</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5">MEETING ROOM</th>
                <th className="py-3.5 px-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF5]">
              {interviewsList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* Candidate */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${row.avatarColor} font-bold text-xs flex items-center justify-center shrink-0`}>
                        {row.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {row.candidateName}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
                          {row.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="py-4 px-5">
                    <h4 className="font-bold text-xs text-slate-800">{row.position}</h4>
                    <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
                      {row.team}
                    </span>
                  </td>

                  {/* Interviewer */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        {row.interviewerInitials}
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-slate-800">{row.interviewer}</h4>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">{row.interviewerTitle}</span>
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-slate-800 block">
                      {row.dateTime}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    {row.statusType === 'confirmed' ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                        Confirmed
                      </span>
                    ) : row.statusType === 'scheduled' ? (
                      <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                        Scheduled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Rescheduled
                      </span>
                    )}
                  </td>

                  {/* Meeting Room */}
                  <td className="py-4 px-5">
                    <a
                      href={`https://${row.meetingUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <Video className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{row.meetingUrl}</span>
                    </a>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onShowToast(`Viewing interview notes for ${row.candidateName}`)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteInterview(row.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8ECF5] flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Showing 5 of {interviewsList.length} total upcoming evaluations
          </span>

          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg">
              Previous
            </button>
            <button className="w-7 h-7 bg-[#3633D6] text-white font-bold text-xs rounded-lg flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 text-slate-600 hover:bg-slate-100 font-bold text-xs rounded-lg flex items-center justify-center">
              2
            </button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Automated Interview Summarization Banner */}
      <div className="bg-[#EAEFFC] border border-[#D5DCFB] rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#3633D6] text-white flex items-center justify-center shrink-0 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Automated Interview Summarization</h4>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              SkillSync AI records key competencies, flags sentiment contradictions, and exports an objective rubric scorecard within 10 minutes of session completion.
            </p>
          </div>
        </div>

        <button
          onClick={() => onShowToast('AI Rubric calibrator opened.')}
          className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-all shadow-2xs"
        >
          Configure AI Rubrics
        </button>
      </div>

      {/* Modal Drawer */}
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleAddInterview}
        candidates={MOCK_CANDIDATES}
      />
    </div>
  );
}
