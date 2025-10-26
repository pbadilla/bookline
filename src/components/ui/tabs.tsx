"use client";

import React, { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue?: string;
  children: ReactNode;
  onValueChange?: (value: string) => void;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabContext {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabContext | undefined>(undefined);

function Tabs({ defaultValue, children, onValueChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || "");

  const handleChange = (value: string) => {
    setActiveTab(value);
    if (onValueChange) onValueChange(value); // call callback
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => {
  const context = React.useContext(TabsContext);
  if (!context)
    throw new Error("TabsTrigger must be used within a Tabs component");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground",
        className
      )}
      onClick={() => setActiveTab(value)}
      type="button"
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const context = React.useContext(TabsContext);
  if (!context)
    throw new Error("TabsContent must be used within a Tabs component");

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return <div className={cn("mt-2", className)}>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
