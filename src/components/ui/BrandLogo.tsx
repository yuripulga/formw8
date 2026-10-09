"use client";

import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * BrandLogo
 * Identidade visual oficial FormW8:
 * Tipografia geométrica moderna e sóbria com "W8" em destaque amarelo marca-texto sólido (#FFE600)
 * e tipografia suave em carvão com leve saturação azulada (#1E293B).
 */
export function BrandLogo({ size = "md", className = "" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const textPaddingClasses = {
    sm: "px-1.5 text-base",
    md: "px-2 text-xl",
    lg: "px-2.5 text-2xl sm:text-3xl",
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className={`font-extrabold tracking-tight text-heading-theme ${sizeClasses[size]}`}>
        Form
      </span>
      <span className="relative inline-block ml-1 isolate">
        {/* Pincelada orgânica idêntica ao HighlightedText */}
        <svg
          className="absolute -inset-x-[3px] inset-y-0 w-[calc(100%+6px)] h-full z-0 pointer-events-none select-none"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 1 4 C 22 2, 58 3, 99 1 C 100 9, 99 18, 98 23 C 72 22, 28 24, 1 21 C 0.5 15, 0.8 9, 1 4 Z"
            fill="var(--brand-highlight, #FFE600)"
          />
        </svg>
        <span
          className={`font-black tracking-tight text-slate-900 relative z-10 inline-block ${textPaddingClasses[size]}`}
        >
          W8
        </span>
      </span>
    </div>
  );
}
