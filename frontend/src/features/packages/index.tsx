'use client';

import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { ProductPackage } from '@tilevista/types';

const MOCK_PACKAGES: ProductPackage[] = [
  {
    id: 'pkg-luxury-bath',
    name: 'Opulent Marble Suite',
    description: 'A complete collection combining royal white marble porcelain tiles, vessel oval basin, and modern shower fixtures.',
    discountPercent: 15,
    price: 345000,
    products: [],
    imageUrl: '',
    createdAt: new Date(),
  },
];

export const PackagesFeature: React.FC = () => {
  const handleLaunchCanvas = (name: string) => {
    alert(`Loading package "${name}" into the virtual 3D Canvas.`);
  };

  return (
    <div className="p-8 bg-[#F9F9F7] text-[#1A1A1A] min-h-screen font-sans">
      <div className="mb-8">
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Showroom Bundles</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1">Pre-Designed Showroom Packages</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Stunning pre-selected layouts with bundled discounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            className="bg-white border border-gray-200 p-8 flex flex-col justify-between h-[360px] shadow-sm hover:shadow-md transition-all duration-300 relative group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-1.5 text-[#1A1A1A] font-bold text-[9px] uppercase tracking-widest px-3 py-1 bg-[#D4C5B9]/15 border border-[#D4C5B9]/20">
                  <Sparkles size={11} className="text-[#D4C5B9]" /> 
                  <span>Luxury Collection</span>
                </div>
                <span className="text-emerald-700 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 bg-emerald-50 border border-emerald-100">
                  Save {pkg.discountPercent}%
                </span>
              </div>

              <h3 className="text-xl font-semibold text-[#1A1A1A] tracking-wide mb-2">
                {pkg.name}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
                {pkg.description}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-6 border-t border-gray-100 pt-6">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Package Price</span>
                <span className="text-2xl font-bold text-[#1A1A1A] font-mono">
                  {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(pkg.price)}
                </span>
              </div>

              <button 
                onClick={() => handleLaunchCanvas(pkg.name)}
                className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-wider uppercase py-3.5 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span>Visualize In 3D Showroom</span> 
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PackagesFeature;
