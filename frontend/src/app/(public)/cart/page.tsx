'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  size?: string;
  price: number;
  discountPercent: number;
  quantity: number;
  image: string;
  isAvailable?: boolean;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'prod-1',
    sku: 'TL-MAR-600',
    name: 'Royal Marble Polished Tile',
    brand: 'Rocell',
    size: '600x600mm',
    price: 3850,
    discountPercent: 10,
    quantity: 120,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300'
  }
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const updateQuantity = (id: string, change: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      if (item.isAvailable === false) return sum;
      const finalPrice = item.price * (1 - item.discountPercent / 100);
      return sum + finalPrice * item.quantity;
    }, 0);
  };

  const calculateOriginalSubtotal = () => {
    return items.reduce((sum, item) => {
      if (item.isAvailable === false) return sum;
      return sum + item.price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const originalSubtotal = calculateOriginalSubtotal();
  const discountTotal = originalSubtotal - subtotal;
  const tax = subtotal * 0.15; // Estimated 15% VAT / Tax
  const total = subtotal + tax;

  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            YOUR SELECTIONS
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A]">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Review your tiles, bathware selections, and calculated volumes before checking out.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gray-200 bg-[#F9F9F7] flex flex-col items-center gap-6">
          <p className="text-gray-500 font-light text-sm">Your shopping cart is currently empty.</p>
          <Link 
            href="/products"
            className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase px-8 py-3.5 flex items-center gap-2 transition-all duration-300"
          >
            <ShoppingBag size={14} />
            <span>Browse Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const finalPrice = item.price * (1 - item.discountPercent / 100);
              return (
                <div 
                  key={item.id} 
                  className="border border-gray-200 p-6 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm"
                >
                  {/* Item Image & Description details */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 bg-gray-50 border border-gray-200 shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase font-mono">{item.brand}</span>
                        <span className="text-[9px] text-gray-400 font-mono">| {item.sku}</span>
                      </div>
                      <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wide mt-1">
                        {item.name}
                      </h3>
                      {item.size && (
                        <span className="text-[10px] text-gray-500 font-light mt-0.5">Size: {item.size}</span>
                      )}
                      
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className={`text-xs font-bold ${item.isAvailable === false ? 'text-gray-400' : 'text-red-600'}`}>{formatLKR(finalPrice)}</span>
                        {item.discountPercent > 0 && (
                          <span className="text-[10.5px] text-gray-400 line-through">{formatLKR(item.price)}</span>
                        )}
                      </div>
                      
                      {item.isAvailable === false && (
                        <div className="mt-2 text-xs font-semibold text-red-500 bg-red-50 py-1 px-2 inline-block border border-red-100">
                          This item is no longer available
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity Actions & Remove click */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                    
                    {/* Incrementer box */}
                    <div className={`flex items-center border border-gray-200 p-1 ${item.isAvailable === false ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'bg-[#F9F9F7]'}`}>
                      <button
                        onClick={() => item.isAvailable !== false && updateQuantity(item.id, -1)}
                        className={`p-1.5 transition-colors ${item.isAvailable === false ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`}
                        aria-label="Decrease quantity"
                        disabled={item.isAvailable === false}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-12 text-center text-xs font-semibold text-[#1A1A1A] font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => item.isAvailable !== false && updateQuantity(item.id, 1)}
                        className={`p-1.5 transition-colors ${item.isAvailable === false ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`}
                        aria-label="Increase quantity"
                        disabled={item.isAvailable === false}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Total item cost */}
                    <div className="flex flex-col text-right hidden sm:flex">
                      <span className="text-[8.5px] font-bold text-gray-400 tracking-wider uppercase leading-none mb-1">Item Subtotal</span>
                      <span className={`text-sm font-bold font-mono ${item.isAvailable === false ? 'text-gray-400 line-through' : 'text-[#1A1A1A]'}`}>
                        {formatLKR(finalPrice * item.quantity)}
                      </span>
                    </div>

                    {/* Trash */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50/5 transition-colors border border-transparent hover:border-red-200/20"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Cart Sidebar: Order summary block */}
          <div className="lg:col-span-4">
            <div className="bg-[#F9F9F7] p-8 border border-gray-200/40 space-y-6">
              <h2 className="text-xl font-semibold text-[#1A1A1A] pb-4 border-b border-gray-200">Order Summary</h2>

              <div className="space-y-4 text-xs tracking-wide">
                <div className="flex justify-between text-gray-500">
                  <span>Gross Subtotal</span>
                  <span className="font-mono">{formatLKR(originalSubtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Promotional Discount</span>
                  <span className="text-emerald-600 font-mono">-{formatLKR(discountTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-200">
                  <span>Estimated VAT / Taxes (15%)</span>
                  <span className="font-mono">{formatLKR(tax)}</span>
                </div>
                
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-sm font-bold text-[#1A1A1A]">Calculated Total</span>
                  <span className="text-xl font-bold text-red-600 font-mono">{formatLKR(total)}</span>
                </div>
              </div>

              {/* Checkout buttons */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <Link 
                  href="/checkout"
                  className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CreditCard size={15} />
                  <span>PROCEED TO SECURE CHECKOUT</span>
                </Link>
                
                <Link 
                  href="/products"
                  className="w-full bg-white border border-gray-300 hover:border-[#1A1A1A] text-center text-[#1A1A1A] font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 block"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
