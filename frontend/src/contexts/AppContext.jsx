import React, { useState, createContext, useContext, useReducer, useEffect } from 'react';

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
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// ─── App Reducer ─────────────────────────────────────────────────────────────

const initialState = {
  products: [],
  cart: [],
  user: null,
  filters: {
    brands: [],
    priceRange: [0, 5000],
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

    case 'ADD_TO_CART':
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
        cart: [...state.cart, {
          product: action.payload,
          quantity: 1,
          addedAt: new Date().toISOString()
        }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== action.payload.productId),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'SignOut':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
        wishlist: [],
        orders: [],
        notifications: [],
      };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

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
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload),
      };

    case 'ADD_TO_COMPARE':
      if (!state.compareList.includes(action.payload) && state.compareList.length < 3) {
        return { ...state, compareList: [...state.compareList, action.payload] };
      }
      return state;

    case 'REMOVE_FROM_COMPARE':
      return {
        ...state,
        compareList: state.compareList.filter(id => id !== action.payload),
      };

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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');

    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach((item) => {
          dispatch({ type: 'ADD_TO_CART', payload: item.product });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    if (savedWishlist) {
      try {
        const wishlist = JSON.parse(savedWishlist);
        wishlist.forEach((productId) => {
          dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
        });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN', payload: user });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
