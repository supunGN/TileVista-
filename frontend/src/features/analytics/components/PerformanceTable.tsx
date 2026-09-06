import React from 'react';
import { ProductPerformance, ProductVelocity } from '../../../types/analytics';
import { formatCurrency } from '../../../utils';

interface PerformanceTableProps {
  performance: ProductPerformance[];
  velocity: ProductVelocity[];
  isLoading: boolean;
  error: string | null;
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({ performance = [], velocity = [], isLoading, error }) => {
  const perfList = Array.isArray(performance) ? performance : (performance as any)?.data || [];
  const velList = Array.isArray(velocity) ? velocity : (velocity as any)?.data || [];

  // Merge performance and velocity data
  const mergedData = perfList.map((item: any, idx: number) => {
    const v = velList.find((vel: any) => 
      (vel.productId && item.itemId && vel.productId === item.itemId) || 
      (vel.productName && item.name && vel.productName.toLowerCase() === item.name.toLowerCase())
    );
    return {
      ...item,
      id: item.itemId ?? idx,
      name: item.name || 'Unknown Product',
      unitsSold: item.unitsSold ?? item.netUnitsSold ?? 0,
      revenue: item.revenue ?? item.netRevenue ?? 0,
      velocityClass: v?.velocityClass || v?.classification || 'NORMAL'
    };
  });

  return (
    <div className="bg-white border border-gray-200 p-8 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase pb-4 border-b border-gray-100 mb-6">
        Product Performance & Velocity
      </h3>
      
      <div className="flex-grow overflow-y-auto pr-2">
        {error ? (
          <div className="text-red-500 text-sm py-4">{error}</div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-50 animate-pulse" />)}
          </div>
        ) : mergedData.length === 0 ? (
          <div className="text-gray-400 text-sm py-4">No performance data available</div>
        ) : (
          <div className="space-y-4">
            {mergedData.map((item: any, idx: number) => (
              <div key={item.id ?? item.itemId ?? idx} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 flex items-center justify-center text-[10px] font-bold bg-[#D4C5B9]/15 border border-[#D4C5B9]/20 text-[#1A1A1A] shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1A1A1A] truncate max-w-[200px]" title={item.name}>{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-500 font-light">{item.unitsSold} units</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 font-medium uppercase">{item.velocityClass}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-[#1A1A1A] text-sm font-mono shrink-0">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

