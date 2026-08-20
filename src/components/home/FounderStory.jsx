import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Sparkles, MessageCircle, ArrowRight, Instagram, Image as ImageIcon, X, Flame, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FounderStory = () => {
  const [isPlayingAudioSim, setIsPlayingAudioSim] = useState(true);
  const [heartCount, setHeartCount] = useState(1420);
  const [hasHearted, setHasHearted] = useState(false);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [activeTimelineStep, setActiveTimelineStep] = useState(2); // default on breakthrough

  const timelineSteps = [
    {
      year: "MAY 2023",
      title: "The First Attempt & Zero Funding",
      status: "FAILED DROP",
      desc: "No big team, no funding, just two brothers with a dream. Launched our first collection — it failed badly.",
      highlight: "First collection failed completely"
    },
    {
      year: "2024",
      title: "Delays, Debt & Mental Grit",
      status: "REBUILDING",
      desc: "Tried again in 2024 — failed again. Lots of mistakes, shipping delays, self-doubt, financial loss, and mental breakdowns. But we refused to quit.",
      highlight: "Mistakes, financial loss, but kept pushing"
    },
    {
      year: "15 APR 2025",
      title: "The Breakthrough: TRAINING DEPT 001",
      status: "500+ ORDERS",
      desc: "Launched TRAINING DEPT. 001 — and for the first time, things started moving. Over 500+ orders in 2 months. People are actually wearing what we made.",
      highlight: "Over 500+ orders across India"
    },
    {
      year: "TODAY & BEYOND",
      title: "From INDIA to the WORLD",
      status: "STILL JUST THE BEGINNING",
      desc: "Every day brings a new problem, but we show up. Sorry to those whose orders were delayed — we're learning every single day. We won't let you down.",
      highlight: "Texture over noise • Outside Comfort"
    }
  ];

  const handleHeartClick = () => {
    if (!hasHearted) {
      setHeartCount((prev) => prev + 1);
      setHasHearted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffffff', '#808080', '#262626']
      });
    }
  };

  return (
    <section id="story" className="py-24 bg-black border-b border-brand-border relative overflow-hidden">
      
      {/* Film Grain & Vignette Overlay */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-zinc-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Top Bar with Soundtrack Player */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-sm mb-12 backdrop-blur-md">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white text-xs font-mono font-bold">
              —
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                  Story Archive
                </span>
                <span className="text-[10px] font-mono text-zinc-500">• 60w</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Tyler, The Creator — Like Him</span>
              </div>
            </div>
          </div>

          {/* Soundtrack Equalizer & Proof Button */}
          <div className="flex items-center gap-3">
            {/* Animated Equalizer Waves */}
            <div className="flex items-center gap-0.5 h-4 px-2">
              <span className="w-0.5 h-3 bg-white animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4 bg-zinc-400 animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-2 bg-zinc-600 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 h-3.5 bg-white animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
            </div>

            <button
              onClick={() => setShowScreenshotModal(true)}
              className="px-3 py-1 bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 text-zinc-300 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>View Original Story</span>
            </button>
          </div>

        </div>

        {/* The Raw Letter Headline */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
            FOUNDER INTRODUCTION
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
            TWO BROTHERS.<br />ZERO FUNDING.
          </h2>
          <p className="text-zinc-400 text-sm font-mono mt-3 leading-relaxed">
            By <strong>Robby (20)</strong> & <strong>Deepanshu (21)</strong>, Co-Founders of OFFCOMFRT
          </p>
        </div>

        {/* The Raw Story Editorial Container */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 sm:p-12 shadow-2xl relative">
          
          {/* Subtle Watermark */}
          <div className="absolute top-6 right-6 font-display font-black text-6xl text-zinc-900 select-none pointer-events-none">
            2023—2026
          </div>

          <div className="prose prose-invert max-w-none font-mono text-xs sm:text-sm text-zinc-300 leading-loose space-y-6">
            
            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
              Hye, I’m Robby (20), founder of Offcomfrt — and this is my brother Deepanshu (21), co-founder. We started this brand back in 2023... with no big team, no funding, just a dream to create something of our own.
            </p>

            <div className="p-4 sm:p-5 bg-black border-l-2 border-white rounded-r-sm space-y-2">
              <p className="text-zinc-400">
                Launched our first collection in May 2023 — <strong className="text-white">it failed badly.</strong> Tried again in 2024 — <strong className="text-white">failed again.</strong> Lots of mistakes, delays, self-doubt, financial loss, even mental breakdowns. But we kept going.
              </p>
            </div>

            <p className="leading-relaxed">
              On <strong className="text-white">15th April 2025</strong>, we launched <strong>training dept. 001</strong> — and for the first time, things started moving. <span className="text-white font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">Over 500+ orders in the last 2 months.</span> For the first time, people are actually wearing what we made — it feels unreal.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              Every day still brings a new problem. But we’ve never backed down. We’ve made good decisions, bad ones too — but we’ve always tried to show up.
              <br />
              Thank you to everyone who ordered, supported, followed, or even just believed in us.
              <br />
              <span className="text-zinc-500 italic">Sorry to those whose orders were delayed — we’re learning and we’ll do better.</span>
            </p>

            <div className="pt-4 border-t border-zinc-900 space-y-2">
              <p className="font-bold text-white text-base">
                This is still just the beginning.
              </p>
              <p className="text-sm text-zinc-300 font-semibold flex items-center gap-2">
                <span>Please keep believing in us — we won’t let you down.</span>
                <span className="text-lg">🖤</span>
              </p>
            </div>

          </div>

          {/* Interactive Timeline Journey Accordion / Tabs */}
          <div className="mt-12 pt-8 border-t border-zinc-900">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-4">
              THE JOURNEY SO FAR:
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {timelineSteps.map((step, idx) => (
                <button
                  key={step.year}
                  onClick={() => setActiveTimelineStep(idx)}
                  className={`p-4 rounded-sm border text-left font-mono transition-all flex flex-col justify-between h-36 ${
                    activeTimelineStep === idx
                      ? 'border-white bg-black text-white shadow-xl'
                      : 'border-zinc-900 bg-black/40 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-white">{step.year}</span>
                      <span className="text-zinc-400 text-[9px]">{step.status}</span>
                    </div>
                    <h4 className="font-bold text-xs text-zinc-200 mt-1 leading-snug">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight">
                    {step.highlight}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Step Details Bar */}
            <div className="mt-4 p-4 bg-black border border-zinc-800 rounded-sm font-mono text-xs text-zinc-300">
              <strong className="text-white uppercase mr-2">{timelineSteps[activeTimelineStep].year}:</strong>
              <span>{timelineSteps[activeTimelineStep].desc}</span>
            </div>

          </div>

          {/* Bottom Founder Actions Bar */}
          <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            
            {/* Heart / Believe In Us Counter */}
            <button
              onClick={handleHeartClick}
              className={`px-4 py-2.5 rounded-sm border flex items-center gap-2 transition-all ${
                hasHearted
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-zinc-800 bg-black text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasHearted ? 'fill-black' : ''}`} />
              <span>{hasHearted ? 'Believing in Robby & Deepanshu' : 'Believe In Us'}</span>
              <span className="px-1.5 py-0.2 bg-zinc-800 text-white rounded text-[10px]">
                {heartCount}
              </span>
            </button>

            {/* Send Message to Founders */}
            <a
              href="https://instagram.com/offcomfrt"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white rounded-sm transition-colors flex items-center gap-2 font-bold uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4" />
              <span>DM Robby & Deepanshu (@offcomfrt)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Original Story Screenshot */}
      <AnimatePresence>
        {showScreenshotModal && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScreenshotModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-sm w-full max-h-[90vh] bg-black border border-zinc-800 rounded-sm overflow-hidden z-10 flex flex-col justify-between shadow-2xl p-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900 font-mono text-xs text-white">
                <span className="font-bold uppercase">Original Story Screenshot</span>
                <button
                  onClick={() => setShowScreenshotModal(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-auto overflow-y-auto max-h-[75vh] py-2 flex items-center justify-center">
                <img
                  src="/story/founder_story.png"
                  alt="Original Founder Story"
                  className="w-full h-auto object-contain rounded"
                />
              </div>

              <div className="pt-2 border-t border-zinc-900 text-center font-mono text-[10px] text-zinc-500">
                Official Story Broadcast by Robby & Deepanshu (@offcomfrt)
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
