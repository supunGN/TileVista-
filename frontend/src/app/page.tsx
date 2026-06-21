'use client';

import React, { useState } from 'react';
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

export default function Home() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState<number>(1); // Mock cart count

  const handleAddToCartPackage = (pkgId: string) => {
    setCartCount(prev => prev + 1);
    alert(`Successfully added curated package (${pkgId === 'pkg-minimalist-oasis' ? 'The Minimalist Oasis' : 'Classic Marble Luxury'}) to your shopping cart!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">
      {/* Navigation Bar */}
      <Navbar 
        cartCount={cartCount} 
      />

      {/* Main Landing Sections */}
      <main>
        {/* Hero Widescreen Banner */}
        <Hero 
          onLaunchDesigner={() => router.push('/designer')} 
          onExplorePackages={() => router.push('/packages')}
          onExploreTiles={() => router.push('/products?category=tiles')}
          onBrowseProducts={() => router.push('/products')}
        />

        {/* About Section */}
        <About />

        {/* Catalog Categories Grid */}
        <Categories onSelectCategory={(catTag) => router.push('/products')} />

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
