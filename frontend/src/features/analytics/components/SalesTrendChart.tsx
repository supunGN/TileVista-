import React from 'react';
import { SalesTrendPoint } from '../../../types/analytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesTrendChartProps {
  data: SalesTrendPoint[];
  isLoading: boolean;
  error: string | null;
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ data = [], isLoading, error }) => {
  const chartData = Array.isArray(data) ? data : (data as any)?.data || [];
  const formattedData = chartData.map((d: any) => ({
    ...d,
    revenue: d.revenue ?? d.netRevenue ?? d.grossRevenue ?? 0,
  }));

  return (
    <div className="bg-white border border-gray-200 p-8 shadow-sm flex flex-col h-[400px]">
      <div>
        <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase pb-4 border-b border-gray-100 mb-6">
          Sales Performance Trends
        </h3>
      </div>
      
      <div className="flex-grow w-full">
        {error ? (
          <div className="flex h-full items-center justify-center text-red-500 text-sm">{error}</div>
        ) : isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm animate-pulse">Loading chart...</div>
        ) : formattedData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">No trend data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `${Number(value).toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '0px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                labelStyle={{ color: '#1A1A1A', fontWeight: 'bold', marginBottom: '4px' }}
                itemStyle={{ color: '#1A1A1A' }}
                formatter={(value: any) => [`LKR ${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Revenue']}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#1A1A1A" 
                strokeWidth={2}
                dot={{ r: 3, fill: '#1A1A1A', strokeWidth: 0 }} 
                activeDot={{ r: 5, fill: '#D4C5B9' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

