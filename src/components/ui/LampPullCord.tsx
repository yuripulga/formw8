"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/i18n/context";

/**
 * LampPullCord (Cordinha de Abajur com Física Interativa)
 * Fixed to the top right of the viewport with pure TypeScript spring & pendulum physics.
 * Pulling the cord toggles the theme between Light and Dark mode.
 */
export function LampPullCord() {
  const { theme, setTheme, t } = useI18n();
  const [isMounted, setIsMounted] = useState(false);

  // Physics state
  const restLength = 50;
  const triggerThreshold = 32; // Pixels pulled past rest length to trigger switch

  const [pos, setPos] = useState({ x: 0, y: restLength });
  const [isDragging, setIsDragging] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);

  const posRef = useRef({ x: 0, y: restLength });
  const velRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialY: restLength });
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Continuous physics simulation loop
  const updatePhysics = useCallback(() => {
    if (!isDraggingRef.current) {
      const k = 0.065; // Spring stiffness
      const damping = 0.91; // Fluid pendulum damping
      const gravity = 0.12; // Subtle downward gravity

      const targetX = 0;
      const targetY = restLength;

      const fx = -k * (posRef.current.x - targetX);
      const fy = -k * (posRef.current.y - targetY) + gravity;

      velRef.current.x = (velRef.current.x + fx) * damping;
      velRef.current.y = (velRef.current.y + fy) * damping;

      posRef.current.x += velRef.current.x;
      posRef.current.y += velRef.current.y;

      // Stop loop when settled to save CPU
      const speed = Math.hypot(velRef.current.x, velRef.current.y);
      const dist = Math.hypot(posRef.current.x - targetX, posRef.current.y - targetY);

      setPos({ x: posRef.current.x, y: posRef.current.y });

      if (speed > 0.04 || dist > 0.08) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      } else {
        posRef.current.x = 0;
        posRef.current.y = restLength;
        setPos({ x: 0, y: restLength });
        animFrameRef.current = null;
      }
    }
  }, [restLength]);

  const startPhysicsLoop = useCallback(() => {
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  // Pointer interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    isDraggingRef.current = true;
    setIsDragging(true);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialY: posRef.current.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = (e.clientX - dragStartRef.current.x) * 0.55;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Constrain horizontal sway and vertical pull
    const clampedX = Math.max(-30, Math.min(30, deltaX));
    const clampedY = Math.max(restLength - 8, Math.min(restLength + 75, dragStartRef.current.initialY + deltaY));

    posRef.current = { x: clampedX, y: clampedY };
    setPos({ x: clampedX, y: clampedY });

    const triggered = clampedY - restLength >= triggerThreshold;
    setIsTriggered(triggered);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    const pullDistance = posRef.current.y - restLength;
    if (pullDistance >= triggerThreshold) {
      // Toggle theme
      setTheme(theme === "dark" ? "light" : "dark");

      // Give a snappy upward recoil impulse with horizontal sway
      const randomDir = Math.random() > 0.5 ? 1 : -1;
      velRef.current.y = -14;
      velRef.current.x = posRef.current.x * -0.55 + randomDir * 3.5;
    } else if (pullDistance < 5) {
      // Simple click without drag -> trigger snappy pull animation with organic horizontal sway
      const randomDir = Math.random() > 0.5 ? 1 : -1;
      const swayAmount = randomDir * (8 + Math.random() * 6); // 8px to 14px horizontal displacement
      posRef.current = { x: swayAmount, y: restLength + 38 };
      setPos({ x: swayAmount, y: restLength + 38 });
      setTheme(theme === "dark" ? "light" : "dark");
      velRef.current.y = -15;
      velRef.current.x = -swayAmount * 0.45;
    } else {
      velRef.current.y = -8;
    }

    setIsTriggered(false);
    startPhysicsLoop();
  };

  // Subtle sway on mouse hover near cord
  const handleMouseEnter = () => {
    if (!isDraggingRef.current) {
      const randomDir = Math.random() > 0.5 ? 1 : -1;
      velRef.current.x = randomDir * (1.2 + Math.random() * 0.8);
      startPhysicsLoop();
    }
  };

  if (!isMounted) return null;

  // Calculate SVG curve coordinates
  const anchorX = 40;
  const anchorY = 5.5;
  const bobX = anchorX + pos.x;
  const bobY = pos.y;
  const ctrlX = anchorX + pos.x * 0.4;
  const ctrlY = pos.y * 0.55;

  const tooltipTitle = theme === "dark" ? t.common.themeLight : t.common.themeDark;

  return (
    <aside
      ref={containerRef}
      className="fixed top-0 right-14 sm:right-3 md:right-4 z-50 pointer-events-none select-none"
      aria-label={t.common.lampAriaLabel}
    >
      <div className="relative w-14 sm:w-16 h-36 pointer-events-none">
        <svg
          className="w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 80 150"
          preserveAspectRatio="xMidYMin meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Ceiling Mounting Plate (flush with top edge) */}
          <rect
            x={anchorX - 7}
            y="0"
            width="14"
            height="3"
            rx="0.5"
            className="fill-slate-500 dark:fill-zinc-500 drop-shadow-sm"
          />
          {/* Collar / Eyelet Connector */}
          <rect
            x={anchorX - 2.5}
            y="3"
            width="5"
            height="2.5"
            rx="0.5"
            className="fill-slate-600 dark:fill-zinc-400"
          />

          {/* Flexible Cord / Chain with subtle curve */}
          <path
            d={`M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${bobX} ${bobY}`}
            className="stroke-slate-400/90 dark:stroke-zinc-500 transition-colors"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray={isDragging ? "none" : "2 3"}
          />

          {/* Pull Pendant / Acorn Bell Knob - ONLY interactive hit target */}
          <g
            transform={`translate(${bobX}, ${bobY})`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={handleMouseEnter}
            className="pointer-events-auto cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
          >
            {/* Tightly constrained hit target strictly over the acorn knob */}
            <circle
              cx="0"
              cy="10"
              r="14"
              fill="transparent"
              className="cursor-grab active:cursor-grabbing"
            />

            {/* Glow / Active Halo when pulled past threshold */}
            {isTriggered && (
              <circle
                cx="0"
                cy="10"
                r="16"
                fill="var(--brand-highlight, #FFE600)"
                opacity="0.4"
                className="animate-pulse pointer-events-none"
              />
            )}

            {/* Brass Cap / Ring */}
            <circle
              cx="0"
              cy="2"
              r="2.5"
              className="fill-slate-500 dark:fill-zinc-400 pointer-events-none"
            />

            {/* Pendant Body (Classic Lamp Switch Knob) */}
            <path
              d="M -3.5 3 C -4.5 9, -5.5 15, -4 18 C -2 20.5, 2 20.5, 4 18 C 5.5 15, 4.5 9, 3.5 3 Z"
              style={{
                fill: isTriggered ? "var(--brand-highlight, #FFE600)" : undefined,
              }}
              className={`${
                isTriggered
                  ? "stroke-slate-900"
                  : "fill-slate-700 dark:fill-zinc-300 stroke-slate-800 dark:stroke-zinc-200"
              } transition-colors duration-150 drop-shadow-sm pointer-events-none`}
              strokeWidth="0.75"
            />

            {/* Subtle Metallic Highlight Reflection */}
            <line
              x1="-1.5"
              y1="5"
              x2="-2"
              y2="15"
              stroke="white"
              strokeWidth="0.85"
              strokeLinecap="round"
              opacity="0.6"
              className="pointer-events-none"
            />

            {/* Bottom Accent Dot */}
            <circle
              cx="0"
              cy="18.5"
              r="1.2"
              className="fill-slate-900 dark:fill-zinc-900 pointer-events-none"
            />
          </g>
        </svg>
      </div>
    </aside>
  );
}
