import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import PartnerSystem from "./components/PartnerSystem";
import { CSPostHogProvider } from "./providers";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.igstalker.com"),
  title: "IG Stalker | View InstagramProfiles, Stories & Reels",
  description: "View Instagram profiles, posts, stories and reels anonymously without logging in. Free, secure and unlimited Instagram viewer.",
  keywords: ["instagram viewer", "anonymous instagram", "instagram stories", "instagram downloader", "ig stalker"],
  other: {
    "google-adsense-account": "ca-pub-4968261782960289",
  },
  icons: {
    icon: [
      { url: '/favicon-1.webp' },
      { url: '/favicon-2.webp', sizes: '16x16', type: 'image/webp' },
      { url: '/favicon-3.webp', sizes: '32x32', type: 'image/webp' },
    ],
    apple: [
      { url: '/apple-touch-icon.webp' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4968261782960289"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100`}
      >
        <CSPostHogProvider>
          <Navbar />
          <PartnerSystem />
          {children}
          <Analytics />
          <Footer />
          <CookieConsent />
        </CSPostHogProvider>
      </body>
    </html>
  );
}
