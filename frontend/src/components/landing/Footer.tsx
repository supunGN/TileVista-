'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onGoHome }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Row 1: Brand & Horizontal Nav Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-gray-800/80 gap-8">
          
          {/* Brand Logo Group */}
          <div onClick={onGoHome} className="flex items-center gap-3 cursor-pointer group">
            {/* Minimalist Ceramic Tile Icon in white/sand */}
            <div className="w-8 h-8 border-2 border-white/60 flex items-center justify-center p-1 relative overflow-hidden transition-all duration-300 group-hover:border-[#D4C5B9]">
              <div className="w-full h-full border border-dashed border-white/30 group-hover:border-[#D4C5B9]/60 transition-all duration-300 flex items-center justify-center">
                <span className="text-[9px] font-bold text-white group-hover:text-[#D4C5B9] transition-colors duration-300">A</span>
              </div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#D4C5B9]"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-[14px] tracking-[0.15em] text-white leading-none uppercase">
                Alahapperuma
              </span>
              <span className="font-light text-[8px] tracking-[0.35em] text-[#D4C5B9] uppercase mt-0.5 leading-none">
                Trade Center
              </span>
            </div>
          </div>

          {/* Quicklinks Map */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10.5px] font-semibold tracking-widest uppercase text-gray-400">
            <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">Shop</button>
            <button onClick={() => onNavigate('packages')} className="hover:text-white transition-colors">Packages</button>
            <button onClick={() => onNavigate('designer')} className="hover:text-white transition-colors">3D Designer</button>
            <button onClick={() => onNavigate('cart')} className="hover:text-white transition-colors">Cart</button>
            <button className="hover:text-white transition-colors cursor-not-allowed opacity-60">FAQs</button>
            <button className="hover:text-white transition-colors cursor-not-allowed opacity-60">Privacy</button>
          </nav>
        </div>

        {/* Row 2: Contact Info Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-gray-800/80 text-gray-300">
          
          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 border border-white/10 text-[#D4C5B9] mt-0.5">
              <Phone size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Showroom Phone</span>
              <a href="tel:+94412223456" className="text-sm font-medium tracking-wide mt-1.5 hover:text-white transition-colors">
                +94 41 222 3456
              </a>
              <span className="text-[10px] text-gray-500 font-light mt-0.5">Available during working hours</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 border border-white/10 text-[#D4C5B9] mt-0.5">
              <Mail size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Email Inquiry</span>
              <a href="mailto:info@alahapperumatrade.com" className="text-sm font-medium tracking-wide mt-1.5 hover:text-white transition-colors">
                info@alahapperumatrade.com
              </a>
              <span className="text-[10px] text-gray-500 font-light mt-0.5">Response within 24 business hours</span>
            </div>
          </div>

          {/* Full Address */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 border border-white/10 text-[#D4C5B9] mt-0.5">
              <MapPin size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Postal Address</span>
              <span className="text-sm font-medium tracking-wide mt-1.5 leading-relaxed">
                No 120, Anagarika Dharmapala Mawatha, <br />
                Matara, Sri Lanka
              </span>
            </div>
          </div>

        </div>

        {/* Row 3: Copy copyrights & developer link */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[10px] text-gray-500 tracking-wide font-light gap-4">
          <span>
            © 2026 Alahapperuma Trade Center. All rights reserved.
          </span>
          <span className="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <span className="font-semibold text-gray-400">VSD Group</span>
          </span>
        </div>

      </div>
    </footer>
  );
};
