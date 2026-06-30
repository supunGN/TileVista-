import React from 'react';
import { Category } from '../types';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategoryId: number | 'ALL';
  setSelectedCategoryId: (id: number | 'ALL') => void;
  selectedSubcategoryId: number | 'ALL';
  setSelectedSubcategoryId: (id: number | 'ALL') => void;
  activeCategory: Category | null;
}

export const ProductFilters: React.FC<ProductFiltersProps> = React.memo(({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubcategoryId,
  setSelectedSubcategoryId,
  activeCategory
}) => {
  return (
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

      {/* Subcategories */}
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
  );
});

ProductFilters.displayName = 'ProductFilters';
