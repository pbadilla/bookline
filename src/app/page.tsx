"use client";

import { VirtualProductList } from "@/components/VirtualProductList";
import { generateMockProducts } from "@/mocks/products";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(generateMockProducts(200));
  }, []);

  if (!products.length) return <div>Loading products...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Bookline</h1>
      <p className="text-lg text-muted-foreground mb-4">
        Discover your next favorite book in our extensive collection.
      </p>
      <VirtualProductList products={products} />
    </div>
  );
}
