'use client';

import React from 'react';
import { ShoppingCart, Search, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onNavigate: (tabId: string) => void;
  onGoHome: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onGoHome, cartCount }) => {
  return (
    <header className="w-full flex flex-col z-50 sticky top-0 font-sans">
      {/* Top Synchronized POS Banner */}
      <div className="w-full bg-[#1A1A1A] border-b border-gray-800 py-2.5 px-4 text-center flex items-center justify-center gap-2.5 text-xs text-gray-300 tracking-wide font-light">
        <RefreshCw size={12} className="animate-spin text-emerald-400" />
        <span>Real-time stock synchronization active with our showroom POS</span>
        <span className="inline-flex items-center gap-1.5 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-400 font-semibold text-[10px] uppercase tracking-widest">Connected</span>
        </span>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
        {/* Left: Brand Logotype */}
        <div 
          onClick={onGoHome} 
          className="flex items-center gap-3 cursor-pointer group"
          id="logo-brand"
        >
          {/* Minimalist Ceramic Tile Icon */}
          <div className="w-9 h-9 border-2 border-[#1A1A1A] flex items-center justify-center p-1 relative overflow-hidden transition-all duration-300 group-hover:bg-[#1A1A1A]">
            <div className="w-full h-full border border-dashed border-[#1A1A1A] group-hover:border-white transition-all duration-300 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#1A1A1A] group-hover:text-white transition-colors duration-300">A</span>
            </div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#D4C5B9]"></div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] md:text-[17px] tracking-[0.15em] text-[#1A1A1A] leading-none uppercase">
              Alahapperuma
            </span>
            <span className="font-normal text-[9px] tracking-[0.35em] text-gray-500 uppercase mt-0.5 leading-none">
              Trade Center
            </span>
          </div>
        </div>

        {/* Center: Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button 
            onClick={onGoHome} 
            className="text-xs font-semibold tracking-widest text-[#1A1A1A] uppercase border-b border-[#1A1A1A] pb-1 hover:opacity-80 transition"
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('products')} 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            Shop
          </button>
          <button 
            onClick={() => onNavigate('packages')} 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            Packages
          </button>
          <button 
            onClick={() => onNavigate('designer')} 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            3D Designer
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          {/* Search trigger */}
          <button className="text-gray-700 hover:text-[#1A1A1A] p-1.5 transition-colors relative group">
            <Search size={20} strokeWidth={1.8} />
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono text-gray-400 bg-gray-100 border border-gray-200 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              ⌘K
            </span>
          </button>

          {/* Cart Icon with badge */}
          <button 
            onClick={() => onNavigate('cart')} 
            className="text-gray-700 hover:text-[#1A1A1A] p-1.5 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#D4C5B9] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User profile dot */}
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden">
            <div className="w-3.5 h-3.5 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
