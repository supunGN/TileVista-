import React from 'react';
import Link from 'next/link';
import { Sparkles, Eye, ShoppingCart } from 'lucide-react';
import { UnifiedItem } from '../types';
import { formatLKR, getFallbackImage } from '../utils';
import { STATIC_BASE } from '../constants';

interface ProductCardProps {
  product: UnifiedItem;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const imageUrl = product.imageUrl ? `${STATIC_BASE}${product.imageUrl}` : getFallbackImage(product.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Added "${product.name}" to your shopping cart!`);
  };

  return (
    <div className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <Link href={`/products/${product.itemId}`} className="relative w-full aspect-square bg-[#F9F9F7] overflow-hidden block">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        {/* Category overlay */}
        <span className="absolute top-4 left-4 z-10 bg-white/95 text-[#1A1A1A] font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 shadow-sm">
          {product.category}
        </span>

        {/* 3D Model Availability tag */}
        {product.glbUrl && (
          <span className="absolute top-4 right-4 z-10 bg-[#1A1A1A] text-[#D4C5B9] font-bold text-[8px] uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 shadow-sm border border-[#D4C5B9]/20">
            <Sparkles size={9} />
            <span>3D Canvas Ready</span>
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.itemId}`}>
          <h3 className="text-sm font-semibold text-[#1A1A1A] tracking-wide mb-1.5 line-clamp-1 hover:text-[#D4C5B9] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-sm font-bold text-[#C8102E]">{formatLKR(product.price)}</span>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-3 mt-auto">
          <Link
            href={`/products/${product.itemId}`}
            className="border border-gray-200 hover:border-[#1A1A1A] text-gray-500 hover:text-[#1A1A1A] p-3 transition-all duration-300 flex items-center justify-center"
            aria-label="View Details"
          >
            <Eye size={15} />
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
            className="flex-1 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white py-3 px-4 transition-all duration-300 disabled:opacity-30 disabled:hover:bg-[#1A1A1A] disabled:hover:text-white flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase"
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
