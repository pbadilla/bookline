"use client";

import React from "react";

import { Product } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ShoppingCart, Eye } from "lucide-react";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Ensure all required fields are present and types are correct
    if (
      product &&
      product.id &&
      typeof product.name === "string" &&
      typeof product.price === "number" &&
      typeof product.title === "string"
    ) {
      // Omit quantity for addItem, ensure title is string
      addItem({
        ...product,
        title: product.title,
      });
    } else {
      // You might want to handle error here
      console.error("Product data is incomplete or invalid for adding to cart.");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="px-3 py-2">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-muted flex items-center justify-center rounded-lg flex-shrink-0">
            <div className="text-2xl">📚</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="bg-secondary px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                  <span>
                    Stock:
                    <span className="text-gray font-bold italic">
                      {product.stock}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3 ml-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Button size="sm" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



