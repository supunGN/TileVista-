'use client';

import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroProps {
  onLaunchDesigner: () => void;
  onExplorePackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchDesigner, onExplorePackages }) => {
  return (
    <section className="relative w-full h-[580px] md:h-[680px] flex items-center justify-start overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with elegant overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      {/* Dark luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      
      {/* Editorial Content */}
      <div className="relative max-w-7xl w-full mx-auto px-6 md:px-12 z-10 text-white flex flex-col items-start gap-6 font-sans">
        
        {/* Subtle Sand Accent Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4C5B9]/15 border border-[#D4C5B9]/20 text-[#D4C5B9] text-[10px] font-bold uppercase tracking-[0.25em] leading-none">
          <Compass size={11} />
          <span>VIRTUAL SHOWROOM EXPERIENCE</span>
        </div>

        {/* High-Impact Sprawling Typography Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight max-w-2xl leading-[1.1] md:leading-[1.08] mt-2">
          Crafting Your Dream, <br />
          <span className="font-semibold text-white">One Tile at a Time.</span>
        </h1>

        {/* Informative elegant subheader */}
        <p className="text-sm md:text-base text-gray-300 tracking-wide font-light max-w-xl leading-relaxed">
          Experience the future of interior design with our real-time 3D planner and curated luxury collections. Customize layouts, preview combinations, and synchronize orders.
        </p>

        {/* Luxury CTA Button Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 w-full sm:w-auto">
          {/* Accent Sand Filled Button */}
          <button 
            onClick={onLaunchDesigner}
            className="group flex items-center justify-center gap-2.5 bg-[#D4C5B9] text-[#1A1A1A] font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-none hover:bg-[#C5B4A6] active:scale-98 transition-all duration-300"
          >
            <span>Launch 3D Planner</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Outline Wireframe Button */}
          <button 
            onClick={onExplorePackages}
            className="flex items-center justify-center gap-2 border border-white/60 text-white font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-none hover:bg-white hover:text-[#1A1A1A] hover:border-white active:scale-98 transition-all duration-300"
          >
            <span>View Showroom Packages</span>
          </button>
        </div>
      </div>

      {/* Decorative vertical coordinates overlay (Scandinavian aesthetic) */}
      <div className="absolute right-6 bottom-12 hidden lg:flex flex-col items-end gap-1.5 text-white/20 text-[9px] tracking-widest font-mono select-none pointer-events-none">
        <span>LAT: 5.9549° N</span>
        <span>LON: 80.5550° E</span>
        <span>MATARA, SRI LANKA</span>
      </div>
    </section>
  );
};
