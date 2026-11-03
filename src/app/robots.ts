import { getSiteUrl, privatePathPrefixes } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const config: MetadataRoute.Robots = {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...privatePathPrefixes],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };

  if (siteUrl.hostname !== "localhost") {
    config.host = siteUrl.origin;
  }

  return config;
}
