import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  badge?: string;
  badgeType?: 'default' | 'success' | 'warning' | 'danger' | 'indigo';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  badge,
  badgeType = 'default',
  onClick
}) => {
  const getBadgeClass = () => {
    switch (badgeType) {
      case 'success': return 'text-emerald-600 bg-emerald-50';
      case 'warning': return 'text-orange-500 bg-orange-50';
      case 'danger': return 'text-red-500 bg-red-50';
      case 'indigo': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-slate-500 bg-slate-100';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-indigo-200 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between mt-2">
        <h2 className="text-3xl font-black text-slate-900 font-display tracking-tight leading-none">{value}</h2>
        
        {trend ? (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
            trend.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
          }`}>
            {trend.value}
          </span>
        ) : badge ? (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${getBadgeClass()}`}>
            {badge}
          </span>
        ) : subtitle ? (
          <span className="text-[11px] text-slate-500 font-medium">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
};
