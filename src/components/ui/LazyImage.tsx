"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function LazyImage({ src, alt, title, className }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tiny 1x1 blur placeholder (base64 encoded tiny grey image)
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      {/* Blur placeholder - shown while loading */}
      {isLoading && !error && (
        <div className="absolute inset-0">
          <img
            src={blurDataURL}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110 opacity-50"
          />
          {/* Animated shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
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
        src={src}
        alt={alt}
        title={title}
        className={cn(
          className,
          "transition-all duration-500",
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