import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalOriginal,
    totalAmount,
    totalSavings,
    isFreeShipping,
    shippingThreshold,
    shippingFee,
    addToCart,
    addToast
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const amountNeededForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  const upsellItems = PRODUCTS.filter(
    (p) => !cart.some((item) => item.id === p.id) && p.isBestSeller
  ).slice(0, 2);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 }
      });
      addToast('Order Simulation Successful', 'success');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-black border-l border-zinc-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-zinc-900 flex items-center justify-between bg-zinc-950">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                    BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-sm transition-colors"
                  aria-label="Close Bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-zinc-950 px-5 py-3 border-b border-zinc-900">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  {isFreeShipping ? (
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-white" />
                      UNLOCKED: FREE EXPRESS SHIPPING ACROSS INDIA
                    </span>
                  ) : (
                    <span className="text-zinc-400">
                      Add <strong className="text-white font-bold">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                    </span>
                  )}
                  <span className="text-zinc-500">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Order Placed Screen */}
              {orderComplete ? (
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-white uppercase">
                    ORDER CONFIRMED
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    Thank you for choosing OFFCOMFRT. Your order #OC-{Math.floor(100000 + Math.random() * 900000)} is scheduled for express dispatch.
                  </p>
                  <div className="p-4 bg-zinc-950 border border-zinc-800 w-full text-left font-mono text-xs space-y-1">
                    <div className="text-zinc-500">Status: <span className="text-white font-bold">Processing</span></div>
                    <div className="text-zinc-500">Payment: <span className="text-zinc-300 uppercase">{paymentMethod} Express</span></div>
                    <div className="text-zinc-500">Total: <span className="text-white font-bold">₹{totalAmount}</span></div>
                  </div>
                  <button
                    onClick={() => {
                      setOrderComplete(false);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-sm mt-4 hover:bg-zinc-200 transition-colors"
                  >
                    Continue Browsing Drops
                  </button>
                </div>
              ) : (
                /* Cart Items Body */
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                        <ShoppingBag className="w-7 h-7" />
                      </div>
                      <p className="font-mono text-xs text-zinc-400">Your bag is empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-6 py-2.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-sm mt-2 hover:bg-zinc-200 transition-colors"
                      >
                        Explore Drops
                      </button>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-sm group hover:border-zinc-700 transition-colors"
                        >
                          <img
                            src={item.primaryImage}
                            alt={item.title}
                            className="w-20 h-24 object-cover bg-black rounded-sm shrink-0 border border-zinc-900 grayscale group-hover:grayscale-0"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-xs text-white leading-tight line-clamp-2">
                                  {item.title}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.id, item.size)}
                                  className="text-zinc-500 hover:text-white transition-colors"
                                  title="Remove"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mt-1.5 font-mono">
                                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-900 text-zinc-300 rounded border border-zinc-800">
                                  Size: {item.size}
                                </span>
                                <span className="text-[10px] text-zinc-400 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">
                                  {item.gsm}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900">
                              <div className="flex items-center border border-zinc-800 rounded bg-black">
                                <button
                                  onClick={() => updateQuantity(item.id, item.size, -1)}
                                  className="p-1 text-zinc-400 hover:text-white"
                                  aria-label="Decrease"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 font-mono text-xs font-bold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.size, 1)}
                                  className="p-1 text-zinc-400 hover:text-white"
                                  aria-label="Increase"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-mono font-bold text-sm text-white">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Upsells */}
                      {upsellItems.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-zinc-900">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                            Frequently Paired Pieces:
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {upsellItems.map((prod) => (
                              <div
                                key={prod.id}
                                className="p-2 bg-zinc-950 border border-zinc-800 rounded-sm flex flex-col justify-between"
                              >
                                <img
                                  src={prod.primaryImage}
                                  alt={prod.title}
                                  className="w-full h-16 object-cover rounded bg-black mb-1.5 grayscale"
                                />
                                <div className="text-[10px] font-bold text-white truncate">{prod.title}</div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-[10px] font-mono text-zinc-400">₹{prod.price}</span>
                                  <button
                                    onClick={() => addToCart(prod, 'M', 1)}
                                    className="px-2 py-0.5 bg-zinc-900 hover:bg-white hover:text-black text-white text-[10px] font-mono font-bold rounded transition-colors"
                                  >
                                    + Add
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Cart Footer */}
              {!orderComplete && cart.length > 0 && (
                <div className="p-5 border-t border-zinc-900 bg-zinc-950 space-y-4">
                  
                  <div className="space-y-1.5 text-xs font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span>{shippingFee === 0 ? <strong className="text-white">FREE</strong> : `₹${shippingFee}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-900">
                      <span>Total Amount</span>
                      <span className="text-white font-display text-base">₹{totalAmount}</span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-center">
                    {['upi', 'card', 'cod'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-1.5 px-1 border rounded uppercase font-bold transition-colors ${
                          paymentMethod === method
                            ? 'border-white bg-zinc-900 text-white'
                            : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {method === 'upi' ? '⚡ UPI Express' : method === 'card' ? '💳 Card' : '📦 COD'}
                      </button>
                    ))}
                  </div>

                  {/* Express Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING...</span>
                      </span>
                    ) : (
                      <>
                        <span>EXPRESS CHECKOUT • ₹{totalAmount}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>256-Bit SSL Encrypted • GoKwik / Shiprocket Compatible</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
