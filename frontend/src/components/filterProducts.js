/**
 * filterProducts.js
 * -----------------
 * Pure function — paste this into your AppContext reducer or selector.
 * This is the ROOT CAUSE fix for why selecting "khuman" was still showing "Nikhil" products.
 *
 * BUG: If your reducer was doing:
 *   if (filters.brands.length > 0) {
 *     return products.filter(p => filters.brands.includes(p.brand))   // ← WRONG if brand names
 *   }                                                                  //   have different casing
 *
 * OR if filteredProducts was never re-derived after SET_FILTERS, the old
 * list was displayed — the most common cause of this symptom.
 *
 * FIX: Always re-derive filtered products inside the reducer (or via useMemo
 * in the context value) whenever either `products` or `filters` changes.
 */

export const filterProducts = (products = [], filters = {}) => {
  let result = [...products];

  // ── Brand ─────────────────────────────────────────────────────────────────
  // Case-insensitive match so "Khuman" === "khuman" === "KHUMAN"
  if (filters.brands?.length > 0) {
    const brandSet = new Set(filters.brands.map(b => b.toLowerCase().trim()));
    result = result.filter(p => brandSet.has((p.brand ?? '').toLowerCase().trim()));
  }

  // ── Category ──────────────────────────────────────────────────────────────
  if (filters.categories?.length > 0) {
    const catSet = new Set(filters.categories.map(c => c.toLowerCase().trim()));
    result = result.filter(p => catSet.has((p.category ?? '').toLowerCase().trim()));
  }

  // ── Condition grade ───────────────────────────────────────────────────────
  if (filters.grades?.length > 0) {
    const gradeSet = new Set(filters.grades.map(g => g.toLowerCase().trim()));
    result = result.filter(p => gradeSet.has((p.grade ?? '').toLowerCase().trim()));
  }

  // ── Price range ───────────────────────────────────────────────────────────
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter(p => {
      const price = Number(p.price ?? 0);
      return price >= min && price <= max;
    });
  }

  // ── Processor ─────────────────────────────────────────────────────────────
  if (filters.processors?.length > 0) {
    const procSet = new Set(filters.processors.map(p => p.toLowerCase().trim()));
    result = result.filter(p => procSet.has((p.processor?.toString() ?? '').toLowerCase().trim()));
  }

  // ── RAM ───────────────────────────────────────────────────────────────────
  if (filters.ramSizes?.length > 0) {
    const ramSet = new Set(filters.ramSizes.map(r => r.toLowerCase().trim()));
    result = result.filter(p => ramSet.has((p.ram?.toString() ?? '').toLowerCase().trim()));
  }

  // ── Storage ───────────────────────────────────────────────────────────────
  if (filters.storageTypes?.length > 0) {
    const storSet = new Set(filters.storageTypes.map(s => s.toLowerCase().trim()));
    result = result.filter(p => storSet.has((p.storage?.toString() ?? '').toLowerCase().trim()));
  }

  // ── Minimum rating ────────────────────────────────────────────────────────
  if (filters.minRating > 0) {
    result = result.filter(p => Number(p.rating ?? 0) >= filters.minRating);
  }

  // ── Battery health ────────────────────────────────────────────────────────
  if (filters.batteryHealth > 0) {
    result = result.filter(p => Number(p.batteryHealth ?? 0) >= filters.batteryHealth);
  }

  // ── In stock only ─────────────────────────────────────────────────────────
  if (filters.inStockOnly) {
    result = result.filter(p => p.inStock === true || Number(p.stock ?? 0) > 0);
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
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

/**
 * HOW TO USE IN AppContext.js
 * ───────────────────────────
 * import { filterProducts } from './filterProducts';
 *
 * Option A — in your reducer (recommended):
 * ──────────────────────────────────────────
 * case 'SET_FILTERS': {
 *   const newFilters = { ...state.filters, ...action.payload };
 *   return {
 *     ...state,
 *     filters: newFilters,
 *     filteredProducts: filterProducts(state.products, newFilters),  // ← re-derive here
 *   };
 * }
 *
 * case 'SET_PRODUCTS': {
 *   return {
 *     ...state,
 *     products: action.payload,
 *     filteredProducts: filterProducts(action.payload, state.filters), // ← and here
 *   };
 * }
 *
 * Option B — via useMemo in context provider:
 * ────────────────────────────────────────────
 * const filteredProducts = useMemo(
 *   () => filterProducts(state.products, state.filters),
 *   [state.products, state.filters]
 * );
 *
 * // Then pass filteredProducts in context value instead of state.filteredProducts
 */
