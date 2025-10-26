// services/productService.ts
import { MOCK_PRODUCTS } from '@/mocks/products';

import { Product } from '@/types';

const USE_MOCK = true; // toggle to false to use real API later

export const getProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS);
      }, 500); // simulate network delay
    });
  }

  // Example for real API later
  // const response = await fetch('/api/products');
  // return response.json();
  return [];  // temporary return for non-mock case
};
