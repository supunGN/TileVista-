'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Import landing sections
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { About } from '../components/landing/About';
import { Categories } from '../components/landing/Categories';
import { CuratedPackages } from '../components/landing/CuratedPackages';
import { PlannerIntro } from '../components/landing/PlannerIntro';
import { ExperienceCenter } from '../components/landing/ExperienceCenter';
import { Footer } from '../components/landing/Footer';
import { useCart } from '../features/cart/hooks/useCart';

export default function Home() {
  const router = useRouter();
  const { items } = useCart();

  const handleAddToCartPackage = (pkgId: string) => {
    alert(`Package additions will be enabled in the next sprint.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">
      {/* Navigation Bar */}
      <Navbar 
        cartCount={items.length} 
      />

      {/* Main Landing Sections */}
      <main>
        {/* Hero Widescreen Banner */}
        <Hero 
          onLaunchDesigner={() => router.push('/designer')} 
          onExplorePackages={() => router.push('/packages')}
          onExploreTiles={() => router.push('/products/tiles')}
          onBrowseProducts={() => router.push('/products/tiles')}
        />

        {/* About Section */}
        <About />

        {/* Catalog Categories Grid */}
        <Categories onSelectCategory={(categoryId) => router.push(`/products/${categoryId}`)} />

        {/* Curated Package Suites Carousel */}
        <CuratedPackages 
          onVisualizePackage={(pkgId) => router.push(`/designer?package=${pkgId}`)} 
          onAddToCart={handleAddToCartPackage} 
        />

        {/* 3D Blueprint CAD Workspace Feature highlight */}
        <PlannerIntro onStartDesign={() => router.push('/designer')} />

        {/* Matara Showroom Experience Center */}
        <ExperienceCenter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
