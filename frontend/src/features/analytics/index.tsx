'use client';

import React from 'react';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { KpiCards } from './components/KpiCards';
import { SalesTrendChart } from './components/SalesTrendChart';
import { PerformanceTable } from './components/PerformanceTable';
import { DecisionSupportPanel } from './components/DecisionSupportPanel';
import { AnalyticsLoadingScreen } from './components/AnalyticsLoadingScreen';

export const AnalyticsFeature: React.FC = () => {
  const { data, isLoading, error } = useAnalyticsData();

  if (isLoading) {
    return <AnalyticsLoadingScreen />;
  }

  if (error && !data.kpis && data.trends.length === 0) {
    return (
      <div className="font-sans space-y-6">
        <div>
          <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Store Console</span>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1.5">Business Analytics</h1>
          <p className="text-xs text-gray-500 font-light mt-1">Review showroom trends, sales metrics, and actionable decisions.</p>
        </div>

        <div className="p-8 bg-red-50 border border-red-200 text-center space-y-4 shadow-sm">
          <p className="text-red-700 font-semibold text-sm">Failed to load analytics: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            Retry Analytics Sync
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans space-y-6">
      <div>
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Store Console</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1.5">Business Analytics</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Review showroom trends, sales metrics, and actionable decisions.</p>
      </div>

      <KpiCards data={data.kpis} isLoading={isLoading} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SalesTrendChart data={data.trends} isLoading={isLoading} error={error} />
        <PerformanceTable performance={data.performance} velocity={data.velocity} isLoading={isLoading} error={error} />
      </div>

      <div className="w-full">
        <DecisionSupportPanel recommendations={data.recommendations} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default AnalyticsFeature;

