'use client';

import React, { useState } from 'react';
import { Card } from '@tilevista/ui';
import {
  Sparkles,
  LayoutGrid,
  ShoppingCart,
  ReceiptText,
  Boxes,
  Palette,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

// Import all premium feature modules
import AuthFeature from '../features/auth';
import ProductsFeature from '../features/products';
import CartFeature from '../features/cart';
import OrdersFeature from '../features/orders';
import PackagesFeature from '../features/packages';
import DesignerFeature from '../features/designer';
import AnalyticsFeature from '../features/analytics';
import AdminFeature from '../features/admin';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('designer');

  const tabs = [
    { id: 'designer', label: '3D Designer', icon: <Palette size={18} />, component: <DesignerFeature /> },
    { id: 'products', label: 'Catalogue', icon: <LayoutGrid size={18} />, component: <ProductsFeature /> },
    { id: 'cart', label: 'Cart', icon: <ShoppingCart size={18} />, component: <CartFeature /> },
    { id: 'orders', label: 'Orders', icon: <ReceiptText size={18} />, component: <OrdersFeature /> },
    { id: 'packages', label: 'Packages', icon: <Boxes size={18} />, component: <PackagesFeature /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} />, component: <AnalyticsFeature /> },
    { id: 'admin', label: 'Admin Portal', icon: <ShieldCheck size={18} />, component: <AdminFeature /> },
    { id: 'auth', label: 'Sign In', icon: <Sparkles size={18} />, component: <AuthFeature /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-outfit">
      {/* Top Header */}
      <header className="border-b border-glassBorder bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-white shadow-premium">
              T
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text">
              TileVista
            </span>
          </div>

          {/* Navigation Tab Pills */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-premium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Feature viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto">
        {tabs.find((t) => t.id === activeTab)?.component}
      </main>

      {/* Mobile Sticky Navigation Tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-t border-glassBorder px-4 py-2 flex justify-around overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-semibold min-w-16 ${
              activeTab === tab.id ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            {tab.icon}
            <span className="scale-[0.85]">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
