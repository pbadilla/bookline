import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock contexts used by Header to keep test focused and light-weight
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ user: null, logout: () => {} }),
}));

vi.mock("@/contexts/CartContext", () => ({
  useCart: () => ({ getTotalItems: () => 0 }),
}));

import { Header } from "../../src/components/Header";

describe("Header", () => {
  it("renders the app title", () => {
    render(<Header />);
    expect(screen.getByText(/Bookline/i)).toBeInTheDocument();
  });
});
