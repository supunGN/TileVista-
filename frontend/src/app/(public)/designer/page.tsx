'use client';

import React, { useState } from 'react';
import { BathroomCanvas } from '../../../components/canvas';
import { Settings, Save, LayoutGrid, Plus, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function DesignerPage() {
  const [designerMode, setDesignerMode] = useState<'select' | 'bathroom'>('select');
  
  // 3D Canvas parameters state
  const [width, setWidth] = useState(2.4);
  const [length, setLength] = useState(3.0);
  const [height, setHeight] = useState(2.7);
  const [shape, setShape] = useState<'RECTANGLE' | 'L_SHAPE'>('RECTANGLE');
  const [activeAssetTab, setActiveAssetTab] = useState<'TILES' | 'BATHWARE' | 'LIGHTS'>('TILES');

  const handleSaveLayout = () => {
    alert(`Layout saved successfully!\nDimensions: ${width}m x ${length}m x ${height}m\nShape: ${shape === 'RECTANGLE' ? 'Rectangle' : 'L-Shape'}`);
  };

  const handleAddAsset = (assetName: string, price: number) => {
    alert(`Added "${assetName}" to your 3D customizer canvas! (Estimated cost: LKR ${price.toLocaleString('en-LK')})`);
  };

  if (designerMode === 'select') {
    return (
      <div className="py-6 font-sans max-w-7xl mx-auto select-none">
        {/* Header Text Block (exactly matching the user UI image) */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D4C5B9] uppercase block">
            DESIGN YOUR ROOM
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Create Your Space
          </h1>
          <p className="text-sm md:text-[15px] text-gray-500 font-light leading-relaxed max-w-2xl mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nunc justo, ac elementum turpis pellentesque eget. Morbi lacus tortor, vulputate sed ultricies at
          </p>
        </div>

        {/* Thin Horizontal Divider Line (exactly matching the user UI image) */}
        <div className="border-b border-gray-100 my-8 w-full max-w-5xl"></div>

        {/* Two-Column Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          
          {/* Card 1: Room Planner (Dark theme bottom) */}
          <div 
            onClick={() => alert('Room Planner customizer workspace is currently in development. Please use the Bathroom Planner to visualize your materials.')}
            className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
          >
            {/* Top Image (Modern neutral bedroom setup) */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800')` }}
              />
            </div>

            {/* Bottom Panel (Matte Off-Black `#1A1A1A`) */}
            <div className="bg-[#1A1A1A] p-8 flex flex-col justify-between min-h-[200px] text-white">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold tracking-wide">
                  Room Planner
                </h3>
                <p className="text-xs text-gray-400 font-light tracking-wide">
                  Lorem Ipsum Dolor Sit Amet, Consectetur
                </p>
              </div>

              {/* Circle Arrow Button (White Border, placed at bottom left) */}
              <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[#1A1A1A] group-hover:border-white">
                <ArrowRight size={16} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Card 2: Bathroom Planner (Warm Sand theme bottom) */}
          <div 
            onClick={() => setDesignerMode('bathroom')}
            className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
          >
            {/* Top Image (Modern high-end bathroom vanity setup) */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800')` }}
              />
            </div>

            {/* Bottom Panel (Warm Muted Sand `#D4C5B9`) */}
            <div className="bg-[#D4C5B9] p-8 flex flex-col justify-between min-h-[200px] text-[#1A1A1A]">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold tracking-wide">
                  Bathroom Planner
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 font-light tracking-wide">
                  Lorem Ipsum Dolor Sit Amet, Consectetur
                </p>
              </div>

              {/* Circle Arrow Button (Off-Black Border, placed at bottom left) */}
              <div className="w-11 h-11 rounded-full border border-[#1A1A1A]/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A]">
                <ArrowRight size={16} strokeWidth={1.5} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Active 3D Bathroom Planner Interface
  return (
    <div className="py-6 font-sans max-w-7xl mx-auto space-y-8">
      
      {/* Title Header with Back link */}
      <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => setDesignerMode('select')}
            className="text-[10px] font-bold tracking-widest text-gray-400 hover:text-[#1A1A1A] uppercase flex items-center gap-1.5 mb-3.5 transition-colors"
          >
            <ArrowLeft size={11} /> Back to Selection
          </button>
          
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A]">
            3D Bathroom Designer
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Configure your bathroom dimensions, choose custom tile patterns, place imported sanitaryware, and generate instant price estimates.
          </p>
        </div>
      </div>

      {/* Main Designer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive 3D Canvas Viewport */}
        <div className="lg:col-span-8 h-[450px] lg:h-[600px] flex flex-col relative bg-slate-900 shadow-sm border border-gray-200">
          <BathroomCanvas />
        </div>

        {/* Right Column: Architectural Parameter controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Section 1: Dimensions Parameter Card */}
          <div className="bg-[#F9F9F7] border border-gray-200 p-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase flex items-center gap-2">
                <Settings size={15} className="text-[#D4C5B9]" />
                <span>Room Parameters</span>
              </h2>
              <button 
                onClick={handleSaveLayout}
                className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 transition-all duration-300"
              >
                Save
              </button>
            </div>

            <div className="space-y-4">
              {/* Shape Toggles */}
              <div>
                <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase block mb-2">Bathroom Layout Shape</span>
                <div className="grid grid-cols-2 gap-2">
                  {['RECTANGLE', 'L_SHAPE'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s as any)}
                      className={`py-2 px-3 text-xs font-semibold tracking-wide border transition-all duration-300 ${
                        shape === s
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                          : 'border-gray-200 bg-white text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      {s === 'RECTANGLE' ? 'Rectangle' : 'L-Shape'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Inputs */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">Width (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="10.0"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-200 p-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">Length (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="10.0"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-200 p-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">Height (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.8"
                    max="4.0"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-200 p-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Showroom Assets Catalogue Card */}
          <div className="bg-[#F9F9F7] border border-gray-200 p-6 flex-1 flex flex-col space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
              <LayoutGrid size={15} className="text-[#D4C5B9]" />
              <h2 className="text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase">
                Showroom Assets
              </h2>
            </div>

            {/* Asset Tab Pills */}
            <div className="flex gap-1.5 border-b border-gray-200 pb-3">
              {(['TILES', 'BATHWARE', 'LIGHTS'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAssetTab(tab)}
                  className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase border transition-all ${
                    activeAssetTab === tab
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                      : 'border-gray-200 bg-white text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid of items to place on canvas */}
            <div className="grid grid-cols-2 gap-3 flex-grow overflow-y-auto max-h-[220px]">
              
              {/* Asset 1 */}
              <div className="bg-white p-3 border border-gray-200 flex flex-col justify-between hover:border-[#D4C5B9] transition-all">
                <div className="w-full h-16 bg-[#F9F9F7] border border-gray-150 mb-2 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                  [Tile Preview]
                </div>
                <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">Rocell Marble</h4>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-red-600 font-bold font-mono">LKR 3,850</span>
                  <button 
                    onClick={() => handleAddAsset('Rocell Marble', 3850)}
                    className="p-1 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white transition-colors"
                    aria-label="Add to layout"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Asset 2 */}
              <div className="bg-white p-3 border border-gray-200 flex flex-col justify-between hover:border-[#D4C5B9] transition-all">
                <div className="w-full h-16 bg-[#F9F9F7] border border-gray-150 mb-2 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                  [Basin Preview]
                </div>
                <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">Ceramic Vessel</h4>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-red-600 font-bold font-mono">LKR 24,500</span>
                  <button 
                    onClick={() => handleAddAsset('Ceramic Vessel', 24500)}
                    className="p-1 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white transition-colors"
                    aria-label="Add to layout"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

            </div>

            {/* Hint Notice */}
            <div className="bg-white p-3 border border-gray-200 flex gap-2.5 items-start text-[10px] text-gray-500 leading-normal font-light">
              <AlertCircle size={14} className="text-[#D4C5B9] shrink-0 mt-0.5" />
              <span>Select tile types or basins, then click the plus button to position them on the 3D walls or floor elements.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
