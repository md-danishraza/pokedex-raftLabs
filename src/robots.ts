import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Replace this with your actual deployed URL (e.g., from Vercel)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Example of blocking a path
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
