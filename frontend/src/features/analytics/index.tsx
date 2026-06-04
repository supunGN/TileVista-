'use client';

import React from 'react';
import { TrendingUp, ShoppingBag, BarChart3, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils';

export const AnalyticsFeature: React.FC = () => {
  return (
    <div className="p-8 bg-[#F9F9F7] text-[#1A1A1A] min-h-screen font-sans">
      <div className="mb-8">
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Store Console</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1">Business Analytics</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Review showroom trends, sales metrics, and stock velocities.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: formatCurrency(512400), icon: <TrendingUp size={20} className="text-[#1A1A1A]" /> },
          { label: 'Total Orders', value: '14 Orders', icon: <ShoppingBag size={20} className="text-[#1A1A1A]" /> },
          { label: 'Restock Warnings', value: '4 items', icon: <AlertCircle size={20} className="text-red-600" /> },
          { label: 'POS sync updates', value: '48 logs', icon: <BarChart3 size={20} className="text-[#1A1A1A]" /> },
        ].map((kpi, idx) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fast Moving SKU Table */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase pb-4 border-b border-gray-100 mb-6">
            Fast-Moving SKUs
          </h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Royal Marble Polished Tile', units: 120, revenue: 462000 },
              { rank: 2, name: 'Vessel Oval Wash Basin', units: 2, revenue: 49000 },
            ].map((item) => (
              <div key={item.rank} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 flex items-center justify-center text-[10px] font-bold bg-[#D4C5B9]/15 border border-[#D4C5B9]/20 text-[#1A1A1A]">
                    {item.rank}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1A1A1A]">{item.name}</h4>
                    <span className="text-[10px] text-gray-400 font-light">{item.units} units sold</span>
                  </div>
                </div>
                <span className="font-bold text-[#1A1A1A] text-sm font-mono">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Mock block */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase pb-4 border-b border-gray-100 mb-2">
              Sales Performance Trends
            </h3>
            <p className="text-xs text-gray-400 font-light mb-6">Real-time revenue monitoring synced with external POS logs.</p>
          </div>
          <div className="w-full h-44 bg-[#F9F9F7] border border-gray-150 flex items-center justify-center text-gray-400 text-xs font-light font-mono select-none">
            [ Interactive Chart Graph Overlay ]
          </div>
        </div>
      </div>

    </div>
  );
};
export default AnalyticsFeature;
