import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Shield, Truck, Battery, CheckCircle, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ProductCard = ({ product }) => {
  const { state, dispatch } = useApp();
  const isWishlisted = state.wishlist.includes(product.id);

  const getGradeBadge = (grade) => {
    const badges = {
      'Like New': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Grade A': 'bg-blue-100 text-blue-800 border-blue-200',
      'Certified Refurbished': 'bg-purple-100 text-purple-800 border-purple-200',
      'Grade B': 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return badges[grade] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getBatteryColor = (health) => {
    if (health >= 90) return 'text-emerald-600';
    if (health >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group block"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getGradeBadge(product.grade)}`}>
            {product.grade}
          </span>
          {product.featured && (
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            product.discount > 0 ? 'top-12' : ''
          } ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Brand */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{product.condition}</p>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="font-medium">CPU:</span>
            <span className="truncate">{product.specifications.processor.split(' ').slice(0, 2).join(' ')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-medium">RAM:</span>
            <span>{product.specifications.ram}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-medium">Storage:</span>
            <span>{product.specifications.storage}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery className={`h-3 w-3 ${getBatteryColor(product.specifications.batteryHealth)}`} />
            <span className={getBatteryColor(product.specifications.batteryHealth)}>
              {product.specifications.batteryHealth}%
            </span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {product.seller.verified && <CheckCircle className="h-4 w-4 text-emerald-600" />}
            <span className="text-sm text-gray-700 truncate">{product.seller.name}</span>
          </div>
        </div>

        {/* Warranty and Shipping */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>{product.warranty.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="h-3 w-3" />
            <span className={product.shipping.free ? 'text-emerald-600 font-medium' : ''}>
              {product.shipping.free ? 'Free' : `$${product.shipping.cost}`} shipping
            </span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
