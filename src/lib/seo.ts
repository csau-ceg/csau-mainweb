import type { Metadata } from "next";

/* ============================================================
   SEO - the site's address, name and description, and the
   per-page metadata (title, description, canonical URL and
   link-preview card) every route builds from them. The root
   layout sets the defaults; src/app/sitemap.ts and robots.ts
   use SITE_URL.
   ============================================================ */

export const SITE_URL = "https://www.csau.in";

export const SITE_NAME = "CSAU - Computer Society of Anna University";

export const SITE_DESCRIPTION =
  "The Computer Society of Anna University (CSAU), College of Engineering, Guindy. Since 1972 - hackathons, workshops, coding rounds and peer learning under the Ramanujan Computing Centre.";

/** Link-preview image when a page has none of its own: the club logo. */
const SHARE_IMAGE = { url: "/images/brand/csau-logo.png", width: 1600, height: 1600, alt: "CSAU logo" };

export const SHARE_DEFAULTS = {
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary", images: [SHARE_IMAGE.url] },
} satisfies Metadata;

/**
 * Metadata for one page. `title` is the page's own title; the root
 * layout's template adds " | CSAU". `path` is the route ("/team").
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  /** an absolute image URL for the link preview (defaults to the logo) */
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const shareTitle = `${title} | CSAU`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...SHARE_DEFAULTS.openGraph,
      type,
      title: shareTitle,
      description,
      url: path,
      ...(image && { images: [{ url: image }] }),
    },
    twitter: image
      ? { card: "summary_large_image", title: shareTitle, description, images: [image] }
      : { ...SHARE_DEFAULTS.twitter, title: shareTitle, description },
  };
}
