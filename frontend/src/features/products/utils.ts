export const formatLKR = (num: number) => {
  return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
};

export const getBrand = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.startsWith('rocell')) return 'Rocell';
  if (lower.startsWith('lanka')) return 'Lanka Tiles';
  return 'Showroom Import';
};

export const getFallbackImage = (category: string) => {
  return '/images/placeholder.png';
};
