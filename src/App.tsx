import React, { useState, useEffect } from 'react';
import { NavigationTab, UserRole } from './types';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { ChildrenPage } from './pages/ChildrenPage';
import { ParentsPage } from './pages/ParentsPage';
import { AttendancePage } from './pages/AttendancePage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ClassesPage } from './pages/ClassesPage';
import { StaffPage } from './pages/StaffPage';
import { DailyReportsPage } from './pages/DailyReportsPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { FinancePage } from './pages/FinancePage';
import { CommunicationsPage } from './pages/CommunicationsPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ParentPortalView } from './pages/ParentPortalView';
import { TeacherDashboardView } from './pages/TeacherDashboardView';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Super Admin / Director');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Global Keyboard Shortcut: Cmd/Ctrl + K for Global Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    // Reset to dashboard for clean context
    setCurrentTab('dashboard');
  };

  const handleNavigate = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setIsSidebarOpen(false);
  };

  // Render content based on currentTab & userRole
  const renderContent = () => {
    // If in Parent Role and on dashboard, show dedicated Parent Portal
    if (userRole === 'Parent / Guardian' && currentTab === 'dashboard') {
      return <ParentPortalView onNavigate={handleNavigate} />;
    }

    // If in Teacher Role and on dashboard, show dedicated Teacher Command Station
    if (userRole === 'Teacher / Educator' && currentTab === 'dashboard') {
      return <TeacherDashboardView onNavigate={handleNavigate} />;
    }

    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'children':
        return <ChildrenPage onNavigate={handleNavigate} />;
      case 'parents':
        return <ParentsPage onNavigate={handleNavigate} />;
      case 'attendance':
        return <AttendancePage onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsPage onNavigate={handleNavigate} />;
      case 'classes':
        return <ClassesPage onNavigate={handleNavigate} />;
      case 'staff':
        return <StaffPage onNavigate={handleNavigate} />;
      case 'dailyReports':
        return <DailyReportsPage onNavigate={handleNavigate} />;
      case 'activities':
        return <ActivitiesPage onNavigate={handleNavigate} />;
      case 'finance':
        return <FinancePage onNavigate={handleNavigate} />;
      case 'communications':
        return <CommunicationsPage onNavigate={handleNavigate} />;
      case 'incidents':
        return <IncidentsPage onNavigate={handleNavigate} />;
      case 'intelligence':
        return <IntelligencePage onNavigate={handleNavigate} />;
      case 'reports':
        return <ReportsAnalyticsPage onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5] text-slate-800 flex font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        userRole={userRole}
        onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-60">
        {/* Top Header Bar */}
        <Topbar
          currentTab={currentTab}
          userRole={userRole}
          onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={userRole}
        onSelectRole={handleRoleChange}
      />

      {/* Global Search & Command Palette Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;
