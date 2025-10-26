"use client";

import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (email === "admin@example.com" && password === "admin") {
      setUser({
        id: "1",
        name: "Admin User",
        email,
        tier: "gold",
        role: "admin",
      });
    } else {
      setUser({
        id: "2",
        name: "Regular User",
        email,
        tier: "bronze",
        role: "user",
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
