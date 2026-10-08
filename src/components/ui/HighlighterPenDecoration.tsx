"use client";

import React, { useState, useEffect } from "react";

export type HighlighterColorId = "yellow" | "green" | "pink" | "orange" | "cyan";

interface PenColorConfig {
  id: HighlighterColorId;
  name: string;
  hex: string;
  tipLight: string;
  tipDark: string;
}

const HIGHLIGHTER_COLORS: PenColorConfig[] = [
  {
    id: "yellow",
    name: "Amarelo Neon (Padrão)",
    hex: "#FFE600",
    tipLight: "#FFF04D",
    tipDark: "#E5CE00",
  },
  {
    id: "green",
    name: "Verde Neon",
    hex: "#34E85C",
    tipLight: "#7BF89A",
    tipDark: "#1BB840",
  },
  {
    id: "pink",
    name: "Rosa Neon Claro",
    hex: "#FF7DB7",
    tipLight: "#FFB3D7",
    tipDark: "#E64A8D",
  },
  {
    id: "orange",
    name: "Laranja Neon",
    hex: "#FFA048",
    tipLight: "#FFC48C",
    tipDark: "#E07018",
  },
  {
    id: "cyan",
    name: "Ciano Neon",
    hex: "#00E5FF",
    tipLight: "#67E8F9",
    tipDark: "#0284C7",
  },
];

function SingleHighlighterSvg({
  tipMain,
  tipLight,
  tipDark,
  bandColor,
}: {
  tipMain: string;
  tipLight: string;
  tipDark: string;
  bandColor: string;
}) {
  return (
    <svg
      width="220"
      height="46"
      viewBox="0 0 220 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[155px] sm:w-[195px] h-auto drop-shadow-xs"
    >
      {/* 1. Ponta Chanfrada (Chisel Tip) */}
      <path
        d="M 10 23 L 28 11 L 48 13 L 48 33 L 28 35 Z"
        fill={tipMain}
      />
      <polygon
        points="10,23 18,13 28,11 18,25"
        fill={tipLight}
      />
      <polygon
        points="10,23 28,35 48,33 48,31 26,29"
        fill={tipDark}
      />

      {/* 2. Garganta / Suporte da Ponta (Collar) */}
      <rect
        x="48"
        y="11"
        width="16"
        height="24"
        rx="2"
        fill="#334155"
        className="dark:fill-slate-700"
      />
      {/* Anel metálico / acento */}
      <rect
        x="60"
        y="9"
        width="4"
        height="28"
        rx="1"
        fill="#475569"
        className="dark:fill-slate-600"
      />

      {/* 3. Corpo Principal da Caneta Marca-Texto (Barrel) */}
      <rect
        x="64"
        y="5"
        width="160"
        height="36"
        rx="6"
        fill="#1e293b"
        className="dark:fill-zinc-800"
      />

      {/* Faixa decorativa da cor da tinta */}
      <rect
        x="74"
        y="5"
        width="10"
        height="36"
        fill={bandColor}
      />

      {/* Brilho superior longitudinal do corpo */}
      <rect
        x="64"
        y="7"
        width="156"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Detalhe sutil de empunhadura (3 Grip ridges visíveis) */}
      <line x1="100" y1="11" x2="100" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="107" y1="11" x2="107" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="114" y1="11" x2="114" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />

      {/* Tipografia da Marca na caneta (oculta além da borda direita da tela) */}
      <text
        x="132"
        y="26"
        fill="#94a3b8"
        fontSize="9"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        letterSpacing="1"
      >
        FORMW8
      </text>

      {/* Tampa traseira (Rear plug) */}
      <rect
        x="210"
        y="9"
        width="12"
        height="28"
        rx="3"
        fill={bandColor}
      />
    </svg>
  );
}

/**
 * HighlighterPenDecoration
 * Seletor interativo de 5 cores neon de marca-texto em SVG.
 * As canetas estão encostadas e empilhadas no canto inferior direito.
 * - Em repouso: a selecionada fica estendida; as outras ficam recuadas à direita.
 * - Ao passar o mouse no wrapper (group hover): todas as canetas avançam metade do caminho
 *   para a esquerda, revelando todo o conjunto harmoniosamente.
 * - Ao passar o mouse sobre uma caneta específica: ela avança completamente.
 * - Ao clicar: ativa a cor e altera a variável `--brand-highlight` em tempo real.
 */
export function HighlighterPenDecoration() {
  const [selectedColor, setSelectedColor] = useState<HighlighterColorId>("yellow");
  const [hoveredColor, setHoveredColor] = useState<HighlighterColorId | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [pendingColor, setPendingColor] = useState<HighlighterColorId | null>(null);

  // Carrega preferência persistida no navegador e aplica a cor na variável CSS
  useEffect(() => {
    try {
      const saved = localStorage.getItem("formw8_highlight_color") as HighlighterColorId | null;
      if (saved && HIGHLIGHTER_COLORS.some((c) => c.id === saved)) {
        setSelectedColor(saved);
        const config = HIGHLIGHTER_COLORS.find((c) => c.id === saved);
        if (config) {
          document.documentElement.style.setProperty("--brand-highlight", config.hex);
        }
      }
    } catch {
      // ignore local storage errors
    }
  }, []);

  const handleSelectColor = (colorId: HighlighterColorId) => {
    setSelectedColor(colorId);
    setIsMobileExpanded(false);
    const config = HIGHLIGHTER_COLORS.find((c) => c.id === colorId);
    if (config) {
      document.documentElement.style.setProperty("--brand-highlight", config.hex);
      try {
        localStorage.setItem("formw8_highlight_color", colorId);
      } catch {
        // ignore
      }
    }
  };

  // Calculate stable slot order where selectedColor is at slot 0
  const [currentOrder, setCurrentOrder] = useState<HighlighterColorId[]>([
    "yellow",
    "green",
    "pink",
    "orange",
    "cyan",
  ]);

  useEffect(() => {
    setCurrentOrder([
      selectedColor,
      ...HIGHLIGHTER_COLORS.map((c) => c.id).filter((id) => id !== selectedColor),
    ]);
  }, [selectedColor]);

  const handleMobileSelectColor = (colorId: HighlighterColorId) => {
    // 1. Immediately apply the color in CSS variable and localStorage
    const config = HIGHLIGHTER_COLORS.find((c) => c.id === colorId);
    if (config) {
      document.documentElement.style.setProperty("--brand-highlight", config.hex);
      try {
        localStorage.setItem("formw8_highlight_color", colorId);
      } catch {
        // ignore
      }
    }

    // 2. Trigger diagonal glide to (0,0) and slide-out for others
    setPendingColor(colorId);
    setIsMobileExpanded(false);

    // 3. Once the smooth transition reaches (0,0) (340ms), update selectedColor
    setTimeout(() => {
      setSelectedColor(colorId);
      setPendingColor(null);
    }, 340);
  };

  return (
    <>
      {/* Mobile Backdrop to close menu with smooth exit animation when tapping outside */}
      {isMobileExpanded && (
        <div
          className="fixed inset-0 z-40 sm:hidden bg-transparent"
          onClick={() => setIsMobileExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. Mobile Version (< sm): Positioned at top-right. Pens glide smoothly on X and Y axes with zero snapping */}
      <aside
        aria-label="Seletor de cor de destaque marca-texto"
        className="fixed top-2 -right-24 z-50 select-none sm:hidden w-[160px] h-[220px] pointer-events-none"
      >
        {HIGHLIGHTER_COLORS.map((pen) => {
          const slotIndex = currentOrder.indexOf(pen.id);
          const isSelected = selectedColor === pen.id;
          const isPending = pendingColor === pen.id;
          const isTarget = isPending || (isSelected && !pendingColor);

          // Calculate exact X and Y offsets
          let targetX = 240; // Offscreen to the right by default
          let targetY = slotIndex * 40; // Stacked vertically
          let targetOpacity = 0;
          let targetZIndex = 10;

          if (isMobileExpanded) {
            // All 5 pens visible in their slots
            targetX = slotIndex === 0 ? 0 : 12;
            targetY = slotIndex * 40;
            targetOpacity = 1;
            targetZIndex = slotIndex === 0 ? 25 : 15;
          } else {
            // Collapsed: ONLY the target (chosen/selected) pen glides to (0, 0)
            if (isTarget) {
              targetX = 0;
              targetY = 0; // Glides smoothly to top slot!
              targetOpacity = 1;
              targetZIndex = 30;
            } else {
              targetX = 240;
              targetY = slotIndex * 40;
              targetOpacity = 0;
              targetZIndex = 5;
            }
          }

          const transitionDelay = isTarget
            ? "0ms"
            : isMobileExpanded
            ? `${slotIndex * 30}ms`
            : `${(4 - slotIndex) * 20}ms`;

          return (
            <button
              key={`mob-${pen.id}`}
              type="button"
              onClick={() => {
                if (!isMobileExpanded) {
                  setIsMobileExpanded(true);
                } else {
                  if (slotIndex === 0 && !pendingColor) {
                    setIsMobileExpanded(false);
                  } else {
                    handleMobileSelectColor(pen.id);
                  }
                }
              }}
              aria-pressed={isSelected}
              aria-label={`Selecionar cor ${pen.name}`}
              title={`Ativar destaque ${pen.name}`}
              style={{
                transform: `translate3d(${targetX}px, ${targetY}px, 0)`,
                opacity: targetOpacity,
                zIndex: targetZIndex,
                transitionDelay,
              }}
              className="absolute top-0 right-0 p-0 border-none bg-transparent cursor-pointer transition-all duration-300 ease-out focus:outline-hidden active:scale-95 pointer-events-auto"
            >
              <SingleHighlighterSvg
                tipMain={pen.hex}
                tipLight={pen.tipLight}
                tipDark={pen.tipDark}
                bandColor={pen.hex}
              />
            </button>
          );
        })}
      </aside>

      {/* 2. Desktop & Tablet Version (>= sm): Classic 5 stacked highlighters at bottom-right */}
      <aside
        aria-label="Seletor de cor de destaque marca-texto"
        className="hidden sm:flex fixed bottom-3 -right-24 md:-right-28 z-40 select-none flex-col -space-y-1.5 group p-2 pr-0 pointer-events-auto"
      >
        {HIGHLIGHTER_COLORS.map((pen) => {
          const isSelected = selectedColor === pen.id;
          const isHovered = hoveredColor === pen.id;

          const translateClass = isSelected
            ? "translate-x-0 opacity-100 z-20"
            : isHovered
            ? "!translate-x-0 !opacity-100 z-30"
            : "translate-x-16 group-hover:translate-x-8 opacity-80 group-hover:opacity-95 z-10";

          return (
            <button
              key={`desk-${pen.id}`}
              type="button"
              onClick={() => handleSelectColor(pen.id)}
              onMouseEnter={() => setHoveredColor(pen.id)}
              onMouseLeave={() => setHoveredColor(null)}
              aria-pressed={isSelected}
              aria-label={`Selecionar cor ${pen.name}`}
              title={`Ativar destaque ${pen.name}`}
              className={`p-0 border-none bg-transparent cursor-pointer transition-all duration-300 ease-out transform focus:outline-hidden active:scale-98 ${translateClass}`}
            >
              <SingleHighlighterSvg
                tipMain={pen.hex}
                tipLight={pen.tipLight}
                tipDark={pen.tipDark}
                bandColor={pen.hex}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
}
