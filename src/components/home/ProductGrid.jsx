import React, { useState, useMemo, memo } from 'react';
import { Search, Heart, Eye, Star, Filter, ArrowDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { useCart } from '../../context/CartContext';

// Memoized Individual Product Card for Ultra-Fast Grid Rendering
const ProductCard = memo(({ product, isWishlisted, onToggleWishlist, onQuickAdd, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const secondaryImg = product.images && product.images.length > 1 ? product.images[1] : null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-500 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        
        {/* Placeholder skeleton before load */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
        )}

        <img
          src={isHovered && secondaryImg ? secondaryImg : product.primaryImage}
          alt={product.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          <span className="px-2 py-0.5 bg-black/90 backdrop-blur-md text-zinc-300 border border-zinc-800 font-mono text-[10px] font-bold rounded">
            {product.gsm}
          </span>
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-white text-black font-mono text-[9px] font-black uppercase rounded shadow">
              ESSENTIAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-white text-black'
              : 'bg-black/60 text-zinc-400 hover:text-white'
          }`}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[90%] py-2 bg-black/90 hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex items-center justify-center gap-1.5 shadow-xl border border-zinc-800"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect Piece</span>
        </button>
      </div>

      {/* Product Details & Actions */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-3">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
            <span className="uppercase text-zinc-400 font-semibold">{product.category}</span>
            <div className="flex items-center gap-1 text-zinc-400">
              <Star className="w-3 h-3 fill-zinc-300" />
              <span className="font-bold text-white">{product.rating}</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug cursor-pointer hover:underline"
          >
            {product.title}
          </h3>

          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-mono font-bold text-sm text-white">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-zinc-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Instant Size Quick-Add Buttons */}
        <div className="pt-2 border-t border-zinc-900">
          <span className="text-[10px] font-mono text-zinc-500 block mb-1">
            Quick Add Size:
          </span>
          <div className="grid grid-cols-4 gap-1">
            {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
              <button
                key={size}
                onClick={() => onQuickAdd(product, size)}
                className="py-1 bg-black hover:bg-white hover:text-black border border-zinc-800 text-zinc-300 font-mono text-[10px] font-bold rounded transition-colors"
                title={`Add Size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export const ProductGrid = ({ initialSizeFilter }) => {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [selectedGsm, setSelectedGsm] = useState('All');
  const [selectedSize, setSelectedSize] = useState(initialSizeFilter || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(16); // Progressive pagination for instant initial render

  React.useEffect(() => {
    if (initialSizeFilter) {
      setSelectedSize(initialSizeFilter);
    }
  }, [initialSizeFilter]);

  const gsmOptions = ["All", "220 GSM", "260 GSM", "280 GSM", "320 GSM"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All Items' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedGsm !== 'All') {
        const gsmPrefix = selectedGsm.split(' ')[0];
        if (!product.gsm.includes(gsmPrefix)) return false;
      }
      if (selectedSize !== 'All') {
        if (!product.sizes.includes(selectedSize)) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedGsm, selectedSize, searchQuery, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleQuickAdd = React.useCallback((product, size) => {
    addToCart(product, size, 1);
  }, [addToCart]);

  return (
    <section id="drops" className="py-20 bg-brand-black border-b border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
              <span>CATALOG ARCHIVE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              DROPS & ESSENTIALS
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-1.5 font-mono">
              Showing {filteredProducts.length} pieces across RAW compression, 280 GSM slub, waffle knits, and french terry bottoms.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(16);
              }}
              placeholder="Search drops, fabric, cuts..."
              className="w-full bg-zinc-950 border border-zinc-800 pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white rounded-sm font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-zinc-900 mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(16);
                }}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-white text-black'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-zinc-950 border border-zinc-800 rounded-sm mb-10 text-xs font-mono">
          
          {/* GSM Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 uppercase font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-white" />
              GSM:
            </span>
            {gsmOptions.map((gsm) => (
              <button
                key={gsm}
                onClick={() => {
                  setSelectedGsm(gsm);
                  setVisibleCount(16);
                }}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  selectedGsm === gsm
                    ? 'bg-zinc-800 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {gsm}
              </button>
            ))}
          </div>

          {/* Size & Sort Selectors */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                  setVisibleCount(16);
                }}
                className="bg-black border border-zinc-800 text-white px-2.5 py-1 rounded focus:outline-none focus:border-white"
              >
                <option value="All">All Sizes</option>
                <option value="S">Size S</option>
                <option value="M">Size M</option>
                <option value="L">Size L</option>
                <option value="XL">Size XL</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-zinc-800 text-white px-2.5 py-1 rounded focus:outline-none focus:border-white"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <p className="font-mono text-zinc-400 text-sm">No items found matching the selected filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Items');
                setSelectedGsm('All');
                setSelectedSize('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-white text-black font-mono font-bold text-xs uppercase rounded-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onQuickAdd={handleQuickAdd}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {/* Load More Button for Progressive Hydration */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 16)}
                  className="px-8 py-3 bg-zinc-950 hover:bg-white hover:text-black border border-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>Load More Pieces ({filteredProducts.length - visibleCount} Remaining)</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
