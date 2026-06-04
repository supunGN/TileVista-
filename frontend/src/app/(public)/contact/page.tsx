'use client';

import React from 'react';
import { Card } from '../../../components/Card';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

export default function ContactPage() {
  const contacts = [
    { label: 'Telephone hotline', val: '+94 77 123 4567', icon: <Phone className="text-indigo-400" size={20} /> },
    { label: 'E-mail support', val: 'support@tilevista.com', icon: <Mail className="text-indigo-400" size={20} /> },
    { label: 'Galle Showroom location', val: 'Colombo Road, Galle, Sri Lanka', icon: <MapPin className="text-indigo-400" size={20} /> },
    { label: 'Operating hours', val: 'Monday - Saturday: 8:00 AM - 6:00 PM', icon: <Clock className="text-indigo-400" size={20} /> },
  ];

  return (
    <div className="py-12 px-6 font-outfit max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Alahapperuma Trade Centre</h1>
        <p className="text-sm text-slate-400 mt-1">Visit our physical showroom to inspect our inventory and finalize visual quotations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c, idx) => (
          <Card key={idx} className="border border-glassBorder p-6 flex gap-4 items-center bg-slate-900/10">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
              {c.icon}
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{c.label}</span>
              <span className="font-bold text-white text-base mt-0.5 block">{c.val}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border border-glassBorder p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Showroom Interactive Map</h3>
          <p className="text-xs text-slate-400 mb-6">Locate our building on Colombo Road, Galle.</p>
        </div>
        <div className="w-full h-64 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-600 text-sm font-semibold">
          [ Location Map Embed Placeholder ]
        </div>
      </Card>
    </div>
  );
}
