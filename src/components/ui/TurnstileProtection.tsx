"use client";

import React, { useEffect, useRef, useState } from "react";

interface TurnstileProtectionProps {
  onVerify?: (token: string) => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "error-callback"?: (error: unknown) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      remove?: (widgetId: string) => void;
      reset?: (widgetId: string) => void;
    };
  }
}

/**
 * TurnstileProtection
 * Proteção moderna contra bots automatizados e scraping via Cloudflare Turnstile (Fricção Zero).
 * Executa em modo invisível / não-interativo sem atrapalhar a experiência do usuário legítimo.
 * Em ambiente de desenvolvimento ou quando a chave pública não estiver configurada,
 * opera em modo bypass transparente garantindo fluxo contínuo.
 */
export function TurnstileProtection({ onVerify, className = "" }: TurnstileProtectionProps) {
  const [isVerified, setIsVerified] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // Se não houver chave configurada (dev local), auto-valida em modo de desenvolvimento
    if (!siteKey) {
      setIsVerified(true);
      if (onVerify) onVerify("dev_bypass_token");
      return;
    }

    let isMounted = true;

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          appearance: "interaction-only",
          callback: (token: string) => {
            if (isMounted) {
              setIsVerified(true);
              if (onVerify) onVerify(token);
            }
          },
          "expired-callback": () => {
            if (isMounted) {
              setIsVerified(false);
            }
          },
          "error-callback": () => {
            // Em caso de erro de rede ou bloqueio estrito de terceiros, não bloqueia o usuário
            if (isMounted) {
              setIsVerified(true);
              if (onVerify) onVerify("fallback_token");
            }
          },
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.warn("Cloudflare Turnstile render error:", err);
      }
    };

    const scriptId = "cloudflare-turnstile-script";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify]);

  return (
    <div
      ref={containerRef}
      className={`min-h-0 flex items-center justify-center ${className}`}
      aria-hidden="true"
    />
  );
}
