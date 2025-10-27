"use client";

import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { LazyImage } from "@/components/ui/LazyImage";
import { CheckoutModal } from "@/components/CheckOutModal";

// Define your tier discount system
// Example: spend thresholds = discount %
const DISCOUNT_TIERS = [
  { threshold: 100, discount: 5 },
  { threshold: 200, discount: 10 },
  { threshold: 400, discount: 15 },
];

export default function CheckoutCart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const tier = DISCOUNT_TIERS.filter((t) => subtotal >= t.threshold).pop();
    const discountRate = tier ? tier.discount : 0;
    const discount = (subtotal * discountRate) / 100;
    const total = subtotal - discount;

    return { subtotal, discount, total };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">

        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-2" />
        <h2 className="text-xl font-semibold mb-1">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Add some products to get started!
        </p>
        <Link href="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Store</span>
        </Link>
      </div>
    );
  }
  

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Checkout Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <LazyImage
                  src={`https://picsum.photos/40?random=${item.id}`}
                  alt={item.title}
                  title={item.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />

                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.quantity ?? 1}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      min={1}
                      className="w-16 text-center"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="font-bold text-right">
                {formatPrice(item.price * (item.quantity || 1))}
              </p>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="p-4 h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className={discount > 0 ? "text-green-600" : "text-muted-foreground"}>
                {discount > 0
                  ? `-${formatPrice(discount)} (${((discount / subtotal) * 100).toFixed(0)}%)`
                  : formatPrice(0)}
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
      {checkoutOpen && 
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          subtotal={subtotal}
          discount={discount}
          total={total}
          onConfirm={() => {
            setCheckoutOpen(false);
            toast.success("Checkout successful!");
            clearCart();
          }}
        />}
    </div>
  );
}
