'use client';

import React from 'react';
import { Clock, MapPin, ExternalLink } from 'lucide-react';

export const ExperienceCenter: React.FC = () => {
  const mapsEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.7549!2d81.2318240!3d6.3042915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69e68d95d5189%3A0x450d62bb478785fb!2sAlahapperuma%20Trade%20Center!5e0!3m2!1sen!2slk!4v1718956200000!5m2!1sen!2slk';

  const directionsUrl =
    'https://www.google.com/maps/place/Alahapperuma+Trade+Center/@6.3042915,81.231824,17z/data=!4m14!1m7!3m6!1s0x3ae69e68d95d5189:0x450d62bb478785fb!2sAlahapperuma+Trade+Center!8m2!3d6.3042915!4d81.2343989!16s%2Fg%2F11qsgcvnnq!3m5!1s0x3ae69e68d95d5189:0x450d62bb478785fb!8m2!3d6.3042915!4d81.2343989!16s%2Fg%2F11qsgcvnnq?entry=ttu';

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Google Maps Embed */}
          <div className="lg:col-span-6 relative w-full h-[360px] md:h-[420px] bg-slate-50 border border-gray-200 overflow-hidden shadow-sm">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alahapperuma Trade Center Location"
              className="w-full h-full"
            />

            {/* Open in Google Maps overlay button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#1A1A1A] text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2.5 shadow-md hover:bg-[#D4C5B9] hover:text-[#1A1A1A] transition-all duration-300"
            >
              <ExternalLink size={11} />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Right Column: Experience Details */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4C5B9] uppercase mb-2 block leading-none">
                LOCATION &amp; SHOWROOM
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                Visit Our Experience Center
              </h2>
            </div>

            <p className="text-sm text-gray-500 font-light leading-relaxed tracking-wide">
              Design your space online, visualize products in 3D, and place your order with ease. To complete the purchase, customers are required to visit our showroom for order confirmation and payment. Our team is ready to assist you with product selection, design recommendations, and any questions regarding your project.
            </p>

            <div className="w-full flex flex-col gap-4 border-t border-gray-100 pt-6">

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-50 border border-gray-150 text-[#1A1A1A] shrink-0">
                  <Clock size={16} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Working Hours</span>
                  <span className="text-sm text-[#1A1A1A] font-medium tracking-wide mt-0.5">
                    Mon - Sat: 8:00 AM – 6:00 PM
                  </span>
                  <span className="text-xs text-gray-400 font-light mt-0.5">Closed on Sundays and Poya Holidays</span>
                </div>
              </div>

              {/* Showroom Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-50 border border-gray-150 text-[#1A1A1A] shrink-0">
                  <MapPin size={16} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Showroom Address</span>
                  <span className="text-sm text-[#1A1A1A] font-medium tracking-wide mt-0.5">
                    Pannagamuwa, Weerawila,
                  </span>
                  <span className="text-xs text-gray-400 font-light mt-0.5">Hambantota, Sri Lanka</span>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 w-fit hover:opacity-60 transition-opacity"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
