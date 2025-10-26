import React from 'react'

import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'

import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'
import { largeProductDataset } from '@/data/largeProducts'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = largeProductDataset.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {}
          <div className="aspect-square bg-muted flex items-center justify-center rounded-lg">
            <div className="text-8xl">📚</div>
          </div>

          {}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  Stock: {product.stock}
                </span>
              </div>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold text-foreground">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}
              </div>

              <div className="flex space-x-4">
                <ProductCard product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
