import React from 'react';
import { Card, Button } from '@tilevista/ui';
import { ProductPackage } from '@tilevista/types';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const MOCK_PACKAGES: ProductPackage[] = [
  {
    id: 'pkg-luxury-bath',
    name: 'Opulent Marble Suite',
    description: 'A complete collection combining royal marble porcelain tiles, vessel oval basin, and modern bathware.',
    discountPercent: 15,
    price: 345000,
    products: [],
    imageUrl: '',
    createdAt: new Date(),
  },
];

export const PackagesFeature: React.FC = () => {
  return (
    <div className="p-8 bg-darkBg text-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="font-outfit text-3xl font-bold tracking-tight">Pre-Designed Showroom Packages</h1>
        <p className="text-sm text-slate-400 mt-1">Stunning pre-selected layouts with bundled discounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_PACKAGES.map((pkg) => (
          <Card key={pkg.id} className="border border-glassBorder hover:border-indigo-500/20 p-8 flex flex-col justify-between h-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs px-3 py-1 rounded-full bg-indigo-500/10">
                  <Sparkles size={14} /> Luxury Collection
                </div>
                <span className="text-emerald-400 font-extrabold text-sm px-3 py-1 rounded-full bg-emerald-500/10">
                  Save {pkg.discountPercent}%
                </span>
              </div>

              <h3 className="font-outfit text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{pkg.description}</p>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-6 border-t border-slate-800 pt-6">
                <span className="text-slate-400 text-sm">Package Discount Price</span>
                <span className="text-3xl font-extrabold text-indigo-400">
                  {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(pkg.price)}
                </span>
              </div>

              <Button className="w-full" variant="primary">
                Visualize In 3D Showroom <ArrowUpRight size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default PackagesFeature;
