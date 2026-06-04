'use client';

import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CuratedPackagesProps {
  onVisualizePackage: (packageId: string) => void;
  onAddToCart: (packageId: string) => void;
}

export const CuratedPackages: React.FC<CuratedPackagesProps> = ({ onVisualizePackage, onAddToCart }) => {
  const packages = [
    {
      id: 'pkg-minimalist-oasis',
      name: 'The Minimalist Oasis',
      description: 'A warm, Scandinavian-inspired bathroom retreat. Featuring textured warm sand porcelain slabs, premium matte black water controllers, and a floating natural oak washbasin vanity.',
      discountPrice: 450000,
      originalPrice: 550000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
      badge: 'Scandinavian Functional'
    },
    {
      id: 'pkg-classic-marble',
      name: 'Classic Marble Luxury',
      description: 'Opulence defined by grand Italian Statuario marble panels, double undermount porcelain sinks, gold-plated hardware, and a freestanding oval acrylic soaking bathtub.',
      discountPrice: 750000,
      originalPrice: 880000,
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800',
      badge: 'Premium Luxury'
    }
  ];

  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK')}`;
  };

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans">
        
        {/* Header Title with View All Link */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase mb-2 block">
              PRE-DESIGNED SUITES
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
              Curated Bathroom Packages
            </h2>
          </div>
          
          <button 
            onClick={() => onVisualizePackage('pkg-minimalist-oasis')} 
            className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase border-b border-[#1A1A1A] pb-0.5 hover:opacity-75 transition-all"
          >
            <span>VIEW ALL</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* 2-Column Package Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Product Setup Image Banner */}
              <div className="relative w-full h-[260px] md:h-[320px] bg-gray-100 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-103"
                  style={{ backgroundImage: `url('${pkg.image}')` }}
                />
                
                {/* Accent Tag */}
                <div className="absolute top-4 left-4 z-10 bg-[#1A1A1A] text-[#D4C5B9] font-semibold text-[9px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1.5">
                  <Sparkles size={10} />
                  <span>{pkg.badge}</span>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-[#1A1A1A] tracking-wide mb-3">
                  {pkg.name}
                </h3>
                
                <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed tracking-wide mb-6 flex-1">
                  {pkg.description}
                </p>

                {/* Pricing section */}
                <div className="border-t border-gray-100 pt-6 mb-6 flex flex-col items-start gap-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#D4C5B9] uppercase">LKR Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl md:text-2xl font-bold text-red-600">
                      {formatLKR(pkg.discountPrice)}
                    </span>
                    <span className="text-xs md:text-sm text-gray-400 line-through">
                      {formatLKR(pkg.originalPrice)}
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  <button 
                    onClick={() => onVisualizePackage(pkg.id)}
                    className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-semibold text-xs tracking-wider uppercase py-3.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Visualize in 3D Canvas</span>
                  </button>
                  <button 
                    onClick={() => onAddToCart(pkg.id)}
                    className="w-full border border-gray-300 hover:border-[#1A1A1A] hover:bg-gray-50 text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase py-3.5 transition-all duration-300"
                  >
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
