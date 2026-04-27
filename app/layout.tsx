import type { Metadata } from "next";
import { competitiveProfiles, projects, siteProfile, socialLinks } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteProfile.siteUrl),
  title: `${siteProfile.name} | Software Development Engineer`,
  description:
    "A cinematic scrollytelling portfolio for Aditya Srivastava, Software Development Engineer and System Architect.",
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
  }
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
