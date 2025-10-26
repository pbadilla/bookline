"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  DollarSign,
  Zap,
  Clock,
  Filter,
  TrendingUp,
  Euro,
} from "lucide-react";

export interface QuickAccessProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  onPriceFilter: (min: number, max: number) => void;
  onViewModeChange: (mode: "list" | "grid") => void;
  onRenderingModeChange: (mode: "lazy" | "pagination") => void;
  currentViewMode: "list" | "grid";
  currentRenderingMode: "virtual" | "lazy" | "pagination";
}

// 🧩 Reusable ButtonGroup component
interface ButtonGroupProps {
  label: string;
  icon: React.ReactNode;
  items: { key: string; label: string; onClick: () => void }[];
  selectedKey?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  label,
  icon,
  items,
  selectedKey,
}) => (
  <div className="w-full">
    <h3 className="font-semibold mb-3 flex items-center">
      {icon}
      {label}
    </h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Button
          key={item.key}
          variant={selectedKey === item.key ? "active" : "outline"}
          size="sm"
          onClick={item.onClick}
        >
          {item.label}
        </Button>
      ))}
    </div>
  </div>
);

// 🧭 Main QuickAccess component
export const QuickAccess: React.FC<QuickAccessProps> = ({
  onCategoryFilter,
  onPriceFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>(
    undefined
  );

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Business",
    "Health",
    "History",
    "Art",
  ];

  const priceRanges = [
    { min: 0, max: 20, label: "Under 20€" },
    { min: 20, max: 50, label: "20€ - 50€" },
    { min: 50, max: 100, label: "50€ - 100€" },
  ];

  const viewModes = [
    { mode: "grid", label: "Grid" },
    { mode: "list", label: "List" },
  ] as const;

  const renderingModes = [
    {
      mode: "virtual",
      icon: <Zap className="h-4 w-4" />,
      title: "Virtual Scrolling",
    },
    {
      mode: "lazy",
      icon: <Clock className="h-4 w-4" />,
      title: "Lazy Loading",
    },
    {
      mode: "pagination",
      icon: <Filter className="h-4 w-4" />,
      title: "Pagination",
    },
  ] as const;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <ButtonGroup
            label="Categories"
            icon={<BookOpen className="h-4 w-4 mr-2" />}
            selectedKey={selectedCategory}
            items={categories.map((c) => ({
              key: c,
              label: c,
              onClick: () => {
                setSelectedCategory(c);
                onCategoryFilter(c);
              },
            }))}
          />

          <ButtonGroup
            label="Price Ranges"
            icon={<Euro className="h-4 w-4 mr-2" />}
            selectedKey={selectedPrice}
            items={priceRanges.map((r) => ({
              key: `${r.min}-${r.max}`,
              label: r.label,
              onClick: () => {
                setSelectedPrice(`${r.min}-${r.max}`);
                onPriceFilter(r.min, r.max);
              },
            }))}
          />
        </div>
      </CardContent>
    </Card>
  );
};
