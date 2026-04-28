import type { MetadataRoute } from "next";
import { siteProfile } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteProfile.name} | Software Development Engineer`,
    short_name: "Aditya S.",
    description: "Cinematic engineering portfolio for systems, AI products, backend architecture, and competitive programming.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#0072c6",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "64x64",
        type: "image/svg+xml"
      }
    ]
  };
}
