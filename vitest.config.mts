import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],

    // 👇 Match both src/ and tests/unit/
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/unit/**/*.{test,spec}.{ts,tsx}"
    ],

    // 👇 Use new deps API
    deps: {
      optimizer: {
        web: {
          include: ["@testing-library/react"],
        },
      },
    },
  },
});
