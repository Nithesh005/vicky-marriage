import { absoluteUrl, getPageUrl, seo } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getPageUrl(),
      lastModified: "2026-11-03",
      changeFrequency: "yearly",
      priority: 1,
      images: [absoluteUrl(seo.imagePath)],
    },
  ];
}
