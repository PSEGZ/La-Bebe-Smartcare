import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Moon, 
  Smile, 
  Send, 
  Eye, 
  Edit3, 
  Baby, 
  ChevronRight
} from 'lucide-react';
import { DailyReport, NavigationTab } from '../types';
import { DEMO_DAILY_REPORTS, DEMO_CLASSES, DEMO_CHILDREN } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface DailyReportsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const DailyReportsPage: React.FC<DailyReportsPageProps> = () => {
  const [reports, setReports] = useState<DailyReport[]>(DEMO_DAILY_REPORTS);
  const [selectedDate, setSelectedDate] = useState('2026-08-19');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Report Modal
  const [selectedReport, setSelectedReport] = useState<DailyReport | null>(null);

  // New Draft Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    childId: 'ch-01',
    teacherName: 'Mrs. Folake Adeleke',
    date: '2026-08-19',
    breakfast: 'Oatmeal & sliced banana (100% finished)',
    lunch: 'Jollof rice with shredded chicken (85% consumed)',
    snack: 'Apple slices & yogurt drink',
    waterIntake: '600ml logged',
    napStart: '01:00 PM',
    napEnd: '02:15 PM',
    napDuration: '1 hr 15 mins',
    napQuality: 'Sound Sleep',
    mood: 'Cheerful & Energetic' as any,
    activities: 'Finger painting sensory art, singing nursery phonics rhythm',
    learningActivity: 'Tactile sensory color exploration',
    generalObservation: 'Engaged enthusiastically with peers during circle storytelling.'
  });

  const filteredReports = reports.filter((r) => {
    const matchSearch = r.childName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchClass = selectedClass === 'All' || r.className.includes(selectedClass);
    const matchStatus = selectedStatus === 'All' || r.status === selectedStatus;
    const matchDate = r.date === selectedDate;
    return matchSearch && matchClass && matchStatus && matchDate;
  });

  const handleApproveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'Approved' } : r))
    );
    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) => (prev ? { ...prev, status: 'Approved' } : null));
    }
  };

  const handleSendToParent = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'Sent to Parent' } : r))
    );
    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) => (prev ? { ...prev, status: 'Sent to Parent' } : null));
    }
    alert('Daily care report dispatched via WhatsApp & Mobile App notification to parent!');
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    const child = DEMO_CHILDREN.find((c) => c.id === formData.childId) || DEMO_CHILDREN[0];

    const newRep: DailyReport = {
      id: `rep-0${reports.length + 1}`,
      childId: child.id,
      childName: `${child.firstName} ${child.lastName}`,
      className: child.className,
      date: formData.date,
      teacherId: 'stf-02',
      teacherName: formData.teacherName,
      status: 'Draft',
      meals: {
        breakfast: formData.breakfast,
        lunch: formData.lunch,
        snack: formData.snack,
        waterIntake: formData.waterIntake
      },
      nap: {
        startTime: formData.napStart,
        endTime: formData.napEnd,
        duration: formData.napDuration,
        quality: formData.napQuality
      },
      pottyDiaper: {
        wet: 3,
        soiled: 1,
        pottyTrips: 2
      },
      mood: formData.mood,
      activities: formData.activities,
      learningActivity: formData.learningActivity,
      generalObservation: formData.generalObservation,
      isAiGenerated: false
    };

    setReports([newRep, ...reports]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Daily Care Reports & Parent Updates</h2>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px] border border-teal-200">
              Today's Session
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Log meals, naps, potty routines, mood and classroom activities for immediate parent transparency
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          />

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Draft New Report</span>
          </button>
        </div>
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
              placeholder="Search by child name..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Classrooms</option>
              <option value="Infants">Infants (Nestlings)</option>
              <option value="Toddlers">Toddlers (Explorers)</option>
              <option value="Preschool">Preschool (Pioneers)</option>
              <option value="Aftercare">Aftercare</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft (Pending Review)</option>
              <option value="Approved">Approved by Teacher</option>
              <option value="Sent to Parent">Sent to Parent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{report.childName}</h3>
                  <p className="text-[11px] text-slate-500">{report.className} • Teacher {report.teacherName}</p>
                </div>
                <StatusBadge status={report.status} size="sm" />
              </div>

              {/* Mini Summary Elements */}
              <div className="mt-3 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Utensils className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">{report.meals.lunch}</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Nap: {report.nap.startTime} – {report.nap.endTime} ({report.nap.quality})</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Smile className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Mood: <strong>{report.mood}</strong></span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 mt-2.5 line-clamp-2 italic bg-teal-50/50 p-2 rounded-lg border border-teal-100/60">
                "{report.generalObservation}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] text-slate-400 font-mono">{report.date}</span>

              <div className="flex items-center gap-1.5">
                {report.status === 'Draft' && (
                  <button
                    onClick={() => handleApproveReport(report.id)}
                    className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-[11px]"
                  >
                    Approve
                  </button>
                )}
                {report.status === 'Approved' && (
                  <button
                    onClick={() => handleSendToParent(report.id)}
                    className="px-2.5 py-1 rounded-lg bg-teal-700 text-white hover:bg-teal-800 font-bold text-[11px] flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send to Parent</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedReport(report)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report View Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Daily Care Report: ${selectedReport.childName}`}
          subtitle={`${selectedReport.className} • ${selectedReport.date} • Teacher ${selectedReport.teacherName}`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {selectedReport.status === 'Draft' && (
                  <button
                    onClick={() => handleApproveReport(selectedReport.id)}
                    className="px-3.5 py-1.5 text-xs font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 rounded-lg"
                  >
                    Approve Report
                  </button>
                )}
                <button
                  onClick={() => handleSendToParent(selectedReport.id)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Parent (WhatsApp & App)</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Header Badge */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display">{selectedReport.childName}</h3>
                <p className="text-xs text-teal-300">Mood Today: {selectedReport.mood}</p>
              </div>
              <StatusBadge status={selectedReport.status} />
            </div>

            {/* Food Section */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-teal-800 font-bold">
                <Utensils className="w-4 h-4" />
                <span>Nutrition & Meal Log</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 rounded bg-white border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Breakfast</span>
                  <p className="font-semibold text-slate-800">{selectedReport.meals.breakfast}</p>
                </div>
                <div className="p-2 rounded bg-white border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Lunch</span>
                  <p className="font-semibold text-slate-800">{selectedReport.meals.lunch}</p>
                </div>
                <div className="p-2 rounded bg-white border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Snacks & Water</span>
                  <p className="font-semibold text-slate-800">{selectedReport.meals.snack} ({selectedReport.meals.waterIntake})</p>
                </div>
              </div>
            </div>

            {/* Nap & Potty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-800 font-bold">
                  <Moon className="w-4 h-4" />
                  <span>Nap Schedule</span>
                </div>
                <p><strong>Time:</strong> {selectedReport.nap.startTime} – {selectedReport.nap.endTime} ({selectedReport.nap.duration})</p>
                <p><strong>Quality:</strong> {selectedReport.nap.quality}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Baby className="w-4 h-4 text-teal-600" />
                  <span>Potty & Hygiene Routine</span>
                </div>
                <p><strong>Diaper Changes:</strong> {selectedReport.pottyDiaper.wet} Wet, {selectedReport.pottyDiaper.soiled} Soiled</p>
                <p><strong>Potty Trips:</strong> {selectedReport.pottyDiaper.pottyTrips}</p>
              </div>
            </div>

            {/* Activities & Observations */}
            <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200 space-y-2">
              <p className="font-bold text-teal-950">Activities & Learning Engagement:</p>
              <p className="text-slate-800">{selectedReport.activities}</p>
              <p className="font-bold text-teal-950 pt-2 border-t border-teal-200/60">Teacher's Personal Observation:</p>
              <p className="text-slate-800 italic">"{selectedReport.generalObservation}"</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Add / Draft Daily Report Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Draft Daily Child Care Report"
        subtitle="Record meal completion, nap times, mood, and daily learning activities."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveReport} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Child *</label>
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
              <label className="block text-slate-700 font-semibold mb-1">Educator Name</label>
              <input
                type="text"
                required
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Breakfast Log</label>
              <input
                type="text"
                value={formData.breakfast}
                onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Lunch Log</label>
              <input
                type="text"
                value={formData.lunch}
                onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Snacks Log</label>
              <input
                type="text"
                value={formData.snack}
                onChange={(e) => setFormData({ ...formData, snack: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nap Start Time</label>
              <input
                type="text"
                value={formData.napStart}
                onChange={(e) => setFormData({ ...formData, napStart: e.target.value })}
                placeholder="01:00 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nap End Time</label>
              <input
                type="text"
                value={formData.napEnd}
                onChange={(e) => setFormData({ ...formData, napEnd: e.target.value })}
                placeholder="02:15 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Mood Overall</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Cheerful & Energetic">Cheerful & Energetic</option>
                <option value="Calm & Engaged">Calm & Engaged</option>
                <option value="Sleepy / Fussy">Sleepy / Fussy</option>
                <option value="Social & Playful">Social & Playful</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Activities Participated</label>
            <input
              type="text"
              value={formData.activities}
              onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Teacher's Note & Observation</label>
            <textarea
              rows={2}
              value={formData.generalObservation}
              onChange={(e) => setFormData({ ...formData, generalObservation: e.target.value })}
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
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              Save Report Draft
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
