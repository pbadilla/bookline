"use client";

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";

import { Product } from "@/types";

import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";

interface AdvancedVirtualListProps {
  products: Product[];
  viewMode: "list" | "grid";
  containerHeight?: number;
}

export function AdvancedVirtualList({
  products,
  viewMode,
  containerHeight = 600,
}: AdvancedVirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const getGridColumns = useCallback(() => {
    if (viewMode === "list") return 1;
    if (containerWidth < 768) return 1;
    if (containerWidth < 1024) return 2;
    if (containerWidth < 1280) return 3;
    return 4;
  }, [containerWidth, viewMode]);

  const columns = getGridColumns();
  const rows = Math.ceil(products.length / columns);

  const itemHeight = viewMode === "list" ? 120 : 300;
  const itemWidth = viewMode === "list" ? "100%" : `${100 / columns}%`;
  const rowHeight = itemHeight + (viewMode === "list" ? 16 : 24);

  const visibleStart = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
  const visibleEnd = Math.min(
    rows,
    visibleStart + Math.ceil(containerHeight / rowHeight) + 2
  );

  const visibleProducts = useMemo(() => {
    const startIndex = visibleStart * columns;
    const endIndex = Math.min(
      startIndex + (visibleEnd - visibleStart) * columns,
      products.length
    );
    return products.slice(startIndex, endIndex);
  }, [products, visibleStart, visibleEnd, columns]);

  const totalHeight = rows * rowHeight;
  const offsetY = visibleStart * rowHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderItems = () => {
    if (viewMode === "list") {
      return (
        <div className="space-y-4">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              style={{
                height: itemHeight,
                width: itemWidth,
              }}
            >
              <ProductListItem product={product} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="flex" // optional if you want to center vertically
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
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
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
