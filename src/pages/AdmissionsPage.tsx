import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Search, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  Sparkles, 
  MoreVertical, 
  Edit3, 
  FileText, 
  DollarSign, 
  Users,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { AdmissionsLead, AdmissionsStage, NavigationTab, ProgrammeType } from '../types';
import { DEMO_LEADS, DEMO_CLASSES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface AdmissionsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

const STAGES: AdmissionsStage[] = [
  'New Enquiry',
  'Contacted',
  'Interested',
  'Tour Scheduled',
  'Tour Completed',
  'Application Started',
  'Application Submitted',
  'Payment Pending',
  'Enrolled',
  'Lost'
];

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate }) => {
  const [leads, setLeads] = useState<AdmissionsLead[]>(DEMO_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [programmeFilter, setProgrammeFilter] = useState('All');

  // Selected Lead Modal
  const [selectedLead, setSelectedLead] = useState<AdmissionsLead | null>(null);

  // Add / Edit Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<AdmissionsLead | null>(null);

  // Schedule Tour Modal
  const [tourModalLead, setTourModalLead] = useState<AdmissionsLead | null>(null);
  const [tourDate, setTourDate] = useState('2026-08-21');
  const [tourTime, setTourTime] = useState('10:30 AM');

  // Add Note Modal
  const [noteModalLead, setNoteModalLead] = useState<AdmissionsLead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    childAge: '2 years',
    desiredProgramme: 'Toddler Creche' as ProgrammeType,
    preferredStartDate: '2026-09-01',
    leadSource: 'Referral' as any,
    stage: 'New Enquiry' as AdmissionsStage,
    notes: '',
    nextFollowUpDate: '2026-08-22',
    estimatedFee: 420000
  });

  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      l.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    const matchProg = programmeFilter === 'All' || l.desiredProgramme === programmeFilter;
    return matchSearch && matchProg;
  });

  const handleMoveStage = (leadId: string, newStage: AdmissionsStage) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              stage: newStage,
              history: [
                {
                  date: new Date().toISOString().split('T')[0],
                  action: `Moved stage to ${newStage}`,
                  user: 'Amina Yusuf (Admissions Lead)'
                },
                ...l.history
              ]
            }
          : l
      )
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => prev ? { ...prev, stage: newStage } : null);
    }
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id
            ? {
                ...l,
                ...formData
              }
            : l
        )
      );
    } else {
      const newLead: AdmissionsLead = {
        id: `lead-0${leads.length + 1}`,
        ...formData,
        assignedStaff: 'Amina Yusuf (Admissions Lead)',
        history: [
          {
            date: new Date().toISOString().split('T')[0],
            action: 'Created lead in admissions pipeline',
            user: 'Staff'
          }
        ]
      };
      setLeads([newLead, ...leads]);
    }
    setIsAddModalOpen(false);
    setEditingLead(null);
  };

  const handleScheduleTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourModalLead) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === tourModalLead.id
          ? {
              ...l,
              stage: 'Tour Scheduled',
              tourDate,
              tourTime,
              history: [
                {
                  date: new Date().toISOString().split('T')[0],
                  action: `Tour scheduled for ${tourDate} at ${tourTime}`,
                  user: 'Amina Yusuf'
                },
                ...l.history
              ]
            }
          : l
      )
    );
    setTourModalLead(null);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteModalLead || !newNoteText.trim()) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === noteModalLead.id
          ? {
              ...l,
              notes: `${l.notes}\n[${new Date().toLocaleDateString()}]: ${newNoteText}`,
              history: [
                {
                  date: new Date().toISOString().split('T')[0],
                  action: `Note added: ${newNoteText}`,
                  user: 'Amina Yusuf'
                },
                ...l.history
              ]
            }
          : l
      )
    );
    setNoteModalLead(null);
    setNewNoteText('');
  };

  const handleConvertToAdmission = (lead: AdmissionsLead) => {
    if (confirm(`Convert ${lead.childName} into an actively enrolled pupil?`)) {
      handleMoveStage(lead.id, 'Enrolled');
      if (onNavigate) onNavigate('children');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Admissions Pipeline & CRM</h2>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
              10 Pipeline Stages
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Track inquiries from initial WhatsApp/Referral contact through tour bookings to enrollment
          </p>
        </div>

        <button
          onClick={() => {
            setEditingLead(null);
            setFormData({
              parentName: '',
              phone: '',
              email: '',
              childName: '',
              childAge: '2 years',
              desiredProgramme: 'Toddler Creche',
              preferredStartDate: '2026-09-01',
              leadSource: 'Referral',
              stage: 'New Enquiry',
              notes: '',
              nextFollowUpDate: '2026-08-22',
              estimatedFee: 420000
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Prospective Lead</span>
        </button>
      </div>

      {/* Search & Pipeline Stats */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by parent name, child name, or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={programmeFilter}
            onChange={(e) => setProgrammeFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden font-medium"
          >
            <option value="All">All Programmes</option>
            <option value="Infant Care">Infant Care</option>
            <option value="Toddler Creche">Toddler Creche</option>
            <option value="Preschool">Preschool</option>
            <option value="Aftercare">Aftercare</option>
          </select>

          <span className="text-xs text-slate-400 font-medium px-2">
            <strong>{filteredLeads.length}</strong> Total Leads in Funnel
          </span>
        </div>
      </div>

      {/* Visual Kanban Board (Horizontal Scrollable 10 Columns) */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-4 min-w-[2100px]">
          {STAGES.map((stage) => {
            const leadsInStage = filteredLeads.filter((l) => l.stage === stage);
            const totalStageFee = leadsInStage.reduce((acc, curr) => acc + curr.estimatedFee, 0);

            return (
              <div
                key={stage}
                className="w-72 bg-slate-100/70 border border-slate-200/80 rounded-2xl p-3 flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{stage}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 text-[10px] font-bold shadow-xs">
                      {leadsInStage.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold">
                    ₦{(totalStageFee / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3 overflow-y-auto pr-1 flex-1 min-h-[140px]">
                  {leadsInStage.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <p className="font-bold text-slate-900 text-xs group-hover:text-teal-700">
                            {lead.childName}
                          </p>
                          <p className="text-[10px] text-slate-500">{lead.childAge} • {lead.desiredProgramme}</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {lead.leadSource}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                        <p className="font-semibold text-slate-800">{lead.parentName}</p>
                        <p className="text-slate-400 text-[10px]">{lead.phone}</p>
                      </div>

                      {lead.tourDate && (
                        <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-900 font-medium flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-indigo-600 shrink-0" />
                          <span>Tour: {lead.tourDate} at {lead.tourTime}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Follow-up: {lead.nextFollowUpDate}</span>
                        <span className="font-mono font-bold text-slate-700">₦{lead.estimatedFee.toLocaleString()}</span>
                      </div>

                      {/* Quick Move Buttons */}
                      <div 
                        className="pt-2 flex items-center justify-between gap-1 border-t border-slate-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setTourModalLead(lead)}
                          className="px-2 py-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md"
                        >
                          Tour
                        </button>
                        <button
                          onClick={() => setNoteModalLead(lead)}
                          className="px-2 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md"
                        >
                          + Note
                        </button>
                        <button
                          onClick={() => {
                            const nextStageIndex = STAGES.indexOf(lead.stage) + 1;
                            if (nextStageIndex < STAGES.length) {
                              handleMoveStage(lead.id, STAGES[nextStageIndex]);
                            }
                          }}
                          title="Advance to next stage"
                          className="p-1 text-teal-700 hover:bg-teal-50 rounded-md"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {leadsInStage.length === 0 && (
                    <div className="h-28 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-[11px] text-slate-400">
                      No leads in {stage}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={`Lead: ${selectedLead.childName}`}
          subtitle={`Parent: ${selectedLead.parentName} • Desired: ${selectedLead.desiredProgramme}`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => handleConvertToAdmission(selectedLead)}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Convert to Full Admission</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Current Stage</span>
                <h3 className="text-base font-bold text-white font-display">{selectedLead.stage}</h3>
                <p className="text-xs text-teal-300">Lead Source: {selectedLead.leadSource} • Fee: ₦{selectedLead.estimatedFee.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Move Stage:</label>
                <select
                  value={selectedLead.stage}
                  onChange={(e) => handleMoveStage(selectedLead.id, e.target.value as AdmissionsStage)}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-lg border border-slate-700 text-xs font-semibold focus:outline-hidden"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Parent Contact</span>
                <p><strong>Name:</strong> {selectedLead.parentName}</p>
                <p><strong>Phone:</strong> {selectedLead.phone}</p>
                <p><strong>Email:</strong> {selectedLead.email}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Child Requirements</span>
                <p><strong>Child Name:</strong> {selectedLead.childName}</p>
                <p><strong>Child Age:</strong> {selectedLead.childAge}</p>
                <p><strong>Target Start:</strong> {selectedLead.preferredStartDate}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Notes & Special Requirements</span>
              <p className="whitespace-pre-line text-slate-800">{selectedLead.notes || 'No specific notes logged.'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage Transition Audit History</span>
              <div className="space-y-1.5">
                {selectedLead.history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] p-2 rounded bg-white border border-slate-100">
                    <span className="text-slate-800 font-medium">{h.action}</span>
                    <span className="text-slate-400">{h.date} by {h.user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Tour Modal */}
      {tourModalLead && (
        <Modal
          isOpen={!!tourModalLead}
          onClose={() => setTourModalLead(null)}
          title={`Schedule Campus Tour: ${tourModalLead.childName}`}
          subtitle={`Parent: ${tourModalLead.parentName} (${tourModalLead.phone})`}
          maxWidth="md"
        >
          <form onSubmit={handleScheduleTour} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Tour Date *</label>
              <input
                type="date"
                required
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Time Slot *</label>
              <select
                value={tourTime}
                onChange={(e) => setTourTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="09:30 AM">09:30 AM (Morning Circle View)</option>
                <option value="10:30 AM">10:30 AM (Outdoor Play & Snack View)</option>
                <option value="02:30 PM">02:30 PM (Aftercare & Nap Suites View)</option>
                <option value="04:00 PM">04:00 PM (Executive Director Session)</option>
              </select>
            </div>
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-[11px]">
              AI Admissions Agent will automatically prepare the visitor security pass at the Abuja reception gate.
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setTourModalLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
              >
                Confirm Tour Booking
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Note Modal */}
      {noteModalLead && (
        <Modal
          isOpen={!!noteModalLead}
          onClose={() => setNoteModalLead(null)}
          title={`Add Note: ${noteModalLead.childName}`}
          subtitle={`Parent: ${noteModalLead.parentName}`}
          maxWidth="md"
        >
          <form onSubmit={handleAddNote} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Follow-up Note / Call Summary *</label>
              <textarea
                rows={3}
                required
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="e.g. Spoke with mother regarding infant breastmilk storage facilities. Reassured of dedicated hospital-grade fridge."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setNoteModalLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl"
              >
                Append Note
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New Lead Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingLead(null);
        }}
        title={editingLead ? 'Edit Prospective Lead' : 'Add Prospective Parent Lead'}
        subtitle="Record new inquiry from website, phone call, referral or walk-in."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveLead} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Parent Full Name *</label>
              <input
                type="text"
                required
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="e.g. Dr. Aisha Mohammed"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 803 000 0000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="parent@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Lead Source</label>
              <select
                value={formData.leadSource}
                onChange={(e) => setFormData({ ...formData, leadSource: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Referral">Referral</option>
                <option value="Instagram">Instagram</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Google Search">Google Search</option>
                <option value="Parent Recommendation">Parent Recommendation</option>
                <option value="Flyer">Flyer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Child Name *</label>
              <input
                type="text"
                required
                value={formData.childName}
                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                placeholder="e.g. Tahir"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Child Age</label>
              <input
                type="text"
                value={formData.childAge}
                onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                placeholder="e.g. 11 months"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Desired Programme</label>
              <select
                value={formData.desiredProgramme}
                onChange={(e) => setFormData({ ...formData, desiredProgramme: e.target.value as ProgrammeType })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Infant Care">Infant Care</option>
                <option value="Toddler Creche">Toddler Creche</option>
                <option value="Preschool">Preschool</option>
                <option value="Aftercare">Aftercare</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Inquiry Notes & Special Requests</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Inquired about infant nurse-to-baby ratio and sterilisation routines."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingLead(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              {editingLead ? 'Update Lead' : 'Add to Pipeline'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
