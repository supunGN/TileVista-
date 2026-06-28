import { useEffect, useState } from 'react';
import React from 'react';
import { X, RotateCw, Trash2 } from 'lucide-react';
import { useDesignerStore } from '../../store/designer.store';
import { getActiveCategories, DOOR_STYLES, WINDOW_STYLES, renderDoorIcon, getActiveCatalog } from './DesignerCanvas';

export default function ProductPanel() {
  const { 
    state, setState, activeCategory, setActiveCategory, 
    activePlacement, setActivePlacement, isPlacingItem, setIsPlacingItem, selectedItemId, setSelectedItemId, recordHistory, placedItems,
    selectedItemColor, setSelectedItemColor
  } = useDesignerStore();

  const [dynamicItems, setDynamicItems] = useState<any[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  useEffect(() => {
    if (activeCategory && state.designType === 'room' && activeCategory !== 'openings') {
      setIsLoadingItems(true);
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
            .filter(cat => state.designType === 'bathroom' ? true : cat.id === 'openings')
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
        <div className="absolute right-20 top-1/2 -translate-y-1/2 w-64 bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-5 z-30 font-sans flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
            <h3 className="text-xs font-bold tracking-wider text-[#1A1A1A] uppercase">
              Add {activeCategory.replace('_', ' ')}
            </h3>
            <button onClick={() => setActiveCategory(null)} className="p-1 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          
          {/* Color Selector */}
          {state.designType === 'room' && activeCategory !== 'openings' && (
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-3">
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Item Color</span>
              <div className="flex flex-wrap gap-2">
                {['#FFFFFF', '#D1D5DB', '#4B5563', '#1F2937', '#9CA3AF', '#FCD34D', '#F87171', '#60A5FA', '#34D399', '#A78BFA'].map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedItemColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${selectedItemColor === color ? 'border-black scale-110 shadow-md' : 'border-gray-200 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {activeCategory === 'openings' ? (
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
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">£{item.cost.toFixed(2)}</span>
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
