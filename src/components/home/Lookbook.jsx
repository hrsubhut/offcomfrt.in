import React, { useState } from 'react';
import { Camera, MapPin, ShoppingBag, Instagram, ArrowUpRight } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../../data/lookbook';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const Lookbook = () => {
  const { addToCart } = useCart();

  const handleQuickAdd = (productHandle) => {
    const product = PRODUCTS.find((p) => p.handle === productHandle || p.id === productHandle) || PRODUCTS[0];
    addToCart(product, 'M', 1);
  };

  return (
    <section id="lookbook" className="py-20 bg-black border-b border-brand-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">
              <Camera className="w-4 h-4 text-white" />
              <span>COMMUNITY • AS SEEN ON ATHLETES</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              COMMUNITY ARCHIVE
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mt-2 leading-relaxed">
              Real lifters and aesthetic minimalists wearing OFFCOMFRT across India. Click to shop the exact piece.
            </p>
          </div>

          <a
            href="https://instagram.com/offcomfrt"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-white text-white text-xs font-mono rounded-sm transition-colors flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>@offcomfrt on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* 4-Column Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-950 border border-zinc-800"
            >
              <img
                src={item.image}
                alt={item.lookTitle}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag Hotspot Badge Button */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-2 py-1 bg-black/90 backdrop-blur-md border border-zinc-800 font-mono text-[10px] text-zinc-300 rounded">
                  {item.athlete}
                </span>
              </div>

              {/* Bottom Card Info */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 mb-1">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span>{item.location}</span>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">
                  {item.lookTitle}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800 text-xs font-mono">
                  <span className="text-white font-bold">{item.taggedPrice}</span>
                  <button
                    onClick={() => handleQuickAdd(item.taggedProductId)}
                    className="text-[11px] text-zinc-300 hover:text-white font-bold flex items-center gap-1"
                  >
                    <span>+ Quick Bag</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
