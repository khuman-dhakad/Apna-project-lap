import React, { useState, useMemo, useCallback, memo } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

const FilterSection = memo(({ title, section, expanded, onToggle, children }) => (
  <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
    <button
      onClick={() => onToggle(section)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '8px 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
      aria-expanded={expanded}
    >
      <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{title}</span>
      {expanded
        ? <ChevronUp style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} />
        : <ChevronDown style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} />}
    </button>
    {expanded && (
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </div>
    )}
  </div>
));

FilterSection.displayName = 'FilterSection';

// ✅ Fixed: block display + explicit margin so checkbox and label never collapse together
const CheckboxItem = ({ checked, onChange, label }) => (
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '5px 0',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        width: 16,
        height: 16,
        flexShrink: 0,
        accentColor: '#059669',
        cursor: 'pointer',
      }}
    />
    <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.4 }}>{label}</span>
  </label>
);

const EmptyState = ({ message }) => (
  <p style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic', padding: '4px 0', margin: 0 }}>
    {message}
  </p>
);

const SectionSubLabel = ({ children }) => (
  <p style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, marginTop: 0 }}>
    {children}
  </p>
);

const FilterSidebar = () => {
  const { state, dispatch } = useApp();
  const products = state.products || [];

  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    brands: true,
    grades: true,
    price: true,
    specs: false,
    rating: false,
  });

  const brands      = useMemo(() => Array.from(new Set(products.map(p => p.brand).filter(Boolean))).sort(), [products]);
  const grades      = useMemo(() => Array.from(new Set(products.map(p => p.grade).filter(Boolean))).sort(), [products]);
  const categories  = useMemo(() => Array.from(new Set(products.map(p => p.category).filter(Boolean))).sort(), [products]);
  const processors  = useMemo(() => Array.from(new Set(products.map(p => p.processor?.toString()).filter(Boolean))).sort(), [products]);
  const ramSizes    = useMemo(() => Array.from(new Set(products.map(p => p.ram?.toString()).filter(Boolean))).sort(), [products]);
  const storageTypes = useMemo(() => Array.from(new Set(products.map(p => p.storage?.toString()).filter(Boolean))).sort(), [products]);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleFilterChange = useCallback((filterType, value, isArray = false) => {
    if (isArray) {
      const current = state.filters[filterType] ?? [];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      dispatch({ type: 'SET_FILTERS', payload: { [filterType]: next } });
    } else {
      dispatch({ type: 'SET_FILTERS', payload: { [filterType]: value } });
    }
  }, [state.filters, dispatch]);

  const handlePriceChange = useCallback((index, raw) => {
    const value = Math.max(PRICE_MIN, Math.min(PRICE_MAX, Number(raw) || 0));
    const next = [...state.filters.priceRange];
    next[index] = value;
    if (index === 0 && value > next[1]) next[1] = value;
    if (index === 1 && value < next[0]) next[0] = value;
    dispatch({ type: 'SET_FILTERS', payload: { priceRange: next } });
  }, [state.filters.priceRange, dispatch]);

  const clearAllFilters = useCallback(() => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        categories: [],
        brands: [],
        grades: [],
        processors: [],
        ramSizes: [],
        storageTypes: [],
        priceRange: [PRICE_MIN, PRICE_MAX],
        minRating: 0,
        batteryHealth: 0,
        inStockOnly: false,
        sortBy: 'featured',
      }
    });
  }, [dispatch]);

  const activeCount =
    (state.filters.brands?.length ?? 0) +
    (state.filters.grades?.length ?? 0) +
    (state.filters.categories?.length ?? 0) +
    (state.filters.processors?.length ?? 0) +
    (state.filters.ramSizes?.length ?? 0) +
    (state.filters.storageTypes?.length ?? 0) +
    (state.filters.minRating > 0 ? 1 : 0) +
    (state.filters.batteryHealth > 0 ? 1 : 0) +
    (state.filters.inStockOnly ? 1 : 0) +
    (state.filters.priceRange[0] > PRICE_MIN || state.filters.priceRange[1] < PRICE_MAX ? 1 : 0);

  const fmt = v => `₹${Number(v).toLocaleString('en-IN')}`;

  return (
    <aside style={{
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #f0f0f0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      padding: 20,
      position: 'sticky',
      top: 96,
      height: 'fit-content',
    }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter style={{ width: 16, height: 16, color: '#059669' }} aria-hidden="true" />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Filters</span>
          {activeCount > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: '50%',
              background: '#059669', color: '#fff',
              fontSize: 11, fontWeight: 700,
            }}>
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAllFilters}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 12, color: '#6b7280', fontWeight: 500,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
            aria-label="Clear all filters"
          >
            <X style={{ width: 12, height: 12 }} />
            Clear all
          </button>
        )}
      </div>

      {/* ── Filter Sections ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* Category */}
        <FilterSection title="Category" section="categories" expanded={expandedSections.categories} onToggle={toggleSection}>
          {categories.length === 0
            ? <EmptyState message="No categories available" />
            : categories.map(c => (
              <CheckboxItem
                key={c} label={c}
                checked={state.filters.categories?.includes(c) ?? false}
                onChange={() => handleFilterChange('categories', c, true)}
              />
            ))}
        </FilterSection>

        {/* Brand */}
        <FilterSection title="Brand" section="brands" expanded={expandedSections.brands} onToggle={toggleSection}>
          {brands.length === 0
            ? <EmptyState message="No brands available" />
            : brands.map(b => (
              <CheckboxItem
                key={b} label={b}
                checked={state.filters.brands?.includes(b) ?? false}
                onChange={() => handleFilterChange('brands', b, true)}
              />
            ))}
        </FilterSection>

        {/* Condition */}
        <FilterSection title="Condition" section="grades" expanded={expandedSections.grades} onToggle={toggleSection}>
          {grades.length === 0
            ? <EmptyState message="No grades available" />
            : grades.map(g => (
              <CheckboxItem
                key={g} label={g}
                checked={state.filters.grades?.includes(g) ?? false}
                onChange={() => handleFilterChange('grades', g, true)}
              />
            ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price range" section="price" expanded={expandedSections.price} onToggle={toggleSection}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Min (₹)</label>
              <input
                type="number"
                value={state.filters.priceRange[0]}
                onChange={e => handlePriceChange(0, e.target.value)}
                min={PRICE_MIN} max={PRICE_MAX} step={500}
                style={{
                  width: '100%', padding: '6px 10px', border: '1px solid #e5e7eb',
                  borderRadius: 8, fontSize: 13, boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
            <span style={{ color: '#d1d5db', paddingBottom: 8, flexShrink: 0 }}>—</span>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Max (₹)</label>
              <input
                type="number"
                value={state.filters.priceRange[1]}
                onChange={e => handlePriceChange(1, e.target.value)}
                min={PRICE_MIN} max={PRICE_MAX} step={500}
                style={{
                  width: '100%', padding: '6px 10px', border: '1px solid #e5e7eb',
                  borderRadius: 8, fontSize: 13, boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', margin: '8px 0 0' }}>
            {fmt(state.filters.priceRange[0])} – {fmt(state.filters.priceRange[1])}
          </p>
        </FilterSection>

        {/* Specifications */}
        <FilterSection title="Specifications" section="specs" expanded={expandedSections.specs} onToggle={toggleSection}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <SectionSubLabel>Processor</SectionSubLabel>
              {processors.length === 0 ? <EmptyState message="No processors available" /> : (
                <div style={{ maxHeight: 140, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {processors.map(p => (
                    <CheckboxItem key={p} label={p}
                      checked={state.filters.processors?.includes(p) ?? false}
                      onChange={() => handleFilterChange('processors', p, true)} />
                  ))}
                </div>
              )}
            </div>
            <div>
              <SectionSubLabel>RAM</SectionSubLabel>
              {ramSizes.length === 0 ? <EmptyState message="No RAM options" /> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {ramSizes.map(r => (
                    <CheckboxItem key={r} label={r}
                      checked={state.filters.ramSizes?.includes(r) ?? false}
                      onChange={() => handleFilterChange('ramSizes', r, true)} />
                  ))}
                </div>
              )}
            </div>
            <div>
              <SectionSubLabel>Storage</SectionSubLabel>
              {storageTypes.length === 0 ? <EmptyState message="No storage options" /> : (
                <div style={{ maxHeight: 140, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {storageTypes.map(s => (
                    <CheckboxItem key={s} label={s}
                      checked={state.filters.storageTypes?.includes(s) ?? false}
                      onChange={() => handleFilterChange('storageTypes', s, true)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Minimum rating" section="rating" expanded={expandedSections.rating} onToggle={toggleSection}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="radio" name="rating"
                  checked={state.filters.minRating === rating}
                  onChange={() => handleFilterChange('minRating', rating)}
                  style={{ width: 16, height: 16, flexShrink: 0, accentColor: '#059669', cursor: 'pointer' }}
                />
                <span style={{ fontSize: 14, color: '#374151' }}>{rating}★ & above</span>
              </label>
            ))}
            {state.filters.minRating > 0 && (
              <button
                onClick={() => handleFilterChange('minRating', 0)}
                style={{ fontSize: 12, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '2px 0', marginTop: 2 }}
                onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                Clear rating
              </button>
            )}
          </div>
        </FilterSection>

        {/* Battery Health */}
        <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Battery health</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#059669' }}>
              {state.filters.batteryHealth > 0 ? `${state.filters.batteryHealth}%+` : 'Any'}
            </span>
          </div>
          <input
            type="range" min="0" max="100" step="10"
            value={state.filters.batteryHealth}
            onChange={e => handleFilterChange('batteryHealth', Number(e.target.value))}
            style={{ width: '100%', accentColor: '#059669', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
            <span>Any</span><span>100%</span>
          </div>
        </div>

        {/* In Stock */}
        <div style={{ paddingTop: 4, paddingBottom: 4 }}>
          <CheckboxItem
            label="In stock only"
            checked={state.filters.inStockOnly ?? false}
            onChange={e => handleFilterChange('inStockOnly', e.target.checked)}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;