import React from 'react';
import { X, Download } from 'lucide-react';
import { useDesignerStore } from '../../store/designer.store';

export default function SaveDesignModal() {
  const { placedItems, showSummaryModal, setShowSummaryModal } = useDesignerStore();
  
  if (!showSummaryModal) return null;
  
  const total = placedItems.reduce((acc, item) => acc + (item.cost || 0), 0);
  
  return (
    <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-300 p-6">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50 bg-[#FAF9F6]">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Design Summary</h2>
            <p className="text-xs font-semibold tracking-wider text-gray-400 mt-1 uppercase">Estimated Costs & Materials</p>
          </div>
          <button 
            onClick={() => setShowSummaryModal(false)} 
            className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-all shadow-sm border border-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {placedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-semibold tracking-wide text-gray-400 uppercase">No items added to the design yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {placedItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                      <span className="text-[10px] font-bold tracking-widest uppercase">{item.type.substring(0,2)}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-black transition-colors">{item.name}</h4>
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">{item.type.replace('_',' ')}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#1A1A1A]">Rs {(item.cost || 0).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-8 py-6 bg-[#FAF9F6] border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Total Estimate</p>
            <p className="font-mono text-2xl font-bold text-[#1A1A1A]">Rs {total.toFixed(2)}</p>
          </div>
          <button className="h-12 px-8 bg-black hover:bg-[#333] text-white rounded-full flex items-center gap-3 font-bold tracking-wider text-xs uppercase shadow-xl transition-all">
            <Download size={14} />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
