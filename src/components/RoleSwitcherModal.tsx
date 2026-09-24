import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, UserCheck, Briefcase, GraduationCap, DollarSign, Heart, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

interface RoleConfig {
  role: UserRole;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  samplePersona: string;
  accessibleTabs: string[];
}

const ROLES: RoleConfig[] = [
  {
    role: 'Super Administrator',
    title: 'Super Administrator',
    badge: 'Full Root Access',
    icon: ShieldCheck,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Complete unrestricted access across all 15 modules, AI Agents control, security logs, branch management and configuration.',
    samplePersona: 'Platform Engineer & Founder',
    accessibleTabs: ['All Modules (15/15) + Root Settings']
  },
  {
    role: 'Director',
    title: 'School Director',
    badge: 'Executive Oversight',
    icon: Briefcase,
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    description: 'Executive command dashboard, La Bebe Intelligence assistant, financial health, safeguarding oversight, admissions funnel, and teacher performance.',
    samplePersona: 'Mrs. Judith Ogbonna (Founder & Director)',
    accessibleTabs: ['Dashboard', 'Intelligence', 'Finance', 'Admissions', 'Incidents', 'Staff', 'Reports']
  },
  {
    role: 'Administrator',
    title: 'School Administrator',
    badge: 'Operations & Admissions',
    icon: UserCheck,
    color: 'bg-teal-100 text-teal-700 border-teal-200',
    description: 'Manages day-to-day nursery operations, admissions CRM leads, parent registrations, student records, and school announcements.',
    samplePersona: 'Mrs. Amina Yusuf (Admissions Lead)',
    accessibleTabs: ['Admissions', 'Children', 'Parents', 'Attendance', 'Classes', 'Communications']
  },
  {
    role: 'Teacher',
    title: 'Classroom Educator',
    badge: 'Care & Daily Reports',
    icon: GraduationCap,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    description: 'Focused classroom tools: AI-assisted daily report drafting, live attendance check-ins, curriculum activities, and incident reporting.',
    samplePersona: 'Mrs. Folake Adeleke (Lead Toddler Educator)',
    accessibleTabs: ['Daily Reports', 'Attendance', 'Children', 'Activities', 'Incidents']
  },
  {
    role: 'Finance Officer',
    title: 'Bursar & Finance Officer',
    badge: 'Billing & Collections',
    icon: DollarSign,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    description: 'Manages term invoices, payment reconciliations, overdue fee follow-ups, POS receipts, and financial statements in ₦ NGN.',
    samplePersona: 'Mr. Kelechi Okafor (Bursar)',
    accessibleTabs: ['Finance', 'Parents', 'Reports', 'Settings (Payments)']
  },
  {
    role: 'Parent',
    title: 'Parent / Guardian Portal',
    badge: 'Family Experience',
    icon: Heart,
    color: 'bg-rose-100 text-rose-700 border-rose-200',
    description: 'Parent view: Real-time check-in status, daily meals/nap reports, invoice settlement, direct teacher communications, and school notices.',
    samplePersona: 'Engr. Babatunde Adeleke (Parent of David Adeleke)',
    accessibleTabs: ['My Children', 'Daily Reports', 'Invoices', 'Messages']
  }
];

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Switch Demo User Role"
      subtitle="Experience La Bebe SmartCare through different administrative and parent perspectives."
      maxWidth="3xl"
      actions={
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Close
        </button>
      }
    >
      <div className="space-y-3">
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
          <span>
            <strong>Demo Role Selector:</strong> Permissions and navigation filters adapt immediately when you switch roles.
          </span>
          <span className="font-semibold px-2 py-0.5 bg-amber-100 rounded-md">Demo Mode</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ROLES.map((item) => {
            const Icon = item.icon;
            const isSelected = currentRole === item.role;

            return (
              <div
                key={item.role}
                onClick={() => {
                  onSelectRole(item.role);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/40 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500">{item.samplePersona}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Primary focus:</span>
                  <span className="font-medium text-slate-700">{item.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
