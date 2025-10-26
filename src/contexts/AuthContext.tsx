"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

  // Restore user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    debugger;
    let newUser: User;

    if (email === "admin@example.com" && password === "admin") {
      newUser = {
        id: "1",
        name: "Admin User",
        email,
        tier: "gold",
        role: "admin",
      };
    } else {
      newUser = {
        id: "2",
        name: "Regular User",
        email,
        tier: "bronze",
        role: "user",
      };
    }

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    // No return needed
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
