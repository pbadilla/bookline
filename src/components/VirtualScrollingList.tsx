"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";

import { Product } from "@/types";

import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";

interface VirtualScrollingListProps {
  products: Product[];
  viewMode: "list" | "grid";
  itemHeight: number;
  containerHeight: number;
}

export function VirtualScrollingList({
  products,
  viewMode,
  itemHeight,
  containerHeight,
}: VirtualScrollingListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    products.length
  );

  const visibleProducts = products.slice(visibleStart, visibleEnd);

  const totalHeight = products.length * itemHeight;

  const offsetY = visibleStart * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {viewMode === "list" ? (
            <div className="space-y-4">
              {visibleProducts.map((product, index) => (
                <div key={product.id} style={{ height: itemHeight }}>
                  <ProductListItem product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((product, index) => (
                <div key={product.id} style={{ height: itemHeight }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
