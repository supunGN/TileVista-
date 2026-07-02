import { useState, useEffect, useCallback } from 'react';
import { UnifiedItem } from '../types';
import { fetchProductDetails, fetchProducts } from '../api/products.api';

export const useProduct = (id: number | null) => {
  const [product, setProduct] = useState<UnifiedItem | null>(null);
  const [allProducts, setAllProducts] = useState<UnifiedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [productData, allData] = await Promise.all([
        fetchProductDetails(id),
        fetchProducts().catch(() => [] as UnifiedItem[]), // Fallback
      ]);
      setProduct(productData);
      setAllProducts(allData);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching product details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const relatedItems = allProducts
    .filter(
      (item) =>
        item.isEnabled &&
        product &&
        item.category === product.category &&
        item.itemId !== product.itemId
    )
    .slice(0, 3);

  return { product, relatedItems, loading, error, reload: loadData };
};
