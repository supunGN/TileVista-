'use client';

import React from 'react';
import { Ruler, Layers } from 'lucide-react';

interface PlannerIntroProps {
  onStartDesign: () => void;
}

export const PlannerIntro: React.FC<PlannerIntroProps> = ({ onStartDesign }) => {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copywriting & Trigger Button */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block leading-none">
              3D PLANNER WORKSPACE
            </span>
            
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A] leading-tight">
              Your Dimensions. <br />
              Our Products. <br />
              Perfect Results.
            </h2>
            
            <p className="text-sm text-gray-500 font-light leading-relaxed tracking-wide mt-2">
              To design your space, first input your room dimensions. Build your room layout in 2D and see it instantly in interactive 3D, fully customized with our products. Get live volume counts, real-time pricing estimates, and verify alignments before purchase.
            </p>
            
            <button
              onClick={onStartDesign}
              className="mt-4 flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#D4C5B9] hover:text-[#1A1A1A] text-white font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4.5 transition-all duration-300 shadow-sm"
            >
              <Ruler size={15} />
              <span>START YOUR CUSTOM DESIGN</span>
            </button>
          </div>

          {/* Right Column: High-Fidelity 2D-to-3D Blueprint Grid Frame */}
          <div className="lg:col-span-7 h-[360px] md:h-[420px] bg-gray-50 border border-gray-200/60 p-6 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Architectural Grid Background */}
            <div 
              className="absolute inset-0 opacity-[0.12] transition-opacity group-hover:opacity-[0.18]"
              style={{
                backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 0), linear-gradient(0deg, #1A1A1A 1px, transparent 0), linear-gradient(90deg, #1A1A1A 1px, transparent 0)',
                backgroundSize: '24px 24px, 24px 24px, 24px 24px',
              }}
            />

            {/* Drafting Canvas Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 z-10">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-gray-400" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 font-semibold">
                  CAD Workspace Preview
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[8px] font-mono text-gray-400">ACTIVE GRID</span>
              </div>
            </div>

            {/* Vector Blueprint Drawing Section */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
              
              {/* Isometric Extruded Mesh Simulation */}
              <div className="w-[280px] h-[200px] md:w-[360px] md:h-[240px] relative transition-transform duration-700 group-hover:scale-105">
                
                {/* 2D Grid base floor */}
                <svg className="w-full h-full text-gray-300" viewBox="0 0 100 100" fill="none">
                  {/* Outer boundaries */}
                  <polygon points="50,15 90,35 90,75 50,95 10,75 10,35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                  
                  {/* Ground Plane (Grid) */}
                  <polygon points="50,15 90,35 50,55 10,35" fill="rgba(212, 197, 185, 0.04)" stroke="currentColor" strokeWidth="0.5" />
                  
                  {/* Extruded Walls */}
                  <polygon points="10,35 50,55 50,95 10,75" fill="rgba(26, 26, 26, 0.02)" stroke="#1A1A1A" strokeWidth="1" />
                  <polygon points="50,55 90,35 90,75 50,95" fill="rgba(26, 26, 26, 0.04)" stroke="#1A1A1A" strokeWidth="1" />
                  
                  {/* Bathroom Fixture mock wireframe (Basin & Tub) */}
                  {/* Freestanding Tub outline */}
                  <ellipse cx="50" cy="72" rx="18" ry="8" stroke="#D4C5B9" strokeWidth="1.2" fill="none" transform="rotate(-15, 50, 72)" />
                  <ellipse cx="50" cy="72" rx="14" ry="6" stroke="#D4C5B9" strokeWidth="0.6" fill="none" transform="rotate(-15, 50, 72)" />
                  
                  {/* Dimension lines */}
                  <line x1="10" y1="80" x2="50" y2="100" stroke="#D4C5B9" strokeWidth="0.8" />
                  <line x1="8" y1="77" x2="12" y2="83" stroke="#D4C5B9" strokeWidth="0.8" />
                  <line x1="48" y1="97" x2="52" y2="103" stroke="#D4C5B9" strokeWidth="0.8" />
                  
                  {/* Dimension label text */}
                  <text x="24" y="94" fill="#1A1A1A" fontSize="4.5" fontFamily="monospace" fontWeight="bold">3.00m</text>
                  
                  {/* Grid Lines on Backwall */}
                  <line x1="10" y1="35" x2="50" y2="15" stroke="currentColor" strokeWidth="0.3" />
                  <line x1="50" y1="55" x2="90" y2="35" stroke="currentColor" strokeWidth="0.3" />
                </svg>

                {/* Floating measurement labels */}
                <div className="absolute top-8 left-12 bg-white px-2 py-1 border border-gray-200 text-[8px] font-mono text-gray-500 shadow-sm rounded-none">
                  Wall Height: <span className="font-bold text-[#1A1A1A]">2.70m</span>
                </div>

                <div className="absolute bottom-6 right-8 bg-[#D4C5B9] text-[#1A1A1A] px-2.5 py-1 text-[8.5px] font-mono font-bold shadow-sm rounded-none flex items-center gap-1">
                  <span>3D EXTRACT ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Drafting Canvas Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[9px] font-mono text-gray-400 z-10">
              <span>SCALE 1:25</span>
              <span>LKR TOTAL: 450,000</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
