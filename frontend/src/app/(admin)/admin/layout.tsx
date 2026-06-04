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
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Orders', href: '/admin/orders', icon: <Receipt size={18} /> },
    { name: 'Inventory', href: '/admin/inventory', icon: <Warehouse size={18} /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <LineChart size={18} /> },
    { name: 'Packages', href: '/admin/packages', icon: <Grid3X3 size={18} /> },
    { name: 'Settings', href: '/admin/settings', icon: <SettingsIcon size={18} /> },
  ];

  return (
    <AdminGuard>
      <div className="flex h-screen bg-slate-950 text-slate-100 font-outfit overflow-hidden">
        {/* 1. Admin Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-glassBorder">
          {/* Logo Branding */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-glassBorder">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-white">
              T
            </div>
            <span className="font-extrabold text-lg text-white tracking-wide">
              Showroom OS
            </span>
          </div>

          {/* Links View */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    active
                      ? 'bg-indigo-600 text-white shadow-premium'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout controls */}
          <div className="p-4 border-t border-glassBorder">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition"
            >
              <LogOut size={18} />
              Logout Session
            </button>
          </div>
        </aside>

        {/* 2. Main content viewport */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <header className="h-16 border-b border-glassBorder bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-6">
            <div className="flex items-center gap-3 md:hidden">
              <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                T
              </div>
              <span className="font-extrabold text-sm text-white">Showroom OS</span>
            </div>

            <div className="hidden md:block">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Store Console / {pathname.split('/').pop()}
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-sm font-bold text-white block">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                  {user?.role} Access
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <User size={18} />
              </div>
            </div>
          </header>

          {/* Viewport content */}
          <main className="flex-grow overflow-y-auto p-6 bg-slate-950/20">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
