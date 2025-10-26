import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import type { Product } from "@/types";
import { VirtualScrollingList } from "@/components/VirtualScrollingList";

// Mock ProductCard and ProductListItem (use absolute alias to match imports)
vi.mock("@/components/ProductCard", () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));
vi.mock("@/components/ProductListItem", () => ({
  ProductListItem: ({ product }: { product: Product }) => (
    <div data-testid="product-list-item">{product.name}</div>
  ),
}));

const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  name: `Product ${i}`,
  description: `Description ${i}`,
  category: "Category",
  price: i * 10,
  stock: i,
}));

describe("VirtualScrollingList", () => {
  it("renders initial visible items in list view", () => {
    const { getAllByTestId } = render(
      <VirtualScrollingList
        products={products}
        viewMode="list"
        itemHeight={50}
        containerHeight={150} // shows 3 items + 1 buffer = 4
      />
    );

    const items = getAllByTestId("product-list-item");
    expect(items.length).toBe(4);
    expect(items[0]).toHaveTextContent("Product 0");
    expect(items[3]).toHaveTextContent("Product 3");
  });

  it("renders initial visible items in grid view", () => {
    const { getAllByTestId } = render(
      <VirtualScrollingList
        products={products}
        viewMode="grid"
        itemHeight={60}
        containerHeight={180} // shows 3 items + 1 buffer = 4
      />
    );

    const items = getAllByTestId("product-card");
    expect(items.length).toBe(4);
    expect(items[0]).toHaveTextContent("Product 0");
    expect(items[3]).toHaveTextContent("Product 3");
  });

  it("updates visible items on scroll", () => {
    const { queryByRole, getAllByTestId } = render(
      <VirtualScrollingList
        products={products}
        viewMode="list"
        itemHeight={50}
        containerHeight={150} // shows 4 items
      />
    );

    const container =
      (queryByRole("list") as Element | null) ||
      (queryByRole("presentation") as Element | null) ||
      document.querySelector("div.overflow-auto");

    if (!container) throw new Error("Could not find scroll container");

    // Fire scroll event
    fireEvent.scroll(container, { target: { scrollTop: 100 } });

    // After scrollTop = 100, visibleStart = 2, visibleEnd = 6
    const items = getAllByTestId("product-list-item");
    expect(items[0]).toHaveTextContent("Product 2");
    expect(items[items.length - 1]).toHaveTextContent("Product 5");
  });

  it("renders all products if containerHeight is large enough", () => {
    const { getAllByTestId } = render(
      <VirtualScrollingList
        products={products}
        viewMode="list"
        itemHeight={50}
        containerHeight={2000} // large enough to show all
      />
    );

    const items = getAllByTestId("product-list-item");
    expect(items.length).toBe(products.length);
  });
});
