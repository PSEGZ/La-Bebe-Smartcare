import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Radio, 
  AlertTriangle,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { CommunicationMessage, NavigationTab } from '../types';
import { DEMO_COMMUNICATIONS, DEMO_CLASSES, DEMO_PARENTS } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface CommunicationsPageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const CommunicationsPage: React.FC<CommunicationsPageProps> = () => {
  const [messages, setMessages] = useState<CommunicationMessage[]>(DEMO_COMMUNICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All');

  // New Broadcast Modal
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<CommunicationMessage | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    recipientType: 'All Parents (School-wide Broadcast)',
    channel: 'WhatsApp (Pending)' as any,
    content: ''
  });

  const filteredMessages = messages.filter((m) => {
    const matchSearch =
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchChannel = channelFilter === 'All' || m.channel === channelFilter;
    return matchSearch && matchChannel;
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: CommunicationMessage = {
      id: `comm-0${messages.length + 1}`,
      type: 'Broadcast',
      sender: 'Director Aisha Mohammed',
      senderRole: 'Director',
      recipient: formData.recipientType,
      channel: formData.channel,
      subject: formData.subject,
      content: formData.content,
      timestamp: 'Just now',
      read: true,
      status: 'Delivered'
    };

    setMessages([newMsg, ...messages]);
    setIsBroadcastModalOpen(false);
    setFormData({
      subject: '',
      recipientType: 'All Parents (School-wide Broadcast)',
      channel: 'WhatsApp (Pending)',
      content: ''
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Parent Communications & Broadcasts</h2>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
              WhatsApp & SMS Gateway Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            School-wide announcements, emergency alerts, classroom digests and 1-on-1 family updates
          </p>
        </div>

        <button
          onClick={() => setIsBroadcastModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>New Broadcast Announcement</span>
        </button>
      </div>

      {/* Quick Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">WhatsApp Broadcast</span>
            <p className="text-lg font-bold text-slate-900 font-display mt-0.5">64 Families Reached</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">99.4% Delivery Success Rate</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500 text-white">
            <MessageCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">Direct In-App Messages</span>
            <p className="text-lg font-bold text-slate-900 font-display mt-0.5">3 Active Threads</p>
            <p className="text-[11px] text-indigo-700 mt-0.5">Average response: 6 mins</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Emergency SMS Alerts</span>
            <p className="text-lg font-bold text-slate-900 font-display mt-0.5">Instant Abuja Gate Broadcast</p>
            <p className="text-[11px] text-amber-700 mt-0.5">High priority fail-safe channel</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500 text-white">
            <Radio className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search message history by subject, recipient, or content..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden font-medium"
          >
            <option value="All">All Delivery Channels</option>
            <option value="WhatsApp (Pending)">WhatsApp Broadcast</option>
            <option value="In-App">In-App Notification</option>
            <option value="Email">Email Newsletter</option>
            <option value="SMS">SMS Alert</option>
          </select>
        </div>
      </div>

      {/* Message History List */}
      <div className="space-y-3">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelectedMessage(msg)}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{msg.subject}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {msg.channel}
                </span>
                <StatusBadge status={msg.status} size="sm" />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {msg.content}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                <span>To: <strong>{msg.recipient}</strong></span>
                <span>•</span>
                <span>By: {msg.sender} ({msg.senderRole})</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMessage(msg)}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 shrink-0"
            >
              <span>View Log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Message Log Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title={selectedMessage.subject}
          subtitle={`Channel: ${selectedMessage.channel} • Sent ${selectedMessage.timestamp}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display">{selectedMessage.subject}</h3>
                <p className="text-xs text-teal-300">Audience: {selectedMessage.recipient}</p>
              </div>
              <StatusBadge status={selectedMessage.status} />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Message Body</span>
              <p className="text-slate-800 leading-relaxed mt-2 whitespace-pre-line text-sm">
                {selectedMessage.content}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] flex items-center justify-between">
              <span>Dispatched via official school channel: <strong>{selectedMessage.channel}</strong></span>
              <span className="font-semibold text-emerald-800">Delivered</span>
            </div>
          </div>
        </Modal>
      )}

      {/* New Broadcast Modal */}
      <Modal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        title="Compose Broadcast Announcement"
        subtitle="Deliver announcements across WhatsApp, SMS, and Parent mobile app."
        maxWidth="2xl"
      >
        <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Announcement Subject *</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Term 1 Mid-Term Open Day & Art Exhibition"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Audience</label>
              <select
                value={formData.recipientType}
                onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="All Parents (School-wide Broadcast)">All Parents (School-wide Broadcast)</option>
                <option value="Infants Room Parents Only">Infants Room Parents Only</option>
                <option value="Toddlers Room Parents Only">Toddlers Room Parents Only</option>
                <option value="Preschool Room Parents Only">Preschool Room Parents Only</option>
                <option value="Aftercare Parents Only">Aftercare Parents Only</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Delivery Channel</label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="WhatsApp (Pending)">WhatsApp Broadcast</option>
                <option value="In-App">In-App Notification</option>
                <option value="SMS">SMS Alert</option>
                <option value="Email">Email Newsletter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Message Content *</label>
            <textarea
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Type your official announcement here..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsBroadcastModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast to Parents</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
