"use client";
import { Button } from "@/components/ui/button";

import { ShoppingCart, BookOpen, User, LogOut } from "lucide-react";

import Link from "next/link";
import { getTierInfo } from "@/data/tiers";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">Bookline</span>
            </Link>

            {user && (
              <>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getTierInfo(user.tier).color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {getTierInfo(user.tier).name} Tier
                  </span>
                </div>
              </>
            )}
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>

            {user?.role === "admin" ? (
              <Link href="/admin">
                <Button variant="ghost">
                  <User className="h-4 w-4 mr-2" />
                  Welcome Admin
                </Button>
              </Link>
            ) : user ? (
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
            ) : null}

            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup?tab=signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
