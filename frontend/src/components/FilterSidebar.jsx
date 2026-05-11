import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const FilterSidebar = () => {
  const { state, dispatch } = useApp();
  const products = state.products || [];

  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    grades: true,
    price: true,
    specs: false,
    rating: false,
    categories: false,
  });

  // Dynamic filter arrays
  const brands = useMemo(
    () => Array.from(new Set(products.map(p => p.brand).filter(v => !!v))).sort(),
    [products]
  );
  const grades = useMemo(
    () => Array.from(new Set(products.map(p => p.grade).filter(v => !!v))).sort(),
    [products]
  );
  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category).filter(v => !!v))).sort(),
    [products]
  );
  const processors = useMemo(
    () => Array.from(new Set(products.map(p => p.processor?.toString()).filter(v => !!v))).sort(),
    [products]
  );
  const ramSizes = useMemo(
    () => Array.from(new Set(products.map(p => p.ram?.toString()).filter(v => !!v))).sort(),
    [products]
  );
  const storageTypes = useMemo(
    () => Array.from(new Set(products.map(p => p.storage?.toString()).filter(v => !!v))).sort(),
    [products]
  );

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, isArray = false) => {
    if (isArray) {
      const currentArray = state.filters[filterType];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];

      dispatch({
        type: 'SET_FILTERS',
        payload: { [filterType]: newArray }
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: { [filterType]: value }
      });
    }
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...state.filters.priceRange];
    newRange[index] = value;
    dispatch({
      type: 'SET_FILTERS',
      payload: { priceRange: newRange }
    });
  };

  const clearAllFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        categories: [],
        brands: [],
        grades: [],
        processors: [],
        ramSizes: [],
        storageTypes: [],
        priceRange: [0, 5000],
        minRating: 0,
        batteryHealth: 0,
        inStockOnly: false,
        sortBy: 'featured',
      }
    });
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {expandedSections[section] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {expandedSections[section] && <div className="mt-2">{children}</div>}
    </div>
  );

  const activeFiltersCount =
    state.filters.brands.length +
    state.filters.grades.length +
    state.filters.categories.length +
    state.filters.processors.length +
    state.filters.ramSizes.length +
    state.filters.storageTypes.length +
    (state.filters.minRating > 0 ? 1 : 0) +
    (state.filters.batteryHealth > 0 ? 1 : 0) +
    (state.filters.inStockOnly ? 1 : 0) +
    (state.filters.priceRange[0] > 0 || state.filters.priceRange[1] < 5000 ? 1 : 0);

  return (
    <aside className="bg-white rounded-lg shadow-md border border-gray-100 p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <FilterSection title="Category" section="categories">
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={state.filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category, true)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brand" section="brands">
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={state.filters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand, true)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Grade */}
        <FilterSection title="Condition Grade" section="grades">
          <div className="space-y-2">
            {grades.map(grade => (
              <label key={grade} className="flex items-center">
                <input
                  type="checkbox"
                  checked={state.filters.grades.includes(grade)}
                  onChange={() => handleFilterChange('grades', grade, true)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{grade}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  value={state.filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                  max="5000"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  value={state.filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, Number(e.target.value))}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                  max="5000"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 text-center">
              ${state.filters.priceRange[0]} - ${state.filters.priceRange[1]}
            </div>
          </div>
        </FilterSection>

        {/* Specifications */}
        <FilterSection title="Specifications" section="specs">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Processor</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {processors.map(processor => (
                  <label key={processor} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={state.filters.processors.includes(processor)}
                      onChange={() => handleFilterChange('processors', processor, true)}
                      className="h-3 w-3 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-xs text-gray-700">{processor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RAM</label>
              <div className="space-y-1">
                {ramSizes.map(ram => (
                  <label key={ram} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={state.filters.ramSizes.includes(ram)}
                      onChange={() => handleFilterChange('ramSizes', ram, true)}
                      className="h-3 w-3 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-xs text-gray-700">{ram}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {storageTypes.map(storage => (
                  <label key={storage} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={state.filters.storageTypes.includes(storage)}
                      onChange={() => handleFilterChange('storageTypes', storage, true)}
                      className="h-3 w-3 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-xs text-gray-700">{storage}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Minimum Rating" section="rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={state.filters.minRating === rating}
                  onChange={() => handleFilterChange('minRating', rating)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Battery Health */}
        <div className="border-b border-gray-200 pb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Battery Health: {state.filters.batteryHealth}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={state.filters.batteryHealth}
            onChange={(e) => handleFilterChange('batteryHealth', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* In Stock Only */}
        <div className="border-b border-gray-200 pb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={state.filters.inStockOnly}
              onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
