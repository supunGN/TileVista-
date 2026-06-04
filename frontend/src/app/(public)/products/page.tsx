'use client';

import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Eye, Sparkles } from 'lucide-react';

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  category: 'TILE' | 'BATHWARE' | 'ACCESSORY';
  image: string;
  brand: string;
  size?: string;
  material?: string;
}

const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'prod-1',
    sku: 'TL-MAR-600',
    name: 'Royal Marble Polished Tile',
    description: 'Ultra-premium polished white marble porcelain tile. Sourced directly from elite Italian suppliers for luxury floor coverings.',
    price: 3850,
    discountPercent: 10,
    category: 'TILE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    brand: 'Rocell',
    size: '600x600mm',
    material: 'Porcelain'
  },
  {
    id: 'prod-2',
    sku: 'TL-MOS-300',
    name: 'Elegant Mosaic Wall Tile',
    description: 'Bespoke geometric mosaic pattern tile, perfect for creating statement feature walls or backsplashes.',
    price: 2400,
    discountPercent: 0,
    category: 'TILE',
    image: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&q=80&w=600',
    brand: 'Rocell',
    size: '300x300mm',
    material: 'Ceramic'
  },
  {
    id: 'prod-3',
    sku: 'BW-BAS-WSH',
    name: 'Sleek Matte Wash Basin',
    description: 'Sculpted counter-top washbasin in matte charcoal ceramic finish. Engineered with a minimal overflow drain.',
    price: 24500,
    discountPercent: 0,
    category: 'BATHWARE',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&q=80&w=600',
    brand: 'Lanka Tiles',
    material: 'Ceramic'
  },
  {
    id: 'prod-4',
    sku: 'BW-TUB-FRE',
    name: 'Minimalist Freestanding Bath',
    description: 'Deep soaking freestanding bathtub made of premium stone composite. Designed with double-ended ergonomic slopes.',
    price: 185000,
    discountPercent: 15,
    category: 'BATHWARE',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    brand: 'Lanka Tiles',
    size: '1700x750mm',
    material: 'Stone Composite'
  },
  {
    id: 'prod-5',
    sku: 'AC-SHW-CTR',
    name: 'Matte Black Shower System',
    description: 'Wall-mounted rainfall shower controller finished in premium matte-black. Includes a matching hand spray wand.',
    price: 45000,
    discountPercent: 5,
    category: 'ACCESSORY',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600',
    brand: 'Lanka Tiles',
    material: 'Brass / Acrylic'
  }
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' ? true : p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK')}`;
  };

  const handleAddToCart = (pName: string) => {
    alert(`Added "${pName}" to your shopping cart!`);
  };

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-10">
      
      {/* Title block */}
      <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            TILE & BATHWARE
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A]">
            Browse Showroom Catalogue
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Browse our imported range of European wall & floor tiles, sleek sanitaryware, and premium shower system accessories.
          </p>
        </div>

        {/* Dynamic Search & filter input */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-72">
            <input
              type="text"
              placeholder="Search tiles, basins, SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F9F9F7] border border-gray-200 px-4 py-3 pl-10 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9] font-light transition-colors"
            />
            <Search size={14} className="text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-150 pb-6">
        {['ALL', 'TILE', 'BATHWARE', 'ACCESSORY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F9F9F7] text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100'
            }`}
          >
            {cat === 'ALL' ? 'All Products' : cat + 'S'}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gray-200 bg-[#F9F9F7]">
          <p className="text-gray-500 font-light text-sm">No items found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const hasDiscount = p.discountPercent > 0;
            const finalPrice = hasDiscount ? p.price * (1 - p.discountPercent / 100) : p.price;

            return (
              <div 
                key={p.id} 
                className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Product Image badge */}
                <div className="relative w-full h-[220px] bg-gray-50 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 z-10 bg-white/95 text-[#1A1A1A] font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 shadow-sm">
                    {p.category}
                  </span>

                  {/* Discount tag */}
                  {hasDiscount && (
                    <span className="absolute top-4 right-4 z-10 bg-red-600 text-white font-bold text-[8px] uppercase tracking-widest px-2.5 py-1">
                      SAVE {p.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-baseline mb-2 gap-4">
                    <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">{p.brand}</span>
                    <span className="text-[9px] text-gray-400 font-mono">{p.sku}</span>
                  </div>

                  <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wide mb-2">
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-500 font-light leading-relaxed mb-6 flex-1 line-clamp-2">
                    {p.description}
                  </p>

                  {/* Attributes snippet */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.size && (
                      <span className="text-[9.5px] font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-500">{p.size}</span>
                    )}
                    {p.material && (
                      <span className="text-[9.5px] font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-500">{p.material}</span>
                    )}
                  </div>

                  {/* Pricing and Cart click triggers */}
                  <div className="border-t border-gray-100 pt-5 flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase leading-none mb-1">Unit Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#1A1A1A]">{formatLKR(finalPrice)}</span>
                        {hasDiscount && (
                          <span className="text-xs text-gray-400 line-through">{formatLKR(p.price)}</span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(p.name)}
                      className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white p-3.5 transition-all duration-300"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={15} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
