import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
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
            fontSize: 64,
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
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 16,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          Architecture · Engineering · Construction
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          {["Design", "Build", "Innovate"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 9999,
                background: "rgba(249, 115, 22, 0.15)",
                color: "#f97316",
                fontSize: 18,
                fontWeight: 600,
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#64748b",
            marginTop: 48,
          }}
        >
          horizonnepalconstruction.com
        </div>
      </div>
    ),
    { ...size },
  );
}
