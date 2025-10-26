'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Cart item type
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string | undefined;
  name?: string | undefined;
}

// Context type
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Create context with default empty values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
});

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add an item or increase quantity if it already exists
  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === newItem.id);
      if (existingItem) {
        return current.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...newItem, quantity: 1 }];
    });
  };

  // Remove item by id
  const removeItem = (id: number) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  // Update quantity of an item
  const updateQuantity = (id: number, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  // Calculate total number of items
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart
export const useCart = () => {
  return useContext(CartContext);
};
