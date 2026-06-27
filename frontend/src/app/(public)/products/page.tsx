'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Eye, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface UnifiedItem {
  itemId: number;
  name: string;
  category: string;
  categoryId: number | null;
  subcategoryId: number | null;
  sku: string;
  description: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
  glbUrl: string | null;
  scale: { x: number; y: number; z: number };
  rotationY: number;
  tags: string[];
  material: string | null;
  finish: string | null;
  isEnabled: boolean;
}

export default function ProductsPage() {
  const [items, setItems] = useState<UnifiedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'ALL'>('ALL');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | 'ALL'>('ALL');
  const [categories, setCategories] = useState<any[]>([]);

  const API_BASE = 'http://localhost:4000/api';
  const STATIC_BASE = 'http://localhost:4000';

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [itemsResponse, catsResponse] = await Promise.all([
        fetch(`${API_BASE}/items`),
        fetch(`${API_BASE}/categories`)
      ]);

      if (!itemsResponse.ok) {
        throw new Error(`Failed to load showroom inventory (${itemsResponse.status})`);
      }
      const data = await itemsResponse.json();
      setItems(data);

      if (catsResponse.ok) {
        const catData = await catsResponse.json();
        setCategories(catData);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter items that are enabled
  const enabledItems = items.filter((item) => item.isEnabled);

  const filteredProducts = enabledItems.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategoryId === 'ALL' ? true : p.categoryId === selectedCategoryId;
    const matchesSubcategory = selectedSubcategoryId === 'ALL' ? true : p.subcategoryId === selectedSubcategoryId;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
  };

  const handleAddToCart = (pName: string) => {
    alert(`Added "${pName}" to your shopping cart!`);
  };

  const activeCategory = categories.find(c => c.id === selectedCategoryId);

  // Helper to determine brand/brand fallback
  const getBrand = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.startsWith('rocell')) return 'Rocell';
    if (lower.startsWith('lanka')) return 'Lanka Tiles';
    return 'Showroom Import';
  };

  // Helper to get fallback category images
  const getFallbackImage = (category: string) => {
    return '/images/placeholder.png';
  };

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-10 px-4">

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

          <button
            onClick={fetchProducts}
            disabled={loading}
            className="border border-gray-300 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase px-4 py-3 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Category & Subcategory Pills */}
      {!loading && !error && (
        <div className="flex flex-col gap-4 border-b border-gray-150 pb-6">
          {/* Top-Level Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setSelectedCategoryId('ALL'); setSelectedSubcategoryId('ALL'); }}
              className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${selectedCategoryId === 'ALL'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F9F9F7] text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100'
                }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategoryId(cat.id); setSelectedSubcategoryId('ALL'); }}
                className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${selectedCategoryId === cat.id
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-[#F9F9F7] text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Subcategories (if category is selected and has subcategories) */}
          {selectedCategoryId !== 'ALL' && activeCategory && activeCategory.subcategories?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-50">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mr-2">Filter by:</span>
              <button
                onClick={() => setSelectedSubcategoryId('ALL')}
                className={`px-4 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 ${selectedSubcategoryId === 'ALL'
                  ? 'bg-[#D4C5B9] text-[#1A1A1A]'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-[#1A1A1A] hover:border-[#D4C5B9]'
                  }`}
              >
                All {activeCategory.name}
              </button>
              {activeCategory.subcategories.map((sub: any) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategoryId(sub.id)}
                  className={`px-4 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 ${selectedSubcategoryId === sub.id
                    ? 'bg-[#D4C5B9] text-[#1A1A1A]'
                    : 'bg-white border border-gray-200 text-gray-500 hover:text-[#1A1A1A] hover:border-[#D4C5B9]'
                    }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="animate-spin text-[#D4C5B9]" size={32} />
          <span className="text-xs font-light tracking-widest uppercase font-mono">Loading dynamic catalog...</span>
        </div>
      ) : error ? (
        <div className="py-20 text-center border border-dashed border-red-200 bg-red-50/20 max-w-lg mx-auto p-8 rounded">
          <p className="text-red-650 font-medium text-sm mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-6 py-2.5 bg-red-650 hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase"
          >
            Retry Catalog
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gray-200 bg-[#F9F9F7]">
          <p className="text-gray-500 font-light text-sm">No items found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const finalPrice = p.price;
            const imageUrl = p.imageUrl ? `${STATIC_BASE}${p.imageUrl}` : getFallbackImage(p.category);

            return (
              <div
                key={p.itemId}
                className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Product Image badge */}
                <Link href={`/products/${p.itemId}`} className="relative w-full h-[220px] bg-gray-50 overflow-hidden block">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                  />

                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 z-10 bg-white/95 text-[#1A1A1A] font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 shadow-sm">
                    {p.category}
                  </span>

                  {/* 3D Model Availability tag */}
                  {p.glbUrl && (
                    <span className="absolute top-4 right-4 z-10 bg-[#1A1A1A] text-[#D4C5B9] font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 shadow-sm border border-[#D4C5B9]/20">
                      <Sparkles size={9} />
                      <span>3D Canvas Ready</span>
                    </span>
                  )}
                </Link>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-baseline mb-2 gap-4">
                    <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">
                      {getBrand(p.name)}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">{p.sku}</span>
                  </div>

                  <Link href={`/products/${p.itemId}`}>
                    <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wide mb-2 line-clamp-1 hover:text-[#D4C5B9] transition-colors">
                      {p.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-500 font-light leading-relaxed mb-6 flex-1 line-clamp-2">
                    {p.description || 'Premium selection showroom article, sourced and imported to fit contemporary architecture projects.'}
                  </p>

                  {/* Attributes snippet */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.finish && (
                      <span className="text-[9.5px] font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-500 uppercase">
                        {p.finish}
                      </span>
                    )}
                    {p.material && (
                      <span className="text-[9.5px] font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-500">
                        {p.material}
                      </span>
                    )}
                    <span className={`text-[9.5px] font-mono px-2 py-0.5 border ${p.quantity <= 10
                      ? 'bg-red-50 text-red-650 border-red-100 font-bold'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-100'
                      }`}>
                      {p.quantity <= 0 ? 'Out of Stock' : `${p.quantity} Units in Showroom`}
                    </span>
                  </div>

                  {/* Pricing and Cart click triggers */}
                  <div className="border-t border-gray-100 pt-5 flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase leading-none mb-1">Unit Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#1A1A1A]">{formatLKR(finalPrice)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${p.itemId}`}
                        className="border border-gray-200 hover:border-[#1A1A1A] text-gray-500 hover:text-[#1A1A1A] p-3.5 transition-all duration-300 flex items-center justify-center"
                        aria-label="View Details"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => handleAddToCart(p.name)}
                        disabled={p.quantity <= 0}
                        className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white p-3.5 transition-all duration-300 disabled:opacity-30 disabled:hover:bg-[#1A1A1A] disabled:hover:text-white"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart size={15} />
                      </button>
                    </div>
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
