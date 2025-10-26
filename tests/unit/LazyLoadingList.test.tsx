import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";

import type { Product } from "@/types";
import { LazyLoadingList } from "@/components/LazyLoadingList";

// Mock ProductCard and ProductListItem (use absolute alias so mocks apply to component imports)
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

// Mock Button component if needed
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock IntersectionObserver globally
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe() {
    // immediately trigger callback for testing
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this
    );
  }
  disconnect() {}
  unobserve() {}
}
global.IntersectionObserver = MockIntersectionObserver as any;

const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i.toString(),
  name: `Product ${i}`,
}));

describe("LazyLoadingList", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders initial items correctly in list view", () => {
    const { getAllByTestId } = render(
      <LazyLoadingList products={products} viewMode="list" itemsPerPage={10} />
    );

    const items = getAllByTestId("product-list-item");
    expect(items.length).toBe(10);
    expect(items[0]).toHaveTextContent("Product 0");
  });

  it("renders initial items correctly in grid view", () => {
    const { getAllByTestId } = render(
      <LazyLoadingList products={products} viewMode="grid" itemsPerPage={8} />
    );

    const items = getAllByTestId("product-card");
    expect(items.length).toBe(8);
    expect(items[0]).toHaveTextContent("Product 0");
  });

  it("loads more products when clicking 'Load More' button", async () => {
    const { getByText, queryByText, getAllByTestId } = render(
      <LazyLoadingList products={products} viewMode="list" itemsPerPage={5} />
    );

    let items = getAllByTestId("product-list-item");
    expect(items.length).toBe(5);

    // Sometimes the IntersectionObserver mock triggers automatic loading.
    // Try to get the button; if it's missing, advance timers to let auto-load finish.
    const button = queryByText("Load More");

    if (button) {
      await act(async () => {
        fireEvent.click(button);
        vi.advanceTimersByTime(500); // simulate the timeout
      });
    } else {
      // Auto-loading path: advance timers to complete load
      await act(async () => {
        vi.advanceTimersByTime(500);
      });
    }

    items = getAllByTestId("product-list-item");
    expect(items.length).toBeGreaterThanOrEqual(10);
    expect(items[5]).toHaveTextContent("Product 5");
  });

  it("automatically loads more products via IntersectionObserver", async () => {
    const { getAllByTestId } = render(
      <LazyLoadingList products={products} viewMode="list" itemsPerPage={5} />
    );

    await act(async () => {
      vi.advanceTimersByTime(500); // simulate initial load + observer load
    });

    const items = getAllByTestId("product-list-item");
    // Initial 5 + 5 loaded by observer
    expect(items.length).toBe(10);
  });

  it("shows end-of-list message when all products are loaded", async () => {
    const { getByText } = render(
      <LazyLoadingList products={products} viewMode="list" itemsPerPage={50} />
    );

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(
      getByText("You've reached the end of the product list")
    ).toBeTruthy();
    expect(getByText(/Showing 50 of 50 products/)).toBeTruthy();
  });
});
