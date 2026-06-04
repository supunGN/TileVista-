'use client';

import React from 'react';
import { DashboardWidget, OrderManagement } from '../../../../features/admin';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 font-outfit">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Store Analytics Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Review live quotation counts, restocking indicators, and POS actions.</p>
      </div>

      {/* KPI Widgets */}
      <DashboardWidget />

      {/* Live Quotation audits */}
      <OrderManagement />
    </div>
  );
}
