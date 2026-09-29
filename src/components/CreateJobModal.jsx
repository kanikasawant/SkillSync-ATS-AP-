import React, { useState, useEffect } from 'react';
import { X, Briefcase, MapPin, Building, DollarSign } from 'lucide-react';
import CustomDropdown from './CustomDropdown';


export default function CreateJobModal({ isOpen, onClose, onSubmit, editJob }) {
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Mumbai',
    locationType: 'onsite',
    experience: '2–4 Years',
    status: 'Active',
    salary: '₹12L - ₹18L',
    description: '',
    iconType: 'code'
  });

  useEffect(() => {
    if (editJob) {
      setFormData({ ...editJob });
    } else {
      setFormData({
        title: '',
        department: 'Engineering',
        location: 'Mumbai',
        locationType: 'onsite',
        experience: '2–4 Years',
        status: 'Active',
        salary: '₹12L - ₹18L',
        description: '',
        iconType: 'code'
      });
    }
  }, [editJob, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit({
      ...formData,
      id: editJob ? editJob.id : `REQ-2024-${Math.floor(100 + Math.random() * 900)}`,
      applicantsCount: editJob ? editJob.applicantsCount : 0,
      newApplicants: editJob ? editJob.newApplicants : '+1 new',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {editJob ? 'Edit Hiring Requisition' : 'Create New Hiring Requisition'}
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Publish a new role to SkillSync candidates pool
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Senior Frontend Developer"
              className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-sm font-medium rounded-xl p-3 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <CustomDropdown
                value={formData.department}
                onChange={(val) => setFormData({ ...formData, department: val })}
                options={[
                  'Engineering',
                  'Design',
                  'Product',
                  'Marketing',
                  'Sales'
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Role Icon Theme
              </label>
              <CustomDropdown
                value={formData.iconType}
                onChange={(val) => setFormData({ ...formData, iconType: val })}
                options={[
                  { value: 'code', label: 'Code (Frontend/Tech)' },
                  { value: 'server', label: 'Server (Backend/DB)' },
                  { value: 'palette', label: 'Palette (Design/UX)' },
                  { value: 'compass', label: 'Compass (Lead/Architect)' },
                  { value: 'chart', label: 'Chart (Product/Management)' }
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Mumbai / Remote"
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-sm font-medium rounded-xl p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location Mode
              </label>
              <CustomDropdown
                value={formData.locationType}
                onChange={(val) => setFormData({ ...formData, locationType: val })}
                options={[
                  { value: 'onsite', label: 'On-Site (Office)' },
                  { value: 'remote', label: 'Remote (📡)' },
                  { value: 'hybrid', label: 'Hybrid' }
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 2–4 Years"
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-sm font-medium rounded-xl p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-sm font-medium rounded-xl p-3 outline-none transition-all cursor-pointer"
              >
                <option value="Active">🟢 Active</option>
                <option value="Closed">⚪ Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description & Requirements
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline role responsibilities and key requirements..."
              className="w-full bg-[#F3F5FC] border border-transparent focus:border-indigo-500 focus:bg-white text-slate-900 text-sm font-medium rounded-xl p-3 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#3633D6] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              {editJob ? 'Save Requisition' : 'Publish Requisition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
