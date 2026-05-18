import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useApp } from '../contexts/AppContext';
import { ChevronDown, Grid, List, Filter } from 'lucide-react';

const ProductsPage = () => {
  const { filteredProducts, isLoading } = useProducts();
  const { state, dispatch } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const grade = searchParams.get('grade');
    
    if (category) {
      dispatch({ type: 'SET_FILTERS', payload: { categories: [category] } });
    }
    if (brand) {
      dispatch({ type: 'SET_FILTERS', payload: { brands: [brand] } });
    }
    if (grade) {
      dispatch({ type: 'SET_FILTERS', payload: { grades: [grade] } });
    }
  }, [searchParams, dispatch]);

  const handleSortChange = (sortBy) => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { sortBy }
    });
  };

  const getSortedProducts = () => {
    let sorted = [...filteredProducts];
    
    switch (state.filters.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  };

  const sortedProducts = getSortedProducts();
  const totalPages = Math.ceil(sortedProducts.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + state.itemsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 w-full justify-center"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filter Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Refurbished Laptops
                </h1>
                <p className="text-gray-600 mt-1">
                  {sortedProducts.length} laptop{sortedProducts.length !== 1 ? 's' : ''} found
                  {state.searchQuery && (
                    <span> for "{state.searchQuery}"</span>
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select 
                  value={state.filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(state.filters.brands.length > 0 || state.filters.grades.length > 0 || state.searchQuery) && (
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Active Filters:</h3>
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'SET_FILTERS',
                        payload: {
                          brands: [],
                          grades: [],
                          categories: [],
                          processors: [],
                          ramSizes: [],
                          storageTypes: [],
                          priceRange: [0, 5000],
                          minRating: 0,
                          batteryHealth: 0,
                          inStockOnly: false,
                        }
                      });
                      dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {state.searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Search: {state.searchQuery}
                    </span>
                  )}
                  {state.filters.brands.map(brand => (
                    <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Brand: {brand}
                    </span>
                  ))}
                  {state.filters.grades.map(grade => (
                    <span key={grade} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Grade: {grade}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <ProductGrid products={paginatedProducts} />
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: Math.max(1, state.currentPage - 1) })}
                  disabled={state.currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                      page === state.currentPage
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: Math.min(totalPages, state.currentPage + 1) })}
                  disabled={state.currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;