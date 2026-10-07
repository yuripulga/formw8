import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "FormW8 - Gerador de Formulários Fiscais W-8BEN e W-8BEN-E";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e293b 100%)",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Decorative Ambient Background Glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 230, 0, 0.12) 0%, rgba(255, 230, 0, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, rgba(22, 163, 74, 0) 70%)",
          }}
        />

        {/* Top Header: Logo + Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "52px",
                fontWeight: 800,
                letterSpacing: "-1.5px",
              }}
            >
              Form
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFE600",
                borderRadius: "14px",
                padding: "4px 18px",
                color: "#0f172a",
                fontWeight: 900,
                fontSize: "52px",
                letterSpacing: "-1.5px",
              }}
            >
              W8
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "999px",
              padding: "10px 22px",
              color: "#e2e8f0",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            formw8.com.br
          </div>
        </div>

        {/* Center: Main Headline & Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.12,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            Gerador de Formulários Fiscais{" "}
            <span style={{ color: "#FFE600" }}>W-8BEN</span> &{" "}
            <span style={{ color: "#FFE600" }}>W-8BEN-E</span>
          </h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#94a3b8",
              margin: 0,
              maxWidth: "920px",
            }}
          >
            Preencha e baixe seus formulários oficiais da IRS em menos de 1 minuto. Evite a retenção de 30% na fonte na Deel, Rippling, Upwork e Remote com 100% de privacidade no navegador.
          </p>
        </div>

        {/* Bottom: Badges & Features */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(22, 163, 74, 0.2)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              borderRadius: "12px",
              padding: "10px 18px",
              color: "#4ade80",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            ✓ 0% Withholding Tax
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              padding: "10px 18px",
              color: "#f1f5f9",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            ✓ Deel, Rippling & Upwork Ready
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              padding: "10px 18px",
              color: "#f1f5f9",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            ✓ 100% Gratuito & Direto no Navegador
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 230, 0, 0.15)",
              border: "1px solid rgba(255, 230, 0, 0.35)",
              borderRadius: "12px",
              padding: "10px 18px",
              color: "#FFE600",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            ✓ PDF Oficial da IRS Autêntico
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
