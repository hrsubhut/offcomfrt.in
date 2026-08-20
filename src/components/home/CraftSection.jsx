import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Shield, Compass, Sparkles, ArrowRight } from 'lucide-react';

export const CraftSection = () => {
  return (
    <section className="py-20 bg-brand-black border-b border-brand-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">
            DAY ONE • WORKSHOP ARCHIVE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            BEHIND THE SEAMS
          </h2>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Every garment begins on our cutting tables. No mass-market polyester shortcuts. From yarn selection to final wash, engineered in India.
          </p>
        </div>

        {/* 3-Column Editorial Craft Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Hand-Crafted Workshop */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between group">
            <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800"
                alt="Workshop Cutting"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 font-mono text-[10px] text-white rounded">
                01. PATTERN CUTTING
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-white uppercase">Architectural Patterns</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1 leading-relaxed">
                Drop-shoulder proportions mapped to human ergonomics. Wide chest with clean sleeve taper.
              </p>
            </div>
          </div>

          {/* Card 2: Heavyweight 280 GSM Cotton */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between group">
            <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0744/3834/4948/files/SLUB_ACID_WASSHH.jpg?v=1785772765"
                alt="Heavy Cotton Slub"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 font-mono text-[10px] text-white rounded">
                02. SLUB & ACID MINERAL WASH
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-white uppercase">Texture Over Noise</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1 leading-relaxed">
                Individually washed to break down fiber stiffness while retaining high GSM structural integrity.
              </p>
            </div>
          </div>

          {/* Card 3: Pro-Flex Compression */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between group">
            <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0744/3834/4948/files/46.jpg?v=1786559566"
                alt="Compression Sewing"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 font-mono text-[10px] text-white rounded">
                03. REINFORCED FLATLOCK SEAMS
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-white uppercase">Zero Friction Seams</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1 leading-relaxed">
                Engineered flatlock stitching prevents skin chafing during heavy training and lifting sessions.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
