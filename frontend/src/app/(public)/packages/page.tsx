'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, Check, ShoppingBag } from 'lucide-react';

interface CuratedPackage {
  id: string;
  name: string;
  badge: string;
  description: string;
  discountPrice: number;
  originalPrice: number;
  image: string;
  items: string[];
}

const SHOWROOM_PACKAGES: CuratedPackage[] = [
  {
    id: 'pkg-minimalist-oasis',
    name: 'The Minimalist Oasis',
    badge: 'Scandinavian Functional',
    description: 'Embrace the calm of Scandinavian design. Combining textured warm sand porcelain slabs, premium matte black water controllers, and a floating natural oak washbasin vanity.',
    discountPrice: 450000,
    originalPrice: 550000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    items: [
      'Warm Muted Sand Floor Tiles (600x600mm) — 45 sq.m',
      'Soft Cream Textured Wall Tiles (300x600mm) — 32 sq.m',
      'Floating Natural Oak Washbasin Vanity with Ceramic Top',
      'Matte Black Wall-Mounted Rainfall Shower System',
      'Minimalist Circular Backlit LED Wall Mirror'
    ]
  },
  {
    id: 'pkg-classic-marble',
    name: 'Classic Marble Luxury',
    badge: 'Premium Luxury',
    description: 'Indulge in Italian elegance. Grand scale Statuario marble slabs, double floating marble basins, gold-plated rainfall controllers, and a freestanding oval soaking tub.',
    discountPrice: 750000,
    originalPrice: 880000,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800',
    items: [
      'Statuario White Polished Marble Floor Slabs (800x800mm) — 50 sq.m',
      'Matching Carrara White Polished Wall Tiles (400x800mm) — 36 sq.m',
      'Double Floating White Statuario Marble Wash Basin Vanity',
      '18-Karat Gold Plated Rainfall Shower System',
      'Premium Stone Composite Freestanding Soaking Tub'
    ]
  },
  {
    id: 'pkg-urban-industrial',
    name: 'Urban Industrial',
    badge: 'Modern Architectural',
    description: 'Sleek, structural, and raw. Dark basalt textured floor tiles, raw concrete-style wall panels, black steel structural trims, and rainfall matte controllers.',
    discountPrice: 390000,
    originalPrice: 460000,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800',
    items: [
      'Charcoal Gray Basalt Matte Floor Tiles (600x600mm) — 40 sq.m',
      'Raw Concrete Texture Accent Wall Panels (600x1200mm) — 28 sq.m',
      'Bespoke Matte Black Steel Floating Basin Frame with Concrete Top',
      'Satin Black Rainfall Shower Column & Hand Shower Unit',
      'Gunmetal Gray Linear Thermostatic Shower Controller'
    ]
  }
];

export default function PackagesPage() {
  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK')}`;
  };

  const handleAddPackageToCart = (pName: string) => {
    alert(`Successfully added curated package bundle "${pName}" to your shopping cart!`);
  };

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            PRE-DESIGNED SUITES
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A]">
            Curated Bathroom Packages
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Stunning pre-selected layouts with bundled discount pricing. Walk inside a suite in 3D, customize elements, or checkout directly.
          </p>
        </div>
      </div>

      {/* Package Suites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SHOWROOM_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative group"
          >
            {/* Visual Header */}
            <div className="relative w-full h-[220px] bg-gray-50 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103"
                style={{ backgroundImage: `url('${pkg.image}')` }}
              />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-[#1A1A1A] text-[#D4C5B9] font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 shadow-sm">
                <Sparkles size={9} />
                <span>{pkg.badge}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-[#1A1A1A] tracking-wide mb-2 group-hover:text-[#D4C5B9] transition-colors">
                {pkg.name}
              </h3>
              
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
                {pkg.description}
              </p>

              {/* Items Breakdown list */}
              <div className="border-t border-gray-100 pt-5 mb-6">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block mb-3">Included Elements</span>
                <ul className="space-y-2.5">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-light leading-snug">
                      <div className="p-0.5 rounded-full bg-gray-100 border border-gray-200 text-[#1A1A1A] mt-0.5 shrink-0">
                        <Check size={10} strokeWidth={2.5} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing details */}
              <div className="border-t border-gray-100 pt-5 mb-6 mt-auto">
                <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase leading-none mb-1 block">Bundle Discount Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-lg md:text-xl font-bold text-red-600">
                    {formatLKR(pkg.discountPrice)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatLKR(pkg.originalPrice)}
                  </span>
                </div>
              </div>

              {/* Action items */}
              <div className="flex flex-col gap-2.5">
                <Link 
                  href={`/designer?package=${pkg.id}`}
                  className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-wider uppercase py-3.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Compass size={14} />
                  <span>Visualize in 3D Canvas</span>
                </Link>
                <button 
                  onClick={() => handleAddPackageToCart(pkg.name)}
                  className="w-full border border-gray-300 hover:border-[#1A1A1A] hover:bg-gray-50 text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase py-3.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={13} />
                  <span>Add Package to Cart</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
