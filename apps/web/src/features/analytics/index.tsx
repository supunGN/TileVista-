import React from 'react';
import { Card } from '@tilevista/ui';
import { TrendingUp, ShoppingBag, BarChart3, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@tilevista/utils';

export const AnalyticsFeature: React.FC = () => {
  return (
    <div className="p-8 bg-darkBg text-slate-100 min-h-screen font-outfit">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Review showroom trends, sales metrics, and stock velocities.</p>
      </div>

      {/* KPI Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: formatCurrency(512400), icon: <TrendingUp className="text-emerald-400" size={24} /> },
          { label: 'Total Orders', value: '14 Orders', icon: <ShoppingBag className="text-indigo-400" size={24} /> },
          { label: 'Restock Warnings', value: '4 items', icon: <AlertCircle className="text-red-400" size={24} /> },
          { label: 'POS sync updates', value: '48 logs', icon: <BarChart3 className="text-blue-400" size={24} /> },
        ].map((kpi, idx) => (
          <Card key={idx} className="border border-glassBorder p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400 font-semibold">{kpi.label}</span>
              {kpi.icon}
            </div>
            <h3 className="text-2xl font-extrabold text-white">{kpi.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fast Selling list */}
        <Card className="border border-glassBorder p-6">
          <h3 className="text-xl font-bold mb-6 text-white">Fast-Moving SKUs</h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Royal Marble Polished Tile', units: 120, revenue: 462000 },
              { rank: 2, name: 'Vessel Oval Wash Basin', units: 2, revenue: 49000 },
            ].map((item) => (
              <div key={item.rank} className="flex justify-between items-center border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full bg-indigo-500/10 text-indigo-400">
                    {item.rank}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-200">{item.name}</h4>
                    <span className="text-xs text-slate-400">{item.units} units sold</span>
                  </div>
                </div>
                <span className="font-bold text-indigo-400 text-sm">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Charts Mock */}
        <Card className="border border-glassBorder p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Sales Performance Trends</h3>
            <p className="text-xs text-slate-400 mb-6">Real-time revenue monitoring synced with external POS logs.</p>
          </div>
          <div className="w-full h-48 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-600 text-sm font-semibold">
            [ Interactive Chart Graph Overlay ]
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AnalyticsFeature;
