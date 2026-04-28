import type { Metadata } from "next";
import { competitiveProfiles, projects, siteProfile, socialLinks } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteProfile.siteUrl),
  applicationName: `${siteProfile.name} Portfolio`,
  title: `${siteProfile.name} | Software Development Engineer`,
  description:
    "A cinematic scrollytelling portfolio for Aditya Srivastava, Software Development Engineer and System Architect.",
  keywords: [
    "Aditya Srivastava",
    "Software Development Engineer",
    "System Architect",
    "Oracle OSDMC",
    "Next.js",
    "Spring Boot",
    "Competitive Programming",
    "Codeforces Expert",
    "AI Mock Interview",
    "SpecPilot"
  ],
  authors: [{ name: siteProfile.name, url: siteProfile.siteUrl }],
  creator: siteProfile.name,
  publisher: siteProfile.name,
  category: "portfolio",
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
    description: "Luxury-tech portfolio showcasing systems, backend architecture, AI projects, and product engineering.",
    url: siteProfile.siteUrl,
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
    description: "Cinematic engineering portfolio for systems, AI products, and backend architecture.",
    images: ["/opengraph-image"]
  },
  icons: {
    icon: "/favicon.svg"
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
              email: siteProfile.email,
              url: siteProfile.siteUrl,
              address: {
                "@type": "PostalAddress",
                addressLocality: siteProfile.location
              },
              sameAs: [
                ...socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href),
                ...competitiveProfiles.map((profile) => profile.href),
                ...projects.flatMap((project) => project.links.map((link) => link.href).filter((href) => href.startsWith("http")))
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
