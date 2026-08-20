import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('offcomfrt_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: "raw-002",
        title: "RAW-002 (Full Sleeve Compression - Black)",
        price: 999,
        originalPrice: 1499,
        size: "L",
        primaryImage: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/46.jpg?v=1786559566&width=600&format=webp",
        quantity: 1,
        gsm: "220 GSM"
      },
      {
        id: "slub-001-acid-wash",
        title: "SLUB - 001 (Acid Wash Heavyweight)",
        price: 1299,
        originalPrice: 1499,
        size: "M",
        primaryImage: "https://cdn.shopify.com/s/files/1/0744/3834/4948/files/SLUB_ACID_WASSHH.jpg?v=1785772765&width=600&format=webp",
        quantity: 1,
        gsm: "280 GSM"
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('offcomfrt_wishlist');
    return saved ? JSON.parse(saved) : ["raw-001", "henley-002-combo"];
  });

  // UI Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Promo
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  
  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('offcomfrt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('offcomfrt_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (product, size = 'M', quantity = 1) => {
    setCart((prev) => {
      const itemIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (itemIndex > -1) {
        const newCart = [...prev];
        newCart[itemIndex].quantity += quantity;
        return newCart;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          size: size,
          primaryImage: product.primaryImage,
          quantity: quantity,
          gsm: product.gsm || '280 GSM'
        }
      ];
    });

    addToast(`Added "${product.title}" (${size}) to Bag`, 'success');
    setIsCartOpen(true);
  };

  const updateQuantity = (id, size, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    addToast('Item removed from Bag', 'warning');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  // Financial Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginal = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const shippingThreshold = 1999;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : 99;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalSavings = (totalOriginal - subtotal) + discountAmount;
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        subtotal,
        totalOriginal,
        discountAmount,
        appliedDiscount,
        totalAmount,
        totalSavings,
        totalItemCount,
        isFreeShipping,
        shippingThreshold,
        shippingFee,
        couponCode,
        setCouponCode,
        couponError,
        toasts,
        addToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
