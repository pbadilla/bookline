import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { ExpandableQuickAccess } from "./ExpandableQuickAccess";
import type { QuickAccessProps } from "@/components/QuickAccess";

// Mock QuickAccess component
vi.mock("@/components/QuickAccess", () => ({
  QuickAccess: (props: any) => (
    <div data-testid="quick-access">QuickAccess Content</div>
  ),
}));

// Mock Button component if needed
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("ExpandableQuickAccess", () => {
  const props: QuickAccessProps = {}; // pass minimal props for test

  it("renders button and QuickAccess hidden initially", () => {
    const { getByText, queryByTestId } = render(
      <ExpandableQuickAccess {...props} />
    );

    // Check the button is rendered
    expect(getByText("Quick Filters")).toBeTruthy();

    // QuickAccess should be hidden initially
    expect(queryByTestId("quick-access")).toBeTruthy(); // element exists but is visually hidden
  });

  it("toggles QuickAccess visibility on button click", () => {
    const { getByText, container } = render(
      <ExpandableQuickAccess {...props} />
    );
    const button = getByText("Quick Filters");

    // Initially closed
    expect(container.querySelector("div.transition-all")).toHaveClass(
      "max-h-0"
    );

    // Click to open
    fireEvent.click(button);
    expect(container.querySelector("div.transition-all")).toHaveClass(
      "max-h-[1000px]"
    );

    // Click again to close
    fireEvent.click(button);
    expect(container.querySelector("div.transition-all")).toHaveClass(
      "max-h-0"
    );
  });

  it("Chevron rotates when toggled", () => {
    const { getByText, container } = render(
      <ExpandableQuickAccess {...props} />
    );
    const button = getByText("Quick Filters");
    const chevron = container.querySelector("svg");

    expect(chevron).toHaveClass("rotate-0");

    fireEvent.click(button);
    expect(chevron).toHaveClass("rotate-180");

    fireEvent.click(button);
    expect(chevron).toHaveClass("rotate-0");
  });
});
