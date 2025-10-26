import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import type { Product } from "@/types";
import { ProductListItem } from "@/components/ProductListItem";

// Mock useCart
const addItemMock = vi.fn();
vi.mock("@/contexts/CartContext", () => ({
  useCart: () => ({ addItem: addItemMock }),
}));

// Mock Button and Card components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}));

// Mock formatPrice
vi.mock("@/lib/utils", () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
}));

// Mock next/link to render plain anchor
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("ProductListItem", () => {
  const product: Product = {
    id: "1",
    name: "Test Product",
    description: "A description",
    price: 19.99,
    stock: 5,
    category: "Books",
  };

  beforeEach(() => {
    addItemMock.mockClear();
  });

  it("renders product information correctly", () => {
    const { getByText } = render(<ProductListItem product={product} />);

    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("A description")).toBeTruthy();
    expect(getByText("$19.99")).toBeTruthy();
    expect(getByText("Stock:")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
    expect(getByText("Books")).toBeTruthy();
  });

  it("renders View link with correct href", () => {
    const { getByText } = render(<ProductListItem product={product} />);
    const viewButton = getByText("View").closest("a");
    expect(viewButton).toBeTruthy();
    expect(viewButton).toHaveAttribute("href", "/products/1");
  });

  it("calls addItem when clicking Add to Cart button", () => {
    const { getByText } = render(<ProductListItem product={product} />);
    const addButton = getByText("Add to Cart");

    fireEvent.click(addButton);

    expect(addItemMock).toHaveBeenCalledOnce();
    expect(addItemMock).toHaveBeenCalledWith(product);
  });
});
