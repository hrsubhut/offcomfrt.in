import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FloatingBag = () => {
  const { totalItemCount, totalAmount, setIsCartOpen } = useCart();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 z-40 p-3 sm:px-4 sm:py-3 bg-white hover:bg-zinc-200 text-black rounded-full shadow-2xl shadow-white/10 flex items-center gap-3 border border-white transition-all cursor-pointer group"
      aria-label="Open Floating Shopping Bag"
    >
      <div className="relative">
        <ShoppingBag className="w-5 h-5 text-black" />
        {totalItemCount > 0 && (
          <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-black text-white font-mono font-black text-[10px] rounded-full flex items-center justify-center border border-white">
            {totalItemCount}
          </span>
        )}
      </div>

      <div className="hidden sm:flex flex-col text-left">
        <span className="font-mono font-black text-xs uppercase tracking-wider leading-none">
          BAG {totalItemCount > 0 && `(${totalItemCount})`}
        </span>
        {totalItemCount > 0 && (
          <span className="text-[10px] font-mono text-zinc-600 font-bold -mt-0.5">
            ₹{totalAmount}
          </span>
        )}
      </div>

      <ArrowRight className="w-4 h-4 text-black hidden sm:block transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );
};
