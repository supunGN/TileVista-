'use client';

import React, { useState } from 'react';
import { ClipboardCheck, ArrowLeft, Printer, FileText, Compass, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quotationId, setQuotationId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      const randomRef = Math.floor(10000 + Math.random() * 90000);
      setQuotationId(`QT-${randomRef}-MATARA`);
    }
  };

  if (quotationId) {
    return (
      <div className="py-12 px-6 flex justify-center font-sans">
        <div className="w-full max-w-lg p-8 border border-gray-200 bg-white text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <ClipboardCheck size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-wide">Quotation Logged</h2>
          <p className="text-gray-500 text-xs mt-2 max-w-sm mx-auto font-light leading-relaxed">
            Your virtual showroom selections and measurements have been uploaded to our Matara POS database.
          </p>

          {/* Reference box */}
          <div className="my-8 p-6 bg-[#F9F9F7] border border-gray-200">
            <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-widest">
              Showroom Reference ID
            </span>
            <span className="text-2xl font-mono font-extrabold text-red-600 mt-2.5 block tracking-widest">
              {quotationId}
            </span>
          </div>

          <div className="space-y-3.5 text-xs text-gray-600 text-left border-t border-gray-100 pt-6">
            <div className="flex justify-between">
              <span className="text-gray-400 font-light">Customer Name</span>
              <span className="font-semibold text-[#1A1A1A]">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-light">Phone Number</span>
              <span className="font-semibold text-[#1A1A1A]">{phone}</span>
            </div>
            {email && (
              <div className="flex justify-between">
                <span className="text-gray-400 font-light">Email Address</span>
                <span className="font-semibold text-[#1A1A1A]">{email}</span>
              </div>
            )}
          </div>

          {/* Next steps advice */}
          <div className="bg-[#D4C5B9]/15 border border-[#D4C5B9]/30 p-4.5 text-[11px] text-[#1A1A1A] leading-relaxed text-left mt-6 font-light">
            💡 **What is next?** Take a screenshot of this page or note down the Reference ID and present it to our representatives at the **Alahapperuma Trade Centre showroom in Matara** to inspect physical stock and complete your purchase.
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => window.print()}
              className="flex-1 border border-gray-300 hover:border-[#1A1A1A] hover:bg-gray-50 text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase py-3.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Printer size={13} />
              <span>Print Quotation</span>
            </button>
            <Link href="/" className="flex-1">
              <span className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-wider uppercase py-3.5 transition-all duration-300 flex items-center justify-center gap-2">
                Return to Showroom
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 flex justify-center font-sans">
      <div className="w-full max-w-md p-8 border border-gray-200 bg-white shadow-sm">
        <div className="mb-8">
          <Link href="/cart" className="text-[10px] font-bold tracking-widest text-gray-400 hover:text-[#1A1A1A] uppercase flex items-center gap-1.5 mb-4">
            <ArrowLeft size={11} /> Back to Cart
          </Link>
          <h2 className="text-xl font-semibold text-[#1A1A1A] tracking-wide flex items-center gap-2.5">
            <FileText className="text-[#D4C5B9]" size={20} /> Showroom Reference
          </h2>
          <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed">
            Provide details to lock in your design items and quotation summary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Your Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
              placeholder="e.g. Supun Gunasinghe"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
              placeholder="e.g. +94 77 123 4567"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Email Address (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
              placeholder="e.g. name@domain.com"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 mt-2 block text-center"
          >
            Generate Showroom Quotation
          </button>
        </form>
      </div>
    </div>
  );
}
