'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Clock, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { ExperienceCenter } from '../../../components/landing/ExperienceCenter';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const contacts = [
    { label: 'Hotline Contact', val: '+94 41 222 3456', icon: <Phone size={18} /> },
    { label: 'Official Email', val: 'info@alahapperumatrade.com', icon: <Mail size={18} /> },
    { label: 'Showroom Location', val: 'No 120, Anagarika Dharmapala Mawatha, Matara', icon: <MapPin size={18} /> },
    { label: 'Operating Hours', val: 'Mon - Sat: 8:00 AM - 5:30 PM', icon: <Clock size={18} /> },
  ];

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Title */}
      <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A]">
            Contact Our Showroom
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Reach out to our specialists to check material inventory, inquire about imported collections, or request specific 3D customizer references.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Premium Contact Inquiry Form */}
        <div className="lg:col-span-7 bg-[#F9F9F7] p-8 border border-gray-200/40">
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Send An Inquiry</h2>
          
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 flex flex-col items-center text-center gap-3">
              <CheckCircle size={32} className="text-emerald-500" />
              <h3 className="font-bold text-sm tracking-wide uppercase">Message Sent Successfully</h3>
              <p className="text-xs font-light text-emerald-700 max-w-md leading-relaxed">
                Thank you for contacting Alahapperuma Trade Center. A showroom representative will review your request and get back to you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:opacity-75"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
                  placeholder="Order Inquiry / Technical Support / 3D Layout Help"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors resize-none"
                  placeholder="Detail your request, tile models, basin selections or bathroom dimensions here..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase px-8 py-3.5 flex items-center justify-center gap-2.5 transition-all duration-300"
              >
                <span>Submit Inquiry</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Key Contacts Grid */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4">
            {contacts.map((c, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200/50 p-6 flex gap-4 items-center bg-white shadow-sm"
              >
                <div className="p-3 bg-gray-50 border border-gray-150 text-[#1A1A1A]">
                  {c.icon}
                </div>
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">{c.label}</span>
                  <span className="font-semibold text-[#1A1A1A] text-sm mt-1.5 block">{c.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reusable ExperienceCenter layout section (Map component) */}
      <ExperienceCenter />

    </div>
  );
}
