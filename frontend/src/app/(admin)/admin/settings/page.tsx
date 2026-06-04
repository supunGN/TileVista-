'use client';

import React, { useState } from 'react';
import { Save, RefreshCw, AlertCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [threshold, setThreshold] = useState(10);
  const [webhook, setWebhook] = useState('https://pos.alahapperuma.lk/sync');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Administrative settings configurations updated successfully!');
  };

  return (
    <div className="font-sans space-y-6 max-w-2xl">
      <div>
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Store Console</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1.5">Store Administration Settings</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Configure real-time sync thresholds and POS webhook integration endpoints.</p>
      </div>

      <div className="bg-white p-8 border border-gray-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Threshold input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Low Stock Warning Limit Threshold</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
            />
            <span className="text-[10px] text-gray-400 font-light leading-none">Restocking warnings will trigger on stock levels lower than this amount.</span>
          </div>

          {/* Webhook endpoint */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">POS Synchronization Webhook Endpoint</label>
            <input
              type="text"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
            />
          </div>

          <div className="flex gap-3 border-t border-gray-100 pt-6">
            <button 
              type="submit" 
              className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-wider uppercase px-6 py-3.5 transition-all duration-300 flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Configurations</span>
            </button>
            <button 
              type="button" 
              onClick={() => alert('POS connection status: Active & Synchronized')}
              className="border border-gray-300 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase px-6 py-3.5 transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Test Connection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
