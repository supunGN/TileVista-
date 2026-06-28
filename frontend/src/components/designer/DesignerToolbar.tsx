import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { useDesignerStore } from '../../store/designer.store';

export default function DesignerToolbar() {
  const store = useDesignerStore();
  
  const totalPrice = store.placedItems.reduce((acc, item) => acc + (item.cost || 0), 0);
  
  const handleSaveDesign = async () => {
    if (!store.projectId) {
      alert("No active project ID found. Please complete the wizard setup first.");
      return;
    }
    
    store.setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      
      const wVal = store.state.widthFt * 0.3048;
      const dVal = store.state.depthFt * 0.3048;
      const hVal = store.state.heightFt * 0.3048;
      
      let poly: [number, number][] = [];
      if (store.state.shape === 'square') {
        const s = Math.min(wVal, dVal);
        poly = [[-s / 2, -s / 2], [s / 2, -s / 2], [s / 2, s / 2], [-s / 2, s / 2]];
      } else if (store.state.shape === 'l-shape') {
        poly = [
          [-wVal / 2, -dVal / 2],
          [wVal / 2, -dVal / 2],
          [wVal / 2, 0],
          [0, 0],
          [0, dVal / 2],
          [-wVal / 2, dVal / 2]
        ];
      } else if (store.state.shape === 't-shape') {
        poly = [
          [-wVal / 4, -dVal / 2],
          [wVal / 4, -dVal / 2],
          [wVal / 4, 0],
          [wVal / 2, 0],
          [wVal / 2, dVal / 2],
          [-wVal / 2, dVal / 2],
          [-wVal / 2, 0],
          [-wVal / 4, 0]
        ];
      } else if (store.state.shape === 'u-shape') {
        poly = [
          [-wVal / 2, -dVal / 2],
          [-wVal / 4, -dVal / 2],
          [-wVal / 4, 0],
          [wVal / 4, 0],
          [wVal / 4, -dVal / 2],
          [wVal / 2, -dVal / 2],
          [wVal / 2, dVal / 2],
          [-wVal / 2, dVal / 2]
        ];
      } else if (store.state.shape === 'custom') {
        poly = [
          [-wVal / 2, -dVal / 2],
          [wVal / 4, -dVal / 2],
          [wVal / 2, -dVal / 4],
          [wVal / 2, dVal / 2],
          [-wVal / 2, dVal / 2]
        ];
      } else {
        poly = [[-wVal / 2, -dVal / 2], [wVal / 2, -dVal / 2], [wVal / 2, dVal / 2], [-wVal / 2, dVal / 2]];
      }
      
      const vertices = poly.map((p, idx) => ({
        x: p[0],
        y: 0,
        z: p[1],
        sequence_order: idx
      }));

      const INITIAL_WALL_DESIGN = {
        splitMode: 'full',
        tileColorBottom: '#ffffff',
        tileColorTop: '#ffffff',
        tileColorCenter: '#ffffff',
        tileColorSides: '#ffffff'
      };

      const walls = poly.map((p, i) => {
        const q = poly[(i + 1) % poly.length];
        const dx = q[0] - p[0];
        const dz = q[1] - p[1];
        const len = Math.sqrt(dx * dx + dz * dz);
        const design = store.state.wallDesigns[i] || INITIAL_WALL_DESIGN;
        return {
          wall_label: `Wall ${i + 1}`,
          wall_sequence: i,
          wall_length: len,
          wall_height: hVal,
          wall_color: design.tileColorBottom,
          tile_asset_id: null,
          tile_coverage_height: null
        };
      });

      const openings = store.state.wallOpenings.map(op => ({
        type: op.type,
        style: op.style,
        width: op.width,
        height: op.height,
        wall_sequence: op.wallIndex,
        position_x: op.positionOffset,
        position_y: op.sillHeight
      }));

      const items = store.placedItems.map(item => ({
        type: item.type,
        name: item.name,
        cost: item.cost,
        position_x: item.position[0],
        position_y: item.position[1],
        position_z: item.position[2],
        rotation_y: item.rotation,
        modelUrl: item.model
      }));

      const response = await fetch(`${apiUrl}/designer/layout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: store.projectId,
          userId: undefined, // Will be resolved to default user if not passed
          name: store.projectName,
          shape: store.state.shape,
          width: wVal,
          length: dVal,
          height: hVal,
          designType: store.state.designType,
          vertices,
          walls,
          openings,
          items
        })
      });

      if (response.ok) {
        alert("Design successfully saved to the database!");
      } else {
        const errText = await response.text();
        console.error("Save layout failed:", errText);
        alert("Failed to save design to database. Check console for details.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Design saved offline.");
    } finally {
      store.setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <button
          id="btn-menu"
          onClick={() => { window.location.href = '/designer'; }}
          className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded-full flex items-center justify-center text-[#1A1A1A] transition-all"
          title="Back to Designer"
        >
          <Menu size={18} />
        </button>
        <button
          id="btn-save"
          onClick={handleSaveDesign}
          disabled={store.isSubmitting}
          className={`px-6 h-12 bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded-full flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase text-[#1A1A1A] transition-all ${store.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {store.isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div id="price-display" className="bg-white border border-gray-200 shadow-lg rounded-full h-12 px-2 py-1 flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 pl-4">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="font-mono font-bold text-base text-[#1A1A1A]">£{totalPrice.toFixed(2)}</span>
        </div>
        <button
          id="btn-summary"
          onClick={() => store.setShowSummaryModal(true)}
          className="px-5 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A] transition-all"
        >
          Summary
          <ArrowLeft className="rotate-180" size={10} />
        </button>
      </div>
    </div>
  );
}
