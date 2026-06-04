'use client';

import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem } from '@tilevista/types';
import { calculateBilling, formatCurrency } from '../../utils';

const MOCK_CART_ITEMS: CartItem[] = [
  {
    productId: '1',
    quantity: 120,
    product: {
      id: '1',
      sku: 'TL-MAR-600',
      name: 'Royal Marble Polished Tile',
      price: 3850,
      discount: 10,
      quantity: 140,
      category: 'TILE',
      brand: 'Rocell',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

export const CartFeature: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

  const updateQuantity = (pId: string, change: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === pId) {
            return { ...item, quantity: Math.max(1, item.quantity + change) };
          }
          return item;
        })
    );
  };

  const removeItem = (pId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== pId));
  };

  const { subtotal, discount, tax, total } = calculateBilling(items);

  return (
    <div className="p-8 bg-[#F9F9F7] text-[#1A1A1A] min-h-screen font-sans">
      <div className="mb-8">
        <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase">Shopping Basket</span>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mt-1">Shopping Cart</h1>
        <p className="text-xs text-gray-500 font-light mt-1">Review your selections before completing checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items column */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <div className="text-center p-12 border border-dashed border-gray-200 bg-white">
              <p className="text-gray-500 font-light text-sm">Your shopping cart is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.productId} 
                className="bg-white border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase font-mono">{item.product.brand}</span>
                    <span className="text-[9px] text-gray-400 font-mono">| {item.product.sku}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wide mt-1">
                    {item.product.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-light mt-0.5">Size: {item.product.size || 'Standard Size'}</p>
                  
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xs font-bold text-red-600">
                      {formatCurrency(item.product.price * (1 - item.product.discount / 100))} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                  <div className="flex items-center bg-[#F9F9F7] border border-gray-200 p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="p-1 hover:bg-gray-200 text-gray-500 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-12 text-center text-xs font-semibold text-[#1A1A1A] font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="p-1.5 hover:bg-gray-200 text-gray-500 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50/5 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Billing Column */}
        <div>
          <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase pb-4 border-b border-gray-100 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 text-xs pb-6 mb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-mono">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Discount</span>
                <span className="text-emerald-700 font-mono">-{formatCurrency(discount)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Tax (15%)</span>
                <span className="font-mono">{formatCurrency(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-8">
              <span className="text-sm font-bold text-[#1A1A1A]">Total</span>
              <span className="text-xl font-bold text-red-600 font-mono">{formatCurrency(total)}</span>
            </div>

            <button 
              disabled={items.length === 0}
              onClick={() => {
                window.location.href = '/checkout';
              }}
              className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard size={15} /> 
              <span>Secure Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartFeature;
