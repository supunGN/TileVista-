'use client';

import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@tilevista/types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'TL-MAR-600',
    name: 'Royal Marble Polished Tile',
    description: 'Ultra-premium polished white marble porcelain tile. Sourced directly from elite Italian suppliers for luxury floor coverings.',
    price: 3850,
    discount: 10,
    quantity: 140,
    category: 'TILE',
    imageUrl: '',
    brand: 'Rocell',
    color: 'White',
    material: 'Porcelain',
    size: '600x600mm',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    sku: 'BW-BAS-WSH',
    name: 'Vessel Oval Wash Basin',
    description: 'Sleek matte ceramic wash basin with clean design lines and premium overflow controls.',
    price: 24500,
    discount: 0,
    quantity: 18,
    category: 'BATHWARE',
    imageUrl: '',
    brand: 'Lanka Tiles',
    color: 'Matte Black',
    material: 'Ceramic',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const ProductsFeature: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK')}`;
  };

  const handleAddToCart = (name: string) => {
    alert(`Successfully added "${name}" to your shopping cart!`);
  };

  return (
    <div className="p-8 bg-[#F9F9F7] text-[#1A1A1A] min-h-screen font-sans">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Product Catalog</span>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1">Showroom Catalogue</h1>
          <p className="text-xs text-gray-500 font-light mt-1">Explore our premium tiles, bathwares, and accessories.</p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search by name, SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 px-4 py-2.5 pl-9 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
            />
            <Search size={13} className="text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button 
            onClick={() => alert('Filter overlay loaded.')}
            className="border border-gray-300 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase px-4 py-2.5 transition-colors flex items-center gap-1.5"
          >
            <Filter size={13} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Toggles */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['ALL', 'TILE', 'BATHWARE', 'ACCESSORY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === 'ALL' ? null : cat)}
            className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
              (cat === 'ALL' && !selectedCategory) || selectedCategory === cat
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50'
            }`}
          >
            {cat === 'ALL' ? 'All Products' : cat + 'S'}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((p) => {
          const finalPrice = p.price * (1 - p.discount / 100);
          return (
            <div 
              key={p.id} 
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D4C5B9] transition-all duration-300 flex flex-col justify-between h-full group"
            >
              {/* Thumbnail image placeholder */}
              <div className="w-full h-44 bg-[#F9F9F7] border-b border-gray-150 relative overflow-hidden flex items-center justify-center text-gray-400 font-mono text-[10px]">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600')` }} />
                <span className="relative z-10 bg-white/95 px-2.5 py-1 text-[#1A1A1A] font-bold text-[8px] uppercase tracking-widest">
                  {p.category}
                </span>
              </div>

              {/* Details card info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-2 gap-4">
                    <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">{p.brand}</span>
                    <span className="text-[9px] text-gray-400 font-mono">{p.sku}</span>
                  </div>

                  <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wide mb-2">
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div>
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-base font-bold text-red-600">
                      {formatLKR(finalPrice)}
                    </span>
                    {p.discount > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatLKR(p.price)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAddToCart(p.name)}
                      className="flex-1 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-wider uppercase py-3 transition-colors duration-300 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart size={13} />
                      <span>Add to Cart</span>
                    </button>
                    <button 
                      onClick={() => alert(`Details for "${p.name}" loaded.`)}
                      className="border border-gray-300 hover:border-[#1A1A1A] hover:bg-gray-50 text-[#1A1A1A] p-3 transition-colors duration-300"
                      aria-label="View Details"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductsFeature;
