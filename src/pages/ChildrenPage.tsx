import React, { useState } from 'react';
import { 
  Baby, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Archive, 
  Eye, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  FileText, 
  Clock, 
  Sparkles, 
  CreditCard, 
  BookOpen,
  X,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { Child, NavigationTab, ProgrammeType, EnrollmentStatus, AttendanceStatus } from '../types';
import { DEMO_CHILDREN, DEMO_CLASSES, DEMO_PARENTS, DEMO_ATTENDANCE, DEMO_DAILY_REPORTS, DEMO_ACTIVITIES, DEMO_INCIDENTS, DEMO_INVOICES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface ChildrenPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const ChildrenPage: React.FC<ChildrenPageProps> = ({ onNavigate }) => {
  const [children, setChildren] = useState<Child[]>(DEMO_CHILDREN);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All');
  const [selectedProgrammeFilter, setSelectedProgrammeFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'class'>('name');

  // Drawer / Profile state
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<
    'overview' | 'parent' | 'attendance' | 'daily_reports' | 'activities' | 'learning' | 'incidents' | 'documents' | 'finance'
  >('overview');

  // Add / Edit Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  // New Child Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '2024-05-10',
    classId: 'cls-2',
    programme: 'Toddler Creche' as ProgrammeType,
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    bloodGroup: 'O+',
    genotype: 'AA',
    allergies: '',
    dietaryRestrictions: '',
    medicalConditions: '',
    emergencyName: '',
    emergencyPhone: ''
  });

  const filteredChildren = children
    .filter((c) => {
      const matchSearch =
        c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.parentName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchClass = selectedClassFilter === 'All' || c.className.includes(selectedClassFilter);
      const matchProg = selectedProgrammeFilter === 'All' || c.programme === selectedProgrammeFilter;
      const matchStatus = selectedStatusFilter === 'All' || c.enrollmentStatus === selectedStatusFilter;

      return matchSearch && matchClass && matchProg && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
      if (sortBy === 'class') return a.className.localeCompare(b.className);
      return 0;
    });

  const handleSaveChild = (e: React.FormEvent) => {
    e.preventDefault();
    const targetClass = DEMO_CLASSES.find((cl) => cl.id === formData.classId) || DEMO_CLASSES[0];

    if (editingChild) {
      setChildren((prev) =>
        prev.map((c) =>
          c.id === editingChild.id
            ? {
                ...c,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dob: formData.dob,
                classId: targetClass.id,
                className: targetClass.name,
                programme: formData.programme,
                parentName: formData.parentName,
                parentPhone: formData.parentPhone,
                parentEmail: formData.parentEmail,
                bloodGroup: formData.bloodGroup,
                genotype: formData.genotype,
                allergies: formData.allergies ? formData.allergies.split(',').map((s) => s.trim()) : [],
                dietaryRestrictions: formData.dietaryRestrictions,
                medicalConditions: formData.medicalConditions
              }
            : c
        )
      );
      if (selectedChild?.id === editingChild.id) {
        setSelectedChild((prev) => prev ? { ...prev, firstName: formData.firstName, lastName: formData.lastName } : null);
      }
    } else {
      const newChild: Child = {
        id: `ch-0${children.length + 1}`,
        regNumber: `LBC/2026/00${children.length + 1}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dob: formData.dob,
        age: '2 yrs',
        classId: targetClass.id,
        className: targetClass.name,
        programme: formData.programme,
        parentId: `par-0${children.length + 1}`,
        parentName: formData.parentName || 'Parent Guardian',
        parentPhone: formData.parentPhone || '+234 800 000 0000',
        parentEmail: formData.parentEmail || 'parent@example.com',
        attendanceStatus: 'Present',
        enrollmentStatus: 'Enrolled',
        bloodGroup: formData.bloodGroup,
        genotype: formData.genotype,
        allergies: formData.allergies ? formData.allergies.split(',').map((s) => s.trim()) : [],
        dietaryRestrictions: formData.dietaryRestrictions || 'None',
        medicalConditions: formData.medicalConditions || 'None',
        emergencyContact: {
          name: formData.emergencyName || formData.parentName,
          relationship: 'Parent/Guardian',
          phone: formData.emergencyPhone || formData.parentPhone
        },
        authorizedPickups: [
          { name: formData.parentName, relationship: 'Parent', phone: formData.parentPhone }
        ],
        admissionDate: new Date().toISOString().split('T')[0],
        avatarColor: 'bg-teal-600'
      };
      setChildren([newChild, ...children]);
    }

    setIsAddModalOpen(false);
    setEditingChild(null);
  };

  const handleOpenEdit = (child: Child) => {
    setEditingChild(child);
    setFormData({
      firstName: child.firstName,
      lastName: child.lastName,
      gender: child.gender,
      dob: child.dob,
      classId: child.classId,
      programme: child.programme,
      parentName: child.parentName,
      parentPhone: child.parentPhone,
      parentEmail: child.parentEmail,
      bloodGroup: child.bloodGroup,
      genotype: child.genotype,
      allergies: child.allergies.join(', '),
      dietaryRestrictions: child.dietaryRestrictions,
      medicalConditions: child.medicalConditions,
      emergencyName: child.emergencyContact.name,
      emergencyPhone: child.emergencyContact.phone
    });
    setIsAddModalOpen(true);
  };

  const handleArchiveChild = (id: string) => {
    if (confirm('Are you sure you want to archive this child record?')) {
      setChildren((prev) =>
        prev.map((c) => (c.id === id ? { ...c, enrollmentStatus: 'Withdrawn' as EnrollmentStatus } : c))
      );
      if (selectedChild?.id === id) {
        setSelectedChild(null);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Children Management Roster</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered pupils, emergency contacts, medical records & 9-tab profile view
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => {
              setEditingChild(null);
              setFormData({
                firstName: '',
                lastName: '',
                gender: 'Male',
                dob: '2024-05-10',
                classId: 'cls-2',
                programme: 'Toddler Creche',
                parentName: '',
                parentPhone: '',
                parentEmail: '',
                bloodGroup: 'O+',
                genotype: 'AA',
                allergies: '',
                dietaryRestrictions: '',
                medicalConditions: '',
                emergencyName: '',
                emergencyPhone: ''
              });
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Child</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, reg number, parent..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Classes</option>
              <option value="Infants">Infants</option>
              <option value="Toddlers">Toddlers</option>
              <option value="Preschool">Preschool</option>
              <option value="Aftercare">Aftercare</option>
            </select>

            <select
              value={selectedProgrammeFilter}
              onChange={(e) => setSelectedProgrammeFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Programmes</option>
              <option value="Infant Care">Infant Care</option>
              <option value="Toddler Creche">Toddler Creche</option>
              <option value="Preschool">Preschool</option>
              <option value="Aftercare">Aftercare</option>
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Enrolled">Enrolled</option>
              <option value="On Leave">On Leave</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden font-medium"
            >
              <option value="name">Sort: Name (A-Z)</option>
              <option value="class">Sort: Class</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          <span>Showing <strong>{filteredChildren.length}</strong> registered children</span>
          <span>Abuja Main Nursery Campus</span>
        </div>
      </div>

      {/* Children Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Child ID</th>
                <th className="py-3.5 px-4">Child Name</th>
                <th className="py-3.5 px-4">Age / Gender</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Programme</th>
                <th className="py-3.5 px-4">Parent / Guardian</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChildren.map((child) => (
                <tr
                  key={child.id}
                  onClick={() => setSelectedChild(child)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                    {child.regNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${child.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                        {child.firstName[0]}{child.lastName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {child.firstName} {child.lastName}
                        </p>
                        {child.allergies.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100 mt-0.5">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            {child.allergies[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <div>
                      <p className="font-medium">{child.age}</p>
                      <p className="text-[10px] text-slate-400">{child.gender}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {child.className}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                      {child.programme}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-slate-900">{child.parentName}</p>
                      <p className="text-[10px] text-slate-400">{child.parentPhone}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={child.attendanceStatus} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={child.enrollmentStatus} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedChild(child)}
                        title="View Full Profile"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(child)}
                        title="Edit Child"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-700 hover:bg-slate-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleArchiveChild(child.id)}
                        title="Archive Child"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-slate-100 transition-colors"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Child Profile Modal / Detail View (9 Comprehensive Tabs) */}
      {selectedChild && (
        <Modal
          isOpen={!!selectedChild}
          onClose={() => setSelectedChild(null)}
          title={`${selectedChild.firstName} ${selectedChild.lastName}`}
          subtitle={`${selectedChild.regNumber} • ${selectedChild.className} • ${selectedChild.programme}`}
          maxWidth="4xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-slate-400">
                Enrolled: {selectedChild.admissionDate} • Abuja Campus
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(selectedChild)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setSelectedChild(null)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Header Mini Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl ${selectedChild.avatarColor} text-white flex items-center justify-center font-extrabold text-lg shadow-md`}>
                  {selectedChild.firstName[0]}{selectedChild.lastName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold font-display">{selectedChild.firstName} {selectedChild.lastName}</h3>
                    <span className="px-2 py-0.5 bg-teal-500/30 text-teal-200 text-[10px] font-bold rounded-full">
                      {selectedChild.enrollmentStatus}
                    </span>
                  </div>
                  <p className="text-xs text-teal-200 mt-0.5">
                    {selectedChild.age} • Gender: {selectedChild.gender} • DOB: {selectedChild.dob}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 text-right">
                  <p className="text-[10px] text-slate-300">Blood / Genotype</p>
                  <p className="text-xs font-bold text-white font-mono">{selectedChild.bloodGroup} / {selectedChild.genotype}</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 text-right">
                  <p className="text-[10px] text-slate-300">Attendance Today</p>
                  <p className="text-xs font-bold text-emerald-300">{selectedChild.attendanceStatus}</p>
                </div>
              </div>
            </div>

            {/* 9 Profile Tabs Header */}
            <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
              {[
                { id: 'overview', label: '1. Overview' },
                { id: 'parent', label: '2. Parent & Guardians' },
                { id: 'attendance', label: '3. Attendance' },
                { id: 'daily_reports', label: '4. Daily Reports' },
                { id: 'activities', label: '5. Activities' },
                { id: 'learning', label: '6. Learning' },
                { id: 'incidents', label: '7. Incidents' },
                { id: 'documents', label: '8. Documents' },
                { id: 'finance', label: '9. Finance' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveProfileTab(t.id as any)}
                  className={`px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-t-lg transition-all border-b-2 ${
                    activeProfileTab === t.id
                      ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeProfileTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-slate-500">
                    Registration & Classroom
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400">Registration Number:</span>
                      <p className="font-bold font-mono text-slate-800">{selectedChild.regNumber}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Admission Date:</span>
                      <p className="font-bold text-slate-800">{selectedChild.admissionDate}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Assigned Room:</span>
                      <p className="font-bold text-slate-800">{selectedChild.className}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Programme:</span>
                      <p className="font-bold text-slate-800">{selectedChild.programme}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-rose-900 uppercase text-[11px] tracking-wider">
                      Medical & Allergies
                    </h4>
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <span className="text-slate-500">Known Allergies:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedChild.allergies.length > 0 ? (
                        selectedChild.allergies.map((alg) => (
                          <span key={alg} className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded-md text-[11px]">
                            {alg}
                          </span>
                        ))
                      ) : (
                        <span className="text-emerald-700 font-semibold">No known allergies logged</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Dietary Restrictions:</span>
                    <p className="font-medium text-slate-800">{selectedChild.dietaryRestrictions}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Medical Notes:</span>
                    <p className="font-medium text-slate-800">{selectedChild.medicalConditions}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Parent & Guardians */}
            {activeProfileTab === 'parent' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Primary Parent / Guardian</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-slate-400">Full Name:</span>
                      <p className="font-bold text-slate-900">{selectedChild.parentName}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Phone:</span>
                      <p className="font-bold text-slate-900">{selectedChild.parentPhone}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Email:</span>
                      <p className="font-bold text-slate-900">{selectedChild.parentEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Emergency Contact</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-slate-400">Contact Person:</span>
                      <p className="font-bold text-slate-900">{selectedChild.emergencyContact.name}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Relationship:</span>
                      <p className="font-bold text-slate-900">{selectedChild.emergencyContact.relationship}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Emergency Phone:</span>
                      <p className="font-bold text-slate-900">{selectedChild.emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Authorized Pick-Up Personnel</h4>
                  <div className="space-y-2">
                    {selectedChild.authorizedPickups.map((pick, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-teal-600" />
                          <span className="font-bold text-slate-900">{pick.name}</span>
                          <span className="text-slate-400">({pick.relationship})</span>
                        </div>
                        <span className="font-mono text-slate-600">{pick.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Attendance */}
            {activeProfileTab === 'attendance' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50 border border-teal-200">
                  <span>Attendance Record: <strong>94% Term 1 Present Rate</strong></span>
                  <StatusBadge status={selectedChild.attendanceStatus} />
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5">Arrival</th>
                        <th className="p-2.5">Temp</th>
                        <th className="p-2.5">Recorded By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {DEMO_ATTENDANCE.filter(a => a.childId === selectedChild.id).map(a => (
                        <tr key={a.id}>
                          <td className="p-2.5 font-medium">{a.date}</td>
                          <td className="p-2.5"><StatusBadge status={a.status} size="sm" /></td>
                          <td className="p-2.5">{a.arrivalTime || '—'}</td>
                          <td className="p-2.5 font-mono">{a.temperature || '36.5°C'}</td>
                          <td className="p-2.5 text-slate-500">{a.recordedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4: Daily Reports */}
            {activeProfileTab === 'daily_reports' && (
              <div className="space-y-3 text-xs">
                {DEMO_DAILY_REPORTS.filter(r => r.childId === selectedChild.id).length > 0 ? (
                  DEMO_DAILY_REPORTS.filter(r => r.childId === selectedChild.id).map(r => (
                    <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{r.date} — Teacher {r.teacherName}</span>
                        <StatusBadge status={r.status} size="sm" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                        <p><strong>Meals:</strong> {r.meals.lunch}</p>
                        <p><strong>Nap:</strong> {r.nap.startTime}–{r.nap.endTime} ({r.nap.quality})</p>
                        <p><strong>Activities:</strong> {r.activities}</p>
                        <p><strong>Observation:</strong> {r.generalObservation}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400">
                    No historical daily report for this student yet today.
                  </div>
                )}
              </div>
            )}

            {/* Tab 5: Activities */}
            {activeProfileTab === 'activities' && (
              <div className="space-y-2 text-xs">
                {DEMO_ACTIVITIES.slice(0, 3).map(act => (
                  <div key={act.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{act.title}</p>
                      <p className="text-[11px] text-slate-500">{act.category} • Teacher {act.teacherName}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 6: Learning */}
            {activeProfileTab === 'learning' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900">Montessori & EYFS Developmental Milestones</h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100 flex items-center justify-between">
                    <span>Sensory Color Recognition (Primary)</span>
                    <span className="text-emerald-700 font-bold">Achieved</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100 flex items-center justify-between">
                    <span>Fine Motor Pincer Grasp (Large Beads)</span>
                    <span className="text-emerald-700 font-bold">Consolidating</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100 flex items-center justify-between">
                    <span>Social Empathy & Toy Sharing</span>
                    <span className="text-teal-700 font-bold">Emerging</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 7: Incidents */}
            {activeProfileTab === 'incidents' && (
              <div className="space-y-2 text-xs">
                {DEMO_INCIDENTS.filter(i => i.childId === selectedChild.id).length > 0 ? (
                  DEMO_INCIDENTS.filter(i => i.childId === selectedChild.id).map(inc => (
                    <div key={inc.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{inc.incidentNumber} — {inc.category}</span>
                        <StatusBadge status={inc.status} size="sm" isSafeguarding={inc.isSafeguarding} />
                      </div>
                      <p className="text-slate-600">{inc.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400">
                    No incidents logged for this child. Clean safety record.
                  </div>
                )}
              </div>
            )}

            {/* Tab 8: Documents */}
            {activeProfileTab === 'documents' && (
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Immunization Certificate (Yellow Card & Vaccines)', status: 'Verified & Attached' },
                  { name: 'Birth Certificate Copy (National NPC)', status: 'Verified & Attached' },
                  { name: 'Authorized Pick-Up ID & Passport Photo', status: 'Approved' },
                  { name: 'Admission & Medical Consent Form 2026', status: 'Signed & Active' }
                ].map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                    </div>
                    <span className="text-emerald-700 font-bold text-[11px]">{doc.status}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 9: Finance */}
            {activeProfileTab === 'finance' && (
              <div className="space-y-2 text-xs">
                {DEMO_INVOICES.filter(inv => inv.childId === selectedChild.id).map(inv => (
                  <div key={inv.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{inv.invoiceNumber} — {inv.term}</p>
                      <p className="text-slate-500 text-[11px]">Due: {inv.dueDate} • Paid: ₦{inv.paidAmount.toLocaleString()} / ₦{inv.totalAmount.toLocaleString()}</p>
                    </div>
                    <StatusBadge status={inv.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add / Edit Child Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingChild(null);
        }}
        title={editingChild ? `Edit Child: ${editingChild.firstName}` : 'Register New Child'}
        subtitle="Complete enrollment details, parent information, and medical notes."
        maxWidth="3xl"
      >
        <form onSubmit={handleSaveChild} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. David"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Adeleke"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Class Room *</label>
              <select
                value={formData.classId}
                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {DEMO_CLASSES.map((cl) => (
                  <option key={cl.id} value={cl.id}>{cl.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Parent Name *</label>
              <input
                type="text"
                required
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="e.g. Engr. Babatunde Adeleke"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Parent Phone *</label>
              <input
                type="text"
                required
                value={formData.parentPhone}
                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                placeholder="+234 803 000 0000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Parent Email</label>
              <input
                type="email"
                value={formData.parentEmail}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                placeholder="parent@gmail.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Blood Group & Genotype</label>
              <div className="flex gap-2">
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                </select>
                <select
                  value={formData.genotype}
                  onChange={(e) => setFormData({ ...formData, genotype: e.target.value })}
                  className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="AC">AC</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Allergies (comma separated)</label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="e.g. Peanuts, Strawberries"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Dietary Restrictions & Medical Notes</label>
            <textarea
              rows={2}
              value={formData.dietaryRestrictions}
              onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
              placeholder="e.g. Halal meals only, mild eczema moisturiser after swim"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingChild(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              {editingChild ? 'Update Child' : 'Save & Register Child'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
