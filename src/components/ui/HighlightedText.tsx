"use client";

import React from "react";

interface HighlightedTextProps {
  text: string;
  className?: string;
  highlightClassName?: string;
}

/**
 * HighlightedText
 * Analisa tags `{highlight}...{/highlight}` ou `<highlight>...</highlight>` em strings de tradução
 * e renderiza a palavra com uma pincelada orgânica em SVG de caneta marca-texto amarelo (#FFE600),
 * com transparência e leve distorção orgânica.
 */
export function HighlightedText({
  text,
  className = "",
  highlightClassName = "",
}: HighlightedTextProps) {
  if (!text) return null;

  if (
    !text.includes("{highlight}") &&
    !text.includes("<highlight>") &&
    !text.includes("{bold}") &&
    !text.includes("<b>")
  ) {
    return <span className={className}>{text}</span>;
  }

  const tokens: React.ReactNode[] = [];
  const regex = /\{highlight\}(.*?)\{\/highlight\}|<highlight>(.*?)<\/highlight>|\{bold\}(.*?)\{\/bold\}|<b>(.*?)<\/b>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const highlightContent = match[1] ?? match[2];
    const boldContent = match[3] ?? match[4];

    if (highlightContent) {
      tokens.push(
        <span
          key={`hl-${keyIdx++}`}
          className={`relative inline-block px-1 mx-0.5 font-black text-[#1e293b] isolate ${highlightClassName}`}
        >
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
          <span className="relative z-10">{highlightContent}</span>
        </span>
      );
    } else if (boldContent) {
      tokens.push(
        <strong key={`b-${keyIdx++}`} className="font-bold text-heading-theme">
          {boldContent}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return <span className={className}>{tokens}</span>;
}
