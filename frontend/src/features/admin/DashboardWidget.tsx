'use client';

import React from 'react';
import { TrendingUp, ShoppingBag, BarChart3, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils';

export const DashboardWidget: React.FC = () => {
  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(742900), change: '+12.4%', icon: <TrendingUp className="text-[#1A1A1A]" size={20} /> },
    { label: 'Generated Quotations', value: '48 Quotations', change: '+8.1%', icon: <ShoppingBag className="text-[#1A1A1A]" size={20} /> },
    { label: 'Low Stock Warnings', value: '3 SKUs', change: 'Immediate Action', icon: <AlertCircle className="text-red-500" size={20} /> },
    { label: 'Database Logs Synced', value: '184 events', change: '100% success', icon: <BarChart3 className="text-[#1A1A1A]" size={20} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{kpi.label}</span>
            <div className="p-2 bg-gray-50 border border-gray-150 rounded-none text-[#1A1A1A]">
              {kpi.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] font-mono tracking-tight">{kpi.value}</h3>
          <span className="text-[10px] text-gray-500 font-light mt-3 block">
            <span className="font-semibold text-emerald-600">{kpi.change}</span> vs last month
          </span>
        </div>
      ))}
    </div>
  );
};
export default DashboardWidget;
