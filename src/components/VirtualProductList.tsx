"use client";

import React, { useState, useMemo } from "react";

import { Product } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, X, List, Grid3X3, Zap, ChevronsRight } from "lucide-react";

import { LazyLoadingList } from "./LazyLoadingList";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";
import { ExpandableQuickAccess } from "@/components/ExpandableQuickAccess";

interface VirtualProductListProps {
  products: Product[];
}

export function VirtualProductList({ products }: VirtualProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [renderingMode, setRenderingMode] = useState<"lazy" | "pagination">(
    "lazy"
  );
  const [showFeatured, setShowFeatured] = useState(true);
  const itemsPerPage = 20;

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  const featuredProducts = useMemo(() => {
    return products.slice(0, 6);
  }, [products]);

  const hasActiveFilters =
    searchTerm ||
    selectedCategory ||
    priceRange.min > 0 ||
    priceRange.max < 1000;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
  };

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleQuickCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleQuickPrice = (min: number, max: number) => {
    setPriceRange({ min, max });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <ExpandableQuickAccess
        onSearch={handleQuickSearch}
        onCategoryFilter={handleQuickCategory}
        onPriceFilter={handleQuickPrice}
        onViewModeChange={setViewMode}
        onRenderingModeChange={setRenderingMode}
        currentViewMode={viewMode}
        currentRenderingMode={renderingMode}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                min: Number(e.target.value),
              }))
            }
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
          />
        </div>

        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex items-center space-x-2"
        >
          <X className="h-4 w-4" />
          <span>Clear Filters</span>
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
          {/* Left side: Title & subtitle */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {hasActiveFilters ? "Search Results" : "All Products"}
              {renderingMode === "pagination" && (
                <span>{` | Page ${currentPage} of ${totalPages}`}</span>
              )}
            </h2>
            <p className="text-muted-foreground">
              {hasActiveFilters
                ? `Found ${filteredProducts.length} products matching your criteria`
                : `Browse our complete collection of ${products.length} books`}
            </p>
          </div>

          {!showFeatured && !hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFeatured(true)}
            >
              Show Featured
            </Button>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-1 md:space-y-0">
              <span className="text-sm text-muted-foreground">Mode:</span>
              <div className="flex border rounded-md">
                <Button
                  variant={renderingMode === "lazy" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setRenderingMode("lazy")}
                  className="rounded-r-none flex items-center gap-1"
                >
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">Lazy</span>
                </Button>

                <Button
                  variant={renderingMode === "pagination" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setRenderingMode("pagination")}
                  className="rounded-l-none flex items-center gap-1"
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="text-xs">Pages</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-1 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-l-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderingMode === "lazy" && (
        <LazyLoadingList
          products={filteredProducts}
          viewMode={viewMode}
          itemsPerPage={itemsPerPage}
        />
      )}

      {renderingMode === "pagination" &&
        (viewMode === "list" ? (
          <div className="space-y-4">
            {currentProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}

      {renderingMode === "pagination" && totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = Math.max(1, currentPage - 2) + i;
            if (page > totalPages) return null;

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className="w-10"
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
