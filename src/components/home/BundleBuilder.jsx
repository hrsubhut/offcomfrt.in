import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Plus, Trash2, ArrowRight, Gift, Flame, Package } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const BundleBuilder = () => {
  const { bundleItems, toggleBundleItem, addEntireBundleToCart } = useCart();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Filter curated products suitable for the bundle
  const availableProducts = PRODUCTS.filter((p) => {
    if (activeCategoryFilter === 'All') return true;
    if (activeCategoryFilter === 'Compression') return p.category === 'Compression';
    if (activeCategoryFilter === 'Heavyweight') return p.category === 'Heavyweight Oversized';
    if (activeCategoryFilter === 'Bottoms & Hoodies') return p.category === 'Pants & Bottoms' || p.category === 'Hoodies & Fleece';
    return true;
  }).slice(0, 12);

  const rawTotal = bundleItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = Math.round(rawTotal * 0.2); // 20% off
  const bundleFinalPrice = Math.max(0, rawTotal - bundleDiscount);

  return (
    <section id="capsule-builder" className="py-24 bg-brand-black border-b border-brand-border relative overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-volt/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface border border-brand-volt/40 text-brand-volt font-mono text-xs font-bold uppercase rounded-full mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>INTERACTIVE AOV ENGINE • 20% COMBO DISCOUNT</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            BUILD YOUR 3-PIECE CAPSULE
          </h2>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Select any 3 items from our heavyweight drops below to unlock an automatic <strong>20% discount + Free Express Delivery</strong>.
          </p>
        </div>

        {/* 3 Interactive Slots Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((slotIdx) => {
            const item = bundleItems[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`p-5 rounded-sm border transition-all flex flex-col justify-between min-h-[220px] relative ${
                  item
                    ? 'bg-brand-surface border-brand-volt shadow-lg shadow-brand-volt/10'
                    : 'bg-brand-surface/30 border-dashed border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span className="font-bold text-brand-volt">SLOT 0{slotIdx + 1}</span>
                  {item ? (
                    <button
                      onClick={() => toggleBundleItem(item)}
                      className="text-zinc-400 hover:text-brand-accent transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  ) : (
                    <span>WAITING SELECTION</span>
                  )}
                </div>

                {item ? (
                  <div className="flex items-center gap-4 my-auto py-2">
                    <img
                      src={item.primaryImage}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded bg-zinc-950 border border-zinc-800 shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-brand-volt font-bold block">{item.gsm}</span>
                      <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug">{item.title}</h4>
                      <span className="font-mono text-xs text-zinc-300 font-bold mt-1 block">₹{item.price}</span>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-center py-6">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto mb-2">
                      <Plus className="w-5 h-5" />
                    </div>
                    <p className="font-mono text-xs text-zinc-500">Select an item below</p>
                  </div>
                )}

                <div className="text-[10px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-2 flex items-center justify-between">
                  <span>{item ? '✓ Locked in Capsule' : 'Empty Slot'}</span>
                  {item && <span className="text-brand-volt font-bold">-20% Applied</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle Summary & Action Bar */}
        <div className="p-6 bg-brand-surface border border-brand-border rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-12 h-12 rounded-sm bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-zinc-400">CAPSULE PROGRESS:</span>
                <span className="font-mono text-xs font-bold text-brand-volt">{bundleItems.length} / 3 ITEMS</span>
              </div>
              <div className="font-display font-bold text-xl text-white mt-0.5">
                {bundleItems.length === 3 ? (
                  <span className="text-brand-volt">🔥 20% DISCOUNT UNLOCKED: ₹{bundleFinalPrice}</span>
                ) : (
                  <span>Add {3 - bundleItems.length} more item{3 - bundleItems.length > 1 ? 's' : ''} to save 20%</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {bundleItems.length === 3 && (
              <div className="font-mono text-right hidden lg:block">
                <span className="text-xs text-zinc-500 line-through block">₹{rawTotal}</span>
                <span className="text-xs text-brand-volt font-bold">You Save ₹{bundleDiscount}</span>
              </div>
            )}

            <button
              onClick={addEntireBundleToCart}
              disabled={bundleItems.length < 3}
              className={`w-full md:w-auto px-8 py-4 font-mono font-black text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 ${
                bundleItems.length === 3
                  ? 'bg-brand-volt hover:bg-white text-brand-black shadow-lg shadow-brand-volt/20 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <span>{bundleItems.length === 3 ? `ADD CAPSULE TO BAG • ₹${bundleFinalPrice}` : `SELECT 3 ITEMS (${bundleItems.length}/3)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Filter Pills for Selectable Products */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            Click an item to toggle in your capsule:
          </span>
          <div className="flex flex-wrap gap-2">
            {['All', 'Compression', 'Heavyweight', 'Bottoms & Hoodies'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCategoryFilter(filter)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  activeCategoryFilter === filter
                    ? 'bg-white text-black font-bold'
                    : 'bg-brand-surface border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Available Products Grid for Capsule Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableProducts.map((p) => {
            const isSelected = bundleItems.some((item) => item.id === p.id);
            return (
              <div
                key={p.id}
                onClick={() => toggleBundleItem(p)}
                className={`p-3 bg-brand-surface border rounded-sm cursor-pointer transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'border-brand-volt ring-1 ring-brand-volt bg-brand-volt/5'
                    : 'border-brand-border hover:border-zinc-700'
                }`}
              >
                <div className="relative aspect-square overflow-hidden rounded bg-zinc-950 mb-2.5">
                  <img
                    src={p.primaryImage}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 font-mono text-[9px] font-bold text-white rounded">
                    {p.gsm}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-brand-volt rounded-full flex items-center justify-center text-brand-black shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-xs text-white truncate">{p.title}</h4>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-800/80 font-mono text-xs">
                    <span className="text-brand-volt font-bold">₹{p.price}</span>
                    <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-brand-volt' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                      {isSelected ? '✓ Added' : '+ Add Slot'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
