import React from 'react';
import { Card, Button } from '@tilevista/ui';
import { Order } from '@tilevista/types';
import { formatCurrency } from '@tilevista/utils';
import { CheckCircle2, Package, Clock, Eye } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-98234-LK',
    status: 'CONFIRMED',
    total: 512400,
    tax: 66800,
    discount: 0,
    shippingAddress: '42, Flower Road, Colombo 07, Sri Lanka',
    paymentMethod: 'Bank Transfer',
    createdAt: new Date(),
    items: [],
  },
];

export const OrdersFeature: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle2 className="text-emerald-400" size={18} />;
      case 'PENDING':
        return <Clock className="text-amber-400" size={18} />;
      default:
        return <Package className="text-indigo-400" size={18} />;
    }
  };

  return (
    <div className="p-8 bg-darkBg text-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="font-outfit text-3xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-sm text-slate-400 mt-1">Track status and review invoice receipts.</p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {MOCK_ORDERS.map((order) => (
          <Card key={order.id} className="border border-glassBorder p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="p-3 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 w-12 h-12">
                <Package size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-slate-400">{order.id}</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-xs font-semibold">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status.toLowerCase()}</span>
                  </div>
                </div>
                <h3 className="font-outfit text-xl font-bold text-white mt-2">{formatCurrency(order.total)}</h3>
                <p className="text-xs text-slate-400 mt-1">Placed on: {order.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            <Button variant="secondary" className="w-full md:w-auto">
              <Eye size={16} /> View Invoice
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default OrdersFeature;
