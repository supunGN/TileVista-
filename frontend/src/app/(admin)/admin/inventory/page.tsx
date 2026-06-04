'use client';

import React from 'react';
import { InventoryTable } from '../../../../features/admin';

export default function AdminInventoryPage() {
  return (
    <div className="font-outfit space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Inventory Control</h1>
        <p className="text-sm text-slate-400 mt-1">Audit current catalogue stock and trigger POS synchronisations.</p>
      </div>
      <InventoryTable />
    </div>
  );
}
