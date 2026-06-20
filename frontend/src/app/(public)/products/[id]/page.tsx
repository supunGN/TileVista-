'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Compass, ArrowLeft, Loader2, Sparkles, AlertCircle, Eye, Check } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

interface UnifiedItem {
  itemId: number;
  name: string;
  category: string;
  sku: string;
  description: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
  glbUrl: string | null;
  scale: { x: number; y: number; z: number };
  rotationY: number;
  tags: string[];
  material: string | null;
  finish: string | null;
  isEnabled: boolean;
}

// 3D Model component for loading dynamic GLB paths
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? Number(params.id) : null;

  const [product, setProduct] = useState<UnifiedItem | null>(null);
  const [allProducts, setAllProducts] = useState<UnifiedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'image' | 'model3d'>('image');
  const [quantity, setQuantity] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);

  const API_BASE = 'http://localhost:4000/api';
  const STATIC_BASE = 'http://localhost:4000';

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProductDetails = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch single product details
      const response = await fetch(`${API_BASE}/items/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to load product details (${response.status})`);
      }
      const data = await response.json();
      setProduct(data);
      if (data.glbUrl) {
        setViewMode('model3d');
      }

      // 2. Fetch all products to determine related items
      const allResponse = await fetch(`${API_BASE}/items`);
      if (allResponse.ok) {
        const allData = await allResponse.json();
        setAllProducts(allData);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center text-gray-400 gap-3">
        <Loader2 className="animate-spin text-[#D4C5B9]" size={36} />
        <span className="text-xs font-light tracking-widest uppercase font-mono">Fetching item records...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto p-8 border border-dashed border-red-200 bg-red-50/20 my-10">
        <AlertCircle className="text-red-500 mx-auto mb-4" size={32} />
        <h2 className="text-base font-bold text-[#1A1A1A] mb-2">Failed to load Product</h2>
        <p className="text-red-650 font-light text-xs mb-6">{error || 'Product ID could not be matched.'}</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="border border-gray-300 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-xs tracking-wider uppercase px-5 py-3 transition-colors"
          >
            Back to Shop
          </Link>
          <button
            onClick={fetchProductDetails}
            className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatLKR = (num: number) => {
    return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
  };

  const handleAddToCart = () => {
    alert(`Successfully added ${quantity} unit(s) of "${product.name}" to your shopping cart!`);
  };

  // Brand resolver
  const getBrand = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.startsWith('rocell')) return 'Rocell';
    if (lower.startsWith('lanka')) return 'Lanka Tiles';
    return 'Showroom Import';
  };

  // Image Fallback
  const getFallbackImage = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('tile')) {
      return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800';
    }
    if (cat.includes('bath') || cat.includes('basin') || cat.includes('toilet') || cat.includes('sanitary')) {
      return 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&q=80&w=800';
    }
    return 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800';
  };

  const productImageUrl = product.imageUrl ? `${STATIC_BASE}${product.imageUrl}` : getFallbackImage(product.category);
  const glbFullPath = product.glbUrl ? `${STATIC_BASE}${product.glbUrl}` : null;

  // Filter similar items (same category, enabled, excluding current product)
  const relatedItems = allProducts
    .filter((item) => item.isEnabled && item.category === product.category && item.itemId !== product.itemId)
    .slice(0, 3);

  // Stock status styling
  const stockLevel = product.quantity;
  const isOutOfStock = stockLevel <= 0;
  const isLowStock = stockLevel > 0 && stockLevel <= 10;

  return (
    <div className="py-6 font-sans max-w-7xl mx-auto space-y-12 px-4 selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">
      
      {/* 1. Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-[10px] tracking-widest font-semibold text-gray-400 uppercase">
        <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#1A1A1A] transition-colors">Shop</Link>
        <span>/</span>
        <span className="hover:text-[#1A1A1A] transition-colors">{product.category}</span>
        <span>/</span>
        <span className="text-gray-500 font-light truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* 2. Main Product Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image/3D Media Container */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] bg-gray-55 border border-gray-100 overflow-hidden flex items-center justify-center">
            
            {viewMode === 'image' || !glbFullPath ? (
              // 2D Image View
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('${productImageUrl}')` }}
              />
            ) : (
              // 3D Canvas View
              mounted && (
                <div className="w-full h-full relative">
                  <Suspense fallback={
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
                      <Loader2 className="animate-spin text-[#D4C5B9]" size={28} />
                      <span className="text-[10px] font-mono tracking-widest uppercase">Loading 3D asset...</span>
                    </div>
                  }>
                    <Canvas camera={{ position: [0, 1.2, 2.5], fov: 40 }}>
                      <ambientLight intensity={0.65} />
                      <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={1.2} castShadow />
                      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                      <Stage environment="city" intensity={0.5}>
                        <Model url={glbFullPath} />
                      </Stage>
                      <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={true} minDistance={1} maxDistance={6} />
                    </Canvas>
                  </Suspense>

                  {/* 3D control tip overlay */}
                  <span className="absolute bottom-4 right-4 bg-[#1A1A1A]/80 text-[#D4C5B9] text-[8px] font-bold tracking-widest uppercase px-2 py-1 select-none backdrop-blur-sm">
                    Drag to Rotate | Scroll to Zoom
                  </span>
                </div>
              )
            )}

            {/* Availability badges */}
            <span className="absolute top-5 left-5 z-10 bg-white/95 text-[#1A1A1A] font-bold text-[8px] uppercase tracking-widest px-3 py-1.5 shadow-sm border border-gray-100">
              {product.category}
            </span>

            {glbFullPath && (
              <span className="absolute top-5 right-5 z-10 bg-[#1A1A1A] text-[#D4C5B9] font-bold text-[8px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1 shadow-sm border border-[#D4C5B9]/20 animate-pulse">
                <Sparkles size={9} />
                <span>3D Canvas Ready</span>
              </span>
            )}
          </div>

          {/* Media selector buttons (Only if GLB exists) */}
          {glbFullPath && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('image')}
                className={`flex-1 py-3.5 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 ${
                  viewMode === 'image'
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-[#1A1A1A]'
                }`}
              >
                Lifestyle Photo View
              </button>
              <button
                onClick={() => setViewMode('model3d')}
                className={`flex-1 py-3.5 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 flex items-center justify-center gap-2 ${
                  viewMode === 'model3d'
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-[#1A1A1A]'
                }`}
              >
                <Compass size={14} className={viewMode === 'model3d' ? 'animate-spin' : ''} />
                <span>3D Interactive View</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Console Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Brand, Name, SKU */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4C5B9] uppercase">
                {getBrand(product.name)}
              </span>
              <span className="text-[9px] text-gray-400 font-mono tracking-wider">SKU: {product.sku}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <div className="flex gap-2 items-center pt-2">
              {product.finish && (
                <span className="text-[9px] font-mono tracking-widest bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-500 uppercase">
                  {product.finish}
                </span>
              )}
              {product.material && (
                <span className="text-[9px] font-mono tracking-widest bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-500 uppercase font-semibold">
                  {product.material}
                </span>
              )}
              
              {/* Dynamic stock label */}
              <span className={`text-[9px] font-mono tracking-widest px-2.5 py-0.5 border uppercase font-bold ${
                isOutOfStock 
                  ? 'bg-red-50 text-red-650 border-red-150' 
                  : isLowStock 
                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-100'
              }`}>
                {isOutOfStock ? 'Sold Out' : isLowStock ? `Low Stock: ${stockLevel} left` : 'Available'}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 w-full" />

          {/* Price details */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase leading-none block">Showroom price</span>
            <span className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-tight block">
              {formatLKR(product.price)}
            </span>
            <span className="text-[10px] text-gray-400 font-light block leading-normal">
              Price includes local warehouse logistics and syncs live with physical store POS.
            </span>
          </div>

          <hr className="border-gray-100 w-full" />

          {/* Add to Cart Actions */}
          <div className="space-y-4">
            
            {/* Quantity select inputs */}
            {!isOutOfStock && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">Select Quantity</span>
                <div className="flex items-center w-32 border border-gray-200 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1A1A1A] font-light text-base border-r border-gray-150 disabled:opacity-30 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={stockLevel}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.min(stockLevel, Math.max(1, val)));
                    }}
                    className="w-12 h-10 text-center font-mono text-xs text-[#1A1A1A] focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(stockLevel, quantity + 1))}
                    disabled={quantity >= stockLevel}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1A1A1A] font-light text-base border-l border-gray-150 disabled:opacity-30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Main Add-to-cart Action CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-[0.15em] uppercase py-4 transition-all duration-300 shadow-sm flex items-center justify-center gap-3 disabled:opacity-30 disabled:hover:bg-[#1A1A1A] disabled:hover:text-white"
            >
              <ShoppingCart size={15} />
              <span>{isOutOfStock ? 'OUT OF STOCK' : 'ADD TO SHOWROOM CART'}</span>
            </button>
          </div>

          <hr className="border-gray-100 w-full" />

          {/* Quick specs snippet */}
          <div className="bg-gray-55 p-4 border border-gray-100 space-y-2">
            <span className="text-[8.5px] font-bold tracking-widest text-gray-400 uppercase block mb-1">Stock status snapshot</span>
            <div className="grid grid-cols-2 gap-4 text-[11px] text-gray-500 font-mono">
              <div>LOCATION: <span className="font-semibold text-[#1A1A1A]">MATARA SHOWROOM</span></div>
              <div>STOCK QTY: <span className="font-semibold text-[#1A1A1A]">{stockLevel} UNITS</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Specifications and Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-gray-100 pt-12">
        
        {/* Description details */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold tracking-wide text-[#1A1A1A] uppercase">
            Architectural Description
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed tracking-wide">
            {product.description || 'This premium item has been selected by our procurement division to fit modern residential and commercial architectures. Sourced directly from manufacturers, it features high structural strength, pristine surface detail, and satisfies rigorous quality control certifications.'}
          </p>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            *Please inspect the physical item inside our Matara showroom to check the reflection profile, texture depth, and exact color values under custom lighting before finalizing order deposits.
          </p>
        </div>

        {/* Technical specs table */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold tracking-wide text-[#1A1A1A] uppercase">
            Technical Specifications
          </h2>
          <div className="border border-gray-150 bg-white">
            <div className="divide-y divide-gray-100 text-xs">
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">Brand</span>
                <span className="col-span-3 text-[#1A1A1A]">{getBrand(product.name)}</span>
              </div>
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">SKU Code</span>
                <span className="col-span-3 text-[#1A1A1A] font-mono">{product.sku}</span>
              </div>
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">Category</span>
                <span className="col-span-3 text-[#1A1A1A] uppercase font-semibold">{product.category}</span>
              </div>
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">Material</span>
                <span className="col-span-3 text-[#1A1A1A]">{product.material || 'Premium Ceramic'}</span>
              </div>
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">Finish family</span>
                <span className="col-span-3 text-[#1A1A1A] uppercase">{product.finish || 'Polished / Matte'}</span>
              </div>
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">Format Size</span>
                <span className="col-span-3 text-[#1A1A1A]">{product.category.toLowerCase().includes('tile') ? '600 x 600 mm' : 'Standard Sanitary Format'}</span>
              </div>
              <div className="grid grid-cols-5 p-3.5 items-center">
                <span className="col-span-2 font-semibold tracking-wider text-gray-400 uppercase text-[9.5px]">Inventory status</span>
                <span className="col-span-3 text-emerald-700 font-bold">{stockLevel} Units on shelf</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Related Products Suggestions */}
      {relatedItems.length > 0 && (
        <div className="border-t border-gray-100 pt-12 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4C5B9] uppercase block mb-1">
                More in this range
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A] uppercase">
                Similar Showroom Articles
              </h2>
            </div>
            <Link 
              href="/products" 
              className="text-[10px] font-bold tracking-widest text-[#1A1A1A] hover:text-[#D4C5B9] uppercase pb-1 border-b border-[#1A1A1A] hover:border-[#D4C5B9] transition-all"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedItems.map((item) => {
              const itemImage = item.imageUrl ? `${STATIC_BASE}${item.imageUrl}` : getFallbackImage(item.category);
              return (
                <div 
                  key={item.itemId}
                  className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                  onClick={() => router.push(`/products/${item.itemId}`)}
                >
                  <div className="relative w-full h-[180px] bg-gray-50 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103"
                      style={{ backgroundImage: `url('${itemImage}')` }}
                    />
                    <span className="absolute top-3 left-3 z-10 bg-white/95 text-[#1A1A1A] font-bold text-[7px] uppercase tracking-widest px-2 py-0.5 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">
                        {getBrand(item.name)}
                      </span>
                      <span className="text-[8px] text-gray-400 font-mono">{item.sku}</span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#1A1A1A] tracking-wide mb-4 line-clamp-1 group-hover:text-[#D4C5B9] transition-colors">
                      {item.name}
                    </h3>

                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold tracking-widest text-[#D4C5B9] uppercase leading-none mb-1">Unit Price</span>
                        <span className="text-xs font-bold text-[#1A1A1A]">{formatLKR(item.price)}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all duration-300">
                        <Eye size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
