import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { competitiveProfiles, projects, siteProfile, socialLinks } from "@/data/portfolio";
import { getSiteUrl, seoDescription, seoKeywords } from "./seo";
import "./globals.css";

const siteUrl = getSiteUrl();
const httpSocialLinks = socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href);
const projectLinks = projects.flatMap((project) => project.links.map((link) => link.href).filter((href) => href.startsWith("http")));
const sameAs = Array.from(new Set([...httpSocialLinks, ...competitiveProfiles.map((profile) => profile.href), ...projectLinks]));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: `${siteProfile.name} Portfolio`,
  title: {
    default: `${siteProfile.name} | Software Development Engineer`,
    template: `%s | ${siteProfile.name}`
  },
  description: seoDescription,
  keywords: seoKeywords,
  authors: [{ name: siteProfile.name, url: siteUrl }],
  creator: siteProfile.name,
  publisher: siteProfile.name,
  category: "portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: `${siteProfile.name} | Software Development Engineer`,
    description: seoDescription,
    url: siteUrl,
    siteName: `${siteProfile.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteProfile.name} portfolio preview`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteProfile.name} | Software Development Engineer`,
    description: seoDescription,
    images: ["/opengraph-image"]
  },
  appleWebApp: {
    capable: true,
    title: `${siteProfile.name} Portfolio`,
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteProfile.name,
              jobTitle: "Software Development Engineer",
              description: seoDescription,
              email: siteProfile.email,
              url: siteUrl,
              image: `${siteUrl}/opengraph-image`,
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Birla Institute of Technology, Mesra"
              },
              worksFor: {
                "@type": "Organization",
                name: "Oracle"
              },
              knowsAbout: seoKeywords.filter((keyword) => keyword !== siteProfile.name && keyword !== "Aditya Srivastava portfolio"),
              address: {
                "@type": "PostalAddress",
                addressLocality: siteProfile.location
              },
              sameAs,
              hasCredential: [
                "Codeforces Expert - 1749",
                "LeetCode Knight - 1927",
                "AtCoder 4 Star - 1700"
              ],
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": siteUrl
              }
            })
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
