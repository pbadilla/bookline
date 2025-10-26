"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category: string;
  stock: number;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  image_url,
  category,
  stock,
}: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    addItem({ id: Number(id), price, image_url, title: name });
    toast.success("Added to cart");
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {category}
            </span>
          </div>
          {stock <= 5 && stock > 0 && (
            <div className="absolute bottom-2 left-2">
              <span className="inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground backdrop-blur">
                Only {stock} left
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2 h-10">
            {description}
          </p>
        )}
        <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={stock <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <ProductCard
              key={item.id?.toString() ?? ""}
              id={item.id?.toString() ?? ""}
              name={item.name ?? ""}
              price={item.price ?? 0}
              image_url={item.image_url ?? ""}
              category="Cart"
              stock={item.quantity ?? 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
