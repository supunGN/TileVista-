import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

interface ProductSearchProps {
  search: string;
  setSearch: (val: string) => void;
  onReload: () => void;
  loading: boolean;
}

export const ProductSearch: React.FC<ProductSearchProps> = React.memo(({ search, setSearch, onReload, loading }) => {
  return (
    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
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
        onClick={onReload}
        disabled={loading}
        className="border border-gray-300 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase px-4 py-3 transition-colors flex items-center gap-1.5 disabled:opacity-50"
      >
        <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
        <span>Reload</span>
      </button>
    </div>
  );
});

ProductSearch.displayName = 'ProductSearch';
