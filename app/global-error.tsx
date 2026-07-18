"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f8ff",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 420,
            padding: "40px 24px",
          }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#0f2557",
              marginBottom: 12,
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: 14.5,
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 28px",
              backgroundColor: "#0f2557",
              color: "white",
              fontWeight: 600,
              fontSize: 13.5,
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
