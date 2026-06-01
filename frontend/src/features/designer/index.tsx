import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { BathroomCanvas } from '../../components/canvas';
import { Settings, Save, LayoutGrid, Plus } from 'lucide-react';

export const DesignerFeature: React.FC = () => {
  const [width, setWidth] = useState(2.4);
  const [length, setLength] = useState(3.0);
  const [height, setHeight] = useState(2.7);
  const [shape, setShape] = useState<'RECTANGLE' | 'L_SHAPE'>('RECTANGLE');

  const handleSave = () => {
    alert(`Saving layout: Shape: ${shape}, Dimensions: ${width}x${length}x${height}m`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 text-white overflow-hidden p-6 gap-6 font-outfit">
      <div className="flex-1 h-[60vh] lg:h-auto relative">
        <BathroomCanvas />
      </div>

      <div className="w-full lg:w-[400px] flex flex-col gap-6 overflow-y-auto max-h-[85vh] lg:max-h-none">
        <Card className="border border-glassBorder">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings className="text-indigo-400" size={20} /> Design Parameters
            </h2>
            <Button variant="secondary" size="sm" onClick={handleSave}>
              <Save size={16} /> Save
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm text-slate-400 block mb-2 font-semibold">Bathroom Layout Shape</span>
              <div className="grid grid-cols-2 gap-3">
                {['RECTANGLE', 'L_SHAPE'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setShape(s as any)}
                    className={`py-2 px-4 rounded-xl border text-sm font-semibold transition ${
                      shape === s
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {s === 'RECTANGLE' ? 'Rectangle' : 'L-Shape'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Width (m)"
                type="number"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              />
              <Input
                label="Length (m)"
                type="number"
                step="0.1"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
              />
              <Input
                label="Height (m)"
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </Card>

        <Card className="border border-glassBorder flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <LayoutGrid className="text-indigo-400" size={20} /> Showroom Assets
          </h2>

          <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4 overflow-x-auto">
            {['TILES', 'BATHWARE', 'LIGHTS'].map((tab) => (
              <span
                key={tab}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 cursor-pointer hover:border-slate-700 transition"
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/40 p-4 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition">
              <div className="w-full h-24 bg-slate-800 rounded-xl mb-3 flex items-center justify-center text-xs text-slate-500">
                [Tile Preview]
              </div>
              <h4 className="text-sm font-bold text-slate-200 line-clamp-1">Rocell Marble</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-xs text-indigo-400 font-bold">LKR 3,850</span>
                <button className="p-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="bg-slate-900/40 p-4 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition">
              <div className="w-full h-24 bg-slate-800 rounded-xl mb-3 flex items-center justify-center text-xs text-slate-500">
                [Basin Preview]
              </div>
              <h4 className="text-sm font-bold text-slate-200 line-clamp-1">Ceramic Vessel</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-xs text-indigo-400 font-bold">LKR 24,500</span>
                <button className="p-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default DesignerFeature;
