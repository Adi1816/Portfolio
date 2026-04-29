import { siteProfile } from "@/data/portfolio";

function withProtocol(url: string) {
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
}

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelDeploymentUrl = process.env.VERCEL_URL;
  const resolvedUrl = explicitUrl || vercelProductionUrl || vercelDeploymentUrl || siteProfile.siteUrl;

  return withProtocol(resolvedUrl).replace(/\/$/, "");
}

export const seoDescription =
  "Cinematic engineering portfolio of Aditya Srivastava, Software Development Engineer at Oracle, showcasing backend architecture, AI products, competitive programming, and systems craft.";

export const seoKeywords = [
  "Aditya Srivastava",
  "Aditya Srivastava portfolio",
  "Software Development Engineer",
  "System Architect",
  "Oracle OSDMC",
  "Backend Engineer",
  "Next.js Developer",
  "Spring Boot Developer",
  "Competitive Programming",
  "Codeforces Expert",
  "LeetCode Knight",
  "AtCoder 4 Star",
  "AI Mock Interview",
  "SpecPilot",
  "Text2Mantra",
  "BIT Mesra"
];
