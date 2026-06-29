'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Compass, ArrowLeft, Loader2, Sparkles, AlertCircle, Eye, Check, MapPin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

interface UnifiedItem {
  itemId: number;
  name: string;
  category: string;
  categoryId: number | null;
  subcategoryId: number | null;
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
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

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
    setAddedToCart(false);
    setQuantity(1);
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
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Brand resolver
  const getBrand = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.startsWith('rocell')) return 'Rocell';
    if (lower.startsWith('lanka')) return 'Lanka Tiles';
    //return 'Showroom Import';
  };

  // Image Fallback
  const getFallbackImage = (category: string) => {
    return '/images/placeholder.png';
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
    <div className="py-6 font-sans max-w-7xl mx-auto space-y-16 px-4 selection:bg-[#D4C5B9] selection:text-[#1A1A1A]">

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

      {/* 2. Main Product Frame — Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ─── LEFT COLUMN: Thumbnail Rail + Main Image/3D ─── */}
        <div className="lg:col-span-7 flex gap-4">

          {/* Thumbnail Rail */}
          <div className="hidden md:flex flex-col gap-3 w-[72px] flex-shrink-0">
            {/* Image thumbnail */}
            <button
              onClick={() => setViewMode('image')}
              className={`w-[72px] h-[72px] border-2 overflow-hidden transition-all duration-300 ${viewMode === 'image' ? 'border-[#1A1A1A] shadow-sm' : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                }`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${productImageUrl}')` }}
              />
            </button>

            {/* 3D model thumbnail */}
            {glbFullPath && (
              <button
                onClick={() => setViewMode('model3d')}
                className={`w-[72px] h-[72px] border-2 overflow-hidden flex items-center justify-center transition-all duration-300 ${viewMode === 'model3d' ? 'border-[#1A1A1A] bg-[#1A1A1A] shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Compass size={16} className={viewMode === 'model3d' ? 'text-[#D4C5B9] animate-spin' : 'text-gray-400'} style={{ animationDuration: '4s' }} />
                  <span className={`text-[7px] font-bold tracking-widest uppercase ${viewMode === 'model3d' ? 'text-[#D4C5B9]' : 'text-gray-400'}`}>3D</span>
                </div>
              </button>
            )}
          </div>

          {/* Main Media Area */}
          <div className="flex-1 space-y-3">
            <div className="relative w-full aspect-[4/3] bg-[#F9F9F7] border border-gray-100 overflow-hidden flex items-center justify-center">

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

              {/* Category badge */}
              <span className="absolute top-5 left-5 z-10 bg-white/95 text-[#1A1A1A] font-bold text-[8px] uppercase tracking-widest px-3 py-1.5 shadow-sm border border-gray-100">
                {product.category}
              </span>

              {/* 3D Ready badge */}
              {glbFullPath && (
                <span className="absolute top-5 right-5 z-10 bg-[#1A1A1A] text-[#D4C5B9] font-bold text-[8px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1 shadow-sm border border-[#D4C5B9]/20 animate-pulse">
                  <Sparkles size={9} />
                  <span>3D Canvas Ready</span>
                </span>
              )}
            </div>

            {/* Mobile-only media toggle buttons */}
            {glbFullPath && (
              <div className="flex gap-2 md:hidden">
                <button
                  onClick={() => setViewMode('image')}
                  className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 ${viewMode === 'image'
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-[#1A1A1A]'
                    }`}
                >
                  Photo
                </button>
                <button
                  onClick={() => setViewMode('model3d')}
                  className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase border transition-all duration-300 flex items-center justify-center gap-2 ${viewMode === 'model3d'
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-[#1A1A1A]'
                    }`}
                >
                  <Compass size={14} className={viewMode === 'model3d' ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
                  <span>3D View</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Product Details Console ─── */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* Product Name */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4C5B9] uppercase">
                {getBrand(product.name)}
              </span>
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
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Description from OSPOS */}
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {product.description || 'Premium selection showroom article, sourced and imported to fit contemporary architecture projects.'}
            </p>
          </div>

          <hr className="border-gray-100 w-full" />

          {/* Price block */}
          <div className="space-y-1">
            {/* <span className="text-[9px] font-bold tracking-widest text-[#D4C5B9] uppercase leading-none block">Showroom price</span> */}
            <span className="text-3xl md:text-4xl font-extrabold text-[#C8102E] tracking-tight block">
              {formatLKR(product.price)}
            </span>
          </div>

          {/* Product Code */}
          <div className="inline-flex items-center gap-2 border border-gray-200 px-3 py-2 bg-[#F9F9F7] self-start">
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Product Code:</span>
            <span className="text-xs font-mono font-bold text-[#1A1A1A] tracking-wider">{product.sku}</span>
          </div>

          <hr className="border-gray-100 w-full" />

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4">

            {/* Quantity */}
            {!isOutOfStock && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">Select Quantity</span>
                <div className="flex items-center w-32 border border-gray-200 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1A1A1A] font-light text-base border-r border-gray-150 disabled:opacity-30 transition-colors active:scale-90"
                  >
                    −
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
                    className="w-12 h-10 text-center font-mono text-xs text-[#1A1A1A] focus:outline-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(stockLevel, quantity + 1))}
                    disabled={quantity >= stockLevel}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1A1A1A] font-light text-base border-l border-gray-150 disabled:opacity-30 transition-colors active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full font-semibold text-xs tracking-[0.15em] uppercase py-4 transition-all duration-300 shadow-sm flex items-center justify-center gap-3 disabled:opacity-30 disabled:hover:bg-[#1A1A1A] disabled:hover:text-white ${addedToCart
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white'
                }`}
            >
              {addedToCart ? (
                <>
                  <Check size={15} className="animate-bounce" />
                  <span>Added to Showroom Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  <span>{isOutOfStock ? 'OUT OF STOCK' : 'Add to Showroom Cart'}</span>
                </>
              )}
            </button>
          </div>

          {/* Stock availability info */}
          <div className="flex items-start gap-2.5 pt-1">
            <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-medium leading-relaxed">
                {isOutOfStock
                  ? 'Currently out of stock at the showroom.'
                  : isLowStock
                    ? `Low stock.`
                    : `Stock available in Alahapperuma Trade Center, Weerawila, Hambantota.`
                }
              </span>
              {/* {!isOutOfStock && (
                <span className="text-[10px] text-gray-400 font-light mt-0.5">{stockLevel} units in showroom</span>
              )} */}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Related Products — "More From This Collection" */}
      {relatedItems.length > 0 && (
        <div className="border-t border-gray-100 pt-14 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4C5B9] uppercase block mb-1">
                Featured
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A]">
                More From This Collection
              </h2>
            </div>
            <Link
              href="/products"
              className="text-[10px] font-bold tracking-widest text-[#1A1A1A] hover:text-[#D4C5B9] uppercase pb-1 border-b border-[#1A1A1A] hover:border-[#D4C5B9] transition-all flex items-center gap-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((item) => {
              const itemImage = item.imageUrl ? `${STATIC_BASE}${item.imageUrl}` : getFallbackImage(item.category);
              return (
                <div
                  key={item.itemId}
                  className="flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                  onClick={() => router.push(`/products/${item.itemId}`)}
                >
                  {/* Card image — square */}
                  <div className="relative w-full aspect-square bg-[#F9F9F7] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${itemImage}')` }}
                    />
                  </div>

                  {/* Card details */}
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#1A1A1A] tracking-wide line-clamp-1 group-hover:text-[#D4C5B9] transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-sm font-bold text-[#C8102E]">{formatLKR(item.price)}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all duration-300">
                      <Eye size={13} />
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
