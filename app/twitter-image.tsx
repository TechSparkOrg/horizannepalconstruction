import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            fontSize: 56,
            fontWeight: 800,
            color: "#f97316",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#f97316" }}>Horizon</span>
          <span style={{ color: "#ffffff" }}>Nepal</span>
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginTop: 16,
            textAlign: "center",
            maxWidth: 500,
            lineHeight: 1.4,
          }}
        >
          Building Nepal's Tomorrow with Innovative Design & Engineering
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#64748b",
            marginTop: 40,
          }}
        >
          horizonnepalconstruction.com
        </div>
      </div>
    ),
    { ...size },
  );
}
