import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastContainer = () => {
  const { toasts } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 bg-brand-surface/95 backdrop-blur-md border border-brand-border/80 shadow-2xl rounded-sm text-sm"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-brand-volt shrink-0" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
              <span className="font-medium text-brand-light leading-snug">{toast.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
