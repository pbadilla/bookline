import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import type { Product } from "@/types";

import { AdvancedVirtualList } from "@/components/AdvancedVirtualList";

// Mock child components to simplify tests (use absolute paths to match imports)
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
}));

describe("AdvancedVirtualList", () => {
  beforeEach(() => {
    // reset container width for each test
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 1024,
    });
  });

  it("renders list view correctly", () => {
    const { getAllByTestId } = render(
      <AdvancedVirtualList
        products={products}
        viewMode="list"
        containerHeight={300}
      />
    );

    const listItems = getAllByTestId("product-list-item");
    // Because virtualization renders only visible items, expect fewer than total
    expect(listItems.length).toBeGreaterThan(0);
    expect(listItems[0]).toHaveTextContent("Product 0");
  });

  it("renders grid view correctly", () => {
    const { getAllByTestId } = render(
      <AdvancedVirtualList
        products={products}
        viewMode="grid"
        containerHeight={300}
      />
    );

    const gridItems = getAllByTestId("product-card");
    expect(gridItems.length).toBeGreaterThan(0);
    expect(gridItems[0]).toHaveTextContent("Product 0");
  });

  it("updates visible items on scroll", () => {
    const { getByRole, getAllByTestId } = render(
      <AdvancedVirtualList
        products={products}
        viewMode="list"
        containerHeight={120}
      />
    );

    const container =
      (document.querySelector("div.overflow-auto") as Element) ||
      document.body;

    // initial visible items
    let listItems = getAllByTestId("product-list-item");
    const firstVisible = listItems[0].textContent;

    // simulate scroll
    fireEvent.scroll(container, { target: { scrollTop: 200 } });

    // after scroll, visible items should update
    listItems = getAllByTestId("product-list-item");
    expect(listItems[0].textContent).not.toBe(firstVisible);
  });
});
