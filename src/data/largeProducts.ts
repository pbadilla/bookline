import { Product } from '@/types';

// Create a larger dataset used by the product pages for demo/perf
export const largeProductDataset: Product[] = Array.from({ length: 50 }).map((_, i) => ({
  id: String(100 + i),
  title: `Sample Book ${i + 1}`,
  description: `This is a description for sample book ${i + 1}.`,
  price: Math.round((10 + Math.random() * 90) * 100) / 100,
  image: `/images/sample-${(i % 10) + 1}.jpg`,
  category: i % 2 === 0 ? 'Fiction' : 'Non-Fiction',
  stock: Math.floor(Math.random() * 50) + 1,
}));

export const getLargeProductById = (id: string) => largeProductDataset.find(p => p.id === id) || null;
