import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} - ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15233F",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#ffffff", fontSize: 34, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            Technical support you can rely on.
          </div>
          <div style={{ marginTop: 28, color: "#DCE1E8", fontSize: 34 }}>
            Technical virtual assistant and IT support specialist
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 480,
              height: 16,
              borderRadius: 8,
              background: "rgba(255,255,255,0.14)",
            }}
          >
            <div
              style={{
                display: "flex",
                marginLeft: 360,
                width: 120,
                height: 16,
                borderRadius: 8,
                background: "#F2B544",
              }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 20, color: "#ffffff", fontSize: 28 }}>
            Part-time, evenings Philippine time
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
