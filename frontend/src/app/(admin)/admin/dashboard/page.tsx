'use client';

import React from 'react';
import { DashboardWidget, OrderManagement } from '../../../../features/admin';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 font-sans">
      <div>
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Store Console</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1.5">Store Analytics Overview</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Review live quotation counts, restocking indicators, and POS actions.</p>
      </div>

      {/* KPI Widgets */}
      <DashboardWidget />

      {/* Live Quotation audits */}
      <OrderManagement />
    </div>
  );
}
