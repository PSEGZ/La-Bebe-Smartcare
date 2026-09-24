import React, { useState } from 'react';
import { 
  Baby, 
  Users, 
  UserCheck, 
  UserX, 
  Coins, 
  CreditCard, 
  AlertCircle, 
  TrendingUp, 
  CalendarCheck, 
  Sparkles, 
  ShieldAlert, 
  Bot, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Calendar,
  Layers,
  ArrowUpRight,
  Send,
  MessageSquare,
  Activity,
  Heart,
  Bell
} from 'lucide-react';
import { NavigationTab } from '../types';
import { 
  DEMO_AI_RECOMMENDATIONS, 
  DEMO_INCIDENTS, 
  DEMO_ATTENDANCE, 
  DEMO_INVOICES, 
  DEMO_LEADS,
  DEMO_CLASSES 
} from '../data/demoData';

interface DashboardPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [intelligenceQuery, setIntelligenceQuery] = useState('');
  const [intelligenceResponse, setIntelligenceResponse] = useState<string | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'attendance' | 'revenue' | 'admissions'>('attendance');

  const handleAskAI = (prompt?: string) => {
    const q = prompt || intelligenceQuery;
    if (!q.trim()) return;

    if (q.toLowerCase().includes('children') || q.toLowerCase().includes('present')) {
      setIntelligenceResponse('Today at La Bebe Creche (Maitama), 128 of 142 enrolled pupils (90.1%) are checked in. Infant care is at 90% capacity.');
    } else if (q.toLowerCase().includes('revenue') || q.toLowerCase().includes('finance')) {
      setIntelligenceResponse('Term 1 Total Billed: ₦24.85M across 64 families. Today\'s collection: ₦482,500. Outstanding balance: ₦1.2M with 4 follow-up reminders queued.');
    } else if (q.toLowerCase().includes('staff')) {
      setIntelligenceResponse('18 of 20 educators and caregivers are clocked in. Educator-to-child ratio in Infants is 1:3, and Toddlers is 1:4 (Compliant with EYFS standards).');
    } else {
      setIntelligenceResponse(`Director AI: Operations are running optimally for ${q}. Attendance is 90.1%, gate security passes are active, and 4 admissions tours are scheduled this week.`);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Bento Grid Top Row: 4 Essential KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Children Enrolled */}
        <div 
          onClick={() => onNavigate('children')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Children Enrolled</p>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Baby className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <h2 className="text-3xl font-black text-slate-900 font-display tracking-tight">142</h2>
            <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              +12%
            </span>
          </div>
        </div>

        {/* Card 2: Attendance Today */}
        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Today</p>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <h2 className="text-3xl font-black text-slate-900 font-display tracking-tight">128</h2>
            <span className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded">
              92% present
            </span>
          </div>
        </div>

        {/* Card 3: Today's Revenue */}
        <div 
          onClick={() => onNavigate('finance')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Revenue</p>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <h2 className="text-2xl font-black text-slate-900 font-mono tracking-tight">₦482,500</h2>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Paystack</span>
              <span className="text-[9px] text-amber-600 font-bold uppercase">Manual / POS</span>
            </div>
          </div>
        </div>

        {/* Card 4: New Enquiries */}
        <div 
          onClick={() => onNavigate('admissions')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Enquiries</p>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <h2 className="text-3xl font-black text-slate-900 font-display tracking-tight">24</h2>
            <span className="text-[11px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">
              4 Pending
            </span>
          </div>
        </div>
      </div>

      {/* Bento Main Grid: 12-Column Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (4-5 cols): Bento Signature AI Priorities Card */}
        <div className="lg:col-span-4 bg-indigo-600 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center text-sm font-display tracking-wide uppercase">
                <Sparkles className="w-4 h-4 mr-2 text-indigo-200" />
                AI PRIORITIES
              </h3>
              <span className="text-[10px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                DEMO AGENT
              </span>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => onNavigate('finance')}
                className="bg-white/10 hover:bg-white/15 transition-colors p-3.5 rounded-xl border border-white/10 flex items-start gap-3 cursor-pointer"
              >
                <div className="w-1 h-10 bg-orange-400 rounded-full shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-[13px] font-bold leading-tight mb-1 text-white">Review Finance Outstanding</p>
                  <p className="text-[11px] text-indigo-100 leading-relaxed">
                    ₦1.2M overdue. Recommendation: Send automated WhatsApp reminders to Top 5 parents.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('classes')}
                className="bg-white/10 hover:bg-white/15 transition-colors p-3.5 rounded-xl border border-white/10 flex items-start gap-3 cursor-pointer"
              >
                <div className="w-1 h-10 bg-emerald-400 rounded-full shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-[13px] font-bold leading-tight mb-1 text-white">Staffing Coverage Check</p>
                  <p className="text-[11px] text-indigo-100 leading-relaxed">
                    Infants class at 90% capacity. Review assistant assignment for morning session.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('admissions')}
                className="bg-white/10 hover:bg-white/15 transition-colors p-3.5 rounded-xl border border-white/10 flex items-start gap-3 cursor-pointer"
              >
                <div className="w-1 h-10 bg-sky-400 rounded-full shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-[13px] font-bold leading-tight mb-1 text-white">Follow up on Enquiries</p>
                  <p className="text-[11px] text-indigo-100 leading-relaxed">
                    3 tours completed yesterday. No application started yet. Contact via Concierge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('intelligence')}
            className="w-full bg-white text-indigo-600 font-bold text-xs py-3 rounded-xl hover:bg-slate-50 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <span>Launch Smart Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column (7-8 cols): Admissions Pipeline CRM Bento Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase font-display">
                Admissions Pipeline
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Prospective parent conversion workflow</p>
            </div>
            <button 
              onClick={() => onNavigate('admissions')}
              className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>View CRM Full</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Bento Pipeline Lanes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lane 1: Tour Scheduled */}
            <div className="flex flex-col space-y-2.5 bg-slate-50/90 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Tour Scheduled (4)
                </h4>
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              </div>
              <div 
                onClick={() => onNavigate('admissions')}
                className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">Zainab Mohammed</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Toddlers • 2:00 PM Today</p>
              </div>
              <div 
                onClick={() => onNavigate('admissions')}
                className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">John Obi</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Preschool • Scheduled Tomorrow</p>
              </div>
            </div>

            {/* Lane 2: Application Started */}
            <div className="flex flex-col space-y-2.5 bg-slate-50/90 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Application Started (2)
                </h4>
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              </div>
              <div 
                onClick={() => onNavigate('admissions')}
                className="bg-white p-3 rounded-lg border border-slate-200 border-l-4 border-l-orange-400 shadow-2xs hover:border-orange-300 transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">Amina Ibrahim</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Infants • 60% complete</p>
              </div>
              <div 
                onClick={() => onNavigate('admissions')}
                className="bg-white p-3 rounded-lg border border-slate-200 border-l-4 border-l-orange-400 shadow-2xs hover:border-orange-300 transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">Tunde Ajayi</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Aftercare • 10% complete</p>
              </div>
            </div>

            {/* Lane 3: Payment Pending */}
            <div className="flex flex-col space-y-2.5 bg-slate-50/90 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Payment Pending (1)
                </h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div 
                onClick={() => onNavigate('admissions')}
                className="bg-white p-3 rounded-lg border border-slate-200 border-l-4 border-l-indigo-500 shadow-2xs hover:border-indigo-400 transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-slate-900">Sarah Kalu</p>
                <p className="text-[10px] text-indigo-600 font-bold italic mt-0.5">Waitlisted (Term 1)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Bottom Row: 3 Modular Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bento Box 1 (5 cols): Dark Intelligence Copilot */}
        <div className="lg:col-span-5 bg-[#1A1C1E] rounded-2xl p-6 flex flex-col justify-between border border-slate-700 shadow-2xl text-white space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 mb-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">La Bebe Intelligence</span>
            </div>
            <h4 className="text-white text-lg font-bold mb-3 tracking-tight leading-snug font-display">
              Smarter child monitoring with <span className="text-indigo-300">Director AI</span>.
            </h4>
            
            {intelligenceResponse ? (
              <div className="p-3 bg-white/10 rounded-xl border border-white/15 text-xs text-slate-200 leading-relaxed mb-3 animate-in fade-in">
                {intelligenceResponse}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleAskAI('How many children present?')}
                className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
              >
                How many children present?
              </button>
              <button 
                onClick={() => handleAskAI('Top revenue sources this month')}
                className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
              >
                Top revenue sources this month
              </button>
              <button 
                onClick={() => handleAskAI('Staffing check')}
                className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
              >
                Staffing check
              </button>
            </div>
          </div>

          <div className="relative mt-3">
            <input 
              value={intelligenceQuery}
              onChange={(e) => setIntelligenceQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAskAI(); }}
              className="w-full bg-white/10 border border-white/15 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-400" 
              placeholder="Ask about your operations..."
            />
            <button 
              onClick={() => handleAskAI()}
              className="absolute right-2 top-2 h-8 w-8 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento Box 2 (4 cols): Operations Health */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
              Operations Health
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="space-y-4 flex-1">
            {/* Row 1: Open Incidents */}
            <div 
              onClick={() => onNavigate('incidents')}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Open Incidents</p>
                  <p className="text-[10px] text-slate-400">2 Behavior, 1 Safety</p>
                </div>
              </div>
              <span className="text-xs font-black text-orange-600">03</span>
            </div>

            {/* Row 2: Staff Present */}
            <div 
              onClick={() => onNavigate('staff')}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Staff Present</p>
                  <p className="text-[10px] text-slate-400">18/20 Teachers Clocked In</p>
                </div>
              </div>
              <span className="text-xs font-black text-indigo-600">18</span>
            </div>

            {/* Row 3: Parent Comms */}
            <div 
              onClick={() => onNavigate('communications')}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Parent Comms</p>
                  <p className="text-[10px] text-slate-400">Unread Messages</p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-600">12</span>
            </div>
          </div>
        </div>

        {/* Bento Box 3 (3 cols): Enrollment Goal Gauge */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display mb-2">
            Enrollment Goal
          </h3>

          <div className="flex-1 flex flex-col justify-center items-center py-2">
            <div className="relative w-24 h-24 flex items-center justify-center mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="transparent" 
                  className="text-slate-100" 
                />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="251.2" 
                  strokeDashoffset="60.3" 
                  className="text-indigo-600 stroke-current transition-all duration-1000" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg font-black text-slate-900 font-display">76%</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Capacity</span>
              </div>
            </div>
            <p className="text-[11px] text-center text-slate-500 px-2 leading-tight">
              142 / 186 Total Capacity across Maitama suites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
