import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  UserCheck, 
  Thermometer, 
  UserX, 
  Sparkles, 
  Calendar,
  LogOut,
  LogIn,
  Layers,
  Baby
} from 'lucide-react';
import { AttendanceRecord, AttendanceStatus, NavigationTab } from '../types';
import { DEMO_ATTENDANCE, DEMO_CLASSES, DEMO_CHILDREN } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface AttendancePageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const AttendancePage: React.FC<AttendancePageProps> = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(DEMO_ATTENDANCE);
  const [selectedDate, setSelectedDate] = useState('2026-08-19');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Action Modal
  const [activeRecordForAction, setActiveRecordForAction] = useState<AttendanceRecord | null>(null);
  const [actionType, setActionType] = useState<'arrival' | 'departure' | 'status' | 'early_pickup' | null>(null);
  const [tempValue, setTempValue] = useState('36.5°C');
  const [actionNotes, setActionNotes] = useState('');
  const [pickupPerson, setPickupPerson] = useState('');

  // Counters
  const presentCount = records.filter(r => r.status === 'Present').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;
  const lateCount = records.filter(r => r.status === 'Late').length;
  const earlyPickupCount = records.filter(r => r.status === 'Early Pickup' || r.status === 'Departed').length;

  const filteredRecords = records.filter(r => {
    const matchSearch = r.childName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchClass = selectedClass === 'All' || r.className.includes(selectedClass);
    const matchStatus = selectedStatus === 'All' || r.status === selectedStatus;
    const matchDate = r.date === selectedDate;
    return matchSearch && matchClass && matchStatus && matchDate;
  });

  const handleUpdateStatus = (recordId: string, newStatus: AttendanceStatus) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        return {
          ...r,
          status: newStatus,
          arrivalTime: newStatus === 'Present' || newStatus === 'Late' ? (r.arrivalTime || timeNow) : undefined
        };
      }
      return r;
    }));
  };

  const handleExecuteAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRecordForAction) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRecords(prev => prev.map(r => {
      if (r.id === activeRecordForAction.id) {
        if (actionType === 'arrival') {
          return {
            ...r,
            status: 'Present',
            arrivalTime: timeNow,
            temperature: tempValue,
            notes: actionNotes || r.notes
          };
        }
        if (actionType === 'departure') {
          return {
            ...r,
            status: 'Departed',
            departureTime: timeNow,
            pickupPerson: pickupPerson || 'Authorized Parent/Guardian',
            notes: actionNotes || r.notes
          };
        }
        if (actionType === 'early_pickup') {
          return {
            ...r,
            status: 'Early Pickup',
            departureTime: timeNow,
            pickupPerson: pickupPerson || 'Parent',
            notes: `Early pickup recorded: ${actionNotes}`
          };
        }
      }
      return r;
    }));

    setActiveRecordForAction(null);
    setActionType(null);
    setActionNotes('');
    setPickupPerson('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Live Attendance & Check-In Log</h2>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold animate-pulse">
              Active Session
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time biometric & teacher-assisted child check-in, temperature vitals & departure log
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          />
        </div>
      </div>

      {/* Attendance Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Present</p>
            <p className="text-2xl font-extrabold text-slate-900 font-display mt-0.5">{presentCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">In classroom care</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-rose-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-800">Absent</p>
            <p className="text-2xl font-extrabold text-slate-900 font-display mt-0.5">{absentCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Notified by parent</p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
            <UserX className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Late Arrival</p>
            <p className="text-2xl font-extrabold text-slate-900 font-display mt-0.5">{lateCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">After 08:30 AM</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-sky-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-800">Early / Departed</p>
            <p className="text-2xl font-extrabold text-slate-900 font-display mt-0.5">{earlyPickupCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Signed out</p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700">
            <LogOut className="w-5 h-5" />
          </div>
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
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden font-medium"
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
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Early Pickup">Early Pickup</option>
              <option value="Departed">Departed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Child Name</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Arrival Time</th>
                <th className="py-3.5 px-4">Departure Time</th>
                <th className="py-3.5 px-4">Vitals / Temp</th>
                <th className="py-3.5 px-4">Recorded By</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                        {record.childName[0]}
                      </div>
                      <span className="font-bold text-slate-900">{record.childName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {record.className}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">
                    {record.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={record.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {record.arrivalTime ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <LogIn className="w-3 h-3" /> {record.arrivalTime}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {record.departureTime ? (
                      <span className="inline-flex items-center gap-1 text-sky-700">
                        <LogOut className="w-3 h-3" /> {record.departureTime}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {record.temperature ? (
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        <Thermometer className="w-3 h-3 text-teal-600" />
                        {record.temperature}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {record.recordedBy}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Mark Present */}
                      <button
                        onClick={() => handleUpdateStatus(record.id, 'Present')}
                        title="Mark Present"
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                          record.status === 'Present'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        Present
                      </button>

                      {/* Mark Absent */}
                      <button
                        onClick={() => handleUpdateStatus(record.id, 'Absent')}
                        title="Mark Absent"
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                          record.status === 'Absent'
                            ? 'bg-rose-600 text-white'
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        Absent
                      </button>

                      {/* Record Departure */}
                      <button
                        onClick={() => {
                          setActiveRecordForAction(record);
                          setActionType('departure');
                        }}
                        title="Record Departure"
                        className="px-2 py-1 rounded bg-sky-50 text-sky-700 hover:bg-sky-100 text-[11px] font-bold"
                      >
                        Sign Out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal (Arrival / Departure / Temperature Record) */}
      {activeRecordForAction && (
        <Modal
          isOpen={!!activeRecordForAction}
          onClose={() => {
            setActiveRecordForAction(null);
            setActionType(null);
          }}
          title={
            actionType === 'arrival' 
              ? `Check-In Arrival: ${activeRecordForAction.childName}` 
              : actionType === 'departure'
                ? `Sign-Out Departure: ${activeRecordForAction.childName}`
                : `Record Early Pickup: ${activeRecordForAction.childName}`
          }
          subtitle={`${activeRecordForAction.className} • Maitama Campus`}
          maxWidth="md"
        >
          <form onSubmit={handleExecuteAction} className="space-y-3.5 text-xs">
            {actionType === 'arrival' && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Morning Temperature Reading</label>
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="36.5°C"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
            )}

            {(actionType === 'departure' || actionType === 'early_pickup') && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Authorized Pickup Person</label>
                <input
                  type="text"
                  required
                  value={pickupPerson}
                  onChange={(e) => setPickupPerson(e.target.value)}
                  placeholder="e.g. Engr. Babatunde Adeleke (Father / ID verified)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Notes / Observation</label>
              <textarea
                rows={2}
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="e.g. Arrived cheerful, backpack handed to assistant"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveRecordForAction(null);
                  setActionType(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
              >
                Confirm & Log Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
