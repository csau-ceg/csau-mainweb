import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import LaserNav from "@/components/LaserNav";
import SpaceBackdrop from "@/components/SpaceBackdrop";
import RouteLoadGate from "@/components/RouteLoadGate";
import { SHARE_DEFAULTS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | CSAU" },
  description: SITE_DESCRIPTION,
  applicationName: "CSAU",
  keywords: [
    "CSAU",
    "Computer Society of Anna University",
    "CEG",
    "College of Engineering Guindy",
    "Anna University",
    "Ramanujan Computing Centre",
    "hackathon",
    "competitive programming",
    "student tech club",
    "Chennai",
  ],
  ...SHARE_DEFAULTS,
};

/* Returning visitors skip the boot gate; this marks <html> before paint so it never flashes. It also clears what
   the removed CrackIt practice round saved in this browser (names and roll numbers typed on shared machines). */
const GATE_SCRIPT = `try{if(sessionStorage.getItem("csau-gate-seen")==="true")document.documentElement.dataset.gate="seen"}catch(e){}try{localStorage.removeItem("csau-crackit-leaderboard-v1")}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />
      </head>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {/* The star field every page floats on (fixed, behind all content). */}
        <SpaceBackdrop />
        {/* Laser navigation - a floating button opens the fullscreen
            Matrix Junction laser overlay with the site links. */}
        <LaserNav />
        {/* RouteLoadGate shows the loading sequence when following any
            link to another page, opens once that page has its elements,
            and staggers them in as it clears. */}
        <RouteLoadGate>{children}</RouteLoadGate>
      </body>
    </html>
  );
}
