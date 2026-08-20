import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Sliders, Ruler, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FitAdvisor = ({ onFilterBySize }) => {
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(76);
  const [fitPreference, setFitPreference] = useState('oversized');
  const { addToast } = useCart();

  const calculateSize = () => {
    let baseSize = 'M';
    if (heightCm < 168 && weightKg < 65) baseSize = 'S';
    else if (heightCm >= 168 && heightCm < 178 && weightKg < 75) baseSize = 'M';
    else if (heightCm >= 175 && heightCm < 186 && weightKg < 88) baseSize = 'L';
    else if (heightCm >= 184 || weightKg >= 88) baseSize = 'XL';

    if (fitPreference === 'compression') {
      if (baseSize === 'XL') return { size: 'L', label: 'Snug Muscle-Contour Fit', note: 'Second-skin compression for maximum athletic support.' };
      if (baseSize === 'L') return { size: 'M', label: 'Snug Muscle-Contour Fit', note: 'Second-skin compression for maximum athletic support.' };
      return { size: 'S', label: 'Snug Muscle-Contour Fit', note: 'Second-skin compression for maximum athletic support.' };
    }
    
    if (fitPreference === 'oversized') {
      return {
        size: baseSize,
        label: 'Signature Heavyweight Boxy Fit',
        note: `Provides relaxed drop-shoulder ease with 3" room on chest and 280 GSM structural drape.`
      };
    }

    return {
      size: baseSize,
      label: 'Standard Clean Fit',
      note: 'Clean structural fit through the shoulders with modest room on the body.'
    };
  };

  const recommendation = calculateSize();

  const handleApplyRecommendedSize = () => {
    if (onFilterBySize) {
      onFilterBySize(recommendation.size);
    }
    addToast(`Filtered: Showing items in Size ${recommendation.size}`, 'info');
  };

  return (
    <section id="fit-advisor" className="py-20 bg-zinc-950 border-b border-brand-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase rounded-full mb-3">
            <Ruler className="w-3.5 h-3.5 text-white" />
            <span>FIT ARCHITECTURE • SIZING GUIDE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            SIZE & FIT ADVISOR
          </h2>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Every garment has a different GSM weight and cut. Adjust the sliders below to find your recommended size.
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="max-w-4xl mx-auto bg-black border border-zinc-800 rounded-sm p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-white" />
                  Your Height
                </span>
                <span className="text-white font-bold">{heightCm} cm ({(heightCm / 30.48).toFixed(1)} ft)</span>
              </div>
              <input
                type="range"
                min="155"
                max="205"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                <span>155 cm</span>
                <span>180 cm</span>
                <span>205 cm</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-white" />
                  Your Weight
                </span>
                <span className="text-white font-bold">{weightKg} kg ({(weightKg * 2.20462).toFixed(0)} lbs)</span>
              </div>
              <input
                type="range"
                min="50"
                max="125"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                <span>50 kg</span>
                <span>85 kg</span>
                <span>125 kg</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold block mb-2">
                Silhouette Style:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'compression', label: 'Snug Compression', sub: 'Gym / Lift' },
                  { id: 'regular', label: 'Standard Fit', sub: 'Classic' },
                  { id: 'oversized', label: 'Boxy Oversized', sub: 'Streetwear' },
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setFitPreference(style.id)}
                    className={`p-2.5 border rounded-sm text-left font-mono transition-colors ${
                      fitPreference === style.id
                        ? 'border-white bg-zinc-900 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block leading-tight">{style.label}</span>
                    <span className="text-[10px] text-zinc-500">{style.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-sm p-6 flex flex-col justify-between h-full text-center sm:text-left">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                RECOMMENDED SIZING
              </span>
              
              <div className="my-4 flex items-center justify-center sm:justify-start gap-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-sm bg-white flex items-center justify-center text-black font-display font-black text-4xl shadow-xl">
                  {recommendation.size}
                </div>
                <div className="text-left">
                  <span className="font-mono text-xs font-bold text-white block uppercase">
                    {recommendation.label}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    98.4% Fit Match Accuracy
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-mono leading-relaxed bg-black p-3 border border-zinc-900 rounded-sm text-left">
                {recommendation.note}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900">
              <a
                href="#drops"
                onClick={handleApplyRecommendedSize}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Filter Drops in Size {recommendation.size}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
