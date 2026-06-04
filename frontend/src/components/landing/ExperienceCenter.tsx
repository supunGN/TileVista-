'use client';

import React from 'react';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

export const ExperienceCenter: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stylized Vector/SVG Location Map */}
          <div className="lg:col-span-6 relative w-full h-[320px] md:h-[380px] bg-slate-50 border border-gray-200 overflow-hidden shadow-sm flex items-center justify-center p-4">
            
            {/* Stylized Minimalist Map Design using SVG */}
            <div className="absolute inset-0 z-0 opacity-40">
              <svg className="w-full h-full text-gray-200" viewBox="0 0 200 200" fill="none">
                {/* Land masses or water contour */}
                <path d="M 0,0 L 200,0 L 200,140 Q 150,130 110,160 T 0,180 Z" fill="#f8fafc" />
                <path d="M 0,180 Q 110,160 110,160 T 200,140 L 200,200 L 0,200 Z" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1" /> {/* Sea area */}
                
                {/* Roads */}
                {/* Nilwala Ganga / River representation */}
                <path d="M 130,0 Q 120,40 100,80 T 70,160 T 50,200" stroke="#bae6fd" strokeWidth="8" fill="none" opacity="0.6" />
                
                {/* Major Highways / Arterials */}
                <line x1="0" y1="50" x2="200" y2="130" stroke="#f1f5f9" strokeWidth="10" />
                <line x1="0" y1="50" x2="200" y2="130" stroke="#cbd5e1" strokeWidth="3" />
                
                <line x1="120" y1="0" x2="120" y2="200" stroke="#f1f5f9" strokeWidth="8" />
                <line x1="120" y1="0" x2="120" y2="200" stroke="#cbd5e1" strokeWidth="2.5" />
                
                {/* Coastal Road (Anagarika Dharmapala Mawatha) */}
                <path d="M 0,150 Q 80,140 120,135 T 200,110" stroke="#f8fafc" strokeWidth="9" fill="none" />
                <path d="M 0,150 Q 80,140 120,135 T 200,110" stroke="#94a3b8" strokeWidth="2" fill="none" />

                {/* Grid coordinates */}
                <line x1="40" y1="0" x2="40" y2="200" stroke="#f1f5f9" strokeWidth="0.5" />
                <line x1="80" y1="0" x2="80" y2="200" stroke="#f1f5f9" strokeWidth="0.5" />
                <line x1="160" y1="0" x2="160" y2="200" stroke="#f1f5f9" strokeWidth="0.5" />
                <line x1="0" y1="80" x2="200" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Map UI overlays */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-100 p-2.5 shadow-sm text-[9px] font-mono text-gray-500 z-10">
              <span className="font-bold text-[#1A1A1A]">Matara, Sri Lanka</span>
              <div className="mt-0.5">Coords: 5.9496° N, 80.5469° E</div>
            </div>

            {/* Map Pin Locator */}
            <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group">
              {/* Radar pulse rings */}
              <span className="absolute w-10 h-10 rounded-full bg-red-500/25 animate-ping border border-red-500/10"></span>
              <span className="absolute w-5 h-5 rounded-full bg-red-500/30 animate-pulse"></span>
              
              {/* Pin Icon */}
              <MapPin size={32} className="text-red-600 drop-shadow-md relative transform group-hover:-translate-y-0.5 transition-transform" fill="currentColor" />
              
              {/* Locator Badge */}
              <div className="mt-2 bg-[#1A1A1A] text-white text-[9.5px] font-semibold tracking-wide uppercase px-3 py-1.5 shadow-md flex flex-col items-center whitespace-nowrap border border-gray-800">
                <span className="text-[#D4C5B9]">Alahapperuma</span>
                <span className="text-[7.5px] text-gray-400 font-normal tracking-[0.2em] leading-none mt-0.5">Trade Center</span>
              </div>
            </div>
            
            {/* Map zoom utility buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-10">
              <button className="w-6 h-6 bg-white border border-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs hover:bg-gray-50 shadow-sm">+</button>
              <button className="w-6 h-6 bg-white border border-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs hover:bg-gray-50 shadow-sm">-</button>
            </div>
          </div>

          {/* Right Column: Experience Details & Contact Map */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase mb-2 block leading-none">
                LOCATION & SHOWROOM
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                Visit Our Experience Center
              </h2>
            </div>
            
            <p className="text-sm text-gray-500 font-light leading-relaxed tracking-wide">
              Consult with our specialists to plan and organize your material inventory in real-time. Access the digital catalogue, inspect visual settings with our physical stock, and ensure your design is ready for delivery. Let us help you calculate tile volumes, configure structural layouts, and review layout options.
            </p>

            {/* List entries with custom styling */}
            <div className="w-full flex flex-col gap-4 border-t border-gray-100 pt-6">
              
              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-50 border border-gray-150 text-[#1A1A1A]">
                  <Clock size={16} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Working Hours</span>
                  <span className="text-sm text-[#1A1A1A] font-medium tracking-wide mt-0.5">
                    Mon - Sat: 8:00 AM - 5:30 PM
                  </span>
                  <span className="text-xs text-gray-400 font-light mt-0.5">Closed on Sundays and Poya holidays</span>
                </div>
              </div>

              {/* Showroom Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-50 border border-gray-150 text-[#1A1A1A]">
                  <MapPin size={16} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Showroom Address</span>
                  <span className="text-sm text-[#1A1A1A] font-medium tracking-wide mt-0.5">
                    No 120, Anagarika Dharmapala Mawatha, Matara
                  </span>
                  <span className="text-xs text-gray-400 font-light mt-0.5">Matara High Street, Sri Lanka</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
