import { ImageResponse } from "next/og";
import { siteProfile } from "@/data/portfolio";
import { seoDescription } from "./seo";

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
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "white",
          backgroundColor: "#030303",
          backgroundImage:
            "radial-gradient(circle at 72% 46%, rgba(0,114,198,0.45), transparent 300px), radial-gradient(circle at 28% 64%, rgba(0,255,65,0.18), transparent 230px)",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`h-${index}`}
            style={{
              position: "absolute",
              top: 56 + index * 46,
              left: 0,
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.035)"
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`v-${index}`}
            style={{
              position: "absolute",
              top: 0,
              left: 48 + index * 58,
              width: 1,
              height: "100%",
              background: "rgba(255,255,255,0.026)"
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 112,
            width: 310,
            height: 310,
            border: "2px solid rgba(0,114,198,0.72)",
            borderRadius: "50%",
            boxShadow: "0 0 90px rgba(0,114,198,0.32), inset 0 0 70px rgba(0,255,65,0.08)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 104,
            top: 164,
            width: 245,
            height: 190,
            border: "2px solid rgba(0,255,65,0.44)",
            borderRadius: "50%",
            transform: "rotate(-17deg)"
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9cc7e8" }}>
          <span>Software Development Engineer</span>
          <span>{siteProfile.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 850 }}>
          <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: 0, lineHeight: 0.88 }}>{siteProfile.name}</div>
          <div style={{ marginTop: 26, fontSize: 34, color: "#dce6f0" }}>{siteProfile.title}</div>
          <div style={{ marginTop: 20, width: 760, fontSize: 23, lineHeight: 1.35, color: "rgba(228,240,255,0.72)" }}>
            {seoDescription}
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#00ff41" }}>
          <span>Oracle OSDMC</span>
          <span>Codeforces Expert 1749</span>
          <span>LeetCode Knight 1927</span>
        </div>
      </div>
    ),
    size
  );
}
