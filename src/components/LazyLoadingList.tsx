"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";

interface LazyLoadingListProps {
  products: Product[];
  viewMode: "list" | "grid";
  itemsPerPage?: number;
  containerHeight?: number; // 👈 new
}

export function LazyLoadingList({
  products,
  viewMode,
  itemsPerPage = 20,
  containerHeight = 600, // 👈 default same as AdvancedVirtualList
}: LazyLoadingListProps) {
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🧠 Load initial page
  useEffect(() => {
    const initialProducts = products.slice(0, itemsPerPage);
    setLoadedProducts(initialProducts);
    setCurrentPage(1);
    setHasMore(products.length > itemsPerPage);
  }, [products, itemsPerPage]);

  // ⚡ Load more products
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newProducts = products.slice(startIndex, endIndex);

      setLoadedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < products.length);
      setIsLoading(false);
    }, 500);
  }, [currentPage, itemsPerPage, products, isLoading, hasMore]);

  // 👁️ Intersection observer on the scroll container
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        root: container, // 👈 use the fixed container as scroll root
        threshold: 0.1,
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  const renderProducts = () => {
    if (viewMode === "list") {
      return (
        <div className="space-y-4">
          {loadedProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      );
    }

    return (
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
        }}
      >
        {loadedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="overflow-auto shadow-sm bg-background"
      style={{ height: containerHeight }} // 👈 fixed-height scrollable area
    >
      {renderProducts()}

      {isLoading && (
        <div className="flex justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span>Loading more products...</span>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center py-4">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}

      {!hasMore && loadedProducts.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You've reached the end of the product list</p>
          <p className="text-sm">
            Showing {loadedProducts.length} of {products.length} products
          </p>
        </div>
      )}

      {/* 👇 sentinel for observer */}
      <div ref={observerRef} className="h-4" />
    </div>
  );
}



