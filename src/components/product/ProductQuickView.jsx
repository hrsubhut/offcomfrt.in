import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, ShoppingBag, Heart, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductQuickView = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const images = quickViewProduct.images && quickViewProduct.images.length > 0 
    ? quickViewProduct.images 
    : [quickViewProduct.primaryImage];

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, 1);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl bg-black border border-zinc-800 rounded-sm shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 gap-0"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-black/80 hover:bg-white text-zinc-400 hover:text-black rounded-sm transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="md:col-span-6 bg-zinc-950 p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-black border border-zinc-900 mb-4">
              <img
                src={images[activeImageIdx] || quickViewProduct.primaryImage}
                alt={quickViewProduct.title}
                className="w-full h-full object-cover object-center grayscale"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/90 text-white font-mono text-[10px] font-bold rounded border border-zinc-800">
                {quickViewProduct.gsm}
              </span>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-14 h-14 rounded border shrink-0 overflow-hidden ${
                      activeImageIdx === i ? 'border-white' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover grayscale" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Sizes */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-2">
                <span className="uppercase text-zinc-300 font-bold">{quickViewProduct.category}</span>
                <div className="flex items-center gap-1 text-zinc-300">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span className="font-bold text-white">{quickViewProduct.rating}</span>
                  <span className="text-zinc-500">({quickViewProduct.reviewsCount})</span>
                </div>
              </div>

              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-snug">
                {quickViewProduct.title}
              </h3>

              <div className="flex items-baseline gap-3 my-3">
                <span className="font-mono font-black text-2xl text-white">
                  ₹{quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="font-mono text-sm text-zinc-500 line-through">
                    ₹{quickViewProduct.originalPrice}
                  </span>
                )}
              </div>

              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-sm font-mono text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Fabric Weight:</span>
                  <span className="text-white font-bold">{quickViewProduct.gsm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Material:</span>
                  <span className="text-zinc-300">{quickViewProduct.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cut / Fit:</span>
                  <span className="text-zinc-300">{quickViewProduct.fit}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 uppercase font-bold">Select Size:</span>
                  <span className="text-white font-bold">{selectedSize}</span>
                </div>
                <div className="flex gap-2">
                  {(quickViewProduct.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-2.5 font-mono text-xs font-bold rounded-sm border uppercase transition-colors ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG • ₹{quickViewProduct.price}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3.5 border rounded-sm transition-colors ${
                    isWishlisted
                      ? 'border-white bg-white text-black'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-black' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-white" /> 48h Dispatch
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-white" /> 7-Day Fit Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" /> 100% GOTS
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
