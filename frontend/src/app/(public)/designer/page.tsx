'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DesignerPage() {
  const handlePlannerAlert = (plannerName: string) => {
    alert(`${plannerName} customizer workspace is currently in development. Please check back later.`);
  };

  return (
    <div className="py-8 font-sans max-w-7xl mx-auto space-y-12 select-none">
      
      {/* Page Header (Aligned to match other subpages exactly) */}
      <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-2">
            DESIGN YOUR ROOM
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A]">
            Create Your Space
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1.5 max-w-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nunc justo, ac elementum turpis pellentesque eget. Morbi lacus tortor, vulputate sed ultricies at
          </p>
        </div>
      </div>

      {/* 3-Column Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Room Planner (Dark theme bottom) */}
        <div 
          onClick={() => handlePlannerAlert('Room Planner')}
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
          <div className="bg-[#1A1A1A] p-6 flex flex-col justify-between min-h-[180px] text-white">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-wide">
                Room Planner
              </h3>
              <p className="text-[10px] text-gray-400 font-light tracking-wide">
                Lorem Ipsum Dolor Sit Amet, Consectetur
              </p>
            </div>

            {/* Circle Arrow Button (White Border) */}
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[#1A1A1A] group-hover:border-white">
              <ArrowRight size={15} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Card 2: Bathroom Planner (Warm Sand theme bottom) */}
        <div 
          onClick={() => handlePlannerAlert('Bathroom Planner')}
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
          <div className="bg-[#D4C5B9] p-6 flex flex-col justify-between min-h-[180px] text-[#1A1A1A]">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-wide">
                Bathroom Planner
              </h3>
              <p className="text-[10px] text-[#1A1A1A]/70 font-light tracking-wide">
                Lorem Ipsum Dolor Sit Amet, Consectetur
              </p>
            </div>

            {/* Circle Arrow Button (Off-Black Border) */}
            <div className="w-10 h-10 rounded-full border border-[#1A1A1A]/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A]">
              <ArrowRight size={15} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Card 3: Kitchen Planner (Dark theme bottom) */}
        <div 
          onClick={() => handlePlannerAlert('Kitchen Planner')}
          className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
        >
          {/* Top Image (Modern premium kitchen setup) */}
          <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800')` }}
            />
          </div>

          {/* Bottom Panel (Matte Off-Black `#1A1A1A`) */}
          <div className="bg-[#1A1A1A] p-6 flex flex-col justify-between min-h-[180px] text-white">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-wide">
                Kitchen Planner
              </h3>
              <p className="text-[10px] text-gray-400 font-light tracking-wide">
                Lorem Ipsum Dolor Sit Amet, Consectetur
              </p>
            </div>

            {/* Circle Arrow Button (White Border) */}
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[#1A1A1A] group-hover:border-white">
              <ArrowRight size={15} strokeWidth={1.5} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
