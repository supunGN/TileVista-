import React, { useState } from 'react';
import { Card, Button, Input } from '@tilevista/ui';
import { AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { calculateTileRequirements } from '@tilevista/utils';

export const AdminFeature: React.FC = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [area, setArea] = useState(12);

  // Compute tile requirements for preview inside admin panel
  const { tilesNeeded, boxesNeeded } = calculateTileRequirements(area, '600x600mm');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Creating Product SKU: ${sku}, Stock: ${quantity}`);
  };

  return (
    <div className="p-8 bg-darkBg text-slate-100 min-h-screen font-outfit">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Administrative Portal</h1>
        <p className="text-sm text-slate-400 mt-1">Catalog inventories additions and real-time syncing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Product Form */}
        <div className="lg:col-span-2">
          <Card className="border border-glassBorder p-8">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <PlusCircle className="text-indigo-400" size={22} /> Add New Showroom Product
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Product SKU Code"
                  placeholder="TL-MAR-600"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  required
                />
                <Input
                  label="Product Name"
                  placeholder="Royal Marble Tile"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Input
                  label="Initial Stock Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-400">Sync Mode</span>
                  <span className="text-emerald-400 font-bold border border-emerald-500/30 bg-emerald-500/10 py-3 px-4 rounded-xl text-center text-sm flex items-center justify-center gap-2">
                    <RefreshCw size={16} className="animate-spin" /> POS Real-Time Ready
                  </span>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Add SKU to Catalog
              </Button>
            </form>
          </Card>
        </div>

        {/* Tile Calculator Helper Sidepanel */}
        <div>
          <Card className="border border-glassBorder">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <AlertCircle className="text-indigo-400" size={20} /> Tiling Calculator
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Determine inventory needs quickly for standard 600x600mm tiling layouts.
            </p>

            <Input
              label="Enter Layout Floor Area (Sq. Meters)"
              type="number"
              value={area}
              onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
            />

            <div className="space-y-4 text-sm mt-8 border-t border-slate-800 pt-6">
              <div className="flex justify-between text-slate-400">
                <span>Calculated Tiles Needed</span>
                <span className="text-white font-bold">{tilesNeeded} tiles</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Standard Normalizing Boxes</span>
                <span className="text-indigo-400 font-extrabold">{boxesNeeded} boxes</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AdminFeature;
