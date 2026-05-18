import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { mockProducts } from '../data/mockData';

export const useProducts = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Simulate API call
    dispatch({ type: 'SET_LOADING', payload: true });

    setTimeout(() => {
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  }, [dispatch]);

  const getFilteredProducts = () => {
    let filtered = [...state.products];

    // Search query filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.specifications.processor.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (state.filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.categories.includes(product.category)
      );
    }

    // Brand filter
    if (state.filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.brands.includes(product.brand)
      );
    }

    // Grade filter
    if (state.filters.grades.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.grades.includes(product.grade)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1]
    );

    // Processor filter
    if (state.filters.processors.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.processors.some(processor =>
          product.specifications.processor.includes(processor)
        )
      );
    }

    // RAM filter
    if (state.filters.ramSizes.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.ramSizes.includes(product.specifications.ram)
      );
    }

    // Storage filter
    if (state.filters.storageTypes.length > 0) {
      filtered = filtered.filter(product =>
        state.filters.storageTypes.some(storage =>
          product.specifications.storage.includes(storage)
        )
      );
    }

    // Rating filter
    if (state.filters.minRating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= state.filters.minRating
      );
    }

    // Battery health filter
    if (state.filters.batteryHealth > 0) {
      filtered = filtered.filter(product =>
        product.specifications.batteryHealth >= state.filters.batteryHealth
      );
    }

    // In stock filter
    if (state.filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    return filtered;
  };

  return {
    products: state.products,
    filteredProducts: getFilteredProducts(),
    isLoading: state.isLoading,
  };
};