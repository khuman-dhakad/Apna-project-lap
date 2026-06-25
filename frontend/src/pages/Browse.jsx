import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star, Shield, Heart } from 'lucide-react';
import { laptops } from '../data/mockData';
import { useCart } from '../contexts/AppContext';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    condition: '',
    priceRange: '',
    processor: '',
    ram: '',
    storage: '' hwfdfsvhvbjhdsvckdnmdcb 
  });
  const [sortBy, setSortBy] = useState('newest');

  const { addToCart } = useCart();
  const searchQuery = searchParams.get('search') || '';

  const filteredAndSortedLaptops = useMemo(() => {
    let filtered = laptops.filter(laptop => {
      // Search filter
      if (searchQuery && !laptop.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !laptop.model.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (filters.brand && laptop.brand !== filters.brand) return false;

      // Condition filter
      if (filters.condition && laptop.condition !== filters.condition) return false;

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          if (laptop.price < min || laptop.price > max) return false;
        } else {
          if (laptop.price < min) return false;
        }
      }

      // Processor filter
      if (filters.processor && !laptop.processor.toLowerCase().includes(filters.processor.toLowerCase())) return false;

      // RAM filter
      if (filters.ram && !laptop.ram.includes(filters.ram)) return false;

      // Storage filter
      if (filters.storage && !laptop.storage.toLowerCase().includes(filters.storage.toLowerCase())) return false;

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleAddToCart = (laptop) => {
    addToCart({
      product: laptop,
      addedAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Browse Laptops'}
          </h1>
          <p className="text-gray-600">
            {filteredAndSortedLaptops.length} laptops found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  <option value="Apple">Apple</option>
                  <option value="Dell">Dell</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="HP">HP</option>
                  <option value="ASUS">ASUS</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Conditions</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Price</option>
                  <option value="0-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-1500">$1,000 - $1,500</option>
                  <option value="1500">Over $1,500</option>
                </select>
              </div>

              {/* RAM Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">RAM</label>
                <select
                  value={filters.ram}
                  onChange={(e) => setFilters({ ...filters, ram: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any RAM</option>
                  <option value="8GB">8GB</option>
                  <option value="16GB">16GB</option>
                  <option value="32GB">32GB</option>
                </select>
              </div>

              {/* Storage Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                <select
                  value={filters.storage}
                  onChange={(e) => setFilters({ ...filters, storage: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Storage</option>
                  <option value="ssd">SSD Only</option>
                  <option value="256gb">256GB+</option>
                  <option value="512gb">512GB+</option>
                  <option value="1tb">1TB+</option>
                </select>
              </div>

              <button
                onClick={() => setFilters({
                  brand: '',
                  condition: '',
                  priceRange: '',
                  processor: '',
                  ram: '',
                  storage: ''
                })}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedLaptops.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No laptops found matching your criteria.</p>
                <button
                  onClick={() => setFilters({
                    brand: '',
                    condition: '',
                    priceRange: '',
                    processor: '',
                    ram: '',
                    storage: ''
                  })}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedLaptops.map((laptop) => (
                  <div key={laptop.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                      <img
                        src={laptop.images[0]}
                        alt={laptop.title}
                        className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          laptop.condition === 'Excellent' 
                            ? 'bg-green-100 text-green-800'
                            : laptop.condition === 'Good'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {laptop.condition}
                        </span>
                      </div>
                      {laptop.isVerified && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </div>
                        </div>
                      )}
                      <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{laptop.title}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(laptop.seller.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          ({laptop.seller.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${laptop.price}</span>
                          {laptop.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${laptop.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        <p>{laptop.processor} • {laptop.ram} • {laptop.storage}</p>
                        <p className="text-xs text-gray-500 mt-1">📍 {laptop.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${laptop.id}`}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleAddToCart(laptop)}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
