import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CheckoutModal } from "@/components/CheckOutModal";

// Mock formatPrice
vi.mock("@/lib/utils", () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("CheckoutModal", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    subtotal: 100,
    discount: 10,
    total: 90,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal when open is true", () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByTestId("checkout-modal")).toBeInTheDocument();
    expect(screen.getByTestId("checkout-modal-title")).toHaveTextContent("Confirm Checkout");
    expect(screen.getByTestId("checkout-modal-description")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<CheckoutModal {...defaultProps} open={false} />);
    expect(screen.queryByTestId("checkout-modal")).not.toBeInTheDocument();
  });

  it("displays correct pricing information", () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByTestId("checkout-subtotal-value")).toHaveTextContent("$100.00");
    expect(screen.getByTestId("checkout-discount-value")).toHaveTextContent("-$10.00 (10%)");
    expect(screen.getByTestId("checkout-total-value")).toHaveTextContent("$90.00");
  });

  it("displays discount as $0.00 when no discount", () => {
    render(<CheckoutModal {...defaultProps} discount={0} total={100} />);
    expect(screen.getByTestId("checkout-discount-value")).toHaveTextContent("$0.00");
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(<CheckoutModal {...defaultProps} />);
    const cancelButton = screen.getByTestId("checkout-modal-cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("calls onConfirm when Confirm Checkout button is clicked", () => {
    render(<CheckoutModal {...defaultProps} />);
    const confirmButton = screen.getByTestId("checkout-modal-confirm");
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });
});
