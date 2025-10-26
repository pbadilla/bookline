import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "@/app/globals.css";

export const metadata = {
  title: "Bookline - Your Online Bookstore",
  description: "Find and purchase your favorite books online",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.className
        )}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="container flex-grow py-8">{children}</main>
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}