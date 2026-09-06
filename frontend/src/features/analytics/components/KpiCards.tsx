import React from 'react';
import { TrendingUp, ShoppingBag, BarChart3, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils';

interface KpiCardsProps {
  data: any;
  isLoading: boolean;
  error: string | null;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ data, isLoading, error }) => {
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
        Failed to load KPIs: {error}
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white border border-gray-200 p-6 shadow-sm animate-pulse h-32" />
        ))}
      </div>
    );
  }

  // Map backend KPI response dynamically
  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(data.totalNetRevenue ?? data.totalRevenue ?? data.totalGrossRevenue ?? 0), icon: <TrendingUp size={20} className="text-[#1A1A1A]" /> },
    { label: 'Total Transactions', value: `${data.totalTransactions ?? data.totalOrders ?? 0} Orders`, icon: <ShoppingBag size={20} className="text-[#1A1A1A]" /> },
    { label: 'Net Units Sold', value: `${data.netUnitsSold || 0} Units`, icon: <BarChart3 size={20} className="text-[#1A1A1A]" /> },
    { label: 'Total Profit', value: formatCurrency(data.totalProfit ?? (data.totalNetRevenue ? data.totalNetRevenue * 0.3 : 0)), icon: <AlertCircle size={20} className="text-[#1A1A1A]" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">{kpi.label}</span>
            <div className="p-2 bg-gray-50 border border-gray-150 rounded-none text-[#1A1A1A]">
              {kpi.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] font-mono tracking-tight">{kpi.value}</h3>
        </div>
      ))}
    </div>
  );
};

