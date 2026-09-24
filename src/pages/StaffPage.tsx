import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Award, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  Building2, 
  FileText,
  UserCheck
} from 'lucide-react';
import { StaffMember, NavigationTab } from '../types';
import { DEMO_STAFF, DEMO_CLASSES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface StaffPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const StaffPage: React.FC<StaffPageProps> = ({ onNavigate }) => {
  const [staffList, setStaffList] = useState<StaffMember[]>(DEMO_STAFF);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Detail Modal
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'qualifications' | 'documents' | 'schedule'>('info');

  // Add / Edit Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Lead Teacher',
    qualification: "B.Ed Early Childhood Education",
    assignedClass: 'Toddlers (Explorers)',
    phone: '',
    email: '',
    shift: '07:30 AM – 03:30 PM',
    status: 'Active' as any
  });

  const filteredStaff = staffList.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assignedClass.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'All' || s.role.includes(roleFilter);
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      setStaffList(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...formData } : s));
    } else {
      const newStaff: StaffMember = {
        id: `st-0${staffList.length + 1}`,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        documents: ['National ID Card', 'Degree Certificate', 'Police Clearance Report']
      };
      setStaffList([...staffList, newStaff]);
    }
    setIsAddModalOpen(false);
    setEditingStaff(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Staff & Educators Management</h2>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
              8 Full-Time Staff
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered teachers, caregivers, early childhood certifications, background checks & shift schedules
          </p>
        </div>

        <button
          onClick={() => {
            setEditingStaff(null);
            setFormData({
              name: '',
              role: 'Caregiver / Teacher',
              qualification: "B.Ed Early Childhood",
              assignedClass: 'Toddlers (Explorers)',
              phone: '+234 800 000 0000',
              email: 'staff@labebesmartcare.ng',
              shift: '07:30 AM – 03:30 PM',
              status: 'Active'
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Team</p>
          <p className="text-xl font-extrabold text-slate-900 font-display mt-0.5">8 Staff</p>
          <p className="text-[10px] text-teal-700 font-semibold mt-0.5">100% attendance today</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Lead Teachers</p>
          <p className="text-xl font-extrabold text-slate-900 font-display mt-0.5">4 Leads</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Assigned to 4 rooms</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Nurse / First Aid</p>
          <p className="text-xl font-extrabold text-slate-900 font-display mt-0.5">1 Specialist</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">RN Certified on duty</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Vetting & Clearance</p>
          <p className="text-xl font-extrabold text-emerald-700 font-display mt-0.5">100% Vetted</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Police & TRCN records verified</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search staff by name, role, assigned class..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Roles</option>
              <option value="Teacher">Teachers</option>
              <option value="Assistant">Assistants</option>
              <option value="Nurse">Pediatric Nurse</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Classroom Assigned</th>
                <th className="py-3.5 px-4">Shift</th>
                <th className="py-3.5 px-4">Qualification</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((st) => (
                <tr
                  key={st.id}
                  onClick={() => setSelectedStaff(st)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {st.name[0]}
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{st.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium">{st.role}</td>
                  <td className="py-3.5 px-4 text-teal-800 font-semibold">{st.assignedClass}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{st.shift}</td>
                  <td className="py-3.5 px-4 text-slate-600">{st.qualification}</td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-medium text-slate-800">{st.phone}</p>
                      <p className="text-[10px] text-slate-400">{st.email}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={st.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedStaff(st)}
                        title="View Profile"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingStaff(st);
                          setFormData({
                            name: st.name,
                            role: st.role,
                            qualification: st.qualification,
                            assignedClass: st.assignedClass,
                            phone: st.phone,
                            email: st.email,
                            shift: st.shift,
                            status: st.status
                          });
                          setIsAddModalOpen(true);
                        }}
                        title="Edit Staff"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-700 hover:bg-slate-100"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <Modal
          isOpen={!!selectedStaff}
          onClose={() => setSelectedStaff(null)}
          title={`Staff Profile: ${selectedStaff.name}`}
          subtitle={`${selectedStaff.role} • ${selectedStaff.assignedClass}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display">{selectedStaff.name}</h3>
                <p className="text-xs text-teal-300">{selectedStaff.role} • Joined {selectedStaff.joinDate}</p>
              </div>
              <StatusBadge status={selectedStaff.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Contact & Shift</span>
                <p><strong>Phone:</strong> {selectedStaff.phone}</p>
                <p><strong>Email:</strong> {selectedStaff.email}</p>
                <p><strong>Work Shift:</strong> {selectedStaff.shift}</p>
                <p><strong>Classroom:</strong> {selectedStaff.assignedClass}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Qualifications & Credentials</span>
                <p><strong>Education:</strong> {selectedStaff.qualification}</p>
                <p><strong>TRCN Certified:</strong> Yes (Active License)</p>
                <p><strong>Pediatric First Aid:</strong> Certified (Valid 2027)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Safeguarding Documents</span>
              <div className="space-y-1">
                {selectedStaff.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                    <span className="font-semibold text-slate-800">{doc}</span>
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified & Archived
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add / Edit Staff Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStaff(null);
        }}
        title={editingStaff ? `Edit Staff: ${editingStaff.name}` : 'Register New Staff Member'}
        subtitle="Staff credentials, classroom assignment, and contact details."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveStaff} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Grace Okafor"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Role</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Lead Teacher"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Assigned Classroom</label>
              <select
                value={formData.assignedClass}
                onChange={(e) => setFormData({ ...formData, assignedClass: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {DEMO_CLASSES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 803 000 0000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="staff@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Qualification & Certifications</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g. B.Ed Early Childhood Education, Montessori Cert."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingStaff(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              {editingStaff ? 'Update Staff Record' : 'Save Staff Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
