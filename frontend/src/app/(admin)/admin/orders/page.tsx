'use client';

import React from 'react';
import { OrderManagement } from '../../../../features/admin';

export default function AdminOrdersPage() {
  return (
    <div className="font-outfit space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Quotation Logs</h1>
        <p className="text-sm text-slate-400 mt-1">Review, print invoices, and complete showroom customer sales references.</p>
      </div>
      <OrderManagement />
    </div>
  );
}
