// services/productService.ts
import { Product } from '@/types';

import { sampleProducts } from '@/data/products';

const USE_MOCK = true; // toggle to false to use real API later

export const getProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleProducts);
      }, 500); // simulate network delay
    });
  }

  // Example for real API later
  // const response = await fetch('/api/products');
  // return response.json();
  return [];  // temporary return for non-mock case
};
