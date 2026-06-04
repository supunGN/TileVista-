'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Palette, Layers, Award, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="py-12 px-6 space-y-16 font-outfit">
      {/* Hero Banner Showcase */}
      <section className="relative rounded-3xl overflow-hidden py-20 px-8 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950/40 border border-indigo-900/30 flex flex-col items-center justify-center gap-6 shadow-premium-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.12)_0,transparent_100%)] pointer-events-none" />
        
        <span className="flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full uppercase">
          <Sparkles size={12} /> Alahapperuma Trade Centre
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white max-w-3xl">
          Visualize Your Dream Bathroom in Interactive 3D
        </h1>
        
        <p className="text-slate-400 text-sm md:text-base max-w-xl">
          Browse elite tiles and premium bathware imports. Design your layouts dynamically in our virtual designer, calculate exact costs, and present your design reference to complete your purchase.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center">
          <Link href="/designer">
            <Button variant="primary" className="w-full sm:w-auto">
              <Palette size={18} /> Launch 3D Planner
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="secondary" className="w-full sm:w-auto">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust KPI Elements */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Elite Imports', desc: 'Direct sourcing of international marble tiles and state-of-the-art bathwares.', icon: <Award className="text-indigo-400" size={32} /> },
          { title: 'Interactive Planning', desc: 'Customizable bathroom structures, wall coloring, and real-time item placement.', icon: <Palette className="text-indigo-400" size={32} /> },
          { title: 'Instant Quotations', desc: 'Generate a reference ID at checkout. Walk in and purchase with zero guess-work.', icon: <Layers className="text-indigo-400" size={32} /> },
        ].map((feat, idx) => (
          <Card key={idx} className="border border-glassBorder p-8 text-center flex flex-col items-center gap-4 bg-slate-900/20">
            {feat.icon}
            <h3 className="text-xl font-bold text-white">{feat.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
