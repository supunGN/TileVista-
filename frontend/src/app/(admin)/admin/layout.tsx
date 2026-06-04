'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminGuard } from '../../../features/auth/AdminGuard';
import { useAuth } from '../../../features/auth/AuthContext';
import {
  LayoutDashboard,
  Receipt,
  Warehouse,
  LineChart,
  Grid3X3,
  Settings as SettingsIcon,
  LogOut,
  User,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={16} /> },
    { name: 'Orders', href: '/admin/orders', icon: <Receipt size={16} /> },
    { name: 'Inventory', href: '/admin/inventory', icon: <Warehouse size={16} /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <LineChart size={16} /> },
    { name: 'Packages', href: '/admin/packages', icon: <Grid3X3 size={16} /> },
    { name: 'Settings', href: '/admin/settings', icon: <SettingsIcon size={16} /> },
  ];

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#F9F9F7] text-[#1A1A1A] font-sans overflow-hidden selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">
        
        {/* 1. Admin Sidebar (Matte Off-Black) */}
        <aside className="hidden md:flex flex-col w-64 bg-[#1A1A1A] text-white border-r border-gray-800">
          
          {/* Logo Branding */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-850">
            {/* Minimalist Ceramic Tile Icon in white/sand */}
            <div className="w-8 h-8 border-2 border-[#D4C5B9] flex items-center justify-center p-1 relative overflow-hidden">
              <div className="w-full h-full border border-dashed border-[#D4C5B9]/60 flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#D4C5B9]">A</span>
              </div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#D4C5B9]"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-extrabold text-[12px] tracking-[0.15em] text-white leading-none uppercase">
                Alahapperuma
              </span>
              <span className="font-normal text-[8px] tracking-[0.25em] text-[#D4C5B9] uppercase mt-0.5 leading-none">
                Showroom OS
              </span>
            </div>
          </div>

          {/* Links View */}
          <nav className="flex-1 px-4 py-6 space-y-1.5">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                    active
                      ? 'bg-[#D4C5B9] text-[#1A1A1A]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout controls */}
          <div className="p-4 border-t border-gray-850">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-xs font-semibold tracking-widest uppercase text-red-400 hover:bg-red-500/5 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout Session</span>
            </button>
          </div>
        </aside>

        {/* 2. Main content viewport */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <header className="h-16 border-b border-gray-200 bg-white/95 backdrop-blur-md flex items-center justify-between px-6">
            
            {/* Mobile Brand indicator */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="w-7 h-7 border border-[#1A1A1A] flex items-center justify-center text-[9px] font-bold text-[#1A1A1A]">
                A
              </div>
              <span className="font-bold text-xs tracking-wider text-[#1A1A1A] uppercase">Showroom OS</span>
            </div>

            {/* Breadcrumbs label */}
            <div className="hidden md:block">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Store Console / {pathname.split('/').pop()}
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-[#1A1A1A] block">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-[8px] text-[#D4C5B9] font-bold uppercase tracking-widest block mt-0.5">
                  {user?.role} Access
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 border border-gray-200 flex items-center justify-center text-gray-500">
                <User size={16} />
              </div>
            </div>
          </header>

          {/* Viewport content */}
          <main className="flex-grow overflow-y-auto p-8 bg-[#F9F9F7]/60">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
