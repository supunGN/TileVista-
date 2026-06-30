import { useState, useEffect, useCallback } from 'react';
import { UnifiedItem, Category } from '../types';
import { fetchProducts, fetchCategories } from '../api/products.api';

export const useProducts = () => {
  const [items, setItems] = useState<UnifiedItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [itemsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories().catch(() => [] as Category[]), // Failing categories shouldn't break items
      ]);
      setItems(itemsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the catalog.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { items, categories, loading, error, reload: loadData };
};
