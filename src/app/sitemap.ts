import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

/* ============================================================
   SITEMAP - every page of the site plus each blog article, for
   search engines. Rebuilt hourly so new Medium posts appear.
   Route: /sitemap.xml
   ============================================================ */

export const revalidate = 3600;

const PAGES: { path: string; changeFrequency: "daily" | "weekly" | "monthly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/events", changeFrequency: "weekly", priority: 0.9 },
  { path: "/team", changeFrequency: "monthly", priority: 0.8 },
  { path: "/domains", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/quick-code", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const { posts } = await getBlogPosts();
  return [
    ...PAGES.map((p) => ({
      url: SITE_URL + (p.path === "/" ? "" : p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...posts.map((post) => {
      const date = new Date(post.date);
      return {
        url: `${SITE_URL}/blog/${post.id}`,
        lastModified: Number.isNaN(date.getTime()) ? now : date,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      };
    }),
  ];
}
