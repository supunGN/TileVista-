export const formatLKR = (num: number) => {
  return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
};

export const getBrand = (product: { name: string; brand?: string | null }) => {
  if (product.brand) {
    return product.brand;
  }
  
  // Fallback to name guessing if brand field is missing (backward compatibility)
  const lower = product.name.toLowerCase();
  if (lower.startsWith('rocell')) return 'Rocell';
  if (lower.startsWith('lanka')) return 'Lanka Tiles';
  return 'Showroom Import';
};

export const getFallbackImage = (category: string) => {
  return '/images/placeholder.png';
};
