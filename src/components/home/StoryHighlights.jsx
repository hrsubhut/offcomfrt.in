import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Instagram, ArrowUpRight } from 'lucide-react';
import { STORY_HIGHLIGHTS } from '../../data/storyHighlights';

export const StoryHighlights = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(null);

  const activeStory = activeStoryIdx !== null ? STORY_HIGHLIGHTS[activeStoryIdx] : null;

  const handleNext = () => {
    if (activeStoryIdx !== null && activeStoryIdx < STORY_HIGHLIGHTS.length - 1) {
      setActiveStoryIdx(activeStoryIdx + 1);
    } else {
      setActiveStoryIdx(null);
    }
  };

  const handlePrev = () => {
    if (activeStoryIdx !== null && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
    }
  };

  return (
    <section className="py-8 bg-brand-black border-b border-brand-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Profile Ethos Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white text-xs font-mono font-black">
              —
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                  @offcomfrt
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 block">
                Off - comfrt ( outside comfort ) • From INDIA to the WORLD
              </span>
            </div>
          </div>

          <a
            href="https://instagram.com/offcomfrt"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>42.2K Followers</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-600" />
          </a>
        </div>

        {/* Story Highlights Circles Bar */}
        <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-2 no-scrollbar">
          {STORY_HIGHLIGHTS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveStoryIdx(idx)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
            >
              {/* Monochromatic Ring & Image */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2px] border border-zinc-700 group-hover:border-white transition-colors bg-gradient-to-tr from-zinc-800 via-zinc-600 to-zinc-900">
                <div className="w-full h-full rounded-full overflow-hidden bg-brand-black border border-black flex items-center justify-center p-0.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Title Text */}
              <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors tracking-tight">
                {item.title}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Fullscreen Story Modal Viewer */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStoryIdx(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Story Card */}
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col justify-between aspect-[9/16] max-h-[85vh]"
            >
              {/* Top Progress Segment */}
              <div className="p-4 pb-2 z-20 bg-gradient-to-b from-black via-black/60 to-transparent flex flex-col gap-3">
                <div className="flex gap-1.5 w-full">
                  {STORY_HIGHLIGHTS.map((s, i) => (
                    <div
                      key={s.id}
                      className={`h-1 flex-1 rounded-full ${
                        i === activeStoryIdx
                          ? 'bg-white'
                          : i < activeStoryIdx
                          ? 'bg-zinc-500'
                          : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono font-bold">
                      —
                    </div>
                    <div>
                      <span className="font-mono font-bold text-xs">offcomfrt</span>
                      <span className="text-[10px] text-zinc-400 font-mono ml-2">{activeStory.title}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveStoryIdx(null)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Background Image / Texture */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeStory.image}
                  alt={activeStory.title}
                  className="w-full h-full object-cover grayscale opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              {/* Story Content Card */}
              <div className="p-6 relative z-10 space-y-4 my-auto">
                <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white font-mono text-[10px] font-bold uppercase rounded">
                  {activeStory.content.tagline}
                </span>

                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-tight">
                  {activeStory.content.headline}
                </h3>

                <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                  {activeStory.content.body}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-zinc-800 font-mono text-[11px] text-zinc-400">
                  {activeStory.content.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-white">•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <p className="italic text-xs font-serif text-zinc-300 pt-2 border-t border-zinc-800/80">
                  {activeStory.content.quote}
                </p>
              </div>

              {/* Bottom Nav & Actions */}
              <div className="p-4 z-20 flex items-center justify-between border-t border-zinc-900 bg-black/80 font-mono text-xs">
                <button
                  onClick={handlePrev}
                  disabled={activeStoryIdx === 0}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <a
                  href="#drops"
                  onClick={() => setActiveStoryIdx(null)}
                  className="px-4 py-2 bg-white text-black font-bold uppercase rounded text-[11px]"
                >
                  Explore Drop
                </a>

                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
