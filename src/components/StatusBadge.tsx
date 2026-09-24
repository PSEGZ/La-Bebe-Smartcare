import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isSafeguarding?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md', 
  className = '',
  isSafeguarding = false
}) => {
  const getBadgeStyle = (val: string): string => {
    if (isSafeguarding || val === 'Critical (Safeguarding)') {
      return 'bg-red-50 text-red-700 border-red-200 font-semibold ring-2 ring-red-500/20 animate-pulse';
    }

    switch (val) {
      // Attendance
      case 'Present':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Absent':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Late':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Early Pickup':
      case 'Departed':
        return 'bg-sky-50 text-sky-700 border-sky-200';

      // Enrollment & Leads
      case 'Enrolled':
      case 'Active':
      case 'Approved':
      case 'Sent to Parent':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Tour Scheduled':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Tour Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Application Submitted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Application Started':
      case 'Interested':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'New Enquiry':
      case 'Contacted':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Payment Pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Lost':
      case 'Cancelled':
      case 'Inactive':
      case 'Withdrawn':
        return 'bg-slate-100 text-slate-600 border-slate-200';

      // Invoices
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Partially Paid':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending':
      case 'Draft':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue':
        return 'bg-rose-50 text-rose-700 border-rose-200';

      // Incidents & Severity
      case 'Resolved':
      case 'Reviewed & Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Open':
      case 'Pending Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Under Investigation':
      case 'Escalated to Director':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border whitespace-nowrap ${sizeClasses[size]} ${getBadgeStyle(status)} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {status}
    </span>
  );
};
