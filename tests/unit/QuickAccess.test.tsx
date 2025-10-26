import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { QuickAccess } from "@/components/QuickAccess";

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

describe("QuickAccess", () => {
  let onCategoryFilter: ReturnType<typeof vi.fn>;
  let onPriceFilter: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onCategoryFilter = vi.fn();
    onPriceFilter = vi.fn();
  });

  it("renders categories and price ranges", () => {
    const { getByText } = render(
      <QuickAccess
        onCategoryFilter={onCategoryFilter}
        onPriceFilter={onPriceFilter}
      />
    );

    // Categories
    expect(getByText("Categories")).toBeTruthy();
    expect(getByText("Fiction")).toBeTruthy();
    expect(getByText("Technology")).toBeTruthy();

    // Price ranges
    expect(getByText("Price Ranges")).toBeTruthy();
    expect(getByText("Under 20€")).toBeTruthy();
    expect(getByText("50€ - 100€")).toBeTruthy();
  });

  it("calls onCategoryFilter when a category is clicked", () => {
    const { getByText } = render(
      <QuickAccess
        onCategoryFilter={onCategoryFilter}
        onPriceFilter={onPriceFilter}
      />
    );

    const categoryButton = getByText("Science");
    fireEvent.click(categoryButton);

    expect(onCategoryFilter).toHaveBeenCalledOnce();
    expect(onCategoryFilter).toHaveBeenCalledWith("Science");
  });

  it("calls onPriceFilter when a price range is clicked", () => {
    const { getByText } = render(
      <QuickAccess
        onCategoryFilter={onCategoryFilter}
        onPriceFilter={onPriceFilter}
      />
    );

    const priceButton = getByText("20€ - 50€");
    fireEvent.click(priceButton);

    expect(onPriceFilter).toHaveBeenCalledOnce();
    expect(onPriceFilter).toHaveBeenCalledWith(20, 50);
  });

  it("updates selected state when buttons are clicked", () => {
    const { getByText } = render(
      <QuickAccess
        onCategoryFilter={onCategoryFilter}
        onPriceFilter={onPriceFilter}
      />
    );

    const categoryButton = getByText("Business");
    const priceButton = getByText("Under 20€");

    // Before click, variant should be outline
    expect(categoryButton).toHaveAttribute("variant", "outline");
    expect(priceButton).toHaveAttribute("variant", "outline");

    fireEvent.click(categoryButton);
    fireEvent.click(priceButton);

    // After click, variant should be active
    expect(categoryButton).toHaveAttribute("variant", "active");
    expect(priceButton).toHaveAttribute("variant", "active");
  });
});
