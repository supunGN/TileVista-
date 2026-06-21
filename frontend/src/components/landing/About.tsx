'use client';

import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center font-sans">
        {/* Category Label */}
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase block mb-3">
          ABOUT US
        </span>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-6">
          Alahapperuma Trade Center
        </h2>

        {/* Line separator */}
        <div className="w-12 h-0.5 bg-[#D4C5B9] mx-auto mb-8"></div>

        {/* Body Description */}
        <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
          Alahapperuma Trade Center has been serving customers since 2017 with quality tiles and bathroom solutions. From elegant floor and wall tiles to modern bathroom accessories, we provide products that combine style, durability, and value. With TileVista, we bring our showroom experience into the digital world, making it easier to discover, visualize, and plan your ideal space before making a purchase.
        </p>
      </div>
    </section>
  );
};
