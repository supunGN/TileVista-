'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  LayoutGrid,
  ShoppingCart,
  Boxes,
  Palette,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';

// Import landing sections
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { About } from '../components/landing/About';
import { Categories } from '../components/landing/Categories';
import { CuratedPackages } from '../components/landing/CuratedPackages';
import { PlannerIntro } from '../components/landing/PlannerIntro';
import { ExperienceCenter } from '../components/landing/ExperienceCenter';
import { Footer } from '../components/landing/Footer';

// Import premium app feature modules
import AuthFeature from '../features/auth';
import ProductsFeature from '../features/products';
import CartFeature from '../features/cart';
import PackagesFeature from '../features/packages';
import DesignerFeature from '../features/designer';
import AnalyticsFeature from '../features/analytics';

export default function Home() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<string>('designer');
  const [cartCount, setCartCount] = useState<number>(1); // Mock cart items count start

  // Handle navigation into the interactive app workspace tabs
  const handleNavigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mock add to cart callback for packages
  const handleAddToCartPackage = (pkgId: string) => {
    setCartCount(prev => prev + 1);
    alert(`Successfully added curated package (${pkgId === 'pkg-minimalist-oasis' ? 'The Minimalist Oasis' : 'Classic Marble Luxury'}) to your shopping cart!`);
  };

  const tabs = [
    { id: 'designer', label: '3D Designer', icon: <Palette size={18} />, component: <DesignerFeature /> },
    { id: 'products', label: 'Catalogue', icon: <LayoutGrid size={18} />, component: <ProductsFeature /> },
    { id: 'cart', label: 'Cart', icon: <ShoppingCart size={18} />, component: <CartFeature /> },
    { id: 'packages', label: 'Packages', icon: <Boxes size={18} />, component: <PackagesFeature /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} />, component: <AnalyticsFeature /> },
    { id: 'auth', label: 'Sign In', icon: <Sparkles size={18} />, component: <AuthFeature /> },
  ];

  if (viewMode === 'landing') {
    return (
      <div className="bg-white min-h-screen text-[#1A1A1A] font-sans selection:bg-[#D4C5B9] selection:text-[#1A1A1A] overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar 
          onNavigate={handleNavigateToTab} 
          onGoHome={handleGoHome} 
          cartCount={cartCount} 
        />

        {/* Main Landing Sections */}
        <main>
          {/* Hero Widescreen Banner */}
          <Hero 
            onLaunchDesigner={() => handleNavigateToTab('designer')} 
            onExplorePackages={() => handleNavigateToTab('packages')} 
          />

          {/* About Section */}
          <About />

          {/* Catalog Categories Grid */}
          <Categories onSelectCategory={(catTag) => handleNavigateToTab('products')} />

          {/* Curated Package Suites Carousel */}
          <CuratedPackages 
            onVisualizePackage={(pkgId) => handleNavigateToTab('designer')} 
            onAddToCart={handleAddToCartPackage} 
          />

          {/* 3D Blueprint CAD Workspace Feature highlight */}
          <PlannerIntro onStartDesign={() => handleNavigateToTab('designer')} />

          {/* Matara Showroom Experience Center */}
          <ExperienceCenter />
        </main>

        {/* Footer */}
        <Footer 
          onNavigate={handleNavigateToTab} 
          onGoHome={handleGoHome} 
        />
      </div>
    );
  }

  // App Workspace view mode (polished theme style)
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">
      {/* Top Header Workspace Shell */}
      <header className="border-b border-glassBorder bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Return back to landing */}
          <div 
            onClick={handleGoHome} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
              <ArrowLeft size={16} />
            </div>
            
            <div className="flex flex-col">
              <span className="font-extrabold text-[12px] md:text-[13px] tracking-[0.15em] text-white leading-none uppercase">
                Alahapperuma
              </span>
              <span className="font-light text-[7.5px] tracking-[0.35em] text-[#D4C5B9] uppercase mt-0.5 leading-none">
                Trade Center
              </span>
            </div>
          </div>

          {/* Navigation Tab Pills */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-[#D4C5B9] text-[#1A1A1A] shadow-premium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Quick Stats indicator inside the active shell */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
              POS SYNCHRONIZED
            </span>
          </div>
        </div>
      </header>

      {/* Main Feature viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto pb-16 lg:pb-0">
        {tabs.find((t) => t.id === activeTab)?.component}
      </main>

      {/* Mobile Sticky Navigation Tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-t border-glassBorder px-4 py-2 flex justify-around overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-semibold min-w-16 ${
              activeTab === tab.id ? 'text-[#D4C5B9]' : 'text-slate-400'
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
