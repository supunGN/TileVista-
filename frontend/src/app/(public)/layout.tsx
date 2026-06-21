'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, RefreshCw, Phone, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();


  const isWorkspace = pathname === '/designer/room' || pathname === '/designer/bathroom';

  if (isWorkspace) {
    return <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">{children}</div>;
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Packages', href: '/packages' },
    { name: '3D Designer', href: '/designer' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">

      {/* 1. Top Contact Bar */}
      <div className="w-full bg-[#1A1A1A] border-b border-gray-800 py-2.5 px-6 md:px-12 flex items-center justify-center gap-6 text-[10.5px] text-gray-300 tracking-wide font-light flex-wrap">
        <span className="flex items-center gap-1.5">
          <Phone size={11} className="text-[#D4C5B9]" />
          <a href="tel:+94770834361" className="hover:text-white transition-colors">+94 77 083 4361</a>
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={11} className="text-[#D4C5B9]" />
          <span>Pannagamuwa, Weerawila, Hambantota, Sri Lanka</span>
        </span>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="w-full bg-white/60 backdrop-blur-xl shadow-sm border-b border-white/20 py-3.5 px-6 md:px-12 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left: Brand Logotype */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative overflow-hidden flex-shrink-0">
              <img src="/images/ui/logo.svg" alt="Alahapperuma Trade Center Logo" className="w-full h-full object-contain" />
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

          {/* Center: Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-semibold tracking-widest uppercase pb-1 transition-all ${active
                      ? 'text-[#1A1A1A] border-b border-[#1A1A1A]'
                      : 'text-gray-500 hover:text-[#1A1A1A] hover:border-b hover:border-gray-300'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
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
              <span className="absolute -top-1.5 -right-0.5 bg-[#D4C5B9] text-white text-[8px] font-bold rounded-[6px] w-[10px] h-[17px] flex items-center justify-center leading-none">
                1
              </span>
            </Link>

            {/* User profile Link */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-gray-500 font-light hidden sm:inline">
                  Hello, <span className="font-semibold text-[#1A1A1A]">{user.firstName || user.email.split('@')[0]}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-[9px] font-bold tracking-wider text-gray-400 hover:text-red-600 uppercase border border-gray-200 px-2.5 py-1.5 hover:border-red-200 transition-colors bg-[#F9F9F7]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
                aria-label="User Profile Login"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gray-400"></div>
              </Link>
            )}
          </div>
        </div>

      </header>

      {/* 3. Render Viewport Page Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-10 bg-white">
        {children}
      </main>

      {/* 4. Footer */}
      <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t border-gray-800 font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Row 1: Brand & Horizontal Nav Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-gray-800/80 gap-8">

            {/* Brand Logo Group */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative overflow-hidden flex-shrink-0 bg-white/10 p-1 rounded-sm">
                <img src="/images/ui/logo.svg" alt="Alahapperuma Trade Center Logo" className="w-full h-full object-contain" />
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-[14px] tracking-[0.15em] text-white leading-none uppercase">
                  Alahapperuma
                </span>
                <span className="font-light text-[8px] tracking-[0.35em] text-[#D4C5B9] uppercase mt-0.5 leading-none">
                  Trade Center
                </span>
              </div>
            </Link>

            {/* Quicklinks Map */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10.5px] font-semibold tracking-widest uppercase text-gray-400">
              <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
              <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
              <Link href="/designer" className="hover:text-white transition-colors">3D Designer</Link>
              <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
              <span className="opacity-60 cursor-not-allowed">FAQs</span>
              <span className="opacity-60 cursor-not-allowed">Privacy</span>
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
                <a href="tel:+94770834361" className="text-sm font-medium tracking-wide mt-1.5 hover:text-white transition-colors">
                  +94 77 083 4361
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
                  Pannagamuwa, Weerawila, <br />
                  Hambantota, Sri Lanka
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
    </div>
  );
}
