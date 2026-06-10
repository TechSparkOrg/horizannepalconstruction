import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          position: "relative",
          display: "flex",
          background: "#0f172a",
          color: "#ffffff",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background Image */}
        <img
          src="/horizanbg.jpeg"
          alt="Building"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 45%, rgba(15,23,42,0.45) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            maxWidth: "720px",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
              fontSize: "20px",
              fontWeight: 700,
              color: "#f97316",
              border: "2px solid #f97316",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            Architecture • Engineering • Construction
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "78px",
                fontWeight: 900,
                color: "#f97316",
              }}
            >
              Horizon
            </span>

            <span
              style={{
                fontSize: "78px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              Nepal
            </span>
          </div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "20px",
            }}
          >
            Building Nepal's Tomorrow
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#cbd5e1",
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            Innovative architectural design, structural engineering,
            construction management, and sustainable development solutions
            across Nepal.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "40px",
              fontSize: "18px",
              color: "#94a3b8",
            }}
          >
            horizonnepalconstruction.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}