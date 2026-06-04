'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { formatCurrency } from '../../../utils';
import { FileText, ClipboardCheck, ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quotationId, setQuotationId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = Math.floor(10000 + Math.random() * 90000);
    setQuotationId(`QT-${randomRef}-LK`);
  };

  if (quotationId) {
    return (
      <div className="py-12 px-6 flex justify-center font-outfit">
        <Card className="w-full max-w-lg p-8 border border-emerald-500/20 shadow-premium bg-slate-900/40 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck size={32} />
          </div>

          <h2 className="text-3xl font-extrabold text-white">Quotation Generated!</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            Your quotation request has been logged successfully inside the showroom database.
          </p>

          <div className="my-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
              Showroom Reference ID
            </span>
            <span className="text-3xl font-mono font-extrabold text-indigo-400 mt-2 block tracking-widest">
              {quotationId}
            </span>
          </div>

          <div className="space-y-4 text-sm text-slate-300 text-left border-t border-slate-800 pt-6">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Customer Name</span>
              <span className="font-bold text-white">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Phone Number</span>
              <span className="font-bold text-white">{phone}</span>
            </div>
          </div>

          <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-xl text-xs text-indigo-300 leading-relaxed text-left mt-6">
            💡 **What is next?** Take a screenshot of this page or note down the Reference ID and present it to our staff at the **Alahapperuma Trade Centre showroom in Galle** to finalize your purchase.
          </div>

          <div className="mt-8 flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => window.print()}>
              <Printer size={16} /> Print
            </Button>
            <Link href="/" className="flex-grow">
              <Button variant="primary" className="w-full">
                Return to Showroom
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 flex justify-center font-outfit">
      <Card className="w-full max-w-md p-8 border border-glassBorder shadow-premium bg-slate-900/40">
        <div className="mb-6">
          <Link href="/cart" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-4">
            <ArrowLeft size={12} /> Back to Cart
          </Link>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="text-indigo-400" size={22} /> Showroom Reference
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Provide details to lock in your design items and quotation summary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Your Full Name"
            placeholder="Supun Gunasinghe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+94 77 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" variant="primary">
            Generate Showroom Quotation
          </Button>
        </form>
      </Card>
    </div>
  );
}
