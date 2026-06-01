import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { CartItem } from '@tilevista/types';
import { calculateBilling, formatCurrency } from '../../utils';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';

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
    <div className="p-8 bg-darkBg text-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="font-outfit text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-sm text-slate-400 mt-1">Review your selections before completing checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <Card className="text-center p-12 border border-dashed border-slate-700">
              <p className="text-slate-400">Your shopping cart is currently empty.</p>
            </Card>
          ) : (
            items.map((item) => (
              <Card key={item.productId} className="border border-glassBorder p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-outfit text-lg font-bold text-white">{item.product.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{item.product.brand} | {item.product.size || 'Standard Size'}</p>
                  <p className="text-indigo-400 font-bold mt-2">{formatCurrency(item.product.price * (1 - item.product.discount / 100))} each</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        <div>
          <Card className="border border-glassBorder">
            <h3 className="font-outfit text-xl font-bold mb-6 text-white">Order Summary</h3>

            <div className="space-y-4 text-sm border-b border-slate-700 pb-6 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Discount</span>
                <span className="text-emerald-400">-{formatCurrency(discount)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Tax (15%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-8">
              <span className="text-base font-bold text-white">Total</span>
              <span className="text-3xl font-extrabold text-indigo-400">{formatCurrency(total)}</span>
            </div>

            <Button className="w-full" variant="primary" disabled={items.length === 0}>
              <CreditCard size={18} /> Secure Checkout
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CartFeature;
