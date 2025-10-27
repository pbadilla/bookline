"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  .min(5, "Password must be at least 5 characters");

function SignupPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    invitationCode: "",
  });

  console.log("🔍 Component rendered. User:", user, "Active Tab:", activeTab);

  // Redirect after login/signup
  useEffect(() => {
    console.log("🔄 useEffect triggered. User:", user, "isRedirecting:", isRedirecting);
    if (user && !isRedirecting) {
      console.log("✅ Redirecting user...");
      setIsRedirecting(true);
      const redirectTo = searchParams.get("redirect") || "/";
      toast.success(`Welcome, ${user.name || user.email}!`);
      router.replace(redirectTo);
    }
  }, [user, router, searchParams, isRedirecting]);

  const handleSignIn = async (e: React.FormEvent) => {
    console.log("🚀 handleSignIn CALLED");
    e.preventDefault();

    console.log("📧 Sign in data:", signInData);

    // Validate inputs
    try {
      emailSchema.parse(signInData.email);
      passwordSchema.parse(signInData.password);
      console.log("✅ Validation passed");
    } catch (error: any) {
      console.log("❌ Validation failed:", error);
      // Zod errors are in error.issues, not error.errors
      const errorMessage = error.issues?.[0]?.message || error.errors?.[0]?.message || "Invalid input";
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    console.log("⏳ Starting login...");
    
    try {
      console.log("📞 Calling login function...");
      const result = await login(signInData.email, signInData.password);
      console.log("✅ Login result:", result);

      // Success - toast and redirect handled by useEffect
    } catch (error: any) {
      console.error("❌ Login error:", error);
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
      console.log("🏁 Login process finished");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    console.log("🚀 handleSignUp CALLED");
    e.preventDefault();

    console.log("📧 Sign up data:", signUpData);

    // Validate inputs
    try {
      emailSchema.parse(signUpData.email);
      passwordSchema.parse(signUpData.password);
      console.log("✅ Validation passed");
    } catch (error: any) {
      console.log("❌ Validation failed:", error);
      // Zod errors are in error.issues, not error.errors
      const errorMessage = error.issues?.[0]?.message || error.errors?.[0]?.message || "Invalid input";
      toast.error(errorMessage);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      console.log("❌ Passwords don't match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("⏳ Starting signup...");
    
    try {
      console.log("📞 Calling login function for signup...");
      const result = await login(signUpData.email, signUpData.password);
      console.log("✅ Signup result:", result);
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.error("❌ Signup error:", error);
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
      console.log("🏁 Signup process finished");
    }
  };

  // Show loading state only when redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
            defaultValue={activeTab}
            onValueChange={(value) => {
              console.log("🔄 Tab changed to:", value);
              setActiveTab(value);
            }}
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
                data-testid="login-tab"
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
                data-testid="register-tab"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent
              value="login"
              className="transition-opacity duration-300"
            >
              <form onSubmit={handleSignIn} className="space-y-4" data-testid="login-form">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInData.email}
                    onChange={(e) => {
                      console.log("📝 Login email changed:", e.target.value);
                      setSignInData({ ...signInData, email: e.target.value });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInData.password}
                    onChange={(e) => {
                      console.log("📝 Login password changed");
                      setSignInData({ ...signInData, password: e.target.value });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  onClick={() => console.log("🖱️ Login button clicked")}
                  data-testid="sign-in-button"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent
              value="signup"
              className="transition-opacity duration-300"
            >
              <form onSubmit={handleSignUp} className="space-y-4" data-testid="signup-form">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpData.email}
                    onChange={(e) => {
                      console.log("📝 Signup email changed:", e.target.value);
                      setSignUpData({ ...signUpData, email: e.target.value });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.password}
                    onChange={(e) => {
                      console.log("📝 Signup password changed");
                      setSignUpData({ ...signUpData, password: e.target.value });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.confirmPassword}
                    onChange={(e) => {
                      console.log("📝 Confirm password changed");
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invitation-code">
                    Invitation Code (Optional)
                  </Label>
                  <Input
                    id="invitation-code"
                    type="text"
                    placeholder="Enter invitation code"
                    value={signUpData.invitationCode}
                    onChange={(e) => {
                      console.log("📝 Invitation code changed:", e.target.value);
                      setSignUpData({
                        ...signUpData,
                        invitationCode: e.target.value,
                      });
                    }}
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  onClick={() => console.log("🖱️ Signup button clicked")}
                  data-testid="create-account-button"
                >
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

export default SignupPage;