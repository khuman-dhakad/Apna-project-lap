import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { state, dispatch } = useApp();

  const wishlistProducts = state.products.filter(product =>
    state.wishlist.includes(product.id)
  );

  const clearWishlist = () => {
    state.wishlist.forEach(productId => {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    });
  };

  const addAllToCart = () => {
    wishlistProducts.forEach(product => {
      if (product.inStock) {
        dispatch({ type: 'ADD_TO_CART', payload: product });
      }
    });
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign in to view your wishlist</h1>
            <p className="text-gray-600 mb-8">
              Save your favorite laptops and keep track of items you want to buy later.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">
              Start adding laptops to your wishlist by clicking the heart icon on products you love.
            </p>
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Browse Laptops</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              <span>My Wishlist</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>

            {wishlistProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={addAllToCart}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add All to Cart</span>
                </button>

                <button
                  onClick={clearWishlist}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.products
              .filter(product => !state.wishlist.includes(product.id))
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;