import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Utensils, 
  Moon, 
  Smile, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  Send,
  Baby,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { NavigationTab } from '../types';
import { DEMO_CHILDREN, DEMO_ACTIVITIES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';

interface TeacherDashboardViewProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ onNavigate }) => {
  const [children, setChildren] = useState(
    DEMO_CHILDREN.filter(c => c.className.includes('Toddlers'))
  );
  const [quickNote, setQuickNote] = useState('');

  const handleToggleAttendance = (childId: string) => {
    setChildren(prev => prev.map(c => {
      if (c.id === childId) {
        const nextStatus = c.attendanceStatus === 'Present' ? 'Checked Out' : 'Present';
        return { ...c, attendanceStatus: nextStatus as any };
      }
      return c;
    }));
  };

  const handleQuickBatchLog = (type: string) => {
    alert(`Batch logging ${type} for all present Toddlers in Explorers suite... Done!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 p-6 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[11px] border border-teal-500/30">
              Educator Command Station
            </span>
            <span className="text-slate-300 text-xs">Room: Explorers Suite (Toddlers)</span>
          </div>
          <h2 className="text-2xl font-bold font-display mt-1">Hello, Teacher Grace Okafor</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Active Toddlers Room: 16 Enrolled • Current Ratio: 1:4 (Compliant with Abuja Standards)
          </p>
        </div>

        {/* Quick batch action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleQuickBatchLog('Lunch Consumption')}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Batch Lunch Log</span>
          </button>
          <button
            onClick={() => handleQuickBatchLog('Nap Times')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Batch Nap Log</span>
          </button>
        </div>
      </div>

      {/* Classroom Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Toddlers In Room</p>
          <p className="text-xl font-extrabold text-slate-900 font-display mt-0.5">
            {children.filter(c => c.attendanceStatus === 'Present').length} Present
          </p>
          <p className="text-[10px] text-teal-700 font-semibold mt-0.5">3 Enrolled Absent</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Care Reports Today</p>
          <p className="text-xl font-extrabold text-teal-700 font-display mt-0.5">14 / 16 Drafted</p>
          <p className="text-[10px] text-slate-500 mt-0.5">2 pending review</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Today's Curriculum</p>
          <p className="text-xl font-extrabold text-indigo-700 font-display mt-0.5">2 Planned</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Sensory Art & Phonics</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Room Safeguarding</p>
          <p className="text-xl font-extrabold text-emerald-700 font-display mt-0.5">0 Incidents</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">All pupils safe</p>
        </div>
      </div>

      {/* Live Toddlers Roster with Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm font-display">Toddlers (Explorers) Room Roster</h3>
            <p className="text-xs text-slate-500">Tap to toggle check-in or quick log child updates</p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            Live Room View
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {children.map((child) => (
            <div
              key={child.id}
              className="p-4 hover:bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={child.photoUrl}
                  alt={child.firstName}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{child.firstName} {child.lastName}</h4>
                    <span className="text-[10px] text-slate-400">{child.ageMonths} mos</span>
                    <StatusBadge status={child.attendanceStatus} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Parent: {child.parentName} ({child.parentPhone})
                  </p>
                  {child.allergies.length > 0 && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      Allergies: {child.allergies.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => handleToggleAttendance(child.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                    child.attendanceStatus === 'Present'
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {child.attendanceStatus === 'Present' ? 'Check Out' : 'Check In'}
                </button>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('dailyReports')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-xl font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Daily Log</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
