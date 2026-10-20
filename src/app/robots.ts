import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* Lets every crawler in and points it at the sitemap. Route: /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
