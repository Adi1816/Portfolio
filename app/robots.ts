import type { MetadataRoute } from "next";
import { siteProfile } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteProfile.siteUrl}/sitemap.xml`
  };
}
