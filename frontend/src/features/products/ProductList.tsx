'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { useProductFilters } from './hooks/useProductFilters';
import { usePagination } from './hooks/usePagination';
import { ITEMS_PER_PAGE } from './constants';
import { ProductHeader } from './components/ProductHeader';
import { ProductSearch } from './components/ProductSearch';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';

export const ProductList: React.FC = () => {
  const { items, categories, loading, error, reload } = useProducts();
  
  const {
    search,
    setSearch,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSubcategoryId,
    setSelectedSubcategoryId,
    filteredProducts,
    activeCategory,
  } = useProductFilters(items, categories);

  const {
    currentPage,
    totalPages,
    startIndex,
    getPageNumbers,
    goToPage,
  } = usePagination(filteredProducts.length, ITEMS_PER_PAGE, [search, selectedCategoryId, selectedSubcategoryId]);

  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-10 px-4">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <ProductHeader />
        <ProductSearch 
          search={search} 
          setSearch={setSearch} 
          onReload={reload} 
          loading={loading} 
        />
      </div>

      {!loading && !error && (
        <ProductFilters
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedSubcategoryId={selectedSubcategoryId}
          setSelectedSubcategoryId={setSelectedSubcategoryId}
          activeCategory={activeCategory}
        />
      )}

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="animate-spin text-[#D4C5B9]" size={32} />
          <span className="text-xs font-light tracking-widest uppercase font-mono">Loading dynamic catalog...</span>
        </div>
      ) : error ? (
        <div className="py-20 text-center border border-dashed border-red-200 bg-red-50/20 max-w-lg mx-auto p-8 rounded">
          <p className="text-red-650 font-medium text-sm mb-4">{error}</p>
          <button
            onClick={reload}
            className="px-6 py-2.5 bg-red-650 hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase"
          >
            Retry Catalog
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
              Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
            </span>
            {totalPages > 1 && (
              <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>

          <ProductGrid products={paginatedProducts} />

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            getPageNumbers={getPageNumbers}
            goToPage={goToPage}
          />
        </>
      )}
    </div>
  );
};
