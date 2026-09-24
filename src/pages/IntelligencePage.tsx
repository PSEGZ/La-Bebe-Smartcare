import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Zap, 
  Brain, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  Calendar, 
  DollarSign, 
  Layers, 
  Play, 
  Pause,
  ArrowRight,
  RefreshCw,
  Baby
} from 'lucide-react';
import { AIAgent, NavigationTab } from '../types';
import { DEMO_AI_AGENTS, DEMO_CHILDREN, DEMO_INVOICES, DEMO_LEADS } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';

interface IntelligencePageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  text: string;
  timestamp: string;
  actionableLink?: { label: string; tab: NavigationTab };
}

export const IntelligencePage: React.FC<IntelligencePageProps> = ({ onNavigate }) => {
  const [agents, setAgents] = useState<AIAgent[]>(DEMO_AI_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(DEMO_AI_AGENTS[0]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentName: 'La Bebe Intelligence Core',
      text: 'Good morning, Director. I have scanned operations at La Bebe Creche & Aftercare, Maitama, Abuja. All 8 autonomous AI agents are active. How may I assist you with admissions, staffing, billing, or curriculum today?',
      timestamp: '08:00 AM'
    }
  ]);

  const toggleAgentActive = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? {
      ...a,
      status: a.status === 'Active' ? 'Idle' : 'Active'
    } : a));
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      let actionableLink: { label: string; tab: NavigationTab } | undefined;

      const lower = query.toLowerCase();
      if (lower.includes('overdue') || lower.includes('billing') || lower.includes('payment') || lower.includes('fee')) {
        reply = `**AI Billing Watchdog Analysis:**\nCurrently, 3 accounts have overdue balances totaling **₦555,000** for Term 1 2026.\n\n1. **Engr. Babatunde Adeleke** (David Adeleke, Toddlers) — Outstanding: ₦185,000.\n2. **Dr. Umar Farouk** (Zainab Ibrahim, Toddlers) — Outstanding: ₦220,000.\n3. **Barr. Ngozi Okonkwo** (Chinedu Okonkwo, Preschool) — Outstanding: ₦150,000.\n\nI have generated personalized WhatsApp payment reminder templates for each parent with school Zenith/GTBank accounts attached.`;
        actionableLink = { label: 'Open Finance Ledger', tab: 'finance' };
      } else if (lower.includes('stem') || lower.includes('activity') || lower.includes('lesson') || lower.includes('curriculum')) {
        reply = `**AI Curriculum Architect Suggestion:**\nHere is a 45-minute interactive indoor STEM activity for **Toddlers (Explorers)**:\n\n**Title:** "Tropical Fruit Color Sorting & Sinking/Floating Experiment"\n- **Materials:** Bowls of water, local mango slices, sweet orange peel, banana rounds.\n- **Sensory Objective:** Fine motor pincer grasp, buoyant density observation, and naming tropical colors.\n- **EYFS Standard:** Understanding the World (Natural World Explorations).`;
        actionableLink = { label: 'View Curriculum Board', tab: 'activities' };
      } else if (lower.includes('admissions') || lower.includes('lead') || lower.includes('aisha') || lower.includes('tour')) {
        reply = `**AI Admissions Copilot Report:**\nThere are **5 active prospective leads** in the admissions funnel this week.\n- **Dr. Aisha Mohammed** (Lead #01) is scheduled for a private tour today at 10:30 AM for 11-month-old Tahir in the Infant Care suite.\n- Visitor parking & reception security pass have been prepared.\n- Average inquiry-to-tour conversion rate is currently **77%**.`;
        actionableLink = { label: 'Open Admissions Pipeline', tab: 'admissions' };
      } else if (lower.includes('attendance') || lower.includes('infant') || lower.includes('present')) {
        reply = `**AI Staff & Attendance Analyst:**\nToday's live attendance is **58 / 64 pupils (90.6%)**.\n- Infants: 9/12 present (Ratio: 1:3 maintained by Nurse Blessing & 2 assistants).\n- Toddlers: 15/18 present (Ratio: 1:4 maintained by Grace Okafor & team).\n- All room safety guidelines are 100% compliant with Abuja Early Childhood standards.`;
        actionableLink = { label: 'View Live Attendance', tab: 'attendance' };
      } else {
        reply = `**La Bebe Intelligence Copilot:**\nI have processed your query regarding: "${query}".\n\nAll school registers (64 enrolled children, 8 staff, 4 suites) are synchronized and healthy. I can assist with generating daily reports, drafting parent WhatsApp broadcasts, forecasting Term 2 fee collections, or creating Montessori lesson plans.`;
      }

      const agentMsg: ChatMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        agentName: 'La Bebe Intelligence Copilot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionableLink
      };

      setChatMessages(prev => [...prev, agentMsg]);
      setIsThinking(false);
    }, 900);
  };

  const quickPrompts = [
    'Generate overdue payment summary for Term 1',
    'Suggest a rainy day STEM activity for Toddlers',
    'Analyze attendance trends for Infants this month',
    'Draft admissions follow-up message for Dr. Aisha'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">La Bebe AI Agents & Intelligence Copilot</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold text-[10px] border border-teal-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              8 Autonomous Agents
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time proactive automation for admissions, billing, safeguarding, lesson plans & parent engagement
          </p>
        </div>
      </div>

      {/* Grid: 8 AI Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              selectedAgent.id === agent.id
                ? 'bg-gradient-to-b from-teal-900 to-slate-900 text-white border-teal-800 shadow-md'
                : 'bg-white text-slate-900 border-slate-200 hover:border-teal-300 hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className={`p-2 rounded-xl ${
                  selectedAgent.id === agent.id ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    agent.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                  }`} />
                  <span className={`text-[10px] font-bold ${
                    selectedAgent.id === agent.id ? 'text-teal-200' : 'text-slate-500'
                  }`}>
                    {agent.status}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-xs mt-2.5 font-display">{agent.name}</h3>
              <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                selectedAgent.id === agent.id ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {agent.description}
              </p>
            </div>

            <div className={`pt-2.5 border-t flex items-center justify-between text-[10px] ${
              selectedAgent.id === agent.id ? 'border-white/10 text-teal-200' : 'border-slate-100 text-slate-400'
            }`}>
              <span>{agent.tasksCompleted} Actions Run</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAgentActive(agent.id);
                }}
                className={`font-bold hover:underline ${
                  selectedAgent.id === agent.id ? 'text-white' : 'text-teal-700'
                }`}
              >
                {agent.status === 'Active' ? 'Pause' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Intelligence Copilot Console & Chat Engine */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[580px]">
        {/* Console Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm font-display">La Bebe Intelligence Copilot</h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Online & Connected to School State
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Active context: {selectedAgent.name} • Maitama Campus
              </p>
            </div>
          </div>

          <button
            onClick={() => setChatMessages([chatMessages[0]])}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400">
                {msg.sender === 'agent' && <Bot className="w-3.5 h-3.5 text-teal-600" />}
                <span className="font-semibold">{msg.sender === 'user' ? 'You (School Leader)' : msg.agentName}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl max-w-2xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.actionableLink && onNavigate && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Action recommended:</span>
                    <button
                      onClick={() => onNavigate(msg.actionableLink!.tab)}
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{msg.actionableLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 max-w-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
              <span>La Bebe AI Copilot analyzing school data...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 overflow-x-auto flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 shrink-0">
            Suggested Prompts:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 text-[11px] font-medium bg-white text-slate-700 hover:text-teal-800 hover:border-teal-300 border border-slate-200 rounded-lg whitespace-nowrap transition-all shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Prompt Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask La Bebe AI Copilot anything about children, invoices, admissions, or curriculum..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isThinking}
              className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask Agent</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
