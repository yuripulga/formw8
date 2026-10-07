import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFE600",
          color: "#0f172a",
          fontWeight: 900,
          fontSize: "23px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-1.5px",
        }}
      >
        W8
      </div>
    ),
    {
      ...size,
    }
  );
}
