// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/mocks/products';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(params.id));
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}