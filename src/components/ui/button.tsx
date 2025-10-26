import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "active"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

function variantClass(v: ButtonVariant | undefined) {
  switch (v) {
    case "active":
      return "bg-primary/80 text-primary-foreground border border-primary shadow-sm";
    case "destructive":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    case "outline":
      return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    case "ghost":
      return "hover:bg-accent hover:text-accent-foreground";
    case "link":
      return "text-primary underline-offset-4 hover:underline";
    case "default":
    default:
      return "bg-blue-600 text-white hover:bg-blue-700";
  }
}

function sizeClass(s: ButtonSize | undefined) {
  switch (s) {
    case "sm":
      return "h-9 rounded-md px-3";
    case "lg":
      return "h-11 rounded-md px-8";
    case "icon":
      return "h-10 w-10";
    case "default":
    default:
      return "h-10 px-4 py-2";
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const classes = cn(base, variantClass(variant), sizeClass(size), className);
    return <button className={classes} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button };
