// app/api/products/route.ts
import { NextResponse } from 'next/server';

import { MOCK_PRODUCTS } from '@/mocks/products';

// GET /api/products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');

  let filtered = [...MOCK_PRODUCTS];

  // Filter by category
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      (p.description && p.description.toLowerCase().includes(searchLower))
    );
  }

  // Limit results
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json({
    products: filtered,
    total: filtered.length
  });
}

// GET /api/products/[id]
// Create this in: app/api/products/[id]/route.ts
export async function GETById(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}