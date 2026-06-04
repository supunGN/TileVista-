'use client';

import React, { useState } from 'react';
import { BathroomCanvas } from '../../components/canvas';
import { Settings, Save, LayoutGrid, Plus, AlertCircle } from 'lucide-react';

export const DesignerFeature: React.FC = () => {
  const [width, setWidth] = useState(2.4);
  const [length, setLength] = useState(3.0);
  const [height, setHeight] = useState(2.7);
  const [shape, setShape] = useState<'RECTANGLE' | 'L_SHAPE'>('RECTANGLE');
  const [activeAssetTab, setActiveAssetTab] = useState<'TILES' | 'BATHWARE' | 'LIGHTS'>('TILES');

  const handleSave = () => {
    alert(`Saving layout parameters:\nShape: ${shape === 'RECTANGLE' ? 'Rectangle' : 'L-Shape'}\nDimensions: ${width}m x ${length}m x ${height}m`);
  };

  const handleAddAsset = (name: string, price: number) => {
    alert(`Added "${name}" to your virtual 3D customizer canvas! (Estimated cost: LKR ${price.toLocaleString('en-LK')})`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#F9F9F7] text-[#1A1A1A] overflow-hidden p-6 gap-6 font-sans">
      {/* Left Column: Interactive 3D Canvas Viewport */}
      <div className="flex-1 h-[55vh] lg:h-auto relative bg-[#1A1A1A] border border-gray-200">
        <BathroomCanvas />
      </div>

      {/* Right Column: Control Parameters Sidepanel */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6 overflow-y-auto max-h-[85vh] lg:max-h-none shrink-0">
        
        {/* Dimensions Settings Card */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-150">
            <h2 className="text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase flex items-center gap-2">
              <Settings className="text-[#D4C5B9]" size={16} /> 
              <span>Design Parameters</span>
            </h2>
            <button 
              onClick={handleSave}
              className="bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 transition-all duration-300"
            >
              Save
            </button>
          </div>

          <div className="space-y-4">
            {/* Shape toggle */}
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
                  className="w-full bg-[#F9F9F7] border border-gray-200 p-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9]"
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
                  className="w-full bg-[#F9F9F7] border border-gray-200 p-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9]"
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
                  className="w-full bg-[#F9F9F7] border border-gray-200 p-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#D4C5B9]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Assets Card */}
        <div className="bg-white border border-gray-200 p-6 flex-1 flex flex-col space-y-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-150">
            <LayoutGrid className="text-[#D4C5B9]" size={16} /> 
            <h2 className="text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase">
              Showroom Assets
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 border-b border-gray-100 pb-3">
            {(['TILES', 'BATHWARE', 'LIGHTS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAssetTab(tab)}
                className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase border transition-all ${
                  activeAssetTab === tab
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Assets Grid list */}
          <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto">
            
            {/* Rocell Marble */}
            <div className="bg-[#F9F9F7] p-3 border border-gray-200 flex flex-col justify-between hover:border-[#D4C5B9] transition-all">
              <div className="w-full h-16 bg-white border border-gray-150 mb-2 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                [Tile Preview]
              </div>
              <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">Rocell Marble</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-red-600 font-bold font-mono">LKR 3,850</span>
                <button 
                  onClick={() => handleAddAsset('Rocell Marble', 3850)}
                  className="p-1 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white transition-colors"
                  aria-label="Add asset to canvas"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Ceramic Vessel */}
            <div className="bg-[#F9F9F7] p-3 border border-gray-200 flex flex-col justify-between hover:border-[#D4C5B9] transition-all">
              <div className="w-full h-16 bg-white border border-gray-150 mb-2 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                [Basin Preview]
              </div>
              <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">Ceramic Vessel</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-red-600 font-bold font-mono">LKR 24,500</span>
                <button 
                  onClick={() => handleAddAsset('Ceramic Vessel', 24500)}
                  className="p-1 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white transition-colors"
                  aria-label="Add asset to canvas"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

          </div>

          {/* Warning/Hint notice */}
          <div className="bg-[#F9F9F7] p-3 border border-gray-200 flex gap-2.5 items-start text-[10px] text-gray-500 leading-normal font-light">
            <AlertCircle size={14} className="text-[#D4C5B9] shrink-0 mt-0.5" />
            <span>Select tile patterns or bathware fixtures, then click the plus button to position them on the 3D structures.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
export default DesignerFeature;
