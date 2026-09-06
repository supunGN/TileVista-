import React from 'react';
import { DecisionRecommendation } from '../../../types/analytics';
import { AlertTriangle, Info, TrendingDown, CheckCircle2 } from 'lucide-react';

interface DecisionSupportPanelProps {
  recommendations: DecisionRecommendation[];
  isLoading: boolean;
  error: string | null;
}

export const DecisionSupportPanel: React.FC<DecisionSupportPanelProps> = ({ recommendations = [], isLoading, error }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-50 border-red-200 text-red-700';
      case 'MEDIUM': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'LOW': return 'bg-blue-50 border-blue-200 text-blue-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGH': return <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />;
      case 'MEDIUM': return <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />;
      case 'LOW': return <TrendingDown size={16} className="text-blue-600 shrink-0 mt-0.5" />;
      default: return <CheckCircle2 size={16} className="text-gray-400 shrink-0 mt-0.5" />;
    }
  };

  const recList = Array.isArray(recommendations) ? recommendations : (recommendations as any)?.data || [];
  // Only show actionable items, or top 10
  const actionable = recList.filter((r: any) => r.priority !== 'NONE').slice(0, 10);

  return (
    <div className="bg-white border border-gray-200 p-8 shadow-sm">
      <div className="flex justify-between items-end pb-4 border-b border-gray-100 mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase mb-1">
            Decision Support Engine
          </h3>
          <p className="text-xs text-gray-500 font-light">Actionable intelligence based on 30-day baseline forecasts and ADI/CV² canonical profiles.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {error ? (
          <div className="text-red-500 text-sm py-4">{error}</div>
        ) : isLoading ? (
          [1,2,3].map(i => <div key={i} className="h-24 bg-gray-50 animate-pulse border border-gray-100" />)
        ) : actionable.length === 0 ? (
          <div className="text-gray-400 text-sm py-8 text-center bg-gray-50 border border-dashed border-gray-200">
            All inventory is stable. No recommended actions at this time.
          </div>
        ) : (
          actionable.map((rec: DecisionRecommendation, idx: number) => (
            <div key={rec.productId ?? idx} className={`p-5 border ${getPriorityStyles(rec.priority)} flex gap-4 transition-colors`}>
              {getPriorityIcon(rec.priority)}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{rec.productName}</h4>
                    <span className="text-[10px] uppercase font-semibold tracking-wider opacity-75">{rec.recommendationType}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold bg-white/50 px-2 py-1 rounded-sm border border-black/5">
                      Stock: {rec.currentStock} | Forecast: {rec.forecast30d}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs mb-3 opacity-90 leading-relaxed font-medium">
                  {rec.reason}
                </p>
                
                <div className="bg-white/60 px-3 py-2 text-xs border border-black/5 font-semibold">
                  Action: {rec.recommendedAction}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

