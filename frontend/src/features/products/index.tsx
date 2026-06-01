import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Product } from '@tilevista/types';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'TL-MAR-600',
    name: 'Royal Marble Polished Tile',
    description: 'Ultra-premium polished white marble porcelain tile.',
    price: 3850,
    discount: 10,
    quantity: 140,
    category: 'TILE',
    imageUrl: '',
    brand: 'Rocell',
    color: 'White',
    material: 'Porcelain',
    size: '600x600mm',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    sku: 'BW-BAS-WSH',
    name: 'Vessel Oval Wash Basin',
    description: 'Sleek matte ceramic wash basin.',
    price: 24500,
    discount: 0,
    quantity: 18,
    category: 'BATHWARE',
    imageUrl: '',
    brand: 'Lanka Tiles',
    color: 'Matte Black',
    material: 'Ceramic',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const ProductsFeature: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 bg-darkBg text-slate-100 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-outfit text-3xl font-bold tracking-tight">Showroom Catalogue</h1>
          <p className="text-sm text-slate-400 mt-1">Explore our premium tiles, bathwares, and accessories.</p>
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0 w-64">
            <Input
              placeholder="Search by name, SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="secondary">
            <Filter size={18} /> Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {['ALL', 'TILE', 'BATHWARE', 'ACCESSORY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === 'ALL' ? null : cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              (cat === 'ALL' && !selectedCategory) || selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-premium'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <Card key={p.id} className="border border-glassBorder hover:border-indigo-500/30 flex flex-col justify-between h-full">
            <div>
              <div className="w-full h-48 bg-slate-800 rounded-2xl mb-4 flex items-center justify-center text-slate-600">
                <span>[ Product Image Placeholder ]</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {p.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{p.sku}</span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{p.description}</p>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-indigo-400">
                  {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(
                    p.price * (1 - p.discount / 100)
                  )}
                </span>
                {p.discount > 0 && (
                  <span className="text-sm text-slate-400 line-through">
                    {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(p.price)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="primary">
                  <ShoppingCart size={16} /> Add to Cart
                </Button>
                <Button variant="secondary">
                  <Eye size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ProductsFeature;
