import { useState, useMemo } from 'react';
import { UnifiedItem, Category } from '../types';

export const useProductFilters = (items: UnifiedItem[], categories: Category[]) => {
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'ALL'>('ALL');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | 'ALL'>('ALL');

  const enabledItems = useMemo(() => items.filter((item) => item.isEnabled), [items]);

  const filteredProducts = useMemo(() => {
    return enabledItems.filter((p) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower));

      const matchesCategory = selectedCategoryId === 'ALL' ? true : p.categoryId === selectedCategoryId;
      const matchesSubcategory = selectedSubcategoryId === 'ALL' ? true : p.subcategoryId === selectedSubcategoryId;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [enabledItems, search, selectedCategoryId, selectedSubcategoryId]);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const resetSubcategory = () => setSelectedSubcategoryId('ALL');

  return {
    search,
    setSearch,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSubcategoryId,
    setSelectedSubcategoryId,
    filteredProducts,
    activeCategory,
    resetSubcategory,
  };
};
