"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuickAccess } from "@/components/QuickAccess";
import type { QuickAccessProps } from "@/components/QuickAccess";

import { ChevronDown } from "lucide-react";

export function ExpandableQuickAccess(props: QuickAccessProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 flex items-center gap-2"
      >
        <span>Quick Filters</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <QuickAccess {...props} />
      </div>
    </div>
  );
}
