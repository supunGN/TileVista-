'use client';

import React from 'react';
import { Receipt, Eye, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils';

const MOCK_QUOTATIONS = [
  {
    id: 'QT-98234-MATARA',
    customerName: 'Supun Gunasinghe',
    phone: '+94 77 123 4567',
    total: 512400,
    status: 'PENDING_SHOWROOM',
    createdAt: '2026-06-04',
  },
  {
    id: 'QT-44820-MATARA',
    customerName: 'Dilshan Perera',
    phone: '+94 71 987 6543',
    total: 24500,
    status: 'COMPLETED_PURCHASE',
    createdAt: '2026-06-03',
  },
];

export const OrderManagement: React.FC = () => {
  const handleCompleteSale = (qId: string) => {
    alert(`Successfully registered purchase completion for quotation ID "${qId}"! Stocks subtracted at Matara POS.`);
  };

  return (
    <div className="bg-white border border-gray-200 p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase flex items-center gap-2">
          <Receipt className="text-[#D4C5B9]" size={18} /> 
          <span>Generated Quotation Database Logs</span>
        </h3>
      </div>

      <div className="space-y-4">
        {MOCK_QUOTATIONS.map((q) => (
          <div
            key={q.id}
            className="p-6 bg-[#F9F9F7] border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-extrabold text-red-600 tracking-wider">{q.id}</span>
                <span
                  className={`text-[9px] px-2.5 py-1 font-bold uppercase tracking-wider ${
                    q.status === 'PENDING_SHOWROOM'
                      ? 'bg-amber-50 border border-amber-200 text-amber-700'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  }`}
                >
                  {q.status === 'PENDING_SHOWROOM' ? 'Awaiting Showroom Visit' : 'Purchase Completed'}
                </span>
              </div>
              <h4 className="font-bold text-[#1A1A1A] text-sm mt-3">{q.customerName}</h4>
              <p className="text-[10px] text-gray-400 font-light mt-1">
                Contact: {q.phone} | Logged At: {q.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-200">
              <div className="text-left md:text-right flex-1 md:flex-none">
                <span className="text-[8px] font-bold text-gray-400 tracking-wider uppercase leading-none block mb-1">Quotation Value</span>
                <span className="font-bold text-[#1A1A1A] text-base font-mono">{formatCurrency(q.total)}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`Details for quotation ID "${q.id}" loaded.`)}
                  className="border border-gray-300 hover:border-[#1A1A1A] hover:bg-gray-50 text-[#1A1A1A] font-semibold text-[10px] tracking-wider uppercase px-4 py-2.5 transition-colors"
                >
                  <Eye size={12} className="inline mr-1" /> Detail
                </button>
                {q.status === 'PENDING_SHOWROOM' && (
                  <button 
                    onClick={() => handleCompleteSale(q.id)}
                    className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-[10px] tracking-wider uppercase px-4 py-2.5 transition-all"
                  >
                    <CheckCircle size={12} className="inline mr-1" /> Complete Sale
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderManagement;
