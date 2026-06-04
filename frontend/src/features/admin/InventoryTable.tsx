'use client';

import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { formatCurrency } from '../../utils';
import { Edit, RefreshCw } from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: '1', sku: 'TL-MAR-600', name: 'Royal Marble Polished Tile', category: 'TILE', brand: 'Rocell', quantity: 140, price: 3850 },
  { id: '2', sku: 'BW-BAS-WSH', name: 'Vessel Oval Wash Basin', category: 'BATHWARE', brand: 'Lanka Tiles', quantity: 18, price: 24500 },
  { id: '3', sku: 'TL-GRN-300', name: 'Forest Green Matte Tile', category: 'TILE', brand: 'Rocell', quantity: 250, price: 2400 },
];

export const InventoryTable: React.FC = () => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<number>(0);

  const handleUpdate = (id: string) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newValue } : item))
    );
    setAdjustingId(null);
  };

  return (
    <Card className="border border-glassBorder p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Stock Catalogue Levels</h3>
        <Button variant="secondary" size="sm">
          <RefreshCw size={14} className="animate-spin" /> Synchronize POS
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-xs">
              <th className="py-4 px-2">SKU Code</th>
              <th className="py-4 px-2">Name</th>
              <th className="py-4 px-2">Category</th>
              <th className="py-4 px-2">Price</th>
              <th className="py-4 px-2 text-right">Available Stock</th>
              <th className="py-4 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-900/20 transition-colors">
                <td className="py-4 px-2 font-mono text-indigo-400">{item.sku}</td>
                <td className="py-4 px-2 font-bold text-white">{item.name}</td>
                <td className="py-4 px-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-2 font-medium">{formatCurrency(item.price)}</td>
                <td className="py-4 px-2 text-right font-bold">
                  {adjustingId === item.id ? (
                    <div className="flex justify-end items-center gap-2">
                      <input
                        type="number"
                        className="w-16 bg-slate-950 border border-slate-700 rounded-lg p-1 text-right text-white text-xs outline-none"
                        value={newValue}
                        onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                      />
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-xs text-emerald-400 font-bold px-2 py-1 rounded hover:bg-emerald-500/10 transition"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className={item.quantity <= 20 ? 'text-rose-400' : 'text-slate-200'}>
                      {item.quantity} units
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 text-center">
                  <button
                    onClick={() => {
                      setAdjustingId(item.id);
                      setNewValue(item.quantity);
                    }}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/40 rounded-xl transition"
                  >
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
export default InventoryTable;
