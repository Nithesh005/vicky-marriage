import { seo } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vignesh & Preethi Engagement",
    short_name: seo.couple,
    description: seo.description,
    start_url: "/",
    scope: "/",
    id: "/",
    display: "browser",
    lang: "en-IN",
    dir: "ltr",
    background_color: seo.backgroundColor,
    theme_color: seo.themeColor,
    categories: ["lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
