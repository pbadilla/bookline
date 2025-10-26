import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import type { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

// Mock useCart
const addItemMock = vi.fn();
vi.mock("@/contexts/CartContext", () => ({
  useCart: () => ({ addItem: addItemMock }),
}));

// Mock Button and Card components if needed
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h2>{children}</h2>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardFooter: ({ children }: any) => <div>{children}</div>,
}));

// Mock formatPrice
vi.mock("@/lib/utils", () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
}));

describe("ProductCard", () => {
  const product: Product = {
    id: "1",
    name: "Test Product",
    description: "A description",
    price: 19.99,
    stock: 5,
  };

  beforeEach(() => {
    addItemMock.mockClear();
  });

  it("renders product information correctly", () => {
    const { getByText } = render(<ProductCard product={product} />);

    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("A description")).toBeTruthy();
    expect(getByText("$19.99")).toBeTruthy();
    expect(getByText("Stock:")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  it("calls addItem when clicking Add to Cart button", () => {
    const { getByText } = render(<ProductCard product={product} />);
    const button = getByText("Add to Cart");

    fireEvent.click(button);

    expect(addItemMock).toHaveBeenCalledOnce();
    expect(addItemMock).toHaveBeenCalledWith(product);
  });
});
