import React, { useState } from 'react';
import { 
  Baby, 
  Clock, 
  Utensils, 
  Moon, 
  Smile, 
  Camera, 
  CreditCard, 
  ShieldCheck, 
  Send, 
  Phone, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  User,
  Heart
} from 'lucide-react';
import { NavigationTab } from '../types';
import { DEMO_CHILDREN, DEMO_DAILY_REPORTS, DEMO_INVOICES, DEMO_CLASSES } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';

interface ParentPortalViewProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = () => {
  const [selectedChildId, setSelectedChildId] = useState('ch-01'); // David Adeleke
  const [messageInput, setMessageInput] = useState('');
  const [parentMessages, setParentMessages] = useState([
    { sender: 'Teacher Folake', text: 'Good morning Engr. Adeleke! David settled in wonderfully this morning and loved the sensory playdough table.', time: '08:45 AM' },
    { sender: 'You', text: 'Thank you Teacher Folake! Please make sure he drinks plenty of water after his outdoor session.', time: '09:12 AM' },
    { sender: 'Teacher Folake', text: 'Noted! His water bottle is marked and we will ensure regular hydration intervals.', time: '09:15 AM' }
  ]);

  const child = DEMO_CHILDREN.find(c => c.id === selectedChildId) || DEMO_CHILDREN[0];
  const report = DEMO_DAILY_REPORTS.find(r => r.childId === selectedChildId) || DEMO_DAILY_REPORTS[0];
  const invoice = DEMO_INVOICES.find(i => i.childId === selectedChildId);
  const classRoom = DEMO_CLASSES.find(c => c.id === child.classId) || DEMO_CLASSES[1];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setParentMessages([
      ...parentMessages,
      { sender: 'You', text: messageInput, time: 'Just now' }
    ]);
    setMessageInput('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[11px] border border-teal-500/30">
                Parent Companion Portal
              </span>
              <span className="text-slate-300 text-xs">Maitama Campus</span>
            </div>
            <h2 className="text-2xl font-bold font-display mt-1">Welcome, Engr. Babatunde Adeleke</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Live updates, daily care logs, developmental milestones & tuition for your registered children
            </p>
          </div>

          {/* Child Switcher */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-xs border border-white/10">
            <button
              onClick={() => setSelectedChildId('ch-01')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedChildId === 'ch-01' ? 'bg-teal-500 text-slate-950 shadow-xs' : 'text-white hover:bg-white/10'
              }`}
            >
              David (Toddlers)
            </button>
            <button
              onClick={() => setSelectedChildId('ch-02')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedChildId === 'ch-02' ? 'bg-teal-500 text-slate-950 shadow-xs' : 'text-white hover:bg-white/10'
              }`}
            >
              Stephanie (Infants)
            </button>
          </div>
        </div>
      </div>

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Child Status & Daily Care Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-bold text-xl border-2 border-teal-600 shadow-xs">
                {child.firstName[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {child.firstName} {child.lastName}
                  </h3>
                  <StatusBadge status={child.attendanceStatus} size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {child.className} • Lead Educator: <strong>{classRoom.leadTeacher}</strong>
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> Checked In: 08:14 AM
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">Mood: Cheerful & Energetic</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Calling school front-desk for ${child.firstName}...`)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>Contact Creche</span>
            </button>
          </div>

          {/* Today's Daily Care Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 font-display text-base">Today's Live Care Stream</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{report.date}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-800 font-bold">
                  <Utensils className="w-4 h-4" />
                  <span>Meals & Nutrition</span>
                </div>
                <p className="text-slate-800"><strong>Lunch:</strong> {report.meals.lunch}</p>
                <p className="text-slate-600 text-[11px]"><strong>Snack:</strong> {report.meals.snack}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-800 font-bold">
                  <Moon className="w-4 h-4" />
                  <span>Nap Time</span>
                </div>
                <p className="text-slate-800 font-semibold">{report.nap.startTime} – {report.nap.endTime}</p>
                <p className="text-slate-600 text-[11px]">Quality: {report.nap.quality}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <Smile className="w-4 h-4" />
                  <span>Mood & Energy</span>
                </div>
                <p className="text-slate-800 font-semibold">{report.mood}</p>
                <p className="text-slate-600 text-[11px]">Participated enthusiastically</p>
              </div>
            </div>

            {/* Teacher's Observation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Teacher's Note</span>
              <p className="text-slate-800 mt-1 italic leading-relaxed">
                "{report.generalObservation}"
              </p>
              <p className="text-[10px] text-teal-700 font-bold mt-2">— Teacher {report.teacherName}</p>
            </div>
          </div>

          {/* Authorized Pickup Guardians */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 font-display text-sm">Authorized Pickup Guardians</h3>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Gate Verification Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {child.authorizedPickups.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{p.name}</p>
                    <p className="text-[11px] text-slate-500">{p.relationship} • {p.phone}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Security Pass</span>
                    <span className="font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Direct Messaging & Tuition Balance */}
        <div className="space-y-6">
          {/* Tuition Balance Widget */}
          {invoice && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Term 1 Tuition Status</span>
                <StatusBadge status={invoice.status} size="sm" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Outstanding Balance Due</p>
                <p className="text-2xl font-extrabold text-slate-900 font-display mt-0.5">
                  ₦{(invoice.totalAmount - invoice.paidAmount).toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Due: {invoice.dueDate}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] space-y-1 text-slate-600 border border-slate-200/80">
                <p><strong>Bank:</strong> Zenith Bank PLC</p>
                <p><strong>Account:</strong> 1012398471 (La Bebe Creche)</p>
                <p className="text-teal-700 font-semibold">Ref: {invoice.invoiceNumber}</p>
              </div>

              <button
                onClick={() => alert('Bank transfer receipt uploaded for verification!')}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Upload Bank Transfer Receipt
              </button>
            </div>
          )}

          {/* Direct Chat with Lead Teacher */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[400px] overflow-hidden">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Direct Teacher Message</h4>
                <p className="text-[10px] text-teal-700 font-semibold">{classRoom.leadTeacher} (Lead Educator)</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs bg-slate-50/40">
              {parentMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] text-slate-400 mb-0.5">{msg.sender} • {msg.time}</span>
                  <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'You' ? 'bg-teal-700 text-white' : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message to Teacher Folake..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
              />
              <button
                type="submit"
                className="p-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
