import React, { useState } from 'react';
import { 
  CreditCard, 
  Coins, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  Printer, 
  FileText, 
  DollarSign, 
  ShieldAlert,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { Invoice, InvoiceItem, InvoiceStatus, NavigationTab } from '../types';
import { DEMO_INVOICES, DEMO_CHILDREN, DEMO_PARENTS } from '../data/demoData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

interface FinancePageProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const FinancePage: React.FC<FinancePageProps> = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(DEMO_INVOICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [termFilter, setTermFilter] = useState('All');

  // Selected Invoice Modal / Receipt
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Record Payment Modal
  const [paymentModalInvoice, setPaymentModalInvoice] = useState<Invoice | null>(null);
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState<'Bank Transfer' | 'POS' | 'Cash' | 'Online (Pending)'>('Bank Transfer');
  const [payRef, setPayRef] = useState('');

  // Create Invoice Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    childId: 'ch-01',
    term: 'Term 1 (2025/2026)',
    tuitionFee: 380000,
    feedingFee: 45000,
    materialsFee: 25000,
    dueDate: '2026-09-15'
  });

  // Calculate totals
  const totalBilled = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOutstanding = invoices.reduce((acc, i) => acc + (i.totalAmount - i.paidAmount), 0);
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

  const filteredInvoices = invoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.childName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    const matchTerm = termFilter === 'All' || inv.term === termFilter;
    return matchSearch && matchStatus && matchTerm;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalInvoice) return;

    const newPaidTotal = paymentModalInvoice.paidAmount + Number(payAmount);
    const isFull = newPaidTotal >= paymentModalInvoice.totalAmount;

    setInvoices(prev => prev.map(inv => {
      if (inv.id === paymentModalInvoice.id) {
        return {
          ...inv,
          paidAmount: newPaidTotal,
          status: (isFull ? 'Paid' : 'Partially Paid') as InvoiceStatus,
          paymentMethod: payMethod,
          paymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return inv;
    }));

    if (selectedInvoice?.id === paymentModalInvoice.id) {
      setSelectedInvoice(prev => prev ? {
        ...prev,
        paidAmount: newPaidTotal,
        status: (isFull ? 'Paid' : 'Partially Paid') as InvoiceStatus
      } : null);
    }

    setPaymentModalInvoice(null);
    setPayAmount(0);
    setPayRef('');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const child = DEMO_CHILDREN.find(c => c.id === formData.childId) || DEMO_CHILDREN[0];
    const total = formData.tuitionFee + formData.feedingFee + formData.materialsFee;

    const newItems: InvoiceItem[] = [
      { id: 'itm-1', description: 'Term 1 Tuition & Early Care', quantity: 1, unitPrice: formData.tuitionFee, amount: formData.tuitionFee },
      { id: 'itm-2', description: 'Organic Catering & Nutrition Plan', quantity: 1, unitPrice: formData.feedingFee, amount: formData.feedingFee },
      { id: 'itm-3', description: 'Educational Materials & Art Supplies', quantity: 1, unitPrice: formData.materialsFee, amount: formData.materialsFee }
    ];

    const newInv: Invoice = {
      id: `inv-0${invoices.length + 1}`,
      invoiceNumber: `INV-2026-00${invoices.length + 1}`,
      parentId: child.parentId,
      parentName: child.parentName,
      parentEmail: child.parentEmail,
      childId: child.id,
      childName: `${child.firstName} ${child.lastName}`,
      className: child.className,
      term: formData.term,
      items: newItems,
      subtotal: total,
      discount: 0,
      totalAmount: total,
      paidAmount: 0,
      dueDate: formData.dueDate,
      issueDate: '2026-08-19',
      status: 'Pending'
    };

    setInvoices([newInv, ...invoices]);
    setIsAddModalOpen(false);
  };

  const handleSendReminder = (inv: Invoice) => {
    alert(`Payment reminder dispatched to ${inv.parentName} via WhatsApp & Email for ₦${(inv.totalAmount - inv.paidAmount).toLocaleString()}!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Paystack Integration Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-indigo-500/10 border border-amber-300/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 uppercase">PAYSTACK GATEWAY STATUS: NOT CONNECTED (STAGE 1 DEMO)</span>
            <p className="text-slate-600 mt-0.5">
              Simulating direct Nigerian bank transfer reconciliation (Zenith / GTBank / Access) and front-desk POS collections.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg shrink-0">
          Ready for Stage 2 API Key
        </span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Finance, Invoicing & Tuition Ledger</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tuition billing schedules, bank transfers, POS receipts & automated overdue reminders in ₦ NGN
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* KPI Cards (4 metrics in ₦ NGN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Billed</p>
          <p className="text-xl font-extrabold text-slate-900 font-display mt-0.5">₦{totalBilled.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Term 1 2026 Academic Cycle</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-xs">
          <p className="text-xs font-bold text-emerald-800 uppercase">Total Collected</p>
          <p className="text-xl font-extrabold text-emerald-700 font-display mt-0.5">₦{totalCollected.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            {((totalCollected / totalBilled) * 100).toFixed(1)}% recovery rate
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
          <p className="text-xs font-bold text-amber-800 uppercase">Outstanding Fees</p>
          <p className="text-xl font-extrabold text-amber-700 font-display mt-0.5">₦{totalOutstanding.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Pending parent transfers</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-xs">
          <p className="text-xs font-bold text-rose-800 uppercase">Overdue Accounts</p>
          <p className="text-xl font-extrabold text-rose-700 font-display mt-0.5">{overdueCount} Accounts</p>
          <p className="text-[10px] text-rose-600 font-semibold mt-0.5">Automated reminder queued</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by invoice number, parent, or pupil..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>

            <select
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Terms</option>
              <option value="Term 1 (2025/2026)">Term 1 (2025/2026)</option>
              <option value="Term 3 (2024/2025)">Term 3 (2024/2025)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Pupil / Class</th>
                <th className="py-3.5 px-4">Parent / Guardian</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Paid</th>
                <th className="py-3.5 px-4">Balance Due</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => {
                const balance = inv.totalAmount - inv.paidAmount;
                return (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-teal-700">{inv.childName}</p>
                        <p className="text-[10px] text-slate-500">{inv.className}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">
                      {inv.parentName}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ₦{inv.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-700 font-semibold">
                      ₦{inv.paidAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {balance > 0 ? (
                        <span className="text-rose-700 font-bold">₦{balance.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">₦0</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {inv.dueDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={inv.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {inv.status !== 'Paid' && (
                          <>
                            <button
                              onClick={() => {
                                setPaymentModalInvoice(inv);
                                setPayAmount(inv.totalAmount - inv.paidAmount);
                              }}
                              title="Record Payment"
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                            >
                              Pay
                            </button>
                            <button
                              onClick={() => handleSendReminder(inv)}
                              title="Send Reminder"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-slate-100"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          title="View Official Receipt / Invoice"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-slate-100"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice & Receipt Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice / Official Receipt: ${selectedInvoice.invoiceNumber}`}
          subtitle="La Bebe Creche & Aftercare, Maitama, Abuja"
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Printing official invoice statement...')}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                {selectedInvoice.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      setPaymentModalInvoice(selectedInvoice);
                      setPayAmount(selectedInvoice.totalAmount - selectedInvoice.paidAmount);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                  >
                    Record Payment
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Header branding */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">Official Bill & Receipt</span>
                <h3 className="text-base font-bold font-display">{selectedInvoice.invoiceNumber}</h3>
                <p className="text-xs text-slate-300">{selectedInvoice.term} • Due: {selectedInvoice.dueDate}</p>
              </div>
              <StatusBadge status={selectedInvoice.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Billed To (Parent)</span>
                <p className="font-bold text-slate-900">{selectedInvoice.parentName}</p>
                <p className="text-slate-600">Pupil: {selectedInvoice.childName} ({selectedInvoice.className})</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Issued By (School)</span>
                <p className="font-bold text-slate-900">La Bebe Creche & Aftercare</p>
                <p className="text-slate-600">Abuja, Nigeria</p>
              </div>
            </div>

            {/* Line items table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Amount (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-medium text-slate-800">{item.description}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        ₦{item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-3 text-slate-700">Total Billed:</td>
                    <td className="p-3 text-right font-mono text-slate-900">
                      ₦{selectedInvoice.totalAmount.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-emerald-50 text-emerald-900 font-bold">
                    <td className="p-3">Total Paid to Date:</td>
                    <td className="p-3 text-right font-mono">
                      ₦{selectedInvoice.paidAmount.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-slate-900 text-white font-bold">
                    <td className="p-3">Outstanding Balance Due:</td>
                    <td className="p-3 text-right font-mono text-rose-300">
                      ₦{(selectedInvoice.totalAmount - selectedInvoice.paidAmount).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {selectedInvoice.paymentDate && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] flex items-center justify-between">
                <span>Payment recorded on <strong>{selectedInvoice.paymentDate}</strong></span>
                <span className="font-semibold">{selectedInvoice.paymentMethod}</span>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Record Payment Modal */}
      {paymentModalInvoice && (
        <Modal
          isOpen={!!paymentModalInvoice}
          onClose={() => setPaymentModalInvoice(null)}
          title={`Record Payment: ${paymentModalInvoice.invoiceNumber}`}
          subtitle={`Parent: ${paymentModalInvoice.parentName} • Total Due: ₦${(paymentModalInvoice.totalAmount - paymentModalInvoice.paidAmount).toLocaleString()}`}
          maxWidth="md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Amount to Record (₦ NGN) *</label>
              <input
                type="number"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Payment Method *</label>
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              >
                <option value="Bank Transfer">Direct Bank Transfer (Zenith / GTBank / Access)</option>
                <option value="POS">POS Terminal (Front Desk)</option>
                <option value="Cash">Cash Deposit</option>
                <option value="Online (Pending)">Paystack (Simulation)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Bank Transaction / Reference ID</label>
              <input
                type="text"
                value={payRef}
                onChange={(e) => setPayRef(e.target.value)}
                placeholder="e.g. NIP-ZENITH-99482019"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPaymentModalInvoice(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs"
              >
                Confirm Payment & Update Ledger
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Generate Invoice Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Generate Term Tuition Invoice"
        subtitle="Generate itemized fee schedule for enrolled child."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Select Pupil *</label>
            <select
              value={formData.childId}
              onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            >
              {DEMO_CHILDREN.map((c) => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.className} • {c.parentName})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Academic Term</label>
              <input
                type="text"
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tuition Fee (₦)</label>
              <input
                type="number"
                required
                value={formData.tuitionFee}
                onChange={(e) => setFormData({ ...formData, tuitionFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Feeding & Snack (₦)</label>
              <input
                type="number"
                value={formData.feedingFee}
                onChange={(e) => setFormData({ ...formData, feedingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Materials (₦)</label>
              <input
                type="number"
                value={formData.materialsFee}
                onChange={(e) => setFormData({ ...formData, materialsFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-slate-900 font-bold">
            <span>Total Bill:</span>
            <span className="font-mono text-base">₦{(formData.tuitionFee + formData.feedingFee + formData.materialsFee).toLocaleString()}</span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
            >
              Issue Invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
