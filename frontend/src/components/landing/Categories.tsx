'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const categoriesList = [
    {
      id: 'floor-tiles',
      title: 'Floor Tiles',
      subtitle: 'Premium ceramic & granite',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
      categoryTag: 'TILE'
    },
    {
      id: 'wall-tiles',
      title: 'Wall Tiles',
      subtitle: 'Elegant mosaic patterns',
      image: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&q=80&w=600',
      categoryTag: 'TILE'
    },
    {
      id: 'bathtubs',
      title: 'Bathtubs',
      subtitle: 'Minimalist design freestanding',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
      categoryTag: 'BATHWARE'
    },
    {
      id: 'wash-basins',
      title: 'Wash Basins',
      subtitle: 'Sleek matte counter basins',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&q=80&w=600',
      categoryTag: 'BATHWARE'
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans">
        
        {/* Header and View All */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase mb-2 block">
              PRODUCT CATALOG
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
              Explore Collection
            </h2>
          </div>
          
          <button 
            onClick={() => onSelectCategory('ALL')} 
            className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase border-b border-[#1A1A1A] pb-0.5 hover:opacity-75 transition-all"
          >
            <span>VIEW ALL</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryTag)}
              className="group relative h-[320px] overflow-hidden bg-gray-900 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              
              {/* Dark Overlay (Gradual) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[#1A1A1A]/10 group-hover:bg-[#1A1A1A]/0 transition-colors" />

              {/* Text aligned at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white flex flex-col justify-end">
                <h3 className="text-lg font-medium tracking-wide mb-1 transition-colors duration-300 group-hover:text-[#D4C5B9]">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-300 font-light tracking-wide">
                  {cat.subtitle}
                </p>
              </div>

              {/* Top accent line that grows on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D4C5B9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
