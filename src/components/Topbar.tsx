import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Shield, 
  ChevronDown, 
  Building2, 
  User, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { NavigationTab, UserRole } from '../types';

interface TopbarProps {
  currentTab: NavigationTab;
  userRole: UserRole;
  onOpenRoleSwitcher?: () => void;
  onOpenSearch?: () => void;
  onToggleSidebar?: () => void;
  onOpenRoleModal?: () => void;
  onOpenSearchModal?: () => void;
  onToggleMobileSidebar?: () => void;
  onNavigate?: (tab: NavigationTab) => void;
}

const TAB_TITLES: Record<NavigationTab, { title: string; subtitle: string }> = {
  dashboard: { title: 'Executive Operations Dashboard', subtitle: 'Live overview of children, finances, staffing & AI recommendations' },
  children: { title: 'Child Roster & Care Profiles', subtitle: 'Comprehensive medical, emergency, and developmental records' },
  parents: { title: 'Parent & Guardian Management', subtitle: 'Family contacts, balance ledger, and consent directory' },
  attendance: { title: 'Live Attendance & Check-In Log', subtitle: 'Real-time headcounts, arrival temperature, and departure verification' },
  admissions: { title: 'Admissions Pipeline & CRM', subtitle: 'Prospective parent inquiries, campus tours, and enrollment funnel' },
  finance: { title: 'Finance & Tuition Billing', subtitle: 'Term tuition invoices, fee collection status, and payment ledger (₦ NGN)' },
  daily_reports: { title: 'Daily Care Reports & AI Drafting', subtitle: 'Teacher daily logs: meals, naps, potty, learning observations & AI drafting' },
  classes: { title: 'Classrooms & Care Rooms', subtitle: 'Infant, Toddler, Preschool and Aftercare room capacities & ratios' },
  staff: { title: 'Staff Directory & Educators', subtitle: 'Certifications, attendance, qualifications, and HR rosters' },
  activities: { title: 'Early Curriculum & Activities', subtitle: 'Montessori and EYFS early learning plans and milestones' },
  incidents: { title: 'Incident & Safeguarding Logs', subtitle: 'Accident reporting, first-aid logs, and mandatory safeguarding protocols' },
  communications: { title: 'Parent Communications Centre', subtitle: 'Direct teacher messages, school broadcasts, and announcements' },
  ai_agents: { title: 'AI Autonomous Agents Control', subtitle: '15 specialised childcare AI agents monitoring daily operations' },
  intelligence: { title: 'La Bebe Intelligence Copilot', subtitle: 'Ask conversational queries regarding childcare operations & finance' },
  reports: { title: 'Analytical Reports & Export Centre', subtitle: 'Auditable enrollment, attendance, financial and staffing reports' },
  settings: { title: 'System & Branch Settings', subtitle: 'Branch configuration, security policies, and third-party integrations' }
};

export const Topbar: React.FC<TopbarProps> = ({
  currentTab,
  userRole,
  onOpenRoleSwitcher,
  onOpenSearch,
  onToggleSidebar,
  onOpenRoleModal,
  onOpenSearchModal,
  onToggleMobileSidebar,
  onNavigate
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRoleClick = onOpenRoleModal || onOpenRoleSwitcher || (() => {});
  const handleSearchClick = onOpenSearchModal || onOpenSearch || (() => {});
  const handleMobileToggle = onToggleMobileSidebar || onToggleSidebar || (() => {});
  const handleNav = onNavigate || (() => {});

  const notificationItems = [
    {
      id: 1,
      title: 'Review Finance Outstanding',
      desc: '₦1.2M overdue. Recommendation: Send automated WhatsApp reminders to Top 5 parents.',
      time: '10 mins ago',
      tab: 'finance' as NavigationTab
    },
    {
      id: 2,
      title: 'Staffing Coverage Check',
      desc: 'Infants class at 90% capacity. Review assistant assignment for morning session.',
      time: '25 mins ago',
      tab: 'classes' as NavigationTab
    },
    {
      id: 3,
      title: 'Follow up on Enquiries',
      desc: '3 tours completed yesterday. No application started yet. Contact via Concierge.',
      time: '1 hr ago',
      tab: 'admissions' as NavigationTab
    }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
      {/* Search Input Bar */}
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={handleMobileToggle}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-sm sm:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            onClick={handleSearchClick}
            readOnly
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
            placeholder="Search records, parents, children... (⌘K)"
          />
        </div>
      </div>

      {/* Role Selector & Notifications */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Role Selector Dropdown Trigger */}
        <div 
          onClick={handleRoleClick}
          className="flex flex-col items-end cursor-pointer group"
          title="Click to Switch User Role"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Role Selector</span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 group-hover:text-indigo-800">
            <span>{userRole}</span>
            <ChevronDown className="w-3 h-3 text-indigo-500" />
          </div>
        </div>

        <div className="w-px h-8 bg-slate-200"></div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative cursor-pointer p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] flex items-center justify-center rounded-full font-bold border-2 border-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div 
              className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 font-display">AI System Alerts</span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">3 Actionable</span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notificationItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      handleNav(item.tab);
                      setShowNotifications(false);
                    }}
                    className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
