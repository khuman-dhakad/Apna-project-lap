import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { getLaptops } from '../services/api';

export const useProducts = () => {
  const { state, dispatch, filteredProducts } = useApp(); // ✅ get filteredProducts from context

  useEffect(() => {
    const load = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await getLaptops();
        dispatch({ type: 'SET_PRODUCTS', payload: res.data || [] });
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };
    load();
  }, [dispatch]);

  return {
    products: state.products,           // all products (unfiltered)
    filteredProducts: filteredProducts, // ✅ was state.products — now actually filtered
    isLoading: state.isLoading,
  };
};