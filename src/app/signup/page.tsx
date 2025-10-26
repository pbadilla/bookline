"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    invitationCode: "",
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(signInData.email);
      passwordSchema.parse(signInData.password);
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input");
      return;
    }

    setLoading(true);
    try {
      await login(signInData.email, signInData.password);
      router.push("/");
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(signUpData.email);
      passwordSchema.parse(signUpData.password);
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input");
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await login(signUpData.email, signUpData.password); // Mock signup
      toast.success("Account created successfully!");
      router.push("/");
    } catch {
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {activeTab === "login"
              ? "Sign in to start shopping with tier-based discounts"
              : "Register to start your ShopTier journey"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="login"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid grid-cols-2 w-full rounded-md">
              <TabsTrigger
                value="login"
                className={cn(
                  "transition-colors duration-200 px-4 py-2 rounded-md hover:bg-primary/10",
                  activeTab === "login"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={cn(
                  "transition-colors duration-200 px-4 py-2 rounded-md hover:bg-primary/10",
                  activeTab === "signup"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="login"
              className="transition-opacity duration-300"
            >
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInData.email}
                    onChange={(e) =>
                      setSignInData({ ...signInData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent
              value="signup"
              className="transition-opacity duration-300"
            >
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invitation-code">
                    Invitation Code (Optional)
                  </Label>
                  <Input
                    id="invitation-code"
                    type="text"
                    placeholder="Enter invitation code to start at higher tier"
                    value={signUpData.invitationCode}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        invitationCode: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Have an invite code? Start at your inviter's tier!
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
