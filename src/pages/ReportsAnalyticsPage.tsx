import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Users, 
  CreditCard, 
  UserCheck, 
  ShieldAlert, 
  FileText,
  Printer,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { NavigationTab } from '../types';
import { MetricCard } from '../components/MetricCard';

interface ReportsAnalyticsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const ReportsAnalyticsPage: React.FC<ReportsAnalyticsPageProps> = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Term 1 (2026)');

  const handleExport = (type: string) => {
    alert(`Generating official ${type} executive report for ${selectedPeriod} (PDF/Excel)...`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Executive Reports & Operational Intelligence</h2>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px] border border-teal-200">
              Executive Suite
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready analytics on enrollment velocity, fee collections, health vitals and regulatory ratio compliance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          >
            <option value="Term 1 (2026)">Term 1 (2026 Academic Year)</option>
            <option value="Term 3 (2025)">Term 3 (2025 Academic Year)</option>
            <option value="Annual Summary 2025/2026">Annual Summary 2025/2026</option>
          </select>

          <button
            onClick={() => handleExport('Audit Compliance Summary')}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Term Attendance"
          value="93.4%"
          trend={{ value: '+2.8%', isPositive: true, label: 'vs last term' }}
          icon={UserCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <MetricCard
          title="Fee Collection Rate"
          value="97.8%"
          trend={{ value: '₦24.85M of ₦25.4M', isPositive: true }}
          icon={CreditCard}
          iconBgColor="bg-teal-50"
          iconColor="text-teal-700"
        />
        <MetricCard
          title="Inquiry Conversion Rate"
          value="68.2%"
          trend={{ value: '+14% lead velocity', isPositive: true }}
          icon={TrendingUp}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-700"
        />
        <MetricCard
          title="Safeguarding Incident Index"
          value="0.02"
          subtitle="Zero major safety breaches"
          icon={ShieldAlert}
          iconBgColor="bg-slate-100"
          iconColor="text-slate-700"
        />
      </div>

      {/* Detailed Analytical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Financial Health & Collections Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 font-display text-base">Fee Recovery & Revenue Stream (₦ NGN)</h3>
              <p className="text-xs text-slate-500">Term 1 2026 tuition vs auxiliary services</p>
            </div>
            <button 
              onClick={() => handleExport('Finance Ledger')}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> CSV
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Tuition & Early Childhood Care (88.4%)</span>
                <span className="font-mono font-bold text-slate-900">₦22,500,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '88.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Organic Catering & Meal Plan (7.6%)</span>
                <span className="font-mono font-bold text-slate-900">₦1,950,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '7.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Educational Materials & Activity Kits (4.0%)</span>
                <span className="font-mono font-bold text-slate-900">₦955,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '4.0%' }} />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-600">Total Term Gross Revenue:</span>
            <span className="font-mono font-bold text-base text-slate-900">₦25,405,000</span>
          </div>
        </div>

        {/* Right: Class Attendance & Teacher Ratios */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 font-display text-base">Classroom Capacities & Safety Ratios</h3>
              <p className="text-xs text-slate-500">Maitama Early Years Campus</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
              100% Compliant
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { name: 'Infants (Nestlings)', enrolled: 10, cap: 12, ratio: '1:3 (Mandated)', staffCount: '3 Staff on Duty' },
              { name: 'Toddlers (Explorers)', enrolled: 16, cap: 18, ratio: '1:4 (Mandated)', staffCount: '4 Staff on Duty' },
              { name: 'Preschool (Pioneers)', enrolled: 20, cap: 22, ratio: '1:5 (Mandated)', staffCount: '4 Staff on Duty' },
              { name: 'Aftercare (Enrichment)', enrolled: 18, cap: 25, ratio: '1:6 (Mandated)', staffCount: '3 Staff on Duty' }
            ].map((item) => (
              <div key={item.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{item.staffCount} • Safety Ratio: {item.ratio}</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-800">
                  <span>{item.enrolled} / {item.cap} Pupils</span>
                  <p className="text-[10px] text-teal-700">{Math.round((item.enrolled / item.cap) * 100)}% Cap</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
