import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const { wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'DROPS', href: '#drops' },
    { name: 'OUR STORY', href: '#story' },
    { name: '280 GSM LAB', href: '#fabric-lab' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'FIT ADVISOR', href: '#fit-advisor' },
    { name: 'LOOKBOOK', href: '#lookbook' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-zinc-950 text-zinc-300 py-1.5 px-4 text-xs font-mono tracking-wider text-center flex items-center justify-center gap-4 overflow-hidden select-none border-b border-zinc-900">
        <span>OFF - COMFRT ( OUTSIDE COMFORT )</span>
        <span className="hidden md:inline-block text-zinc-600">•</span>
        <span className="hidden md:inline-block font-bold text-white">FROM INDIA TO THE WORLD</span>
        <span className="hidden lg:inline-block text-zinc-600">•</span>
        <span className="hidden lg:inline-block">EXPRESS DISPATCH ACROSS INDIA</span>
      </div>

      {/* Main Header Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800 shadow-2xl py-3.5'
            : 'bg-black/70 backdrop-blur-md border-b border-zinc-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-zinc-300 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 group-hover:scale-105">
                —
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tighter text-white group-hover:text-zinc-200 uppercase">
                  OFFCOMFRT
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 -mt-1 font-mono">
                  Outside Comfort
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation List matching exact order */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Wishlist */}
          <div className="flex items-center gap-3">
            <a
              href="#drops"
              className="p-2 text-zinc-400 hover:text-white relative transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white text-black text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[86px] inset-x-0 bg-black/98 backdrop-blur-2xl border-b border-zinc-800 z-30 p-6 shadow-2xl">
          <div className="flex flex-col gap-4 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-zinc-900 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600" />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
