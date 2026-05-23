import { MetadataRoute } from "next";
import { ghlCustomValues } from "../config/ghlConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = ghlCustomValues.practice_website || "https://zenithdentalsf.com";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
