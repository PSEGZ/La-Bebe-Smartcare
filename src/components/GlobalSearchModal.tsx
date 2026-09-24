import React, { useState } from 'react';
import { Search, User, Users, FileText, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { DEMO_CHILDREN, DEMO_PARENTS, DEMO_LEADS, DEMO_INVOICES, DEMO_STAFF, DEMO_INCIDENTS } from '../data/demoData';
import { NavigationTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingChildren = DEMO_CHILDREN.filter(
    (c) =>
      c.firstName.toLowerCase().includes(trimmed) ||
      c.lastName.toLowerCase().includes(trimmed) ||
      c.regNumber.toLowerCase().includes(trimmed) ||
      c.className.toLowerCase().includes(trimmed)
  );

  const matchingParents = DEMO_PARENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(trimmed) ||
      p.phone.includes(trimmed) ||
      p.email.toLowerCase().includes(trimmed)
  );

  const matchingLeads = DEMO_LEADS.filter(
    (l) =>
      l.parentName.toLowerCase().includes(trimmed) ||
      l.childName.toLowerCase().includes(trimmed) ||
      l.stage.toLowerCase().includes(trimmed)
  );

  const matchingInvoices = DEMO_INVOICES.filter(
    (i) =>
      i.invoiceNumber.toLowerCase().includes(trimmed) ||
      i.parentName.toLowerCase().includes(trimmed) ||
      i.status.toLowerCase().includes(trimmed)
  );

  const matchingStaff = DEMO_STAFF.filter(
    (s) =>
      s.name.toLowerCase().includes(trimmed) ||
      s.role.toLowerCase().includes(trimmed) ||
      s.department.toLowerCase().includes(trimmed)
  );

  const handleSelect = (tab: NavigationTab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-16 text-center sm:p-0">
        <div 
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Box */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search children, parents, staff, admissions leads, invoices (e.g. 'David', 'Adeleke', 'INV')..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {!trimmed ? (
              <div className="text-center py-8">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Quick Universal Search</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Type any child's name, parent phone number, invoice number, or staff member.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {['David Adeleke', 'Fatima Ibrahim', 'Toddlers', 'INV-2026-001', 'Mrs. Grace Okoro'].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setQuery(quick)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    >
                      {quick}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Children Matches */}
                {matchingChildren.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <User className="w-3.5 h-3.5" />
                      <span>Children ({matchingChildren.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchingChildren.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => handleSelect('children')}
                          className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${c.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                              {c.firstName[0]}{c.lastName[0]}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900 group-hover:text-teal-600">
                                {c.firstName} {c.lastName}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {c.regNumber} • {c.className} • {c.age}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium text-teal-600 opacity-0 group-hover:opacity-100 flex items-center gap-1">
                            View Profile <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Parents Matches */}
                {matchingParents.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>Parents ({matchingParents.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchingParents.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelect('parents')}
                          className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-teal-600">
                              {p.title} {p.name}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {p.phone} • {p.email} • {p.linkedChildren.map(c => c.childName).join(', ')}
                            </p>
                          </div>
                          <span className="text-[11px] font-medium text-teal-600 opacity-0 group-hover:opacity-100 flex items-center gap-1">
                            View Parent <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admissions Leads */}
                {matchingLeads.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Admissions Leads ({matchingLeads.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchingLeads.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => handleSelect('admissions')}
                          className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-teal-600">
                              {l.childName} (Parent: {l.parentName})
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Stage: <span className="font-semibold text-slate-700">{l.stage}</span> • Desired: {l.desiredProgramme}
                            </p>
                          </div>
                          <span className="text-[11px] font-medium text-teal-600 opacity-0 group-hover:opacity-100 flex items-center gap-1">
                            CRM Card <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Invoices */}
                {matchingInvoices.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoices ({matchingInvoices.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchingInvoices.map((i) => (
                        <div
                          key={i.id}
                          onClick={() => handleSelect('finance')}
                          className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-teal-600">
                              {i.invoiceNumber} — ₦{i.totalAmount.toLocaleString()} ({i.status})
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {i.parentName} • Child: {i.childName} • Due: {i.dueDate}
                            </p>
                          </div>
                          <span className="text-[11px] font-medium text-teal-600 opacity-0 group-hover:opacity-100 flex items-center gap-1">
                            Invoice <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Matches */}
                {matchingChildren.length === 0 &&
                  matchingParents.length === 0 &&
                  matchingLeads.length === 0 &&
                  matchingInvoices.length === 0 &&
                  matchingStaff.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No results found for "<span className="font-semibold text-slate-700">{query}</span>"
                    </div>
                  )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Navigation: Click any item to jump directly to its module</span>
            <span>La Bebe SmartCare • Abuja</span>
          </div>
        </div>
      </div>
    </div>
  );
};
