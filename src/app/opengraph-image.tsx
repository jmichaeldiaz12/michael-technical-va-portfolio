import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
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
          background: "#0B1526",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#111D33",
              border: "2px solid #2563EB",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            JMD
          </div>
          <div style={{ marginLeft: 20, color: "#ffffff", fontSize: 32, fontWeight: 600 }}>
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Technical Support You Can Rely On.
          </div>
          <div style={{ marginTop: 28, color: "#CBD5E1", fontSize: 34 }}>
            Technical Virtual Assistant · IT Support Specialist
          </div>
        </div>
        <div style={{ display: "flex", color: "#60A5FA", fontSize: 28 }}>
          Part-time · Evening Shift (PHT) · Remote
        </div>
      </div>
    ),
    { ...size },
  );
}
