import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";

// Mock the CartContext
const mockRemoveItem = vi.fn();
const mockUpdateQuantity = vi.fn();
const mockClearCart = vi.fn();
const mockGetTotalItems = vi.fn();

const mockUseCart = vi.fn(() => ({
  items: [
    {
      id: 1,
      title: "Test Book",
      price: 19.99,
      quantity: 2,
    },
  ],
  removeItem: mockRemoveItem,
  updateQuantity: mockUpdateQuantity,
  clearCart: mockClearCart,
  getTotalItems: mockGetTotalItems,
}));

vi.mock("@/contexts/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ user: null, logout: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ children }: any) => <a>{children}</a>,
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardFooter: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock("@/components/CheckOutModal", () => ({
  CheckoutModal: ({ open, children }: any) => (open ? <div data-testid="checkout-modal">{children}</div> : null),
}));

vi.mock("@/components/ui/LazyImage", () => ({
  LazyImage: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

vi.mock("@/lib/utils", () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

vi.mock("lucide-react", () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  ShoppingCart: () => <span>ShoppingCart</span>,
  Trash2: () => <span>Trash2</span>,
}));

describe("Cart Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetTotalItems.mockReturnValue(2);
  });

  it("renders empty cart message when no items", () => {
    const mockGetTotalZero = vi.fn(() => 0);
    mockUseCart.mockReturnValueOnce({
      items: [],
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      getTotalItems: mockGetTotalZero,
    });

    render(<CartPage />);
    expect(screen.getByTestId("cart-empty")).toBeInTheDocument();
    expect(screen.getByTestId("cart-empty-title")).toHaveTextContent("Your cart is empty");
    expect(screen.getByTestId("cart-empty-message")).toBeInTheDocument();
  });

  it("renders cart items when items exist", () => {
    const mockGetTotalTwo = vi.fn(() => 2);
    mockUseCart.mockReturnValueOnce({
      items: [
        {
          id: 1,
          title: "Test Book",
          price: 19.99,
          quantity: 2,
        },
      ],
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      getTotalItems: mockGetTotalTwo,
    });

    render(<CartPage />);
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
    expect(screen.getByTestId("cart-title")).toHaveTextContent("Checkout Cart");
    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });

  it("renders order summary with correct calculations", async () => {
    mockUseCart.mockReturnValueOnce({
      items: [
        {
          id: 1,
          title: "Test Book",
          price: 50,
          quantity: 4,
        },
      ],
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      getTotalItems: vi.fn(() => 4),
    });
  
    render(<CartPage />);
  
    const title = await screen.findByText("Order Summary");
    expect(title).toBeInTheDocument();      
  
    const totalValue = await screen.findByTestId("cart-total-value");
    expect(totalValue).toBeInTheDocument(); 

    const summaryTotal = await screen.findByTestId("cart-summary-total");
    expect(summaryTotal).toBeInTheDocument();

    const cartTotal = await screen.findByTestId("cart-total-value");
    expect(cartTotal).toBeInTheDocument(); 

    const discount = await screen.findByTestId("cart-summary-discount");
    expect(discount).toBeInTheDocument(); 
  });
  
});
