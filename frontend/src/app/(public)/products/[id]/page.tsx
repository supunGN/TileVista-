'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ProductDetails } from '@/features/products';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  
  return <ProductDetails id={id} />;
}
