import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Hidden Rhythms";
    const location = searchParams.get("location") || "Experiential Travel & Retreats";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0A2E29",
            backgroundImage: "radial-gradient(circle at 80% 20%, #164E46 0%, #0A2E29 60%, #031412 100%)",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#FFFDD0",
            border: "12px solid #D4AF37",
            boxSizing: "border-box",
          }}
        >
          {/* Top Header Badge */}
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
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: "#D4AF37",
                }}
              />
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "0.3em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                }}
              >
                HIDDEN RHYTHMS
              </span>
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "rgba(255, 253, 208, 0.7)",
                textTransform: "uppercase",
              }}
            >
              EXPERIENTIAL TRAVEL
            </span>
          </div>

          {/* Center Main Content */}
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
                fontSize: "54px",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#FFFDD0",
                margin: 0,
                textShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 400,
                color: "#D4AF37",
                margin: 0,
                letterSpacing: "0.05em",
              }}
            >
              {location}
            </p>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(212, 175, 55, 0.3)",
              paddingTop: "24px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "rgba(255, 253, 208, 0.8)",
                fontWeight: 500,
              }}
            >
              hiddenrhythmstravel.com
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#D4AF37",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              CURATED SOUNDSCAPES & LUXURY RETREATS
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("OG Image generation failed:", err);
    return new Response("Failed to generate OG Image", { status: 500 });
  }
}
