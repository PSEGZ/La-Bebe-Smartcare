import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Edit3, 
  FileText, 
  UserCheck, 
  PhoneCall, 
  Baby,
  ChevronRight
} from 'lucide-react';
import { IncidentReport, IncidentCategory, NavigationTab } from '../types';
import { DEMO_INCIDENTS, DEMO_CHILDREN, DEMO_CLASSES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface IncidentsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const IncidentsPage: React.FC<IncidentsPageProps> = () => {
  const [incidents, setIncidents] = useState<IncidentReport[]>(DEMO_INCIDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected Detail Modal
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);

  // New Log Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    childId: 'ch-01',
    category: 'Injury' as IncidentCategory,
    date: '2026-08-19',
    time: '11:15 AM',
    location: 'Toddler Outdoor Play Turf',
    description: '',
    immediateActionTaken: 'First aid applied (antiseptic wipe, cold compress). Pupil comforted.',
    staffInvolved: 'Nurse Blessing Ndubuisi, Mrs. Folake Adeleke',
    isSafeguarding: false,
    parentNotified: true,
    parentNotificationTime: '11:20 AM',
    parentNotificationMethod: 'Phone Call' as const
  });

  const filteredIncidents = incidents.filter((inc) => {
    const matchSearch =
      inc.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.incidentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'All' || inc.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || inc.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const handleSaveIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const child = DEMO_CHILDREN.find((c) => c.id === formData.childId) || DEMO_CHILDREN[0];

    const newInc: IncidentReport = {
      id: `inc-0${incidents.length + 1}`,
      incidentNumber: `INC-2026-00${incidents.length + 1}`,
      childId: child.id,
      childName: `${child.firstName} ${child.lastName}`,
      className: child.className,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      severity: formData.category === 'Safeguarding' ? 'Critical (Safeguarding)' : 'Low',
      description: formData.description,
      immediateActionTaken: formData.immediateActionTaken,
      staffInvolved: formData.staffInvolved.split(',').map(s => s.trim()),
      firstAidGiven: true,
      parentNotified: formData.parentNotified,
      parentNotificationTime: formData.parentNotificationTime,
      parentNotificationMethod: formData.parentNotificationMethod,
      managementReview: 'Pending Review',
      status: 'Open',
      isSafeguarding: formData.category === 'Safeguarding'
    };

    setIncidents([newInc, ...incidents]);
    setIsAddModalOpen(false);
  };

  const handleResolveIncident = (incidentId: string) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === incidentId
          ? { ...i, status: 'Resolved', managementReview: 'Reviewed & Approved' }
          : i
      )
    );
    if (selectedIncident?.id === incidentId) {
      setSelectedIncident((prev) =>
        prev ? { ...prev, status: 'Resolved', managementReview: 'Reviewed & Approved' } : null
      );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Safeguarding Notice */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-teal-500/10 border border-amber-300/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 uppercase">CHILD SAFEGUARDING & INCIDENT PROTOCOL</span>
            <p className="text-slate-600 mt-0.5">
              All physical abrasions, minor bumps, behavioral changes or safeguarding observations are timestamped and reviewed by management.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg shrink-0">
          Strict Duty of Care
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Incidents & Child Safeguarding Logs</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time logging of first aid interventions, bump slips, temperature spikes & management reviews
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Incident</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by incident number, child name, or keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Categories</option>
              <option value="Injury">Minor Injury (Bump/Scrape)</option>
              <option value="Health Concern">Health Concern / Fever</option>
              <option value="Safeguarding">Safeguarding Observation</option>
              <option value="Behaviour">Behavioural Observation</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Incident ID</th>
                <th className="py-3.5 px-4">Pupil</th>
                <th className="py-3.5 px-4">Classroom</th>
                <th className="py-3.5 px-4">Date / Time</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Parent Notified</th>
                <th className="py-3.5 px-4">Management Review</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {inc.incidentNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 group-hover:text-teal-700">
                    {inc.childName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{inc.className}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {inc.date} at {inc.time}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      inc.category === 'Safeguarding'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {inc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {inc.parentNotified ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Notified
                      </span>
                    ) : (
                      <span className="text-rose-700 font-semibold">Pending Call</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {inc.managementReview}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={inc.status} size="sm" isSafeguarding={inc.isSafeguarding} />
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {inc.status !== 'Resolved' && (
                        <button
                          onClick={() => handleResolveIncident(inc.id)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg text-[11px] font-bold"
                        >
                          Resolve
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedIncident(inc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <Modal
          isOpen={!!selectedIncident}
          onClose={() => setSelectedIncident(null)}
          title={`Incident Log: ${selectedIncident.incidentNumber}`}
          subtitle={`${selectedIncident.childName} • ${selectedIncident.className} • ${selectedIncident.date} at ${selectedIncident.time}`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              {selectedIncident.status !== 'Resolved' ? (
                <button
                  onClick={() => handleResolveIncident(selectedIncident.id)}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
                >
                  Sign Off & Mark Resolved
                </button>
              ) : (
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Fully Signed Off by Management
                </span>
              )}
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">{selectedIncident.category}</span>
                <h3 className="text-base font-bold font-display">{selectedIncident.childName}</h3>
                <p className="text-xs text-slate-300">Location: {selectedIncident.location}</p>
              </div>
              <StatusBadge status={selectedIncident.status} size="md" isSafeguarding={selectedIncident.isSafeguarding} />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Incident Description</span>
              <p className="text-slate-800 leading-relaxed">{selectedIncident.description}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-900 uppercase">Immediate Action Taken</span>
              <p className="text-emerald-950 font-medium">{selectedIncident.immediateActionTaken}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Staff Involved</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedIncident.staffInvolved.join(', ')}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Parent Notification</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedIncident.parentNotified ? 'Contacted Successfully' : 'Pending Call'}</p>
                <p className="text-slate-500">{selectedIncident.parentNotificationTime} ({selectedIncident.parentNotificationMethod})</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Management Audit</span>
              <p className="text-slate-800 font-semibold mt-1">{selectedIncident.managementReview}</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Log Incident Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log New Incident or Safeguarding Note"
        subtitle="Confidential safety log for early childhood safeguarding standards."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveIncident} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Pupil *</label>
              <select
                value={formData.childId}
                onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {DEMO_CHILDREN.map((c) => (
                  <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.className})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as IncidentCategory })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Injury">Minor Injury (Scrape / Bump)</option>
                <option value="Health Concern">Health / Sudden Fever</option>
                <option value="Safeguarding">Safeguarding Observation</option>
                <option value="Behaviour">Behavioral Observation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Time</label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="11:15 AM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Toddler Turf"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Incident Description *</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what occurred with objective clarity..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Immediate Care / Action Taken *</label>
            <textarea
              rows={2}
              required
              value={formData.immediateActionTaken}
              onChange={(e) => setFormData({ ...formData, immediateActionTaken: e.target.value })}
              placeholder="e.g. Cleaned with saline wipe, ice pack applied, pupil comforted..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Staff Involved</label>
            <input
              type="text"
              required
              value={formData.staffInvolved}
              onChange={(e) => setFormData({ ...formData, staffInvolved: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-xl shadow-xs"
            >
              Log Incident Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
