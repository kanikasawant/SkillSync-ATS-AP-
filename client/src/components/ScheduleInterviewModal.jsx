import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  Sparkles, 
  User, 
  Briefcase, 
  CheckCircle2, 
  ChevronDown,
  Brain
} from 'lucide-react';

export default function ScheduleInterviewModal({ isOpen, onClose, onSubmit, candidates }) {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates?.[0]?.name || 'Aarav Mehta');
  const [role, setRole] = useState('Frontend Developer');
  const [interviewer, setInterviewer] = useState('Sarah Jenkins (Senior Recruiter)');
  const [date, setDate] = useState('2025-05-18');
  const [time, setTime] = useState('14:00');
  const [interviewType, setInterviewType] = useState('Technical Round');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/ss-aarm-dev');
  const [notes, setNotes] = useState('Candidate has strong React skills. Focus on state management and component architecture.');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: `INT-${Math.floor(100 + Math.random() * 900)}`,
      candidateName: selectedCandidate,
      role,
      interviewer,
      time: `Today, ${time}`,
      platform: 'Google Meet',
      meetLink: meetingLink,
      status: 'Confirmed',
      isToday: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-full border-l border-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Schedule Interview</h2>
              <p className="text-xs font-medium text-slate-500">
                Configure session participants, room, and AI rubric.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form id="schedule-form" onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Candidate
              </label>
              <div className="relative">
                <select
                  value={selectedCandidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="w-full appearance-none bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pr-8 outline-none transition-all cursor-pointer"
                >
                  <option value="Aarav Mehta">Aarav Mehta (Frontend Developer)</option>
                  <option value="Karan Patel">Karan Patel (Backend Developer)</option>
                  <option value="Riya Shah">Riya Shah (React Developer)</option>
                  <option value="Neha Joshi">Neha Joshi (Full Stack Developer)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Job Position
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Interviewer
            </label>
            <div className="relative">
              <select
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                className="w-full appearance-none bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pr-8 outline-none transition-all cursor-pointer"
              >
                <option value="Sarah Jenkins (Senior Recruiter)">Sarah Jenkins (Senior Recruiter)</option>
                <option value="Alex Rivera (Tech Lead)">Alex Rivera (Tech Lead)</option>
                <option value="David Chen (VP Engineering)">David Chen (VP Engineering)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 outline-none transition-all"
              />
            </div>
          </div>

          {/* Interview Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Interview Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Technical Round', 'Behavioral', 'System Design'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInterviewType(type)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    interviewType === type
                      ? 'bg-indigo-100/80 text-indigo-700 border-indigo-200 shadow-2xs'
                      : 'bg-[#F3F5FC] text-slate-600 border-transparent hover:bg-slate-200/60'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Meeting Link Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Meeting Link
            </label>
            <div className="relative">
              <Video className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-3 pl-10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Evaluation Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Evaluation Notes & Rubric Guidance
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-xs font-medium rounded-xl p-3 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* AI Recommended Probing Questions */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                AI Recommended Probing Questions
              </h4>
            </div>
            <p className="text-[11px] text-purple-800 font-medium">
              Tailored automatically based on candidate's verified GitHub submissions and skill gap analysis:
            </p>
            <ol className="text-xs text-purple-950 space-y-2 font-medium pl-4 list-decimal">
              <li className="bg-white/80 p-2 rounded-lg border border-purple-100">
                Ask how Aarav handles memoization and re-renders in Next.js 14 App Router.
              </li>
              <li className="bg-white/80 p-2 rounded-lg border border-purple-100">
                Probe automated test coverage and containerized CI/CD pipeline deployments.
              </li>
            </ol>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="schedule-form"
            className="px-6 py-2.5 bg-[#3633D6] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
          >
            Confirm & Send Invites
          </button>
        </div>
      </div>
    </div>
  );
}
