import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "40px",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "42px",
              fontWeight: 800,
              fontFamily: "system-ui, -apple-system, sans-serif",
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
              background: "#FFE600",
              borderRadius: "10px",
              padding: "4px 12px",
              color: "#0f172a",
              fontWeight: 900,
              fontSize: "42px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-1px",
            }}
          >
            W8
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
