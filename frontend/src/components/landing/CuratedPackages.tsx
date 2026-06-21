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
      id: 'pkg-essential-comfort',
      name: 'Essential Comfort Package',
      description: 'A practical and affordable bathroom solution designed for modern homes. This package combines durable tiles with essential bathroom fixtures to create a clean and functional space.',
      includedElements: [
        'Light Beige Floor Tiles (600×600mm) — 45 sq.m',
        'Soft Ivory Wall Tiles (300×600mm) — 32 sq.m',
        'Ceramic Wash Basin with Pedestal',
        'Close-Coupled Water Closet',
        'Frameless Rectangular Wall Mirror'
      ],
      discountPrice: 350000,
      originalPrice: 400000,
      image: '/images/packages/essential-comfort-package.jpeg',
      badge: 'Budget Range'
    },
    {
      id: 'pkg-elegant-living',
      name: 'Elegant Living Package',
      description: 'A balanced combination of comfort and style featuring premium finishes and contemporary bathroom fixtures.',
      includedElements: [
        'Stone Finish Floor Tiles (600×600mm) — 45 sq.m',
        'Marble Effect Wall Tiles (300×600mm) — 32 sq.m',
        'Floating Vanity Wash Basin Cabinet',
        'Dual Flush Water Closet',
        'Backlit LED Mirror',
        'Matte Black Shower Set'
      ],
      discountPrice: 550000,
      originalPrice: 650000,
      image: '/images/packages/elegant-living-package.jpeg',
      badge: 'Medium Range'
    },
    {
      id: 'pkg-signature-white-luxury',
      name: 'Signature White Luxury Package',
      description: 'A sophisticated bathroom package inspired by modern luxury hotels, combining elegant white finishes with premium fixtures for a timeless appearance.',
      includedElements: [
        'Polished White Porcelain Floor Tiles (800×800mm) — 45 sq.m',
        'White Marble Effect Wall Tiles (600×1200mm) — 32 sq.m',
        'Floating White Vanity Wash Basin Cabinet',
        'Wall-Hung Water Closet with Concealed Cistern',
        'Large Backlit Smart LED Mirror',
        'Premium Rainfall Shower System'
      ],
      discountPrice: 850000,
      originalPrice: 950000,
      image: '/images/packages/signature-white-luxury-package.jpeg',
      badge: 'Premium Range'
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
            onClick={() => onVisualizePackage('pkg-essential-comfort')} 
            className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase border-b border-[#1A1A1A] pb-0.5 hover:opacity-75 transition-all"
          >
            <span>VIEW ALL</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* 3-Column Package Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
                
                <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed tracking-wide mb-4">
                  {pkg.description}
                </p>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase mb-2">Included Elements</h4>
                  <ul className="text-xs text-gray-500 font-light leading-relaxed tracking-wide list-disc pl-4 space-y-1">
                    {pkg.includedElements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Pricing section */}
                <div className="border-t border-gray-100 pt-6 mb-6 flex flex-col items-start gap-1 mt-auto">
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
                <div className="flex flex-col gap-3">
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
