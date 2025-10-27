import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminPage from "@/app/admin/page";

// Mock the services and dependencies
vi.mock("@/services/productService", () => {
    return {
      getProducts: vi.fn(() => Promise.resolve([])),
    };
  });
  

vi.mock("@/components/ProtectedRoute", () => ({
  ProtectedRoute: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("next/link", () => ({
  default: ({ children }: any) => <a>{children}</a>,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock("@/lib/utils", () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

vi.mock("lucide-react", () => ({
  Plus: () => <span>Plus</span>,
  Edit: () => <span>Edit</span>,
  Trash2: () => <span>Trash2</span>,
  ArrowLeft: () => <span>ArrowLeft</span>,
  Home: () => <span>Home</span>,
}));

describe("Admin Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the admin dashboard title and subtitle", async () => {
    render(<AdminPage />);
    expect(await screen.findByTestId("admin-dashboard-title")).toHaveTextContent("Admin Dashboard");
    expect(await screen.findByTestId("admin-dashboard-subtitle")).toHaveTextContent("Manage your products and orders");
  });

  it("renders dashboard stats cards", async () => {
    render(<AdminPage />);
    await waitFor(() => {
      expect(screen.getByTestId("admin-stats")).toBeInTheDocument();
    });
  });

  it("renders the Add Product button", async () => {
    render(<AdminPage />);
    expect(await screen.findByTestId("admin-add-product-button")).toBeInTheDocument();
  });

  it("renders the Products section heading", async () => {
    render(<AdminPage />);
    expect(await screen.findByTestId("admin-products-section-title")).toHaveTextContent("Products");
  });

  it("renders an empty products list initially", async () => {
    render(<AdminPage />);
    const productsList = await screen.findByTestId("admin-products-list");
    expect(productsList.children.length).toBe(0);
  });
});
