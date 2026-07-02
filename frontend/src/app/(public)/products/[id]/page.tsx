'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ProductDetails, ProductList } from '@/features/products';

export default function ProductOrCategoryPage() {
  const params = useParams();
  const slug = params?.id as string;
  
  const isNumeric = /^\d+$/.test(slug);

  if (isNumeric) {
    return <ProductDetails id={Number(slug)} />;
  }

  // Otherwise, it's a category slug
  return <ProductList categorySlug={slug} />;
}
