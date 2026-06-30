import { UnifiedItem, Category } from '../types';
import { API_BASE } from '../constants';

export const fetchProducts = async (): Promise<UnifiedItem[]> => {
  const response = await fetch(`${API_BASE}/items`);
  if (!response.ok) {
    throw new Error(`Failed to load showroom inventory (${response.status})`);
  }
  return response.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE}/categories`);
  if (!response.ok) {
    throw new Error(`Failed to load categories (${response.status})`);
  }
  return response.json();
};

export const fetchProductDetails = async (id: number): Promise<UnifiedItem> => {
  const response = await fetch(`${API_BASE}/items/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to load product details (${response.status})`);
  }
  return response.json();
};
