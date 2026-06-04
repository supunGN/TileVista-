'use client';

import React, { useState } from 'react';
import { Edit, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../../utils';

const INITIAL_INVENTORY = [
  { id: '1', sku: 'TL-MAR-600', name: 'Royal Marble Polished Tile', category: 'TILE', brand: 'Rocell', quantity: 140, price: 3850 },
  { id: '2', sku: 'BW-BAS-WSH', name: 'Vessel Oval Wash Basin', category: 'BATHWARE', brand: 'Lanka Tiles', quantity: 18, price: 24500 },
  { id: '3', sku: 'TL-GRN-300', name: 'Forest Green Matte Tile', category: 'TILE', brand: 'Rocell', quantity: 250, price: 2400 },
];

export const InventoryTable: React.FC = () => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<number>(0);
  const [syncing, setSyncing] = useState(false);

  const handleUpdate = (id: string) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newValue } : item))
    );
    setAdjustingId(null);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('Inventory database successfully synchronized with showroom POS center!');
    }, 1500);
  };

  return (
    <div className="bg-white border border-gray-200 p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-[#1A1A1A] tracking-wider uppercase">Stock Catalogue Levels</h3>
        
        <button 
          onClick={handleSync}
          className="border border-gray-300 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-[10px] tracking-wider uppercase px-4 py-2.5 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} /> 
          <span>{syncing ? 'Synchronizing...' : 'Synchronize POS'}</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-600 border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
              <th className="py-4 px-2">SKU Code</th>
              <th className="py-4 px-2">Name</th>
              <th className="py-4 px-2">Category</th>
              <th className="py-4 px-2">Price</th>
              <th className="py-4 px-2 text-right">Available Stock</th>
              <th className="py-4 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-[#F9F9F7]/80 transition-colors">
                <td className="py-4 px-2 font-mono text-red-600 font-medium">{item.sku}</td>
                <td className="py-4 px-2 font-bold text-[#1A1A1A]">{item.name}</td>
                <td className="py-4 px-2">
                  <span className="px-2 py-0.5 text-[8.5px] font-bold tracking-wider uppercase bg-gray-50 border border-gray-200 text-gray-500">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-2 font-mono font-medium text-gray-500">{formatCurrency(item.price)}</td>
                <td className="py-4 px-2 text-right font-bold font-mono">
                  {adjustingId === item.id ? (
                    <div className="flex justify-end items-center gap-2">
                      <input
                        type="number"
                        className="w-16 bg-[#F9F9F7] border border-gray-300 p-1 text-right text-[#1A1A1A] text-xs outline-none focus:border-[#D4C5B9]"
                        value={newValue}
                        onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                      />
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-[10px] text-emerald-600 font-bold px-2 py-1 hover:bg-emerald-50 transition"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className={item.quantity <= 20 ? 'text-red-600' : 'text-gray-700'}>
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
                    className="p-2 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-50 transition"
                    aria-label="Edit stock"
                  >
                    <Edit size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InventoryTable;
