import { Header } from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

export const metadata = {
  title: "Bookline - Your Online Bookstore",
  description: "Find and purchase your favorite books online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}