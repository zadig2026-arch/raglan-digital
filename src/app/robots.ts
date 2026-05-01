import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/v/", "/actions/", "/thanks/", "/api/"],
    },
    sitemap: "https://raglandigital.com/sitemap.xml",
  };
}
