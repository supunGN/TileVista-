'use client';

import React, { useState } from 'react';
import { BathroomCanvas } from '../../../components/canvas';
import { Settings, Save, LayoutGrid, Plus, Compass, AlertCircle } from 'lucide-react';

export default function DesignerPage() {
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

  return (
    <div className="py-6 font-sans max-w-7xl mx-auto space-y-8">
      
      {/* Title Header */}
      <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            INTERACTIVE CAD WORKSPACE
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A]">
            3D Virtual Designer
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
