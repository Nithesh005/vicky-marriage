import { event } from "@/data/event";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tamil",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3044";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: event.seo.title,
  description: event.seo.description,
  icons: {
    icon: [{ url: event.assets.favicon, type: "image/png" }],
    shortcut: event.assets.favicon,
    apple: event.assets.favicon,
  },
  keywords: [
    event.groom.displayName,
    event.bride.displayName,
    "Engagement",
    "Salem",
    event.venue.name,
    event.type.ta,
  ],
  openGraph: {
    title: event.seo.title,
    description: event.seo.description,
    type: "website",
    locale: "en_IN",
    siteName: event.names.joinedEn,
  },
  twitter: {
    card: "summary_large_image",
    title: event.seo.title,
    description: event.seo.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.calendar.title,
  startDate: event.datetime,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: event.venue.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: event.venue.city,
      addressRegion: event.venue.state,
      addressCountry: event.venue.country,
    },
  },
  description: event.seo.description,
  organizer: {
    "@type": "Person",
    name: event.names.joinedEn,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${tamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-burgundy font-sans text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
