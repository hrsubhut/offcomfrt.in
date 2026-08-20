import React from 'react';

export const MarqueeTicker = () => {
  const items = [
    "OFF - COMFRT ( OUTSIDE COMFORT )",
    "280 GSM HEAVYWEIGHT DROPS",
    "PRO-FLEX™ COMPRESSION",
    "100% GOTS ORGANIC COTTON",
    "TEXTURE OVER NOISE",
    "ZERO PRINTS • ZERO BRANDING",
    "STRUCTURAL WAFFLE WEAVE",
    "FROM INDIA TO THE WORLD",
  ];

  return (
    <div className="py-2.5 bg-zinc-950 border-y border-zinc-900 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-6 mx-4">
            <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase flex items-center gap-2">
              <span className="text-white">—</span>
              <span>{text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
