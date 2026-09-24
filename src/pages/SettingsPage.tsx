import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Save, 
  CheckCircle2, 
  Key, 
  Users, 
  Bot,
  CreditCard
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SettingsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    orgName: 'La Bebe Creche & Aftercare',
    tagline: 'Smarter Childcare. Better Communication. Stronger Operations.',
    location: 'Plot 418, Gana Street, Maitama, Abuja, FCT, Nigeria',
    phone: '+234 809 555 1200',
    email: 'admissions@labebeabuja.ng',
    operatingHours: '07:00 AM – 06:00 PM (Monday – Friday)',
    currency: 'NGN (₦ Nigerian Naira)',
    currentTerm: 'Term 1 (2025/2026 Academic Session)',
    whatsappNotifications: true,
    emergencySms: true,
    aiAutoDraftDailyReports: true,
    aiBillingWatchdog: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Organisation Settings & School Profile</h2>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px] border border-teal-200">
              System Configuration
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure La Bebe SmartCare institutional parameters, notification gateways & academic terms
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* School Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-sm font-display">Institutional Identity & Contact</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Organisation Legal Name</label>
              <input
                type="text"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Platform Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Physical Campus Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Operating Hours</label>
              <input
                type="text"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Official Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Official Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        {/* Currency & Term Logistics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <CreditCard className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-sm font-display">Academic Term & Currency</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Operating Currency</label>
              <input
                type="text"
                disabled
                value={formData.currency}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-400 mt-1">Locked to Nigerian Naira for Abuja campus.</p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Active Academic Term</label>
              <input
                type="text"
                value={formData.currentTerm}
                onChange={(e) => setFormData({ ...formData, currentTerm: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        {/* Autonomous AI Agent Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bot className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-sm font-display">Autonomous AI Copilot Rules</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aiAutoDraftDailyReports}
                onChange={(e) => setFormData({ ...formData, aiAutoDraftDailyReports: e.target.checked })}
                className="w-4 h-4 text-teal-700 rounded"
              />
              <div>
                <span className="font-bold text-slate-900">AI Daily Report Assist</span>
                <p className="text-[11px] text-slate-500">Automatically format teacher notes into warm, polished updates for parents.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aiBillingWatchdog}
                onChange={(e) => setFormData({ ...formData, aiBillingWatchdog: e.target.checked })}
                className="w-4 h-4 text-teal-700 rounded"
              />
              <div>
                <span className="font-bold text-slate-900">AI Fee & Billing Watchdog</span>
                <p className="text-[11px] text-slate-500">Automatically flag overdue accounts and draft polite WhatsApp reminders.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Organisation Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
