'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function DesignerPage() {
  const router = useRouter();

  const goToRoomPlanner = () => {
    router.push('designer/room'); // change if your route is different
  };

  const goToBathroomPlanner = () => {
    router.push('designer/bathroom');
  };

  const handlePlannerAlert = (plannerName: string) => {
    alert(`${plannerName} customizer workspace is currently in development. Please check back later.`);
  };

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-12 select-none">
      
      {/* Header */}
      <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            DESIGN YOUR ROOM
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A]">
            Create Your Space
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nunc justo, ac elementum turpis pellentesque eget.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Room Planner → 3D PAGE */}
        <div 
          onClick={goToRoomPlanner}
          className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800')`
              }}
            />
          </div>

          <div className="bg-[#1A1A1A] p-6 flex flex-col justify-between min-h-[180px] text-white">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-wide">
                Room Planner
              </h3>
              <p className="text-[10px] text-gray-400 font-light tracking-wide">
                Click to open 3D Designer
              </p>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#1A1A1A] transition-all">
              <ArrowRight size={15} />
            </div>
          </div>
        </div>

        {/* Bathroom Planner */}
        <div 
          onClick={goToBathroomPlanner}
          className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800')`
              }}
            />
          </div>

          <div className="bg-[#D4C5B9] p-6 flex flex-col justify-between min-h-[180px] text-[#1A1A1A]">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-wide">Bathroom Planner</h3>
              <p className="text-[10px] text-gray-700 font-light tracking-wide">Click to open 3D Designer</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-700/30 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
              <ArrowRight size={15} />
            </div>
          </div>
        </div>

        {/* Kitchen Planner */}
        <div 
          onClick={() => handlePlannerAlert('Kitchen Planner')}
          className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800')`
              }}
            />
          </div>

          <div className="bg-[#1A1A1A] p-6 flex flex-col justify-between min-h-[180px] text-white">
            <h3 className="text-lg font-bold">Kitchen Planner</h3>
            <p className="text-[10px] text-gray-400">Coming soon</p>
          </div>
        </div>

      </div>
    </div>
  );
}