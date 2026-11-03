import type { Metadata, Viewport } from "next";

/**
 * Published metadata for the engagement invitation.
 * Name order is fixed: groom Vignesh, then bride Preethi.
 * Set NEXT_PUBLIC_SITE_URL to the production origin before deploying.
 */
export const seo = {
  couple: "Vignesh & Preethi",
  coupleTa: "விக்னேஷ் & ப்ரீத்தி",
  title: "Vignesh & Preethi Engagement | 15 November 2026 | Salem",
  description:
    "With the blessings of our families, join us to celebrate the engagement of Vignesh & Preethi on 15 November 2026 at Sri Lakshimi Mahal, Salem. Your presence will make our celebration more special.",
  ogTitle: "Vignesh & Preethi | Engagement Ceremony",
  ogDescription:
    "Join us to celebrate the beautiful beginning of Vignesh & Preethi on 15 November 2026 at Sri Lakshimi Mahal, Salem.",
  tamilDescription:
    "இறைவன் திருவருளுடன் விக்னேஷ் மற்றும் ப்ரீத்தியின் இனிய நிச்சயதார்த்த விழாவிற்கு உங்களை அன்புடன் அழைக்கிறோம். 15 நவம்பர் 2026, காலை 10:30 மணி, ஸ்ரீ லக்ஷ்மி மகால், சேலம்.",
  tamilName: "விக்னேஷ் & ப்ரீத்தி நிச்சயதார்த்த விழா",
  eventName: "Engagement Ceremony of Vignesh & Preethi",
  startDate: "2026-11-15T10:30:00+05:30",
  venueName: "Sri Lakshimi Mahal",
  locality: "Salem",
  region: "Tamil Nadu",
  country: "IN",
  imagePath: "/images/engagement-og.jpg",
  imageAlt:
    "Vignesh and Preethi at their engagement ceremony on 15 November 2026 at Sri Lakshimi Mahal, Salem.",
  imageWidth: 1200,
  imageHeight: 630,
  themeColor: "#310b18",
  backgroundColor: "#310b18",
  locale: "en_IN",
  alternateLocale: "ta_IN",
  languages: ["en-IN", "ta-IN"] as const,
} as const;

export const privatePathPrefixes = ["/api/", "/admin/", "/private/"] as const;

const LOCAL_SITE_URL = "http://localhost:3044";

function withProtocol(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl(): URL {
  const configured =
    withProtocol(process.env.NEXT_PUBLIC_SITE_URL) ||
    withProtocol(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    withProtocol(process.env.VERCEL_URL) ||
    LOCAL_SITE_URL;
  return new URL(new URL(configured).origin);
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).href;
}

export function getPageUrl(): string {
  return getSiteUrl().origin;
}

function assertGroomFirst(value: string, label: string) {
  const english = value.toLocaleLowerCase("en-IN");
  const groom = english.indexOf("vignesh");
  const bride = english.indexOf("preethi");
  if (groom !== -1 && bride !== -1 && groom > bride) {
    throw new Error(`${label} must list Vignesh before Preethi.`);
  }

  const groomTa = value.indexOf("விக்னேஷ்");
  const brideTa = value.indexOf("ப்ரீத்தி");
  if (groomTa !== -1 && brideTa !== -1 && groomTa > brideTa) {
    throw new Error(`${label} must list விக்னேஷ் before ப்ரீத்தி.`);
  }
}

for (const [label, value] of [
  ["title", seo.title],
  ["description", seo.description],
  ["ogTitle", seo.ogTitle],
  ["ogDescription", seo.ogDescription],
  ["tamilDescription", seo.tamilDescription],
  ["tamilName", seo.tamilName],
  ["eventName", seo.eventName],
  ["imageAlt", seo.imageAlt],
  ["couple", seo.couple],
  ["coupleTa", seo.coupleTa],
] as const) {
  assertGroomFirst(value, label);
}

const pageUrl = getPageUrl();
const imageUrl = absoluteUrl(seo.imagePath);

const seoGlobal = globalThis as typeof globalThis & { __engagementSeoOriginWarned?: boolean };

if (
  process.env.NODE_ENV === "production" &&
  getSiteUrl().hostname === "localhost" &&
  !seoGlobal.__engagementSeoOriginWarned
) {
  seoGlobal.__engagementSeoOriginWarned = true;
  console.warn(
    "NEXT_PUBLIC_SITE_URL is not set. Canonical, Open Graph, sitemap, and robots URLs are using http://localhost:3044. Set NEXT_PUBLIC_SITE_URL to the production origin before deploying.",
  );
}

export const siteMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: seo.title,
  description: seo.description,
  applicationName: seo.couple,
  keywords: [
    "Vignesh and Preethi Engagement",
    "Vignesh & Preethi",
    "Engagement Invitation",
    "Engagement Ceremony 2026",
    "Salem Engagement Invitation",
    "Tamil Engagement Invitation",
    "Digital Engagement Invitation",
  ],
  authors: [{ name: seo.couple }],
  creator: seo.couple,
  publisher: seo.couple,
  category: "Engagement Invitation",
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: pageUrl,
    siteName: seo.couple,
    locale: seo.locale,
    alternateLocale: [seo.alternateLocale],
    images: [
      {
        url: seo.imagePath,
        width: seo.imageWidth,
        height: seo.imageHeight,
        alt: seo.imageAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: [
      {
        url: seo.imagePath,
        width: seo.imageWidth,
        height: seo.imageHeight,
        alt: seo.imageAlt,
      },
    ],
  },
};

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: seo.themeColor,
  colorScheme: "dark",
};

export function buildEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: [...seo.languages],
        primaryImageOfPage: { "@id": `${imageUrl}#image` },
        mainEntity: { "@id": `${pageUrl}#event` },
        workTranslation: {
          "@type": "WebPage",
          inLanguage: "ta-IN",
          name: seo.tamilName,
          description: seo.tamilDescription,
        },
      },
      {
        "@type": "Event",
        "@id": `${pageUrl}#event`,
        name: seo.eventName,
        alternateName: seo.tamilName,
        description: seo.description,
        startDate: seo.startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        inLanguage: [...seo.languages],
        image: [imageUrl],
        url: pageUrl,
        location: {
          "@type": "Place",
          name: seo.venueName,
          address: {
            "@type": "PostalAddress",
            addressLocality: seo.locality,
            addressRegion: seo.region,
            addressCountry: seo.country,
          },
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${imageUrl}#image`,
        url: imageUrl,
        width: seo.imageWidth,
        height: seo.imageHeight,
        caption: seo.imageAlt,
        contentUrl: imageUrl,
      },
    ],
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
