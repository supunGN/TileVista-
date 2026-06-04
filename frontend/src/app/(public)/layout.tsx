'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MapPin, ShoppingCart, Palette, LayoutGrid, Boxes, Home, Mail } from 'lucide-react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: <Home size={16} /> },
    { name: 'Products', href: '/products', icon: <LayoutGrid size={16} /> },
    { name: 'Packages', href: '/packages', icon: <Boxes size={16} /> },
    { name: '3D Designer', href: '/designer', icon: <Palette size={16} /> },
    { name: 'Contact', href: '/contact', icon: <Mail size={16} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-outfit">
      {/* 1. Top Contact Bar */}
      <div className="bg-indigo-950/80 border-b border-indigo-900/50 text-xs py-2 px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="flex items-center gap-1.5 text-indigo-200 font-medium">
          <SparklesIcon /> Premium Tile & Bathware Virtual Showroom
        </span>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1 text-indigo-300">
            <Phone size={12} /> +94 77 123 4567
          </span>
          <span className="flex items-center gap-1 text-indigo-300">
            <MapPin size={12} /> Colombo Road, Galle, Sri Lanka
          </span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="border-b border-glassBorder bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-white shadow-premium">
              T
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text">
              TileVista
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    active
                      ? 'bg-indigo-600 text-white shadow-premium'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Cart Status Indicator */}
          <Link
            href="/cart"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:border-indigo-500/40 rounded-xl text-sm font-semibold transition text-slate-200"
          >
            <ShoppingCart size={16} className="text-indigo-400" />
            <span>Cart</span>
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              1
            </span>
          </Link>
        </div>
      </header>

      {/* 3. Render Viewport Page */}
      <main className="flex-grow max-w-7xl w-full mx-auto pb-16 md:pb-0">{children}</main>

      {/* 4. Footer */}
      <footer className="border-t border-glassBorder bg-slate-950 py-12 px-6 mt-12 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-white font-extrabold text-lg">Alahapperuma Trade Centre</span>
            <span className="text-xs">Sri Lanka's elite tile and bathware importer.</span>
          </div>
          <div className="flex gap-6 text-xs font-semibold">
            <Link href="/login" className="hover:text-indigo-400 transition">
              Staff Admin Login
            </Link>
            <span>&copy; {new Date().getFullYear()} TileVista. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-indigo-400"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    </svg>
  );
}
