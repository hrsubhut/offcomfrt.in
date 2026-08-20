import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black border-t border-brand-border text-zinc-400 relative overflow-hidden">
      
      {/* Brand Value Pillars */}
      <div className="border-b border-zinc-900 py-8 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-black border border-zinc-800 text-white rounded-sm shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">280 GSM Heavyweight</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed font-mono">
                  100% GOTS-certified organic combed cotton.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-black border border-zinc-800 text-white rounded-sm shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Express Dispatch</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed font-mono">
                  48-hour express dispatch across Indian metros.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-black border border-zinc-800 text-white rounded-sm shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">7-Day Fit Guarantee</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed font-mono">
                  Hassle-free size exchange and direct support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-black border border-zinc-800 text-white rounded-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Secure Checkout</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed font-mono">
                  Encrypted UPI, Cards, and NetBanking.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-5 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="OFFCOMFRT"
                  className="w-full h-auto object-contain"
                />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-white">
                OFFCOMFRT
              </span>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed font-mono max-w-sm">
              Off - comfrt ( outside comfort ). Engineered in India for those who step beyond comfort. Texture over noise. Zero prints. Zero unnecessary branding.
            </p>

            {/* Newsletter */}
            <div className="mt-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-2 font-bold">
                Drop Priority List:
              </span>
              {subscribed ? (
                <div className="p-3 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono rounded-sm">
                  ✓ Priority access confirmed. You will receive private drop links.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="flex-1 bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white rounded-sm font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors rounded-sm flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            
            <div>
              <h5 className="font-bold uppercase tracking-widest text-white mb-3 text-[11px]">
                Archive
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400">
                <li><a href="#drops" className="hover:text-white transition-colors">RAW™ Compression</a></li>
                <li><a href="#drops" className="hover:text-white transition-colors">SLUB 001 Acid Wash</a></li>
                <li><a href="#drops" className="hover:text-white transition-colors">Waffle Knit Henleys</a></li>
                <li><a href="#drops" className="hover:text-white transition-colors">LWR French Terry Bottoms</a></li>
                <li><a href="#drops" className="hover:text-white transition-colors">Jacquard Polos</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-white mb-3 text-[11px]">
                Science & Fit
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400">
                <li><a href="#story" className="hover:text-white transition-colors">Founder Story (Robby & Deepanshu)</a></li>
                <li><a href="#fabric-lab" className="hover:text-white transition-colors">280 GSM Fabric Lab</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Live Community DMs</a></li>
                <li><a href="#fit-advisor" className="hover:text-white transition-colors">Biometric Fit Guide</a></li>
                <li><a href="#lookbook" className="hover:text-white transition-colors">Community Lookbook</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-white mb-3 text-[11px]">
                OFFCOMFRT™
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-500">
                <li><span>OFFCOMFRT APPARELS LLP</span></li>
                <li><span className="text-zinc-400">support@offcomfrt.in</span></li>
                <li><span className="text-zinc-400">Instagram: @offcomfrt</span></li>
                <li className="pt-2">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <a href="https://instagram.com/offcomfrt" target="_blank" rel="noreferrer" className="hover:text-white"><Instagram className="w-4 h-4" /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><Twitter className="w-4 h-4" /></a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white"><Youtube className="w-4 h-4" /></a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Legal */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} OFFCOMFRT APPARELS LLP. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>OFFCOMFRT APPARELS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
