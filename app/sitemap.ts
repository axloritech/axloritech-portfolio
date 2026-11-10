import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { orgUrl, personUrl } from "@/lib/entities";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: personUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: orgUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
