import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, ChevronLeft, ChevronRight, CheckCheck, Image as ImageIcon, X, ShieldCheck, Play, Pause } from 'lucide-react';
import { CHAT_REVIEWS } from '../../data/reviewsData';

export const CommunityReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeScreenshotModal, setActiveScreenshotModal] = useState(null);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'screenshot'
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  const filteredReviews = CHAT_REVIEWS.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Instagram') return item.platform === 'Instagram';
    if (selectedFilter === 'WhatsApp') return item.platform === 'WhatsApp';
    return true;
  });

  // Duplicate for smooth seamless sliding loop
  const loopReviews = [...filteredReviews, ...filteredReviews];

  // Auto-scroll ticker loop
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        if (sliderRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
          }
        }
      }, 3200);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="reviews" 
      className="py-14 bg-zinc-950 border-b border-brand-border relative overflow-hidden select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-zinc-900/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
              <MessageSquare className="w-4 h-4 text-white" />
              <span>LIVE COMMUNITY FEED • UNFILTERED DMs</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              VERIFIED CHATS & PROOF
            </h2>
          </div>

          {/* Controls: Mode Switcher, Auto-Play Toggle & Nav Arrows */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Auto-Slide Indicator / Pause Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 bg-black border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-sm text-xs font-mono transition-colors"
              title={isAutoPlaying ? "Pause Auto-Slide" : "Resume Auto-Slide"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-white" />
                  <span className="text-[11px]">Sliding Live</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-white" />
                  <span className="text-[11px]">Slide Paused</span>
                </>
              )}
            </button>

            {/* View Mode: Chat vs Screenshot */}
            <div className="flex items-center bg-black border border-zinc-800 p-1 rounded-sm text-xs font-mono">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  viewMode === 'interactive'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Chat View
              </button>
              <button
                onClick={() => setViewMode('screenshot')}
                className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'screenshot'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Proof Shots</span>
              </button>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollSlider('left')}
                className="p-2 bg-black hover:bg-zinc-800 border border-zinc-800 hover:border-white text-white rounded-sm transition-colors"
                aria-label="Slide Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className="p-2 bg-black hover:bg-zinc-800 border border-zinc-800 hover:border-white text-white rounded-sm transition-colors"
                aria-label="Slide Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Sliding Carousel Track with Kinetic Spring Motion */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
        >
          {loopReviews.map((review, idx) => (
            <motion.div
              key={`${review.id}-${idx}`}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-[300px] sm:w-[350px] shrink-0 bg-black border border-zinc-800 hover:border-zinc-500 rounded-sm overflow-hidden flex flex-col justify-between shadow-2xl snap-start group select-none"
            >
              {/* Card Top: Author & Platform */}
              <div className="p-3.5 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-white">
                    {review.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-mono font-bold text-xs text-white">{review.author}</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[7px] font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">{review.handle}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded">
                  {review.platform}
                </span>
              </div>

              {/* Card Middle: Chat Messages vs Original Screenshot Proof */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                
                {viewMode === 'screenshot' ? (
                  <div 
                    onClick={() => setActiveScreenshotModal(review.screenshot)}
                    className="relative aspect-[4/5] overflow-hidden rounded bg-black border border-zinc-800 cursor-zoom-in group/img"
                  >
                    <img
                      src={review.screenshot}
                      alt="Raw Proof Screenshot"
                      className="w-full h-full object-contain object-top transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 bg-white text-black font-mono font-bold text-[10px] rounded uppercase">
                        Expand Screenshot
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 font-sans text-xs">
                    {review.messages.map((msg, mIdx) => {
                      const isCustomer = msg.sender === 'customer';
                      return (
                        <div
                          key={mIdx}
                          className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                        >
                          <div
                            className={`max-w-[88%] p-2.5 rounded-2xl leading-relaxed ${
                              isCustomer
                                ? 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-sm'
                                : 'bg-zinc-800 text-white rounded-br-sm border border-zinc-700'
                            }`}
                          >
                            <p className="font-mono text-[11px]">{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-0.5 font-mono text-[8px] text-zinc-500">
                              <span>{review.timestamp}</span>
                              {!isCustomer && <CheckCheck className="w-2.5 h-2.5 text-sky-400 inline" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Quick view proof link */}
                    <button
                      onClick={() => setActiveScreenshotModal(review.screenshot)}
                      className="text-[10px] font-mono text-zinc-500 hover:text-white flex items-center gap-1 pt-1 underline"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>View Screenshot Proof →</span>
                    </button>
                  </div>
                )}

                {/* Highlight Quote */}
                <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-sm font-mono text-[10px] text-zinc-300 italic">
                  {review.highlightQuote}
                </div>

              </div>

              {/* Card Footer: Verified Product Tag */}
              <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center gap-1 text-zinc-400">
                  <ShieldCheck className="w-3 h-3 text-white" />
                  <span className="truncate max-w-[170px]">{review.productTagged}</span>
                </div>
                <div className="flex items-center gap-0.5 text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-white text-white" />
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Screenshot Zoom Modal */}
      <AnimatePresence>
        {activeScreenshotModal && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveScreenshotModal(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-md w-full max-h-[85vh] bg-black border border-zinc-800 rounded-sm overflow-hidden z-10 flex flex-col justify-between shadow-2xl p-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900 font-mono text-xs text-white">
                <span className="font-bold uppercase">Original Customer Proof</span>
                <button
                  onClick={() => setActiveScreenshotModal(null)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-auto overflow-y-auto max-h-[68vh] py-2 flex items-center justify-center">
                <img
                  src={activeScreenshotModal}
                  alt="Original Review Proof"
                  className="w-full h-auto object-contain rounded"
                />
              </div>

              <div className="pt-2 border-t border-zinc-900 text-center font-mono text-[10px] text-zinc-500">
                Direct Unedited Screenshot from OFFCOMFRT Channels
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
