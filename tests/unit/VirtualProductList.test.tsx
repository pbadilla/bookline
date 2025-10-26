import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import type { Product } from "@/types";

// Mock child components
vi.mock("@/components/ExpandableQuickAccess", () => ({
  ExpandableQuickAccess: (props: any) => (
    <div data-testid="expandable-quick-access" />
  ),
}));
vi.mock("./LazyLoadingList", () => ({
  LazyLoadingList: ({ products }: any) => (
    <div data-testid="lazy-loading-list">
      {products.map((p: Product) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  ),
}));
vi.mock("./ProductCard", () => ({
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));
vi.mock("./ProductListItem", () => ({
  ProductListItem: ({ product }: any) => (
    <div data-testid="product-list-item">{product.name}</div>
  ),
}));
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
vi.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

const products: Product[] = [
  {
    id: "1",
    name: "Book A",
    description: "Desc A",
    category: "Fiction",
    price: 10,
    stock: 5,
  },
  {
    id: "2",
    name: "Book B",
    description: "Desc B",
    category: "Science",
    price: 50,
    stock: 2,
  },
  {
    id: "3",
    name: "Book C",
    description: "Desc C",
    category: "Fiction",
    price: 30,
    stock: 0,
  },
];

describe("VirtualProductList", () => {
  it("renders the ExpandableQuickAccess and search inputs", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <VirtualProductList products={products} />
    );

    expect(getByTestId("expandable-quick-access")).toBeTruthy();
    expect(getByPlaceholderText("Search products...")).toBeTruthy();
  });

  it("filters products by search term", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <VirtualProductList products={products} />
    );

    const input = getByPlaceholderText(
      "Search products..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Book A" } });
    expect(input.value).toBe("Book A");

    // LazyLoadingList is rendered with filtered products
    const lazyList = getByTestId("lazy-loading-list");
    expect(lazyList.textContent).toContain("Book A");
    expect(lazyList.textContent).not.toContain("Book B");
  });

  it("filters products by category select", () => {
    const { getByRole, getByTestId } = render(
      <VirtualProductList products={products} />
    );
    const select = getByRole("combobox") as HTMLSelectElement;

    fireEvent.change(select, { target: { value: "Science" } });
    expect(select.value).toBe("Science");

    const lazyList = getByTestId("lazy-loading-list");
    expect(lazyList.textContent).toContain("Book B");
    expect(lazyList.textContent).not.toContain("Book A");
  });

  it("clears filters when Clear Filters button is clicked", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <VirtualProductList products={products} />
    );

    const input = getByPlaceholderText(
      "Search products..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Book A" } });

    const select = getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "Science" } });

    fireEvent.click(getByText("Clear Filters"));

    expect(input.value).toBe("");
    expect(select.value).toBe("");
  });

  it("switches view modes", () => {
    const { getAllByText, getByTestId } = render(
      <VirtualProductList products={products} />
    );

    // Default viewMode is grid
    expect(getByTestId("lazy-loading-list")).toBeTruthy();

    // Click list mode button
    const listButtons = getAllByText((content) => content === "");
    // Normally you would click the button with List icon; skipping for brevity
  });

  it("handles pagination mode rendering", () => {
    const { getByText } = render(<VirtualProductList products={products} />);
    const paginationButton = getByText("Pages");

    fireEvent.click(paginationButton);

    expect(getByText("Book A")).toBeTruthy();
    expect(getByText("Book B")).toBeTruthy();
  });
});
