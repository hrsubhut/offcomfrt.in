import React, { useState, Suspense, lazy } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { StoryHighlights } from './components/home/StoryHighlights';
import { MarqueeTicker } from './components/home/MarqueeTicker';
import { ProductGrid } from './components/home/ProductGrid';
import { FabricLab } from './components/home/FabricLab';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { FloatingBag } from './components/layout/FloatingBag';
import { ToastContainer } from './components/ui/Toast';

// Lazy-load below-the-fold modules for speed & performance
const CraftSection = lazy(() => import('./components/home/CraftSection').then(m => ({ default: m.CraftSection })));
const FitAdvisor = lazy(() => import('./components/home/FitAdvisor').then(m => ({ default: m.FitAdvisor })));
const Lookbook = lazy(() => import('./components/home/Lookbook').then(m => ({ default: m.Lookbook })));
const FounderStory = lazy(() => import('./components/home/FounderStory').then(m => ({ default: m.FounderStory })));
const CommunityReviews = lazy(() => import('./components/home/CommunityReviews').then(m => ({ default: m.CommunityReviews })));
const ProductQuickView = lazy(() => import('./components/product/ProductQuickView').then(m => ({ default: m.ProductQuickView })));

export function App() {
  const [sizeFilter, setSizeFilter] = useState('All');

  const handleFilterBySize = (size) => {
    setSizeFilter(size);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-brand-light flex flex-col selection:bg-white selection:text-black">
        
        {/* Navigation Bar */}
        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Story Highlights */}
          <StoryHighlights />

          {/* 3. Infinite Marquee Ticker */}
          <MarqueeTicker />

          {/* 4. Drops & Essentials Catalog Grid (All items & collections first) */}
          <ProductGrid initialSizeFilter={sizeFilter} />

          {/* 5. 280 GSM Material & Fabric Science Lab */}
          <FabricLab />

          {/* 6. Workshop Craft & Pattern Cutting */}
          <Suspense fallback={<div className="py-12 bg-black text-center font-mono text-xs text-zinc-600">Loading Section...</div>}>
            <CraftSection />

            {/* 7. Biometric Fit Advisor */}
            <FitAdvisor onFilterBySize={handleFilterBySize} />

            {/* 8. Community Athlete Lookbook */}
            <Lookbook />

            {/* 9. Our Story — The Founders' Raw Letter (Robby & Deepanshu) */}
            <FounderStory />

            {/* 10. Verified DMs & Live Sliding Community Reviews at the end */}
            <CommunityReviews />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Persistent Floating Bag Button */}
        <FloatingBag />

        {/* Modals & Drawers */}
        <CartDrawer />
        
        <Suspense fallback={null}>
          <ProductQuickView />
        </Suspense>

        <ToastContainer />

      </div>
    </CartProvider>
  );
}

export default App;
