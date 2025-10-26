import { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    name: 'The Pragmatic Programmer',
    description: 'A classic book about software craftsmanship',
    price: 29.99,
    image: '/images/pragmatic.jpg',
    category: 'Programming',
    stock: 12,
  },
  {
    id: '2',
    title: 'Clean Code',
    name: 'Clean Code',
    description: 'A Handbook of Agile Software Craftsmanship',
    price: 24.99,
    image: '/images/clean-code.jpg',
    category: 'Programming',
    stock: 8,
  },
  {
    id: '3',
    title: 'You Don\'t Know JS',
    name: 'You Don\'t Know JS',
    description: 'Deep dive into JavaScript',
    price: 19.99,
    image: '/images/ydkjs.jpg',
    category: 'Programming',
    stock: 20,
  },
];

export const getProductById = (id: string) =>
  sampleProducts.find((p) => p.id === id) || null;
