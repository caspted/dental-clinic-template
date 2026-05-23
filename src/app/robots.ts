import { MetadataRoute } from "next";
import { ghlCustomValues } from "../config/ghlConfig";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = ghlCustomValues.practice_website || "https://zenithdentalsf.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
