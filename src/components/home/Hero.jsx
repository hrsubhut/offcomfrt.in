import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Hero = () => {
  const { addToCart, setIsPitchOpen } = useCart();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      badge: "SLUB 001 • 280 GSM",
      titleLine1: "TEXTURE",
      titleLine2: "OVER NOISE",
      subtitle: "Acid-washed heavyweight organic cotton. Pure structural drape with zero loud branding. Built for those who step outside comfort.",
      tagline: "100% GOTS Organic Cotton • Drop Shoulder Boxy Silhouette",
      price: "₹1,299",
      mrp: "₹1,499",
      image: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/SLUB_ACID_WASSHH.jpg?v=1785772765",
      productData: {
        id: "slub-001-acid-wash",
        title: "SLUB - 001 (Acid Wash Heavyweight)",
        price: 1299,
        originalPrice: 1499,
        gsm: "280 GSM",
        primaryImage: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/SLUB_ACID_WASSHH.jpg?v=1785772765"
      }
    },
    {
      badge: "RAW-002 • PRO-FLEX™",
      titleLine1: "PURE FORM",
      titleLine2: "COMPRESSION",
      subtitle: "No prints. No branding. Just compression in its purest form. High-recovery polyamide for maximum training mobility.",
      tagline: "220 GSM Pro-Flex • Quad-Directional Stretch • Full Sleeve",
      price: "₹999",
      mrp: "₹1,499",
      image: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/46.jpg?v=1786559566",
      productData: {
        id: "raw-002",
        title: "RAW-002 (Full Sleeve Compression - Black)",
        price: 999,
        originalPrice: 1499,
        gsm: "220 GSM",
        primaryImage: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/46.jpg?v=1786559566"
      }
    },
    {
      badge: "HENLEY 002 • WAFFLE",
      titleLine1: "STRUCTURAL",
      titleLine2: "HONEYCOMB",
      subtitle: "Evolved from Waffle 001. Heavyweight thermal weave, clean minimal placket, engineered for year-round architectural layering.",
      tagline: "260 GSM Honeycomb Weave • Clean Minimal Placket",
      price: "₹1,199",
      mrp: "₹1,499",
      image: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/henley_002_combo.png?v=1785248466",
      productData: {
        id: "henley-002-combo",
        title: "HENLEY - 002 (Waffle Thermal Combo)",
        price: 1199,
        originalPrice: 1499,
        gsm: "260 GSM",
        primaryImage: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/henley_002_combo.png?v=1785248466"
      }
    }
  ];

  const current = heroSlides[activeHeroSlide];

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-brand-black pt-6 pb-12 border-b border-brand-border">
      
      {/* Subtle Monochrome Grain Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Brand Statement & Typography */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider rounded-full">
                {current.badge}
              </span>
              <span className="text-zinc-500 font-mono text-xs">
                From INDIA to the WORLD
              </span>
            </div>

            {/* Giant Brutalist Editorial Heading */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white leading-none uppercase">
                {current.titleLine1}
              </h1>
              <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-stroke-white leading-none uppercase">
                {current.titleLine2}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-sans">
              {current.subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>{current.tagline}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => addToCart(current.productData, 'M', 1)}
                className="px-8 py-3.5 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition-colors flex items-center gap-3"
              >
                <span>BAG PIECE • {current.price}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#fabric-lab"
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Inspect 280 GSM Lab
              </a>
            </div>

            {/* Slide Navigation Switches */}
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
              <span className="text-xs font-mono text-zinc-500 uppercase">Featured Drops:</span>
              <div className="flex gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.titleLine1}
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-all ${
                      activeHeroSlide === idx
                        ? 'bg-white text-black font-bold'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    0{idx + 1}. {slide.titleLine1}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Editorial Flat-Lay Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <motion.div
              key={activeHeroSlide}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm p-4 overflow-hidden shadow-2xl group"
            >
              {/* Top Tag & Price */}
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 bg-black/90 backdrop-blur-md border border-zinc-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded">
                  {current.productData.gsm}
                </span>
                <span className="px-2.5 py-1 bg-white text-black font-mono text-xs font-bold uppercase rounded shadow">
                  {current.price}
                </span>
              </div>

              {/* Product Hero Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black">
                <img
                  src={current.image}
                  alt={current.titleLine1}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Specs Footer */}
              <div className="mt-3.5 flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-white" />
                  <span>100% GOTS Organic</span>
                </div>
                <button
                  onClick={() => addToCart(current.productData, 'M', 1)}
                  className="text-white hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Quick Bag</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Bottom Brand Ethos Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-zinc-900 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">280+</span>
            <span>GSM Heavyweight Standard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">100%</span>
            <span>GOTS Organic Cotton</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">48h</span>
            <span>Express Metro Dispatch</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">42.2K+</span>
            <span>Community of Athletes</span>
          </div>
        </div>
      </div>

    </section>
  );
};
