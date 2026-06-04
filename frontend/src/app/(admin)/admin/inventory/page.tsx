'use client';

import React from 'react';
import { InventoryTable } from '../../../../features/admin';

export default function AdminInventoryPage() {
  return (
    <div className="font-sans space-y-6">
      <div>
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Store Console</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1.5">Inventory Control</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Audit current catalogue stock and trigger POS synchronisations.</p>
      </div>
      <InventoryTable />
    </div>
  );
}
