import { ImageResponse } from "next/og";
import { siteProfile } from "@/data/portfolio";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "white",
          background:
            "radial-gradient(circle at 68% 42%, rgba(0,114,198,0.45), transparent 280px), radial-gradient(circle at 35% 60%, rgba(0,255,65,0.18), transparent 220px), #030303",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9cc7e8" }}>
          <span>System Architecture</span>
          <span>Bangalore, India</span>
        </div>
        <div>
          <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -3, lineHeight: 0.9 }}>{siteProfile.name}</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#dce6f0" }}>{siteProfile.title}</div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#00ff41" }}>
          <span>Oracle OSDMC</span>
          <span>Codeforces 1749</span>
          <span>Next.js + AI</span>
        </div>
      </div>
    ),
    size
  );
}
