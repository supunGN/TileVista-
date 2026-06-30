import { useEffect, useState } from 'react';
import React from 'react';
import { X, RotateCw, Trash2 } from 'lucide-react';
import { useDesignerStore } from '../../store/designer.store';
import { DOOR_STYLES, WINDOW_STYLES, renderDoorIcon } from './SharedDesignerEngine';
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
                return catId === 1 && (subcatId === 2 || subcatId === 4);
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
    const cat = catalog.find((i: any) => i.type === type);
    if (!cat) return;
    setIsPlacingItem({
      id: `${type}_${Date.now()}`,
      type,
      name: cat.name,
      cost: cat.cost,
      position: [0, 0, 0],
      rotation: 0,
      isWallMounted: cat.isWallMounted || false,
      color: selectedItemColor || '#FFFFFF'
    });
    setActiveCategory(null);
  };

  return (
    <>
      {/* ── RIGHT SIDEBAR TOOLBAR ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
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

      {/* ── ITEMS DRAWER ── */}
      {activeCategory && (
        <div className={`absolute right-20 top-1/2 -translate-y-1/2 ${['ospos_tiles', 'wall_tiles', 'floor_tiles', 'bathware_products'].includes(activeCategory) ? 'w-[360px]' : 'w-64'} bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-5 z-30 font-sans flex flex-col gap-4`}>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
            <h3 className="text-xs font-bold tracking-wider text-[#1A1A1A] uppercase">
              {activeCategory === 'wall_tiles' ? 'Wall Tiles' :
               activeCategory === 'floor_tiles' ? 'Floor Tiles' :
               activeCategory === 'ospos_tiles' ? 'Load Tiles' : 
               activeCategory === 'bathware_products' ? 'Add Product' : `Add ${activeCategory.replace('_', ' ')}`}
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
            ) : ['ospos_tiles', 'wall_tiles', 'floor_tiles', 'bathware_products'].includes(activeCategory) ? (
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
                            if (activeCategory === 'bathware_products') {
                              handleAddItem(item.category, state.designType === 'room' ? item : { ...item, type: item.category });
                            } else if (item.imageUrl) {
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
