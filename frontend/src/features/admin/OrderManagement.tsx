'use client';

import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { formatCurrency } from '../../utils';
import { Receipt, Eye, CheckCircle } from 'lucide-react';

const MOCK_QUOTATIONS = [
  {
    id: 'QT-98234-LK',
    customerName: 'Supun Gunasinghe',
    phone: '+94 77 123 4567',
    total: 512400,
    status: 'PENDING_SHOWROOM',
    createdAt: '2026-06-04',
  },
  {
    id: 'QT-44820-LK',
    customerName: 'Dilshan Perera',
    phone: '+94 71 987 6543',
    total: 24500,
    status: 'COMPLETED_PURCHASE',
    createdAt: '2026-06-03',
  },
];

export const OrderManagement: React.FC = () => {
  return (
    <Card className="border border-glassBorder p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Receipt className="text-indigo-400" size={20} /> Generated Design Quotation References
        </h3>
      </div>

      <div className="space-y-4">
        {MOCK_QUOTATIONS.map((q) => (
          <div
            key={q.id}
            className="p-5 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:border-indigo-500/10"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-indigo-400">{q.id}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    q.status === 'PENDING_SHOWROOM'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {q.status === 'PENDING_SHOWROOM' ? 'Awaiting Showroom Visit' : 'Purchase Completed'}
                </span>
              </div>
              <h4 className="font-bold text-white mt-2">{q.customerName}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Contact: {q.phone} | Created: {q.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-left md:text-right flex-1 md:flex-none">
                <span className="text-xs text-slate-400 block">Quotation Value</span>
                <span className="font-extrabold text-white text-lg">{formatCurrency(q.total)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Eye size={14} /> Detail
                </Button>
                {q.status === 'PENDING_SHOWROOM' && (
                  <Button variant="accent" size="sm" className="shadow-none">
                    <CheckCircle size={14} /> Complete Sale
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default OrderManagement;
