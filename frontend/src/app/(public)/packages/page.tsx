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
    id: 'pkg-essential-comfort',
    name: 'Essential Comfort Package',
    badge: 'Budget Range',
    description: 'A practical and affordable bathroom solution designed for modern homes. This package combines durable tiles with essential bathroom fixtures to create a clean and functional space.',
    discountPrice: 350000,
    originalPrice: 400000,
    image: '/images/packages/essential-comfort-package.jpeg',
    items: [
      'Light Beige Floor Tiles (600×600mm) — 45 sq.m',
      'Soft Ivory Wall Tiles (300×600mm) — 32 sq.m',
      'Ceramic Wash Basin with Pedestal',
      'Close-Coupled Water Closet',
      'Frameless Rectangular Wall Mirror'
    ]
  },
  {
    id: 'pkg-everyday-living',
    name: 'Everyday Living Package',
    badge: 'Budget Range',
    description: 'A simple and stylish bathroom package that balances affordability and modern design for everyday family use.',
    discountPrice: 380000,
    originalPrice: 420000,
    image: '/images/packages/everyday-living-package.jpeg',
    items: [
      'Warm Grey Floor Tiles (600×600mm) — 45 sq.m',
      'White Gloss Wall Tiles (300×600mm) — 32 sq.m',
      'Compact Countertop Wash Basin',
      'Modern Water Closet',
      'Minimalist LED Wall Mirror'
    ]
  },
  {
    id: 'pkg-elegant-living',
    name: 'Elegant Living Package',
    badge: 'Medium Range',
    description: 'A balanced combination of comfort and style featuring premium finishes and contemporary bathroom fixtures.',
    discountPrice: 550000,
    originalPrice: 650000,
    image: '/images/packages/elegant-living-package.jpeg',
    items: [
      'Stone Finish Floor Tiles (600×600mm) — 45 sq.m',
      'Marble Effect Wall Tiles (300×600mm) — 32 sq.m',
      'Floating Vanity Wash Basin Cabinet',
      'Dual Flush Water Closet',
      'Backlit LED Mirror',
      'Matte Black Shower Set'
    ]
  },
  {
    id: 'pkg-contemporary-comfort',
    name: 'Contemporary Comfort Package',
    badge: 'Medium Range',
    description: 'Designed for homeowners seeking a refined bathroom with modern aesthetics and enhanced functionality.',
    discountPrice: 600000,
    originalPrice: 700000,
    image: '/images/packages/contemporary-comfort-package.jpeg',
    items: [
      'Light Concrete Finish Floor Tiles (600×600mm) — 45 sq.m',
      'Textured Decorative Wall Tiles (300×600mm) — 32 sq.m',
      'Countertop Ceramic Wash Basin',
      'Concealed-Cistern Water Closet',
      'Round LED Mirror',
      'Rainfall Shower System'
    ]
  },
  {
    id: 'pkg-signature-white-luxury',
    name: 'Signature White Luxury Package',
    badge: 'Premium Range',
    description: 'A sophisticated bathroom package inspired by modern luxury hotels, combining elegant white finishes with premium fixtures for a timeless appearance.',
    discountPrice: 850000,
    originalPrice: 950000,
    image: '/images/packages/signature-white-luxury-package.jpeg',
    items: [
      'Polished White Porcelain Floor Tiles (800×800mm) — 45 sq.m',
      'White Marble Effect Wall Tiles (600×1200mm) — 32 sq.m',
      'Floating White Vanity Wash Basin Cabinet',
      'Wall-Hung Water Closet with Concealed Cistern',
      'Large Backlit Smart LED Mirror',
      'Premium Rainfall Shower System'
    ]
  },
  {
    id: 'pkg-grand-marble-suite',
    name: 'Grand Marble Suite Package',
    badge: 'Premium Range',
    description: 'A complete luxury bathroom solution designed for high-end residences, featuring elegant marble finishes, premium sanitary ware, and a freestanding bathtub.',
    discountPrice: 1200000,
    originalPrice: 1350000,
    image: '/images/packages/grand-marble-suite-package.jpeg',
    items: [
      'Premium Statuario White Porcelain Floor Tiles (800×800mm) — 45 sq.m',
      'Full Height White Marble Effect Wall Tiles (600×1200mm) — 32 sq.m',
      'Designer Floating White Vanity with Countertop Wash Basin',
      'Wall-Hung Water Closet with Concealed Cistern',
      'Smart Touch-Control LED Mirror',
      'Luxury Rainfall Shower System',
      'Freestanding Oval Acrylic Bathtub'
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
