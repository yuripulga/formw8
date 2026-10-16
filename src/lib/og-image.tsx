import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/config";

export const OG_SIZE = { width: 1200, height: 630 };

const OG_COPY: Record<
  Locale,
  {
    alt: string;
    tagline: string;
    headline: string;
    and: string;
    subtitle: string;
    badgeTax: string;
    badgePlatforms: string;
    badgeFree: string;
    badgeOfficial: string;
  }
> = {
  "pt-BR": {
    alt: "FormW8 - Gerador de Formulários Fiscais W-8BEN e W-8BEN-E",
    tagline: "Zero-Data • 100% Client-Side",
    headline: "Seu assistente para preencher os formulários fiscais",
    and: "&",
    subtitle:
      "Preencha e baixe seus formulários oficiais da IRS em menos de 1 minuto. Evite a retenção de 30% na fonte na Deel, Rippling e Upwork com total privacidade.",
    badgeTax: "0% Withholding Tax",
    badgePlatforms: "Deel, Rippling & Upwork Ready",
    badgeFree: "100% Gratuito no Navegador",
    badgeOfficial: "PDF Oficial IRS Autêntico",
  },
  "en-US": {
    alt: "FormW8 - W-8BEN and W-8BEN-E Tax Form Generator",
    tagline: "Zero-Data • 100% Client-Side",
    headline: "The frictionless assistant to generate official IRS forms",
    and: "&",
    subtitle:
      "Fill out and download authentic IRS forms in under 1 minute. Avoid the 30% foreign withholding on Deel, Rippling and Upwork with full browser privacy.",
    badgeTax: "0% Withholding Tax",
    badgePlatforms: "Deel, Rippling & Upwork Ready",
    badgeFree: "100% Free & In-Browser",
    badgeOfficial: "Authentic Official IRS PDF",
  },
};

export function ogAlt(locale: Locale): string {
  return OG_COPY[locale].alt;
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "flex", marginRight: "8px" }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function renderOgImage(locale: Locale) {
  const copy = OG_COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          padding: "36px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Main Brand Card - Exactly matching .card-brand */}
        <div
          style={{
            width: "1128px",
            height: "558px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#121215",
            border: "1px solid #27272a",
            borderRadius: "28px",
            padding: "46px 54px",
            position: "relative",
          }}
        >
          {/* Subtle Ambient Radial Glow on the card */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 230, 0, 0.08) 0%, rgba(255, 230, 0, 0) 70%)",
            }}
          />

          {/* Top Bar: Official BrandLogo + Zero-Data Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Authentic BrandLogo (Form + organic marker W8) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#f1f5f9",
                  fontSize: "38px",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                }}
              >
                Form
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  marginLeft: "8px",
                }}
              >
                {/* Organic highlighter stroke path identical to BrandLogo.tsx */}
                <svg
                  width="88"
                  height="46"
                  viewBox="0 0 100 24"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <path
                    d="M 1 4 C 22 2, 58 3, 99 1 C 100 9, 99 18, 98 23 C 72 22, 28 24, 1 21 C 0.5 15, 0.8 9, 1 4 Z"
                    fill="#FFE600"
                  />
                </svg>
                <span
                  style={{
                    color: "#0f172a",
                    fontWeight: 900,
                    fontSize: "36px",
                    letterSpacing: "-1px",
                    position: "relative",
                    padding: "0 14px",
                  }}
                >
                  W8
                </span>
              </div>
            </div>

            {/* Zero-Data / Security Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "9999px",
                padding: "8px 18px",
                color: "#94a3b8",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.3px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  marginRight: "10px",
                }}
              />
              {copy.tagline}
            </div>
          </div>

          {/* Center: Main Headline & Marker-Highlighted W-8 Forms */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "1020px",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "-0.8px",
                lineHeight: 1.2,
              }}
            >
              {copy.headline}
            </span>

            {/* Big Highlighted Forms Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              {/* W-8BEN Marker Box */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg
                  width="220"
                  height="58"
                  viewBox="0 0 100 24"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <path
                    d="M 1 4 C 22 2, 58 3, 99 1 C 100 9, 99 18, 98 23 C 72 22, 28 24, 1 21 C 0.5 15, 0.8 9, 1 4 Z"
                    fill="#FFE600"
                  />
                </svg>
                <span
                  style={{
                    position: "relative",
                    color: "#0f172a",
                    fontSize: "44px",
                    fontWeight: 900,
                    letterSpacing: "-1.2px",
                    padding: "0 18px",
                  }}
                >
                  W-8BEN
                </span>
              </div>

              <span
                style={{
                  fontSize: "34px",
                  fontWeight: 700,
                  color: "#526071",
                }}
              >
                {copy.and}
              </span>

              {/* W-8BEN-E Marker Box */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg
                  width="248"
                  height="58"
                  viewBox="0 0 100 24"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <path
                    d="M 1 4 C 22 2, 58 3, 99 1 C 100 9, 99 18, 98 23 C 72 22, 28 24, 1 21 C 0.5 15, 0.8 9, 1 4 Z"
                    fill="#FFE600"
                  />
                </svg>
                <span
                  style={{
                    position: "relative",
                    color: "#0f172a",
                    fontSize: "44px",
                    fontWeight: 900,
                    letterSpacing: "-1.2px",
                    padding: "0 18px",
                  }}
                >
                  W-8BEN-E
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.45,
                color: "#cbd5e1",
                margin: "4px 0 0 0",
                maxWidth: "960px",
              }}
            >
              {copy.subtitle}
            </p>
          </div>

          {/* Bottom Bar: Pill Badges matching Design System */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* Green Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(21, 128, 61, 0.15)",
                border: "1px solid rgba(34, 197, 94, 0.35)",
                borderRadius: "9999px",
                padding: "8px 16px",
                color: "#4ade80",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <CheckIcon color="#4ade80" />
              <span>{copy.badgeTax}</span>
            </div>

            {/* Neutral Badge 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "9999px",
                padding: "8px 16px",
                color: "#cbd5e1",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <CheckIcon color="#94a3b8" />
              <span>{copy.badgePlatforms}</span>
            </div>

            {/* Neutral Badge 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "9999px",
                padding: "8px 16px",
                color: "#cbd5e1",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <CheckIcon color="#94a3b8" />
              <span>{copy.badgeFree}</span>
            </div>

            {/* Neutral Badge 3 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "9999px",
                padding: "8px 16px",
                color: "#f1f5f9",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <CheckIcon color="#94a3b8" />
              <span>{copy.badgeOfficial}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    }
  );
}
