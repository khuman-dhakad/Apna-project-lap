import React, { useState, createContext, useContext, useReducer, useEffect, useMemo } from 'react';

// ─── Cart Context ────────────────────────────────────────────────────────────

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.product.id === item.product.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCartItems(prevItems =>
      prevItems.map(item => item.product.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// ─── Filter Logic ─────────────────────────────────────────────────────────────
// Single source of truth — used by the context value below.
// Case-insensitive matching throughout so "Khuman" === "khuman".

const applyFilters = (products = [], filters = {}, searchQuery = '') => {
  let result = [...products];

  // Search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(p =>
      (p.name ?? '').toLowerCase().includes(q) ||
      (p.brand ?? '').toLowerCase().includes(q) ||
      (p.category ?? '').toLowerCase().includes(q) ||
      (p.processor?.toString() ?? '').toLowerCase().includes(q)
    );
  }

  // Brand — THIS was the root cause: filter was never applied
  if (filters.brands?.length > 0) {
    const set = new Set(filters.brands.map(b => b.toLowerCase().trim()));
    result = result.filter(p => set.has((p.brand ?? '').toLowerCase().trim()));
  }

  // Category
  if (filters.categories?.length > 0) {
    const set = new Set(filters.categories.map(c => c.toLowerCase().trim()));
    result = result.filter(p => set.has((p.category ?? '').toLowerCase().trim()));
  }

  // Condition grade
  if (filters.grades?.length > 0) {
    const set = new Set(filters.grades.map(g => g.toLowerCase().trim()));
    result = result.filter(p => set.has((p.grade ?? '').toLowerCase().trim()));
  }

  // Price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter(p => {
      const price = Number(p.price ?? 0);
      return price >= min && price <= max;
    });
  }

  // Processor
  if (filters.processors?.length > 0) {
    const set = new Set(filters.processors.map(p => p.toLowerCase().trim()));
    result = result.filter(p => set.has((p.processor?.toString() ?? '').toLowerCase().trim()));
  }

  // RAM
  if (filters.ramSizes?.length > 0) {
    const set = new Set(filters.ramSizes.map(r => r.toLowerCase().trim()));
    result = result.filter(p => set.has((p.ram?.toString() ?? '').toLowerCase().trim()));
  }

  // Storage
  if (filters.storageTypes?.length > 0) {
    const set = new Set(filters.storageTypes.map(s => s.toLowerCase().trim()));
    result = result.filter(p => set.has((p.storage?.toString() ?? '').toLowerCase().trim()));
  }

  // Min rating
  if (filters.minRating > 0) {
    result = result.filter(p => Number(p.rating ?? 0) >= filters.minRating);
  }

  // Battery health
  if (filters.batteryHealth > 0) {
    result = result.filter(p => Number(p.batteryHealth ?? 0) >= filters.batteryHealth);
  }

  // In stock only
  if (filters.inStockOnly) {
    result = result.filter(p => p.inStock === true || Number(p.stock ?? 0) > 0);
  }

  // Sort
  switch (filters.sortBy) {
    case 'price-asc':
      result.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case 'price-desc':
      result.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case 'rating':
      result.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0));
      break;
    case 'featured':
    default:
      break;
  }

  return result;
};

// ─── App Reducer ─────────────────────────────────────────────────────────────

const initialState = {
  products: [],
  cart: [],
  user: null,
  filters: {
    brands: [],
    priceRange: [0, 100000],   // Fixed: was 5000, now matches FilterSidebar PRICE_MAX
    grades: [],
    processors: [],
    ramSizes: [],
    storageTypes: [],
    minRating: 0,
    inStockOnly: false,
    categories: [],
    batteryHealth: 0,
    sortBy: 'featured',
  },
  searchQuery: '',
  isLoading: false,
  orders: [],
  notifications: [],
  wishlist: [],
  compareList: [],
  currentPage: 1,
  itemsPerPage: 12,
  isAuthenticated: false,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1, addedAt: new Date().toISOString() }],
      };
    }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };

    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload.productId) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'SignOut':
      return { ...state, user: null, isAuthenticated: false, cart: [], wishlist: [], orders: [], notifications: [] };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, currentPage: 1 };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'ADD_TO_WISHLIST':
      if (!state.wishlist.includes(action.payload)) {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
      return state;

    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(id => id !== action.payload) };

    case 'ADD_TO_COMPARE':
      if (!state.compareList.includes(action.payload) && state.compareList.length < 3) {
        return { ...state, compareList: [...state.compareList, action.payload] };
      }
      return state;

    case 'REMOVE_FROM_COMPARE':
      return { ...state, compareList: state.compareList.filter(id => id !== action.payload) };

    case 'CLEAR_COMPARE':
      return { ...state, compareList: [] };

    case 'SET_ORDERS':
      return { ...state, orders: action.payload };

    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };

    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
      };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

// ─── App Context & Provider ───────────────────────────────────────────────────

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');

    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach(item => dispatch({ type: 'ADD_TO_CART', payload: item.product }));
      } catch (e) { console.error('Error loading cart:', e); }
    }
    if (savedWishlist) {
      try {
        const wishlist = JSON.parse(savedWishlist);
        wishlist.forEach(id => dispatch({ type: 'ADD_TO_WISHLIST', payload: id }));
      } catch (e) { console.error('Error loading wishlist:', e); }
    }
    if (savedUser) {
      try {
        dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
      } catch (e) { console.error('Error loading user:', e); }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(state.cart)); }, [state.cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); }, [state.wishlist]);
  useEffect(() => {
    if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
    else localStorage.removeItem('user');
  }, [state.user]);

  // ✅ THE FIX: filteredProducts is derived here via useMemo.
  // It automatically re-runs whenever products, filters, or searchQuery changes.
  // Your product list page just needs to use filteredProducts instead of state.products.
  const filteredProducts = useMemo(
    () => applyFilters(state.products, state.filters, state.searchQuery),
    [state.products, state.filters, state.searchQuery]
  );

  // Pass filteredProducts in the context value so any component can access it
  return (
    <AppContext.Provider value={{ state, dispatch, filteredProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};