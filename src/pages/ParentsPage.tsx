import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Edit3, 
  Eye, 
  Baby, 
  Coins,
  Send
} from 'lucide-react';
import { Parent, NavigationTab } from '../types';
import { DEMO_PARENTS, DEMO_INVOICES, DEMO_COMMUNICATIONS } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface ParentsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const ParentsPage: React.FC<ParentsPageProps> = ({ onNavigate }) => {
  const [parents, setParents] = useState<Parent[]>(DEMO_PARENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [balanceFilter, setBalanceFilter] = useState('All');

  // Detail Modal
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'children' | 'payments' | 'communications' | 'consent'>('details');

  // Add / Edit Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);

  const [formData, setFormData] = useState({
    title: 'Mrs.',
    name: '',
    phone: '',
    email: '',
    address: '',
    occupation: '',
    relationship: 'Mother' as 'Mother' | 'Father' | 'Guardian',
    preferredContact: 'WhatsApp' as 'WhatsApp' | 'Phone Call' | 'Email' | 'In-App',
    consentGiven: true
  });

  const filteredParents = parents.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.linkedChildren.some(c => c.childName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchBalance = balanceFilter === 'All' 
      ? true 
      : balanceFilter === 'Overdue' 
        ? p.outstandingBalance > 0 
        : p.outstandingBalance === 0;

    return matchSearch && matchStatus && matchBalance;
  });

  const handleSaveParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingParent) {
      setParents(prev => prev.map(p => p.id === editingParent.id ? {
        ...p,
        title: formData.title,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        occupation: formData.occupation,
        relationship: formData.relationship,
        preferredContact: formData.preferredContact,
        consentGiven: formData.consentGiven
      } : p));
      if (selectedParent?.id === editingParent.id) {
        setSelectedParent(prev => prev ? { ...prev, name: formData.name, phone: formData.phone } : null);
      }
    } else {
      const newParent: Parent = {
        id: `par-0${parents.length + 1}`,
        title: formData.title,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || 'Abuja, Nigeria',
        occupation: formData.occupation || 'Private Sector',
        relationship: formData.relationship,
        linkedChildren: [],
        outstandingBalance: 0,
        status: 'Active',
        consentGiven: formData.consentGiven,
        preferredContact: formData.preferredContact,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setParents([newParent, ...parents]);
    }
    setIsAddModalOpen(false);
    setEditingParent(null);
  };

  const handleOpenEdit = (p: Parent) => {
    setEditingParent(p);
    setFormData({
      title: p.title,
      name: p.name,
      phone: p.phone,
      email: p.email,
      address: p.address,
      occupation: p.occupation,
      relationship: p.relationship,
      preferredContact: p.preferredContact,
      consentGiven: p.consentGiven
    });
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Parent & Guardian Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Family directory, contact preferences, balance statements & consent records
          </p>
        </div>

        <button
          onClick={() => {
            setEditingParent(null);
            setFormData({
              title: 'Mrs.',
              name: '',
              phone: '',
              email: '',
              address: '',
              occupation: '',
              relationship: 'Mother',
              preferredContact: 'WhatsApp',
              consentGiven: true
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Parent</span>
        </button>
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
              placeholder="Search parents by name, phone, email, linked child..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={balanceFilter}
              onChange={(e) => setBalanceFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Balances</option>
              <option value="Overdue">Has Outstanding Balance</option>
              <option value="Clear">Zero Balance (Clear)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          <span>Showing <strong>{filteredParents.length}</strong> parent profiles</span>
          <span>Abuja Families</span>
        </div>
      </div>

      {/* Parents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Parent ID</th>
                <th className="py-3.5 px-4">Parent / Guardian</th>
                <th className="py-3.5 px-4">Relationship</th>
                <th className="py-3.5 px-4">Linked Children</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Outstanding Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParents.map((parent) => (
                <tr
                  key={parent.id}
                  onClick={() => setSelectedParent(parent)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                    {parent.id.toUpperCase()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {parent.title} {parent.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{parent.occupation}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                      {parent.relationship}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {parent.linkedChildren.map((ch) => (
                        <div key={ch.childId} className="flex items-center gap-1 text-slate-800 font-semibold">
                          <Baby className="w-3 h-3 text-teal-600" />
                          <span>{ch.childName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({ch.className})</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-medium text-slate-800">{parent.phone}</p>
                      <p className="text-[10px] text-slate-400">{parent.email}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {parent.outstandingBalance > 0 ? (
                      <span className="font-bold text-rose-700 font-mono">
                        ₦{parent.outstandingBalance.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold font-mono">₦0 (Clear)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={parent.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedParent(parent)}
                        title="View Profile"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(parent)}
                        title="Edit Parent"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-700 hover:bg-slate-100 transition-colors"
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

      {/* Parent Profile Detail Modal */}
      {selectedParent && (
        <Modal
          isOpen={!!selectedParent}
          onClose={() => setSelectedParent(null)}
          title={`${selectedParent.title} ${selectedParent.name}`}
          subtitle={`Parent Profile • ${selectedParent.occupation} • ${selectedParent.address}`}
          maxWidth="3xl"
        >
          <div className="space-y-4">
            {/* Header Summary */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-display">{selectedParent.title} {selectedParent.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{selectedParent.phone} • {selectedParent.email}</p>
                <p className="text-[11px] text-teal-300 mt-0.5">{selectedParent.address}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Outstanding Balance</p>
                <p className={`text-lg font-bold font-mono ${selectedParent.outstandingBalance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ₦{selectedParent.outstandingBalance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200">
              {[
                { id: 'details', label: 'Contact Details' },
                { id: 'children', label: 'Linked Children' },
                { id: 'payments', label: 'Invoices & Ledger' },
                { id: 'communications', label: 'Communication Log' },
                { id: 'consent', label: 'Consent Records' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                    activeTab === t.id
                      ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Personal Information</span>
                  <p><strong>Full Name:</strong> {selectedParent.title} {selectedParent.name}</p>
                  <p><strong>Relationship:</strong> {selectedParent.relationship}</p>
                  <p><strong>Occupation:</strong> {selectedParent.occupation}</p>
                  <p><strong>Residential Address:</strong> {selectedParent.address}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Communication Settings</span>
                  <p><strong>Primary Channel:</strong> {selectedParent.preferredContact}</p>
                  <p><strong>WhatsApp Updates:</strong> Opted-in (Daily Reports & Notices)</p>
                  <p><strong>Emergency Alert SMS:</strong> Active</p>
                  <p><strong>Registered Since:</strong> {selectedParent.createdAt}</p>
                </div>
              </div>
            )}

            {activeTab === 'children' && (
              <div className="space-y-2 text-xs">
                {selectedParent.linkedChildren.map(ch => (
                  <div key={ch.childId} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                        {ch.childName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{ch.childName}</p>
                        <p className="text-slate-500 text-[11px]">{ch.className}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-teal-100 text-teal-800 font-semibold text-[11px]">
                      Enrolled Pupil
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-2 text-xs">
                {DEMO_INVOICES.filter(i => i.parentId === selectedParent.id).map(inv => (
                  <div key={inv.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{inv.invoiceNumber} ({inv.term})</p>
                      <p className="text-slate-500 text-[11px]">Due: {inv.dueDate} • Total: ₦{inv.totalAmount.toLocaleString()}</p>
                    </div>
                    <StatusBadge status={inv.status} size="sm" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'communications' && (
              <div className="space-y-2 text-xs">
                {DEMO_COMMUNICATIONS.filter(m => m.recipient.includes(selectedParent.name)).length > 0 ? (
                  DEMO_COMMUNICATIONS.filter(m => m.recipient.includes(selectedParent.name)).map(msg => (
                    <div key={msg.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{msg.subject}</span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-600">{msg.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No recent 1-on-1 messages logged for this parent. Broadcast notices delivered.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'consent' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <h4 className="font-bold text-slate-900">Signed Consent Agreements</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                    <span>Emergency Medical Treatment Consent</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Signed & Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                    <span>Internal Classroom Photo & Observation Consent</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Signed & Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                    <span>Outdoor Field Trips & Excursions Consent</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Signed & Active
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add / Edit Parent Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingParent(null);
        }}
        title={editingParent ? `Edit Parent: ${editingParent.name}` : 'Register New Parent / Guardian'}
        subtitle="Contact information and communication settings for Abuja nursery."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveParent} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Title</label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Mrs.">Mrs.</option>
                <option value="Mr.">Mr.</option>
                <option value="Dr.">Dr.</option>
                <option value="Engr.">Engr.</option>
                <option value="Barr.">Barr.</option>
                <option value="Hajia">Hajia</option>
                <option value="Alhaji">Alhaji</option>
                <option value="Capt.">Capt.</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Babatunde Adeleke"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 803 000 0000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="parent@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Relationship</label>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Occupation & Employer</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="e.g. Lead Engineer, Julius Berger"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Residential Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. Plot 412, Maitama District, Abuja"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingParent(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              {editingParent ? 'Update Parent' : 'Save Parent Profile'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
