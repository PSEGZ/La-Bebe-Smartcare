import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  HeartHandshake, 
  CalendarCheck, 
  Kanban, 
  Coins, 
  ClipboardCheck, 
  Layers, 
  UserCheck2, 
  Sparkles, 
  ShieldAlert, 
  MessageSquare, 
  Bot, 
  BrainCircuit, 
  BarChart3, 
  Settings,
  Baby,
  ChevronRight,
  MapPin,
  Sparkle
} from 'lucide-react';
import { NavigationTab, UserRole } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userRole: UserRole;
  onOpenRoleSwitcher?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  category?: 'Core' | 'Operations' | 'Intelligence & Safety' | 'System';
  isAiSpecial?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  // Core
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Core' },
  { id: 'children', label: 'Children', icon: Baby, badge: '64', category: 'Core' },
  { id: 'parents', label: 'Parents', icon: HeartHandshake, category: 'Core' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-300', category: 'Core' },
  { id: 'admissions', label: 'Admissions', icon: Kanban, badge: '4 New', badgeColor: 'bg-indigo-500/20 text-indigo-300', category: 'Core' },
  
  // Operations
  { id: 'finance', label: 'Finance', icon: Coins, badge: '₦ Overdue', badgeColor: 'bg-rose-500/20 text-rose-300', category: 'Operations' },
  { id: 'daily_reports', label: 'Daily Reports', icon: ClipboardCheck, category: 'Operations' },
  { id: 'classes', label: 'Classes', icon: Layers, category: 'Operations' },
  { id: 'staff', label: 'Staff', icon: UserCheck2, category: 'Operations' },
  { id: 'activities', label: 'Activities', icon: Sparkles, category: 'Operations' },
  
  // Intelligence & Safety
  { id: 'incidents', label: 'Incidents', icon: ShieldAlert, category: 'Intelligence & Safety' },
  { id: 'communications', label: 'Communications', icon: MessageSquare, category: 'Intelligence & Safety' },
  { id: 'ai_agents', label: 'AI Agents', icon: Bot, badge: '15 Active', badgeColor: 'bg-indigo-500/30 text-indigo-200', category: 'Intelligence & Safety', isAiSpecial: true },
  { id: 'intelligence', label: 'Director Intelligence', icon: BrainCircuit, badge: 'AI Copilot', badgeColor: 'bg-purple-500/20 text-purple-300', category: 'Intelligence & Safety', isAiSpecial: true },
  
  // System
  { id: 'reports', label: 'Reports', icon: BarChart3, category: 'System' },
  { id: 'settings', label: 'Settings', icon: Settings, category: 'System' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onOpenRoleSwitcher,
  isOpen,
  onClose,
  isMobileOpen,
  onCloseMobile
}) => {
  const mobileVisible = isMobileOpen ?? isOpen ?? false;
  const handleCloseMobile = onCloseMobile || onClose || (() => {});

  const getFilteredItems = () => {
    if (userRole === 'Parent') {
      return NAV_ITEMS.filter(i => ['dashboard', 'children', 'daily_reports', 'finance', 'communications', 'settings'].includes(i.id));
    }
    if (userRole === 'Teacher') {
      return NAV_ITEMS.filter(i => ['dashboard', 'daily_reports', 'attendance', 'children', 'activities', 'incidents', 'classes', 'communications'].includes(i.id));
    }
    if (userRole === 'Finance Officer') {
      return NAV_ITEMS.filter(i => ['dashboard', 'finance', 'parents', 'reports', 'settings'].includes(i.id));
    }
    return NAV_ITEMS;
  };

  const filteredItems = getFilteredItems();

  const getRoleInitials = (role: UserRole) => {
    switch (role) {
      case 'Director': return 'SD';
      case 'Super Administrator': return 'SA';
      case 'Teacher': return 'FA';
      case 'Parent': return 'BA';
      default: return 'LB';
    }
  };

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'Director': return 'Sarah Danjuma';
      case 'Super Administrator': return 'Dr. Judith Ogbonna';
      case 'Teacher': return 'Folake Adeleke';
      case 'Parent': return 'Babatunde Adeleke';
      default: return 'Staff Member';
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileVisible && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={handleCloseMobile}
        />
      )}

      {/* Bento Dark Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-56 sm:w-60 bg-[#0F172A] text-slate-400 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-black text-lg tracking-tight font-display">
                LA BEBE <span className="text-indigo-400 font-extrabold">SMARTCARE</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5 font-bold">
                Abuja, Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-3 custom-scrollbar">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  handleCloseMobile();
                }}
                className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-xl transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20 shadow-xs'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors shrink-0 ${
                      isActive ? 'text-indigo-400' : item.isAiSpecial ? 'text-indigo-300/80 group-hover:text-indigo-300' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span className={item.isAiSpecial && !isActive ? 'text-indigo-300/90' : ''}>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isActive ? 'bg-indigo-500/30 text-indigo-200' : item.badgeColor || 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Pill & Bento Demo Environment Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div 
            onClick={onOpenRoleSwitcher}
            className="flex items-center space-x-3 mb-2 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Click to Switch Role"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0">
              {getRoleInitials(userRole)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{getRoleName(userRole)}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{userRole}</p>
            </div>
          </div>

          <div className="bg-orange-500/10 text-orange-400 text-[9px] font-bold py-1 px-2 rounded border border-orange-500/20 text-center uppercase tracking-wider">
            DEMO ENVIRONMENT
          </div>
        </div>
      </aside>
    </>
  );
};
