import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ShoppingCart, User, Menu, X, Shield, Truck, RotateCcw,
  Heart, Bell, LogOut, LogIn, Settings, Package, ChevronDown
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import AuthForm from './AuthForm';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const handleSignOut = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery.trim() });
      navigate('/products');
    }
  };

  const handleLogin = () => {
    setShowLoginModal(true);
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
            <AuthForm onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
      {!showLoginModal && (
        <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
          {/* Trust Bar */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>10-Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    NikAnk Laptops
                  </h1>
                </Link>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:block flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Search for laptops, brands, or models..."
                  />
                </form>
              </div>

              {/* Navigation - Desktop */}
              <div className="hidden md:flex items-center space-x-6">
                <nav className="flex space-x-6">
                  <Link
                    to="/products"
                    className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    All Laptops
                  </Link>
                  <Link
                    to="/sell"
                    className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sell
                  </Link>
                  <Link
                    to="/reals"
                    className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Reals
                  </Link>
                </nav>

                {/* Wishlist */}
                {state.isAuthenticated && (
                  <Link
                    to="/wishlist"
                    className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                  >
                    <Heart className="h-6 w-6" />
                    {state.wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {state.wishlist.length}
                      </span>
                    )}
                  </Link>
                )}

                {/* Notifications */}
                {state.isAuthenticated && (
                  <Link
                    to="/notifications"
                    className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                  >
                    <Bell className="h-6 w-6" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                )}

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {state.user?.avatar ? (
                      <img
                        src={state.user.avatar}
                        alt={state.user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                    {state.user && <span className="text-sm font-medium hidden lg:block">{state.user.name}</span>}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {state.isAuthenticated ? (
                        <>
                          <Link
                            to="/Profile"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="h-4 w-4" />
                            <span>Orders</span>
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <hr className="my-1" />
                          <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleLogin}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign In
                          </button>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleLogin}
                          >
                            Create Account
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden pb-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Search laptops..."
                />
              </form>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/products"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Laptops
                </Link>
                <Link
                  to="/sell"
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sell
                </Link>
                <Link
                  to="/reals"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reals
                </Link>

                <div className="border-t border-gray-200 pt-4">
                  {state.isAuthenticated && (
                    <div className="relative">
                      <button
                        onClick={() => setIsMobileUserMenuOpen(!isMobileUserMenuOpen)}
                        className="flex items-center space-x-2 px-3 py-2 w-full text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                      >
                        {state.user?.avatar ? (
                          <img
                            src={state.user.avatar}
                            alt={state.user.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6" />
                        )}
                        <span>{state.user?.name || 'Account'}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {isMobileUserMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setIsMobileUserMenuOpen(false); setIsMenuOpen(false); }}>Profile</Link>
                          <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setIsMobileUserMenuOpen(false); setIsMenuOpen(false); }}>Orders</Link>
                          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setIsMobileUserMenuOpen(false); setIsMenuOpen(false); }}>Settings</Link>
                          <button onClick={() => { handleSignOut(); setIsMobileUserMenuOpen(false); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                        </div>
                      )}
                    </div>
                  )}
                  {!state.isAuthenticated && (
                    <>
                      <button
                        onClick={() => {
                          handleLogin();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                      >
                        Sign In
                      </button>
                      <Link
                        to="/register"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
