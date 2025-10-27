"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  category?: string;
}

const fallbackImages: Record<string, string> = {
  electronics: "/fallbacks/default.png",
  clothing: "/fallbacks/default.png",
  furniture: "/fallbacks/default.png",
  default: "/fallbacks/default.png",
};

export function LazyImage({ src, alt, title, className, category }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const blurDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

  const fallbackSrc = useMemo(
    () => fallbackImages[category?.toLowerCase() || "default"],
    [category]
  );

  const displaySrc = error ? fallbackSrc : src;
  const displayTitle = error ? "" : title;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      {/* Blur placeholder while loading */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Blur background */}
          <img
            src={blurDataURL}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110 opacity-50"
          />
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          {/* Spinner */}
          <div className="absolute flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={displaySrc}
        alt={alt}
        title={displayTitle}
        className={cn(
          className,
          "transition-all duration-500 object-cover",
          isLoading ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100 blur-0"
        )}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </div>
  );
}
