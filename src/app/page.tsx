import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SHARE_DEFAULTS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import { QUICK_CODE } from "@/lib/whatsNew";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...SHARE_DEFAULTS.openGraph, title: SITE_NAME, description: SITE_DESCRIPTION, url: "/" },
};

export default function Home() {
  return <HomeClient news={QUICK_CODE} />;
}
