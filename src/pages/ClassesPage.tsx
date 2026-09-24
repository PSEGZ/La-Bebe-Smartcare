import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Plus, 
  Search, 
  Layers, 
  Smile, 
  CheckCircle2, 
  Eye, 
  User, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { ClassRoom, NavigationTab } from '../types';
import { DEMO_CLASSES, DEMO_CHILDREN } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface ClassesPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const ClassesPage: React.FC<ClassesPageProps> = ({ onNavigate }) => {
  const [classes, setClasses] = useState<ClassRoom[]>(DEMO_CLASSES);
  const [selectedClass, setSelectedClass] = useState<ClassRoom | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.leadTeacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.programme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRosterForClass = (classId: string) => {
    return DEMO_CHILDREN.filter((c) => c.classId === classId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Classroom Suites & Ratios</h2>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px] border border-teal-200">
              Maitama Early Years
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Classroom capacities, educator-to-pupil ratios, live headcounts and suite rosters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search classrooms or teachers..."
              className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Classrooms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((cls) => {
          const occupancyRate = Math.round((cls.enrolledCount / cls.capacity) * 100);
          const roster = getRosterForClass(cls.id);

          return (
            <div
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {cls.programme}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{cls.code}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mt-1.5 group-hover:text-teal-700 transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{cls.ageRange} • {cls.roomNumber}</p>
                  </div>
                  <StatusBadge status={cls.status} size="sm" />
                </div>

                {/* Teachers info */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Lead Educator</span>
                    <span className="font-semibold text-slate-800">{cls.leadTeacher}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Assistant Educator</span>
                    <span className="font-semibold text-slate-800">{cls.assistantTeacher}</span>
                  </div>
                </div>

                {/* Capacity & Ratio Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Enrolled</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">{cls.enrolledCount} / {cls.capacity}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                    <span className="text-emerald-800 text-[10px] uppercase font-bold block">Present Today</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">{cls.presentToday}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100">
                    <span className="text-teal-800 text-[10px] uppercase font-bold block">Safety Ratio</span>
                    <span className="font-mono font-bold text-teal-700 text-sm">{cls.ratio}</span>
                  </div>
                </div>

                {/* Occupancy Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Room Utilization</span>
                    <span className="font-bold text-slate-700">{occupancyRate}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        occupancyRate >= 90 ? 'bg-amber-500' : 'bg-teal-600'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                <span>View {roster.length} Enrolled Pupils</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Room Roster Modal */}
      {selectedClass && (
        <Modal
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          title={`${selectedClass.name} Suite Roster`}
          subtitle={`${selectedClass.roomNumber} • Lead: ${selectedClass.leadTeacher} • Mandated Ratio: ${selectedClass.ratio}`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">
                {selectedClass.presentToday} of {selectedClass.enrolledCount} pupils checked in today
              </span>
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base font-display">{selectedClass.name}</h4>
                <p className="text-xs text-teal-300">
                  {selectedClass.programme} • {selectedClass.ageRange}
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-slate-400 block">Class Headcount</span>
                <span className="text-lg font-bold text-emerald-400">
                  {selectedClass.enrolledCount} / {selectedClass.capacity}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Enrolled Pupils in Suite
              </h5>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {getRosterForClass(selectedClass.id).map((child) => (
                  <div key={child.id} className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center">
                        {child.firstName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{child.firstName} {child.lastName}</p>
                        <p className="text-[11px] text-slate-500">Reg: {child.regNumber} • Parent: {child.parentName}</p>
                      </div>
                    </div>
                    <StatusBadge status={child.attendanceStatus} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
