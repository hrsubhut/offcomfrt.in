import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Activity, Wind, Gauge, Eye, ArrowRight } from 'lucide-react';
import { FABRICS_SPECS, PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const FabricLab = () => {
  const [selectedFabricId, setSelectedFabricId] = useState('heavy-organic-cotton');
  const [zoomMode, setZoomMode] = useState(false);
  const { addToCart } = useCart();

  const selectedFabric = FABRICS_SPECS.find((f) => f.id === selectedFabricId) || FABRICS_SPECS[0];

  const matchingProducts = PRODUCTS.filter((p) => {
    if (selectedFabric.id === 'raw-compression') return p.category === 'Compression';
    if (selectedFabric.id === 'heavy-organic-cotton') return p.category === 'Heavyweight Oversized';
    if (selectedFabric.id === 'thermal-waffle') return p.category === 'Henleys & Waffles';
    if (selectedFabric.id === 'french-terry') return p.category === 'Pants & Bottoms' || p.category === 'Hoodies & Fleece';
    return true;
  }).slice(0, 3);

  return (
    <section id="fabric-lab" className="py-20 bg-black border-b border-brand-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4 text-white" />
              <span>OFFCOMFRT LABS • MATERIAL ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              GSM & FABRIC SCIENCE
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mt-2 leading-relaxed">
              We eliminate cheap polyester fillers and light fast-fashion weights. Explore the structural density of our organic cotton and raw compression weaves.
            </p>
          </div>

          <div className="flex items-center gap-3 p-2 bg-zinc-950 border border-zinc-800 rounded-sm text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>4 PROPRIETARY FORMULATIONS</span>
          </div>
        </div>

        {/* Fabric Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {FABRICS_SPECS.map((fabric) => {
            const isSelected = fabric.id === selectedFabricId;
            return (
              <button
                key={fabric.id}
                onClick={() => setSelectedFabricId(fabric.id)}
                className={`p-4 text-left border rounded-sm transition-all flex flex-col justify-between h-32 relative ${
                  isSelected
                    ? 'bg-zinc-900 border-white text-white shadow-xl'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                    {fabric.gsm}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-white mt-1 leading-snug">
                    {fabric.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-400 truncate">
                    {fabric.tagline}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Fabric Texture Visualizer */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-black border border-zinc-800 group">
              <img
                src={selectedFabric.image}
                alt={selectedFabric.name}
                className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 ${
                  zoomMode ? 'scale-150' : 'scale-100'
                }`}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Magnifier Toggle Button */}
              <button
                onClick={() => setZoomMode(!zoomMode)}
                className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-zinc-700 hover:border-white text-white text-xs font-mono rounded flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-white" />
                <span>{zoomMode ? 'Reset (1x)' : 'Macro Weave (2x)'}</span>
              </button>

              {/* Fabric Specs Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 font-mono text-xs text-white">
                <div className="flex items-center justify-between bg-black/85 backdrop-blur-md p-3 border border-zinc-800 rounded-sm">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">WEIGHT METRIC</span>
                    <span className="font-bold text-white text-sm">{selectedFabric.gsm}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 block text-[10px]">COMPOSITION</span>
                    <span className="font-bold text-zinc-300 truncate max-w-[200px] block">{selectedFabric.composition}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-zinc-500 leading-relaxed italic">
              * High-density weave texture showing fiber alignment and thread structure.
            </p>
          </div>

          {/* Right: Technical Gauges & Products */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            <div>
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-white mb-3">
                {selectedFabric.gsm} SPECIFICATION
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {selectedFabric.name}
              </h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                {selectedFabric.description}
              </p>
            </div>

            {/* Performance Gauges */}
            <div className="space-y-4 font-mono text-xs">
              
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Activity className="w-3.5 h-3.5 text-white" />
                    Elastic Recovery & Flexibility
                  </span>
                  <span className="font-bold text-white">{selectedFabric.stretch}%</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div
                    key={selectedFabric.id + 'stretch'}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedFabric.stretch}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Wind className="w-3.5 h-3.5 text-white" />
                    Airflow & Micro-Ventilation
                  </span>
                  <span className="font-bold text-white">{selectedFabric.breathability}%</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div
                    key={selectedFabric.id + 'breath'}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedFabric.breathability}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-zinc-400 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Gauge className="w-3.5 h-3.5 text-white" />
                    Heavyweight Density & Anti-Pilling
                  </span>
                  <span className="font-bold text-white">{selectedFabric.durability}%</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div
                    key={selectedFabric.id + 'dur'}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedFabric.durability}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-zinc-200 rounded-full"
                  />
                </div>
              </div>

            </div>

            {/* Matching Products */}
            <div className="pt-4 border-t border-zinc-900">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                Garments In This Weave:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {matchingProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p, 'M', 1)}
                    className="p-2 bg-black border border-zinc-800 hover:border-white rounded-sm text-left group transition-colors flex flex-col justify-between"
                  >
                    <img
                      src={p.primaryImage}
                      alt={p.title}
                      className="w-full h-14 object-cover rounded bg-zinc-900 mb-1 grayscale group-hover:grayscale-0"
                    />
                    <div className="text-[10px] font-bold text-white truncate">{p.title}</div>
                    <div className="text-[10px] font-mono text-zinc-400 mt-0.5">₹{p.price} • Bag</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
