'use client';

import React from 'react';
import { Card } from '../../components/Card';
import { TrendingUp, ShoppingBag, BarChart3, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils';

export const DashboardWidget: React.FC = () => {
  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(742900), change: '+12.4%', icon: <TrendingUp className="text-emerald-400" size={24} /> },
    { label: 'Generated Quotations', value: '48 Quotations', change: '+8.1%', icon: <ShoppingBag className="text-indigo-400" size={24} /> },
    { label: 'Low Stock Warnings', value: '3 SKUs', change: 'Immediate Action', icon: <AlertCircle className="text-rose-400" size={24} /> },
    { label: 'Database Logs Synced', value: '184 events', change: '100% success', icon: <BarChart3 className="text-blue-400" size={24} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <Card key={idx} className="border border-glassBorder p-6 bg-slate-900/40">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-400 font-semibold">{kpi.label}</span>
            {kpi.icon}
          </div>
          <h3 className="text-2xl font-extrabold text-white">{kpi.value}</h3>
          <span className="text-xs text-slate-500 mt-2 block font-medium">{kpi.change} vs last month</span>
        </Card>
      ))}
    </div>
  );
};
export default DashboardWidget;
