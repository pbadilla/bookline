"use client";

import React from "react";

import Image from 'next/image';

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { LazyImage } from "./ui/LazyImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.name,
      price: product.price,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
      <LazyImage
        src={`https://picsum.photos/400?random=${product.id}`}
        alt={product.name}
        title={product.name}
        className="object-cover w-full h-full transition-transform group-hover:scale-105"
      />
        {product.category && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {product.category}
            </span>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-1" title={product.name}>
          {product.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10" title={product.description}>
          {product.description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-muted-foreground">
            Stock:
            <span className="text-gray font-bold italic ml-1">
              {product.stock}
            </span>
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
