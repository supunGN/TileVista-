'use client';

import React, { useState } from 'react';
import { Card } from '../../../../components/Card';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { RefreshCw, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [threshold, setThreshold] = useState(10);
  const [webhook, setWebhook] = useState('https://pos.alahapperuma.lk/sync');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Saving administrative settings configurations.');
  };

  return (
    <div className="font-outfit space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Store Administration Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Configure real-time sync thresholds and POS webhook integration endpoints.</p>
      </div>

      <Card className="border border-glassBorder p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <Input
            label="Low Stock Warning Limit Threshold"
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
          />

          <Input
            label="POS Synchronization Webhook Endpoint"
            type="text"
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
          />

          <div className="flex gap-3 border-t border-slate-800 pt-6">
            <Button type="submit" variant="primary">
              <Save size={16} /> Save Configurations
            </Button>
            <Button type="button" variant="secondary">
              <RefreshCw size={16} /> Test Connection
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
