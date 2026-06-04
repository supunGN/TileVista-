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
          For decades, Alahapperuma Trade Center has been a trusted partner in construction, design, and bridging the gap between imagination and reality. The Virtual Showroom system is designed to bring our showroom directly to you. Through cutting-edge 3D visualization, planning your space has never been this accessible, allowing you to walk inside a virtual rendition of your future home.
        </p>
      </div>
    </section>
  );
};
