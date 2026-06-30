import { useEffect, useState } from 'react';
import React from 'react';
import { X, RotateCw, Trash2, ArrowLeft } from 'lucide-react';
import { useDesignerStore } from '../../store/designer.store';
import { DOOR_STYLES, WINDOW_STYLES, renderDoorIcon, ItemSidebarPreview } from './SharedDesignerEngine';
import { getActiveCategories, getActiveCatalog } from './catalog';
import { remoteLog } from './SharedDesignerEngine';

export default function ProductPanel() {
  const { 
    state, setState, activeCategory, setActiveCategory, 
    activePlacement, setActivePlacement, isPlacingItem, setIsPlacingItem, selectedItemId, setSelectedItemId, recordHistory, placedItems,
    selectedItemColor, setSelectedItemColor, selectedWallIdx, setSelectedWallIdx
  } = useDesignerStore();

  const [dynamicItems, setDynamicItems] = useState<any[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [coverageHeightInput, setCoverageHeightInput] = useState<string>('');
  const [selectedProductDetails, setSelectedProductDetails] = useState<any | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

  useEffect(() => {
    setSelectedProductDetails(null);
    setSelectedSubcategory('All');
  }, [activeCategory]);

  const isFloorTile = (item: any) => {
    const catId = item.categoryId !== null && item.categoryId !== undefined ? Number(item.categoryId) : null;
    const subcatId = item.subcategoryId !== null && item.subcategoryId !== undefined ? Number(item.subcategoryId) : null;
    return catId === 1 && subcatId === 1;
  };

  useEffect(() => {
    if (activeCategory && !['openings', 'wall_colours'].includes(activeCategory)) {
      setIsLoadingItems(true);
      if (activeCategory === 'ospos_tiles') {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        fetch(`${apiUrl}/items`)
          .then(res => res.json())
          .then(data => {
            console.log("OSPOS_TILES raw items fetched:", data);
            // Filter strictly to floor tiles (categoryId = 1, subcategoryId = 1)
            const tiles = data.filter((d: any) => isFloorTile(d));
            console.log("OSPOS_TILES filtered tiles:", tiles);
            setDynamicItems(tiles || []);
            setIsLoadingItems(false);
          })
          .catch(err => {
            console.error(err);
            setDynamicItems([]);
            setIsLoadingItems(false);
          });
      } else if (['wall_tiles', 'floor_tiles', 'bathware_products'].includes(activeCategory)) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        fetch(`${apiUrl}/items`)
          .then(res => res.json())
          .then(data => {
            if (activeCategory === 'wall_tiles') {
              setDynamicItems(data.filter((d: any) => {
                const catId = d.categoryId !== null && d.categoryId !== undefined ? Number(d.categoryId) : null;
                const subcatId = d.subcategoryId !== null && d.subcategoryId !== undefined ? Number(d.subcategoryId) : null;
                return catId === 1 && subcatId === 2;
              }) || []);
            } else if (activeCategory === 'floor_tiles') {
              setDynamicItems(data.filter((d: any) => isFloorTile(d)) || []);
            } else {
              setDynamicItems(data.filter((d: any) => d.category?.toLowerCase() !== 'tiles') || []);
            }
            setIsLoadingItems(false);
          })
          .catch(err => {
            console.error(err);
            setDynamicItems([]);
            setIsLoadingItems(false);
          });
      } else {
        fetch(`/api/furniture?category=${activeCategory}`)
          .then(res => res.json())
          .then(data => {
            setDynamicItems(data.items || []);
            setIsLoadingItems(false);
          })
          .catch(err => {
            console.error(err);
            setDynamicItems([]);
            setIsLoadingItems(false);
          });
      }
    } else {
      setDynamicItems([]);
    }
  }, [activeCategory, state.designType]);


  const confirmPlacement = () => {
    if (!isPlacingItem) return;
    recordHistory([...placedItems, isPlacingItem]);
    setSelectedItemId(isPlacingItem.id);
    setIsPlacingItem(null);
  };

  const cancelPlacement = () => setIsPlacingItem(null);

  const handleDeleteItem = () => {
    if (!selectedItemId) return;
    if (placedItems.some(i => i.id === selectedItemId)) {
      recordHistory(placedItems.filter(i => i.id !== selectedItemId));
    } else {
      setState((prev: any) => ({
        ...prev,
        wallOpenings: prev.wallOpenings.filter((op: any) => op.id !== selectedItemId)
      }));
    }
    setSelectedItemId(null);
  };

  const handleRotateItem = () => {
    if (!selectedItemId) return;
    recordHistory(placedItems.map(i => i.id === selectedItemId ? { ...i, rotation: i.rotation - Math.PI / 4 } : i));
  };
  
  const selectedItem = placedItems.find(i => i.id === selectedItemId) || state.wallOpenings.find(op => op.id === selectedItemId);

  const handleAddItem = (type: string, dynamicItem?: any) => {
    const catalog = getActiveCatalog(state.designType, state.subRoomType || 'living_room');
    const cat = catalog.find((i: any) => i.type === type) || dynamicItem;
    if (!cat) return;
    
    // Map relative uploads path to absolute URL if needed
    const modelUrl = cat.glbUrl || cat.model || undefined;
    const STATIC_BASE = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:4000';
    const fullModelUrl = modelUrl && modelUrl.startsWith('/uploads') ? `${STATIC_BASE}${modelUrl}` : modelUrl;

    setIsPlacingItem({
      id: `${type}_${Date.now()}`,
      type: cat.type || type,
      name: cat.name,
      cost: cat.cost || cat.price || 0,
      position: [0, 0, 0],
      rotation: 0,
      isWallMounted: cat.isWallMounted || false,
      color: selectedItemColor || '#FFFFFF',
      model: fullModelUrl
    });

    if (activeCategory !== 'bathware_products') {
      setActiveCategory(null);
    }
  };

  return (
    <>
      {/* ── RIGHT SIDEBAR TOOLBAR ── */}
      <div className={`absolute transition-all duration-300 ${activeCategory === 'bathware_products' ? 'right-[440px]' : 'right-6'} top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30`}>
        {/* Home / exit */}
        <button
          id="btn-exit"
          onClick={() => { window.location.href = '/designer'; }}
          className="w-12 h-12 bg-black text-white hover:bg-[#333] shadow-xl rounded-xl flex items-center justify-center transition-all"
          title="Exit to Designer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* Category icons */}
        <div className="bg-black rounded-xl p-1.5 shadow-2xl flex flex-col gap-1.5 border border-white/10">
          {getActiveCategories(state.designType, state.subRoomType)
            .filter(cat => ['openings', 'wall_colours', 'ospos_tiles', 'wall_tiles', 'floor_tiles', 'bathware_products'].includes(cat.id))
            .map(cat => (
            <button
              key={cat.id}
              id={`btn-cat-${cat.id}`}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeCategory === cat.id
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              title={cat.label}
            >
              {cat.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── ITEMS DRAWER (FLOATING DRAWER FOR TILES & OPENINGS) ── */}
      {activeCategory && activeCategory !== 'bathware_products' && (
        <div className={`absolute right-20 top-1/2 -translate-y-1/2 ${['ospos_tiles', 'wall_tiles', 'floor_tiles'].includes(activeCategory) ? 'w-[360px]' : 'w-64'} bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-5 z-30 font-sans flex flex-col gap-4`}>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
            <h3 className="text-xs font-bold tracking-wider text-[#1A1A1A] uppercase">
              {activeCategory === 'wall_tiles' ? 'Wall Tiles' :
               activeCategory === 'floor_tiles' ? 'Floor Tiles' :
               activeCategory === 'ospos_tiles' ? 'Load Tiles' : 
               `Add ${activeCategory.replace('_', ' ')}`}
            </h3>
            <button onClick={() => setActiveCategory(null)} className="p-1 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          
          <div className={`space-y-3 ${activeCategory === 'ospos_tiles' ? 'max-h-[75vh]' : 'max-h-[300px]'} overflow-y-auto pr-2`}>
            {activeCategory === 'wall_colours' ? (
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block">Solid Colors</span>
                <div className="grid grid-cols-5 gap-2">
                  {['#F8F8F8', '#E1D5C9', '#E7D6C9', '#C06C2D', '#976050', '#BDCDD4', '#6C8592', '#97A27E', '#8A8A8A', '#958981', '#73566D', '#547061'].map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        setState((prev: any) => ({
                          ...prev,
                          wallDesigns: prev.wallDesigns.map((w: any) => ({
                            ...w,
                            tileColorBottom: color,
                            tileColorTop: color,
                            tileColorCenter: color,
                            tileColorSides: color
                          }))
                        }));
                        setActiveCategory(null);
                      }}
                      className="w-10 h-10 rounded-xl border border-gray-200 hover:border-black transition-all shadow-sm flex-shrink-0"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            ) : ['ospos_tiles', 'wall_tiles', 'floor_tiles'].includes(activeCategory) ? (
              <div className="space-y-2 pt-1 pb-4">
                {activeCategory === 'wall_tiles' && (
                  <div className="mb-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-600 tracking-wider">TILE HEIGHT (M)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0.1"
                      className="w-16 bg-white border border-gray-200 rounded text-xs px-2 py-1 outline-none focus:border-black transition-colors"
                      value={coverageHeightInput}
                      onChange={(e) => {
                        const strVal = e.target.value;
                        setCoverageHeightInput(strVal);
                        const val = strVal ? parseFloat(strVal) : null;
                        if (selectedWallIdx !== null) {
                          setState((prev: any) => {
                            const next = [...prev.wallDesigns];
                            if (!next[selectedWallIdx]) next[selectedWallIdx] = { wallIndex: selectedWallIdx };
                            next[selectedWallIdx] = { ...next[selectedWallIdx], textureCoverageHeight: val };
                            return { ...prev, wallDesigns: next };
                          });
                        } else {
                          setState((prev: any) => {
                            const next = [...prev.wallDesigns];
                            for (let i = 0; i < Math.max(4, next.length); i++) {
                              if (!next[i]) next[i] = { wallIndex: i };
                              next[i] = { ...next[i], textureCoverageHeight: val };
                            }
                            return { ...prev, wallDesigns: next };
                          });
                        }
                      }}
                      placeholder="Full"
                    />
                  </div>              )}
                {isLoadingItems ? (
                  <div className="text-sm text-gray-500 py-8 text-center animate-pulse font-medium">Loading items from OSPOS...</div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {dynamicItems.map((item, idx) => {
                      const STATIC_BASE = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:4000';
                      
                      // Format price
                      const priceWhole = Math.floor(item.price || 0);
                      const priceDecimal = ((item.price || 0) % 1).toFixed(2).substring(1);
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (item.imageUrl) {
                              if (activeCategory === 'wall_tiles') {
                                const texUrl = `${STATIC_BASE}${item.imageUrl}`;
                                const hVal = coverageHeightInput ? parseFloat(coverageHeightInput) : null;
                                remoteLog("TILE CLICKED. selectedWallIdx:", selectedWallIdx);
                                if (state.designType === 'bathroom') {
                                  if (selectedWallIdx !== null) {
                                    setState((prev: any) => {
                                      const next = [...prev.wallDesigns];
                                      if (!next[selectedWallIdx]) next[selectedWallIdx] = { wallIndex: selectedWallIdx };
                                      next[selectedWallIdx] = { 
                                        ...next[selectedWallIdx], 
                                        textureUrl: texUrl, 
                                        textureCoverageHeight: hVal,
                                        tileAssetId: item.itemId.toString()
                                      };
                                      return { ...prev, wallDesigns: next };
                                    });
                                    setSelectedWallIdx(null);
                                  } else {
                                    alert("Please select a wall in the 3D view first to apply this tile.");
                                  }
                                } else {
                                  setState((prev: any) => ({
                                    ...prev,
                                    wallTextureUrl: texUrl
                                  }));
                                }
                              } else {
                                setState((prev: any) => ({
                                  ...prev,
                                  floorTextureUrl: `${STATIC_BASE}${item.imageUrl}`
                                }));
                              }
                            }
                          }}
                          className="text-left bg-white transition-all overflow-hidden flex flex-col group relative border border-transparent hover:border-gray-200 p-1.5 -m-1.5 rounded-xl"
                        >
                          <div className="w-full aspect-square bg-[#f5f5f5] flex items-center justify-center overflow-hidden mb-3 rounded-lg">
                            {item.imageUrl ? (
                              <img src={`${STATIC_BASE}${item.imageUrl}`} alt={item.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="text-gray-400 text-xs text-center p-2 font-medium">No Image</div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 px-1">
                            {/* Brand / Short Name (assuming first word is brand/style) */}
                            <span className="text-xs font-extrabold text-[#111111] uppercase tracking-wide">{item.name.split(' ')[0]}</span>
                            {/* Full Description */}
                            <span className="text-[11px] text-gray-600 leading-snug min-h-[34px]">{item.name}</span>
                            
                            {/* Price formatted like IKEA */}
                            <div className="mt-1.5 flex items-start">
                              <span className="text-xs font-bold text-black mt-0.5 mr-0.5">Rs</span>
                              <span className="text-xl font-extrabold text-black leading-none">{priceWhole}</span>
                              <span className="text-[10px] font-bold text-black mt-0.5">{priceDecimal}</span>
                            </div>
                            
                            {/* Availability */}
                            {item.quantity !== undefined && (
                              <div className="mt-2.5 flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${item.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className={`text-[10px] font-bold ${item.quantity > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                  {item.quantity > 0 ? `In Stock: ${item.quantity}` : 'Out of stock'}
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : activeCategory === 'openings' ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block">Doors</span>
                  <div className="grid grid-cols-2 gap-2">
                    {DOOR_STYLES.map((door) => (
                      <button
                        key={door.id}
                        onClick={() => {
                          setActivePlacement({
                            type: 'door',
                            style: door.id,
                            name: door.name,
                            width: door.width,
                            height: door.height,
                            sillHeight: door.sillHeight,
                          });
                          setActiveCategory(null);
                        }}
                        className="p-2 border border-gray-100 rounded-xl hover:border-black hover:bg-gray-55 transition-all flex flex-col items-center justify-center gap-1.5 text-center"
                      >
                        <div className="h-10 flex items-center justify-center">
                          {renderDoorIcon(door.id)}
                        </div>
                        <span className="text-[8px] font-bold block text-[#1A1A1A] leading-tight">
                          {door.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block">Windows</span>
                  <div className="grid grid-cols-2 gap-2">
                    {WINDOW_STYLES.map((win) => (
                      <button
                        key={win.id}
                        onClick={() => {
                          setActivePlacement({
                            type: 'window',
                            style: win.id,
                            name: win.name,
                            width: win.width,
                            height: win.height,
                            sillHeight: win.sillHeight,
                          });
                          setActiveCategory(null);
                        }}
                        className="p-2 border border-gray-100 rounded-xl hover:border-black hover:bg-gray-55 transition-all flex flex-col items-center justify-center gap-1.5 text-center"
                      >
                        <div className="h-8 flex items-center justify-center">
                          {renderDoorIcon(win.id)}
                        </div>
                        <span className="text-[8px] font-bold block text-[#1A1A1A] leading-tight">
                          {win.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              (state.designType === 'room' ? dynamicItems : getActiveCatalog(state.designType, state.subRoomType).filter(i => i.type === activeCategory)).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddItem(item.type, state.designType === 'room' ? item : undefined)}
                  className="w-full text-left p-3.5 border border-gray-100 rounded-xl hover:border-black hover:bg-gray-55 transition-all flex flex-col gap-1.5"
                >
                  <span className="text-xs font-bold text-[#1A1A1A]">{item.name}</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      {item.isWallMounted ? 'Wall Snap' : 'Floor Placement'}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">Rs {item.cost?.toFixed(2)}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── FULL-HEIGHT PRODUCT SIDEBAR (IKEA STYLE FOR BATHWARE PRODUCTS) ── */}
      {activeCategory === 'bathware_products' && (
        <div className="fixed right-0 top-0 bottom-0 h-screen w-[420px] bg-white border-l border-gray-200 shadow-2xl z-40 flex flex-col font-sans transition-all duration-300">
          {selectedProductDetails ? (
            /* DETAILED VIEW (showing product info with action controls) */
            <div className="flex-1 flex flex-col h-full bg-white">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                <button 
                  onClick={() => setSelectedProductDetails(null)}
                  className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                  title="Back to products"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="text-xs font-bold text-gray-800 tracking-wider uppercase">Product Details</span>
                <button 
                  onClick={() => { setSelectedProductDetails(null); setActiveCategory(null); }}
                  className="ml-auto p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Product 3D Preview */}
                <ItemSidebarPreview item={selectedProductDetails} heightClass="h-64" />

                {/* Details Card */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900 leading-tight">
                      {selectedProductDetails.name}
                    </h2>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                      {selectedProductDetails.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {selectedProductDetails.description || "No description provided for this product catalog entry."}
                  </p>

                  <div className="border-t border-b border-gray-100 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Showroom Price</span>
                      <div className="flex items-baseline mt-0.5">
                        <span className="text-xs font-bold text-gray-900 mr-0.5">Rs</span>
                        <span className="text-2xl font-black text-gray-900 leading-none">
                          {Math.floor(selectedProductDetails.price || 0).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-gray-900">
                          {((selectedProductDetails.price || 0) % 1).toFixed(2).substring(1)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">OSPOS Inventory</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                        selectedProductDetails.quantity > 0 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {selectedProductDetails.quantity > 0 ? `In Stock: ${selectedProductDetails.quantity}` : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specifications List */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block">Product Specifications</span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Item Code / SKU</span>
                      <span className="font-semibold text-gray-800">{selectedProductDetails.sku || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Material Family</span>
                      <span className="font-semibold text-gray-800">{selectedProductDetails.material || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Finish Family</span>
                      <span className="font-semibold text-gray-800">{selectedProductDetails.finish || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Asset Loaded</span>
                      <span className="font-semibold text-gray-800">{selectedProductDetails.hasAssetEntry ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button
                  onClick={() => {
                    handleAddItem(selectedProductDetails.category, state.designType === 'room' ? selectedProductDetails : { ...selectedProductDetails, type: selectedProductDetails.category });
                  }}
                  className="flex-1 py-3 bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98"
                >
                  Place Another
                </button>
                <button
                  onClick={() => {
                    setSelectedProductDetails(null);
                  }}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  List
                </button>
              </div>
            </div>
          ) : (
            /* PRODUCTS CATALOG GRID (matching IKEA category list layout) */
            <div className="flex-1 flex flex-col h-full bg-white">
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black tracking-tight text-gray-900 uppercase">Bathroom products</h3>
                  <p className="text-[10px] text-gray-400 font-light mt-0.5">Select and drag products to place them into the scene.</p>
                </div>
                <button 
                  onClick={() => setActiveCategory(null)} 
                  className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Subcategories Horizontal Scroll Filter (IKEA style) */}
              <div className="px-6 py-3 border-b border-gray-50 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap bg-gray-50/55">
                {['All', 'Wash Basins', 'Water Closets', 'Accessories'].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      selectedSubcategory === sub
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Grid List */}
              <div className="flex-1 overflow-y-auto p-6">
                {isLoadingItems ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">Loading items...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {dynamicItems
                      .filter(item => selectedSubcategory === 'All' || item.category === selectedSubcategory)
                      .map((item, idx) => {
                        const STATIC_BASE = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:4000';
                        const priceWhole = Math.floor(item.price || 0);
                        const priceDecimal = ((item.price || 0) % 1).toFixed(2).substring(1);
                        
                        return (
                          <div 
                            key={idx}
                            onClick={() => {
                              handleAddItem(item.category, state.designType === 'room' ? item : { ...item, type: item.category });
                              setSelectedProductDetails(item);
                            }}
                            className="group flex flex-col bg-white border border-gray-150 rounded-2xl p-3 hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer relative"
                          >
                            {/* Product Image */}
                            <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-50 relative group-hover:scale-[1.02] transition-transform duration-300">
                              {item.imageUrl ? (
                                <img 
                                  src={`${STATIC_BASE}${item.imageUrl}`}
                                  alt={item.name}
                                  className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply"
                                />
                              ) : (
                                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">No Image</span>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="mt-3 flex-1 flex flex-col">
                              <h4 className="text-[11px] font-black text-gray-900 leading-tight tracking-tight uppercase group-hover:text-black transition-colors line-clamp-1">
                                {item.name.split(' ')[0]} / {item.name.split(' ').slice(1).join(' ')}
                              </h4>
                              <p className="text-[9px] text-gray-400 font-light mt-0.5 line-clamp-2 leading-relaxed">
                                {item.name}
                              </p>
                              
                              <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-gray-50">
                                <div className="flex items-baseline">
                                  <span className="text-[9px] font-bold text-gray-900 mr-0.5">Rs</span>
                                  <span className="text-[15px] font-black text-gray-900 leading-none">{priceWhole.toLocaleString()}</span>
                                  <span className="text-[9px] font-bold text-gray-900">{priceDecimal}</span>
                                </div>
                                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                                  item.quantity > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                  {item.quantity > 0 ? 'In Stock' : 'Out'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PLACING ITEM CONFIRMATION ── */}
      {isPlacingItem && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-full px-6 py-3.5 flex items-center gap-4 z-40">
          <span className="text-xs font-semibold text-gray-600">
            Drag <strong className="text-black">{isPlacingItem.name}</strong> into position…
          </span>
          <button
            id="btn-confirm-placement"
            onClick={confirmPlacement}
            className="px-4 py-1.5 bg-[#4ade80] hover:bg-[#22c55e] text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md transition-all"
          >
            Confirm
          </button>
          <button
            id="btn-cancel-placement"
            onClick={cancelPlacement}
            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── PLACING OPENING CONFIRMATION ── */}
      {activePlacement && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-full px-6 py-3.5 flex items-center gap-4 z-40">
          <span className="text-xs font-semibold text-gray-600">
            Hover & click on a wall to place <strong className="text-black">{activePlacement.name}</strong>…
          </span>
          <button
            id="btn-cancel-opening-placement"
            onClick={() => setActivePlacement(null)}
            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── SELECTED ITEM ACTIONS ── */}
      {selectedItem && !isPlacingItem && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-white/10 shadow-2xl rounded-full px-5 py-3 flex items-center gap-4 z-30 text-white">
          <span className="text-xs font-semibold tracking-wide border-r border-white/15 pr-4">
            Selected: <strong className="text-gray-200">{selectedItem.name}</strong>
          </span>
          {!(selectedItem as any).isOpening && (
            <button
              id="btn-rotate"
              onClick={handleRotateItem}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all"
              title="Rotate 90°"
            >
              <RotateCw size={14} />
              Rotate
            </button>
          )}
          <button
            id="btn-delete"
            onClick={handleDeleteItem}
            className="p-2 bg-red-500/85 hover:bg-red-600 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase transition-all"
            title="Delete"
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={() => setSelectedItemId(null)}
            className="text-[10px] text-gray-400 hover:text-white font-bold tracking-widest uppercase pl-2"
          >
            Deselect
          </button>
        </div>
      )}

      
    </>
  );
}
