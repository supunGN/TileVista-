'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Phone, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  return (
    <header className="w-full flex flex-col z-50 sticky top-0 font-sans">
      {/* Top Contact Bar */}
      <div className="w-full bg-[#1A1A1A] border-b border-gray-800 py-2.5 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10.5px] text-gray-300 tracking-wide font-light">
        <span className="flex items-center gap-1.5 text-gray-400">
          Premium Tile & Bathware Showroom
        </span>
        <div className="flex gap-5 items-center flex-wrap justify-center">
          <span className="flex items-center gap-1.5">
            <Phone size={11} className="text-[#D4C5B9]" />
            <a href="tel:+94412223456" className="hover:text-white transition-colors">+94 41 222 3456</a>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={11} className="text-[#D4C5B9]" />
            <span>No 120, Anagarika Dharmapala Mawatha, Matara</span>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
        {/* Left: Brand Logotype */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
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
        </Link>

        {/* Center: Hyperlinked Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link 
            href="/" 
            className="text-xs font-semibold tracking-widest text-[#1A1A1A] uppercase border-b border-[#1A1A1A] pb-1 hover:opacity-80 transition"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            Shop
          </Link>
          <Link 
            href="/packages" 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            Packages
          </Link>
          <Link 
            href="/designer" 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            3D Designer
          </Link>
          <Link 
            href="/contact" 
            className="text-xs font-semibold tracking-widest text-gray-500 uppercase pb-1 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          {/* Search trigger */}
          <button className="text-gray-700 hover:text-[#1A1A1A] p-1.5 transition-colors relative group">
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Cart Icon with badge */}
          <Link 
            href="/cart" 
            className="text-gray-700 hover:text-[#1A1A1A] p-1.5 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#D4C5B9] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User profile dot */}
          <Link 
            href="/login"
            className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-gray-400"></div>
          </Link>
        </div>
      </div>
    </header>
  );
};
