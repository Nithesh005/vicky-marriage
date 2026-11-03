import { buildEventJsonLd, serializeJsonLd, siteMetadata, siteViewport } from "@/lib/seo";
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

export const metadata = siteMetadata;
export const viewport = siteViewport;

const jsonLd = serializeJsonLd(buildEventJsonLd());

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable} ${tamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-burgundy font-sans text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
